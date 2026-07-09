const steps = [
  {
    number: '01',
    title: 'Enter a company name',
    description: 'Type the name or ticker symbol of any publicly traded company.',
  },
  {
    number: '02',
    title: 'AI researches in real-time',
    description: 'AI agents pull financial data, scan news, and build an analytical summary.',
  },
  {
    number: '03',
    title: 'Review your report',
    description: 'Get scores, risk flags, strengths, weaknesses, and a clear verdict.',
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-28 md:py-36 bg-white">
      <div className="max-w-6xl mx-auto px-6 md:px-8">

        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <p className="text-xs font-semibold text-teal-600 uppercase tracking-widest mb-3">How It Works</p>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
            Three steps to an instant report
          </h2>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {steps.map((step, index) => (
            <div key={index} className="text-center px-5">
              {/* Step number */}
              <div className="w-12 h-12 mx-auto mb-6 bg-teal-50 border border-teal-100 rounded-xl flex items-center justify-center text-teal-600 font-bold text-sm">
                {step.number}
              </div>
              <h3 className="text-base font-semibold text-slate-900 mb-3">{step.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
