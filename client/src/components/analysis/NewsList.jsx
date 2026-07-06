const sentimentColors = {
  positive: 'bg-invest-light text-invest-dark',
  negative: 'bg-pass-light text-pass-dark',
  neutral: 'bg-gray-100 text-gray-600',
}

export default function NewsList({ news }) {
  if (!news || news.length === 0) return null

  return (
    <div>
      <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" />
          <path d="M18 14h-8" />
          <path d="M15 18h-5" />
          <path d="M10 6h8v4h-8V6Z" />
        </svg>
        Latest News
      </h3>
      <div className="space-y-3">
        {news.map((item, index) => (
          <div key={index} className="glass-card p-5">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h4 className="text-sm font-semibold text-text-primary mb-1.5 leading-snug">
                  {item.title}
                </h4>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {item.summary}
                </p>
              </div>
              {item.sentiment && (
                <span className={`flex-shrink-0 px-2.5 py-1 text-xs font-medium rounded-md capitalize ${sentimentColors[item.sentiment] || sentimentColors.neutral}`}>
                  {item.sentiment}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
