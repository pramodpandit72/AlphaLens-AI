export default function Footer() {
  return (
    <footer className="bg-slate-900">
      <div className="max-w-6xl mx-auto px-6 md:px-8 py-18 md:py-20">

        {/* Top row: Logo + Links */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-14 pb-12 border-b border-slate-700">

          {/* Logo & tagline */}
          <div className="max-w-xs">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-teal-600 flex items-center justify-center">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 2 7 12 12 22 7 12 2" />
                  <polyline points="2 17 12 22 22 17" />
                  <polyline points="2 12 12 17 22 12" />
                </svg>
              </div>
              <span className="text-base font-bold text-white">
                AlphaLens <span className="text-teal-400">AI</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              AI-powered equity research and analysis, built with Gemini 2.5 Flash.
            </p>
          </div>

          {/* Link columns */}
          <div className="flex flex-col sm:flex-row gap-10 sm:gap-16">
            <div>
              <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-4">Platform</h4>
              <ul className="space-y-3">
                <li><a href="#features" className="text-sm text-slate-400 hover:text-white transition-colors no-underline">Features</a></li>
                <li><a href="#how-it-works" className="text-sm text-slate-400 hover:text-white transition-colors no-underline">How It Works</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-4">Legal</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-sm text-slate-400 hover:text-white transition-colors no-underline">Privacy Policy</a></li>
                <li><a href="#" className="text-sm text-slate-400 hover:text-white transition-colors no-underline">Terms of Service</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="py-10 border-b border-slate-800">
          <p className="text-xs text-slate-500 leading-relaxed max-w-3xl">
            <strong className="text-slate-400">Disclaimer:</strong> AlphaLens AI generates analysis from public data sources using artificial intelligence. This does not constitute financial advice. Always do your own research or consult a certified financial advisor before investing.
          </p>
        </div>

        {/* Bottom copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-10">
          <p className="text-xs text-slate-500">
            &copy; {new Date().getFullYear()} AlphaLens AI. All rights reserved.
          </p>
          <p className="text-xs text-slate-500">
            Built with Gemini 2.5 Flash
          </p>
        </div>

      </div>
    </footer>
  )
}
