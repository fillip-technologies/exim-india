import { Link } from 'react-router-dom'

export default function AboutValuesSection() {
  const pillars = [
    {
      id: '01',
      tag: 'Innovation & Formulation',
      title: 'Research-Based Formulation',
      description:
        'Custom color matching with spectrophotometer precision, bespoke aroma accords, and stable beverage cloud emulsions engineered to withstand regional heat and pH variations.',
      badgeColor: 'text-emerald-800 bg-emerald-50 border-emerald-200',
      icon: (
        <svg className="w-6 h-6 text-[#0a3622]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      ),
      points: [
        'RAL / Pantone spectrophotometer color matching',
        'Custom spray-dried powder encapsulation',
        'Application lab verification across food & pharma matrices',
      ],
    },
    {
      id: '02',
      tag: 'Export Compliance',
      title: 'Global Dossiers & Traceability',
      description:
        'Every export consignment is paired with comprehensive regulatory documentation, ensuring seamless customs clearance across the Middle East, Europe, Americas, and Asia-Pacific.',
      badgeColor: 'text-amber-800 bg-amber-50 border-amber-200',
      icon: (
        <svg className="w-6 h-6 text-[#b45309]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      points: [
        'Batch-specific Certificate of Analysis (COA) & MSDS',
        'US-FDA, FSSAI, HALAL & KOSHER certified supply chains',
        'Certificate of Origin & GSP chamber documentation',
      ],
    },
    {
      id: '03',
      tag: 'Laboratory Standards',
      title: 'Strict Quality Control',
      description:
        'Multi-stage laboratory evaluation testing for pure dye concentration, moisture insolubles, heavy metal thresholds (< 10 ppm total), and total aerobic microbial limits (TAMC).',
      badgeColor: 'text-sky-800 bg-sky-50 border-sky-200',
      icon: (
        <svg className="w-6 h-6 text-sky-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      points: [
        'Pure dye verification: 85%–90% dyes / 15%–40% lakes',
        'Trace heavy metals: Lead < 2 ppm, Arsenic < 1 ppm',
        'Full compliance with IP, BP, USP, and EP pharmacopoeias',
      ],
    },
    {
      id: '04',
      tag: 'Client Partnership',
      title: 'Integrity & Global Reach',
      description:
        'Eight years of building long-standing relationships through transparent communication, dedicated export desk managers, and swift air/sea consignment dispatch from Mumbai.',
      badgeColor: 'text-purple-800 bg-purple-50 border-purple-200',
      icon: (
        <svg className="w-6 h-6 text-purple-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      points: [
        'Dedicated international account managers',
        '24–48 hour express pre-shipment sample dispatch',
        'Multimodal fulfillment via JNPT seaport & Mumbai air cargo',
      ],
    },
  ]

  const metrics = [
    { value: '50+', label: 'Destination Countries', sub: 'Across 5 continents' },
    { value: '100+', label: 'Formulations & Grades', sub: 'Food, pharma & cosmetics' },
    { value: '100%', label: 'Tested Export Batches', sub: 'Backed by laboratory CoA' },
    { value: '24–48h', label: 'Sample Courier Dispatch', sub: 'Worldwide express delivery' },
  ]

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white border-t border-slate-200/80 font-body relative overflow-hidden">
      {/* Background Accent Gradients */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-50/70 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-amber-50/60 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 sm:gap-8 mb-12 sm:mb-16">
          <div className="max-w-3xl text-left">
            <div className="flex items-center gap-3 mb-3">
              <span className="w-8 h-0.5 bg-[#c59b27]" />
              <span className="text-xs font-black uppercase tracking-widest text-[#0a3622] font-heading">
                CORE VALUES &amp; QUALITY PILLARS
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black font-heading text-slate-900 tracking-tight leading-[1.15]">
              <span>Engineered on Research.</span>{' '}
              <span className="bg-gradient-to-r from-[#b45309] via-[#c2410c] to-[#d97706] bg-clip-text text-transparent">
                Governed by Global Standards.
              </span>
            </h2>
          </div>

          <div className="max-w-md text-left lg:text-right">
            <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
              Our operations are anchored in four non-negotiable principles that protect product purity, batch reproducibility, and international compliance.
            </p>
          </div>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-14 sm:mb-16">
          {pillars.map((pillar) => (
            <div
              key={pillar.id}
              className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs hover:shadow-xl hover:border-emerald-700/30 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Top Row: Number, Tag & Icon */}
                <div className="flex items-center justify-between gap-4 mb-5">
                  <div className="flex items-center gap-3">
                    <span className="text-xl sm:text-2xl font-black font-heading text-slate-300 group-hover:text-emerald-800 transition-colors">
                      {pillar.id}
                    </span>
                    <span className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${pillar.badgeColor}`}>
                      {pillar.tag}
                    </span>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    {pillar.icon}
                  </div>
                </div>

                {/* Pillar Title */}
                <h3 className="text-lg sm:text-xl font-bold font-heading text-slate-900 mb-2.5 group-hover:text-[#0a3622] transition-colors text-left">
                  {pillar.title}
                </h3>

                {/* Pillar Description */}
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal mb-5 text-left">
                  {pillar.description}
                </p>
              </div>

              {/* Bullet Points */}
              <div className="pt-4 border-t border-slate-100 space-y-2">
                {pillar.points.map((point) => (
                  <div key={point} className="flex items-start gap-2 text-xs sm:text-[13px] text-slate-700 text-left">
                    <span className="text-emerald-600 font-bold leading-none mt-0.5">&#10003;</span>
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Frosted Light Metrics Banner */}
        <div className="rounded-3xl bg-slate-50/80 border border-slate-200/90 p-6 sm:p-8 shadow-xs">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-slate-200/80">
            {metrics.map((m, idx) => (
              <div key={m.label} className={`text-center ${idx > 0 ? 'pt-4 sm:pt-0 sm:pl-6' : ''}`}>
                <div className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading text-[#0a3622] tracking-tight">
                  {m.value}
                </div>
                <div className="text-xs sm:text-sm font-bold text-slate-900 mt-1">
                  {m.label}
                </div>
                <div className="text-[11px] sm:text-xs text-slate-500 mt-0.5">
                  {m.sub}
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Action Row */}
          <div className="mt-8 pt-6 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs sm:text-sm text-slate-600 text-center sm:text-left">
              Need technical documentation, COA dossiers, or evaluation samples for your formulations?
            </p>
            <div className="flex items-center gap-3 shrink-0">
              <Link
                to="/certifications"
                className="px-5 py-2.5 rounded-full border border-slate-300 text-slate-800 hover:bg-white text-xs font-bold transition-all"
              >
                View Certifications &rarr;
              </Link>
              <Link
                to="/contact"
                className="px-5 py-2.5 rounded-full bg-[#0a3622] hover:bg-[#15803d] text-white text-xs font-bold transition-all shadow-xs"
              >
                Request Technical Dossier &rarr;
              </Link>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
