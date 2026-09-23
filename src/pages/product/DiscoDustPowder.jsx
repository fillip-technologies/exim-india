import { useState, useMemo } from 'react'
import { DISCO_DUST_POWDERS, DISCO_DUST_VARIETY_SHADES } from '../../constants/discoDustData'
import DiscoDustFilterBar from '../../components/product/disco-dust/DiscoDustFilterBar'
import DiscoDustCard from '../../components/product/disco-dust/DiscoDustCard'

export default function DiscoDustPowder() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [showVarietyTable, setShowVarietyTable] = useState(false)

  // Filtered and searched product list
  const filteredProducts = useMemo(() => {
    return DISCO_DUST_POWDERS.filter((item) => {
      // 1. Category family filter
      let matchesFilter = true
      if (activeFilter === 'metallic') {
        matchesFilter = item.colorFamily === 'gold' || item.colorFamily === 'silver'
      } else if (activeFilter === 'warm') {
        matchesFilter = ['red', 'pink', 'orange', 'yellow'].includes(item.colorFamily)
      } else if (activeFilter === 'cool') {
        matchesFilter = ['blue', 'green', 'violet'].includes(item.colorFamily)
      } else if (activeFilter === 'pearl') {
        matchesFilter = item.colorFamily === 'ivory'
      }

      // 2. Keyword query search
      const q = searchQuery.toLowerCase().trim()
      const matchesQuery =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.otherNames.toLowerCase().includes(q) ||
        item.colorDesc.toLowerCase().includes(q) ||
        item.applicationSummary.toLowerCase().includes(q)

      return matchesFilter && matchesQuery
    })
  }, [activeFilter, searchQuery])

  return (
    <div className="bg-white min-h-screen text-slate-900 pt-20 sm:pt-24">
      {/* Interactive Sticky Filter & Search Toolbar */}
      <DiscoDustFilterBar
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        totalResults={filteredProducts.length}
      />

      {/* Product Catalog Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12">
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6">
            {filteredProducts.map((product) => (
              <DiscoDustCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        ) : (
          /* Empty Search State */
          <div className="py-16 text-center bg-slate-50 rounded-3xl border border-slate-200">
            <div className="text-3xl mb-2">🔍</div>
            <h3 className="text-lg font-bold text-slate-900">
              No matching disco dust powders found
            </h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              Try adjusting your search query or selecting &quot;All Disco Dusts&quot;.
            </p>
            <button
              onClick={() => {
                setActiveFilter('all')
                setSearchQuery('')
              }}
              className="mt-4 text-xs font-bold text-emerald-800 hover:text-emerald-950 underline cursor-pointer"
            >
              Reset filters
            </button>
          </div>
        )}

        {/* ============================================================== */}
        {/* EXPANDABLE SECTION: FOR MORE COLORS & CUSTOM SHADES (50+ Codes) */}
        {/* ============================================================== */}
        <div className="mt-14 pt-8 border-t border-slate-200">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-50 p-6 rounded-2xl border border-slate-200">
            <div>
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-800 bg-emerald-100/70 px-2.5 py-0.5 rounded-md border border-emerald-200">
                Custom Shade Matching
              </span>
              <h3 className="text-lg sm:text-xl font-bold font-heading text-slate-900 mt-1.5">
                Looking for Specialty Shade Codes &amp; Metallic Formulations?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                We manufacture over 50+ custom metallic, pearlescent, and multi-color sparkle dust shades for bulk export.
              </p>
            </div>
            <button
              onClick={() => setShowVarietyTable(!showVarietyTable)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0a3622] hover:bg-[#15803d] text-white font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95 shrink-0 cursor-pointer"
            >
              <span>{showVarietyTable ? 'Hide Variety Of Colors' : 'For More Colors (50+ Shades)'}</span>
              <span className={`transform transition-transform ${showVarietyTable ? 'rotate-180' : ''}`}>
                ↓
              </span>
            </button>
          </div>

          {showVarietyTable && (
            <div className="mt-6 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <div className="mb-4">
                <h4 className="text-base font-extrabold font-heading text-slate-900">
                  Variety of Colors — Master Shade Index
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Available in 10/25/50 Kg export packs. Custom color blending and particle size calibration available on demand.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {DISCO_DUST_VARIETY_SHADES.map((shade, idx) => (
                  <div
                    key={`${shade.code}-${idx}`}
                    className="p-3 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-emerald-50/40 hover:border-emerald-300 transition-all flex items-center gap-2.5"
                  >
                    <span
                      className="w-4 h-4 rounded-full border border-slate-300 shadow-2xs shrink-0"
                      style={{ backgroundColor: shade.colorHex }}
                    />
                    <div className="overflow-hidden">
                      <div className="text-xs font-bold text-slate-900 truncate">
                        {shade.code}
                      </div>
                      <div className="text-[11px] text-slate-500 truncate">
                        {shade.name}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
