import { useEffect, useState, memo } from 'react'

const scoreLabels = {
  financialHealth: { label: 'Financial Health', icon: '💰', desc: 'Balance sheet strength' },
  growth:         { label: 'Growth',           icon: '📈', desc: 'Revenue & expansion' },
  innovation:     { label: 'Innovation',       icon: '💡', desc: 'R&D & tech adoption' },
  competition:    { label: 'Competition',      icon: '⚔️', desc: 'Market position' },
  risk:           { label: 'Risk',             icon: '🛡️', desc: 'Higher = safer' },
}

const getScoreStyle = (score) => {
  if (score >= 7) return { bar: 'bg-emerald-500', text: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-100' }
  if (score >= 5) return { bar: 'bg-amber-400',   text: 'text-amber-600',   bg: 'bg-amber-50',   border: 'border-amber-100' }
  return           { bar: 'bg-rose-500',          text: 'text-rose-600',    bg: 'bg-rose-50',    border: 'border-rose-100' }
}

const ScoreCards = memo(function ScoreCards({ scorecard }) {
  const [animated, setAnimated] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setAnimated(true), 300)
    return () => clearTimeout(timer)
  }, [])

  if (!scorecard) return null

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-6 py-5 border-b border-slate-100 flex items-center gap-2">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0d9488" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
        </svg>
        <h3 className="text-base font-bold text-slate-900">Score Card</h3>
        <span className="ml-auto text-xs text-slate-400">Scores out of 10</span>
      </div>

      {/* Score grid */}
      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-5">
        {Object.entries(scoreLabels).map(([key, { label, icon, desc }]) => {
          const score = scorecard[key] || 0
          const styles = getScoreStyle(score)
          const width = (score / 10) * 100

          return (
            <div
              key={key}
              className={`rounded-xl p-5 border text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-xs ${styles.bg} ${styles.border}`}
            >
              <span className="text-2xl mb-2 block">{icon}</span>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 leading-tight">{label}</p>
              <p className="text-[10px] text-slate-400 mb-3">{desc}</p>
              <p className={`text-3xl font-black mb-3 ${styles.text}`}>
                {score}<span className="text-sm font-normal text-slate-400">/10</span>
              </p>
              <div className="w-full h-1.5 bg-white/70 rounded-full overflow-hidden border border-white/50">
                <div
                  className={`h-full rounded-full transition-all duration-1000 ease-out ${styles.bar}`}
                  style={{ width: animated ? `${width}%` : '0%' }}
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
})

export default ScoreCards
