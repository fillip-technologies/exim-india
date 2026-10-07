export default function AboutValuesSection() {
  const cards = [
    {
      id: 'vision',
      title: 'Vision',
      accentBorder: 'border-t-4 border-amber-500',
      hoverStyle: 'hover:border-amber-400 hover:shadow-amber-500/10',
      iconBg: 'bg-amber-50 text-amber-600 border-amber-200',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      ),
      content:
        'To be the world’s best and leading export house through our melange of products, competitive pricing and ethics.',
    },
    {
      id: 'mission',
      title: 'Mission',
      accentBorder: 'border-t-4 border-[#0a3622]',
      hoverStyle: 'hover:border-emerald-600 hover:shadow-emerald-600/10',
      iconBg: 'bg-emerald-50 text-[#0a3622] border-emerald-200',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <circle cx="12" cy="12" r="9" />
          <circle cx="12" cy="12" r="5" />
          <circle cx="12" cy="12" r="1.5" fill="currentColor" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2m0 14v2m9-9h-2M5 12H3" />
        </svg>
      ),
      content:
        'To be acknowledged as an expert in the field of colours, flavours and bakery decoration.',
    },
  ]

  return (
    <section className="py-14 sm:py-18 bg-gradient-to-b from-slate-50/70 via-white to-slate-50/50 border-t border-slate-200/80 font-body relative overflow-hidden select-none">
      {/* Background Precision Dot Grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.25]"
        style={{
          backgroundImage: `radial-gradient(#94a3b8 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading text-slate-900 tracking-tight leading-[1.15]">
            Vision &amp;{' '}
            <span className="bg-gradient-to-r from-[#b45309] via-[#c2410c] to-[#ea580c] bg-clip-text text-transparent">
              Mission
            </span>
          </h2>

          <p className="mt-3 text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
            The core principles guiding our worldwide export trade, specialized formulations, and enduring client partnerships.
          </p>
        </div>

        {/* 2 Clean & Compact Cards: Vision & Mission Only */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-stretch">
          {cards.map((card) => (
            <div
              key={card.id}
              className={`bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-sm hover:shadow-xl ${card.hoverStyle} ${card.accentBorder} transition-all duration-300 flex flex-col justify-start text-left`}
            >
              <div className="flex items-center gap-3.5 mb-4">
                <div className={`w-11 h-11 rounded-xl border flex items-center justify-center shrink-0 shadow-2xs ${card.iconBg}`}>
                  {card.icon}
                </div>
                <h3 className="text-2xl font-black font-heading text-slate-900 tracking-tight">
                  {card.title}
                </h3>
              </div>

              <p className="text-base sm:text-lg text-slate-700 font-normal leading-relaxed">
                {card.content}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
