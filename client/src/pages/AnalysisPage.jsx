import { useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router'
import useAnalysis from '../hooks/useAnalysis'
import LoadingState from '../components/analysis/LoadingState'
import CompanyCard from '../components/analysis/CompanyCard'
import FinancialCards from '../components/analysis/FinancialCards'
import NewsList from '../components/analysis/NewsList'
import StrengthsWeaknesses from '../components/analysis/StrengthsWeaknesses'
import RiskAnalysis from '../components/analysis/RiskAnalysis'
import ScoreCards from '../components/analysis/ScoreCards'
import DecisionCard from '../components/analysis/DecisionCard'
import ReasoningSection from '../components/analysis/ReasoningSection'

export default function AnalysisPage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const company = searchParams.get('company')
  const { status, data, error, analyze, isLoading, isSuccess, isError } = useAnalysis()

  useEffect(() => {
    if (!company) {
      navigate('/')
      return
    }
    analyze(company)
  }, [company, analyze, navigate])

  // Loading state
  if (isLoading) {
    return <LoadingState />
  }

  // Error state
  if (isError) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="text-center max-w-md px-4">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-pass-light flex items-center justify-center">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <path d="m15 9-6 6" />
              <path d="m9 9 6 6" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-text-primary mb-2">Analysis Failed</h2>
          <p className="text-sm text-text-secondary mb-6">{error}</p>
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => analyze(company)}
              className="btn-primary py-3 px-6 text-sm"
            >
              Try Again
            </button>
            <button
              onClick={() => navigate('/')}
              className="px-6 py-3 text-sm font-medium text-text-secondary hover:text-text-primary border border-border-primary rounded-xl hover:bg-gray-50 transition-colors cursor-pointer"
            >
              Go Home
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Success state — render full report
  if (isSuccess && data) {
    return (
      <div className="py-10 md:py-16 animate-fade-in">
        <div className="section-container space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <button
                onClick={() => navigate('/')}
                className="flex items-center gap-1.5 text-sm text-text-tertiary hover:text-text-primary transition-colors mb-3 cursor-pointer"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m12 19-7-7 7-7" />
                  <path d="M19 12H5" />
                </svg>
                Back to home
              </button>
              <h1 className="text-2xl md:text-3xl font-bold text-text-primary">
                Analysis Report
              </h1>
            </div>
          </div>

          {/* Company Info */}
          <CompanyCard data={data} />

          {/* Decision Card */}
          <DecisionCard decision={data.decision} confidence={data.confidence} />

          {/* AI Reasoning */}
          <ReasoningSection reason={data.reason} />

          {/* Score Cards */}
          <ScoreCards scorecard={data.scorecard} />

          {/* Financial Metrics */}
          <FinancialCards financials={data.financials} />

          {/* Strengths & Weaknesses */}
          <StrengthsWeaknesses strengths={data.strengths} weaknesses={data.weaknesses} />

          {/* Risk Analysis */}
          <RiskAnalysis risks={data.risks} />

          {/* Latest News */}
          <NewsList news={data.latestNews} />

          {/* Analyze another company */}
          <div className="text-center pt-6 pb-4">
            <button
              onClick={() => navigate('/')}
              className="btn-primary py-3 px-8"
            >
              Analyze Another Company
            </button>
          </div>
        </div>
      </div>
    )
  }

  return null
}
