/**
 * Admin product directory — every value comes from the admin API
 * (GET /admin/products, GET /admin/categories).
 */

import { useState, useEffect, useCallback, useRef } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import {
  adminGetProducts,
  adminGetCategories,
  adminUpdateProduct,
  adminDeleteProduct,
} from '../../api'
import SearchSelect from '../SearchSelect'
import ProductDeleteModal from './components/ProductDeleteModal'

const PAGE_SIZE = 20

export default function ProductListingPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const search = searchParams.get('search') || ''
  const category = searchParams.get('category') || ''
  const status = searchParams.get('status') || ''
  const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10))

  const [searchInput, setSearchInput] = useState(search)
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [meta, setMeta] = useState({ total: 0, last_page: 1 })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const [toast, setToast] = useState(null)
  const toastTimer = useRef(null)

  const showToast = (message, type = 'success') => {
    clearTimeout(toastTimer.current)
    setToast({ message, type })
    toastTimer.current = setTimeout(() => setToast(null), 3500)
  }
  useEffect(() => () => clearTimeout(toastTimer.current), [])

  useEffect(() => {
    document.title = 'Products | Exim India Admin'
    adminGetCategories()
      .then((res) => setCategories(Array.isArray(res) ? res : res?.data || []))
      .catch(() => setCategories([]))
  }, [])

  const updateParams = useCallback(
    (next) => {
      const params = new URLSearchParams(searchParams)
      Object.entries(next).forEach(([k, v]) => (v ? params.set(k, v) : params.delete(k)))
      setSearchParams(params)
    },
    [searchParams, setSearchParams],
  )

  // Debounce the search box into the URL
  useEffect(() => {
    if (searchInput === search) return undefined
    const t = setTimeout(() => updateParams({ search: searchInput, page: '' }), 350)
    return () => clearTimeout(t)
  }, [searchInput, search, updateParams])

  const loadProducts = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const res = await adminGetProducts({
        page,
        per_page: PAGE_SIZE,
        search: search || undefined,
        category_id: category || undefined,
        status: status || undefined,
      })
      setProducts(res?.data || [])
      setMeta({ total: res?.total ?? 0, last_page: res?.last_page ?? 1 })
    } catch (err) {
      setError(err.message || 'Failed to load products.')
      setProducts([])
    } finally {
      setLoading(false)
    }
  }, [page, search, category, status])

  useEffect(() => {
    loadProducts()
  }, [loadProducts])

  const toggleActive = async (product) => {
    try {
      await adminUpdateProduct(product.id, { is_active: !product.is_active })
      showToast(`"${product.name}" is now ${product.is_active ? 'hidden' : 'published'}.`)
      loadProducts()
    } catch (err) {
      showToast(err.message || 'Could not update the product.', 'error')
    }
  }

  const confirmDelete = async () => {
    if (!deleteTarget) return
    setIsDeleting(true)
    try {
      await adminDeleteProduct(deleteTarget.id)
      showToast(`Deleted "${deleteTarget.name}".`)
      setDeleteTarget(null)
      // Step back a page when the last row of a page was removed
      if (products.length === 1 && page > 1) updateParams({ page: String(page - 1) })
      else loadProducts()
    } catch (err) {
      showToast(err.message || 'Could not delete the product.', 'error')
    } finally {
      setIsDeleting(false)
    }
  }

  const hasFilters = Boolean(search || category || status)

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-5">
      {toast && (
        <div
          className={`fixed top-4 right-4 z-50 px-4 py-2.5 rounded-xl text-xs font-semibold shadow-lg ${
            toast.type === 'error' ? 'bg-red-600 text-white' : 'bg-[#0a3622] text-white'
          }`}
        >
          {toast.message}
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Products</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            {loading ? 'Loading…' : `${meta.total} ${meta.total === 1 ? 'product' : 'products'}`}
          </p>
        </div>
        <Link
          to="/dashboard/products/new"
          className="self-start px-4 py-2 rounded-xl bg-[#0a3622] hover:bg-[#0f4d30] text-white text-xs font-bold shadow-sm transition-colors"
        >
          + Add Product
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-3 bg-white border border-slate-200 rounded-2xl p-3">
        <input
          type="search"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search by name, CAS No. or model number…"
          className="flex-1 text-sm px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0a3622]"
        />
        <SearchSelect
          className="md:w-56"
          value={category}
          onChange={(v) => updateParams({ category: String(v), page: '' })}
          options={categories.map((c) => ({ value: c.id, label: c.name }))}
          placeholder="All categories"
        />
        <select
          value={status}
          onChange={(e) => updateParams({ status: e.target.value, page: '' })}
          className="text-sm px-3 py-2 rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-[#0a3622]"
        >
          <option value="">Any status</option>
          <option value="active">Published</option>
          <option value="draft">Hidden</option>
        </select>
        {hasFilters && (
          <button
            type="button"
            onClick={() => {
              setSearchInput('')
              setSearchParams({})
            }}
            className="text-xs font-semibold text-slate-500 hover:text-slate-800 px-2 cursor-pointer"
          >
            Reset
          </button>
        )}
      </div>

      {error && (
        <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center justify-between">
          <span>{error}</span>
          <button type="button" onClick={loadProducts} className="font-bold underline cursor-pointer">
            Retry
          </button>
        </div>
      )}

      {/* Table */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[10px]">
            <tr>
              <th className="px-4 py-3 font-bold">Product</th>
              <th className="px-4 py-3 font-bold">Category</th>
              <th className="px-4 py-3 font-bold">Group</th>
              <th className="px-4 py-3 font-bold">Status</th>
              <th className="px-4 py-3 font-bold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {loading &&
              [1, 2, 3, 4, 5].map((n) => (
                <tr key={n}>
                  <td colSpan={5} className="px-4 py-4">
                    <div className="h-4 bg-slate-100 rounded animate-pulse" />
                  </td>
                </tr>
              ))}

            {!loading && products.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-12 text-center text-slate-500">
                  {hasFilters ? 'No products match these filters.' : 'No products yet.'}
                </td>
              </tr>
            )}

            {!loading &&
              products.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50/60">
                  <td className="px-4 py-3">
                    <Link to={`/dashboard/products/${p.id}`} className="flex items-center gap-3 group">
                      <span className="w-10 h-10 rounded-lg bg-slate-100 border border-slate-200 overflow-hidden flex items-center justify-center shrink-0">
                        {p.image_url ? (
                          <img src={p.image_url} alt="" className="w-full h-full object-cover" loading="lazy" />
                        ) : (
                          <span className="text-slate-400 font-black">{p.name?.charAt(0)}</span>
                        )}
                      </span>
                      <span className="min-w-0">
                        <span className="block font-bold text-slate-900 group-hover:text-[#0a3622] truncate">
                          {p.name}
                        </span>
                        <span className="block text-[11px] text-slate-400 truncate">
                          {[p.slug, p.cas_no && `CAS ${p.cas_no}`].filter(Boolean).join(' · ')}
                        </span>
                      </span>
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-slate-700">{p.category?.name || '—'}</td>
                  <td className="px-4 py-3 text-slate-600">{p.group_name || p.group_key || '—'}</td>
                  <td className="px-4 py-3">
                    <button
                      type="button"
                      onClick={() => toggleActive(p)}
                      title={p.is_active ? 'Click to hide' : 'Click to publish'}
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold ring-1 cursor-pointer ${
                        p.is_active
                          ? 'bg-emerald-50 text-emerald-700 ring-emerald-200'
                          : 'bg-slate-100 text-slate-600 ring-slate-200'
                      }`}
                    >
                      {p.is_active ? 'Published' : 'Hidden'}
                    </button>
                    {p.is_featured && (
                      <span className="ml-1.5 px-2 py-1 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 ring-1 ring-amber-200">
                        Featured
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right whitespace-nowrap">
                    <Link
                      to={`/dashboard/products/${p.id}/edit`}
                      className="text-[#0a3622] font-bold hover:underline mr-3"
                    >
                      Edit
                    </Link>
                    <button
                      type="button"
                      onClick={() => setDeleteTarget(p)}
                      className="text-red-600 font-bold hover:underline cursor-pointer"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {meta.last_page > 1 && (
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span>
            Page {page} of {meta.last_page}
          </span>
          <div className="flex gap-2">
            <button
              type="button"
              disabled={page <= 1}
              onClick={() => updateParams({ page: String(page - 1) })}
              className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white font-semibold disabled:opacity-40 cursor-pointer"
            >
              ← Prev
            </button>
            <button
              type="button"
              disabled={page >= meta.last_page}
              onClick={() => updateParams({ page: String(page + 1) })}
              className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white font-semibold disabled:opacity-40 cursor-pointer"
            >
              Next →
            </button>
          </div>
        </div>
      )}

      <ProductDeleteModal
        isOpen={Boolean(deleteTarget)}
        target={deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={confirmDelete}
        isDeleting={isDeleting}
      />
    </div>
  )
}
