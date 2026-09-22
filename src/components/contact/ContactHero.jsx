export default function ContactHero() {
  return (
    <div className="relative pt-28 sm:pt-36 pb-12 overflow-hidden bg-gradient-to-b from-slate-50/70 via-white to-white border-b border-slate-100">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Live Status Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 shadow-xs mb-5">
          <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping" />
          <span className="w-2 h-2 rounded-full bg-emerald-600 -ml-4" />
          <span className="text-xs font-bold uppercase tracking-wider text-[#0a3622]">
            Global Export Desk • Dispatching to 50+ Countries
          </span>
        </div>

        {/* Main Heading */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-heading text-slate-900 tracking-tight leading-[1.15] max-w-4xl mx-auto">
          Get in Touch with Our{' '}
          <span className="bg-gradient-to-r from-emerald-800 via-[#0a3622] to-amber-700 bg-clip-text text-transparent">
            International Trade Specialists
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-4 text-sm sm:text-base lg:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Request commercial quotations, regulatory dossiers (COA, MSDS, Halal, Kosher), or door-to-door courier samples for your food, cosmetics, or pharmaceutical applications.
        </p>

        {/* Quick Contact Action Pills */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs sm:text-sm font-semibold">
          <a
            href="https://wa.me/919892700271?text=Hello%20Exim%20India,%20I%20am%20interested%20in%20your%20products"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition-all hover:-translate-y-0.5"
          >
            <span>💬</span>
            <span>WhatsApp: +91 98927 00271</span>
          </a>

          <a
            href="tel:+912228925032"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 shadow-xs transition-all hover:-translate-y-0.5"
          >
            <span>📞</span>
            <span>Board Line: +91 22 2892 5032</span>
          </a>

          <a
            href="mailto:info@eximindiacorporation.com"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 shadow-xs transition-all hover:-translate-y-0.5"
          >
            <span>✉️</span>
            <span>info@eximindiacorporation.com</span>
          </a>
        </div>
      </div>
    </div>
  )
}
