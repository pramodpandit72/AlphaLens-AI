import { useEffect, useState } from 'react'

const loadingSteps = [
  { text: 'Searching company information...', icon: '🔍' },
  { text: 'Fetching financial data...', icon: '💰' },
  { text: 'Reading latest news...', icon: '📰' },
  { text: 'Analyzing market position...', icon: '📊' },
  { text: 'Generating recommendation...', icon: '🤖' },
]

export default function LoadingState() {
  const [activeStep, setActiveStep] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => {
        if (prev < loadingSteps.length - 1) return prev + 1
        return prev
      })
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="text-center max-w-md w-full px-4">
        {/* Animated orb */}
        <div className="relative w-20 h-20 mx-auto mb-10">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 animate-pulse-soft" />
          <div className="absolute inset-2 rounded-full bg-white flex items-center justify-center">
            <span className="text-2xl">{loadingSteps[activeStep].icon}</span>
          </div>
          {/* Spinning ring */}
          <div className="absolute -inset-2 rounded-full border-2 border-transparent border-t-brand-400 animate-spin" />
        </div>

        {/* Steps list */}
        <div className="space-y-3">
          {loadingSteps.map((step, index) => (
            <div
              key={index}
              className={`flex items-center gap-3 px-5 py-3 rounded-xl transition-all duration-500 ${
                index < activeStep
                  ? 'bg-invest-light/50 text-invest-dark'
                  : index === activeStep
                  ? 'bg-brand-50 text-brand-700 shadow-card'
                  : 'text-text-tertiary'
              }`}
            >
              {/* Status icon */}
              <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center">
                {index < activeStep ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                ) : index === activeStep ? (
                  <div className="w-3 h-3 bg-brand-500 rounded-full animate-pulse-soft" />
                ) : (
                  <div className="w-2 h-2 bg-current rounded-full opacity-30" />
                )}
              </span>
              <span className={`text-sm font-medium ${index === activeStep ? '' : ''}`}>
                {step.text}
              </span>
            </div>
          ))}
        </div>

        <p className="mt-8 text-sm text-text-tertiary">
          This usually takes 15-30 seconds...
        </p>
      </div>
    </div>
  )
}
