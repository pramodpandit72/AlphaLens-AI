import { memo } from 'react'

const severityStyles = {
  HIGH:   { bar: 'bg-rose-500',   badge: 'bg-rose-100 text-rose-700 border-rose-200',   card: 'border-l-rose-400' },
  MEDIUM: { bar: 'bg-amber-400',  badge: 'bg-amber-100 text-amber-700 border-amber-200', card: 'border-l-amber-400' },
  LOW:    { bar: 'bg-sky-400',    badge: 'bg-sky-100 text-sky-700 border-sky-200',       card: 'border-l-sky-400' },
}

const severityWidth = { HIGH: '85%', MEDIUM: '50%', LOW: '25%' }

const RiskAnalysis = memo(function RiskAnalysis({ risks }) {
  if (!risks || risks.length === 0) return null

  const highCount = risks.filter((r) => r.severity === 'HIGH').length

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden h-full">
      {/* Header */}
      <div className="px-6 py-5 border-b border-slate-100 flex items-center gap-2">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
          <path d="M12 9v4" />
          <path d="M12 17h.01" />
        </svg>
        <h3 className="text-base font-bold text-slate-900">Risk Analysis</h3>
        {highCount > 0 && (
          <span className="ml-auto px-2 py-0.5 bg-rose-50 text-rose-600 text-[10px] font-bold rounded-full border border-rose-100">
            {highCount} High Risk
          </span>
        )}
      </div>

      <div className="p-6 space-y-4">
        {risks.map((risk, index) => {
          const severity = (risk.severity || 'MEDIUM').toUpperCase()
          const styles = severityStyles[severity] || severityStyles.MEDIUM

          return (
            <div
              key={index}
              className={`p-4 bg-slate-50 rounded-xl border-l-4 border border-slate-200/60 transition-all duration-200 hover:bg-slate-100/60 hover:shadow-xs ${styles.card}`}
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <p className="text-sm font-semibold text-slate-900 leading-snug">{risk.category}</p>
                <span className={`flex-shrink-0 px-2 py-0.5 text-[10px] font-bold rounded-full border uppercase tracking-wider ${styles.badge}`}>
                  {severity}
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed mb-3">{risk.description}</p>
              <div className="w-full h-1 bg-slate-200/50 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-700 ease-out ${styles.bar}`}
                  style={{ width: severityWidth[severity] || '50%' }}
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
})

export default RiskAnalysis
