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
export const analyzeCompany = async (req, res, next) => {
  try {
    const { company } = req.body;
    console.log(`\n📊 Analyzing: ${company}`);

    // Step 1: Search for company information and news
    console.log('🔍 Step 1: Searching company information...');
    const searchResults = await searchCompany(company);

    // Step 2: Fetch financial data
    console.log('💰 Step 2: Fetching financial data...');
    const financialData = await getFinancialData(company);

    // Step 3: Run AI analysis
    console.log('🤖 Step 3: Running AI analysis...');
    const analysis = await runAnalysis(company, searchResults, financialData);

    console.log(`✅ Analysis complete for ${company}`);

    res.json({
      success: true,
      analysis,
    });
  } catch (error) {
    console.error(`❌ Analysis failed: ${error.message}`);
    next(new AppError(error.message, error.statusCode || 500));
  }
};
