import { useState, useMemo } from 'react'
import { TITANIUM_DIOXIDE_PRODUCTS, TIO2_COMPARISON_MATRIX } from '../constants/titaniumDioxideData'
import TitaniumDioxideFilterBar from '../components/product/titanium-dioxide/TitaniumDioxideFilterBar'
import TitaniumDioxideCard from '../components/product/titanium-dioxide/TitaniumDioxideCard'

export default function TitaniumDioxide() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [showComparison, setShowComparison] = useState(false)

  // Filtered and searched product list
  const filteredProducts = useMemo(() => {
    return TITANIUM_DIOXIDE_PRODUCTS.filter((item) => {
      // 1. Grade filter
      const matchesFilter =
        activeFilter === 'all' || item.gradeFamily === activeFilter

      // 2. Keyword query search
      const q = searchQuery.toLowerCase().trim()
      const matchesQuery =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.otherNames.toLowerCase().includes(q) ||
        item.types.toLowerCase().includes(q) ||
        item.applicationSummary.toLowerCase().includes(q)

      return matchesFilter && matchesQuery
    })
  }, [activeFilter, searchQuery])

  return (
    <div className="bg-white min-h-screen text-slate-900 pt-20 sm:pt-24">
      {/* Interactive Sticky Filter & Search Toolbar */}
      <TitaniumDioxideFilterBar
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
              <TitaniumDioxideCard
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
              No matching titanium dioxide grades found
            </h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              Try adjusting your search query or selecting &quot;All Grades&quot;.
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
        {/* EXPANDABLE SECTION: TECHNICAL COMPARISON MATRIX (Rutile vs Anatase vs Pharma) */}
        {/* ============================================================== */}
        <div className="mt-14 pt-8 border-t border-slate-200">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-50 p-6 rounded-2xl border border-slate-200">
            <div>
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-800 bg-emerald-100/70 px-2.5 py-0.5 rounded-md border border-emerald-200">
                Crystal Morphology &amp; Selection Guide
              </span>
              <h3 className="text-lg sm:text-xl font-bold font-heading text-slate-900 mt-1.5">
                Rutile vs. Anatase vs. Pharma &amp; Food Grade Comparison
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                Understand refractive index, weathering durability, and regulatory monographs to choose the ideal TiO2 grade for your formulation.
              </p>
            </div>
            <button
              onClick={() => setShowComparison(!showComparison)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0a3622] hover:bg-[#15803d] text-white font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95 shrink-0 cursor-pointer"
            >
              <span>{showComparison ? 'Hide Comparison Matrix' : 'View Grade Comparison Matrix'}</span>
              <span className={`transform transition-transform ${showComparison ? 'rotate-180' : ''}`}>
                ↓
              </span>
            </button>
          </div>

          {showComparison && (
            <div className="mt-6 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm overflow-x-auto">
              <div className="mb-4">
                <h4 className="text-base font-extrabold font-heading text-slate-900">
                  Titanium Dioxide (C.I. 77891) Technical Specifications &amp; Selection Matrix
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Supplied in 25 Kg multi-wall paper bags / 500 &amp; 1000 Kg jumbo bags. ISO 9001:2015, WHO-GMP, and FSSAI certified export lots.
                </p>
              </div>

              <table className="w-full text-left border-collapse min-w-[650px]">
                <thead>
                  <tr className="border-b border-slate-200 text-[11px] uppercase tracking-wider font-extrabold text-slate-500 bg-slate-50/80">
                    <th className="py-2.5 px-3">Parameter / Property</th>
                    <th className="py-2.5 px-3">Rutile Grade (RD-01)</th>
                    <th className="py-2.5 px-3">Anatase Grade (AG-03)</th>
                    <th className="py-2.5 px-3">Pharma &amp; Food Grade (PFG-02)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
                  {TIO2_COMPARISON_MATRIX.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/60 transition-colors">
                      <td className="py-2.5 px-3 font-bold text-slate-900">{row.parameter}</td>
                      <td className="py-2.5 px-3 font-semibold text-sky-800">{row.rutile}</td>
                      <td className="py-2.5 px-3 text-slate-600">{row.anatase}</td>
                      <td className="py-2.5 px-3 font-semibold text-emerald-800">{row.pharma}</td>
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
