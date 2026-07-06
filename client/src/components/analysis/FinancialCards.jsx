const metricIcons = {
  revenue: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  ),
  netProfit: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7Z" />
    </svg>
  ),
  marketCap: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
      <path d="M2 12h20" />
    </svg>
  ),
  peRatio: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 3v18h18" />
      <path d="m19 9-5 5-4-4-3 3" />
    </svg>
  ),
  eps: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  ),
  revenueGrowth: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
      <polyline points="16 7 22 7 22 13" />
    </svg>
  ),
  profitMargin: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  ),
}

const metricLabels = {
  revenue: 'Revenue',
  netProfit: 'Net Profit',
  marketCap: 'Market Cap',
  peRatio: 'P/E Ratio',
  eps: 'EPS',
  revenueGrowth: 'Revenue Growth',
  profitMargin: 'Profit Margin',
}

export default function FinancialCards({ financials }) {
  if (!financials) return null

  const metrics = Object.entries(metricLabels)
    .map(([key, label]) => ({
      key,
      label,
      value: financials[key],
      icon: metricIcons[key],
    }))
    .filter((m) => m.value && m.value !== 'N/A')

  return (
    <div>
      <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 3v18h18" />
          <path d="m19 9-5 5-4-4-3 3" />
        </svg>
        Financial Metrics
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {metrics.map(({ key, label, value, icon }) => (
          <div key={key} className="glass-card p-5 text-center">
            <div className="w-10 h-10 mx-auto mb-3 rounded-lg bg-brand-50 text-brand-600 flex items-center justify-center">
              {icon}
            </div>
            <p className="text-xs text-text-tertiary uppercase tracking-wider mb-1">{label}</p>
            <p className="text-lg font-bold text-text-primary">{value}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
