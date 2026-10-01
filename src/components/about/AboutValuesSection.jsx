import { Link } from 'react-router-dom'

export default function AboutValuesSection() {
  const pillars = [
    {
      id: '01',
      title: 'Research-Based Formulation',
      subtitle: 'Innovation & Precision',
      description:
        'Custom color matching with spectrophotometer precision, bespoke aroma accords, and stable beverage cloud emulsions engineered to withstand regional heat and pH variations.',
      theme: {
        accent: '#0a3622',
        lightBg: 'bg-emerald-50/70',
        badge: 'bg-emerald-100/80 text-emerald-900 border-emerald-200',
        borderHover: 'hover:border-emerald-600/40',
        iconBg: 'bg-emerald-600 text-white shadow-emerald-900/20',
        dot: 'bg-emerald-600',
      },
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      ),
      tags: [
        'Spectrophotometer Color Matching',
        'Spray-Dried Powder Encapsulation',
        'Application Lab Matrix Verification',
      ],
    },
    {
      id: '02',
      title: 'Global Dossiers & Traceability',
      subtitle: 'Export Compliance',
      description:
        'Every export consignment is paired with comprehensive regulatory documentation, ensuring smooth customs clearance across the Middle East, Europe, Americas, and Asia-Pacific.',
      theme: {
        accent: '#c2410c',
        lightBg: 'bg-amber-50/70',
        badge: 'bg-amber-100/80 text-amber-900 border-amber-200',
        borderHover: 'hover:border-amber-600/40',
        iconBg: 'bg-amber-600 text-white shadow-amber-900/20',
        dot: 'bg-amber-600',
      },
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      tags: [
        'Batch COA & MSDS Dossiers',
        'FDA, FSSAI, Halal & Kosher',
        'Certificate of Origin & GSP Support',
      ],
    },
    {
      id: '03',
      title: 'Multi-Stage Quality Testing',
      subtitle: 'Laboratory Standards',
      description:
        'Multi-stage laboratory evaluation for pure dye concentration, moisture insolubles, heavy metal thresholds (< 10 ppm total), and total aerobic microbial limits (TAMC).',
      theme: {
        accent: '#0284c7',
        lightBg: 'bg-sky-50/70',
        badge: 'bg-sky-100/80 text-sky-900 border-sky-200',
        borderHover: 'hover:border-sky-600/40',
        iconBg: 'bg-sky-600 text-white shadow-sky-900/20',
        dot: 'bg-sky-600',
      },
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      tags: [
        '85%–90% Pure Dye Verification',
        'Heavy Metals: Pb < 2ppm, As < 1ppm',
        'Full IP / BP / USP / EP Compliance',
      ],
    },
    {
      id: '04',
      title: 'Client Partnership & Integrity',
      subtitle: 'Global Operations',
      description:
        'Building enduring partnerships through transparent communication, dedicated export managers, and prompt air and sea consignment dispatch from Mumbai.',
      theme: {
        accent: '#7e22ce',
        lightBg: 'bg-purple-50/70',
        badge: 'bg-purple-100/80 text-purple-900 border-purple-200',
        borderHover: 'hover:border-purple-600/40',
        iconBg: 'bg-purple-600 text-white shadow-purple-900/20',
        dot: 'bg-purple-600',
      },
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      tags: [
        'Dedicated Export Account Managers',
        '24–48h Pre-Shipment Sample Courier',
        'JNPT Seaport & Air Cargo Dispatch',
      ],
    },
  ]

  const metrics = [
    { value: '50+', label: 'Destination Countries', sub: 'Across 5 Continents' },
    { value: '100+', label: 'Formulations & Grades', sub: 'Food, Pharma & Cosmetics' },
    { value: '100%', label: 'Tested Export Batches', sub: 'Backed by Laboratory COA' },
    { value: '24–48h', label: 'Sample Dispatch', sub: 'Worldwide Express Air Courier' },
  ]

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-slate-50/70 via-white to-slate-50/50 border-t border-slate-200/80 font-body relative overflow-hidden select-none">
      {/* Precision Background Pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.3]"
        style={{
          backgroundImage: `
            radial-gradient(#cbd5e1 1px, transparent 1px)
          `,
          backgroundSize: '28px 28px',
        }}
      />

      {/* Ambient Glows */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-emerald-100/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-amber-100/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 mb-4">
            <span className="w-2 h-2 rounded-full bg-[#0a3622] animate-pulse" />
            <span className="text-xs font-black uppercase tracking-widest text-[#0a3622] font-heading">
              CORE VALUES &amp; QUALITY PILLARS
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading text-slate-900 tracking-tight leading-[1.15]">
            Engineered on Research.{' '}
            <span className="bg-gradient-to-r from-[#b45309] via-[#c2410c] to-[#ea580c] bg-clip-text text-transparent">
              Governed by Global Standards.
            </span>
          </h2>

          <p className="mt-4 text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
            Our operations are anchored in four non-negotiable principles that protect product purity, batch reproducibility, and international regulatory compliance for global buyers.
          </p>
        </div>

        {/* 4 Pillars - Modern 2x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-14 sm:mb-16">
          {pillars.map((pillar) => (
            <div
              key={pillar.id}
              className={`relative bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm hover:shadow-xl ${pillar.theme.borderHover} transition-all duration-300 flex flex-col justify-between group overflow-hidden`}
            >
              {/* Subtle top accent gradient bar */}
              <div
                className="absolute top-0 inset-x-0 h-1.5 opacity-80 transition-opacity group-hover:opacity-100"
                style={{ backgroundColor: pillar.theme.accent }}
              />

              {/* Watermark Number */}
              <span className="absolute -top-3 right-6 text-7xl sm:text-8xl font-black font-heading text-slate-100/80 group-hover:text-slate-200/60 pointer-events-none select-none transition-colors">
                {pillar.id}
              </span>

              <div>
                {/* Header Row: Badge & Glowing Icon */}
                <div className="flex items-center justify-between gap-4 mb-5 relative z-10">
                  <div className="flex items-center gap-2">
                    <span className={`text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${pillar.theme.badge}`}>
                      {pillar.subtitle}
                    </span>
                  </div>
                  <div className={`w-12 h-12 rounded-2xl ${pillar.theme.iconBg} shadow-md flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                    {pillar.icon}
                  </div>
                </div>

                {/* Pillar Title */}
                <h3 className="text-xl sm:text-2xl font-bold font-heading text-slate-900 mb-3 group-hover:text-[#0a3622] transition-colors text-left relative z-10">
                  {pillar.title}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal mb-6 text-left relative z-10">
                  {pillar.description}
                </p>
              </div>

              {/* Capabilities Chips */}
              <div className="pt-4 border-t border-slate-100 relative z-10 space-y-2">
                <div className="text-[10px] font-black uppercase tracking-wider text-slate-400 text-left mb-2.5">
                  Core Capabilities:
                </div>
                <div className="flex flex-wrap gap-2 text-left">
                  {pillar.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200/80 text-xs font-semibold text-slate-700 hover:bg-white transition-colors"
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${pillar.theme.dot} shrink-0`} />
                      <span>{tag}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Executive Highlights & Stats Ribbon */}
        <div className="rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-10 shadow-lg shadow-slate-900/5 relative overflow-hidden">
          {/* Subtle gradient banner top */}
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#0a3622] via-[#b45309] to-[#0284c7]" />

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
            {metrics.map((m, idx) => (
              <div key={m.label} className={`text-center ${idx > 0 ? 'pt-4 sm:pt-0 sm:pl-6' : ''}`}>
                <div className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading text-[#0a3622] tracking-tight">
                  {m.value}
                </div>
                <div className="text-xs sm:text-sm font-bold text-slate-900 mt-1.5">
                  {m.label}
                </div>
                <div className="text-[11px] sm:text-xs text-slate-500 mt-0.5">
                  {m.sub}
                </div>
              </div>
            ))}
          </div>

          {/* Action Row */}
          <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs sm:text-sm text-slate-600 text-center sm:text-left font-medium">
              Need technical documentation, COA dossiers, or evaluation samples for your formulations?
            </p>
            <div className="flex items-center gap-3 shrink-0">
              <Link
                to="/certifications"
                className="px-5 py-2.5 rounded-full border border-slate-300 hover:border-slate-400 text-slate-800 hover:bg-slate-50 text-xs font-bold transition-all"
              >
                View Certifications &rarr;
              </Link>
              <Link
                to="/contact"
                className="px-5 py-2.5 rounded-full bg-[#0a3622] hover:bg-[#0f4d30] text-white text-xs font-bold transition-all shadow-sm hover:shadow-md active:scale-95"
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
