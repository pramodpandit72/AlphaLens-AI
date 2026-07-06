export default function ReasoningSection({ reason }) {
  if (!reason) return null

  return (
    <div className="glass-card p-8">
      <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
        AI Reasoning
      </h3>
      <p className="text-base text-text-secondary leading-relaxed">
        {reason}
      </p>
    </div>
  )
}
