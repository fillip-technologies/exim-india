import { useState, useRef, useEffect, useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom'

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
import titaniumImg from '../../assets/img/to/pharma-food.jpg'
import naturalColorsImg from '../../assets/img/nfc/high-quality-annatto-nor-bixin-powder.jpg'
import pearlPigmentImg from '../../assets/img/pearl/1.png'
import edibleLustreImg from '../../assets/img/edible-lustre-dust/gold-lustre-dust.jpg'
import fluorescentImg from '../../assets/img/fc/yellow.jpg'
import fruitPowderImg from '../../assets/img/nfp/mango-powder-250x250.jpg'
import fruitFragranceImg from '../../assets/img/fruit-fragrance/strawberry-perfume.jpg'
import chemicalsImg from '../../assets/img/chemicals.png'

export default function DiverseRangeSection() {
  const navigate = useNavigate()
  const [isReversed, setIsReversed] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [isDragging, setIsDragging] = useState(false)

  // Full product list mapping every homepage card directly to its active product page
  const products = [
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
      title: 'Food Additives',
      image: foodAdditivesImg,
      link: '/products/food-additives',
    },
    {
      title: 'Titanium Dioxide',
      image: titaniumImg,
      link: '/products/titanium-dioxide',
    },
    {
      title: 'Natural Food Colors',
      image: naturalColorsImg,
      link: '/products/natural-food-colors',
    },
    {
      title: 'Pearl Pigment Powder',
      image: pearlPigmentImg,
      link: '/products/pearl-pigment-powder',
    },
    {
      title: 'Edible Lustre',
      image: edibleLustreImg,
      link: '/products/edible-lustre',
    },
    {
      title: 'Fluorescent Colours',
      image: fluorescentImg,
      link: '/products/fluorescent-colours',
    },
    {
      title: 'Natural Fruit Powder',
      image: fruitPowderImg,
      link: '/products/natural-fruit-powder',
    },
    {
      title: 'Fruit Fragrance',
      image: fruitFragranceImg,
      link: '/products/fruit-fragrance',
    },
    {
      title: 'Chemicals',
      image: chemicalsImg,
      link: '/products/chemicals',
    },
  ]

  // Triple set for seamless, mathematically invisible infinite wrapping
  const tripleProducts = [...products, ...products, ...products]

  // Animation & interaction references
  const containerRef = useRef(null)
  const trackRef = useRef(null)
  const xRef = useRef(0)
  const singleWidthRef = useRef(0)
  const isReversedRef = useRef(false)
  const isHoveredRef = useRef(false)
  const isDraggingRef = useRef(false)
  const isPointerDownRef = useRef(false)
  const pointerStartPosRef = useRef({ x: 0, y: 0 })
  const dragStartXRef = useRef(0)
  const dragStartPosRef = useRef(0)
  const hasDraggedRef = useRef(false)
  const lastTimeRef = useRef(0)
  const velocityRef = useRef(0)
  const lastPointerXRef = useRef(0)
  const lastPointerTimeRef = useRef(0)
  const touchStartYRef = useRef(0)
  const touchDirectionRef = useRef(null)

  // Keep ref sync with states
  useEffect(() => {
    isReversedRef.current = isReversed
  }, [isReversed])

  useEffect(() => {
    isHoveredRef.current = isHovered
  }, [isHovered])

  // Measure exact pixel width of one complete product batch
  const updateMetrics = useCallback(() => {
    if (!trackRef.current) return
    const totalChildren = trackRef.current.children.length
    if (totalChildren === 0) return

    const oneBatchCount = products.length
    let computedBatchWidth = 0

    // Measure children of the first batch
    for (let i = 0; i < oneBatchCount; i++) {
      const child = trackRef.current.children[i]
      if (child) {
        const style = window.getComputedStyle(child)
        const marginR = parseFloat(style.marginRight) || 0
        computedBatchWidth += child.offsetWidth + marginR
      }
    }

    if (computedBatchWidth > 0) {
      singleWidthRef.current = computedBatchWidth
    }
  }, [products.length])

  // RequestAnimationFrame high-performance physics loop
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

      // Seamless modulo wrap
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

  // Non-passive Mouse Wheel Listener: Enables smooth mouse scroll over the carousel
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleWheel = (e) => {
      const isHorizontal = Math.abs(e.deltaX) > Math.abs(e.deltaY)
      const rawDelta = isHorizontal ? e.deltaX : e.deltaY
      if (Math.abs(rawDelta) < 0.5) return

      e.preventDefault()

      const delta = Math.sign(rawDelta) * Math.min(Math.abs(rawDelta), 120)

      velocityRef.current = -delta * 8
      if (delta > 0) {
        setIsReversed(false)
      } else if (delta < 0) {
        setIsReversed(true)
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
    isPointerDownRef.current = true
    hasDraggedRef.current = false
    pointerStartPosRef.current = { x: e.clientX, y: e.clientY }
    dragStartXRef.current = e.clientX
    dragStartPosRef.current = xRef.current
    lastPointerXRef.current = e.clientX
    lastPointerTimeRef.current = performance.now()
    velocityRef.current = 0
  }

  const handleMouseMove = (e) => {
    if (!isPointerDownRef.current) return
    const diffX = e.clientX - pointerStartPosRef.current.x
    const diffY = e.clientY - pointerStartPosRef.current.y
    const dist = Math.hypot(diffX, diffY)

    // A real deliberate drag must exceed 10px
    if (dist > 10) {
      hasDraggedRef.current = true
      isDraggingRef.current = true
      setIsDragging(true)

      xRef.current = dragStartPosRef.current + (e.clientX - dragStartXRef.current)

      const now = performance.now()
      const dt = (now - lastPointerTimeRef.current) / 1000
      if (dt > 0.01) {
        const v = (e.clientX - lastPointerXRef.current) / dt
        velocityRef.current = Math.max(-1200, Math.min(1200, v))
        lastPointerXRef.current = e.clientX
        lastPointerTimeRef.current = now
      }
    }
  }

  const handleMouseUp = () => {
    isPointerDownRef.current = false
    isDraggingRef.current = false
    setIsDragging(false)
    setTimeout(() => {
      hasDraggedRef.current = false
    }, 120)
  }

  // Mobile Touch Handlers
  const handleTouchStart = (e) => {
    const touch = e.touches[0]
    pointerStartPosRef.current = { x: touch.clientX, y: touch.clientY }
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
    const dist = Math.hypot(diffX, diffY)

    if (touchDirectionRef.current === null) {
      if (Math.abs(diffY) > 8 && Math.abs(diffY) > Math.abs(diffX)) {
        touchDirectionRef.current = 'vertical'
        return
      } else if (Math.abs(diffX) > 10) {
        touchDirectionRef.current = 'horizontal'
        hasDraggedRef.current = true
      }
    }

    if (touchDirectionRef.current === 'horizontal' && dist > 10) {
      hasDraggedRef.current = true
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
    setTimeout(() => {
      hasDraggedRef.current = false
    }, 120)
  }

  // Accurate navigation handler that reliably routes to product pages on click
  const handleCardClick = (e, targetLink) => {
    if (hasDraggedRef.current) {
      e.preventDefault()
      e.stopPropagation()
      return
    }
    // Genuine click - navigate directly to corresponding page
    e.preventDefault()
    navigate(targetLink)
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
          {/* Left Side: Overline Badge & High-Impact Title */}
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

          {/* Right Side: Brief Overview & Interactive Direction Controls */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 md:max-w-md">
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed text-left">
              We export a full bouquet of high quality, research based products that are widely accepted and appreciated by our clients across the world.
            </p>

            {/* Carousel Navigation Arrow Buttons */}
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

        {/* GPU-Accelerated Scrolling Track */}
        <div
          ref={trackRef}
          className="flex gap-4 sm:gap-5 px-4 sm:px-8 w-max will-change-transform"
          style={{ transform: 'translate3d(0, 0, 0)' }}
        >
          {tripleProducts.map((item, index) => (
            <Link
              key={`${item.title}-${index}`}
              to={item.link}
              onClick={(e) => handleCardClick(e, item.link)}
              draggable={false}
              className="w-[210px] sm:w-[230px] lg:w-[245px] shrink-0 group bg-white rounded-2xl p-2.5 border border-slate-200/85 shadow-sm hover:shadow-xl hover:border-emerald-600/40 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1.5 select-none cursor-pointer"
            >
              {/* Card Image Container */}
              <div className="w-full aspect-[4/3] rounded-xl overflow-hidden bg-slate-100 mb-2.5 pointer-events-none select-none flex items-center justify-center">
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
              <div className="flex items-center justify-between px-1 py-1 pointer-events-none">
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
