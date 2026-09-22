import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import heroBgi from '../../assets/hero-bgi-1.png'
import fdaImg from '../../assets/FDA-Maharashtra.jpg'
import isoImg from '../../assets/iso-cer1.png'

export default function HeroSection() {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)
  const heroRef = useRef(null)

  // GSAP First Load Entrance Animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      // 1. Subtle cinematic zoom and fade-in on background image
      tl.fromTo(
        '.hero-bg-img',
        { scale: 1.08, opacity: 0.75 },
        { scale: 1, opacity: 1, duration: 1.5, ease: 'power2.out' },
        0
      )

      // 2. Overline accent line & label
      tl.fromTo(
        '.hero-overline',
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.7 },
        0.2
      )

      // 3. 3-Tier Headline staggered cascade
      tl.fromTo(
        '.hero-headline-line',
        { y: 35, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.12 },
        0.35
      )

      // 4. Subtitle paragraph fade-up
      tl.fromTo(
        '.hero-subtitle',
        { y: 25, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7 },
        0.65
      )

      // 5. Action CTA buttons pop and rise
      tl.fromTo(
        '.hero-cta-btn',
        { y: 20, opacity: 0, scale: 0.94 },
        { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.12, ease: 'back.out(1.4)' },
        0.8
      )

      // 6. Bottom Frosted Bar slide up
      tl.fromTo(
        '.hero-bottom-bar',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.85 },
        0.7
      )

      // 7. Certification logo cards pop in
      tl.fromTo(
        '.hero-cert-card',
        { scale: 0.88, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.55, stagger: 0.1, ease: 'back.out(1.4)' },
        0.95
      )

      // 8. Stats items stagger
      tl.fromTo(
        '.hero-stat-item',
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.55, stagger: 0.08 },
        1.05
      )
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={heroRef} className="relative min-h-[100dvh] sm:min-h-[105vh] lg:min-h-[112vh] flex flex-col justify-between overflow-hidden">
      {/* Background Image Container with Light Gradient Wash */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img
          src={heroBgi}
          alt="Exim India Corporation - Global Products, Brighter Tomorrow"
          className="hero-bg-img w-full h-full object-cover object-[52%_18%] sm:object-right lg:object-center origin-center"
        />

        {/* Master Light Theme Wash Overlay:
            - Soft & natural wash: preserves blue sky and airplane colors without milky white haze
            - Desktop: compact soft fade leaving ship and aircraft completely vivid */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/65 via-white/35 via-35% to-transparent sm:bg-gradient-to-r sm:from-white/90 sm:via-white/55 sm:via-25% sm:to-transparent sm:to-38%" />
      </div>

      {/* Hero Content Area */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-36 pb-8 sm:pb-12 w-full flex-1 flex flex-col justify-center">
        <div className="max-w-md lg:max-w-[460px] space-y-3 sm:space-y-4 text-left">
          
          {/* Accent Line & Overline - Bold on Phone */}
          <div className="hero-overline flex items-center gap-2">
            <span className="w-5 h-[2px] bg-[#c2410c] inline-block shrink-0" />
            <span className="text-[11px] sm:text-xs font-black sm:font-bold tracking-[0.16em] text-slate-950 sm:text-[#0f172a] uppercase drop-shadow-[0_1px_4px_rgba(255,255,255,1)]">
              INDIAN PRODUCTS. GLOBAL OPPORTUNITIES.
            </span>
          </div>

          {/* Main 3-Tier Headline - Bold & Razor Sharp on Phone without any background */}
          <h1 className="text-xl sm:text-3xl lg:text-[40px] font-black sm:font-extrabold font-heading tracking-tight leading-[1.12] text-slate-950 sm:text-[#0f172a] drop-shadow-[0_2px_8px_rgba(255,255,255,1)] drop-shadow-[0_0_12px_rgba(255,255,255,0.95)]">
            <span className="hero-headline-line block">
              CONNECTING
            </span>
            <span className="hero-headline-line block text-slate-950 sm:text-[#0f172a]">
              INDIAN EXCELLENCE
            </span>
            <span className="hero-headline-line block text-[#a14304] sm:text-[#b45309] mt-0.5">
              TO THE WORLD
            </span>
          </h1>

          {/* Subtitle Description - Bold & High Contrast on Phone */}
          <p className="hero-subtitle text-xs sm:text-xs lg:text-[13px] font-bold sm:font-normal text-slate-950 sm:text-slate-800 max-w-sm sm:max-w-md leading-relaxed drop-shadow-[0_1px_4px_rgba(255,255,255,1)] drop-shadow-[0_0_8px_rgba(255,255,255,0.95)]">
            A leading research based export house delivering high quality Food Colors, Flavours, Emulsions, Fragrances, Essential Oils, Botanical Extracts and many more products to global markets.
          </p>

          {/* CTA Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3.5 pt-1">
            {/* Primary Green Button using React Router Link */}
            <Link
              to="/products"
              className="hero-cta-btn inline-flex items-center justify-center gap-1.5 rounded-lg bg-[#0a3622] hover:bg-[#0f4d30] text-white px-4.5 sm:px-5.5 py-2.5 sm:py-2.5 text-xs sm:text-sm font-bold sm:font-semibold shadow-md hover:shadow-lg transition-all duration-200 active:scale-95"
            >
              <span>Explore Our Products</span>
              <span className="text-sm">&rarr;</span>
            </Link>

            {/* Secondary Video Story Play Button - High Contrast on Phone */}
            <button
              type="button"
              onClick={() => setIsVideoModalOpen(true)}
              className="hero-cta-btn inline-flex items-center gap-2 text-slate-950 hover:text-[#b45309] font-bold sm:font-semibold text-xs sm:text-sm group cursor-pointer transition-colors drop-shadow-[0_1px_3px_rgba(255,255,255,1)]"
            >
              <span className="w-8 h-8 rounded-full border border-slate-400 group-hover:border-[#b45309] flex items-center justify-center text-slate-900 group-hover:text-[#b45309] transition-colors shadow-sm bg-white backdrop-blur-sm">
                <svg className="w-3.5 h-3.5 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
              <span>Watch Our Story</span>
              <span className="w-4 h-[1.5px] bg-slate-500 group-hover:bg-[#b45309] transition-colors" />
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

      {/* Watch Story Video Modal */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-2xl rounded-3xl bg-white p-6 shadow-2xl border border-slate-200">
            <button
              type="button"
              onClick={() => setIsVideoModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-2 rounded-full hover:bg-slate-100 transition-colors"
            >
              ✕
            </button>
            <div className="space-y-4 text-left">
              <span className="text-xs font-bold uppercase tracking-wider text-[#c2410c] bg-orange-50 px-3 py-1 rounded-full">
                Exim India Corporate Story
              </span>
              <h3 className="text-2xl font-bold font-heading text-slate-900">
                Research-Driven Indian Excellence in Global Markets
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                From standardized food color formulations to pure steam-distilled essential oils and certified botanical extracts, discover how Exim India Corporation guarantees international purity, strict regulatory compliance, and seamless export shipments to over 50 countries.
              </p>
              <div className="pt-2 flex justify-end">
                <Link
                  to="/about"
                  onClick={() => setIsVideoModalOpen(false)}
                  className="rounded-lg bg-[#0a3622] hover:bg-[#0f4d30] text-white px-5 py-2.5 text-sm font-semibold transition-all"
                >
                  Read Full Company Profile &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
