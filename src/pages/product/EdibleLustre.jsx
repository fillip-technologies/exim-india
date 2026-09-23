import { useState, useMemo } from 'react'
import { EDIBLE_LUSTRE_PRODUCTS, LUSTRE_APPLICATION_TECHNIQUES } from '../../constants/edibleLustreData'
import EdibleLustreFilterBar from '../../components/product/edible-lustre/EdibleLustreFilterBar'
import EdibleLustreCard from '../../components/product/edible-lustre/EdibleLustreCard'

export default function EdibleLustre() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [showGuide, setShowGuide] = useState(false)

  // Filtered and searched product list
  const filteredProducts = useMemo(() => {
    return EDIBLE_LUSTRE_PRODUCTS.filter((item) => {
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
      <EdibleLustreFilterBar
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
              <EdibleLustreCard
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
              No matching edible lustre dusts found
            </h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              Try adjusting your search query or selecting &quot;All Lustre Dusts&quot;.
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
        {/* EXPANDABLE SECTION: CULINARY APPLICATION TECHNIQUES & GUIDE   */}
        {/* ============================================================== */}
        <div className="mt-14 pt-8 border-t border-slate-200">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-50 p-6 rounded-2xl border border-slate-200">
            <div>
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-800 bg-emerald-100/70 px-2.5 py-0.5 rounded-md border border-emerald-200">
                Application Techniques Guide
              </span>
              <h3 className="text-lg sm:text-xl font-bold font-heading text-slate-900 mt-1.5">
                Professional Confectionery, Cake Decorating &amp; Beverage Manual
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                Step-by-step methods for dry dusting, metallic paint mixing, food-grade airbrushing, and drink shimmering.
              </p>
            </div>
            <button
              onClick={() => setShowGuide(!showGuide)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0a3622] hover:bg-[#15803d] text-white font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95 shrink-0 cursor-pointer"
            >
              <span>{showGuide ? 'Hide Technique Guide' : 'View Application Guide'}</span>
              <span className={`transform transition-transform ${showGuide ? 'rotate-180' : ''}`}>
                ↓
              </span>
            </button>
          </div>

          {showGuide && (
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 animate-fadeIn">
              {LUSTRE_APPLICATION_TECHNIQUES.map((tech) => (
                <div
                  key={tech.technique}
                  className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:border-emerald-600/30 transition-all"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-bold text-slate-900 font-heading">
                      {tech.technique}
                    </h4>
                    <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      Culinary Grade
                    </span>
                  </div>
                  <div className="space-y-2 text-xs text-slate-600">
                    <div>
                      <strong className="text-slate-800">Method: </strong>
                      {tech.method}
                    </div>
                    <div>
                      <strong className="text-slate-800">Recommended For: </strong>
                      {tech.bestFor}
                    </div>
                    <div className="pt-2 border-t border-slate-100 text-emerald-900 font-medium bg-emerald-50/50 p-2 rounded-lg">
                      <strong>Pro Tip: </strong>
                      {tech.tip}
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
