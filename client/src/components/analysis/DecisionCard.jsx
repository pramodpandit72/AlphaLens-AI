import { useEffect, useState, memo } from 'react'

const DecisionCard = memo(function DecisionCard({ decision, confidence }) {
  const [animatedConfidence, setAnimatedConfidence] = useState(0)
  const isInvest = decision === 'INVEST'

  useEffect(() => {
    const duration = 1500
    const start = performance.now()
    const animate = (currentTime) => {
      const elapsed = currentTime - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setAnimatedConfidence(Math.round(eased * confidence))
      if (progress < 1) requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }, [confidence])

  const investStyles = {
    bg: 'bg-emerald-600',
    badge: 'bg-emerald-700/50 text-white border-emerald-500/30',
  }

  const passStyles = {
    bg: 'bg-rose-600',
    badge: 'bg-rose-700/50 text-white border-rose-500/30',
  }

  const styles = isInvest ? investStyles : passStyles
  const circumference = 2 * Math.PI * 40

  return (
    <div className={`relative overflow-hidden rounded-2xl ${styles.bg} h-full flex flex-col items-center justify-center py-12 px-8 text-center shadow-md`}>
      <div className="relative z-10 flex flex-col items-center gap-5">
        {/* Badge */}
        <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold backdrop-blur-sm ${styles.badge} border`}>
          {isInvest ? '✅' : '❌'} AI Recommendation
        </div>

        {/* Decision text */}
        <h2 className="text-6xl md:text-7xl font-black text-white tracking-tight leading-none">
          {decision}
        </h2>

        {/* Confidence ring */}
        <div className="relative w-28 h-28 md:w-32 md:h-32">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="7" />
            <circle
              cx="50" cy="50" r="40"
              fill="none"
              stroke="white"
              strokeWidth="7"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={circumference * (1 - animatedConfidence / 100)}
              className="transition-all duration-1000 ease-out"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-black text-white leading-none">{animatedConfidence}%</span>
            <span className="text-[10px] text-white/70 font-medium mt-0.5">confidence</span>
          </div>
        </div>

        <p className="text-white/70 text-xs font-medium uppercase tracking-widest">
          AI Confidence Score
        </p>
      </div>
    </div>
  )
})

export default DecisionCard
