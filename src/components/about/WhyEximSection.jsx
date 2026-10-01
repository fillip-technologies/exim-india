import experienceBg from '../../assets/experience-bg.png'

export default function WhyEximSection() {
  const pillars = [
    {
      id: 1,
      title: 'Decades of Export Legacy',
      color: '#7e22ce', // Purple
      hoverBg: 'hover:bg-purple-50/60',
      icon: (
        <svg className="w-14 h-14" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          {/* Document page with folded corner */}
          <path d="M18 10h20l12 12v32a4 4 0 0 1-4 4H18a4 4 0 0 1-4-4V14a4 4 0 0 1 4-4z" />
          <path d="M38 10v12h12" />
          {/* Horizontal lines */}
          <line x1="22" y1="28" x2="34" y2="28" />
          <line x1="22" y1="36" x2="38" y2="36" />
          {/* Pen / Quill writing */}
          <path d="M42 42l-8 8H30v-4l8-8z" />
          <path d="M40 38l4 4" />
        </svg>
      ),
    },
    {
      id: 2,
      title: 'Catering to 6+ Industries',
      color: '#2563eb', // Blue
      hoverBg: 'hover:bg-blue-50/60',
      icon: (
        <svg className="w-14 h-14" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          {/* Factory building */}
          <path d="M12 52V30l12 8V30l12 8V22l14 8v22H12z" />
          {/* Windows / Grids */}
          <line x1="18" y1="46" x2="18" y2="46.01" strokeWidth="3" />
          <line x1="26" y1="46" x2="26" y2="46.01" strokeWidth="3" />
          <line x1="34" y1="46" x2="34" y2="46.01" strokeWidth="3" />
          <line x1="42" y1="46" x2="42" y2="46.01" strokeWidth="3" />
          {/* Chimney / Smoke cloud */}
          <path d="M44 22V12h4v10" />
          <path d="M48 10c0-2.5 2-4 4.5-4s4 1.5 4.5 3c1 0 3 .8 3 2.5s-1.5 2.5-3 2.5H48" strokeWidth="1.8" />
        </svg>
      ),
    },
    {
      id: 3,
      title: '50+ Countries Distribution Network',
      color: '#16a34a', // Green
      hoverBg: 'hover:bg-emerald-50/60',
      icon: (
        <svg className="w-14 h-14" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          {/* Central gear */}
          <circle cx="32" cy="32" r="8" />
          <path d="M32 20v-4M32 48v-4M20 32h-4M48 32h-4M23.5 23.5l-2.8-2.8M43.3 43.3l-2.8-2.8M23.5 40.5l-2.8 2.8M43.3 20.7l-2.8 2.8" />
          {/* Surrounding network nodes */}
          <circle cx="32" cy="10" r="3" fill="currentColor" fillOpacity="0.2" />
          <circle cx="32" cy="54" r="3" fill="currentColor" fillOpacity="0.2" />
          <circle cx="10" cy="32" r="3" fill="currentColor" fillOpacity="0.2" />
          <circle cx="54" cy="32" r="3" fill="currentColor" fillOpacity="0.2" />
          <circle cx="16" cy="16" r="3" fill="currentColor" fillOpacity="0.2" />
          <circle cx="48" cy="48" r="3" fill="currentColor" fillOpacity="0.2" />
          <circle cx="16" cy="48" r="3" fill="currentColor" fillOpacity="0.2" />
          <circle cx="48" cy="16" r="3" fill="currentColor" fillOpacity="0.2" />
          {/* Ring connecting nodes */}
          <circle cx="32" cy="32" r="22" strokeDasharray="3 3" strokeWidth="1.5" />
        </svg>
      ),
    },
    {
      id: 4,
      title: 'International Quality Certified',
      color: '#db2777', // Magenta / Pink
      hoverBg: 'hover:bg-pink-50/60',
      icon: (
        <svg className="w-14 h-14" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          {/* Ribbon Rosette Badge */}
          <circle cx="32" cy="26" r="14" />
          <path d="M32 18l2.2 4.5 5 .7-3.6 3.5.9 5-4.5-2.4-4.5 2.4.9-5-3.6-3.5 5-.7z" />
          {/* Scalloped edge hints */}
          <path d="M26 13a4 4 0 0 1 12 0M41 18a4 4 0 0 1 4 10M41 34a4 4 0 0 1-5 7M28 41a4 4 0 0 1-7-4M19 28a4 4 0 0 1 4-10" strokeWidth="1.6" />
          {/* Ribbon tails hanging down */}
          <path d="M24 38l-4 16 8-4 4 4 0-14" />
          <path d="M40 38l4 16-8-4-4 4 0-14" />
        </svg>
      ),
    },
    {
      id: 5,
      title: 'Short Lead Time & Logistics',
      color: '#d97706', // Amber / Gold
      hoverBg: 'hover:bg-amber-50/60',
      icon: (
        <svg className="w-14 h-14" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          {/* Stopwatch / Clock */}
          <circle cx="32" cy="34" r="18" />
          <path d="M32 24v10l7 4" />
          {/* Top plunger & ring */}
          <path d="M32 16V10M28 10h8" />
          {/* Speed aura / tick dashes */}
          <circle cx="32" cy="34" r="23" strokeDasharray="3 5" strokeWidth="1.6" />
          <path d="M45 19l4-4M19 19l-4-4" strokeWidth="1.8" />
        </svg>
      ),
    },
    {
      id: 6,
      title: 'R&D and Regulatory Support',
      color: '#ea580c', // Orange
      hoverBg: 'hover:bg-orange-50/60',
      icon: (
        <svg className="w-14 h-14" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          {/* Outer gear framing */}
          <path d="M24 14a18 18 0 0 1 16 0l2 3 3.5 1 3-1.5a18 18 0 0 1 8 8l-1.5 3 1 3.5 3 2v8l-3 2-1 3.5 1.5 3a18 18 0 0 1-8 8l-3-1.5-3.5 1-2 3a18 18 0 0 1-16 0" strokeWidth="1.8" />
          {/* Scientist / specialist silhouette */}
          <circle cx="32" cy="32" r="5" />
          <path d="M22 48c0-5.5 4.5-9 10-9s10 3.5 10 9" />
          {/* Monitor / Research screen */}
          <rect x="38" y="18" width="12" height="10" rx="2" strokeWidth="1.8" />
          <line x1="44" y1="28" x2="44" y2="31" strokeWidth="1.8" />
        </svg>
      ),
    },
  ]

  return (
    <section className="py-16 sm:py-20 bg-slate-50/60 relative border-y border-slate-200/80 font-body select-none overflow-hidden">
      {/* Background Graphic: experience-bg.png with Molecular & Colorful Accents */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        <img
          src={experienceBg}
          alt=""
          className="w-full h-full object-cover object-center opacity-85"
        />
        {/* Soft edge fade for flawless integration */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-transparent to-white/60 pointer-events-none" />
      </div>

      {/* Subtle Dot Matrix Pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.2]"
        style={{
          backgroundImage: `radial-gradient(#94a3b8 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* Section Heading */}
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black font-heading text-slate-900 tracking-wider uppercase">
          WHY EXIM INDIA ?
        </h2>

        {/* Minimal Underline Bar (Matching Reference Design) */}
        <div className="w-16 sm:w-20 h-0.5 bg-slate-900 mx-auto mt-3 sm:mt-4 mb-10 sm:mb-14" />

        {/* 6 Pillars Horizontal Row - Elevated Glass Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 items-stretch">
          {pillars.map((item) => (
            <div
              key={item.id}
              className="group flex flex-col items-center justify-between text-center p-4 sm:p-5 rounded-2xl bg-white/75 hover:bg-white/95 backdrop-blur-md border border-slate-200/80 hover:border-slate-300 shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-default"
            >
              {/* Icon Container with dynamic translucent background ring */}
              <div
                className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 mb-3"
                style={{
                  backgroundColor: `${item.color}14`,
                  color: item.color,
                }}
              >
                {item.icon}
              </div>

              {/* Title with Matching Theme Color */}
              <h3
                className="text-xs sm:text-sm font-extrabold leading-snug tracking-tight max-w-[150px] transition-colors"
                style={{ color: item.color }}
              >
                {item.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
