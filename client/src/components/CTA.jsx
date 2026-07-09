export default function CTA() {
  return (
    <section className="py-16 md:py-20 bg-slate-50">
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        <div className="max-w-xl mx-auto text-center">

          <h2 className="text-2xl md:text-4xl font-bold text-slate-900 tracking-tight mb-4">
            Ready to try it?
          </h2>
          <p className="text-sm md:text-base text-slate-500 mb-12 leading-relaxed">
            Search any public company and get an AI-generated equity analysis in under 30 seconds.
          </p>
          <button
            id="cta-start-research"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' })
              setTimeout(() => {
                document.getElementById('hero-search-input')?.focus()
              }, 500)
            }}
            className="inline-flex items-center justify-center gap-2 py-3.5 px-9 bg-sky-600 text-white font-semibold rounded-lg hover:bg-sky-700 transition-colors cursor-pointer"
          >
            Start Analysis
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </button>

        </div>
      </div>
    </section>
  )
}
