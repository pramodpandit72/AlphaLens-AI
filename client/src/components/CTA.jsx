import { useNavigate } from 'react-router'

export default function CTA() {
  const navigate = useNavigate()

  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="section-container">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-600 via-brand-500 to-brand-700 p-12 md:p-20 text-center">
          {/* Background decoration */}
          <div className="absolute inset-0 opacity-10">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `radial-gradient(circle at 25% 25%, white 1px, transparent 1px),
                                  radial-gradient(circle at 75% 75%, white 1px, transparent 1px)`,
                backgroundSize: '40px 40px',
              }}
            />
          </div>

          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
              Ready to make smarter investments?
            </h2>
            <p className="text-lg text-brand-100 mb-10 max-w-lg mx-auto">
              Join thousands of investors using AI to research companies faster and more accurately.
            </p>
            <button
              id="cta-start-research"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' })
                setTimeout(() => {
                  document.getElementById('hero-search-input')?.focus()
                }, 500)
              }}
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-brand-600 font-semibold rounded-xl hover:bg-brand-50 transition-colors shadow-elevated cursor-pointer text-base"
            >
              Start Research
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
