export default function StrengthsWeaknesses({ strengths, weaknesses }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Strengths */}
      <div className="glass-card p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
          <span className="w-8 h-8 rounded-lg bg-invest-light text-invest-dark flex items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </span>
          Strengths
        </h3>
        <ul className="space-y-3">
          {strengths?.map((item, index) => (
            <li key={index} className="flex items-start gap-3 text-sm text-text-secondary leading-relaxed">
              <span className="flex-shrink-0 w-1.5 h-1.5 mt-2 bg-invest rounded-full" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Weaknesses */}
      <div className="glass-card p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
          <span className="w-8 h-8 rounded-lg bg-pass-light text-pass-dark flex items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <path d="m15 9-6 6" />
              <path d="m9 9 6 6" />
            </svg>
          </span>
          Weaknesses
        </h3>
        <ul className="space-y-3">
          {weaknesses?.map((item, index) => (
            <li key={index} className="flex items-start gap-3 text-sm text-text-secondary leading-relaxed">
              <span className="flex-shrink-0 w-1.5 h-1.5 mt-2 bg-pass rounded-full" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
