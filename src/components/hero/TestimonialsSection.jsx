import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import avatar1 from '../../assets/avatar-1.jpg'
import avatar2 from '../../assets/avatar-2.jpg'
import avatar3 from '../../assets/avatar-3.jpg'
import avatar4 from '../../assets/avatar-4.jpg'
import avatar5 from '../../assets/avatar-5.jpg'

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0) // Top visible item index (0..4)
  const [isTransitioning, setIsTransitioning] = useState(true)
  const [isPaused, setIsPaused] = useState(false)
  const autoPlayRef = useRef(null)

  const testimonials = [
    {
      id: 0,
      name: 'Liam Reynolds',
      role: 'Procurement Director',
      company: 'BevTech Global Innovations (Germany)',
      avatar: avatar1,
      quote:
        'Exim India has been our primary research partner for synthetic food colors and lake pigments. Their batch-to-batch consistency and fast regulatory dossiers make customs clearance in the EU seamless.',
    },
    {
      id: 1,
      name: 'Sarah Bennett',
      role: 'Quality & Formulations Head',
      company: 'Gulf Confectionery & Bakery (Dubai, UAE)',
      avatar: avatar2,
      quote:
        'Dear to say when we first tested their cloud emulsions and mango powders, the results exceeded our benchmark. Express evaluation samples always arrive within 48 hours without fail.',
    },
    {
      id: 2,
      name: 'Matthew Downs',
      role: 'VP Supply Chain & Quality',
      company: 'Apex Health Formulations (Canada)',
      avatar: avatar3,
      quote:
        'Never at doubt on purity and weight. Our pharmaceutical operations demand IP/USP verified standards and Exim India’s airtight fiber drums provide zero moisture leakage.',
    },
    {
      id: 3,
      name: 'Kenji Tanaka',
      role: 'Chief Formulation Chemist',
      company: 'Nippon Flavour & Beverage Labs (Tokyo, Japan)',
      avatar: avatar4,
      quote:
        'We tested over a dozen international botanical extract suppliers before qualifying Exim India. Their analytical COA and heavy-metal screening match our strict Japanese food standards.',
    },
    {
      id: 4,
      name: 'Claire Harrington',
      role: 'Global Sourcing Lead',
      company: 'Britannia Ingredients & Oils (London, UK)',
      avatar: avatar5,
      quote:
        'From cold-pressed citrus oils to custom spray-dried fruit powders, Exim India provides prompt sea-freight booking and flawless documentation. An outstanding and dependable partner.',
    },
  ]

  // Clone first 3 items at the end to allow seamless infinite upward slide
  const displayItems = [...testimonials, ...testimonials.slice(0, 3)]

  // Height of each card (136px) + margin-bottom (16px) = 152px step
  const STEP_HEIGHT = 152

  const handleNext = () => {
    setIsTransitioning(true)
    setActiveIndex((prev) => prev + 1)
  }

  const handlePrev = () => {
    setIsTransitioning(true)
    if (activeIndex === 0) {
      // Jump to 5 without transition, then slide to 4
      setIsTransitioning(false)
      setActiveIndex(testimonials.length)
      setTimeout(() => {
        setIsTransitioning(true)
        setActiveIndex(testimonials.length - 1)
      }, 20)
    } else {
      setActiveIndex((prev) => prev - 1)
    }
  }

  // Handle wrap-around when reaching cloned end
  const handleTransitionEnd = () => {
    if (activeIndex >= testimonials.length) {
      setIsTransitioning(false)
      setActiveIndex(0)
    }
  }

  // Auto-slide upwards every 3.8s, pausing when user hovers
  useEffect(() => {
    if (isPaused) return

    autoPlayRef.current = setInterval(() => {
      handleNext()
    }, 3800)

    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current)
    }
  }, [activeIndex, isPaused])

  // Current featured (middle) testimonial index (0..4)
  const currentFeaturedIndex = (activeIndex + 1) % testimonials.length

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-[#f8fafc] border-t border-slate-200/80 font-body relative overflow-hidden">
      {/* Background Soft Lighting Gradients */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-emerald-50/70 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-amber-50/60 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* ============================================================== */}
          {/* LEFT COLUMN: Section Title, Descriptive Text, & CTA Button     */}
          {/* ============================================================== */}
          <div className="lg:col-span-5 text-left space-y-5">
            {/* Overline with Warm Gold Accent Bar */}
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-0.5 bg-[#c59b27] rounded-full inline-block" />
              <span className="text-xs font-black uppercase tracking-widest text-[#0a3622] font-heading">
                TESTIMONIALS
              </span>
            </div>

            {/* Main Headline */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading text-slate-900 tracking-tight leading-[1.15]">
              <span>What Our</span>
              <br />
              <span>Customers Say</span>
            </h2>

            {/* Narrative Subtitle */}
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal max-w-md">
              Reliable batch consistency and verified purity delivered across 50+ countries. See why global food, beverage, and pharma manufacturers trust Exim India as their lifelong export partner.
            </p>

            {/* Action CTA Button & Carousel Controls */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl bg-[#0a3622] hover:bg-[#124e32] text-white text-sm font-bold shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 active:scale-95 cursor-pointer"
              >
                <span>Partner With Us</span>
                <span>&rarr;</span>
              </Link>

              {/* Up & Down Manual Slide Buttons */}
              <div className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-xl p-1 shadow-sm">
                <button
                  type="button"
                  onClick={handlePrev}
                  title="Previous testimonial (slide down)"
                  aria-label="Previous testimonial"
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-600 hover:text-[#0a3622] hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 15l7-7 7 7" />
                  </svg>
                </button>
                <div className="w-[1px] h-4 bg-slate-200" />
                <button
                  type="button"
                  onClick={handleNext}
                  title="Next testimonial (move upside)"
                  aria-label="Next testimonial"
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-600 hover:text-[#0a3622] hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Pagination Dots (5 Testimonials Indicator) */}
            <div className="flex items-center gap-2 pt-1">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => {
                    setIsTransitioning(true)
                    setActiveIndex((i - 1 + testimonials.length) % testimonials.length)
                  }}
                  title={`View testimonial ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                    i === currentFeaturedIndex
                      ? 'w-6 bg-[#0a3622]'
                      : 'w-2 bg-slate-300 hover:bg-slate-400'
                  }`}
                />
              ))}
              <span className="text-[11px] font-medium text-slate-400 ml-2">
                {currentFeaturedIndex + 1} / {testimonials.length}
              </span>
            </div>

            {/* Subtle Trust Indicators */}
            <div className="pt-5 border-t border-slate-200/80 flex items-center gap-6 text-xs text-slate-500 font-medium">
              <div className="flex items-center gap-1.5">
                <span className="text-emerald-700 font-black">✓</span>
                <span>50+ Countries</span>
              </div>
              <div className="w-1 h-1 rounded-full bg-slate-300" />
              <div className="flex items-center gap-1.5">
                <span className="text-amber-500 font-black">★</span>
                <span>4.9 / 5 Client Rating</span>
              </div>
            </div>
          </div>

          {/* ============================================================== */}
          {/* RIGHT COLUMN: 3 Visible Staggered Cards (Moving Upside)        */}
          {/* ============================================================== */}
          <div
            className="lg:col-span-7 relative h-[440px] sm:h-[456px] overflow-hidden px-2 sm:px-4 py-1"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Top and Bottom Soft Gradient Fades */}
            <div className="absolute top-0 left-0 right-0 h-6 bg-gradient-to-b from-[#f8fafc] to-transparent z-20 pointer-events-none" />
            <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-[#f8fafc] to-transparent z-20 pointer-events-none" />

            {/* Continuous Vertical Sliding Track */}
            <div
              onTransitionEnd={handleTransitionEnd}
              style={{
                transform: `translateY(-${activeIndex * STEP_HEIGHT}px)`,
                transition: isTransitioning
                  ? 'transform 650ms cubic-bezier(0.25, 1, 0.5, 1)'
                  : 'none',
              }}
              className="will-change-transform"
            >
              {displayItems.map((item, index) => {
                // The item currently occupying the middle slot (index = activeIndex + 1) is active
                const isMiddle = index === activeIndex + 1

                return (
                  <div
                    key={`${item.id}-${index}`}
                    onClick={() => {
                      if (index === activeIndex) {
                        handlePrev()
                      } else if (index === activeIndex + 2) {
                        handleNext()
                      }
                    }}
                    className={`relative flex items-center h-[136px] mb-4 transition-all duration-500 ease-out cursor-pointer w-full ${
                      isMiddle
                        ? 'lg:w-[calc(100%-2.25rem)] lg:translate-x-3'
                        : 'lg:w-[calc(100%-2.25rem)] lg:translate-x-8'
                    }`}
                  >
                    {/* Left Vertical Accent Indicator Bar for Active Middle Card */}
                    <div
                      className={`absolute -left-2 sm:-left-3 top-2.5 bottom-2.5 w-1.5 rounded-full transition-all duration-300 ${
                        isMiddle
                          ? 'bg-gradient-to-b from-[#0a3622] to-emerald-500 opacity-100 scale-y-100'
                          : 'bg-transparent opacity-0 scale-y-50'
                      }`}
                    />

                    {/* Horizontal Testimonial Card */}
                    <div
                      className={`w-full h-full bg-white rounded-2xl sm:rounded-3xl border transition-all duration-300 p-4 sm:p-5 flex items-start gap-4 sm:gap-5 ${
                        isMiddle
                          ? 'border-emerald-600/40 shadow-xl shadow-slate-900/10 -translate-y-0.5'
                          : 'border-slate-200/80 shadow-sm opacity-90 hover:opacity-100 hover:border-slate-300'
                      }`}
                    >
                      {/* Author Circular Avatar with Ring */}
                      <div className="relative shrink-0">
                        <div
                          className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden transition-all duration-300 ${
                            isMiddle
                              ? 'ring-3 ring-[#0a3622]/20 shadow-md scale-102'
                              : 'ring-2 ring-slate-100'
                          }`}
                        >
                          <img
                            src={item.avatar}
                            alt={item.name}
                            className="w-full h-full object-cover object-center"
                            loading="lazy"
                          />
                        </div>
                      </div>

                      {/* Card Content: Name, Role, & Quote */}
                      <div className="flex-1 min-w-0 text-left">
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <h3 className="font-extrabold font-heading text-slate-900 text-sm sm:text-base leading-tight truncate">
                              {item.name}
                            </h3>
                            <p className="text-[11px] sm:text-xs text-slate-500 font-medium truncate mt-0.5">
                              {item.role} • <span className="text-slate-700">{item.company}</span>
                            </p>
                          </div>

                          {/* Double Quotation Icon */}
                          <div className="shrink-0 text-right">
                            <svg
                              className={`w-5 h-5 sm:w-6 sm:h-6 transition-colors duration-300 ${
                                isMiddle ? 'text-[#0a3622]' : 'text-slate-300'
                              }`}
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                            </svg>
                          </div>
                        </div>

                        {/* Testimonial Quote */}
                        <p className="mt-2 text-xs sm:text-[13px] text-slate-600 leading-snug sm:leading-relaxed font-normal line-clamp-2 sm:line-clamp-3">
                          {item.quote}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
