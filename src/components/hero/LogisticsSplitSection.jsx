import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { useCategories } from '../../api/useCatalog'

const MAX_ITEMS = 4

export default function LogisticsSplitSection() {
  const navigate = useNavigate()
  // No slice active by default; only when hovered/tapped
  const [activeIndex, setActiveIndex] = useState(null)

  const { categories } = useCategories()

  // Highlight the first categories that have an image; everything comes from the API
  const items = categories
    .filter((c) => c.image)
    .slice(0, MAX_ITEMS)
    .map((c, i) => ({
      id: String(i + 1).padStart(2, '0'),
      title: c.name,
      description: c.description,
      link: c.path || `/products/${c.slug}`,
      image: c.image,
      alt: c.name,
    }))

  const handleCardClick = (idx, link) => {
    if (typeof window !== 'undefined' && window.innerWidth >= 1024) {
      navigate(link)
    } else {
      if (activeIndex === idx) {
        navigate(link)
      } else {
        setActiveIndex(idx)
      }
    }
  }

  if (items.length === 0) return null

  return (
    <section className="relative w-full h-auto lg:h-[430px] overflow-hidden bg-slate-950">
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
              onClick={() => handleCardClick(idx, item.link)}
              className={`group relative flex flex-col justify-end p-5 sm:p-6 lg:p-6 border-b lg:border-b-0 lg:border-r border-white/20 last:border-b-0 last:border-r-0 cursor-pointer overflow-hidden transition-all duration-500 ease-out min-h-[220px] lg:min-h-0 ${
                isActive
                  ? 'lg:flex-[1.6] shadow-2xl py-6 sm:py-7'
                  : 'lg:flex-1 py-5 sm:py-6'
              }`}
            >
              {/* Individual Column Background Image with Zoom & Dark Gradient */}
              <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
                <img
                  src={item.image}
                  alt={item.alt}
                  className={`w-full h-full object-cover object-center transition-all duration-700 ease-out ${
                    isActive
                      ? 'scale-110 filter brightness-95'
                      : 'scale-100 filter brightness-90 group-hover:scale-105'
                  }`}
                />

                {/* Dark Gradient Overlay for optimal text readability */}
                <div
                  className={`absolute inset-0 transition-all duration-500 ${
                    isActive
                      ? 'bg-gradient-to-t from-black/95 via-black/55 to-black/30'
                      : 'bg-gradient-to-t from-black/90 via-black/60 to-black/35 group-hover:via-black/50'
                  }`}
                />

                {/* Subtle highlight sheen for active slice */}
                {isActive && (
                  <div className="absolute inset-0 bg-white/10 pointer-events-none transition-opacity duration-300" />
                )}
              </div>

              {/* Content Box */}
              <div className="relative z-10 text-left w-full">
                {/* Number Badge */}
                <div className="flex items-center gap-1.5 mb-1.5">
                  <span className="text-xs sm:text-sm font-extrabold font-heading text-orange-400 tracking-wider">
                    {item.id}
                  </span>
                  <div
                    className={`h-[2px] rounded-full transition-all duration-300 ${
                      isActive ? 'w-6 bg-orange-500' : 'w-3 bg-orange-400/60'
                    }`}
                  />
                </div>

                {/* Title & Action Container: Side-by-side on mobile, stacked on desktop */}
                <div className="flex items-center justify-between gap-3 lg:block">
                  <h3
                    className={`font-bold font-heading text-white leading-snug transition-all duration-300 ${
                      isActive
                        ? 'text-base sm:text-lg lg:text-xl text-white drop-shadow-sm'
                        : 'text-sm sm:text-base lg:text-sm text-slate-100 group-hover:text-white'
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
                  {item.description && (
                    <p className="text-xs sm:text-sm text-slate-100 leading-relaxed font-normal max-w-xl drop-shadow-xs line-clamp-3">
                      {item.description}
                    </p>
                  )}
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
                        : 'bg-white/20 backdrop-blur-xs text-white/90 border border-white/30 group-hover:bg-white/30'
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
