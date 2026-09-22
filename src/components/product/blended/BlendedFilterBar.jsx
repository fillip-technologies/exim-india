import { useState } from 'react'

const CATEGORY_TABS = [
  { id: 'all', label: 'All 19 Blends', dotColor: 'bg-emerald-700' },
  { id: 'yellow-orange', label: 'Yellows & Oranges', dotColor: 'bg-amber-500' },
  { id: 'red-pink', label: 'Reds & Pinks', dotColor: 'bg-rose-500' },
  { id: 'green', label: 'Greens', dotColor: 'bg-emerald-600' },
  { id: 'violet-purple', label: 'Violets & Purples', dotColor: 'bg-purple-600' },
  { id: 'brown-black', label: 'Browns & Blacks', dotColor: 'bg-stone-800' },
]

export default function BlendedFilterBar({
  activeFilter,
  setActiveFilter,
  searchQuery,
  setSearchQuery,
  totalResults,
}) {
  const [isInputFocused, setIsInputFocused] = useState(false)

  return (
    <div className="sticky top-16 sm:top-20 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 py-3 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4">
          
          {/* Horizontal Scrollable Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar w-full md:w-auto py-1">
            {CATEGORY_TABS.map((tab) => {
              const isActive = activeFilter === tab.id
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveFilter(tab.id)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-[#0a3622] text-white shadow-xs'
                      : 'bg-slate-100 hover:bg-slate-200/80 text-slate-700 border border-slate-200/60'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${tab.dotColor}`} />
                  <span>{tab.label}</span>
                </button>
              )
            })}
          </div>

          {/* Search Input Bar + Counter */}
          <div className="flex items-center gap-3 w-full md:w-auto shrink-0 justify-between md:justify-end">
            <div
              className={`relative flex items-center bg-slate-50 rounded-full border transition-all duration-200 w-full sm:w-64 ${
                isInputFocused
                  ? 'border-emerald-600 ring-2 ring-emerald-600/10 bg-white shadow-xs'
                  : 'border-slate-300'
              }`}
            >
              <span className="pl-3 text-slate-400 text-sm">🔍</span>
              <input
                type="text"
                placeholder="Search blended colours..."
                value={searchQuery}
                onFocus={() => setIsInputFocused(true)}
                onBlur={() => setIsInputFocused(false)}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full py-1.5 pl-2 pr-8 text-xs text-slate-800 placeholder-slate-400 bg-transparent focus:outline-none"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2 text-slate-400 hover:text-slate-600 text-xs p-1"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Total Results Count */}
            <div className="hidden sm:block text-xs font-bold text-slate-500 whitespace-nowrap">
              Showing <span className="text-emerald-800 font-extrabold">{totalResults}</span> products
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
