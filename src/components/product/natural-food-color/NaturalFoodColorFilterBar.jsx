export default function NaturalFoodColorFilterBar({
  activeFilter,
  setActiveFilter,
  searchQuery,
  setSearchQuery,
  totalResults,
}) {
  const filterOptions = [
    { id: 'all', label: 'All Natural Colors' },
    { id: 'yellow', label: 'Yellows (Curcumin / Acid Yellow)' },
    { id: 'orange', label: 'Oranges (Annatto / Carotene / Paprika)' },
    { id: 'green', label: 'Greens (Chlorophyll)' },
    { id: 'brown', label: 'Browns (Caramel)' },
    { id: 'red', label: 'Reds (Red Beet)' },
  ]

  return (
    <div className="bg-slate-50 border-y border-slate-200 sticky top-16 sm:top-20 z-30 shadow-xs backdrop-blur-md bg-slate-50/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 sm:gap-4">
          
          {/* Quick Filter Buttons */}
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            {filterOptions.map((opt) => {
              const isActive = activeFilter === opt.id
              return (
                <button
                  key={opt.id}
                  onClick={() => setActiveFilter(opt.id)}
                  className={`text-xs sm:text-sm font-semibold px-3 sm:px-3.5 py-1.5 rounded-full transition-all shrink-0 cursor-pointer ${
                    isActive
                      ? 'bg-emerald-800 text-white shadow-xs'
                      : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200/80 hover:text-slate-900'
                  }`}
                >
                  {opt.label}
                </button>
              )
            })}
          </div>

          {/* Search Input & Counter */}
          <div className="flex items-center gap-3">
            <div className="relative flex-1 sm:w-64">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400 text-xs">
                🔍
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search natural colors, E-numbers..."
                className="w-full pl-8 pr-3 py-1.5 text-xs sm:text-sm bg-white border border-slate-200 rounded-full focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 text-slate-800 placeholder-slate-400 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600 text-xs cursor-pointer"
                >
                  ✕
                </button>
              )}
            </div>

            <span className="text-xs font-semibold text-slate-500 shrink-0 bg-white px-2.5 py-1.5 rounded-full border border-slate-200">
              {totalResults} {totalResults === 1 ? 'Color' : 'Colors'}
            </span>
          </div>

        </div>
      </div>
    </div>
  )
}
