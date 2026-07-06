import { tavily } from '@tavily/core';

/**
 * Searches for company information using Tavily Search API
 * Makes multiple targeted searches for comprehensive data
 */
export const searchCompany = async (companyName) => {
  const client = tavily({ apiKey: process.env.TAVILY_API_KEY });

  try {
    // Run parallel searches for different aspects
    const [companyInfo, recentNews, financialNews] = await Promise.all([
      // General company information
      client.search(`${companyName} company overview business model products services CEO headquarters`, {
        maxResults: 5,
        searchDepth: 'advanced',
      }),

      // Recent news
      client.search(`${companyName} latest news 2024 2025`, {
        maxResults: 5,
        topic: 'news',
      }),

      // Financial news and analysis
      client.search(`${companyName} stock financial analysis revenue earnings growth`, {
        maxResults: 3,
        topic: 'finance',
      }),
    ]);

    return {
      companyInfo: companyInfo.results.map(r => ({
        title: r.title,
        content: r.content,
        url: r.url,
      })),
      recentNews: recentNews.results.map(r => ({
        title: r.title,
        content: r.content,
        url: r.url,
      })),
      financialNews: financialNews.results.map(r => ({
        title: r.title,
        content: r.content,
        url: r.url,
      })),
    };
  } catch (error) {
    console.error('Search service error:', error.message);
    // Return empty results if search fails — AI can still work with financial data
    return {
      companyInfo: [],
      recentNews: [],
      financialNews: [],
    };
  }
};
