import { useState, useMemo } from 'react'
import { LIQUID_FLAVOURS, SPECIALTY_LIQUID_ENHANCERS } from '../../constants/liquidFlavoursData'
import LiquidFlavourFilterBar from '../../components/product/liquid-flavour/LiquidFlavourFilterBar'
import LiquidFlavourCard from '../../components/product/liquid-flavour/LiquidFlavourCard'

export default function LiquidFlavours() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [showSpecialtyTable, setShowSpecialtyTable] = useState(false)

  // Filtered and searched product list
  const filteredProducts = useMemo(() => {
    return LIQUID_FLAVOURS.filter((item) => {
      // 1. Color/Profile family filter
      const matchesFilter =
        activeFilter === 'all' || item.colorFamily === activeFilter

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
      <LiquidFlavourFilterBar
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
              <LiquidFlavourCard
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
              No matching liquid flavours found
            </h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              We couldn't find any flavours matching "{searchQuery}". Try searching by aroma profile, or clear filters.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('')
                setActiveFilter('all')
              }}
              className="mt-4 px-4 py-2 rounded-xl bg-[#0a3622] text-white text-xs font-bold transition-all hover:bg-[#0f4d30] cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Specialty Liquid Enhancers & Custom Formulations Section */}
        <div className="mt-14 pt-10 border-t border-slate-200 text-center">
          <button
            type="button"
            onClick={() => setShowSpecialtyTable(!showSpecialtyTable)}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#00a8cc] hover:bg-[#008ba8] text-white font-bold text-xs sm:text-sm shadow-sm transition-all cursor-pointer"
          >
            <span>{showSpecialtyTable ? 'Hide' : 'Explore'} 58+ Additional Custom Liquid Flavours &amp; Enhancers</span>
            <span className="text-xs">{showSpecialtyTable ? '▲' : '▼'}</span>
          </button>

          {showSpecialtyTable && (
            <div className="mt-6 text-left max-w-5xl mx-auto rounded-2xl border border-slate-200 overflow-hidden shadow-sm animate-fadeIn">
              <div className="bg-[#d9edf7] p-3 border-b border-slate-200">
                <h4 className="font-black text-slate-900 text-sm text-center">
                  Specialty Liquid Enhancers &amp; Customized Profiles Available On-Demand
                </h4>
              </div>
              <div className="p-4 bg-white grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 text-xs">
                {SPECIALTY_LIQUID_ENHANCERS.map((flavour, idx) => {
                  let bg = 'bg-slate-50'
                  if (idx % 3 === 0) bg = 'bg-[#dff0d8]/40'
                  if (idx % 3 === 1) bg = 'bg-[#d9edf7]/40'
                  return (
                    <div
                      key={flavour}
                      className={`p-2.5 rounded-lg border border-slate-200 font-semibold text-slate-800 flex items-center gap-2 ${bg}`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-700 shrink-0" />
                      <span className="truncate">{flavour}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
