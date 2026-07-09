import { memo } from 'react'

const CompanyCard = memo(function CompanyCard({ data }) {
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
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden h-full">
      {/* Header accent bar */}
      <div className="h-1.5 bg-sky-600" />
      
      <div className="p-8 md:p-9">
        <div className="flex items-start justify-between gap-4 mb-7">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 leading-tight">{company}</h2>
            <div className="flex items-center gap-2 mt-2 flex-wrap">
              {ticker && (
                <span className="inline-flex items-center px-2.5 py-0.5 bg-sky-50 text-sky-700 text-xs font-bold rounded-lg border border-sky-100 tracking-wider">
                  {ticker}
                </span>
              )}
              {industry && (
                <span className="inline-flex items-center px-2.5 py-0.5 bg-slate-50 text-slate-600 text-xs font-medium rounded-lg border border-slate-200">
                  {industry}
                </span>
              )}
            </div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-600 flex-shrink-0">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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

        <div className="h-px bg-slate-100 mb-6" />

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {infoItems.map((item, index) =>
            item.value && item.value !== 'N/A' ? (
              <div key={index}>
                <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">{item.label}</p>
                <p className="text-sm font-semibold text-slate-900 truncate">{item.value}</p>
              </div>
            ) : null
          )}
        </div>
      </div>
    </div>
  )
})

export default CompanyCard
