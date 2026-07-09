import { memo } from 'react'

const ReasoningSection = memo(function ReasoningSection({ reason }) {
  if (!reason) return null

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
      <div className="px-6 py-5 border-b border-slate-100 flex items-center gap-2">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0d9488" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 16v-4" />
          <path d="M12 8h.01" />
        </svg>
        <h3 className="text-base font-bold text-slate-900">AI Reasoning</h3>
        <span className="ml-auto inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-sky-50 text-sky-700 text-xs font-semibold rounded-full border border-sky-100">
          <span className="w-1.5 h-1.5 bg-sky-500 rounded-full animate-pulse" />
          AI Reasoning
        </span>
      </div>
      <div className="p-7">
        <p className="text-sm text-slate-600 leading-relaxed border-l-4 border-sky-200 pl-4 italic bg-sky-50/30 py-3 pr-4 rounded-r-xl">
          "{reason}"
        </p>
      </div>
    </div>
  )
})

export default ReasoningSection
