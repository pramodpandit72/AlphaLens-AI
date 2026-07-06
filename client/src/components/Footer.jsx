export default function Footer() {
  return (
    <footer className="bg-white border-t border-border-primary py-10">
      <div className="section-container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Brand */}
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-brand-600 to-brand-400 flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 2 7 12 12 22 7 12 2" />
                <polyline points="2 17 12 22 22 17" />
                <polyline points="2 12 12 17 22 12" />
              </svg>
            </div>
            <span className="text-sm font-semibold text-text-primary tracking-tight">
              AlphaLens AI
            </span>
          </div>

          {/* Copyright */}
          <p className="text-sm text-text-tertiary">
            &copy; {new Date().getFullYear()} AlphaLens AI. AI-powered investment research.
          </p>

          {/* Links */}
          <div className="flex items-center gap-6">
            <a href="#" className="text-sm text-text-tertiary hover:text-text-secondary transition-colors no-underline">
              Privacy
            </a>
            <a href="#" className="text-sm text-text-tertiary hover:text-text-secondary transition-colors no-underline">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
