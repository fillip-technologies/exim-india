import { useState, useMemo } from 'react'
import { NATURAL_FOOD_COLORS, NATURAL_COLOR_STABILITY_SPECS } from '../../constants/naturalFoodColorsData'
import NaturalFoodColorFilterBar from '../../components/product/natural-food-color/NaturalFoodColorFilterBar'
import NaturalFoodColorCard from '../../components/product/natural-food-color/NaturalFoodColorCard'

export default function NaturalFoodColors() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [showStabilityGuide, setShowStabilityGuide] = useState(false)

  // Filtered and searched product list
  const filteredProducts = useMemo(() => {
    return NATURAL_FOOD_COLORS.filter((item) => {
      // 1. Color family filter
      const matchesFilter =
        activeFilter === 'all' || item.colorFamily === activeFilter

      // 2. Keyword query search
      const q = searchQuery.toLowerCase().trim()
      const matchesQuery =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.ecNo.toLowerCase().includes(q) ||
        item.otherNames.toLowerCase().includes(q) ||
        item.types.toLowerCase().includes(q) ||
        item.applicationSummary.toLowerCase().includes(q)

      return matchesFilter && matchesQuery
    })
  }, [activeFilter, searchQuery])

  return (
    <div className="bg-white min-h-screen text-slate-900 pt-20 sm:pt-24">
      {/* Interactive Sticky Filter & Search Toolbar */}
      <NaturalFoodColorFilterBar
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
              <NaturalFoodColorCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        ) : (
          /* Empty Search State */
          <div className="py-16 text-center bg-slate-50 rounded-3xl border border-slate-200">
            <div className="text-3xl mb-2">🌿</div>
            <h3 className="text-lg font-bold text-slate-900">
              No matching natural food colors found
            </h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              Try adjusting your search query or selecting &quot;All Natural Colors&quot;.
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
        {/* EXPANDABLE SECTION: NATURAL COLORS STABILITY & EXTRACTION GUIDE */}
        {/* ============================================================== */}
        <div className="mt-14 pt-8 border-t border-slate-200">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-50 p-6 rounded-2xl border border-slate-200">
            <div>
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-800 bg-emerald-100/70 px-2.5 py-0.5 rounded-md border border-emerald-200">
                Clean Label Botanical Guide
              </span>
              <h3 className="text-lg sm:text-xl font-bold font-heading text-slate-900 mt-1.5">
                Natural Colorants Stability &amp; Application Matrix
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                Formulation guidance across botanical source, water/oil solubility, thermal tolerance, and active pH performance ranges.
              </p>
            </div>
            <button
              onClick={() => setShowStabilityGuide(!showStabilityGuide)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0a3622] hover:bg-[#15803d] text-white font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95 shrink-0 cursor-pointer"
            >
              <span>{showStabilityGuide ? 'Hide Stability Guide' : 'View Stability & Solubility Guide'}</span>
              <span className={`transform transition-transform ${showStabilityGuide ? 'rotate-180' : ''}`}>
                ↓
              </span>
            </button>
          </div>

          {showStabilityGuide && (
            <div className="mt-6 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm overflow-x-auto">
              <div className="mb-4">
                <h4 className="text-base font-extrabold font-heading text-slate-900">
                  Natural Plant Pigment Performance Specifications
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  100% plant-derived &amp; fermentation based. FSSAI, US-FDA 21 CFR, and EU Approved E-Number Compliant.
                </p>
              </div>

              <table className="w-full text-left border-collapse min-w-[700px]">
                <thead>
                  <tr className="border-b border-slate-200 text-[11px] uppercase tracking-wider font-extrabold text-slate-500 bg-slate-50/80">
                    <th className="py-2.5 px-3">Natural Colorant</th>
                    <th className="py-2.5 px-3">Botanical Source</th>
                    <th className="py-2.5 px-3">Solubility</th>
                    <th className="py-2.5 px-3">Effective pH Range</th>
                    <th className="py-2.5 px-3">Heat Stability</th>
                    <th className="py-2.5 px-3">Light Stability</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
                  {NATURAL_COLOR_STABILITY_SPECS.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/60 transition-colors">
                      <td className="py-2.5 px-3 font-bold text-slate-900">{row.colorant}</td>
                      <td className="py-2.5 px-3 text-slate-600 italic">{row.source}</td>
                      <td className="py-2.5 px-3 text-emerald-800 font-semibold">{row.solubility}</td>
                      <td className="py-2.5 px-3">{row.phRange}</td>
                      <td className="py-2.5 px-3">{row.heatStability}</td>
                      <td className="py-2.5 px-3 text-slate-500">{row.lightStability}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
