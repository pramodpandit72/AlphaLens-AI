import { memo } from 'react'

const sentimentStyles = {
  POSITIVE: { dot: 'bg-emerald-500', badge: 'bg-emerald-50 text-emerald-700 border-emerald-100', icon: '📈' },
  NEGATIVE: { dot: 'bg-rose-500',    badge: 'bg-rose-50 text-rose-700 border-rose-100',          icon: '📉' },
  NEUTRAL:  { dot: 'bg-slate-400',   badge: 'bg-slate-50 text-slate-600 border-slate-100',       icon: '📰' },
}

const NewsList = memo(function NewsList({ news }) {
  if (!news || news.length === 0) return null

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden h-full">
      {/* Header */}
      <div className="px-6 py-5 border-b border-slate-100 flex items-center gap-2">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0ea5e9" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 0-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" />
          <path d="M18 14h-8" />
          <path d="M15 18h-5" />
          <path d="M10 6h8v4h-8V6Z" />
        </svg>
        <h3 className="text-base font-bold text-slate-900">Latest News</h3>
        <span className="ml-auto text-xs text-slate-400">{news.length} articles</span>
      </div>

      <div className="p-6 space-y-4">
        {news.map((item, index) => {
          const sentiment = (item.sentiment || 'NEUTRAL').toUpperCase()
          const styles = sentimentStyles[sentiment] || sentimentStyles.NEUTRAL

          return (
            <div
              key={index}
              className="p-4 bg-slate-50 rounded-xl border border-slate-100 hover:bg-white hover:shadow-xs transition-all duration-200 group"
            >
              <div className="flex items-start gap-3">
                <span className="text-lg flex-shrink-0 mt-0.5">{styles.icon}</span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1.5">
                    <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${styles.dot}`} />
                    <p className="text-sm font-semibold text-slate-900 leading-snug line-clamp-1 flex-1">{item.title}</p>
                    <span className={`flex-shrink-0 px-2 py-0.5 text-[10px] font-bold rounded-full border uppercase tracking-wide ${styles.badge}`}>
                      {sentiment}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">{item.summary}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
})

export default NewsList
