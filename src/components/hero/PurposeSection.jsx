import purposeBg from '../../assets/purpose.png'

export default function PurposeSection() {
  const pillars = [
    {
      title: 'Global',
      subtitle: 'Trade Network',
      icon: (
        <svg className="w-7 h-7 text-amber-400 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth={1.75}>
          <circle cx="12" cy="12" r="10" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
        </svg>
      ),
    },
    {
      title: 'Reliable',
      subtitle: 'Imports & Exports',
      icon: (
        <svg className="w-7 h-7 text-amber-400 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth={1.75}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 17l2 4h14l2-4M3 17h18M6 17V8h12v9M9 5h6v3H9z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 11h2v3H8zm6 0h2v3h-2z" />
        </svg>
      ),
    },
    {
      title: 'Trusted',
      subtitle: 'Partnerships',
      icon: (
        <svg className="w-7 h-7 text-amber-400 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth={1.75}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 11.5V14m0-2.5l3-3 3 1.5 4-4 4 4-2.5 2.5m-8.5 1.5l3 3 5-5M4 19h16" />
          <circle cx="7" cy="6" r="2" />
          <circle cx="17" cy="6" r="2" />
        </svg>
      ),
    },
    {
      title: 'Long-Term',
      subtitle: 'Growth',
      icon: (
        <svg className="w-7 h-7 text-amber-400 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth={1.75}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 21h18" />
        </svg>
      ),
    },
  ]

  return (
    <section className="relative w-full overflow-hidden bg-[#041a12] text-white">
      {/* Background Graphic: purpose.png with tailored gradient overlays - Half Height Panoramic Banner */}
      <div className="relative min-h-[300px] sm:min-h-[330px] lg:min-h-[360px] flex items-center">
        <img
          src={purposeBg}
          alt="Facilitating Global Trade Through Indian Excellence"
          className="absolute inset-0 w-full h-full object-cover object-[62%_center] sm:object-center pointer-events-none"
        />

        {/* Master Dark Emerald & Charcoal Vignette: Softened so background image is visible with crisp text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#02100b]/80 via-[#041a12]/50 to-transparent sm:bg-gradient-to-r sm:from-[#02130c]/70 sm:via-[#041a12]/50 sm:via-42% sm:to-transparent sm:to-80% pointer-events-none" />

        {/* Main Content Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-6 sm:py-8 lg:py-9 relative z-10">
          <div className="max-w-2xl text-left space-y-4 sm:space-y-5">
            {/* Overline Badge with Amber Dash */}
            <div>
              <div className="inline-flex items-center gap-2 mb-2">
                <span className="w-6 h-[2px] bg-amber-400 rounded-full inline-block" />
                <span className="text-[11px] sm:text-xs font-bold tracking-[0.2em] text-amber-300 uppercase">
                  OUR PURPOSE
                </span>
              </div>

              {/* Main 2-Line Headline */}
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black font-heading tracking-tight leading-[1.15] text-white drop-shadow-sm">
                <span>Facilitating Global Trade</span>{' '}
                <span className="block mt-0.5 sm:mt-1 bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 bg-clip-text text-transparent">
                  Through Indian Excellence
                </span>
              </h2>

              {/* Subtitle Paragraph */}
              <p className="mt-2 text-xs sm:text-sm text-slate-100 max-w-xl leading-relaxed font-medium drop-shadow-xs">
                Your trusted partner in Import &amp; Export, connecting quality products across borders.
              </p>
            </div>

            {/* 4 Pillars with Vertical Dividers - Compact & Close Together */}
            <div className="pt-2 sm:pt-3 border-t border-white/20 inline-block">
              <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 sm:gap-0">
                {pillars.map((pillar, idx) => (
                  <div
                    key={pillar.subtitle}
                    className={`flex flex-col items-start gap-1 sm:px-3 lg:px-4 ${
                      idx === 0 ? 'sm:pl-0' : ''
                    } ${idx < pillars.length - 1 ? 'sm:border-r sm:border-white/25' : ''}`}
                  >
                    <div className="p-1.5 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 shadow-xs">
                      {pillar.icon}
                    </div>
                    <div className="text-left whitespace-nowrap">
                      <div className="text-xs sm:text-[12px] font-bold text-white leading-tight">
                        {pillar.title}
                      </div>
                      <div className="text-[10px] sm:text-[11px] text-slate-200 font-medium leading-tight">
                        {pillar.subtitle}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
