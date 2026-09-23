import { useState, useMemo } from 'react'
import { POWDER_FLAVOUR_PRODUCTS } from '../../constants/powderFlavoursData'
import PowderFlavourCard from '../../components/product/powder-flavours/PowderFlavourCard'

export default function PowderFlavours() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const filterTabs = [
    { id: 'all', label: 'All Powder Flavours', count: 13 },
    { id: 'sweet', label: 'Sweet & Desserts', count: 5 },
    { id: 'fruit', label: 'Fruit Flavours', count: 5 },
    { id: 'citrus', label: 'Citrus', count: 2 },
    { id: 'mint', label: 'Mint & Menthol', count: 1 },
  ]

  const filteredProducts = useMemo(() => {
    return POWDER_FLAVOUR_PRODUCTS.filter((item) => {
      const matchesFilter =
        activeFilter === 'all' || item.category === activeFilter
      const q = searchQuery.toLowerCase().trim()
      const matchesQuery =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.applicationSummary.toLowerCase().includes(q)
      return matchesFilter && matchesQuery
    })
  }, [activeFilter, searchQuery])

  return (
    <div className="bg-white min-h-screen text-slate-900 pt-20 sm:pt-24">
      {/* Filter & Search Toolbar */}
      <div className="bg-slate-50/90 backdrop-blur-md border-y border-slate-200 sticky top-16 z-30 py-3.5 px-4 sm:px-6 lg:px-8 transition-all">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                  activeFilter === tab.id
                    ? 'bg-[#0a3622] text-white shadow-xs'
                    : 'bg-white text-slate-700 hover:bg-slate-200/70 border border-slate-200'
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    activeFilter === tab.id
                      ? 'bg-white/25 text-white'
                      : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
            <div className="relative w-full sm:w-64">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search powder flavour..."
                className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0a3622]/20 focus:border-[#0a3622] transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-bold cursor-pointer"
                >
                  ✕
                </button>
              )}
            </div>

            <div className="text-xs font-semibold text-slate-500 whitespace-nowrap shrink-0">
              Showing <span className="text-slate-900 font-bold">{filteredProducts.length}</span> products
            </div>
          </div>
        </div>
      </div>

      {/* Catalog Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12">
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <PowderFlavourCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="py-16 text-center bg-slate-50 rounded-3xl border border-slate-200">
            <div className="text-3xl mb-2">🍨</div>
            <h3 className="text-lg font-bold text-slate-900">
              No matching powder flavours found
            </h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              Try adjusting your search query or selecting &quot;All Powder Flavours&quot;.
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
      </main>
    </div>
  )
}
