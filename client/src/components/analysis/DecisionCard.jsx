import { useEffect, useState } from 'react'

export default function DecisionCard({ decision, confidence }) {
  const [animatedConfidence, setAnimatedConfidence] = useState(0)
  const isInvest = decision === 'INVEST'

  useEffect(() => {
    // Animate confidence from 0 to actual value
    const duration = 1500
    const start = performance.now()

    const animate = (currentTime) => {
      const elapsed = currentTime - start
      const progress = Math.min(elapsed / duration, 1)
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setAnimatedConfidence(Math.round(eased * confidence))

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [confidence])

  return (
    <div className={`relative overflow-hidden rounded-2xl p-10 md:p-14 text-center ${
      isInvest
        ? 'bg-gradient-to-br from-emerald-500 to-emerald-600'
        : 'bg-gradient-to-br from-red-500 to-red-600'
    }`}>
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
            backgroundSize: '24px 24px',
          }}
        />
      </div>

      <div className="relative z-10">
        {/* Decision badge */}
        <div className="inline-flex items-center gap-2 px-5 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white font-medium text-sm mb-6">
          {isInvest ? '✅' : '❌'} AI Recommendation
        </div>

        {/* Decision text */}
        <h2 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-4">
          {decision}
        </h2>

        {/* Confidence ring */}
        <div className="relative w-28 h-28 mx-auto mb-4">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50" cy="50" r="42"
              fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="8"
            />
            <circle
              cx="50" cy="50" r="42"
              fill="none" stroke="white" strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 42}`}
              strokeDashoffset={`${2 * Math.PI * 42 * (1 - animatedConfidence / 100)}`}
              className="transition-all duration-1000 ease-out"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-bold text-white">{animatedConfidence}%</span>
          </div>
        </div>

        <p className="text-white/80 text-sm">Confidence Score</p>
      </div>
    </div>
  )
}
