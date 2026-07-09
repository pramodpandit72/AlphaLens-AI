import dotenv from 'dotenv';
import { runAnalysis } from '../langchain/agent.js';
import { searchCompany } from '../services/searchService.js';
import { getFinancialData } from '../services/financialService.js';

dotenv.config({ path: '../.env' });

async function test() {
  try {
    const company = 'Tesla';
    console.log('Searching...');
    const searchResults = await searchCompany(company);
    console.log('Getting financials...');
    const financialData = await getFinancialData(company);
    
    console.log('Running analysis with agent parser...');
    const result = await runAnalysis(company, searchResults, financialData);
    console.log('Analysis parsed successfully!');
    console.log('Parsed company:', result.company);
    console.log('Parsed decision:', result.decision);
    console.log('Parsed confidence:', result.confidence);
  } catch (err) {
    console.error('Error running test:', err);
  }
}

test();
