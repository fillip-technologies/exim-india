import { useState } from 'react'

// High-resolution images added by user in src/assets/home/
import colorProductImg from '../../assets/home/color-product.jpg'
import cosmeticProductImg from '../../assets/home/coesmtic-product.jpg'
import makeupProductImg from '../../assets/home/makeup-product.jpg'
import medicineImg2 from '../../assets/home/medicine-image-2.jpg'
import medicineImg1 from '../../assets/home/medicine-image-1.jpg'
import medicineImg from '../../assets/home/medicine-image.jpg'
import oilProductImg from '../../assets/home/oil-product.jpg'
import pearlsProductImg from '../../assets/home/edible-pearls-non-pareils-dragees-sugar-ball-silver.jpg'
import sugarCraftsImg from '../../assets/home/sugar-crafts-vermacili.jpg'
import multipleDecorationsImg from '../../assets/home/multiple-decorations.jpg'
import backgroundGalleryImg from '../../assets/home/background-gallery.jpg'

export default function ProductAccordionSection() {
  const [activeId, setActiveId] = useState(1)
  const [previewImage, setPreviewImage] = useState(null)
  const [selectedSubImg, setSelectedSubImg] = useState({})

  const accordionCards = [
    {
      id: 1,
      number: '01',
      verticalTitle: 'FOOD COLOURS',
      primaryImage: colorProductImg,
      altImages: [
        { label: 'Colours', src: colorProductImg },
      ],
      gradient: 'from-[#0284c7] via-[#0369a1] to-[#072d4a]',
      accentColor: '#38bdf8',
    },
    {
      id: 2,
      number: '02',
      verticalTitle: 'COSMETIC PIGMENTS',
      primaryImage: cosmeticProductImg,
      altImages: [
        { label: 'Cosmetic', src: cosmeticProductImg },
        { label: 'Makeup', src: makeupProductImg },
      ],
      gradient: 'from-[#8b5cf6] via-[#6d28d9] to-[#2e1065]',
      accentColor: '#c084fc',
    },
    {
      id: 3,
      number: '03',
      verticalTitle: 'PHARMACEUTICAL COLOURS',
      primaryImage: medicineImg2,
      altImages: [
        { label: 'Capsules', src: medicineImg2 },
        { label: 'Tablets', src: medicineImg1 },
        { label: 'Medicine', src: medicineImg },
      ],
      gradient: 'from-[#ea580c] via-[#c2410c] to-[#431407]',
      accentColor: '#fb923c',
    },
    {
      id: 4,
      number: '04',
      verticalTitle: 'ESSENTIAL OILS',
      primaryImage: oilProductImg,
      altImages: [
        { label: 'Botanical Oils', src: oilProductImg },
      ],
      gradient: 'from-[#059669] via-[#047857] to-[#022c22]',
      accentColor: '#34d399',
    },
    {
      id: 5,
      number: '05',
      verticalTitle: 'EDIBLE PEARLS & CRAFTS',
      primaryImage: pearlsProductImg,
      altImages: [
        { label: 'Silver Dragees', src: pearlsProductImg },
        { label: 'Vermicelli', src: sugarCraftsImg },
        { label: 'Decorations', src: multipleDecorationsImg },
      ],
      gradient: 'from-[#d97706] via-[#b45309] to-[#451a03]',
      accentColor: '#fbbf24',
    },
  ]

  return (
    <section className="relative py-10 sm:py-14 lg:py-16 bg-white overflow-hidden select-none border-b border-slate-200">
      {/* Background Gallery Image Added by User */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        <img
          src={backgroundGalleryImg}
          alt=""
          className="w-full h-full object-cover object-center"
        />
        {/* Soft subtle tint overlay for harmonious blending */}
        <div className="absolute inset-0 bg-white/10 backdrop-blur-[0.5px]" />
      </div>

      {/* Precision Tech Grid Pattern Background (100% Light Theme) */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.25]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #cbd5e1 1px, transparent 1px),
            linear-gradient(to bottom, #cbd5e1 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Ambient background soft light accents */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-blue-100/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-amber-100/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* ========================================================================= */}
        {/* DESKTOP / TABLET: ACCORDION SHOWCASE (MATCHING USER'S ATTACHED SCREENSHOT) */}
        {/* ========================================================================= */}
        <div className="hidden md:flex gap-3.5 lg:gap-4.5 h-[520px] lg:h-[560px] w-full items-stretch">
          {accordionCards.map((card) => {
            const isActive = activeId === card.id
            const currentImg = selectedSubImg[card.id] || card.primaryImage

            return (
              <div
                key={card.id}
                onClick={() => setActiveId(card.id)}
                className={`relative rounded-[28px] lg:rounded-[32px] overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] shadow-xl ${
                  isActive
                    ? 'flex-[3.5] lg:flex-[4] shadow-2xl cursor-default ring-1 ring-black/10'
                    : 'flex-[0.8] lg:flex-[0.75] cursor-pointer hover:brightness-105 hover:shadow-2xl'
                } bg-gradient-to-b ${card.gradient}`}
              >
                {/* Ambient Card Glow */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-40 mix-blend-overlay"
                  style={{
                    backgroundImage: `radial-gradient(circle at 50% 20%, ${card.accentColor} 0%, transparent 70%)`,
                  }}
                />

                {/* ----------------- ACTIVE / EXPANDED STATE (IMAGE ONLY) ----------------- */}
                {isActive ? (
                  <div className="relative h-full flex flex-col p-5 sm:p-6 lg:p-7 text-white z-10 animate-fadeIn">
                    {/* Top Bar: 01 badge + expand button */}
                    <div className="flex items-center justify-between gap-4 mb-4 flex-shrink-0">
                      <div className="w-11 h-11 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center font-heading font-black text-sm text-white shadow-inner">
                        {card.number}
                      </div>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation()
                          setPreviewImage(currentImg)
                        }}
                        title="Enlarge High-Resolution Image"
                        className="w-11 h-11 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white hover:bg-white/35 active:scale-95 transition-all shadow-sm group"
                      >
                        <svg
                          className="w-4 h-4 transform group-hover:scale-115 transition-transform"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          strokeWidth={2.4}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
                          />
                        </svg>
                      </button>
                    </div>

                    {/* Middle: Clean Image Display Directly on Card (No White BG or Border) */}
                    <div className="flex-1 w-full relative rounded-2xl overflow-hidden flex flex-col">
                      <div
                        onClick={() => setPreviewImage(currentImg)}
                        className="relative w-full flex-1 rounded-2xl overflow-hidden shadow-2xl cursor-pointer group"
                      >
                        <img
                          src={currentImg}
                          alt="Product showcase"
                          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                        />
                      </div>

                      {/* Subtle alternative image selector chips (if category has multiple assets) */}
                      {card.altImages.length > 1 && (
                        <div className="flex items-center justify-center gap-2 pt-3 flex-shrink-0">
                          {card.altImages.map((alt, idx) => (
                            <button
                              key={idx}
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation()
                                setSelectedSubImg((prev) => ({ ...prev, [card.id]: alt.src }))
                              }}
                              className={`text-[11px] font-bold px-3 py-1 rounded-full transition-all border ${
                                currentImg === alt.src
                                  ? 'bg-white text-slate-900 border-white shadow-md'
                                  : 'bg-black/35 text-white/90 border-white/20 hover:bg-black/55 backdrop-blur-md'
                              }`}
                            >
                              {alt.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  /* ----------------- COLLAPSED STATE (MATCHING MOCKUP) ----------------- */
                  <div className="relative h-full flex flex-col justify-between items-center py-7 px-2 z-10">
                    {/* Top: Circular badge with number */}
                    <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/25 flex items-center justify-center font-heading font-black text-xs text-white shadow-sm">
                      {card.number}
                    </div>

                    {/* Middle: Rotated Vertical Text */}
                    <div className="flex-1 flex items-center justify-center w-full my-6 overflow-hidden">
                      <span
                        className="transform -rotate-90 select-none whitespace-nowrap tracking-[0.25em] font-heading font-extrabold text-sm lg:text-base text-white/95 uppercase drop-shadow-sm pointer-events-none"
                      >
                        {card.verticalTitle}
                      </span>
                    </div>

                    {/* Bottom: Circular Arrow Button */}
                    <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/25 flex items-center justify-center text-white/90 group-hover:bg-white/35 group-hover:scale-110 transition-all shadow-sm">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        strokeWidth={2.6}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* ========================================================================= */}
        {/* MOBILE RESPONSIVE ACCORDION VIEW (< 768px) */}
        {/* ========================================================================= */}
        <div className="flex md:hidden flex-col gap-3">
          {accordionCards.map((card) => {
            const isActive = activeId === card.id
            const currentImg = selectedSubImg[card.id] || card.primaryImage

            return (
              <div
                key={card.id}
                onClick={() => setActiveId(card.id)}
                className={`rounded-2xl overflow-hidden transition-all duration-500 bg-gradient-to-r ${card.gradient} shadow-lg text-white`}
              >
                {/* Header bar of mobile card */}
                <div className="p-3.5 flex items-center justify-between cursor-pointer">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center font-heading font-black text-xs text-white">
                      {card.number}
                    </span>
                    <span className="font-heading font-bold text-sm tracking-wide text-white">
                      {card.verticalTitle}
                    </span>
                  </div>

                  <div
                    className={`w-7 h-7 rounded-full bg-white/20 border border-white/30 flex items-center justify-center transition-transform duration-300 ${
                      isActive ? 'rotate-90' : ''
                    }`}
                  >
                    <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.4}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                  </div>
                </div>

                {/* Expanded mobile content (No White BG or Border) */}
                {isActive && (
                  <div className="px-3 pb-3 pt-1 animate-fadeIn border-t border-white/15">
                    <div
                      onClick={() => setPreviewImage(currentImg)}
                      className="w-full h-64 rounded-xl overflow-hidden shadow-lg cursor-pointer relative"
                    >
                      <img
                        src={currentImg}
                        alt="Product showcase"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {card.altImages.length > 1 && (
                      <div className="flex items-center justify-center gap-1.5 mt-2.5 overflow-x-auto">
                        {card.altImages.map((alt, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation()
                              setSelectedSubImg((prev) => ({ ...prev, [card.id]: alt.src }))
                            }}
                            className={`text-[10px] font-bold px-2.5 py-1 rounded-full transition-all whitespace-nowrap border ${
                              currentImg === alt.src
                                ? 'bg-white text-slate-900 border-white shadow-sm'
                                : 'bg-black/35 text-white border-white/20 backdrop-blur-md'
                            }`}
                          >
                            {alt.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* FULLSCREEN IMAGE MODAL PREVIEW */}
      {/* ========================================================================= */}
      {previewImage && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setPreviewImage(null)}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fadeIn"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl border border-slate-200"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-200 bg-slate-50">
              <span className="text-xs font-black tracking-wider text-slate-800 uppercase font-heading">
                Product Image Preview
              </span>
              <button
                type="button"
                onClick={() => setPreviewImage(null)}
                className="w-8 h-8 rounded-full bg-slate-200 hover:bg-slate-300 flex items-center justify-center text-slate-700 transition-colors font-bold text-sm"
              >
                ✕
              </button>
            </div>

            {/* Modal Image */}
            <div className="p-4 sm:p-6 flex items-center justify-center bg-slate-100/50 max-h-[75vh] overflow-hidden">
              <img
                src={previewImage}
                alt="Product preview"
                className="max-h-[68vh] w-auto object-contain rounded-xl shadow-lg border border-slate-200"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
