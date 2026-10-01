import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { getContact, deleteContact } from '../../api'

const STATUS_STYLES = {
  new:      'bg-blue-50 text-blue-700 ring-1 ring-blue-200',
  read:     'bg-slate-100 text-slate-600 ring-1 ring-slate-200',
  replied:  'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200',
  archived: 'bg-amber-50 text-amber-700 ring-1 ring-amber-200',
}

const TYPE_STYLES = {
  contact: 'bg-purple-50 text-purple-700 ring-1 ring-purple-200',
  order:   'bg-indigo-50 text-indigo-700 ring-1 ring-indigo-200',
}

function Badge({ label, styleMap }) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize ${styleMap[label] || 'bg-slate-100 text-slate-600'}`}>
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
      <dt className="w-36 shrink-0 text-xs font-bold text-slate-400 uppercase tracking-wider pt-0.5">
        {label}
      </dt>
      <dd className="text-sm text-slate-800 break-words flex-1">{content}</dd>
    </div>
  )
}

export default function ContactDetailPage() {
  const { id }       = useParams()
  const navigate     = useNavigate()

  const [contact,   setContact]   = useState(null)
  const [loading,   setLoading]   = useState(true)
  const [error,     setError]     = useState('')

  // Delete
  const [showDelete, setShowDelete] = useState(false)
  const [deleting,   setDeleting]   = useState(false)

  useEffect(() => {
    document.title = 'Contact Detail | Exim India Admin'
    ;(async () => {
      try {
        const data = await getContact(id)
        // Laravel resource wraps in { data: {...} }
        const c = data?.data ?? data
        setContact(c)
      } catch {
        setError('Could not load contact. It may have been deleted.')
      } finally {
        setLoading(false)
      }
    })()
  }, [id])

  const handleDelete = async () => {
    setDeleting(true)
    try {
      await deleteContact(id)
      navigate('/dashboard/contacts', { replace: true })
    } catch {
      setDeleting(false)
      setShowDelete(false)
      setError('Failed to delete contact.')
    }
  }

  // ─── Loading skeleton ───────────────────────────────────────
  if (loading) {
    return (
      <div className="p-4 sm:p-6 lg:p-8 max-w-4xl w-full mx-auto">
        <div className="h-4 w-32 bg-slate-200 rounded animate-pulse mb-6" />
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className="h-4 bg-slate-100 rounded animate-pulse" style={{ width: `${60 + (i % 3) * 15}%` }} />
          ))}
        </div>
      </div>
    )
  }

  // ─── Error state ────────────────────────────────────────────
  if (error && !contact) {
    return (
      <div className="p-4 sm:p-6 lg:p-8 max-w-4xl w-full mx-auto">
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm mb-4">{error}</div>
        <Link to="/dashboard/contacts" className="text-sm text-[#0a3622] font-medium hover:underline">
          ← Back to Contacts
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
        <Link to="/dashboard/contacts" className="hover:text-slate-800 transition-colors">Contacts</Link>
        <span>/</span>
        <span className="text-slate-800 font-medium truncate max-w-[160px]">{contact?.name}</span>
      </nav>

      {/* Error banner */}
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">{error}</div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* ── Left: Avatar & Actions ────────────────────────── */}
        <div className="lg:col-span-1 flex flex-col gap-4">

          {/* Avatar Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col items-center text-center gap-3">
            <div className="w-16 h-16 rounded-full bg-[#0a3622] text-white flex items-center justify-center text-2xl font-bold">
              {contact?.name?.[0]?.toUpperCase() || '?'}
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-800">{contact?.name}</h1>
              <p className="text-sm text-slate-500 mt-0.5">{contact?.email}</p>
              {contact?.phone && (
                <p className="text-xs text-slate-400 mt-0.5">{contact?.phone}</p>
              )}
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              <Badge label={contact?.type}   styleMap={TYPE_STYLES} />
              <Badge label={contact?.status} styleMap={STATUS_STYLES} />
            </div>
          </div>

          {/* Actions Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 flex flex-col gap-2">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Actions</p>
            {contact?.phone && (
              <a
                href={`https://wa.me/${contact.phone.replace(/\D/g,'')}`}
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
          <button
            onClick={() => setShowDelete(true)}
            className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-red-50 border border-red-100 text-sm font-medium text-red-600 hover:bg-red-100 transition-colors cursor-pointer mt-1"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Delete Contact
          </button>
        </div>
      </div>

      {/* ── Right: Contact Details ─────────────────────────── */}
      <div className="lg:col-span-2">
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-4">Inquiry Details</h2>

          <dl>
            <InfoRow label="Name"            value={contact?.name} />
            <InfoRow label="Email"           value={contact?.email} />
            <InfoRow label="Phone"           value={contact?.phone} />
            <InfoRow label="Company"         value={contact?.company} />
            <InfoRow label="Product Interest" value={contact?.product_interest} />
            {contact?.product && (
              <InfoRow label="Linked Product">
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
                  {contact.product.name}
                </span>
              </InfoRow>
            )}
            <InfoRow label="Quantity"        value={contact?.quantity} />
            <InfoRow label="Address"         value={contact?.address} />
            <InfoRow label="Type">
              <Badge label={contact?.type} styleMap={TYPE_STYLES} />
            </InfoRow>
            <InfoRow label="Received"        value={formatDate(contact?.created_at)} />
          </dl>
        </div>

        {/* Message Box */}
        {contact?.message && (
          <div className="mt-4 bg-white rounded-2xl border border-slate-200 p-6">
            <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-3">Message</h2>
            <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">{contact.message}</p>
          </div>
        )}
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
            <h3 className="text-base font-bold text-slate-800 text-center mb-1">Delete Contact?</h3>
            <p className="text-sm text-slate-500 text-center mb-6">
              Are you sure you want to delete <strong>{contact?.name}</strong>? This cannot be undone.
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
