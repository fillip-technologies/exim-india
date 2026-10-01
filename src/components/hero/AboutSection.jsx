import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import syntheticColoursImg from '../../assets/img/efc/synthethic.jpg'
import pharmaColoursImg from '../../assets/home/medicine-image.jpg'
import flavoursImg from '../../assets/home/bakery-image.png'
import productHeroImg from '../../assets/product-hero.png'

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
      title: 'Pharmaceutical Colours',
      subtitle: 'High-Purity Tablet & Capsule Formulations',
      image: pharmaColoursImg,
      link: '/products/pharmaceutical-colours',
    },
    {
      title: 'Flavours & Emulsions',
      subtitle: 'Liquid & Powder Bakery Formulations',
      image: flavoursImg,
      link: '/products/liquid-flavours',
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
      {/* Top Banner Container - Natural Product Hero Colors with High-Contrast Typography */}
      <div className="relative bg-[#fedc02] text-slate-900 pt-14 sm:pt-18 pb-32 sm:pb-40 lg:pb-44 overflow-hidden">
        {/* Background Image: product-hero.png with slightly decreased opacity for clear text visibility */}
        <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
          <img
            src={productHeroImg}
            alt="Exim India Product Formulations"
            className="w-full h-full object-cover object-[center_84%] opacity-50"
          />
          {/* Subtle soft white wash behind top text area to guarantee 100% effortless readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-white/10 to-transparent pointer-events-none" />
        </div>

        {/* Main Content Area */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            {/* Left Side: Overline & Bold Headline */}
            <div className="lg:col-span-5 text-left about-header-text">
              {/* Overline with Dash */}
              <div className="flex items-center gap-2.5 mb-3">
                <span className="w-8 h-[2.5px] bg-[#0a3622] rounded-full inline-block" />
                <span className="text-xs font-black tracking-[0.25em] text-[#0a3622] uppercase">
                  WHO WE ARE
                </span>
              </div>

              {/* Bold 2-3 Line Headline */}
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black font-heading tracking-tight leading-[1.2] text-slate-950 drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]">
                About EXIM India Corporation
              </h2>

              <p className="mt-2 text-xs sm:text-sm font-extrabold text-[#0a3622] tracking-wide">
                Research-Based Export House • Mumbai, India
              </p>
            </div>

            {/* Right Side: Corporate Narrative Paragraph */}
            <div className="lg:col-span-7 text-left space-y-3 about-header-text">
              <p className="text-xs sm:text-sm text-slate-950 font-bold leading-relaxed drop-shadow-[0_1px_1px_rgba(255,255,255,0.7)]">
                <strong className="text-black font-black">EXIM INDIA CORPORATION</strong> is a leading professionally managed Export House based in <strong className="text-[#0a3622] font-black underline decoration-emerald-700/50">MUMBAI</strong>, the financial capital of <strong className="text-[#c2410c] font-black underline decoration-amber-700/50">INDIA</strong>, economically the most emerging Country in the world today.
              </p>
              <p className="text-xs sm:text-sm text-slate-950 font-bold leading-relaxed drop-shadow-[0_1px_1px_rgba(255,255,255,0.7)]">
                Welcoming you to the world of food Colors, Flavours, Emulsions, Fragrances, Essential Oils, Botanical extracts and many more related products. The one &amp; only research-based export house managed by a team of highly qualified export and import professionals.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Curved Wave Divider - Transitions into Crisp White Page Surface */}
        <div className="absolute bottom-0 inset-x-0 w-full overflow-hidden leading-none pointer-events-none z-10">
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

