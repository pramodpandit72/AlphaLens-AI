import { Link, useLocation, useNavigate, useSearchParams } from 'react-router'
import { useState, useEffect } from 'react'

export default function Navbar() {
  const location = useLocation()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const isAnalysisPage = location.pathname === '/analysis'
  const companyFromUrl = searchParams.get('company') || ''
  const [company, setCompany] = useState(companyFromUrl)

  useEffect(() => {
    setCompany(companyFromUrl)
  }, [companyFromUrl])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (company.trim()) {
      navigate(`/analysis?company=${encodeURIComponent(company.trim())}`)
    }
  }

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-6 md:px-8 flex items-center justify-between h-20 gap-4">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 no-underline">
          <div className="w-8 h-8 rounded-lg bg-teal-600 flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="12 2 2 7 12 12 22 7 12 2" />
              <polyline points="2 17 12 22 22 17" />
              <polyline points="2 12 12 17 22 12" />
            </svg>
          </div>
          <span className="text-base font-bold text-slate-900">
            AlphaLens <span className="text-teal-600">AI</span>
          </span>
        </Link>

        {/* Search bar — analysis page only */}
        {isAnalysisPage && (
          <form onSubmit={handleSubmit} className="flex-1 max-w-sm mx-8 hidden sm:block">
            <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus-within:border-teal-500 focus-within:bg-white transition-colors">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="Search another company..."
                className="flex-1 text-sm text-slate-800 placeholder:text-slate-400 outline-none bg-transparent"
              />
            </div>
          </form>
        )}

        {/* Nav links */}
        <div className="flex items-center gap-6">
          {!isAnalysisPage && (
            <>
              <a href="#features" className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors no-underline">
                Features
              </a>
              <a href="#how-it-works" className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors no-underline">
                How It Works
              </a>
            </>
          )}
          <Link
            to="/"
            className="text-sm font-semibold text-white bg-teal-600 hover:bg-teal-700 px-5 py-2.5 rounded-lg transition-colors no-underline"
          >
            Get Started
          </Link>
        </div>

      </div>
    </nav>
  )
}
