import { memo } from 'react'

const StrengthsWeaknesses = memo(function StrengthsWeaknesses({ strengths, weaknesses }) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden h-full">
      {/* Header */}
      <div className="px-6 py-5 border-b border-slate-100 flex items-center gap-2">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0d9488" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="m9 12 2 2 4-4" />
        </svg>
        <h3 className="text-base font-bold text-slate-900">Strengths & Weaknesses</h3>
      </div>

      <div className="p-6 space-y-6">
        {/* Strengths */}
        {strengths && strengths.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
              <p className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Strengths</p>
              <span className="ml-1 px-1.5 py-0.5 bg-emerald-50 text-emerald-600 text-[10px] font-bold rounded-full border border-emerald-100">
                {strengths.length}
              </span>
            </div>
            <ul className="space-y-3">
              {strengths.map((strength, index) => (
                <li key={index} className="flex items-start gap-3 p-4 bg-emerald-50/50 border border-emerald-100/70 rounded-xl group hover:bg-emerald-100/40 transition-colors">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 flex-shrink-0">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span className="text-sm text-slate-900 leading-relaxed">{strength}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Weaknesses */}
        {weaknesses && weaknesses.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 rounded-full bg-rose-500" />
              <p className="text-xs font-bold text-rose-600 uppercase tracking-wider">Weaknesses</p>
              <span className="ml-1 px-1.5 py-0.5 bg-rose-50 text-rose-600 text-[10px] font-bold rounded-full border border-rose-100">
                {weaknesses.length}
              </span>
            </div>
            <ul className="space-y-3">
              {weaknesses.map((weakness, index) => (
                <li key={index} className="flex items-start gap-3 p-4 bg-rose-50/50 border border-rose-100/70 rounded-xl group hover:bg-rose-100/40 transition-colors">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#f43f5e" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 flex-shrink-0">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                  <span className="text-sm text-slate-900 leading-relaxed">{weakness}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
})

export default StrengthsWeaknesses
