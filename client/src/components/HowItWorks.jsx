const steps = [
  {
    number: '01',
    title: 'Enter Company Name',
    description: 'Type the name of any publicly traded company you want to research.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        <path d="M13 8H7" />
        <path d="M17 12H7" />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'AI Researches Company',
    description: 'Our AI agent searches the web, fetches financial data, and reads the latest news.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Review Recommendation',
    description: 'Get a detailed report with scores, risks, and a clear INVEST or PASS verdict.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7Z" />
        <path d="M5 16H2" />
        <path d="M22 16h-3" />
        <path d="M12 16v6" />
      </svg>
    ),
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 md:py-28">
      <div className="section-container">
        {/* Section header */}
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-brand-600 uppercase tracking-wider mb-3">How It Works</p>
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary tracking-tight">
            Three simple steps to
            <br />
            <span className="gradient-text">smarter decisions</span>
          </h2>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connecting line (desktop only) */}
          <div className="hidden md:block absolute top-16 left-[20%] right-[20%] h-[2px] bg-gradient-to-r from-brand-200 via-brand-400 to-brand-200" />

          {steps.map((step, index) => (
            <div key={index} className="relative text-center">
              {/* Step circle */}
              <div className="relative z-10 w-16 h-16 mx-auto mb-6 rounded-2xl bg-white border-2 border-brand-200 flex items-center justify-center text-brand-600 shadow-card">
                {step.icon}
              </div>

              {/* Step number */}
              <span className="text-xs font-bold text-brand-400 uppercase tracking-widest mb-2 block">
                Step {step.number}
              </span>

              {/* Title & description */}
              <h3 className="text-lg font-semibold text-text-primary mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed max-w-xs mx-auto">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
