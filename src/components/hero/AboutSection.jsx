import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import mapImg from '../../assets/img/map.PNG'
import syntheticColoursImg from '../../assets/img/efc/synthethic.jpg'
import emulsionFlavoursImg from '../../assets/img/ef/Mango-Emulsion.jpg'
import essentialOilsImg from '../../assets/img/essential-oil/lemon-grass-oil.jpg'
import { CONTACT_INFO } from '../../constants/navigation'

export default function AboutSection() {
  const sectionRef = useRef(null)
  const animatedRef = useRef(false)

  const cards = [
    {
      title: 'Food Colors & Lake Dyes',
      subtitle: 'Certified Synthetic & Lake Formulations',
      image: syntheticColoursImg,
      link: '/products/synthetic-food-colours',
    },
    {
      title: 'Flavours & Emulsions',
      subtitle: 'Liquid & Powder Beverage Formulations',
      image: emulsionFlavoursImg,
      link: '/products/liquid-flavours',
    },
    {
      title: 'Botanicals & Essential Oils',
      subtitle: '100% Pure Indian Steam-Distilled Extracts',
      image: essentialOilsImg,
      link: '/products/essential-oils',
    },
  ]

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !animatedRef.current) {
            animatedRef.current = true

            const ctx = gsap.context(() => {
              const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

              // Header text entrance
              tl.fromTo(
                '.about-header-text',
                { opacity: 0, y: 35 },
                { opacity: 1, y: 0, duration: 0.75, stagger: 0.15 }
              )

              // Direct phone badge spring pop
              tl.fromTo(
                '.about-phone-badge',
                { opacity: 0, scale: 0.88, y: 20 },
                { opacity: 1, scale: 1, y: 0, duration: 0.65, ease: 'back.out(1.5)' },
                '-=0.45'
              )

              // 3 Overlapping cards staggered entrance
              tl.fromTo(
                '.about-product-card',
                { opacity: 0, y: 55, scale: 0.96 },
                { opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.18, ease: 'power2.out' },
                '-=0.35'
              )
            }, sectionRef)

            return () => ctx.revert()
          }
        })
      },
      { threshold: 0.15 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="bg-white relative overflow-hidden">
      {/* Top Banner Container - Exim Brand Forest Green with Map Watermark & Wave Divider */}
      <div className="relative bg-gradient-to-br from-[#072417] via-[#0a3622] to-[#062014] text-white pt-14 sm:pt-18 pb-32 sm:pb-40 lg:pb-44 overflow-hidden">
        {/* Subtle Tech Grid Pattern */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.06] bg-repeat bg-center"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)`,
            backgroundSize: '28px 28px',
          }}
        />

        {/* Full Bleed Worldwide Export Map Watermark (100% Width & Height, Clearly Visible) */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
          <img
            src={mapImg}
            alt="Worldwide export network map"
            className="w-full h-full object-cover object-center filter invert opacity-30 sm:opacity-35 mix-blend-screen"
          />
          {/* Soft ambient tint to ensure optimal contrast and readability */}
          <div className="absolute inset-0 bg-[#072417]/30" />
        </div>

        {/* Ambient glow orbs */}
        <div className="pointer-events-none absolute -top-24 left-1/4 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl" />
        <div className="pointer-events-none absolute top-1/3 right-10 w-80 h-80 bg-amber-400/10 rounded-full blur-3xl" />

        {/* Main Content Area */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            {/* Left Side: Overline & Bold Headline */}
            <div className="lg:col-span-4 text-left about-header-text">
              {/* Overline with Dash */}
              <div className="flex items-center gap-2.5 mb-3">
                <span className="w-8 h-[2px] bg-emerald-400 rounded-full inline-block" />
                <span className="text-xs font-black tracking-[0.25em] text-emerald-300 uppercase">
                  WHO WE ARE
                </span>
              </div>

              {/* Bold 2-3 Line Headline */}
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black font-heading tracking-tight leading-[1.2] text-white">
                About EXIM India Corporation
              </h2>

              <p className="mt-2 text-xs sm:text-sm font-semibold text-emerald-200/90 tracking-wide">
                Research-Based Export House • Mumbai, India
              </p>
            </div>

            {/* Middle: Corporate Narrative Paragraph */}
            <div className="lg:col-span-5 text-left space-y-3 about-header-text">
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                <strong className="text-white font-extrabold">EXIM INDIA CORPORATION</strong> is a leading professionally managed Export House based in <strong className="text-emerald-300 font-bold">MUMBAI</strong>, the financial capital of <strong className="text-amber-300 font-bold">INDIA</strong>, economically the most emerging Country in the world today.
              </p>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Welcoming you to the world of food Colors, Flavours, Emulsions, Fragrances, Essential Oils, Botanical extracts and many more related products. The one &amp; only research-based export house managed by a team of highly qualified export and import professionals.
              </p>
            </div>

            {/* Right Side: Direct Contact / Toll-Free Phone Badge */}
            <div className="lg:col-span-3 flex lg:justify-end about-phone-badge">
              <a
                href="tel:+917977523176"
                className="group inline-flex items-center gap-3.5 bg-white/10 hover:bg-white/15 backdrop-blur-md border border-white/20 hover:border-emerald-400/50 px-4 py-3 rounded-2xl transition-all shadow-lg hover:shadow-emerald-900/30 active:scale-95"
              >
                {/* Circular Call Icon */}
                <div className="w-11 h-11 rounded-full bg-emerald-500 group-hover:bg-emerald-400 text-[#072417] flex items-center justify-center shrink-0 shadow-md transition-transform group-hover:scale-105">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.46.57 3.58a1 1 0 01-.24 1.01l-2.21 2.2z" />
                  </svg>
                </div>

                <div className="text-left">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-300">
                    EXPORT INQUIRY (24/7)
                  </div>
                  <div className="text-sm sm:text-base font-extrabold text-white group-hover:text-emerald-200 transition-colors">
                    +91 79775 23176
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Curved Wave Divider - Transitions into Crisp White Page Surface */}
        <div className="absolute bottom-0 inset-x-0 w-full overflow-hidden leading-none pointer-events-none">
          <svg
            className="relative block w-full h-14 sm:h-20 lg:h-24 text-white"
            viewBox="0 0 1440 120"
            fill="none"
            preserveAspectRatio="none"
          >
            <path
              d="M0,48 C280,105 720,15 1120,68 C1280,88 1380,95 1440,95 L1440,120 L0,120 Z"
              fill="#ffffff"
            />
          </svg>
        </div>
      </div>

      {/* 3 Overlapping Cards Section - Overlapping the Curved Wave Divider */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 -mt-20 sm:-mt-28 lg:-mt-32 pb-16 sm:pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7">
          {cards.map((card) => (
            <div
              key={card.title}
              className="about-product-card group bg-white rounded-2xl sm:rounded-3xl p-3 sm:p-3.5 border border-slate-200/90 shadow-xl shadow-slate-900/8 hover:shadow-2xl hover:border-emerald-600/40 transition-all duration-300 flex flex-col justify-between hover:-translate-y-2"
            >
              {/* Card Photo Container */}
              <div className="relative aspect-[16/10] w-full rounded-xl sm:rounded-2xl overflow-hidden bg-slate-100 mb-3 sm:mb-4">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-500"
                  loading="lazy"
                />
              </div>

              {/* Card Content & Action Button */}
              <div className="px-2 pb-2 flex items-center justify-between gap-3 text-left">
                <div className="min-w-0 flex-1">
                  <h3 className="text-base sm:text-lg font-bold font-heading text-slate-900 group-hover:text-emerald-800 transition-colors truncate">
                    {card.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5 truncate">
                    {card.subtitle}
                  </p>
                </div>

                {/* Circular Arrow Button */}
                <Link
                  to={card.link}
                  className="w-10 h-10 rounded-full bg-slate-100 group-hover:bg-[#0a3622] text-slate-700 group-hover:text-white flex items-center justify-center shrink-0 transition-all duration-300 shadow-sm active:scale-95"
                  aria-label={`Explore ${card.title}`}
                  title={`View ${card.title}`}
                >
                  <svg
                    className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

