import { ChatGroq } from '@langchain/groq';
import { PromptTemplate } from '@langchain/core/prompts';
import { ANALYSIS_PROMPT } from '../prompts/analysisPrompt.js';
import { buildSearchContext, buildFinancialContext } from '../utils/contextBuilder.js';

/**
 * Runs the full AI analysis pipeline:
 * 1. Build context from search + financial data
 * 2. Format the prompt template
 * 3. Send to Llama 3.3 70B via Groq
 * 4. Parse and validate JSON response
 */
export const runAnalysis = async (companyName, searchResults, financialData) => {
  // Step 1: Build context strings
  const searchContext = buildSearchContext(searchResults);
  const financialContext = buildFinancialContext(financialData);

  // Step 2: Create prompt from template
  const promptTemplate = PromptTemplate.fromTemplate(ANALYSIS_PROMPT);
  const formattedPrompt = await promptTemplate.format({
    companyName,
    searchContext,
    financialContext,
  });

  // Step 3: Initialize Groq model
  const model = new ChatGroq({
    model: 'llama-3.3-70b-versatile',
    apiKey: process.env.GROQ_API_KEY,
    temperature: 0.3,
    maxTokens: 4096,
    maxRetries: 3,
  });

  // Step 4: Attempt to run the model and parse the response with a manual retry loop
  let lastError = null;
  const maxAttempts = 3;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      if (attempt > 1) {
        console.log(`\n🔄 Retry attempt ${attempt} for ${companyName}...`);
      }

      // Invoke the model
      const response = await model.invoke(formattedPrompt);

      // Parse the JSON response
      const analysis = parseAnalysisResponse(response.content);

      // If successful, return the parsed analysis
      return analysis;
    } catch (error) {
      console.error(`❌ Attempt ${attempt} failed for ${companyName}: ${error.message}`);
      lastError = error;

      if (attempt < maxAttempts) {
        // If it's a rate limit error, wait before retrying
        if (error.message.includes('429') || error.message.includes('Too Many Requests') || error.message.includes('quota')) {
          console.log(`⏳ Rate limit hit. Waiting 20 seconds before next attempt...`);
          await new Promise(resolve => setTimeout(resolve, 20000));
        } else {
          // If it was a JSON parsing error, just wait a brief moment and try again
          console.log(`⏳ Formatting error. Retrying in 2 seconds...`);
          await new Promise(resolve => setTimeout(resolve, 2000));
        }
      }
    }
  }

  // If we exhausted all attempts, throw the last error
  throw lastError || new Error(`Failed to generate analysis for ${companyName} after ${maxAttempts} attempts.`);
};

/**
 * Parses the LLM response into a valid JSON object
 * Handles edge cases like markdown code blocks in the response
 */
const parseAnalysisResponse = (content) => {
  let text = content;

  // Extract only the JSON object block from the response to discard any wrapper conversational text
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (jsonMatch) {
    text = jsonMatch[0];
  }

  // Remove markdown code blocks if present (fallback)
  if (text.includes('```json')) {
    text = text.replace(/```json\s*/g, '').replace(/```\s*/g, '');
  } else if (text.includes('```')) {
    text = text.replace(/```\s*/g, '');
  }

  // Trim whitespace
  text = text.trim();

  try {
    const parsed = JSON.parse(text);

    // Validate required fields
    if (!parsed.company || !parsed.decision || parsed.confidence === undefined) {
      throw new Error('Missing required fields in analysis response');
    }

    // Ensure decision is valid
    parsed.decision = parsed.decision.toUpperCase();
    if (!['INVEST', 'PASS'].includes(parsed.decision)) {
      parsed.decision = parsed.confidence >= 60 ? 'INVEST' : 'PASS';
    }

    // Ensure confidence is in range
    parsed.confidence = Math.max(0, Math.min(100, Number(parsed.confidence)));

    // Ensure scorecard values are in range 1-10
    if (parsed.scorecard) {
      for (const key of Object.keys(parsed.scorecard)) {
        parsed.scorecard[key] = Math.max(1, Math.min(10, Number(parsed.scorecard[key])));
      }
    }

    return parsed;
  } catch (error) {
    console.error('Failed to parse AI response:', error.message);
    
    // Log context around syntax error position if possible
    const match = error.message.match(/at position (\d+)/);
    if (match) {
      const pos = parseInt(match[1], 10);
      const start = Math.max(0, pos - 100);
      const end = Math.min(text.length, pos + 100);
      console.error(`Context around error (chars ${start}-${end}):`);
      console.error('----------------------------------------');
      console.error(text.substring(start, end));
      console.error('----------------------------------------');
    } else {
      console.error('Raw response (first 1000 chars):', text.substring(0, 1000));
    }
    
    throw new Error('Failed to parse AI analysis. Please try again.');
  }
};
