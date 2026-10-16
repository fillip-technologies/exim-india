import { useEffect, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { getOrders, deleteOrder, updateOrderStatus } from '../../api/orders'
import { ORDER_STATUSES, ORDER_STATUS_STYLES, ORDER_STATUS_ICONS } from '../orderStatus'

// ─── Constants ─────────────────────────────────────────────────
const STATUSES = ORDER_STATUSES
const STATUS_STYLES = ORDER_STATUS_STYLES
const STATUS_ICONS = ORDER_STATUS_ICONS

function Badge({ label }) {
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize ${STATUS_STYLES[label] || 'bg-slate-100 text-slate-600'}`}>
      <span>{STATUS_ICONS[label] || ''}</span>
      {label}
    </span>
  )
}

function formatDate(dateStr) {
  if (!dateStr) return '—'
  return new Date(dateStr).toLocaleDateString('en-IN', {
    day: '2-digit', month: 'short', year: 'numeric',
  })
}

// ─── Main Page ──────────────────────────────────────────────────
export default function OrdersPage() {
  const navigate = useNavigate()
  const [orders,       setOrders]       = useState([])
  const [meta,         setMeta]         = useState({ total: 0, current_page: 1, last_page: 1 })
  const [loading,      setLoading]      = useState(true)
  const [error,        setError]        = useState('')

  // Filters
  const [filterStatus, setFilterStatus] = useState('')
  const [page,         setPage]         = useState(1)

  // Inline status update
  const [updatingId,   setUpdatingId]   = useState(null)

  // Delete confirm
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [deleting,     setDeleting]     = useState(false)

  const fetchOrders = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const res  = await getOrders({ status: filterStatus, page })
      const list = res?.data ?? []
      const m    = res?.meta ?? res
      setOrders(list)
      setMeta({
        total:        m?.total        ?? list.length,
        current_page: m?.current_page ?? page,
        last_page:    m?.last_page    ?? 1,
      })
    } catch {
      setError('Failed to load orders. Please try again.')
    } finally {
      setLoading(false)
    }
  }, [filterStatus, page])

  useEffect(() => {
    document.title = 'Orders | Exim India Admin'
    fetchOrders()
  }, [fetchOrders])

  const handleFilterChange = (setter) => (e) => {
    setter(e.target.value)
    setPage(1)
  }

  // Inline status change
  const handleStatusChange = async (id, newStatus) => {
    setUpdatingId(id)
    try {
      await updateOrderStatus(id, newStatus)
      setOrders(prev => prev.map(o => o.id === id ? { ...o, status: newStatus } : o))
    } catch {
      setError('Failed to update order status.')
    } finally {
      setUpdatingId(null)
    }
  }

  // Delete flow
  const confirmDelete = async () => {
    if (!deleteTarget || deleting) return
    setDeleting(true)
    try {
      await deleteOrder(deleteTarget.id)
      setOrders(prev => prev.filter(o => o.id !== deleteTarget.id))
      setMeta(prev => ({ ...prev, total: Math.max(0, prev.total - 1) }))
      setDeleteTarget(null)
    } catch {
      setError('Failed to delete order.')
    } finally {
      setDeleting(false)
    }
  }

  // Stats for the top summary bar
  const statsMap = orders.reduce((acc, o) => {
    acc[o.status] = (acc[o.status] || 0) + 1
    return acc
  }, {})

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">

      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-800">Export Order Inquiries</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {meta.total} total {meta.total === 1 ? 'order' : 'orders'}
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2.5 sm:justify-end">
          <select
            value={filterStatus}
            onChange={handleFilterChange(setFilterStatus)}
            className="px-3 py-2 text-sm border border-slate-200 rounded-lg text-slate-700 bg-white focus:outline-none focus:ring-1 focus:ring-[#0a3622] focus:border-[#0a3622] transition-colors cursor-pointer"
          >
            <option value="">All Statuses</option>
            {STATUSES.map(s => (
              <option key={s} value={s} className="capitalize">{s}</option>
            ))}
          </select>
          {filterStatus && (
            <button
              onClick={() => { setFilterStatus(''); setPage(1) }}
              className="px-3 py-2 text-xs sm:text-sm text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg border border-red-200 transition-colors cursor-pointer"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* ── Quick-stats strip ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {STATUSES.map(s => (
          <button
            key={s}
            onClick={() => { setFilterStatus(s === filterStatus ? '' : s); setPage(1) }}
            className={`text-left p-3 rounded-xl border transition-all cursor-pointer ${filterStatus === s ? 'bg-[#0a3622] text-white border-[#0a3622]' : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:shadow-sm'}`}
          >
            <p className={`text-[11px] font-semibold uppercase tracking-wider mb-0.5 ${filterStatus === s ? 'text-emerald-200' : 'text-slate-400'}`}>
              {s}
            </p>
            <p className="text-xl font-bold">{statsMap[s] || 0}</p>
          </button>
        ))}
      </div>

      {/* ── Error ── */}
      {error && (
        <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
          {error}
        </div>
      )}

      {/* ── Table ── */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-100">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-3.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Customer</th>
                <th className="px-4 py-3.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Contact</th>
                <th className="px-4 py-3.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Product Interest</th>
                <th className="px-4 py-3.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Quantity</th>
                <th className="px-4 py-3.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Date</th>
                <th className="px-4 py-3.5 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {loading ? (
                Array.from({ length: 7 }).map((_, i) => (
                  <tr key={i}>
                    {[...Array(7)].map((__, j) => (
                      <td key={j} className="px-4 py-3.5">
                        <div className="h-4 bg-slate-100 rounded animate-pulse w-full" />
                      </td>
                    ))}
                  </tr>
                ))
              ) : orders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-16 text-center">
                    <div className="flex flex-col items-center gap-2 text-slate-400">
                      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
                          d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                      <p className="text-sm font-medium">No orders found</p>
                      {filterStatus && <p className="text-xs">Try clearing the status filter</p>}
                    </div>
                  </td>
                </tr>
              ) : (
                orders.map(order => (
                  <tr
                    key={order.id}
                    onClick={() => navigate(`/dashboard/orders/${order.id}`)}
                    className="hover:bg-slate-50 cursor-pointer transition-colors"
                  >
                    {/* Customer */}
                    <td className="px-4 py-3.5 whitespace-nowrap">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-bold shrink-0">
                          {order.name?.[0]?.toUpperCase() || '?'}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-slate-800">{order.name}</p>
                          {order.company && (
                            <p className="text-[11px] text-slate-400">{order.company}</p>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Contact */}
                    <td className="px-4 py-3.5 whitespace-nowrap">
                      <p className="text-sm text-slate-700">{order.email || '—'}</p>
                      <p className="text-xs text-slate-400 font-mono">{order.phone || ''}</p>
                    </td>

                    {/* Product */}
                    <td className="px-4 py-3.5">
                      <span className="text-sm text-slate-700 line-clamp-1">
                        {order.product_interest || '—'}
                      </span>
                    </td>

                    {/* Quantity */}
                    <td className="px-4 py-3.5 whitespace-nowrap">
                      <span className="text-sm text-slate-600 font-mono">
                        {order.quantity || '—'}
                      </span>
                    </td>

                    {/* Status — inline dropdown */}
                    <td className="px-4 py-3.5 whitespace-nowrap" onClick={e => e.stopPropagation()}>
                      {updatingId === order.id ? (
                        <span className="text-xs text-slate-400 italic">Updating…</span>
                      ) : (
                        <select
                          value={order.status}
                          onChange={e => handleStatusChange(order.id, e.target.value)}
                          className={`text-xs rounded-full px-2.5 py-1 font-semibold border-none outline-none cursor-pointer capitalize ${STATUS_STYLES[order.status] || 'bg-slate-100 text-slate-600'}`}
                        >
                          {STATUSES.map(s => (
                            <option key={s} value={s} className="capitalize">{s}</option>
                          ))}
                        </select>
                      )}
                    </td>

                    {/* Date */}
                    <td className="px-4 py-3.5 whitespace-nowrap text-sm text-slate-500">
                      {formatDate(order.created_at)}
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-3.5 whitespace-nowrap text-right" onClick={e => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => navigate(`/dashboard/orders/${order.id}`)}
                          className="p-1.5 text-slate-400 hover:text-[#0a3622] hover:bg-emerald-50 rounded-lg transition-colors cursor-pointer"
                          title="View Detail"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => setDeleteTarget(order)}
                          className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                          title="Delete"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {!loading && meta.last_page > 1 && (
          <div className="px-4 py-3 border-t border-slate-100 flex items-center justify-between text-sm">
            <p className="text-slate-500 text-xs">
              Page {meta.current_page} of {meta.last_page}
            </p>
            <div className="flex items-center gap-2">
              <button
                disabled={meta.current_page <= 1}
                onClick={() => setPage(p => p - 1)}
                className="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer text-xs font-medium"
              >
                ← Prev
              </button>
              <button
                disabled={meta.current_page >= meta.last_page}
                onClick={() => setPage(p => p + 1)}
                className="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer text-xs font-medium"
              >
                Next →
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ── Delete Confirmation Modal ── */}
      {deleteTarget && (
        <>
          <div
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-50"
            onClick={() => !deleting && setDeleteTarget(null)}
            aria-hidden="true"
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </div>
              <h3 className="text-base font-bold text-slate-800 text-center mb-1">Delete Order?</h3>
              <p className="text-sm text-slate-500 text-center mb-6">
                Are you sure you want to delete the order from <strong>{deleteTarget.name}</strong>? This cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setDeleteTarget(null)}
                  disabled={deleting}
                  className="flex-1 py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  disabled={deleting}
                  className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-sm font-medium transition-colors cursor-pointer disabled:opacity-50"
                >
                  {deleting ? 'Deleting…' : 'Delete'}
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
