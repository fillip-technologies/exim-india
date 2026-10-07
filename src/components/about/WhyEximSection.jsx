import experienceBg from '../../assets/experience-bg.png'

export default function WhyEximSection() {
  const pillars = [
    {
      id: 1,
      title: 'Ethical Business Policies',
      color: '#059669', // Emerald
      icon: (
        <svg className="w-12 h-12 sm:w-14 sm:h-14" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          {/* Integrity Shield with Checkmark */}
          <path d="M32 8l18 8v16c0 14-10 22-18 26-8-4-18-12-18-26V16l18-8z" />
          <path d="M22 32l7 7 13-13" />
        </svg>
      ),
    },
    {
      id: 2,
      title: 'Quality- is our assurance',
      color: '#2563eb', // Royal Blue
      icon: (
        <svg className="w-12 h-12 sm:w-14 sm:h-14" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          {/* Ribbon Rosette Quality Badge */}
          <circle cx="32" cy="26" r="14" />
          <path d="M32 18l2.2 4.5 5 .7-3.6 3.5.9 5-4.5-2.4-4.5 2.4.9-5-3.6-3.5 5-.7z" />
          <path d="M24 38l-4 16 8-4 4 4 0-14" />
          <path d="M40 38l4 16-8-4-4 4 0-14" />
        </svg>
      ),
    },
    {
      id: 3,
      title: 'Smart Support',
      color: '#7c3aed', // Purple
      icon: (
        <svg className="w-12 h-12 sm:w-14 sm:h-14" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          {/* Support Headset with Smart Glow */}
          <path d="M14 34v-8a18 18 0 0 1 36 0v8" />
          <rect x="10" y="32" width="8" height="14" rx="3" />
          <rect x="46" y="32" width="8" height="14" rx="3" />
          <path d="M48 46v6a4 4 0 0 1-4 4H34" />
          <circle cx="30" cy="56" r="3" />
          <path d="M32 14v-6" />
          <path d="M24 16l-4-4" />
          <path d="M40 16l4-4" />
        </svg>
      ),
    },
    {
      id: 4,
      title: 'Recognition In International Market',
      color: '#d97706', // Amber / Gold
      icon: (
        <svg className="w-12 h-12 sm:w-14 sm:h-14" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          {/* Global Market Globe with Star */}
          <circle cx="32" cy="32" r="22" />
          <path d="M10 32h44" />
          <path d="M32 10c6 8 9 15 9 22s-3 14-9 22c-6-8-9-15-9-22s3-14 9-22z" />
          <path d="M46 16l2 4 4 .5-3 3 .7 4-3.7-2-3.7 2 .7-4-3-3 4-.5z" />
        </svg>
      ),
    },
    {
      id: 5,
      title: 'Customization',
      color: '#dc2626', // Crimson / Red
      icon: (
        <svg className="w-12 h-12 sm:w-14 sm:h-14" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          {/* Customization Sliders */}
          <path d="M16 18h32" />
          <circle cx="26" cy="18" r="5" fill="currentColor" fillOpacity="0.25" />
          <path d="M16 32h32" />
          <circle cx="40" cy="32" r="5" fill="currentColor" fillOpacity="0.25" />
          <path d="M16 46h32" />
          <circle cx="22" cy="46" r="5" fill="currentColor" fillOpacity="0.25" />
        </svg>
      ),
    },
    {
      id: 6,
      title: 'Timely Delivery',
      color: '#ea580c', // Vibrant Orange
      icon: (
        <svg className="w-12 h-12 sm:w-14 sm:h-14" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          {/* Express Transport Cargo */}
          <rect x="8" y="22" width="30" height="24" rx="3" />
          <path d="M38 30h10l6 8v8h-16V30z" />
          <circle cx="20" cy="48" r="5" fill="currentColor" fillOpacity="0.25" />
          <circle cx="46" cy="48" r="5" fill="currentColor" fillOpacity="0.25" />
          <path d="M6 28h-4M6 34h-3M6 40h-4" />
        </svg>
      ),
    },
    {
      id: 7,
      title: 'Competitive Pricing',
      color: '#0891b2', // Cyan / Teal
      icon: (
        <svg className="w-12 h-12 sm:w-14 sm:h-14" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          {/* Price Tag with Value Percentage */}
          <path d="M28 12h18a4 4 0 0 1 4 4v18l-22 22a4 4 0 0 1-5.6 0L10.4 44a4 4 0 0 1 0-5.6L28 12z" />
          <circle cx="42" cy="22" r="3" />
          <path d="M26 36l8-8" strokeWidth="2" />
          <circle cx="28" cy="30" r="1.5" fill="currentColor" />
          <circle cx="34" cy="34" r="1.5" fill="currentColor" />
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
          WHY EXIM?
        </h2>

        {/* Minimal Underline Bar (Matching Reference Design) */}
        <div className="w-16 sm:w-20 h-0.5 bg-slate-900 mx-auto mt-3 sm:mt-4 mb-10 sm:mb-14" />

        {/* 7 Pillars Row - Elevated Glass Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-7 gap-3.5 sm:gap-4 lg:gap-5 items-stretch">
          {pillars.map((item) => (
            <div
              key={item.id}
              className="group flex flex-col items-center justify-between text-center p-4 sm:p-5 rounded-2xl bg-white/80 hover:bg-white/98 backdrop-blur-md border border-slate-200/80 hover:border-slate-300 shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-default min-h-[170px]"
            >
              {/* Icon Container with dynamic translucent background ring */}
              <div
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 mb-3 shrink-0"
                style={{
                  backgroundColor: `${item.color}14`,
                  color: item.color,
                }}
              >
                {item.icon}
              </div>

              {/* Title with Matching Theme Color */}
              <h3
                className="text-xs sm:text-[13px] font-extrabold leading-snug tracking-tight max-w-[140px] transition-colors mt-auto"
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
