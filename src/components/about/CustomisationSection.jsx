import { Link } from 'react-router-dom'
import experienceBg from '../../assets/experience-bg.png'

export default function CustomisationSection() {
  const cards = [
    {
      id: 'products-packs',
      title: '300+ Quality Products & Pack Sizes',
      iconBg: 'bg-emerald-50 text-[#0a3622] border-emerald-200/90',
      hoverBorder: 'hover:border-emerald-400/80',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      ),
    },
    {
      id: 'custom-packaging',
      title: 'Customized Packaging Solutions',
      iconBg: 'bg-amber-50 text-amber-900 border-amber-200/90',
      hoverBorder: 'hover:border-amber-400/80',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    },
    {
      id: 'third-party-labeling',
      title: 'Third Party Labelling & Packing',
      iconBg: 'bg-blue-50 text-blue-900 border-blue-200/90',
      hoverBorder: 'hover:border-blue-400/80',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
        </svg>
      ),
    },
  ]

  return (
    <section className="py-16 sm:py-24 relative overflow-hidden font-body border-t border-slate-200/80 select-none bg-slate-50/20">
      {/* Background Graphic: experience-bg.png with Full Visibility */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0">
        <img
          src={experienceBg}
          alt=""
          className="w-full h-full object-cover object-center opacity-90 sm:opacity-95"
        />
        {/* Soft edge blend for seamless top/bottom section flow without washing out background graphics */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-white/30 pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* 2-Column Split: Left Paragraph & Heading | Right Cards with Only Title */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* LEFT SIDE: Heading & Detailed Narrative */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div>
              <div className="flex items-center gap-2.5 mb-2.5">
                <span className="w-8 h-[2.5px] bg-[#0a3622] rounded-full inline-block" />
                <span className="text-[11px] font-black tracking-[0.22em] text-[#0a3622] uppercase font-heading">
                  BESPOKE SOLUTIONS
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading text-slate-900 tracking-tight leading-[1.15]">
                Customisation
              </h2>

              <div className="w-20 h-1 bg-gradient-to-r from-amber-500 via-[#0a3622] to-emerald-600 rounded-full mt-4" />
            </div>

            {/* Direct Text Narrative - Clean, No Background Container */}
            <div className="space-y-4 pt-1">
              <p className="text-base sm:text-lg lg:text-xl text-slate-800 font-semibold leading-relaxed">
                With over <span className="text-[#0a3622] font-black underline decoration-emerald-500/40 decoration-2 underline-offset-4">300+ quality products</span> and a range of pack sizes to suit your business requirements, <span className="text-slate-900 font-black">EXIM</span> will give your product the competitive edge you need.
              </p>
              <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
                Packaging of our products are done by team of professionals and we also offer customize packaging solutions. We also do undertake third party labelling and packing for our various International Clients.
              </p>
            </div>

            {/* Action CTA */}
            <div className="pt-2">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-[#0a3622] hover:bg-[#0f4d30] text-white text-xs font-bold font-heading shadow-md hover:shadow-lg transition-all active:scale-98 cursor-pointer"
              >
                <span>Inquire for Customization</span>
                <span>&rarr;</span>
              </Link>
            </div>
          </div>

          {/* RIGHT SIDE: Cards with ONLY Title & Icon */}
          <div className="lg:col-span-5 space-y-4 sm:space-y-5">
            {cards.map((card) => (
              <div
                key={card.id}
                className={`group p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-white/85 backdrop-blur-md border border-white/90 shadow-md hover:shadow-xl hover:bg-white hover:-translate-y-1 transition-all duration-300 flex items-center gap-4 sm:gap-5 ${card.hoverBorder}`}
              >
                {/* Clean Icon Container */}
                <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center border shadow-2xs shrink-0 group-hover:scale-105 transition-transform ${card.iconBg}`}>
                  {card.icon}
                </div>

                {/* Only Title */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-base sm:text-lg font-extrabold font-heading text-slate-900 group-hover:text-[#0a3622] transition-colors leading-snug">
                    {card.title}
                  </h3>
                </div>

                {/* Subtle Right Arrow Accent */}
                <div className="w-8 h-8 rounded-full bg-slate-50 border border-slate-200/80 flex items-center justify-center text-slate-400 group-hover:text-[#0a3622] group-hover:border-[#0a3622]/30 group-hover:bg-emerald-50/50 shrink-0 transition-colors">
                  <span className="text-sm font-bold group-hover:translate-x-0.5 transition-transform">&rarr;</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
