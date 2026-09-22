export default function ProductFilterBar({
  activeFilter,
  setActiveFilter,
  searchQuery,
  setSearchQuery,
  totalResults,
}) {
  const filters = [
    { id: 'all', label: 'All Colours', count: 15 },
    { id: 'red', label: 'Reds & Pinks', count: 6 },
    { id: 'yellow', label: 'Yellows & Oranges', count: 3 },
    { id: 'blue', label: 'Blues & Greens', count: 4 },
    { id: 'brown', label: 'Browns & Blacks', count: 2 },
  ]

  return (
    <div className="bg-white py-4 border-b border-slate-200/80 sticky top-[72px] z-30 shadow-xs backdrop-blur-md bg-white/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          
          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
            {filters.map((f) => {
              const isActive = activeFilter === f.id
              return (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setActiveFilter(f.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-[#0a3622] text-white shadow-sm ring-1 ring-emerald-900'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  <span>{f.label}</span>
                  <span
                    className={`ml-1.5 px-1.5 py-0.5 rounded-full text-[10px] ${
                      isActive ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {f.count}
                  </span>
                </button>
              )
            })}
          </div>

          {/* Search Box & Results Count */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-72">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search colour, C.I., or E-number..."
                className="w-full pl-9 pr-8 py-1.5 text-xs rounded-full border border-slate-300 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700/30 focus:border-emerald-700 transition-all text-slate-900 placeholder:text-slate-400"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-slate-400 hover:text-slate-600 text-xs font-bold cursor-pointer"
                >
                  ✕
                </button>
              )}
            </div>

            <div className="text-xs text-slate-500 font-semibold whitespace-nowrap hidden sm:block">
              Showing <span className="text-slate-900 font-bold">{totalResults}</span> products
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
