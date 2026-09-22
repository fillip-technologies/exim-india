import { useState, useMemo } from 'react'
import { PEARL_PIGMENT_PRODUCTS, PEARL_EFFECTS_GUIDE } from '../constants/pearlPigmentData'
import PearlPigmentFilterBar from '../components/product/pearl-pigment/PearlPigmentFilterBar'
import PearlPigmentCard from '../components/product/pearl-pigment/PearlPigmentCard'

export default function PearlPigmentPowder() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [showEffectsGuide, setShowEffectsGuide] = useState(false)

  // Filtered and searched product list
  const filteredProducts = useMemo(() => {
    return PEARL_PIGMENT_PRODUCTS.filter((item) => {
      // 1. Category family filter
      const matchesFilter =
        activeFilter === 'all' || item.category === activeFilter

      // 2. Keyword query search
      const q = searchQuery.toLowerCase().trim()
      const matchesQuery =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.ciName.toLowerCase().includes(q) ||
        item.otherNames.toLowerCase().includes(q) ||
        item.types.toLowerCase().includes(q) ||
        item.applicationSummary.toLowerCase().includes(q)

      return matchesFilter && matchesQuery
    })
  }, [activeFilter, searchQuery])

  return (
    <div className="bg-white min-h-screen text-slate-900 pt-20 sm:pt-24">
      {/* Interactive Sticky Filter & Search Toolbar */}
      <PearlPigmentFilterBar
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        totalResults={filteredProducts.length}
      />

      {/* Product Catalog Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12">
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <PearlPigmentCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        ) : (
          /* Empty Search State */
          <div className="py-16 text-center bg-slate-50 rounded-3xl border border-slate-200">
            <div className="text-3xl mb-2">✨</div>
            <h3 className="text-lg font-bold text-slate-900">
              No matching pearl pigments found
            </h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              Try adjusting your search query or selecting &quot;All Pearl Pigments&quot;.
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
        {/* EXPANDABLE SECTION: OPTICAL PEARLESCENT EFFECTS & SHADES GUIDE */}
        {/* ============================================================== */}
        <div className="mt-14 pt-8 border-t border-slate-200">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-50 p-6 rounded-2xl border border-slate-200">
            <div>
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-800 bg-emerald-100/70 px-2.5 py-0.5 rounded-md border border-emerald-200">
                Optical Interference Guide
              </span>
              <h3 className="text-lg sm:text-xl font-bold font-heading text-slate-900 mt-1.5">
                Mica Substrate &amp; Metal Oxide Coating Formulation Matrix
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                Technical formulation details across natural muscovite flakes, rutile TiO2 coating, and iron oxide optical interference.
              </p>
            </div>
            <button
              onClick={() => setShowEffectsGuide(!showEffectsGuide)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0a3622] hover:bg-[#15803d] text-white font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95 shrink-0 cursor-pointer"
            >
              <span>{showEffectsGuide ? 'Hide Formulation Guide' : 'View Optical Effects Guide'}</span>
              <span className={`transform transition-transform ${showEffectsGuide ? 'rotate-180' : ''}`}>
                ↓
              </span>
            </button>
          </div>

          {showEffectsGuide && (
            <div className="mt-6 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm overflow-x-auto">
              <div className="mb-4">
                <h4 className="text-base font-extrabold font-heading text-slate-900">
                  Pearlescent Luster Pigments Formulation Breakdown
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  100% non-toxic, heat resistant up to 800°C. Compliant with US-FDA 21 CFR § 73.350 and EU Cosmetics Regulation 1223/2009.
                </p>
              </div>

              <table className="w-full text-left border-collapse min-w-[700px]">
                <thead>
                  <tr className="border-b border-slate-200 text-[11px] uppercase tracking-wider font-extrabold text-slate-500 bg-slate-50/80">
                    <th className="py-2.5 px-3">Pearl Shade</th>
                    <th className="py-2.5 px-3">Substrate Base</th>
                    <th className="py-2.5 px-3">Metal Oxide Coating</th>
                    <th className="py-2.5 px-3">Optical Reflection Effect</th>
                    <th className="py-2.5 px-3">Key Application</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
                  {PEARL_EFFECTS_GUIDE.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/60 transition-colors">
                      <td className="py-2.5 px-3 font-bold text-slate-900">{row.shade}</td>
                      <td className="py-2.5 px-3 text-slate-600">{row.substrate}</td>
                      <td className="py-2.5 px-3 font-semibold text-emerald-800">{row.coating}</td>
                      <td className="py-2.5 px-3 font-medium text-amber-900">{row.effect}</td>
                      <td className="py-2.5 px-3 text-slate-500">{row.application}</td>
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
