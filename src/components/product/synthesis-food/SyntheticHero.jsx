import { Link } from 'react-router-dom'

export default function SyntheticHero({ onOpenInquiry }) {
  return (
    <section className="relative bg-gradient-to-b from-slate-50 via-white to-white pt-24 sm:pt-28 pb-10 border-b border-slate-200/80">
      {/* Subtle grid pattern for light theme depth */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035] bg-repeat bg-center"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #0f172a 1px, transparent 0)`,
          backgroundSize: '24px 24px',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-slate-500 font-medium mb-3">
          <Link to="/" className="hover:text-emerald-800 transition-colors">
            Home
          </Link>
          <span className="text-slate-300">&rsaquo;</span>
          <Link to="/products" className="hover:text-emerald-800 transition-colors">
            Products
          </Link>
          <span className="text-slate-300">&rsaquo;</span>
          <span className="text-slate-800 font-bold">Synthetic Food Colours</span>
        </nav>

        {/* Header Content */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-3xl text-left">
            {/* Overline Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-[#0a3622] text-[11px] font-extrabold uppercase tracking-widest mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
              <span>Primary Food Dyes • Water Soluble</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading text-slate-900 tracking-tight leading-[1.15]">
              Synthetic Food Colours
            </h1>

            {/* Description */}
            <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl">
              High-purity primary synthetic food dyes delivering intense coloration, exceptional heat and light stability, and complete batch-to-batch consistency. Fully compliant with US-FDA, European Union (EU), FSSAI, and international standards.
            </p>

            {/* Trust Pill Badges */}
            <div className="mt-5 flex flex-wrap items-center gap-2 text-xs">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 font-semibold border border-slate-200">
                <span className="text-emerald-600 font-bold">✓</span> US-FDA &amp; EU Compliant
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 font-semibold border border-slate-200">
                <span className="text-emerald-600 font-bold">✓</span> FSSAI &amp; BIS Certified
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 font-semibold border border-slate-200">
                <span className="text-emerald-600 font-bold">✓</span> Halal &amp; Kosher Approved
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 font-semibold border border-slate-200">
                <span className="text-emerald-600 font-bold">✓</span> Port: JNPT (Mumbai)
              </span>
            </div>
          </div>

          {/* Right Action Box: Catalog & Inquiry */}
          <div className="flex flex-row lg:flex-col items-center lg:items-end gap-3 shrink-0">
            <button
              type="button"
              onClick={onOpenInquiry}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0a3622] hover:bg-[#0f4d30] text-white px-5 py-2.5 text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer"
            >
              <span>Request Bulk Quotation</span>
              <span>&rarr;</span>
            </button>

            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 px-4 py-2.5 text-xs sm:text-sm font-semibold transition-all shadow-xs cursor-pointer"
            >
              <span>Request Free Lab Sample</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
