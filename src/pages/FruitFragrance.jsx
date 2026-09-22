import { useState, useMemo } from 'react'
import { FRUIT_FRAGRANCE_PRODUCTS, FRAGRANCE_APPLICATIONS } from '../constants/fruitFragranceData'
import FruitFragranceFilterBar from '../components/product/fruit-fragrance/FruitFragranceFilterBar'
import FruitFragranceCard from '../components/product/fruit-fragrance/FruitFragranceCard'

export default function FruitFragrance() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [showTechGuide, setShowTechGuide] = useState(false)

  // Filtered and searched product list
  const filteredProducts = useMemo(() => {
    return FRUIT_FRAGRANCE_PRODUCTS.filter((item) => {
      // 1. Category family filter
      const matchesFilter =
        activeFilter === 'all' || item.category === activeFilter

      // 2. Keyword query search
      const q = searchQuery.toLowerCase().trim()
      const matchesQuery =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.olfactoryNote.toLowerCase().includes(q) ||
        item.applicationSummary.toLowerCase().includes(q)

      return matchesFilter && matchesQuery
    })
  }, [activeFilter, searchQuery])

  return (
    <div className="bg-white min-h-screen text-slate-900 pt-20 sm:pt-24">
      {/* Interactive Sticky Filter & Search Toolbar */}
      <FruitFragranceFilterBar
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        totalResults={filteredProducts.length}
      />

      {/* Product Catalog Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12">
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <FruitFragranceCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        ) : (
          /* Empty Search State */
          <div className="py-16 text-center bg-slate-50 rounded-3xl border border-slate-200">
            <div className="text-3xl mb-2">🌸</div>
            <h3 className="text-lg font-bold text-slate-900">
              No matching fruit fragrances found
            </h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              Try adjusting your search query or selecting &quot;All Fragrances&quot;.
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
        {/* EXPANDABLE SECTION: IFRA STANDARDS & OLFACTORY APPLICATION GUIDE */}
        {/* ============================================================== */}
        <div className="mt-14 pt-8 border-t border-slate-200">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-50 p-6 rounded-2xl border border-slate-200">
            <div>
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-800 bg-emerald-100/70 px-2.5 py-0.5 rounded-md border border-emerald-200">
                Aromatic Formulations Guide
              </span>
              <h3 className="text-lg sm:text-xl font-bold font-heading text-slate-900 mt-1.5">
                IFRA Compliance, Scent Substantivity &amp; Diffusion Matrix
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                Engineering guidelines across personal care lotions, saponified soaps, laundry softeners, candles, and fine perfumery.
              </p>
            </div>
            <button
              onClick={() => setShowTechGuide(!showTechGuide)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0a3622] hover:bg-[#15803d] text-white font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95 shrink-0 cursor-pointer"
            >
              <span>{showTechGuide ? 'Hide Formulation Guide' : 'View Formulation Guide'}</span>
              <span className={`transform transition-transform ${showTechGuide ? 'rotate-180' : ''}`}>
                ↓
              </span>
            </button>
          </div>

          {showTechGuide && (
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 animate-fadeIn">
              {FRAGRANCE_APPLICATIONS.map((app) => (
                <div
                  key={app.category}
                  className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:border-emerald-600/30 transition-all"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-bold text-slate-900 font-heading">
                      {app.category}
                    </h4>
                    <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      IFRA Grade
                    </span>
                  </div>
                  <div className="space-y-2 text-xs text-slate-600">
                    <div>
                      <strong className="text-slate-800">Primary Applications: </strong>
                      {app.applications}
                    </div>
                    <div className="pt-2 border-t border-slate-100 text-emerald-900 font-medium bg-emerald-50/50 p-2 rounded-lg">
                      <strong>Olfactory Performance: </strong>
                      {app.feature}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
