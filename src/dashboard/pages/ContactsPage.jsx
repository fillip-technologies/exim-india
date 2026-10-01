import { useEffect, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { getContacts, deleteContact } from '../../api'

// ─── Constants ─────────────────────────────────────────────────
const STATUSES = ['new', 'read', 'replied', 'archived']
const TYPES    = ['contact', 'order']

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
  })
}

// ─── Main Page ──────────────────────────────────────────────────
export default function ContactsPage() {
  const navigate = useNavigate()
  const [contacts,    setContacts]    = useState([])
  const [meta,        setMeta]        = useState({ total: 0, current_page: 1, last_page: 1 })
  const [loading,     setLoading]     = useState(true)
  const [error,       setError]       = useState('')

  // Filters
  const [filterType,   setFilterType]   = useState('')
  const [filterStatus, setFilterStatus] = useState('')
  const [page,         setPage]         = useState(1)

  // Delete confirm
  const [deleteTarget,  setDeleteTarget]  = useState(null)
  const [deleting,      setDeleting]      = useState(false)

  const fetchContacts = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const res = await getContacts({ type: filterType, status: filterStatus, page })
      // Laravel paginated resource → { data, links, meta } OR { data, current_page, last_page, total }
      const list     = res?.data       ?? []
      const metaData = res?.meta       ?? res
      setContacts(list)
      setMeta({
        total:        metaData?.total        ?? list.length,
        current_page: metaData?.current_page ?? page,
        last_page:    metaData?.last_page    ?? 1,
      })
    } catch {
      setError('Failed to load contacts. Please try again.')
    } finally {
      setLoading(false)
    }
  }, [filterType, filterStatus, page])

  useEffect(() => {
    document.title = 'Contacts | Exim India Admin'
    fetchContacts()
  }, [fetchContacts])

  // Reset to page 1 when filters change
  const handleFilterChange = (setter) => (e) => {
    setter(e.target.value)
    setPage(1)
  }

  // Delete flow
  const confirmDelete = async () => {
    if (!deleteTarget || deleting) return
    setDeleting(true)
    try {
      await deleteContact(deleteTarget.id)
      setContacts(prev => prev.filter(c => c.id !== deleteTarget.id))
      setMeta(prev => ({ ...prev, total: Math.max(0, prev.total - 1) }))
      setDeleteTarget(null)
    } catch {
      setError('Failed to delete contact.')
    } finally {
      setDeleting(false)
    }
  }

  const FilterSelect = ({ label, value, onChange, options }) => (
    <select
      value={value}
      onChange={onChange}
      className="px-3 py-2 text-sm border border-slate-200 rounded-lg text-slate-700 bg-white focus:outline-none focus:ring-1 focus:ring-[#0a3622] focus:border-[#0a3622] transition-colors cursor-pointer"
    >
      <option value="">{label}</option>
      {options.map(o => (
        <option key={o} value={o} className="capitalize">{o}</option>
      ))}
    </select>
  )

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-slate-800">Contacts & Inquiries</h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          {meta.total} total {meta.total === 1 ? 'inquiry' : 'inquiries'}
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 mb-5">
        <FilterSelect
          label="All Types"
          value={filterType}
          onChange={handleFilterChange(setFilterType)}
          options={TYPES}
        />
        <FilterSelect
          label="All Statuses"
          value={filterStatus}
          onChange={handleFilterChange(setFilterStatus)}
          options={STATUSES}
        />
        {(filterType || filterStatus) && (
          <button
            onClick={() => { setFilterType(''); setFilterStatus(''); setPage(1) }}
            className="px-3 py-2 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg border border-red-100 transition-colors cursor-pointer"
          >
            Clear filters
          </button>
        )}
      </div>

      {/* Error */}
      {error && (
        <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
          {error}
        </div>
      )}

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-100">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Name</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider hidden sm:table-cell">Email / Phone</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider hidden md:table-cell">Type</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider hidden lg:table-cell">Date</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {loading ? (
                Array.from({ length: 8 }).map((_, i) => (
                  <tr key={i}>
                    {[...Array(6)].map((__, j) => (
                      <td key={j} className="px-4 py-3">
                        <div className="h-4 bg-slate-100 rounded animate-pulse w-full" />
                      </td>
                    ))}
                  </tr>
                ))
              ) : contacts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-16 text-center">
                    <div className="flex flex-col items-center gap-2 text-slate-400">
                      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <p className="text-sm font-medium">No contacts found</p>
                      {(filterType || filterStatus) && (
                        <p className="text-xs">Try clearing the filters</p>
                      )}
                    </div>
                  </td>
                </tr>
              ) : (
                contacts.map(contact => (
                  <tr
                    key={contact.id}
                    onClick={() => navigate(`/dashboard/contacts/${contact.id}`)}
                    className="hover:bg-slate-50 cursor-pointer transition-colors"
                  >
                    {/* Name */}
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center text-xs font-bold shrink-0">
                          {contact.name?.[0]?.toUpperCase() || '?'}
                        </div>
                        <span className="text-sm font-medium text-slate-800 truncate max-w-[120px] sm:max-w-[180px]">
                          {contact.name}
                        </span>
                      </div>
                    </td>

                    {/* Email / Phone */}
                    <td className="px-4 py-3 hidden sm:table-cell">
                      <p className="text-sm text-slate-700 truncate max-w-[180px]">{contact.email}</p>
                      {contact.phone && (
                        <p className="text-xs text-slate-400 mt-0.5">{contact.phone}</p>
                      )}
                    </td>

                    {/* Type */}
                    <td className="px-4 py-3 hidden md:table-cell">
                      <Badge label={contact.type} styleMap={TYPE_STYLES} />
                    </td>

                    {/* Status */}
                    <td className="px-4 py-3">
                      <Badge label={contact.status} styleMap={STATUS_STYLES} />
                    </td>

                    {/* Date */}
                    <td className="px-4 py-3 text-sm text-slate-500 hidden lg:table-cell">
                      {formatDate(contact.created_at)}
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-3 text-right" onClick={e => e.stopPropagation()}>
                      <button
                        onClick={() => setDeleteTarget(contact)}
                        className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                        title="Delete"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
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

      {/* Delete Confirmation Modal */}
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
              <h3 className="text-base font-bold text-slate-800 text-center mb-1">Delete Contact?</h3>
              <p className="text-sm text-slate-500 text-center mb-6">
                Are you sure you want to delete <strong>{deleteTarget.name}</strong>? This action cannot be undone.
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

