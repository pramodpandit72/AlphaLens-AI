const severityConfig = {
  high: { color: 'bg-pass-light text-pass-dark border-pass/20', dot: 'bg-pass' },
  medium: { color: 'bg-amber-50 text-amber-700 border-amber-200', dot: 'bg-amber-500' },
  low: { color: 'bg-invest-light text-invest-dark border-invest/20', dot: 'bg-invest' },
}

export default function RiskAnalysis({ risks }) {
  if (!risks || risks.length === 0) return null

  return (
    <div>
      <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
          <path d="M12 9v4" />
          <path d="M12 17h.01" />
        </svg>
        Risk Analysis
      </h3>
      <div className="space-y-3">
        {risks.map((risk, index) => {
          const config = severityConfig[risk.severity] || severityConfig.medium
          return (
            <div key={index} className={`glass-card p-5 border ${config.color.split(' ').pop()}`}>
              <div className="flex items-start gap-3">
                <span className={`flex-shrink-0 w-2 h-2 mt-2 rounded-full ${config.dot}`} />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-semibold text-text-primary">{risk.category}</span>
                    <span className={`px-2 py-0.5 text-xs font-medium rounded-md capitalize ${config.color}`}>
                      {risk.severity}
                    </span>
                  </div>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {risk.description}
                  </p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
