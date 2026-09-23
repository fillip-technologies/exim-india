import { useState } from 'react'
import { Link } from 'react-router-dom'
import eximImage from '../../assets/global-logistics-panoramic.jpg'

export default function LogisticsSplitSection() {
  // No slice active by default; only when hovered/tapped
  const [activeIndex, setActiveIndex] = useState(null)

  const items = [
    {
      id: '01',
      title: 'Food Colors & Lake Dyes',
      description:
        'Certified synthetic food colors, lake pigments, and custom blended formulations exported to 50+ countries for food, beverage, and pharma applications.',
      link: '/products/synthetic-food-colours',
    },
    {
      id: '02',
      title: 'Flavours & Emulsions',
      description:
        'Liquid flavours, beverage cloud emulsions, and spray-dried powder formulations crafted with authentic Indian profiles and export quality standards.',
      link: '/products/liquid-flavours',
    },
    {
      id: '03',
      title: 'Essential Oils & Extracts',
      description:
        '100% pure steam-distilled Indian essential oils, standardized botanical extracts, and natural ingredients preserved under controlled storage.',
      link: '/products/essential-oils',
    },
    {
      id: '04',
      title: 'Global Export & Supply Chain',
      description:
        'Climate-controlled warehousing in Mumbai with complete customs clearance, COA, FDA, Halal, and Kosher documentation for international shipments.',
      link: '/products',
    },
  ]

  const handleToggle = (idx) => {
    setActiveIndex((prev) => (prev === idx ? null : idx))
  }

  return (
    <section className="relative w-full h-auto lg:h-[430px] overflow-hidden bg-slate-900 select-none">
      {/* Continuous Panoramic Background Image Across All 4 Slices */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <img
          src={eximImage}
          alt="Exim India Corporation Global Export of Food Colors, Flavours, and Essential Oils"
          className="w-full h-full object-cover object-center filter contrast-105"
        />
        {/* Subtle dark ambient base overlay so text is always high contrast */}
        <div className="absolute inset-0 bg-black/30 pointer-events-none" />
      </div>

      {/* 4 Interactive Vertical Split Columns on desktop, responsive stack on mobile */}
      <div
        onMouseLeave={() => setActiveIndex(null)}
        className="relative z-10 w-full h-full flex flex-col lg:flex-row"
      >
        {items.map((item, idx) => {
          const isActive = activeIndex === idx

          return (
            <div
              key={item.id}
              onMouseEnter={() => {
                if (typeof window !== 'undefined' && window.innerWidth >= 1024) {
                  setActiveIndex(idx)
                }
              }}
              onClick={() => handleToggle(idx)}
              className={`relative flex flex-col justify-end p-5 sm:p-6 lg:p-6 border-b lg:border-b-0 lg:border-r border-white/20 last:border-b-0 last:border-r-0 cursor-pointer transition-all duration-500 ease-out ${
                isActive
                  ? 'lg:flex-[1.6] backdrop-blur-md bg-white/20 shadow-2xl py-6 sm:py-7'
                  : 'lg:flex-1 hover:bg-black/25 backdrop-blur-[1px] py-4 sm:py-5'
              }`}
            >
              {/* Active Column Frosted Highlight Layer */}
              {isActive && (
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-white/10 to-transparent pointer-events-none" />
              )}

              {/* Inactive Column Subtle Bottom Contrast Vignette */}
              {!isActive && (
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent pointer-events-none" />
              )}

              {/* Content Box */}
              <div className="relative z-10 text-left w-full">
                {/* Number Badge */}
                <div className="flex items-center gap-1.5 mb-1.5">
                  <span className="text-xs sm:text-sm font-extrabold font-heading text-orange-400 tracking-wider">
                    {item.id}
                  </span>
                  <div
                    className={`h-[2px] rounded-full transition-all duration-300 ${
                      isActive ? 'w-6 bg-orange-500' : 'w-3 bg-orange-400/50'
                    }`}
                  />
                </div>

                {/* Title & Action Container: Side-by-side on mobile, stacked on desktop */}
                <div className="flex items-center justify-between gap-3 lg:block">
                  <h3
                    className={`font-bold font-heading text-white leading-snug transition-all duration-300 ${
                      isActive
                        ? 'text-base sm:text-lg lg:text-xl text-white'
                        : 'text-sm sm:text-base lg:text-sm text-slate-100'
                    }`}
                  >
                    {item.title}
                  </h3>

                  {/* Circular Chevron Action Button (Mobile display) */}
                  <div className="lg:hidden shrink-0">
                    <Link
                      to={item.link}
                      onClick={(e) => e.stopPropagation()}
                      aria-label={`Explore ${item.title}`}
                      className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 shadow-md ${
                        isActive
                          ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-orange-500/40 scale-105'
                          : 'bg-white/20 backdrop-blur-xs text-white/90 border border-white/30'
                      }`}
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>

                {/* Expanded Description when Active */}
                <div
                  className={`overflow-hidden transition-all duration-500 ease-out ${
                    isActive
                      ? 'max-h-28 opacity-100 mt-2 sm:mt-2.5'
                      : 'max-h-0 opacity-0 mt-0 pointer-events-none'
                  }`}
                >
                  <p className="text-xs sm:text-sm text-slate-100 leading-relaxed font-normal max-w-xl">
                    {item.description}
                  </p>
                </div>

                {/* Bottom Circular Chevron Action Button (Desktop only) */}
                <div className="hidden lg:flex items-center mt-3 sm:mt-3.5">
                  <Link
                    to={item.link}
                    onClick={(e) => e.stopPropagation()}
                    aria-label={`Explore ${item.title}`}
                    className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-all duration-300 shadow-md ${
                      isActive
                        ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-orange-500/40 scale-105'
                        : 'bg-white/20 backdrop-blur-xs text-white/90 border border-white/30 hover:bg-white/30'
                    }`}
                  >
                    <svg
                      className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
