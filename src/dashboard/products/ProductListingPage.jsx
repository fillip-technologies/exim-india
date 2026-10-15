/**
 * src/dashboard/products/ProductListingPage.jsx
 * ─────────────────────────────────────────────────────────────
 * Master Product Catalog Listing with KPI stats, bulk actions,
 * interactive filtering, table & grid toggles, and deletion flow.
 */

import { useState, useEffect, useCallback, useMemo } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { productStore, PRODUCT_CATEGORIES } from './productStructure'
import ProductFilters from './components/ProductFilters'
import ProductTable from './components/ProductTable'
import ProductCard from './components/ProductCard'
import ProductDeleteModal from './components/ProductDeleteModal'

export default function ProductListingPage() {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()

  // State
  const [products, setProducts] = useState([])
  const [totalCount, setTotalCount] = useState(0)
  const [stats, setStats] = useState({ total: 0, active: 0, draft: 0, lowStock: 0, featured: 0 })
  const [loading, setLoading] = useState(true)

  // Filters from URL or state
  const search = searchParams.get('search') || ''
  const category = searchParams.get('category') || 'all'
  const status = searchParams.get('status') || 'all'
  const grade = searchParams.get('grade') || 'all'
  const sort = searchParams.get('sort') || 'newest'
  const page = parseInt(searchParams.get('page') || '1', 10)
  const limit = 10

  // View mode (table or grid)
  const [viewMode, setViewMode] = useState('table')

  // Bulk selection
  const [selectedIds, setSelectedIds] = useState([])

  // Delete modal state
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [isBulkDelete, setIsBulkDelete] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  // Feedback Toast
  const [toast, setToast] = useState(null)

  const showToast = (message, type = 'success') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3500)
  }

  // Update URL search parameters
  const updateParams = (newParams) => {
    const updated = new URLSearchParams(searchParams)
    Object.entries(newParams).forEach(([key, val]) => {
      if (val === null || val === '' || val === 'all') {
        updated.delete(key)
      } else {
        updated.set(key, val)
      }
    })
    setSearchParams(updated)
  }

  // Fetch list
  const loadProducts = useCallback(() => {
    setLoading(true)
    try {
      const res = productStore.getAll({
        search,
        category,
        status,
        grade,
        sort,
        page,
        limit,
      })
      setProducts(res.data)
      setTotalCount(res.total)
      setStats(productStore.getStats())
    } catch (err) {
      console.error('Failed to load products:', err)
      showToast('Failed to load products catalog.', 'error')
    } finally {
      setLoading(false)
    }
  }, [search, category, status, grade, sort, page])

  useEffect(() => {
    document.title = 'Products Directory | Exim India Admin'
    loadProducts()
  }, [loadProducts])

  // Clear selections when filters or page changes
  useEffect(() => {
    setSelectedIds([])
  }, [search, category, status, grade, page])

  // Handlers for filters
  const handleSearchChange = (val) => updateParams({ search: val, page: 1 })
  const handleCategoryChange = (val) => updateParams({ category: val, page: 1 })
  const handleStatusChangeFilter = (val) => updateParams({ status: val, page: 1 })
  const handleGradeChange = (val) => updateParams({ grade: val, page: 1 })
  const handleSortChange = (val) => updateParams({ sort: val, page: 1 })
  const handleResetFilters = () => setSearchParams({})

  // Bulk Selection Handlers
  const handleToggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    )
  }

  const handleSelectAll = () => {
    if (selectedIds.length === products.length) {
      setSelectedIds([])
    } else {
      setSelectedIds(products.map((p) => p.id))
    }
  }

  // Row Quick Actions
  const handleStatusToggle = (id, newStatus) => {
    try {
      productStore.toggleStatus(id, newStatus)
      showToast(`Product status updated to ${newStatus}.`)
      loadProducts()
    } catch (err) {
      showToast(err.message, 'error')
    }
  }

  const handleDuplicate = (id) => {
    try {
      const newProd = productStore.duplicate(id)
      showToast(`Duplicated "${newProd.name}" as draft.`)
      loadProducts()
    } catch (err) {
      showToast('Failed to duplicate product.', 'error')
    }
  }

  // Deletion Flow
  const handleOpenDelete = (product) => {
    setDeleteTarget(product)
    setIsBulkDelete(false)
  }

  const handleOpenBulkDelete = () => {
    if (selectedIds.length === 0) return
    setDeleteTarget(selectedIds)
    setIsBulkDelete(true)
  }

  const handleConfirmDelete = () => {
    setIsDeleting(true)
    try {
      if (isBulkDelete) {
        productStore.bulkDelete(selectedIds)
        showToast(`Successfully deleted ${selectedIds.length} products.`)
        setSelectedIds([])
      } else if (deleteTarget?.id) {
        productStore.delete(deleteTarget.id)
        showToast(`Deleted "${deleteTarget.name}".`)
      }
      setDeleteTarget(null)
      loadProducts()
    } catch (err) {
      showToast('Error during deletion.', 'error')
    } finally {
      setIsDeleting(false)
    }
  }

  // Bulk Status Changes
  const handleBulkStatusChange = (newStatus) => {
    if (selectedIds.length === 0) return
    productStore.bulkUpdateStatus(selectedIds, newStatus)
    showToast(`Updated status for ${selectedIds.length} products to ${newStatus}.`)
    setSelectedIds([])
    loadProducts()
  }

  const totalPages = Math.ceil(totalCount / limit) || 1

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-6">
      {/* ── Toast Notification ─────────────────────────────── */}
      {toast && (
        <div
          className={`fixed bottom-6 right-6 z-50 px-4 py-3 rounded-2xl shadow-xl border flex items-center gap-3 animate-in fade-in slide-in-from-bottom-5 duration-300 text-xs sm:text-sm font-semibold ${
            toast.type === 'error'
              ? 'bg-rose-50 border-rose-200 text-rose-800'
              : 'bg-emerald-50 border-emerald-200 text-emerald-800'
          }`}
        >
          <span>{toast.type === 'error' ? '⚠️' : '✓'}</span>
          <span>{toast.message}</span>
        </div>
      )}

      {/* ── 1. Page Header & Actions ───────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Products Directory
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#0a3622]/10 text-[#0a3622]">
              {stats.total} Total
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Manage food colours, chemicals, pigments, and export formulations.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          {/* Reset seeds button */}
          <button
            type="button"
            onClick={() => {
              if (window.confirm('Reset products database back to default sample records?')) {
                productStore.resetToDefaults()
                showToast('Products reset to defaults.')
                loadProducts()
              }
            }}
            className="px-3 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 text-xs font-semibold shadow-xs transition-colors cursor-pointer"
            title="Reset sample products"
          >
            ↻ Reset Sample Data
          </button>

          {/* Add Product CTA */}
          <Link
            to="/dashboard/products/new"
            className="px-4 py-2 rounded-xl bg-[#0a3622] hover:bg-[#0f4d30] text-white text-xs sm:text-sm font-bold shadow-sm shadow-[#0a3622]/20 hover:shadow-md transition-all flex items-center gap-2 cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
            <span>Add New Product</span>
          </Link>
        </div>
      </div>

      {/* ── 2. Top KPI Metric Cards ────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Total Catalog
            </span>
            <span className="text-base">📦</span>
          </div>
          <div className="text-2xl font-extrabold text-slate-900">{stats.total}</div>
          <p className="text-[11px] text-slate-400 mt-0.5">Formulations & pigments</p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs">
          <div className="flex items-center justify-between text-emerald-600 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Active / Export
            </span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          </div>
          <div className="text-2xl font-extrabold text-emerald-700">{stats.active}</div>
          <p className="text-[11px] text-slate-400 mt-0.5">Live on website & catalog</p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs">
          <div className="flex items-center justify-between text-amber-600 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Low Inventory
            </span>
            <span className="text-base">⚠️</span>
          </div>
          <div className="text-2xl font-extrabold text-amber-700">{stats.lowStock}</div>
          <p className="text-[11px] text-slate-400 mt-0.5">Stock below threshold</p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Drafts / In Review
            </span>
            <span className="text-base">📝</span>
          </div>
          <div className="text-2xl font-extrabold text-slate-700">{stats.draft}</div>
          <p className="text-[11px] text-slate-400 mt-0.5">Pending lab verification</p>
        </div>
      </div>

      {/* ── 3. Filters Toolbar ─────────────────────────────── */}
      <ProductFilters
        search={search}
        onSearchChange={handleSearchChange}
        category={category}
        onCategoryChange={handleCategoryChange}
        status={status}
        onStatusChange={handleStatusChangeFilter}
        grade={grade}
        onGradeChange={handleGradeChange}
        sort={sort}
        onSortChange={handleSortChange}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        onReset={handleResetFilters}
        totalResults={totalCount}
      />

      {/* ── 4. Bulk Actions Bar (Sticky Floating) ─────────── */}
      {selectedIds.length > 0 && (
        <div className="bg-slate-900 text-white rounded-2xl px-4 py-3 shadow-xl flex flex-wrap items-center justify-between gap-3 animate-in fade-in slide-in-from-top-3 duration-200">
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-emerald-500 text-slate-900 flex items-center justify-center text-[10px] font-extrabold">
              {selectedIds.length}
            </span>
            <span className="text-xs font-semibold">
              {selectedIds.length} {selectedIds.length === 1 ? 'product' : 'products'} selected
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => handleBulkStatusChange('active')}
              className="px-2.5 py-1.5 rounded-lg text-xs font-medium bg-emerald-600 hover:bg-emerald-500 text-white transition-colors cursor-pointer"
            >
              Mark Active
            </button>
            <button
              type="button"
              onClick={() => handleBulkStatusChange('draft')}
              className="px-2.5 py-1.5 rounded-lg text-xs font-medium bg-slate-700 hover:bg-slate-600 text-slate-200 transition-colors cursor-pointer"
            >
              Move to Draft
            </button>
            <button
              type="button"
              onClick={handleOpenBulkDelete}
              className="px-2.5 py-1.5 rounded-lg text-xs font-medium bg-rose-600 hover:bg-rose-500 text-white transition-colors cursor-pointer"
            >
              Delete Selected
            </button>
            <button
              type="button"
              onClick={() => setSelectedIds([])}
              className="px-2 py-1.5 rounded-lg text-xs text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              Deselect
            </button>
          </div>
        </div>
      )}

      {/* ── 5. Product Content (Table vs Grid) ─────────────── */}
      {viewMode === 'table' ? (
        <ProductTable
          products={products}
          selectedIds={selectedIds}
          onToggleSelect={handleToggleSelect}
          onSelectAll={handleSelectAll}
          onStatusChange={handleStatusToggle}
          onDuplicate={handleDuplicate}
          onDelete={handleOpenDelete}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {products.length === 0 ? (
            <div className="col-span-full bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-500">
              <span className="text-3xl block mb-2">🔍</span>
              <p className="text-sm font-semibold">No products found matching filters.</p>
              <button
                type="button"
                onClick={handleResetFilters}
                className="mt-3 text-xs font-bold text-[#0a3622] hover:underline cursor-pointer"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            products.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                isSelected={selectedIds.includes(p.id)}
                onToggleSelect={handleToggleSelect}
                onDuplicate={handleDuplicate}
                onDelete={handleOpenDelete}
              />
            ))
          )}
        </div>
      )}

      {/* ── 6. Pagination Footer ──────────────────────────── */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
          <p className="text-xs text-slate-500">
            Showing Page <strong className="text-slate-800">{page}</strong> of{' '}
            <strong className="text-slate-800">{totalPages}</strong> ({totalCount} total items)
          </p>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              disabled={page <= 1}
              onClick={() => updateParams({ page: page - 1 })}
              className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
            >
              Previous
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pNum) => (
              <button
                key={pNum}
                type="button"
                onClick={() => updateParams({ page: pNum })}
                className={`w-8 h-8 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                  page === pNum
                    ? 'bg-[#0a3622] text-white'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                {pNum}
              </button>
            ))}

            <button
              type="button"
              disabled={page >= totalPages}
              onClick={() => updateParams({ page: page + 1 })}
              className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* ── 7. Deletion Confirmation Modal ─────────────────── */}
      <ProductDeleteModal
        isOpen={Boolean(deleteTarget)}
        target={deleteTarget}
        isBulk={isBulkDelete}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleConfirmDelete}
        isDeleting={isDeleting}
      />
    </div>
  )
}
