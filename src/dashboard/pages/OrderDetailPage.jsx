import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { getOrder, deleteOrder, updateOrderStatus } from '../../api/orders'
import { ORDER_STATUSES, ORDER_STATUS_STYLES } from '../orderStatus'

const STATUS_STYLES = ORDER_STATUS_STYLES
const STATUSES = ORDER_STATUSES

function Badge({ label }) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize ${STATUS_STYLES[label] || 'bg-slate-100 text-slate-600'}`}>
      {label}
    </span>
  )
}

function formatDate(dateStr) {
  if (!dateStr) return '—'
  return new Date(dateStr).toLocaleDateString('en-IN', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  })
}

function InfoRow({ label, value, children }) {
  const content = children ?? value
  if (!content) return null
  return (
    <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-6 py-3.5 border-b border-slate-100 last:border-0">
      <dt className="w-40 shrink-0 text-xs font-bold text-slate-400 uppercase tracking-wider pt-0.5">
        {label}
      </dt>
      <dd className="text-sm text-slate-800 break-words flex-1">{content}</dd>
    </div>
  )
}

export default function OrderDetailPage() {
  const { id }   = useParams()
  const navigate = useNavigate()

  const [order,      setOrder]      = useState(null)
  const [loading,    setLoading]    = useState(true)
  const [error,      setError]      = useState('')
  const [showDelete, setShowDelete] = useState(false)
  const [deleting,   setDeleting]   = useState(false)
  const [updating,   setUpdating]   = useState(false)

  useEffect(() => {
    document.title = 'Order Detail | Exim India Admin'
    ;(async () => {
      try {
        const data = await getOrder(id)
        const o    = data?.data ?? data
        setOrder(o)
      } catch {
        setError('Could not load order. It may have been deleted.')
      } finally {
        setLoading(false)
      }
    })()
  }, [id])

  const handleStatusChange = async (newStatus) => {
    setUpdating(true)
    try {
      await updateOrderStatus(id, newStatus)
      setOrder(prev => ({ ...prev, status: newStatus }))
    } catch {
      setError('Failed to update status.')
    } finally {
      setUpdating(false)
    }
  }

  const handleDelete = async () => {
    setDeleting(true)
    try {
      await deleteOrder(id)
      navigate('/dashboard/orders', { replace: true })
    } catch {
      setDeleting(false)
      setShowDelete(false)
      setError('Failed to delete order.')
    }
  }

  // ─── Loading skeleton ───────────────────────────────────────
  if (loading) {
    return (
      <div className="p-4 sm:p-6 lg:p-8 max-w-4xl w-full mx-auto">
        <div className="h-4 w-32 bg-slate-200 rounded animate-pulse mb-6" />
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-4 bg-slate-100 rounded animate-pulse" style={{ width: `${55 + (i % 3) * 15}%` }} />
          ))}
        </div>
      </div>
    )
  }

  if (error && !order) {
    return (
      <div className="p-4 sm:p-6 lg:p-8 max-w-4xl w-full mx-auto">
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm mb-4">{error}</div>
        <Link to="/dashboard/orders" className="text-sm text-[#0a3622] font-medium hover:underline">
          ← Back to Orders
        </Link>
      </div>
    )
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl w-full mx-auto">

      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-slate-500 mb-6">
        <Link to="/dashboard" className="hover:text-slate-800 transition-colors">Dashboard</Link>
        <span>/</span>
        <Link to="/dashboard/orders" className="hover:text-slate-800 transition-colors">Orders</Link>
        <span>/</span>
        <span className="text-slate-800 font-medium truncate max-w-[160px]">{order?.name}</span>
      </nav>

      {/* Error banner */}
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">{error}</div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* ── Left: Avatar & Actions ── */}
        <div className="lg:col-span-1 flex flex-col gap-4">

          {/* Avatar Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col items-center text-center gap-3">
            <div className="w-16 h-16 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-2xl font-bold">
              {order?.name?.[0]?.toUpperCase() || '?'}
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-800">{order?.name}</h1>
              <p className="text-sm text-slate-500 mt-0.5">{order?.email}</p>
              {order?.phone && (
                <p className="text-xs text-slate-400 mt-0.5 font-mono">{order?.phone}</p>
              )}
              {order?.company && (
                <p className="text-xs text-slate-400 mt-0.5">{order?.company}</p>
              )}
            </div>
            <Badge label={order?.status} />
          </div>

          {/* Status Changer */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 flex flex-col gap-3">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Update Status</p>
            <div className="grid grid-cols-2 gap-2">
              {STATUSES.map(s => (
                <button
                  key={s}
                  onClick={() => handleStatusChange(s)}
                  disabled={updating || order?.status === s}
                  className={`py-2 px-3 rounded-lg text-xs font-semibold capitalize transition-all cursor-pointer disabled:cursor-not-allowed ${
                    order?.status === s
                      ? 'bg-[#0a3622] text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200 disabled:opacity-50'
                  }`}
                >
                  {updating && order?.status !== s ? '…' : s}
                </button>
              ))}
            </div>
          </div>

          {/* Actions Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 flex flex-col gap-2">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Quick Actions</p>
            {order?.phone && (
              <a
                href={`https://wa.me/${order.phone.replace(/\D/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-sm font-medium text-emerald-700 hover:bg-emerald-100 transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp
              </a>
            )}
            {order?.email && (
              <a
                href={`mailto:${order.email}?subject=Re: Export Order Inquiry${order.product?.name || order.product_interest ? ` - ${order.product?.name || order.product_interest}` : ''}`}
                className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-blue-50 border border-blue-200 text-sm font-medium text-blue-700 hover:bg-blue-100 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Reply via Email
              </a>
            )}
            <button
              onClick={() => setShowDelete(true)}
              className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-red-50 border border-red-100 text-sm font-medium text-red-600 hover:bg-red-100 transition-colors cursor-pointer mt-1"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Delete Order
            </button>
          </div>
        </div>

        {/* ── Right: Order Details ── */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-4">Order Details</h2>
            <dl>
              <InfoRow label="Customer Name"    value={order?.name} />
              <InfoRow label="Email"            value={order?.email} />
              <InfoRow label="Phone"            value={order?.phone} />
              <InfoRow label="Company"          value={order?.company} />
              <InfoRow label="Product" value={order?.product?.name || order?.product_interest} />
              <InfoRow label="Quantity"         value={order?.quantity} />
              <InfoRow label="Delivery Address" value={order?.address} />
              <InfoRow label="Status">
                <Badge label={order?.status} />
              </InfoRow>
              <InfoRow label="Received"         value={formatDate(order?.created_at)} />
            </dl>
          </div>

          {/* Ordered items (one row per product / variant) */}
          {order?.items?.length > 0 && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-3">Items</h2>
              <ul className="divide-y divide-slate-100 text-sm">
                {order.items.map((item) => (
                  <li key={item.id} className="py-2.5 flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <p className="font-semibold text-slate-900">{item.label}</p>
                      {item.note && <p className="text-xs text-slate-500 mt-0.5">{item.note}</p>}
                    </div>
                    {item.quantity && <span className="shrink-0 font-semibold text-slate-700">{item.quantity}</span>}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Message / Additional Notes */}
          {order?.message && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-3">Additional Notes</h2>
              <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">{order.message}</p>
            </div>
          )}

          {/* Export info strip */}
          <div className="bg-gradient-to-r from-[#0a3622] to-[#15803d] rounded-2xl p-5 text-white">
            <p className="text-xs font-bold uppercase tracking-wider text-emerald-200 mb-1">Export Helpline</p>
            <p className="text-sm text-emerald-100 mb-2">For priority shipment scheduling, contact our export team directly:</p>
            <div className="flex flex-wrap gap-3 text-sm font-semibold">
              <a href="tel:+917977523176" className="hover:text-emerald-200 transition-colors">+91 79775 23176</a>
              <span className="text-emerald-600">|</span>
              <a href="tel:+919892364600" className="hover:text-emerald-200 transition-colors">+91 98923 64600</a>
              <span className="text-emerald-600">|</span>
              <a href="mailto:info@eximindiacorporation.com" className="hover:text-emerald-200 transition-colors">info@eximindiacorporation.com</a>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation */}
      {showDelete && (
        <>
          <div
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-50"
            onClick={() => !deleting && setShowDelete(false)}
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
                Are you sure you want to delete the order from <strong>{order?.name}</strong>? This cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowDelete(false)}
                  disabled={deleting}
                  className="flex-1 py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
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
