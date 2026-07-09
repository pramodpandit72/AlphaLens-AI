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
      setActiveStep((prev) => (prev < loadingSteps.length - 1 ? prev + 1 : prev))
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-slate-50 py-16">
      <div className="w-full max-w-3xl px-4">

        {/* Heading */}
        <div className="text-center mb-12">
          {/* Spinning orb */}
          <div className="relative w-16 h-16 mx-auto mb-6">
            <div className="absolute inset-0 rounded-2xl bg-sky-600 animate-pulse shadow-md" />
            <div className="absolute inset-1.5 rounded-xl bg-white flex items-center justify-center text-2xl">
              {loadingSteps[activeStep].icon}
            </div>
            <div className="absolute -inset-1 rounded-[20px] border-2 border-transparent border-t-sky-500 animate-spin" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 mb-1">Analyzing Company</h2>
          <p className="text-sm text-slate-500">AI agents are researching in real-time…</p>
        </div>

        {/* Step progress */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-7 mb-8 space-y-3">
          {loadingSteps.map((step, index) => (
            <div
              key={index}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-500 ${
                index < activeStep
                  ? 'bg-emerald-50 text-emerald-700'
                  : index === activeStep
                  ? 'bg-sky-50 text-sky-700 shadow-xs border border-sky-100'
                  : 'text-slate-400 opacity-50'
              }`}
            >
              <span className="shrink-0 w-5 h-5 flex items-center justify-center">
                {index < activeStep ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                ) : index === activeStep ? (
                  <div className="w-3 h-3 bg-sky-500 rounded-full animate-pulse" />
                ) : (
                  <div className="w-2 h-2 bg-current rounded-full" />
                )}
              </span>
              <span className="text-sm font-medium">{step.text}</span>
            </div>
          ))}
        </div>

        {/* Skeleton preview of report */}
        <div className="space-y-5">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider text-center mb-5">Preview generating…</p>
          
          {/* Skeleton company + decision row */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
            <div className="lg:col-span-3 bg-white border border-slate-200 rounded-xl shadow-sm p-7 space-y-4">
              <div className="bg-slate-200 animate-pulse h-5 w-2/3 rounded-lg" />
              <div className="bg-slate-200 animate-pulse h-3 w-1/3 rounded" />
              <div className="grid grid-cols-3 gap-3 mt-4">
                {[1,2,3,4,5,6].map(i => (
                  <div key={i} className="space-y-1.5">
                    <div className="bg-slate-200 animate-pulse h-2 w-3/4 rounded" />
                    <div className="bg-slate-200 animate-pulse h-3 w-full rounded" />
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:col-span-2 bg-white border border-slate-200 rounded-xl shadow-sm p-7 flex flex-col items-center justify-center space-y-5">
              <div className="bg-slate-200 animate-pulse w-20 h-20 rounded-full" />
              <div className="bg-slate-200 animate-pulse h-8 w-24 rounded-lg" />
              <div className="bg-slate-200 animate-pulse h-3 w-28 rounded" />
            </div>
          </div>

          {/* Skeleton scores */}
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6">
            <div className="bg-slate-200 animate-pulse h-4 w-32 rounded mb-5" />
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
              {[1,2,3,4,5].map(i => (
                <div key={i} className="text-center space-y-2">
                  <div className="bg-slate-200 animate-pulse w-8 h-8 rounded-lg mx-auto" />
                  <div className="bg-slate-200 animate-pulse h-2 w-full rounded" />
                  <div className="bg-slate-200 animate-pulse h-5 w-10 rounded mx-auto" />
                  <div className="bg-slate-200 animate-pulse h-1.5 w-full rounded-full" />
                </div>
              ))}
            </div>
          </div>
        </div>

        <p className="mt-8 text-xs text-slate-400 text-center">
          This usually takes 15–30 seconds…
        </p>
      </div>
    </div>
  )
}
