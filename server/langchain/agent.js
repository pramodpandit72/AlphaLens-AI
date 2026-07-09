import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { PromptTemplate } from '@langchain/core/prompts';
import { ANALYSIS_PROMPT } from '../prompts/analysisPrompt.js';
import { buildSearchContext, buildFinancialContext } from '../utils/contextBuilder.js';

/**
 * Runs the full AI analysis pipeline:
 * 1. Build context from search + financial data
 * 2. Format the prompt template
 * 3. Send to Gemini 2.5 Flash
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

  // Step 3: Initialize Gemini model
  const model = new ChatGoogleGenerativeAI({
    model: 'gemini-2.5-flash',
    apiKey: process.env.GOOGLE_API_KEY,
    temperature: 0.3,
    maxOutputTokens: 4096,
    maxRetries: 1,
    responseMimeType: 'application/json',
  });

  // Step 4: Invoke the model
  const response = await model.invoke(formattedPrompt);

  // Step 5: Parse the JSON response
  const analysis = parseAnalysisResponse(response.content);

  return analysis;
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
