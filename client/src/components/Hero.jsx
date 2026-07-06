import { useState } from 'react'
import { useNavigate } from 'react-router'

export default function Hero() {
  const [company, setCompany] = useState('')
  const navigate = useNavigate()

  const handleAnalyze = (e) => {
    e.preventDefault()
    if (company.trim()) {
      navigate(`/analysis?company=${encodeURIComponent(company.trim())}`)
    }
  }

  return (
    <section className="relative overflow-hidden pt-20 pb-28 md:pt-32 md:pb-40">
      {/* Background decorations */}
      <div className="absolute inset-0 -z-10">
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(99, 102, 241, 0.5) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(99, 102, 241, 0.5) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
        {/* Gradient orbs */}
        <div className="absolute top-20 -left-32 w-96 h-96 bg-brand-200 rounded-full opacity-20 blur-3xl" />
        <div className="absolute bottom-20 -right-32 w-96 h-96 bg-brand-300 rounded-full opacity-15 blur-3xl" />
      </div>

      <div className="section-container text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand-50 border border-brand-200 rounded-full text-sm text-brand-700 font-medium mb-8 animate-fade-in">
          <span className="w-1.5 h-1.5 bg-brand-500 rounded-full animate-pulse-soft" />
          AI-Powered Research
        </div>

        {/* Heading */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-text-primary mb-6 animate-slide-up">
          Investment Research
          <br />
          <span className="gradient-text">in Seconds</span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-xl mx-auto text-lg md:text-xl text-text-secondary mb-12 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          Enter any company name and get instant AI-powered analysis with
          financial metrics, risk assessment, and investment recommendations.
        </p>

        {/* Search Input */}
        <form
          onSubmit={handleAnalyze}
          className="max-w-lg mx-auto animate-slide-up"
          style={{ animationDelay: '0.2s' }}
        >
          <div className="flex items-center gap-3 p-2 bg-white rounded-2xl border border-border-primary shadow-card focus-within:shadow-card-hover focus-within:border-brand-300 transition-all">
            <div className="pl-3 text-text-tertiary">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </div>
            <input
              id="hero-search-input"
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="Enter company name (e.g., Apple, Tesla, Nvidia...)"
              className="flex-1 py-3 text-base text-text-primary placeholder:text-text-tertiary outline-none bg-transparent"
            />
            <button
              id="hero-analyze-button"
              type="submit"
              disabled={!company.trim()}
              className="btn-primary py-3 px-6 text-sm whitespace-nowrap"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
              </svg>
              Analyze
            </button>
          </div>
        </form>

        {/* Trust indicators */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-text-tertiary animate-slide-up" style={{ animationDelay: '0.3s' }}>
          <span className="flex items-center gap-1.5">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            Real-time data
          </span>
          <span className="flex items-center gap-1.5">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            AI-powered analysis
          </span>
          <span className="flex items-center gap-1.5">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            Instant recommendations
          </span>
        </div>
      </div>
    </section>
  )
}
