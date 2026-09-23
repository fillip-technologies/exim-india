import { useState, useMemo } from 'react'
import { PHARMACEUTICAL_COLORS } from '../../constants/pharmaceuticalColorsData'
import PharmaceuticalFilterBar from '../../components/product/pharmaceutical/PharmaceuticalFilterBar'
import PharmaceuticalCard from '../../components/product/pharmaceutical/PharmaceuticalCard'

export default function PharmaceuticalColours() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  // Filtered and searched product list
  const filteredProducts = useMemo(() => {
    return PHARMACEUTICAL_COLORS.filter((item) => {
      // 1. Form or Color family filter
      const matchesFilter =
        activeFilter === 'all' ||
        item.formType === activeFilter ||
        item.colorFamily === activeFilter

      // 2. Keyword query search
      const q = searchQuery.toLowerCase().trim()
      const matchesQuery =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.ciNo.toLowerCase().includes(q) ||
        item.eNumber.toLowerCase().includes(q) ||
        item.fdcName.toLowerCase().includes(q) ||
        item.pharmacopoeia.toLowerCase().includes(q) ||
        item.casNo.toLowerCase().includes(q) ||
        item.applicationSummary.toLowerCase().includes(q)

      return matchesFilter && matchesQuery
    })
  }, [activeFilter, searchQuery])

  return (
    <div className="bg-white min-h-screen text-slate-900 pt-20 sm:pt-24">
      {/* Interactive Sticky Filter & Search Toolbar */}
      <PharmaceuticalFilterBar
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
              <PharmaceuticalCard
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
              No matching pharmaceutical colours found
            </h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              We couldn't find any products matching "{searchQuery}". Try searching by color name, pharmacopoeia (IP/USP/BP), or C.I. number.
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
      </main>
    </div>
  )
}
