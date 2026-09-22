export default function EdibleLustreFilterBar({
  activeFilter,
  setActiveFilter,
  searchQuery,
  setSearchQuery,
  totalResults,
}) {
  const filterTabs = [
    { id: 'all', label: 'All Lustre Dusts', count: 10 },
    { id: 'metallic', label: 'Metallic & Warm', count: 3 },
    { id: 'vibrant', label: 'Vibrant Shades', count: 4 },
    { id: 'cool', label: 'Cool Tones', count: 3 },
  ]

  return (
    <div className="bg-slate-50/90 backdrop-blur-md border-y border-slate-200 sticky top-16 z-30 py-3.5 px-4 sm:px-6 lg:px-8 transition-all">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Filter Category Pills */}
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

        {/* Live Search & Count */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search shade, E-number, CI..."
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
            Showing <span className="text-slate-900 font-bold">{totalResults}</span> products
          </div>
        </div>
      </div>
    </div>
  )
}
