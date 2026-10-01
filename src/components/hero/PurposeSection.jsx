import purposeBg from '../../assets/purpose-1.png'

export default function PurposeSection() {
  const pillars = [
    {
      title: 'Global',
      subtitle: 'Trade Network',
      icon: (
        <svg className="w-6 h-6 text-[#b45309] stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth={1.9}>
          <circle cx="12" cy="12" r="10" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
        </svg>
      ),
    },
    {
      title: 'Reliable',
      subtitle: 'Imports & Exports',
      icon: (
        <svg className="w-6 h-6 text-[#b45309] stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth={1.9}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 17l2 4h14l2-4M3 17h18M6 17V8h12v9M9 5h6v3H9z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 11h2v3H8zm6 0h2v3h-2z" />
        </svg>
      ),
    },
    {
      title: 'Trusted',
      subtitle: 'Partnerships',
      icon: (
        <svg className="w-6 h-6 text-[#b45309] stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth={1.9}>
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
        <svg className="w-6 h-6 text-[#b45309] stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth={1.9}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 21h18" />
        </svg>
      ),
    },
  ]

  return (
    <section className="relative w-full overflow-hidden">
      {/* Background Graphic: purpose-1.png shifted right with protective gradient for mobile */}
      <div className="relative min-h-[420px] sm:min-h-[340px] lg:min-h-[370px] flex items-center">
        <img
          src={purposeBg}
          alt="Facilitating Global Trade Through Indian Excellence"
          className="absolute inset-0 w-full h-full object-cover object-[85%_center] sm:object-[80%_center] lg:object-right pointer-events-none"
        />

        {/* High-Contrast Light Gradient Shield: Guarantees 100% readability on phone and tablet */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/98 via-white/90 to-white/25 sm:from-white/95 sm:via-white/65 sm:to-transparent pointer-events-none" />

        {/* Main Content Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-8 sm:py-8 lg:py-9 relative z-10">
          <div className="max-w-lg lg:max-w-[460px] text-left space-y-4 sm:space-y-5">
            {/* Overline Badge with Amber Dash */}
            <div>
              <div className="inline-flex items-center gap-2 mb-2">
                <span className="w-6 h-[2.5px] bg-[#c2410c] rounded-full inline-block" />
                <span className="text-[11px] sm:text-xs font-black tracking-[0.2em] text-[#b45309] uppercase drop-shadow-xs">
                  OUR PURPOSE
                </span>
              </div>

              {/* Main 2-Line Headline - Bold & Razor Sharp Contrast */}
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black font-heading tracking-tight leading-[1.15] text-[#0f172a] drop-shadow-xs">
                <span>Facilitating Global Trade</span>{' '}
                <span className="block mt-0.5 sm:mt-1 text-[#b45309]">
                  Through Indian Excellence
                </span>
              </h2>

              {/* Subtitle Paragraph - Tightly Bound to Left Side Only */}
              <p className="mt-2 text-xs sm:text-sm text-slate-800 sm:text-slate-900 max-w-[320px] sm:max-w-[340px] leading-relaxed font-bold">
                Your trusted partner in Import &amp; Export, connecting quality products across borders.
              </p>
            </div>

            {/* 4 Pillars - Responsive 2x2 Grid on Mobile, Clean Row on Desktop */}
            <div className="pt-3 border-t border-slate-300/80">
              <div className="grid grid-cols-2 sm:flex sm:flex-nowrap items-stretch sm:items-center gap-2 sm:gap-0">
                {pillars.map((pillar, idx) => (
                  <div
                    key={pillar.subtitle}
                    className={`flex items-center sm:flex-col sm:items-start gap-2 sm:gap-1 p-2 sm:p-0 rounded-xl sm:rounded-none bg-white/90 sm:bg-transparent backdrop-blur-md sm:backdrop-blur-none border border-white/90 sm:border-0 shadow-sm sm:shadow-none sm:px-2 lg:px-2.5 ${
                      idx === 0 ? 'sm:pl-0' : ''
                    } ${idx < pillars.length - 1 ? 'sm:border-r sm:border-slate-400/40' : ''}`}
                  >
                    <div className="p-1.5 rounded-lg bg-amber-50 sm:bg-white/90 border border-amber-200/70 sm:border-white shadow-xs shrink-0">
                      {pillar.icon}
                    </div>
                    <div className="text-left">
                      <div className="text-xs sm:text-[12px] font-black text-[#0f172a] leading-tight">
                        {pillar.title}
                      </div>
                      <div className="text-[10px] sm:text-[11px] text-slate-700 font-extrabold leading-tight">
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
