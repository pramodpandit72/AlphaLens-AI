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
  const { data, error, analyze, isLoading, isSuccess, isError } = useAnalysis()

  useEffect(() => {
    if (!company) {
      navigate('/')
      return
    }
    analyze(company)
  }, [company, analyze, navigate])

  // Loading state
  if (isLoading) return <LoadingState />

  // Error state
  if (isError) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="text-center max-w-md px-4">
          <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-rose-50 border border-rose-100 flex items-center justify-center">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#f43f5e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <path d="m15 9-6 6" />
              <path d="m9 9 6 6" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-slate-900 mb-2">Analysis Failed</h2>
          <p className="text-sm text-slate-600 mb-8 leading-relaxed">{error}</p>
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => analyze(company)}
              className="inline-flex items-center justify-center gap-2 py-2.5 px-6 text-sm bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 transition-colors cursor-pointer"
            >
              Try Again
            </button>
            <button
              onClick={() => navigate('/')}
              className="px-6 py-2.5 text-sm font-medium text-slate-600 hover:text-slate-900 border border-slate-200 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
            >
              Go Home
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Success state — render full dashboard
  if (isSuccess && data) {
    return (
      <div className="py-12 md:py-16 bg-slate-50 min-h-screen">
        <div className="max-w-6xl mx-auto px-6 md:px-8 space-y-8 md:space-y-10">

          {/* ── Header Row ── */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="max-w-2xl">
              <button
                onClick={() => navigate('/')}
                className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-teal-600 transition-colors mb-3 cursor-pointer group"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-0.5 transition-transform">
                  <path d="m12 19-7-7 7-7" />
                  <path d="M19 12H5" />
                </svg>
                Back to home
              </button>
              <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
                Analysis Report
              </h1>
              <p className="text-sm text-slate-500 mt-1">AI-generated research for <span className="font-semibold text-teal-600">{data.company}</span></p>
            </div>
            <button
              onClick={() => window.print()}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 border border-slate-200 rounded-xl hover:bg-slate-100 hover:text-slate-900 transition-all duration-200 cursor-pointer"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 6 2 18 2 18 9" />
                <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
                <rect width="12" height="8" x="6" y="14" />
              </svg>
              Export PDF
            </button>
          </div>

          {/* ── Row 1: Company + Decision (2 columns) ── */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-3">
              <CompanyCard data={data} />
            </div>
            <div className="lg:col-span-2">
              <DecisionCard decision={data.decision} confidence={data.confidence} />
            </div>
          </div>

          {/* ── Row 2: AI Reasoning ── */}
          <ReasoningSection reason={data.reason} />

          {/* ── Row 3: Score Cards (full width) ── */}
          <ScoreCards scorecard={data.scorecard} />

          {/* ── Row 4: Financials + Risk (2 columns) ── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <FinancialCards financials={data.financials} />
            <RiskAnalysis risks={data.risks} />
          </div>

          {/* ── Row 5: Strengths/Weaknesses + News (2 columns) ── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <StrengthsWeaknesses strengths={data.strengths} weaknesses={data.weaknesses} />
            <NewsList news={data.latestNews} />
          </div>

          {/* ── Bottom CTA ── */}
          <div className="text-center py-6">
            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center justify-center gap-2 py-3 px-8 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 transition-colors cursor-pointer"
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
