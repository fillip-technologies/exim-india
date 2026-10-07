import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import hero5 from '../../assets/hero-section-5.png'
import hero6 from '../../assets/hero-6.png'
import hero7 from '../../assets/hero-5.png'
import fdaImg from '../../assets/FDA-Maharashtra.jpg'
import isoImg from '../../assets/iso-cer1.png'

const HERO_SLIDES = [
  {
    id: 1,
    image: hero5,
    alt: 'Exim India Corporation - Connecting Indian Excellence To The World',
    overline: 'INDIAN PRODUCTS. GLOBAL OPPORTUNITIES.',
    headline1: 'CONNECTING',
    headline2: 'INDIAN EXCELLENCE',
    headline3: 'TO THE WORLD',
    description:
      'A leading research based export house delivering high quality Food Colors, Flavours, Emulsions, Fragrances, Essential Oils, Botanical Extracts and many more products to global markets.',
  },
  {
    id: 2,
    image: hero6,
    alt: 'Exim India Corporation - Global Research & Ingredient Innovation',
    overline: 'RESEARCH-DRIVEN FORMULATIONS.',
    headline1: 'DELIVERING',
    headline2: 'CERTIFIED PURITY',
    headline3: 'ACROSS 50+ NATIONS',
    description:
      'Precision-engineered synthetic food colours, lake pigments, and natural botanical extracts crafted to stringent FDA, ISO 22000, and international regulatory standards.',
  },
  {
    id: 3,
    image: hero7,
    alt: 'Exim India Corporation - Seamless Global Logistics & Export Network',
    overline: 'WORLD-CLASS SUPPLY CHAIN.',
    headline1: 'SEAMLESS',
    headline2: 'MULTIMODAL LOGISTICS',
    headline3: 'AT GLOBAL SCALE',
    description:
      'End-to-end maritime, air freight, and temperature-controlled cold chain logistics guaranteeing freshness and timely dispatch to international partners worldwide.',
  },
]

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [touchStartX, setTouchStartX] = useState(null)
  const heroRef = useRef(null)

  // Direct slide change - 100% synchronized with image transition
  const changeSlide = (target) => {
    setCurrentSlide((prev) => (typeof target === 'function' ? target(prev) : target))
  }

  const nextSlide = () => {
    changeSlide((prev) => (prev + 1) % HERO_SLIDES.length)
  }

  const prevSlide = () => {
    changeSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)
  }

  const goToSlide = (idx) => {
    changeSlide(idx)
  }

  // Reliable Autoplay Slider Timer (changes every 5 seconds)
  useEffect(() => {
    const timer = setInterval(() => {
      changeSlide((prev) => (prev + 1) % HERO_SLIDES.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  // Mobile Touch Swipe Handlers
  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX)
  }

  const handleTouchEnd = (e) => {
    if (touchStartX === null) return
    const touchEndX = e.changedTouches[0].clientX
    const diffX = touchStartX - touchEndX
    if (Math.abs(diffX) > 40) {
      if (diffX > 0) {
        nextSlide()
      } else {
        prevSlide()
      }
    }
    setTouchStartX(null)
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') nextSlide()
      if (e.key === 'ArrowLeft') prevSlide()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [currentSlide])

  // GSAP First Load Entrance Animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      // 1. Subtle entrance on hero background
      tl.fromTo(
        '.hero-bg-container',
        { opacity: 0.7 },
        { opacity: 1, duration: 1.2, ease: 'power2.out' },
        0
      )

      // 2. Text container entrance on initial load
      tl.fromTo(
        '.hero-text-entrance',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.85, ease: 'power2.out' },
        0.25
      )

      // 5. Action CTA buttons pop and rise
      tl.fromTo(
        '.hero-cta-btn',
        { y: 20, opacity: 0, scale: 0.94 },
        { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.12, ease: 'back.out(1.4)' },
        0.55
      )

      // 6. Bottom Frosted Bar slide up
      tl.fromTo(
        '.hero-bottom-bar',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.85 },
        0.65
      )

      // 7. Certification logo cards pop in
      tl.fromTo(
        '.hero-cert-card',
        { scale: 0.88, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.55, stagger: 0.1, ease: 'back.out(1.4)' },
        0.85
      )

      // 8. Stats items stagger
      tl.fromTo(
        '.hero-stat-item',
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.55, stagger: 0.08 },
        0.95
      )
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={heroRef}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="relative min-h-[100dvh] sm:min-h-[105vh] lg:min-h-[112vh] flex flex-col justify-between overflow-hidden"
    >
      {/* Full-Bleed Cinematic Crossfade Transition: hero-5, hero-6, hero-7 */}
      <div className="hero-bg-container absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {HERO_SLIDES.map((slide, idx) => {
          const isActive = currentSlide === idx
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out will-change-transform ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              <img
                src={slide.image}
                alt={slide.alt}
                className={`w-full h-full object-cover object-[52%_18%] sm:object-right lg:object-center origin-center transition-transform duration-[6000ms] ease-out ${
                  isActive ? 'scale-105' : 'scale-100'
                }`}
              />
            </div>
          )
        })}

        {/* Master Light Theme Wash Overlay:
            - Positioned above the photos to remain completely smooth & stable
            - Preserves crystal clear visibility of planes, ships, flasks and vibrant colors
            - Guarantees razor-sharp readability of the text */}
        <div className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-b from-white/65 via-white/35 via-35% to-transparent sm:bg-gradient-to-r sm:from-white/90 sm:via-white/55 sm:via-25% sm:to-transparent sm:to-38%" />
      </div>

      {/* Hero Content Area */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-36 pb-8 sm:pb-12 w-full flex-1 flex flex-col justify-center">
        <div className="max-w-md lg:max-w-[490px] space-y-3 sm:space-y-4 text-left">

          {/* Synchronized Crossfading Text Area (CSS Grid: 100% Timing Parity with Background Image) */}
          <div className="hero-text-entrance grid grid-cols-1 grid-rows-1">
            {HERO_SLIDES.map((slide, idx) => {
              const isActive = currentSlide === idx
              return (
                <div
                  key={slide.id}
                  className={`col-start-1 row-start-1 space-y-3 sm:space-y-4 transition-all duration-700 ease-in-out will-change-transform ${
                    isActive
                      ? 'opacity-100 translate-y-0 pointer-events-auto z-10'
                      : 'opacity-0 translate-y-1 pointer-events-none z-0'
                  }`}
                >
                  {/* Accent Line & Overline */}
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-[2px] bg-[#c2410c] inline-block shrink-0" />
                    <span className="text-[11px] sm:text-xs font-black sm:font-bold tracking-[0.16em] text-slate-950 sm:text-[#0f172a] uppercase drop-shadow-[0_1px_4px_rgba(255,255,255,1)]">
                      {slide.overline}
                    </span>
                  </div>

                  {/* Main 3-Tier Headline */}
                  <h1 className="text-xl sm:text-3xl lg:text-[40px] font-black sm:font-extrabold font-heading tracking-tight leading-[1.12] text-slate-950 sm:text-[#0f172a] drop-shadow-[0_2px_8px_rgba(255,255,255,1)] drop-shadow-[0_0_12px_rgba(255,255,255,0.95)]">
                    <span className="block">
                      {slide.headline1}
                    </span>
                    <span className="block text-slate-950 sm:text-[#0f172a]">
                      {slide.headline2}
                    </span>
                    <span className="block text-[#a14304] sm:text-[#b45309] mt-0.5">
                      {slide.headline3}
                    </span>
                  </h1>

                  {/* Subtitle Description */}
                  <p className="text-xs sm:text-xs lg:text-[13px] font-bold sm:font-normal text-slate-950 sm:text-slate-800 max-w-sm sm:max-w-md leading-relaxed drop-shadow-[0_1px_4px_rgba(255,255,255,1)] drop-shadow-[0_0_8px_rgba(255,255,255,0.95)] min-h-[48px] sm:min-h-[54px]">
                    {slide.description}
                  </p>
                </div>
              )
            })}
          </div>

          {/* CTA Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3.5 pt-1">
            {/* Primary Green Button: Smooth scroll to homepage products section */}
            <a
              href="#products-section"
              onClick={(e) => {
                e.preventDefault()
                const target = document.getElementById('products-section')
                if (target) {
                  target.scrollIntoView({ behavior: 'smooth', block: 'start' })
                }
              }}
              className="hero-cta-btn inline-flex items-center justify-center gap-1.5 rounded-lg bg-[#0a3622] hover:bg-[#0f4d30] text-white px-4.5 sm:px-5.5 py-2.5 sm:py-2.5 text-xs sm:text-sm font-bold sm:font-semibold shadow-md hover:shadow-lg transition-all duration-200 active:scale-95 cursor-pointer"
            >
              <span>Explore Our Products</span>
              <span className="text-sm">&rarr;</span>
            </a>
          </div>

          {/* Slide Navigation Controls: Previous / Next & Active Pill Dots */}
          <div className="pt-2 sm:pt-3 flex items-center gap-2.5 sm:gap-3">
            {/* Previous Slide Button */}
            <button
              type="button"
              onClick={prevSlide}
              aria-label="Previous Hero Slide"
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/95 hover:bg-white border border-slate-300/90 shadow-xs hover:shadow text-slate-800 hover:text-[#0a3622] flex items-center justify-center transition-all active:scale-90 cursor-pointer drop-shadow-xs"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Active Pill Dots */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              {HERO_SLIDES.map((slide, idx) => (
                <button
                  key={slide.id}
                  type="button"
                  onClick={() => goToSlide(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`transition-all duration-500 rounded-full cursor-pointer ${currentSlide === idx
                    ? 'w-7 sm:w-8 h-2 sm:h-2 bg-[#0a3622] shadow-xs'
                    : 'w-2 h-2 bg-slate-400 hover:bg-slate-600'
                    }`}
                />
              ))}
            </div>

            {/* Next Slide Button */}
            <button
              type="button"
              onClick={nextSlide}
              aria-label="Next Hero Slide"
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/95 hover:bg-white border border-slate-300/90 shadow-xs hover:shadow text-slate-800 hover:text-[#0a3622] flex items-center justify-center transition-all active:scale-90 cursor-pointer drop-shadow-xs"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Frosted Metrics & Accreditation Bar - Certifications on Left */}
      <div className="relative z-10 hero-bottom-bar text-white py-4 sm:py-5 px-4 sm:px-8 mt-8">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8">

          {/* Left Side: Accreditation & Certification Logos (On phone: 2 equal balanced columns matching stats grid) */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4 w-full lg:w-auto lg:flex lg:items-center lg:justify-start shrink-0">
            <div className="hero-cert-card bg-white rounded-xl h-11 sm:h-12 px-2.5 sm:px-3 shadow-md flex items-center justify-center hover:scale-105 transition-transform duration-200">
              <img
                src={fdaImg}
                alt="FDA Maharashtra - Food and Drug Administration"
                className="h-7 sm:h-8 max-h-full w-auto object-contain"
              />
            </div>

            <div className="hero-cert-card bg-white rounded-xl h-11 sm:h-12 px-2.5 sm:px-3 shadow-md flex items-center justify-center hover:scale-105 transition-transform duration-200">
              <img
                src={isoImg}
                alt="ISO 22000: 2018 Certified"
                className="h-7 sm:h-8 max-h-full w-auto object-contain"
              />
            </div>
          </div>

          {/* Vertical Divider separating Certifications and Stats on Desktop */}
          <div className="hidden lg:block h-8 w-px bg-white/20 shrink-0" />

          {/* Right/Center Stats: Key Metric Stats with Icons */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 w-full lg:w-auto">
            {/* 100+ Products */}
            <div className="hero-stat-item flex items-center gap-3">
              <div className="text-white/80 shrink-0">
                <svg className="w-7 h-7 sm:w-8 sm:h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-extrabold font-heading text-white leading-none">
                  100+
                </div>
                <div className="text-xs text-slate-300 font-medium mt-0.5">
                  Premium Products
                </div>
              </div>
            </div>

            {/* 50+ Countries */}
            <div className="hero-stat-item flex items-center gap-3">
              <div className="text-white/80 shrink-0">
                <svg className="w-7 h-7 sm:w-8 sm:h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-extrabold font-heading text-white leading-none">
                  50+
                </div>
                <div className="text-xs text-slate-300 font-medium mt-0.5">
                  Countries Worldwide
                </div>
              </div>
            </div>

            {/* 1000+ Clients */}
            <div className="hero-stat-item flex items-center gap-3">
              <div className="text-white/80 shrink-0">
                <svg className="w-7 h-7 sm:w-8 sm:h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-extrabold font-heading text-white leading-none">
                  1000+
                </div>
                <div className="text-xs text-slate-300 font-medium mt-0.5">
                  Satisfied Clients
                </div>
              </div>
            </div>

            {/* 8+ Years */}
            <div className="hero-stat-item flex items-center gap-3">
              <div className="text-white/80 shrink-0">
                <svg className="w-7 h-7 sm:w-8 sm:h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-extrabold font-heading text-white leading-none">
                  8+
                </div>
                <div className="text-xs text-slate-300 font-medium mt-0.5">
                  Years of Excellence
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

    </section>
  )
}
