/**
 * Builds a structured context string from search results and financial data
 * This context is injected into the LLM prompt
 */

/**
 * Formats search results into a readable context string
 */
export const buildSearchContext = (searchResults) => {
  const sections = [];

  const cleanText = (text) => {
    if (!text) return '';
    // Strip HTML tags
    let cleaned = text.replace(/<[^>]*>/g, ' ');
    // Remove base64 or long hex/data strings
    cleaned = cleaned.replace(/data:image\/[^;]+;base64,[^\s"']+/g, '[image data]');
    // Truncate to maximum 500 characters
    if (cleaned.length > 500) {
      cleaned = cleaned.substring(0, 500) + '...';
    }
    return cleaned.trim();
  };

  // Company Information (limit to top 3 items)
  if (searchResults.companyInfo?.length > 0) {
    sections.push('### Company Information');
    searchResults.companyInfo.slice(0, 3).forEach((item, i) => {
      sections.push(`${i + 1}. **${item.title}**`);
      sections.push(`   ${cleanText(item.content)}`);
    });
  }

  // Recent News (limit to top 3 items)
  if (searchResults.recentNews?.length > 0) {
    sections.push('\n### Recent News');
    searchResults.recentNews.slice(0, 3).forEach((item, i) => {
      sections.push(`${i + 1}. **${item.title}**`);
      sections.push(`   ${cleanText(item.content)}`);
    });
  }

  // Financial News (limit to top 3 items)
  if (searchResults.financialNews?.length > 0) {
    sections.push('\n### Financial News & Analysis');
    searchResults.financialNews.slice(0, 3).forEach((item, i) => {
      sections.push(`${i + 1}. **${item.title}**`);
      sections.push(`   ${cleanText(item.content)}`);
    });
  }

  return sections.length > 0
    ? sections.join('\n')
    : 'No search results available. Please rely on financial data.';
};

/**
 * Formats financial data into a readable context string
 */
export const buildFinancialContext = (financialData) => {
  if (!financialData || financialData.ticker === 'N/A') {
    return 'No financial data available from Yahoo Finance.';
  }

  const formatNumber = (value) => {
    if (value === 'N/A' || value === undefined || value === null) return 'N/A';
    if (typeof value === 'number') {
      if (Math.abs(value) >= 1e12) return `$${(value / 1e12).toFixed(2)}T`;
      if (Math.abs(value) >= 1e9) return `$${(value / 1e9).toFixed(2)}B`;
      if (Math.abs(value) >= 1e6) return `$${(value / 1e6).toFixed(2)}M`;
      return `$${value.toLocaleString()}`;
    }
    return String(value);
  };

  const formatPercent = (value) => {
    if (value === 'N/A' || value === undefined || value === null) return 'N/A';
    if (typeof value === 'number') return `${(value * 100).toFixed(2)}%`;
    return String(value);
  };

  return `### Financial Data for ${financialData.companyName} (${financialData.ticker})

**Company Profile:**
- Industry: ${financialData.industry}
- Sector: ${financialData.sector}
- Employees: ${financialData.employees?.toLocaleString?.() || financialData.employees}
- Country: ${financialData.country}

**Market Data:**
- Current Price: ${formatNumber(financialData.currentPrice)} ${financialData.currency}
- Market Cap: ${formatNumber(financialData.marketCap)}
- 52-Week High: ${formatNumber(financialData.fiftyTwoWeekHigh)}
- 52-Week Low: ${formatNumber(financialData.fiftyTwoWeekLow)}

**Valuation:**
- P/E Ratio (Trailing): ${financialData.peRatio !== 'N/A' ? Number(financialData.peRatio).toFixed(2) : 'N/A'}
- Forward P/E: ${financialData.forwardPE !== 'N/A' ? Number(financialData.forwardPE).toFixed(2) : 'N/A'}
- EPS: ${formatNumber(financialData.eps)}
- Price-to-Book: ${financialData.priceToBook !== 'N/A' ? Number(financialData.priceToBook).toFixed(2) : 'N/A'}

**Revenue & Profitability:**
- Revenue: ${formatNumber(financialData.revenue)}
- Revenue Growth: ${formatPercent(financialData.revenueGrowth)}
- Gross Profit: ${formatNumber(financialData.grossProfit)}
- Profit Margin: ${formatPercent(financialData.profitMargin)}
- Operating Margin: ${formatPercent(financialData.operatingMargin)}

**Balance Sheet:**
- Total Debt: ${formatNumber(financialData.totalDebt)}
- Total Cash: ${formatNumber(financialData.totalCash)}
- Debt-to-Equity: ${financialData.debtToEquity !== 'N/A' ? Number(financialData.debtToEquity).toFixed(2) : 'N/A'}
- Current Ratio: ${financialData.currentRatio !== 'N/A' ? Number(financialData.currentRatio).toFixed(2) : 'N/A'}

**Returns:**
- Return on Equity: ${formatPercent(financialData.returnOnEquity)}
- Return on Assets: ${formatPercent(financialData.returnOnAssets)}
- Dividend Yield: ${formatPercent(financialData.dividendYield)}

**Analyst Consensus:**
- Recommendation: ${financialData.recommendationKey}
- Target Price: ${formatNumber(financialData.targetMeanPrice)}
- Number of Analysts: ${financialData.numberOfAnalysts}`;
};
