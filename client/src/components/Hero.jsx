import { useState } from 'react'
import { useNavigate } from 'react-router'

const popularCompanies = ['Apple', 'Tesla', 'Nvidia', 'Microsoft', 'Amazon']

export default function Hero() {
  const [company, setCompany] = useState('')
  const navigate = useNavigate()

  const handleAnalyze = (e) => {
    e.preventDefault()
    if (company.trim()) {
      navigate(`/analysis?company=${encodeURIComponent(company.trim())}`)
    }
  }

  const handleTagClick = (name) => {
    navigate(`/analysis?company=${encodeURIComponent(name)}`)
  }

  return (
    <section className="bg-white py-16 md:py-20">
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        <div className="max-w-3xl mx-auto text-center">



          {/* Heading */}
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 leading-tight tracking-tight mb-6">
            AI-Powered Stock Research
            <br />
            <span className="text-sky-600">in Seconds</span>
          </h1>

          {/* Subtitle */}
          <p className="text-base md:text-lg text-slate-500 mb-12 max-w-2xl mx-auto leading-relaxed">
            Search any public company and get instant AI analysis — financial scores, risk assessment, news sentiment, and a clear investment verdict.
          </p>

          {/* Search box */}
          <form onSubmit={handleAnalyze} className="mb-6">
            <div className="flex items-center gap-3 p-2.5 bg-white border border-slate-200 rounded-xl shadow-sm focus-within:border-sky-500 focus-within:ring-2 focus-within:ring-sky-100 transition-all">
              <div className="pl-2 text-slate-400">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
              </div>
              <input
                id="hero-search-input"
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="e.g. Tesla, Nvidia, Apple..."
                className="flex-1 py-3 px-2 text-sm text-slate-900 placeholder:text-slate-400 outline-none bg-transparent"
              />
              <button
                id="hero-analyze-button"
                type="submit"
                disabled={!company.trim()}
                className="inline-flex items-center justify-center gap-2 py-3 px-7 text-sm bg-sky-600 text-white font-semibold rounded-lg hover:bg-sky-700 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Analyze
              </button>
            </div>
          </form>

          {/* Quick tags */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <span className="text-xs text-slate-400">Try:</span>
            {popularCompanies.map((name) => (
              <button
                key={name}
                type="button"
                onClick={() => handleTagClick(name)}
                className="px-3 py-1 text-xs font-medium text-slate-600 bg-slate-50 border border-slate-200 rounded-lg hover:border-sky-300 hover:text-sky-700 hover:bg-sky-50 transition-colors cursor-pointer"
              >
                {name}
              </button>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
