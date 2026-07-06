import { useEffect, useState } from 'react'

const scoreLabels = {
  financialHealth: { label: 'Financial Health', icon: '💰' },
  growth: { label: 'Growth', icon: '📈' },
  innovation: { label: 'Innovation', icon: '💡' },
  competition: { label: 'Competition', icon: '⚔️' },
  risk: { label: 'Risk (Lower = Riskier)', icon: '🛡️' },
}

const getScoreColor = (score) => {
  if (score >= 7) return { bar: 'bg-invest', text: 'text-invest-dark' }
  if (score >= 5) return { bar: 'bg-score-mid', text: 'text-amber-600' }
  return { bar: 'bg-pass', text: 'text-pass-dark' }
}

export default function ScoreCards({ scorecard }) {
  const [animated, setAnimated] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setAnimated(true), 300)
    return () => clearTimeout(timer)
  }, [])

  if (!scorecard) return null

  return (
    <div>
      <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
        </svg>
        Score Card
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {Object.entries(scoreLabels).map(([key, { label, icon }]) => {
          const score = scorecard[key] || 0
          const colors = getScoreColor(score)
          const width = (score / 10) * 100

          return (
            <div key={key} className="glass-card p-5 text-center">
              <span className="text-2xl mb-2 block">{icon}</span>
              <p className="text-xs text-text-tertiary uppercase tracking-wider mb-3">{label}</p>
              <p className={`text-3xl font-bold mb-3 ${colors.text}`}>
                {score}<span className="text-base font-normal text-text-tertiary">/10</span>
              </p>
              {/* Progress bar */}
              <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-1000 ease-out ${colors.bar}`}
                  style={{ width: animated ? `${width}%` : '0%' }}
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
