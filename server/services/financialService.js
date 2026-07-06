import YahooFinance from 'yahoo-finance2';

// yahoo-finance2 v3 requires instantiation
const yahooFinance = new YahooFinance();

/**
 * Fetches comprehensive financial data for a company using Yahoo Finance
 * Searches for the ticker symbol first, then fetches detailed financial data
 */
export const getFinancialData = async (companyName) => {
  try {
    // Step 1: Search for the company ticker
    const searchResults = await yahooFinance.search(companyName);
    const ticker = searchResults?.quotes?.[0]?.symbol;

    if (!ticker) {
      console.warn(`⚠️ Could not find ticker for: ${companyName}`);
      return getEmptyFinancialData(companyName);
    }

    console.log(`  📈 Found ticker: ${ticker}`);

    // Step 2: Fetch quote and summary data in parallel
    const [quote, summaryDetail] = await Promise.all([
      yahooFinance.quote(ticker).catch(() => null),
      yahooFinance.quoteSummary(ticker, {
        modules: ['summaryProfile', 'financialData', 'defaultKeyStatistics', 'earnings'],
      }).catch(() => null),
    ]);

    // Extract data from responses
    const profile = summaryDetail?.summaryProfile || {};
    const financial = summaryDetail?.financialData || {};
    const keyStats = summaryDetail?.defaultKeyStatistics || {};

    return {
      ticker,
      companyName: quote?.shortName || quote?.longName || companyName,
      industry: quote?.industry || profile?.industry || 'N/A',
      sector: quote?.sector || profile?.sector || 'N/A',
      website: profile?.website || 'N/A',
      employees: profile?.fullTimeEmployees || 'N/A',
      country: profile?.country || 'N/A',
      city: profile?.city || 'N/A',

      // Price data
      currentPrice: quote?.regularMarketPrice || financial?.currentPrice || 'N/A',
      currency: quote?.currency || 'USD',

      // Market data
      marketCap: quote?.marketCap || 'N/A',
      volume: quote?.regularMarketVolume || 'N/A',
      fiftyTwoWeekHigh: quote?.fiftyTwoWeekHigh || 'N/A',
      fiftyTwoWeekLow: quote?.fiftyTwoWeekLow || 'N/A',

      // Valuation metrics
      peRatio: quote?.trailingPE || keyStats?.trailingPE || 'N/A',
      forwardPE: quote?.forwardPE || keyStats?.forwardPE || 'N/A',
      eps: quote?.epsTrailingTwelveMonths || 'N/A',
      priceToBook: keyStats?.priceToBook || 'N/A',

      // Financial performance
      revenue: financial?.totalRevenue || 'N/A',
      revenueGrowth: financial?.revenueGrowth || 'N/A',
      grossProfit: financial?.grossProfits || 'N/A',
      profitMargin: financial?.profitMargins || 'N/A',
      operatingMargin: financial?.operatingMargins || 'N/A',

      // Balance sheet
      totalDebt: financial?.totalDebt || 'N/A',
      totalCash: financial?.totalCash || 'N/A',
      debtToEquity: financial?.debtToEquity || 'N/A',
      currentRatio: financial?.currentRatio || 'N/A',

      // Returns
      returnOnEquity: financial?.returnOnEquity || 'N/A',
      returnOnAssets: financial?.returnOnAssets || 'N/A',

      // Dividends
      dividendYield: quote?.dividendYield || 'N/A',

      // Analyst recommendations
      recommendationKey: financial?.recommendationKey || 'N/A',
      targetMeanPrice: financial?.targetMeanPrice || 'N/A',
      numberOfAnalysts: financial?.numberOfAnalystOpinions || 'N/A',
    };
  } catch (error) {
    console.error('Financial service error:', error.message);
    return getEmptyFinancialData(companyName);
  }
};

/**
 * Returns empty financial data structure when data isn't available
 */
const getEmptyFinancialData = (companyName) => ({
  ticker: 'N/A',
  companyName,
  industry: 'N/A',
  sector: 'N/A',
  marketCap: 'N/A',
  peRatio: 'N/A',
  eps: 'N/A',
  revenue: 'N/A',
  revenueGrowth: 'N/A',
  profitMargin: 'N/A',
  currentPrice: 'N/A',
  currency: 'USD',
});
