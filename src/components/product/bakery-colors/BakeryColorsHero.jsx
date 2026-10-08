import { Link } from 'react-router-dom'
import bakeryImg from '../../../assets/home/bakery-image.png'

export default function BakeryColorsHero() {
  const bakeryApplications = [
    {
      title: 'Cakes & Sponge Doughs',
      desc: 'Heat-stable dyes that maintain vivid, radiant intensity through 220°C baking without browning or fading.',
      icon: '🎂',
    },
    {
      title: 'Icings & Buttercreams',
      desc: 'Non-bleeding dispersions delivering consistent paste hues without curdling fats or altering texture.',
      icon: '🧁',
    },
    {
      title: 'Fondants & Sugar Pastes',
      desc: 'Micro-milled pigments that blend effortlessly into sugar mass without streaking or drying out workability.',
      icon: '🎨',
    },
    {
      title: 'Macarons & Meringues',
      desc: 'Moisture-controlled liquid and powder concentrates that protect delicate albumen foam structure.',
      icon: '🍪',
    },
  ]

  return (
    <section className="relative bg-gradient-to-b from-slate-50 via-white to-white pt-24 sm:pt-28 pb-14 border-b border-slate-200/80 overflow-hidden">
      {/* Background Tech Mesh Texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035] bg-repeat bg-center"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #0f172a 1px, transparent 0)`,
          backgroundSize: '24px 24px',
        }}
      />

      {/* Ambient decorative glow orbs */}
      <div className="absolute top-10 right-10 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-emerald-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-slate-500 font-medium mb-4">
          <Link to="/" className="hover:text-emerald-800 transition-colors">
            Home
          </Link>
          <span className="text-slate-300">&rsaquo;</span>
          <Link to="/products" className="hover:text-emerald-800 transition-colors">
            Products
          </Link>
          <span className="text-slate-300">&rsaquo;</span>
          <span className="text-slate-900 font-bold">Bakery Colors</span>
        </nav>

        {/* Hero Main Content Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column (7 cols): Copy, Badges, CTAs */}
          <div className="lg:col-span-7 text-left space-y-5">
            {/* Category Overline Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-300/80 text-amber-900 text-[11px] font-extrabold uppercase tracking-widest shadow-xs">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              <span>Professional Pastry &amp; Bakery Formulations</span>
            </div>

            {/* Main Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading text-slate-900 tracking-tight leading-[1.12]">
              Bakery Colors
            </h1>

            {/* Subtitle / Description */}
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl">
              Engineered exclusively for commercial bakery plants, industrial biscuit producers, and master pastry artisans. Our bakery colour solutions feature unmatched thermal stability up to 220°C, zero fade during oven bake, and non-bleeding brilliance across doughs, fondants, icings, and delicate confectionery.
            </p>

            {/* Trust Pill Badges */}
            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100/90 text-slate-700 font-semibold border border-slate-200">
                <span className="text-emerald-600 font-bold">✓</span> Heat-Stable to 220°C
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100/90 text-slate-700 font-semibold border border-slate-200">
                <span className="text-emerald-600 font-bold">✓</span> US-FDA, EU &amp; FSSAI Compliant
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100/90 text-slate-700 font-semibold border border-slate-200">
                <span className="text-emerald-600 font-bold">✓</span> 100% Halal &amp; Kosher Approved
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100/90 text-slate-700 font-semibold border border-slate-200">
                <span className="text-emerald-600 font-bold">✓</span> Zero Flavor Alteration
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100/90 text-slate-700 font-semibold border border-slate-200">
                <span className="text-emerald-600 font-bold">✓</span> Non-Bleeding in Creams
              </span>
            </div>

            {/* CTA Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3.5">
              <Link
                to="/contact?subject=Bakery%20Colors%20Bulk%20Quotation"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0a3622] hover:bg-[#0f4d30] text-white px-6 py-3 text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer"
              >
                <span>Request Bulk Quotation</span>
                <span className="text-emerald-300 font-bold">&rarr;</span>
              </Link>

              <Link
                to="/contact?subject=Bakery%20Colors%20Lab%20Sample"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 px-5 py-3 text-xs sm:text-sm font-semibold transition-all shadow-xs hover:border-slate-400 cursor-pointer"
              >
                <span>Request Free Lab Sample</span>
              </Link>
            </div>
          </div>

          {/* Right Column (5 cols): Visual Feature Card with Bakery Image */}
          <div className="lg:col-span-5">
            <div className="relative group rounded-3xl bg-gradient-to-br from-amber-500/10 via-emerald-600/10 to-transparent p-1 border border-slate-200 shadow-xl overflow-hidden">
              <div className="relative rounded-[22px] bg-white p-5 sm:p-6 overflow-hidden">
                {/* Image showcase */}
                <div className="relative w-full h-56 sm:h-64 rounded-2xl overflow-hidden bg-gradient-to-br from-amber-50 to-orange-50 mb-5 border border-amber-100">
                  <img
                    src={bakeryImg}
                    alt="Bakery Colors and Confectionery Formulations"
                    className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-xs text-[10px] font-extrabold uppercase tracking-wider text-amber-900 border border-amber-200 shadow-xs">
                    Artisanal &amp; Industrial Grade
                  </div>
                </div>

                {/* Quick specs grid */}
                <div className="grid grid-cols-2 gap-2.5 text-left">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      Oven Heat Resistance
                    </p>
                    <p className="text-sm font-extrabold text-slate-800 mt-0.5">
                      Up to 220°C
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      Carrier Types
                    </p>
                    <p className="text-sm font-extrabold text-slate-800 mt-0.5">
                      Gel • Liquid • Powder
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      Export Packing
                    </p>
                    <p className="text-sm font-extrabold text-slate-800 mt-0.5">
                      1kg, 5kg &amp; 25kg Drums
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      Dispatch Origin
                    </p>
                    <p className="text-sm font-extrabold text-slate-800 mt-0.5">
                      JNPT Mumbai Port
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Key Application Highlights Grid ──────────────────────── */}
        <div className="mt-14 pt-10 border-t border-slate-200/80">
          <div className="text-left mb-6">
            <h2 className="text-lg sm:text-xl font-bold font-heading text-slate-900">
              Formulated for Every Bakery Discipline
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Consistent shade reproducibility across diverse baking matrices and moisture levels.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {bakeryApplications.map((app) => (
              <div
                key={app.title}
                className="p-4 sm:p-5 rounded-2xl bg-slate-50/80 hover:bg-white border border-slate-200 hover:border-amber-300 hover:shadow-md transition-all text-left group"
              >
                <div className="text-2xl mb-2.5">{app.icon}</div>
                <h3 className="text-sm font-bold text-slate-900 group-hover:text-amber-900 transition-colors">
                  {app.title}
                </h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  {app.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
