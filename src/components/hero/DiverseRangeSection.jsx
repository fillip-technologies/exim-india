import { useState, useRef, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'

// High-resolution images from src/assets/img/ matching user's requested product list
import syntheticColoursImg from '../../assets/img/efc/synthethic.jpg'
import lakeColoursImg from '../../assets/img/lake/lake-allura-red.jpg'
import blendedColoursImg from '../../assets/img/efc/Allura-Red-colour.jpg'
import cosmeticColoursImg from '../../assets/img/cosmetic-color/purple3.jpg'
import pharmaColoursImg from '../../assets/img/to/pharma-food.jpg'
import liquidFlavoursImg from '../../assets/img/lf/Orange-liquid-and-powder-food-grade-flavour.jpg'
import emulsionFlavoursImg from '../../assets/img/ef/Mango-Emulsion.jpg'
import powderFlavoursImg from '../../assets/img/pf/fruit-powder.jpg'
import discoDustImg from '../../assets/img/dust-color/Gold-Disco-Dust.jpg'
import foodAdditivesImg from '../../assets/img/fa/soya-lecithin-powder.jpeg'
import essentialOilsImg from '../../assets/img/essential-oil/lemon-grass-oil.jpg'
import botanicalExtractsImg from '../../assets/img/nfp/grapes-extract-powder.jpg'

export default function DiverseRangeSection() {
  const [isReversed, setIsReversed] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [isDragging, setIsDragging] = useState(false)

  // Full product list including user's specific 10 products + foundational essentials
  const products = [
    {
      title: 'Synthetic Food Colours',
      image: syntheticColoursImg,
      link: '/products/synthetic-food-colours',
    },
    {
      title: 'Lake Colours',
      image: lakeColoursImg,
      link: '/products/lake-colours',
    },
    {
      title: 'Blended Colours',
      image: blendedColoursImg,
      link: '/products/blended-colours',
    },
    {
      title: 'Cosmetic Colours',
      image: cosmeticColoursImg,
      link: '/products/cosmetic-colours',
    },
    {
      title: 'Pharmaceutical Colours',
      image: pharmaColoursImg,
      link: '/products/pharmaceutical-colours',
    },
    {
      title: 'Liquid Flavours',
      image: liquidFlavoursImg,
      link: '/products/liquid-flavours',
    },
    {
      title: 'Emulsion Flavours',
      image: emulsionFlavoursImg,
      link: '/products/emulsion-flavours',
    },
    {
      title: 'Powder Flavours',
      image: powderFlavoursImg,
      link: '/products/powder-flavours',
    },
    {
      title: 'Disco Dust Powder',
      image: discoDustImg,
      link: '/products/disco-dust-powder',
    },
    {
      title: 'Food Additives',
      image: foodAdditivesImg,
      link: '/products/food-additives',
    },
    {
      title: '100% Essential Oils',
      image: essentialOilsImg,
      link: '/products/essential-oils',
    },
    {
      title: 'Botanical Extracts',
      image: botanicalExtractsImg,
      link: '/products/botanical-extracts',
    },
  ]

  // Triple set for 100% seamless, mathematically invisible infinite wrapping
  const tripleProducts = [...products, ...products, ...products]

  // Animation & interaction references
  const containerRef = useRef(null)
  const trackRef = useRef(null)
  const xRef = useRef(0)
  const singleWidthRef = useRef(0)
  const isReversedRef = useRef(false)
  const isHoveredRef = useRef(false)
  const isDraggingRef = useRef(false)
  const dragStartXRef = useRef(0)
  const dragStartPosRef = useRef(0)
  const hasDraggedRef = useRef(false)
  const velocityRef = useRef(0)
  const lastTimeRef = useRef(0)
  const lastPointerXRef = useRef(0)
  const lastPointerTimeRef = useRef(0)
  const touchDirectionRef = useRef(null)
  const touchStartYRef = useRef(0)

  // Keep refs in sync with state
  useEffect(() => {
    isReversedRef.current = isReversed
  }, [isReversed])

  useEffect(() => {
    isHoveredRef.current = isHovered
  }, [isHovered])

  // Measure the exact single loop width between item 0 and item 12
  const updateMetrics = useCallback(() => {
    if (trackRef.current && trackRef.current.children.length >= 24) {
      const firstCard = trackRef.current.children[0]
      const duplicateFirstCard = trackRef.current.children[products.length]
      if (firstCard && duplicateFirstCard) {
        const measured = duplicateFirstCard.offsetLeft - firstCard.offsetLeft
        if (measured > 0) {
          singleWidthRef.current = measured
        }
      }
    }
  }, [products.length])

  // RequestAnimationFrame high-performance physics loop (60/120fps hardware accelerated)
  useEffect(() => {
    updateMetrics()
    window.addEventListener('resize', updateMetrics)

    let rafId
    const autoSpeed = 44 // Smooth base velocity in px/sec

    const tick = (now) => {
      if (!lastTimeRef.current) {
        lastTimeRef.current = now
      }
      const dt = Math.min((now - lastTimeRef.current) / 1000, 0.1)
      lastTimeRef.current = now

      const W = singleWidthRef.current

      // Apply wheel / drag momentum physics with decay
      if (Math.abs(velocityRef.current) > 5) {
        xRef.current += velocityRef.current * dt
        // Smooth exponential friction decay
        velocityRef.current *= Math.pow(0.88, dt * 60)
      } else {
        velocityRef.current = 0
        // Auto-glide when not actively hovered or dragged
        if (!isHoveredRef.current && !isDraggingRef.current) {
          const dir = isReversedRef.current ? 1 : -1
          xRef.current += dir * autoSpeed * dt
        }
      }

      // Seamless mathematical modulo wrap (zero visual glitch)
      if (W > 0) {
        while (xRef.current <= -W) xRef.current += W
        while (xRef.current > 0) xRef.current -= W
      }

      // Hardware accelerated transform
      if (trackRef.current) {
        trackRef.current.style.transform = `translate3d(${xRef.current}px, 0, 0)`
      }

      rafId = requestAnimationFrame(tick)
    }

    rafId = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', updateMetrics)
    }
  }, [updateMetrics])

  // Non-passive Mouse Wheel Listener: Enables silky smooth mouse scroll over the carousel
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleWheel = (e) => {
      // Support vertical wheel and horizontal trackpad gestures
      const isHorizontal = Math.abs(e.deltaX) > Math.abs(e.deltaY)
      const rawDelta = isHorizontal ? e.deltaX : e.deltaY
      if (Math.abs(rawDelta) < 0.5) return

      // Prevent page vertical jumping while mouse wheeling over the product carousel
      e.preventDefault()

      // Normalize delta across browsers/mice
      const delta = Math.sign(rawDelta) * Math.min(Math.abs(rawDelta), 120)

      // Direct response + momentum glide
      xRef.current -= delta * 1.15
      velocityRef.current = -delta * 4.8

      // Instant seamless wrap check
      const W = singleWidthRef.current
      if (W > 0) {
        while (xRef.current <= -W) xRef.current += W
        while (xRef.current > 0) xRef.current -= W
      }

      if (trackRef.current) {
        trackRef.current.style.transform = `translate3d(${xRef.current}px, 0, 0)`
      }
    }

    container.addEventListener('wheel', handleWheel, { passive: false })
    return () => {
      container.removeEventListener('wheel', handleWheel)
    }
  }, [])

  // Desktop Mouse Drag Handlers
  const handleMouseDown = (e) => {
    if (e.button !== 0) return // Only primary click
    isDraggingRef.current = true
    setIsDragging(true)
    dragStartXRef.current = e.clientX
    dragStartPosRef.current = xRef.current
    lastPointerXRef.current = e.clientX
    lastPointerTimeRef.current = performance.now()
    hasDraggedRef.current = false
  }

  const handleMouseMove = (e) => {
    if (!isDraggingRef.current) return
    const diff = e.clientX - dragStartXRef.current
    if (Math.abs(diff) > 5) {
      hasDraggedRef.current = true
    }

    xRef.current = dragStartPosRef.current + diff

    // Calculate pointer release velocity
    const now = performance.now()
    const dt = (now - lastPointerTimeRef.current) / 1000
    if (dt > 0.01) {
      const v = (e.clientX - lastPointerXRef.current) / dt
      velocityRef.current = Math.max(-1200, Math.min(1200, v))
      lastPointerXRef.current = e.clientX
      lastPointerTimeRef.current = now
    }
  }

  const handleMouseUp = () => {
    if (isDraggingRef.current) {
      isDraggingRef.current = false
      setIsDragging(false)
    }
  }

  // Mobile Touch Handlers (Preserves native vertical page scrolling without hitching)
  const handleTouchStart = (e) => {
    const touch = e.touches[0]
    dragStartXRef.current = touch.clientX
    touchStartYRef.current = touch.clientY
    dragStartPosRef.current = xRef.current
    lastPointerXRef.current = touch.clientX
    lastPointerTimeRef.current = performance.now()
    touchDirectionRef.current = null
    hasDraggedRef.current = false
    velocityRef.current = 0
  }

  const handleTouchMove = (e) => {
    const touch = e.touches[0]
    const diffX = touch.clientX - dragStartXRef.current
    const diffY = touch.clientY - touchStartYRef.current

    // Determine gesture direction on initial movement
    if (touchDirectionRef.current === null) {
      if (Math.abs(diffY) > 8 && Math.abs(diffY) > Math.abs(diffX)) {
        touchDirectionRef.current = 'vertical' // Allow normal smooth phone page scrolling
        return
      } else if (Math.abs(diffX) > 8) {
        touchDirectionRef.current = 'horizontal'
        hasDraggedRef.current = true
      }
    }

    // If user is intentionally sliding the carousel horizontally
    if (touchDirectionRef.current === 'horizontal') {
      xRef.current = dragStartPosRef.current + diffX

      const now = performance.now()
      const dt = (now - lastPointerTimeRef.current) / 1000
      if (dt > 0.01) {
        const v = (touch.clientX - lastPointerXRef.current) / dt
        velocityRef.current = Math.max(-1000, Math.min(1000, v))
        lastPointerXRef.current = touch.clientX
        lastPointerTimeRef.current = now
      }
    }
  }

  const handleTouchEnd = () => {
    touchDirectionRef.current = null
  }

  // Prevent unwanted link navigation when dragging
  const handleCardClick = (e) => {
    if (hasDraggedRef.current) {
      e.preventDefault()
    }
  }

  // Arrow button handlers with smooth directional momentum pulse
  const handleScrollLeft = () => {
    setIsReversed(true)
    velocityRef.current = 620
  }

  const handleScrollRight = () => {
    setIsReversed(false)
    velocityRef.current = -620
  }

  return (
    <section className="pt-6 sm:pt-9 pb-12 sm:pb-16 bg-white border-t border-slate-100 overflow-hidden w-full select-none">
      {/* Header Container - Contained within max-w-7xl for clean alignment */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 sm:mb-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 sm:gap-6">
          {/* Left Side: Overline Badge & Strict 2-Line High-Impact Title */}
          <div className="max-w-2xl text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50/90 border border-emerald-200/80 mb-2.5 shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse shrink-0" />
              <span className="text-[11px] sm:text-xs font-black tracking-[0.2em] text-[#0a3622] uppercase">
                PRODUCTS
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black sm:font-extrabold font-heading tracking-tight leading-[1.18] text-slate-900">
              <span className="block">
                A Diverse Range of Certified Ingredients
              </span>
              <span className="block bg-gradient-to-r from-emerald-800 via-[#0a3622] to-amber-700 bg-clip-text text-transparent">
                &amp; Formulations for Global Markets
              </span>
            </h2>
          </div>

          {/* Right Side: Description & Direction Controls */}
          <div className="max-w-md lg:max-w-lg text-left flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed flex-1">
              We export a full bouquet of high quality, research based products that are widely accepted and appreciated by our clients across the world.
            </p>

            {/* Direction & Navigation Controls */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={handleScrollLeft}
                className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all shadow-sm active:scale-95 cursor-pointer ${
                  isReversed
                    ? 'border-emerald-700 bg-emerald-50 text-emerald-800 ring-2 ring-emerald-600/20'
                    : 'border-slate-300 hover:border-emerald-700 bg-white hover:bg-emerald-50 text-slate-700 hover:text-emerald-800'
                }`}
                aria-label="Scroll products left-to-right"
                title="Scroll Left"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                type="button"
                onClick={handleScrollRight}
                className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all shadow-sm active:scale-95 cursor-pointer ${
                  !isReversed
                    ? 'border-emerald-700 bg-emerald-50 text-emerald-800 ring-2 ring-emerald-600/20'
                    : 'border-slate-300 hover:border-emerald-700 bg-white hover:bg-emerald-50 text-slate-700 hover:text-emerald-800'
                }`}
                aria-label="Scroll products right-to-left"
                title="Scroll Right"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* FULL SCREEN WIDTH Interactive Carousel Container with Mouse Wheel & Drag Support */}
      <div
        ref={containerRef}
        className={`relative w-full overflow-hidden py-2 ${
          isDragging ? 'cursor-grabbing' : 'cursor-grab'
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false)
          handleMouseUp()
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Soft edge gradient fades for elegant overflow effect */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-6 sm:w-16 bg-gradient-to-r from-white via-white/80 to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-6 sm:w-16 bg-gradient-to-l from-white via-white/80 to-transparent z-10" />

        {/* GPU-Accelerated Scrolling Track (translate3d for 60/120fps smoothness) */}
        <div
          ref={trackRef}
          className="flex gap-4 sm:gap-5 px-4 sm:px-8 w-max will-change-transform"
          style={{ transform: 'translate3d(0, 0, 0)' }}
        >
          {tripleProducts.map((item, index) => (
            <Link
              key={`${item.title}-${index}`}
              to={item.link}
              onClick={handleCardClick}
              draggable={false}
              className="w-[210px] sm:w-[230px] lg:w-[245px] shrink-0 group bg-white rounded-2xl p-2.5 border border-slate-200/85 shadow-sm hover:shadow-xl hover:border-emerald-600/40 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1.5 select-none"
            >
              {/* Card Image Container */}
              <div className="w-full aspect-[4/3] rounded-xl overflow-hidden bg-slate-100 mb-2.5 pointer-events-none select-none">
                <img
                  src={item.image}
                  alt={item.title}
                  draggable={false}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 select-none"
                  loading="lazy"
                  onLoad={updateMetrics}
                />
              </div>

              {/* Bottom Row with Title & Arrow */}
              <div className="flex items-center justify-between px-1 py-1">
                <span className="text-xs sm:text-[13px] font-bold font-heading text-slate-900 group-hover:text-emerald-800 transition-colors truncate">
                  {item.title}
                </span>
                <span className="text-emerald-700 font-bold text-sm sm:text-base group-hover:translate-x-1 transition-transform ml-1 shrink-0">
                  &rarr;
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

