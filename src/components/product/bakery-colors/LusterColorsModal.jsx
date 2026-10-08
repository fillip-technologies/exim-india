import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function LusterColorsModal({ product, onClose }) {
  const [activeTab, setActiveTab] = useState('palette') // 'palette' | 'catalogue'
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0] || null)

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  if (!product) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-900/70 backdrop-blur-sm overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-4xl w-full my-6 overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Modal Header ─────────────────────────────────────────── */}
        <div className="px-5 sm:px-7 py-4.5 bg-gradient-to-r from-amber-50/70 via-white to-amber-50/40 border-b border-slate-200/80 flex items-center justify-between gap-4 shrink-0">
          <div>
            <div className="flex items-center gap-2.5">
              <h2 className="text-xl sm:text-2xl font-black font-heading text-slate-900">
                {product.name}
              </h2>
              <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[11px] font-bold border border-amber-300">
                18 Metallic Colours
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Metallic finish for cakes, chocolates, cupcakes, cakesicles, and sugarcraft.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors cursor-pointer text-lg font-bold"
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        {/* ── View Toggle Tabs ─────────────────────────────────────── */}
        <div className="px-5 sm:px-7 pt-3 pb-2 border-b border-slate-100 flex items-center justify-between gap-3 shrink-0 bg-slate-50/50">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveTab('palette')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'palette'
                  ? 'bg-[#0a3622] text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              🎨 18 Colour Swatches
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('catalogue')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'catalogue'
                  ? 'bg-[#0a3622] text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              📄 Full Catalogue Sheet
            </button>
          </div>

          <Link
            to={`/contact?subject=Luster%20Dust%20Inquiry`}
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-[#0a3622] hover:text-[#0f4d30] hover:underline"
          >
            <span>Request Price List</span>
            <span>&rarr;</span>
          </Link>
        </div>

        {/* ── Modal Body Content (Scrollable) ──────────────────────── */}
        <div className="p-5 sm:p-7 overflow-y-auto space-y-6 flex-1">
          {activeTab === 'palette' ? (
            /* TAB 1: 18 Colors Grid */
            <div className="space-y-6">
              {/* Introduction Note from brochure */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-50/60 to-orange-50/40 border border-amber-200/70 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <p>
                  <strong className="text-amber-950 font-bold">How about a little dust of magic?</strong>{' '}
                  Exim India Luster Dust gives a fantastic metallic finish to delicacies. Available in <strong>18 standard colours</strong> and custom shades on demand. Mix with liquid Evapurex and paint with a brush or airbrush!
                </p>
              </div>

              {/* 18 Color Swatches Grid */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wider">
                    Standard Colour Range (18 Shades)
                  </h3>
                  {selectedColor && (
                    <span className="text-xs text-slate-500 font-medium">
                      Selected: <strong className="text-slate-800">{selectedColor.name}</strong>
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                  {product.colors.map((color) => {
                    const isSelected = selectedColor?.id === color.id
                    return (
                      <div
                        key={color.id}
                        onClick={() => setSelectedColor(color)}
                        className={`p-3 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-2 group ${
                          isSelected
                            ? 'border-amber-500 bg-amber-50/50 shadow-md ring-2 ring-amber-400/50'
                            : 'border-slate-200 bg-white hover:border-amber-300 hover:shadow-sm'
                        }`}
                      >
                        {/* Shimmer Swatch Circle */}
                        <div
                          className="relative w-12 h-12 rounded-full shadow-inner border border-black/10 flex items-center justify-center transition-transform group-hover:scale-110"
                          style={{
                            backgroundColor: color.hex,
                            backgroundImage: `radial-gradient(circle at 35% 35%, rgba(255,255,255,0.7) 0%, transparent 60%)`,
                          }}
                        >
                          {isSelected && (
                            <span className="text-white drop-shadow-md text-xs font-black">
                              ✓
                            </span>
                          )}
                        </div>

                        {/* Color Name */}
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-slate-800 group-hover:text-amber-950 truncate">
                            {color.name}
                          </p>
                          <p className="text-[10px] text-slate-400 truncate mt-0.5">
                            {color.tone}
                          </p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Specifications & Available Pack Sizes from image */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                {/* Pack Sizes Box */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2.5">
                    Available Pack Sizes
                  </h4>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {product.packSizes.map((pack) => (
                      <div
                        key={pack.size}
                        className="px-3 py-2 rounded-xl bg-white border border-slate-200 flex items-center justify-between"
                      >
                        <span className="font-extrabold text-slate-800">{pack.size}</span>
                        <span className="text-[11px] text-slate-500">{pack.container}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Application Guide Box */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2.5">
                    Application Guide
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed mb-2">
                    {product.usageGuide}
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {product.applications.slice(0, 4).map((app) => (
                      <span
                        key={app}
                        className="px-2 py-0.5 rounded-lg bg-white border border-slate-200 text-[10px] font-semibold text-slate-700"
                      >
                        {app}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* TAB 2: Full Brochure Image Sheet */
            <div className="space-y-4">
              <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 shadow-md">
                <img
                  src={product.image}
                  alt="Exim India Luster Dust Catalogue Sheet"
                  className="w-full h-auto object-contain mx-auto"
                />
              </div>
              <p className="text-center text-xs text-slate-500">
                Official Exim India Luster Dust Product Catalogue &amp; Shade Specification Sheet.
              </p>
            </div>
          )}
        </div>

        {/* ── Modal Footer ─────────────────────────────────────────── */}
        <div className="px-5 sm:px-7 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3 shrink-0">
          <p className="text-xs text-slate-500 hidden sm:block">
            Customised metallic colours developed upon request.
          </p>

          <div className="flex items-center justify-end gap-2.5 w-full sm:w-auto">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-white transition-colors cursor-pointer"
            >
              Close
            </button>
            <Link
              to={`/contact?subject=Luster%20Dust%20Sample%20and%20Quotation`}
              className="px-5 py-2.5 rounded-xl bg-[#0a3622] hover:bg-[#0f4d30] text-white text-xs font-bold shadow-sm transition-all flex items-center gap-1.5"
            >
              <span>Inquire &amp; Order</span>
              <span>&rarr;</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
