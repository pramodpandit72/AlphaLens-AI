export default function CompanyCard({ data }) {
  const { company, ticker, industry, basicInfo } = data

  const infoItems = [
    { label: 'CEO', value: basicInfo?.ceo },
    { label: 'Headquarters', value: basicInfo?.headquarters },
    { label: 'Founded', value: basicInfo?.founded },
    { label: 'Employees', value: basicInfo?.employees },
    { label: 'Website', value: basicInfo?.website },
    { label: 'Industry', value: industry },
  ]

  return (
    <div className="glass-card p-8">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-text-primary">{company}</h2>
          {ticker && (
            <span className="inline-block mt-1 px-3 py-1 bg-brand-50 text-brand-600 text-sm font-medium rounded-lg">
              {ticker}
            </span>
          )}
        </div>
        <div className="w-12 h-12 rounded-xl bg-brand-50 flex items-center justify-center text-brand-600">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" />
            <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" />
            <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2" />
            <path d="M10 6h4" />
            <path d="M10 10h4" />
            <path d="M10 14h4" />
            <path d="M10 18h4" />
          </svg>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {infoItems.map((item, index) => (
          item.value && item.value !== 'N/A' && (
            <div key={index}>
              <p className="text-xs text-text-tertiary uppercase tracking-wider mb-1">{item.label}</p>
              <p className="text-sm font-medium text-text-primary">{item.value}</p>
            </div>
          )
        ))}
      </div>
    </div>
  )
}
