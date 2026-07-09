import { searchCompany } from '../services/searchService.js';
import { getFinancialData } from '../services/financialService.js';
import { runAnalysis } from '../langchain/agent.js';
import { AppError } from '../middleware/errorHandler.js';

/**
 * Controller for POST /api/analyze
 * Orchestrates the full analysis pipeline:
 * 1. Search for company info & news
 * 2. Fetch financial data
 * 3. Run AI analysis with LangChain + Gemini
 * 4. Return structured JSON response
 */
// Keep track of in-flight promises to deduplicate concurrent requests (e.g. from React StrictMode)
const inFlightRequests = new Map();

export const analyzeCompany = async (req, res, next) => {
  const { company } = req.body;
  
  if (!company || !company.trim()) {
    return next(new AppError('Company name is required', 400));
  }
  
  const key = company.trim().toLowerCase();

  // If a request for this company is already in progress, join its promise
  if (inFlightRequests.has(key)) {
    console.log(`⏳ Joining existing in-flight analysis for: ${company.trim()}`);
    try {
      const analysis = await inFlightRequests.get(key);
      return res.json({
        success: true,
        analysis,
      });
    } catch (error) {
      return next(new AppError(error.message, error.statusCode || 500));
    }
  }

  // Create the promise for the analysis pipeline
  const analysisPromise = (async () => {
    console.log(`\n📊 Analyzing: ${company}`);

    // Step 1: Search for company information and news
    console.log('🔍 Step 1: Searching company information...');
    const searchResults = await searchCompany(company);

    // Step 2: Fetch financial data
    console.log('💰 Step 2: Fetching financial data...');
    const financialData = await getFinancialData(company);

    // Step 3: Run AI analysis
    console.log('🤖 Step 3: Running AI analysis...');
    return await runAnalysis(company, searchResults, financialData);
  })();

  // Register the promise
  inFlightRequests.set(key, analysisPromise);

  try {
    const analysis = await analysisPromise;
    console.log(`✅ Analysis complete for ${company}`);
    res.json({
      success: true,
      analysis,
    });
  } catch (error) {
    console.error(`❌ Analysis failed for ${company}: ${error.message}`);
    next(new AppError(error.message, error.statusCode || 500));
  } finally {
    // Always clean up the map when done
    inFlightRequests.delete(key);
  }
};
