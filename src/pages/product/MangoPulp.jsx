import { useState, useMemo } from 'react'
import { MANGO_PULPS, MANGO_PULP_STANDARDS } from '../../constants/mangoPulpData'
import MangoPulpFilterBar from '../../components/product/mango-pulp/MangoPulpFilterBar'
import MangoPulpCard from '../../components/product/mango-pulp/MangoPulpCard'

export default function MangoPulp() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [showStandards, setShowStandards] = useState(false)

  // Filtered and searched product list
  const filteredProducts = useMemo(() => {
    return MANGO_PULPS.filter((item) => {
      // 1. Variety filter
      const matchesFilter =
        activeFilter === 'all' || item.variety === activeFilter

      // 2. Keyword query search
      const q = searchQuery.toLowerCase().trim()
      const matchesQuery =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.otherNames.toLowerCase().includes(q) ||
        item.applicationSummary.toLowerCase().includes(q)

      return matchesFilter && matchesQuery
    })
  }, [activeFilter, searchQuery])

  return (
    <div className="bg-white min-h-screen text-slate-900 pt-20 sm:pt-24">
      {/* Interactive Sticky Filter & Search Toolbar */}
      <MangoPulpFilterBar
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
              <MangoPulpCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        ) : (
          /* Empty Search State */
          <div className="py-16 text-center bg-slate-50 rounded-3xl border border-slate-200">
            <div className="text-3xl mb-2">🥭</div>
            <h3 className="text-lg font-bold text-slate-900">
              No matching mango pulps found
            </h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              Try adjusting your search query or selecting &quot;All Mango Pulps&quot;.
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
        {/* EXPANDABLE SECTION: EXPORT QUALITY & PROCESSING STANDARDS    */}
        {/* ============================================================== */}
        <div className="mt-14 pt-8 border-t border-slate-200">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-50 p-6 rounded-2xl border border-slate-200">
            <div>
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-amber-800 bg-amber-100/70 px-2.5 py-0.5 rounded-md border border-amber-200">
                100% Pure Indian Mango Heritage
              </span>
              <h3 className="text-lg sm:text-xl font-bold font-heading text-slate-900 mt-1.5">
                Aseptic Processing &amp; Global Export Standards
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                Manufactured from hand-picked ripe fruits in Maharashtra, Gujarat, and South India. Zero artificial additives.
              </p>
            </div>
            <button
              onClick={() => setShowStandards(!showStandards)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0a3622] hover:bg-[#15803d] text-white font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95 shrink-0 cursor-pointer"
            >
              <span>{showStandards ? 'Hide Processing Standards' : 'View Quality & Packaging Matrix'}</span>
              <span className={`transform transition-transform ${showStandards ? 'rotate-180' : ''}`}>
                ↓
              </span>
            </button>
          </div>

          {showStandards && (
            <div className="mt-6 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm overflow-x-auto">
              <div className="mb-4">
                <h4 className="text-base font-extrabold font-heading text-slate-900">
                  Aseptic Sterilization &amp; Food Safety Protocols
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Packaged in 215 Kg Aseptic Bag-in-Steel Drums (4 drums/pallet) &amp; 3.1 Kg A10 OTS Cans (6 cans/carton).
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {MANGO_PULP_STANDARDS.map((std, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/70 flex items-center justify-between gap-3 text-xs"
                  >
                    <span className="font-bold text-slate-900">{std.characteristic}</span>
                    <span className="text-emerald-800 font-semibold text-right">{std.requirement}</span>
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
