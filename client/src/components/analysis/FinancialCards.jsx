import { memo } from 'react'

const FinancialCards = memo(function FinancialCards({ financials }) {
  if (!financials) return null

  const metrics = [
    { label: 'Revenue',         value: financials.revenue,       icon: '💰', color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-100' },
    { label: 'Net Profit',      value: financials.netProfit,     icon: '📊', color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-100' },
    { label: 'Market Cap',      value: financials.marketCap,     icon: '🏦', color: 'text-sky-600',   bg: 'bg-sky-50',    border: 'border-sky-100' },
    { label: 'P/E Ratio',       value: financials.peRatio,       icon: '⚖️', color: 'text-blue-600',    bg: 'bg-blue-50',    border: 'border-blue-100' },
    { label: 'EPS',             value: financials.eps,           icon: '💵', color: 'text-violet-600',  bg: 'bg-violet-50',  border: 'border-violet-100' },
    { label: 'Debt to Equity',  value: financials.debtToEquity,  icon: '📉', color: 'text-rose-600',    bg: 'bg-rose-50',    border: 'border-rose-100' },
    { label: 'Profit Margin',   value: financials.profitMargin,  icon: '💎', color: 'text-sky-600',   bg: 'bg-sky-50',    border: 'border-sky-100' },
  ]

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden h-full">
      {/* Header */}
      <div className="px-6 py-5 border-b border-slate-100 flex items-center gap-2">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0ea5e9" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="1" x2="12" y2="23" />
          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
        <h3 className="text-base font-bold text-slate-900">Financial Snapshot</h3>
      </div>

      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {metrics.map((m, idx) =>
          m.value && m.value !== 'N/A' ? (
            <div
              key={idx}
              className={`flex items-center gap-3 px-4 py-4 rounded-xl border ${m.bg} ${m.border} transition-all duration-200 hover:shadow-xs hover:-translate-y-0.5`}
            >
              <span className="text-xl flex-shrink-0">{m.icon}</span>
              <div className="min-w-0">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider truncate">{m.label}</p>
                <p className={`text-sm font-bold truncate ${m.color}`}>{m.value}</p>
              </div>
            </div>
          ) : null
        )}
      </div>
    </div>
  )
})

export default FinancialCards
