/**
 * src/dashboard/products/components/ProductFilters.jsx
 * ─────────────────────────────────────────────────────────────
 * Toolbar controls: search query, category selection, status pills,
 * grade filter, sort dropdown, and view toggle (table vs grid).
 */

import { PRODUCT_CATEGORIES, PRODUCT_GRADES, PRODUCT_STATUSES } from '../productStructure'

export default function ProductFilters({
  search = '',
  onSearchChange = () => {},
  category = 'all',
  onCategoryChange = () => {},
  status = 'all',
  onStatusChange = () => {},
  grade = 'all',
  onGradeChange = () => {},
  sort = 'newest',
  onSortChange = () => {},
  viewMode = 'table',
  onViewModeChange = () => {},
  onReset = () => {},
  totalResults = 0,
}) {
  const isFiltered = search !== '' || category !== 'all' || status !== 'all' || grade !== 'all'

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-xs space-y-4">
      {/* ── Top Row: Search Input + Sort + View Toggle ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Search Field */}
        <div className="relative flex-1 max-w-md">
          <svg
            className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by Product Name, SKU, CAS No, HS Code..."
            className="w-full pl-9 pr-9 py-2.5 rounded-xl border border-slate-200 bg-slate-50/70 focus:bg-white focus:border-[#0a3622] focus:ring-2 focus:ring-[#0a3622]/20 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 outline-none transition-all"
          />
          {search && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
              title="Clear search"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Right side controls: Grade, Sort & View Mode */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
          {/* Grade Dropdown */}
          <select
            value={grade}
            onChange={(e) => onGradeChange(e.target.value)}
            className="px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs font-medium text-slate-700 outline-none focus:border-[#0a3622] focus:ring-1 focus:ring-[#0a3622] cursor-pointer shadow-xs"
          >
            <option value="all">All Grades</option>
            {PRODUCT_GRADES.map((g) => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>

          {/* Sort Dropdown */}
          <select
            value={sort}
            onChange={(e) => onSortChange(e.target.value)}
            className="px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs font-medium text-slate-700 outline-none focus:border-[#0a3622] focus:ring-1 focus:ring-[#0a3622] cursor-pointer shadow-xs"
          >
            <option value="newest">Sort: Newest First</option>
            <option value="oldest">Sort: Oldest First</option>
            <option value="name-asc">Name: A to Z</option>
            <option value="name-desc">Name: Z to A</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>

          {/* View Mode Toggle: Table / Grid */}
          <div className="flex items-center p-0.5 rounded-xl border border-slate-200 bg-slate-100/80">
            <button
              type="button"
              onClick={() => onViewModeChange('table')}
              className={`p-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                viewMode === 'table'
                  ? 'bg-white text-[#0a3622] shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
              title="Table view"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => onViewModeChange('grid')}
              className={`p-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                viewMode === 'grid'
                  ? 'bg-white text-[#0a3622] shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
              title="Grid card view"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* ── Middle Row: Category Filter Scrollable Bar ── */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
        <button
          type="button"
          onClick={() => onCategoryChange('all')}
          className={`px-3 py-1.5 rounded-full whitespace-nowrap font-medium transition-colors cursor-pointer shrink-0 ${
            category === 'all'
              ? 'bg-[#0a3622] text-white'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          All Categories
        </button>

        {PRODUCT_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => onCategoryChange(cat.id)}
            className={`px-3 py-1.5 rounded-full whitespace-nowrap font-medium transition-colors cursor-pointer shrink-0 flex items-center gap-1.5 ${
              category === cat.id
                ? 'bg-[#0a3622] text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
            }`}
          >
            <span>{cat.icon}</span>
            <span>{cat.label}</span>
          </button>
        ))}
      </div>

      {/* ── Bottom Row: Status Filter Tabs & Results Count ── */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100">
        <div className="flex items-center gap-1">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mr-1.5">
            Status:
          </span>
          <button
            type="button"
            onClick={() => onStatusChange('all')}
            className={`px-2.5 py-1 rounded-lg text-xs font-medium cursor-pointer transition-colors ${
              status === 'all'
                ? 'bg-slate-900 text-white'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            All
          </button>
          {PRODUCT_STATUSES.map((st) => (
            <button
              key={st.id}
              type="button"
              onClick={() => onStatusChange(st.id)}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium cursor-pointer transition-colors ${
                status === st.id
                  ? 'bg-slate-900 text-white'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {st.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3 text-xs text-slate-500">
          <span>
            Found <strong className="text-slate-800">{totalResults}</strong> {totalResults === 1 ? 'product' : 'products'}
          </span>
          {isFiltered && (
            <button
              type="button"
              onClick={onReset}
              className="text-[#0a3622] hover:text-[#0f4d30] font-semibold underline cursor-pointer"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
