import { useEffect, useState, useCallback, useMemo } from 'react'
import {
  adminGetTestimonials,
  adminCreateTestimonial,
  adminUpdateTestimonial,
  adminPatchTestimonial,
  adminDeleteTestimonial,
  adminUploadImage,
} from '../../api'

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [error, setError] = useState('')

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all') // 'all' | 'active' | 'inactive'
  const [sortBy, setSortBy] = useState('order_asc') // 'order_asc' | 'order_desc' | 'name_asc' | 'newest'

  // Modal states: Add / Edit
  const [modalOpen, setModalOpen] = useState(false)
  const [modalMode, setModalMode] = useState('add') // 'add' | 'edit'
  const [editingId, setEditingId] = useState(null)
  const [saving, setSaving] = useState(false)
  const [formErrors, setFormErrors] = useState({})

  // Form Fields
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    company: '',
    quote: '',
    avatar: '',
    sort_order: 0,
    is_active: true,
  })
  const [avatarPreview, setAvatarPreview] = useState('')
  const [uploadingAvatar, setUploadingAvatar] = useState(false)

  // Delete Modal state
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [deletingTarget, setDeletingTarget] = useState(null)
  const [isDeleting, setIsDeleting] = useState(false)

  // View Quote Detail Modal
  const [viewingTarget, setViewingTarget] = useState(null)

  // Quick toggle status loading tracker
  const [togglingId, setTogglingId] = useState(null)

  // Notification Toast
  const [toast, setToast] = useState(null)

  const showToast = (message, type = 'success') => {
    setToast({ message, type })
    setTimeout(() => {
      setToast(null)
    }, 3500)
  }

  // ── Fetch Testimonials ──────────────────────────────────────────
  const fetchTestimonials = useCallback(async (isManualRefresh = false) => {
    if (isManualRefresh) setRefreshing(true)
    else setLoading(true)
    setError('')

    try {
      const res = await adminGetTestimonials()
      const list = Array.isArray(res) ? res : res?.data || []
      setTestimonials(list)
    } catch (err) {
      console.error('Failed to load testimonials:', err)
      setError('Unable to fetch testimonials from the server. Please check the backend connection.')
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }, [])

  useEffect(() => {
    document.title = 'Testimonials | Exim India Admin'
    fetchTestimonials()
  }, [fetchTestimonials])

  // ── Stats Calculations ──────────────────────────────────────────
  const stats = useMemo(() => {
    const total = testimonials.length
    const active = testimonials.filter((t) => t.is_active).length
    const inactive = total - active
    return { total, active, inactive }
  }, [testimonials])

  // ── Filter & Sort Testimonials ──────────────────────────────────
  const filteredTestimonials = useMemo(() => {
    return testimonials
      .filter((item) => {
        // Status filter
        if (statusFilter === 'active' && !item.is_active) return false
        if (statusFilter === 'inactive' && item.is_active) return false

        // Search query
        if (searchQuery.trim()) {
          const query = searchQuery.toLowerCase()
          const nameMatch = item.name?.toLowerCase().includes(query)
          const roleMatch = item.role?.toLowerCase().includes(query)
          const companyMatch = item.company?.toLowerCase().includes(query)
          const quoteMatch = item.quote?.toLowerCase().includes(query)
          if (!nameMatch && !roleMatch && !companyMatch && !quoteMatch) return false
        }
        return true
      })
      .sort((a, b) => {
        if (sortBy === 'order_asc') return (a.sort_order ?? 0) - (b.sort_order ?? 0)
        if (sortBy === 'order_desc') return (b.sort_order ?? 0) - (a.sort_order ?? 0)
        if (sortBy === 'name_asc') return (a.name || '').localeCompare(b.name || '')
        if (sortBy === 'newest') return new Date(b.created_at || 0) - new Date(a.created_at || 0)
        return 0
      })
  }, [testimonials, searchQuery, statusFilter, sortBy])

  // ── Fast Status Toggle ──────────────────────────────────────────
  const handleToggleStatus = async (item) => {
    const newStatus = !item.is_active
    setTogglingId(item.id)

    // Optimistic UI update
    setTestimonials((prev) =>
      prev.map((t) => (t.id === item.id ? { ...t, is_active: newStatus } : t))
    )

    try {
      await adminPatchTestimonial(item.id, { is_active: newStatus })
      showToast(
        `Testimonial by "${item.name}" is now ${newStatus ? 'Active (Visible)' : 'Inactive (Hidden)'}.`
      )
    } catch (err) {
      console.error('Failed to update status:', err)
      // Rollback on failure
      setTestimonials((prev) =>
        prev.map((t) => (t.id === item.id ? { ...t, is_active: !newStatus } : t))
      )
      showToast('Failed to update testimonial status. Please try again.', 'error')
    } finally {
      setTogglingId(null)
    }
  }

  // ── Open Add Modal ──────────────────────────────────────────────
  const handleOpenAdd = () => {
    setModalMode('add')
    setEditingId(null)
    setFormData({
      name: '',
      role: '',
      company: '',
      quote: '',
      avatar: '',
      sort_order: testimonials.length + 1,
      is_active: true,
    })
    setAvatarPreview('')
    setFormErrors({})
    setModalOpen(true)
  }

  // ── Open Edit Modal ─────────────────────────────────────────────
  const handleOpenEdit = (item) => {
    setModalMode('edit')
    setEditingId(item.id)
    setFormData({
      name: item.name || '',
      role: item.role || '',
      company: item.company || '',
      quote: item.quote || '',
      avatar: item.avatar || '',
      sort_order: item.sort_order ?? 0,
      is_active: Boolean(item.is_active),
    })
    setAvatarPreview(item.avatar_url || (item.avatar?.startsWith('http') ? item.avatar : ''))
    setFormErrors({})
    setModalOpen(true)
  }

  // ── Avatar Upload Handler ───────────────────────────────────────
  const handleAvatarFileChange = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate size (max 4MB)
    if (file.size > 4 * 1024 * 1024) {
      setFormErrors((prev) => ({ ...prev, avatar: 'Image file size must be less than 4MB' }))
      return
    }

    setUploadingAvatar(true)
    setFormErrors((prev) => ({ ...prev, avatar: null }))

    try {
      const res = await adminUploadImage(file)
      // res returns { path: 'uploads/...', url: 'http://...' }
      setFormData((prev) => ({ ...prev, avatar: res.path || res.url }))
      setAvatarPreview(res.url || URL.createObjectURL(file))
      showToast('Image uploaded successfully.')
    } catch (err) {
      console.error('Avatar upload failed:', err)
      setFormErrors((prev) => ({
        ...prev,
        avatar: err.message || 'Image upload failed. You can paste an image URL instead.',
      }))
    } finally {
      setUploadingAvatar(false)
    }
  }

  const handleClearAvatar = () => {
    setFormData((prev) => ({ ...prev, avatar: '' }))
    setAvatarPreview('')
  }

  // ── Submit Add / Edit Form ──────────────────────────────────────
  const handleSubmitForm = async (e) => {
    e.preventDefault()

    // Client-side validation
    const errors = {}
    if (!formData.name.trim()) errors.name = 'Client name is required'
    if (!formData.quote.trim()) errors.quote = 'Testimonial quote text is required'

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
      return
    }

    setSaving(true)
    setFormErrors({})

    const payload = {
      name: formData.name.trim(),
      role: formData.role.trim() || null,
      company: formData.company.trim() || null,
      quote: formData.quote.trim(),
      avatar: formData.avatar || null,
      sort_order: parseInt(formData.sort_order, 10) || 0,
      is_active: Boolean(formData.is_active),
    }

    try {
      if (modalMode === 'add') {
        const created = await adminCreateTestimonial(payload)
        setTestimonials((prev) => [...prev, created])
        showToast('Testimonial added successfully!')
      } else {
        const updated = await adminUpdateTestimonial(editingId, payload)
        setTestimonials((prev) =>
          prev.map((t) => (t.id === editingId ? { ...t, ...updated } : t))
        )
        showToast('Testimonial updated successfully!')
      }
      setModalOpen(false)
    } catch (err) {
      console.error('Failed to save testimonial:', err)
      if (err.errors) {
        setFormErrors(err.errors)
      } else {
        setFormErrors({ submit: err.message || 'Failed to save testimonial. Please try again.' })
      }
    } finally {
      setSaving(false)
    }
  }

  // ── Delete Testimonial ──────────────────────────────────────────
  const handleOpenDelete = (item) => {
    setDeletingTarget(item)
    setDeleteModalOpen(true)
  }

  const handleConfirmDelete = async () => {
    if (!deletingTarget || isDeleting) return
    setIsDeleting(true)

    try {
      await adminDeleteTestimonial(deletingTarget.id)
      setTestimonials((prev) => prev.filter((t) => t.id !== deletingTarget.id))
      showToast(`Testimonial from "${deletingTarget.name}" deleted successfully.`)
      setDeleteModalOpen(false)
      setDeletingTarget(null)
    } catch (err) {
      console.error('Failed to delete testimonial:', err)
      showToast('Failed to delete testimonial. Please try again.', 'error')
    } finally {
      setIsDeleting(false)
    }
  }

  // Helper avatar display
  const renderAvatar = (item, sizeClass = 'w-11 h-11') => {
    const avatarSrc = item.avatar_url || (item.avatar?.startsWith('http') ? item.avatar : null)

    if (avatarSrc) {
      return (
        <img
          src={avatarSrc}
          alt={item.name}
          className={`${sizeClass} rounded-full object-cover border border-slate-200 shrink-0 shadow-xs`}
          onError={(e) => {
            // fallback if broken image URL
            e.currentTarget.style.display = 'none'
            if (e.currentTarget.nextSibling) {
              e.currentTarget.nextSibling.style.display = 'flex'
            }
          }}
        />
      )
    }

    const initial = (item.name?.[0] || 'T').toUpperCase()
    return (
      <div
        className={`${sizeClass} rounded-full bg-gradient-to-br from-[#0a3622] to-emerald-800 text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-xs border border-emerald-900/20`}
      >
        {initial}
      </div>
    )
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-6">
      {/* ── 1. Top Header ──────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200/80">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Client Testimonials
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-[#0a3622] border border-emerald-200/60">
              {stats.total} total
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Manage global client endorsements, companies, avatars, quotes, and homepage visibility.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5 self-start sm:self-center">
          <button
            type="button"
            onClick={() => fetchTestimonials(true)}
            disabled={refreshing || loading}
            className="px-3.5 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold border border-slate-200 shadow-xs hover:border-slate-300 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
            title="Refresh testimonials list"
          >
            <svg
              className={`w-4 h-4 text-slate-500 ${refreshing ? 'animate-spin' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            <span className="hidden sm:inline">{refreshing ? 'Refreshing…' : 'Refresh'}</span>
          </button>

          <button
            type="button"
            onClick={handleOpenAdd}
            className="px-4 py-2.5 rounded-xl bg-[#0a3622] hover:bg-[#0f4d30] text-white text-xs sm:text-sm font-bold shadow-sm shadow-[#0a3622]/20 hover:shadow-md transition-all flex items-center gap-2 cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
            </svg>
            <span>Add Testimonial</span>
          </button>
        </div>
      </div>

      {/* ── 2. Stat Metric Cards ───────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Card 1: Total */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0 text-xl border border-slate-200">
            💬
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Total Testimonials
            </p>
            <p className="text-2xl font-extrabold text-slate-900 mt-0.5">
              {loading ? '…' : stats.total}
            </p>
            <p className="text-[11px] text-slate-500 font-medium">Recorded in system</p>
          </div>
        </div>

        {/* Card 2: Active */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 text-xl border border-emerald-100">
            ✨
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-emerald-600">
              Active on Website
            </p>
            <p className="text-2xl font-extrabold text-emerald-900 mt-0.5">
              {loading ? '…' : stats.active}
            </p>
            <p className="text-[11px] text-emerald-700/80 font-medium">Visible in public carousel</p>
          </div>
        </div>

        {/* Card 3: Inactive */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0 text-xl border border-amber-100">
            ⏸️
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-amber-600">
              Hidden / Inactive
            </p>
            <p className="text-2xl font-extrabold text-amber-900 mt-0.5">
              {loading ? '…' : stats.inactive}
            </p>
            <p className="text-[11px] text-amber-700/80 font-medium">Drafted or paused</p>
          </div>
        </div>
      </div>

      {/* ── 3. Filters & Search Toolbar ────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative flex-1">
          <svg
            className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by client name, company, role, or quote keywords…"
            className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#0a3622] focus:border-[#0a3622] transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              ✕
            </button>
          )}
        </div>

        {/* Status & Sort Controls */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Status filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 text-xs sm:text-sm border border-slate-200 rounded-xl text-slate-700 bg-white focus:outline-none focus:ring-1 focus:ring-[#0a3622] cursor-pointer"
          >
            <option value="all">All Statuses ({stats.total})</option>
            <option value="active">Active Only ({stats.active})</option>
            <option value="inactive">Inactive Only ({stats.inactive})</option>
          </select>

          {/* Sort selector */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 text-xs sm:text-sm border border-slate-200 rounded-xl text-slate-700 bg-white focus:outline-none focus:ring-1 focus:ring-[#0a3622] cursor-pointer"
          >
            <option value="order_asc">Display Order (Asc)</option>
            <option value="order_desc">Display Order (Desc)</option>
            <option value="name_asc">Client Name (A–Z)</option>
            <option value="newest">Recently Added</option>
          </select>

          {(searchQuery || statusFilter !== 'all') && (
            <button
              type="button"
              onClick={() => {
                setSearchQuery('')
                setStatusFilter('all')
              }}
              className="px-3 py-2 text-xs text-red-600 hover:text-red-700 hover:bg-red-50 rounded-xl border border-red-200 transition-colors cursor-pointer"
            >
              Reset
            </button>
          )}
        </div>
      </div>

      {/* ── Error Banner ───────────────────────────────────────────── */}
      {error && (
        <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-center justify-between">
          <span>{error}</span>
          <button
            onClick={() => fetchTestimonials(true)}
            className="underline font-bold text-red-800 cursor-pointer text-xs"
          >
            Try Again
          </button>
        </div>
      )}

      {/* ── 4. Main Testimonials Table & Card Views ────────────────── */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs overflow-hidden">
        {loading ? (
          // Loading Skeleton
          <div className="p-6 space-y-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl animate-pulse">
                <div className="w-12 h-12 bg-slate-200 rounded-full shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="w-48 h-4 bg-slate-200 rounded" />
                  <div className="w-72 h-3 bg-slate-200 rounded" />
                </div>
                <div className="w-20 h-6 bg-slate-200 rounded" />
              </div>
            ))}
          </div>
        ) : filteredTestimonials.length === 0 ? (
          // Empty State
          <div className="py-16 px-4 text-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-800 flex items-center justify-center mx-auto text-2xl border border-emerald-100">
              💬
            </div>
            <div>
              <p className="text-base font-bold text-slate-800">No Testimonials Found</p>
              <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
                {searchQuery || statusFilter !== 'all'
                  ? 'No testimonials matched your search or status filter. Try clearing your filters.'
                  : 'No client testimonials have been added yet. Add your first customer review now!'}
              </p>
            </div>
            {searchQuery || statusFilter !== 'all' ? (
              <button
                onClick={() => {
                  setSearchQuery('')
                  setStatusFilter('all')
                }}
                className="px-4 py-2 text-xs font-bold text-[#0a3622] bg-emerald-50 rounded-xl hover:bg-emerald-100 transition-colors cursor-pointer"
              >
                Clear all filters
              </button>
            ) : (
              <button
                onClick={handleOpenAdd}
                className="px-4 py-2.5 rounded-xl bg-[#0a3622] text-white text-xs font-bold hover:bg-[#0f4d30] transition-colors cursor-pointer inline-flex items-center gap-2"
              >
                <span>+ Add First Testimonial</span>
              </button>
            )}
          </div>
        ) : (
          // Responsive Table View
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200/80 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  <th className="py-3.5 px-4 sm:px-6">Order</th>
                  <th className="py-3.5 px-4">Client</th>
                  <th className="py-3.5 px-4 hidden md:table-cell">Company & Designation</th>
                  <th className="py-3.5 px-4">Quote Preview</th>
                  <th className="py-3.5 px-4 text-center">Status</th>
                  <th className="py-3.5 px-4 sm:px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {filteredTestimonials.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-slate-50/60 transition-colors group"
                  >
                    {/* Display Order */}
                    <td className="py-4 px-4 sm:px-6 shrink-0">
                      <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-slate-100 font-bold text-xs text-slate-700 border border-slate-200">
                        {item.sort_order ?? 0}
                      </span>
                    </td>

                    {/* Client Name + Avatar */}
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        {renderAvatar(item)}
                        <div className="min-w-0">
                          <p className="font-bold text-slate-900 group-hover:text-[#0a3622] transition-colors">
                            {item.name}
                          </p>
                          <p className="text-[11px] text-slate-500 truncate md:hidden">
                            {item.company || item.role || '—'}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Company & Role (Desktop) */}
                    <td className="py-4 px-4 hidden md:table-cell max-w-xs">
                      <p className="font-medium text-slate-800 text-xs truncate">
                        {item.company || '—'}
                      </p>
                      <p className="text-[11px] text-slate-400 truncate mt-0.5">
                        {item.role || 'Client'}
                      </p>
                    </td>

                    {/* Quote preview */}
                    <td className="py-4 px-4 max-w-xs sm:max-w-md">
                      <p className="text-xs text-slate-600 line-clamp-2 italic leading-relaxed">
                        “{item.quote}”
                      </p>
                      <button
                        type="button"
                        onClick={() => setViewingTarget(item)}
                        className="text-[10px] text-emerald-700 hover:text-emerald-900 font-bold mt-1 cursor-pointer hover:underline inline-block"
                      >
                        Read full &rarr;
                      </button>
                    </td>

                    {/* Status Toggle Switch */}
                    <td className="py-4 px-4 text-center">
                      <button
                        type="button"
                        onClick={() => handleToggleStatus(item)}
                        disabled={togglingId === item.id}
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                          item.is_active
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/80 hover:bg-emerald-100'
                            : 'bg-slate-100 text-slate-500 border border-slate-200 hover:bg-slate-200'
                        }`}
                        title="Click to toggle Active / Inactive status"
                      >
                        <span
                          className={`w-2 h-2 rounded-full ${
                            item.is_active ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'
                          }`}
                        />
                        <span>{item.is_active ? 'Active' : 'Inactive'}</span>
                      </button>
                    </td>

                    {/* Actions: Edit, Delete */}
                    <td className="py-4 px-4 sm:px-6 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleOpenEdit(item)}
                          className="p-2 text-slate-600 hover:text-[#0a3622] hover:bg-emerald-50 rounded-lg transition-colors cursor-pointer"
                          title="Edit Testimonial"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                            />
                          </svg>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleOpenDelete(item)}
                          className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                          title="Delete Testimonial"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ── 5. Add / Edit Testimonial Modal ────────────────────────── */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto"
          onClick={() => !saving && setModalOpen(false)}
        >
          <div
            className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-xl w-full p-6 sm:p-7 relative my-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                  {modalMode === 'add' ? 'Add Client Testimonial' : 'Edit Testimonial'}
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  {modalMode === 'add'
                    ? 'Publish a new client review to display on the storefront.'
                    : 'Modify client information, quote content, or display order.'}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                disabled={saving}
                className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Error banner */}
            {formErrors.submit && (
              <div className="mt-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs">
                {formErrors.submit}
              </div>
            )}

            {/* Modal Form */}
            <form onSubmit={handleSubmitForm} className="mt-5 space-y-4">
              {/* Row 1: Client Name */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Client Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., Dr. Amira El-Sayed"
                  className={`w-full px-3.5 py-2.5 text-sm rounded-xl border bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#0a3622] transition-colors ${
                    formErrors.name ? 'border-red-400 ring-1 ring-red-300' : 'border-slate-200'
                  }`}
                />
                {formErrors.name && (
                  <p className="text-[11px] text-red-500 mt-1">{formErrors.name}</p>
                )}
              </div>

              {/* Row 2: Designation & Company Split */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Job Title / Designation
                  </label>
                  <input
                    type="text"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    placeholder="e.g., Head of Formulations & QA"
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#0a3622] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Company / Organization
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="e.g., Gulf Confectionery Ltd. (Dubai)"
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#0a3622] transition-colors"
                  />
                </div>
              </div>

              {/* Row 3: Quote Text */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Testimonial Quote <span className="text-red-500">*</span>
                  </label>
                  <span className="text-[10px] text-slate-400 font-semibold">
                    {formData.quote.length} characters
                  </span>
                </div>
                <textarea
                  required
                  rows={4}
                  value={formData.quote}
                  onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                  placeholder="Paste or write the client's detailed review or endorsement..."
                  className={`w-full px-3.5 py-2.5 text-sm rounded-xl border bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#0a3622] transition-colors ${
                    formErrors.quote ? 'border-red-400 ring-1 ring-red-300' : 'border-slate-200'
                  }`}
                />
                {formErrors.quote && (
                  <p className="text-[11px] text-red-500 mt-1">{formErrors.quote}</p>
                )}
              </div>

              {/* Row 4: Avatar Photo / Image */}
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Client Avatar / Photo
                  </label>
                  {avatarPreview && (
                    <button
                      type="button"
                      onClick={handleClearAvatar}
                      className="text-[10px] text-red-600 hover:text-red-800 font-bold cursor-pointer"
                    >
                      Remove photo
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-4">
                  {/* Photo Preview */}
                  <div className="relative shrink-0">
                    {avatarPreview ? (
                      <img
                        src={avatarPreview}
                        alt="Preview"
                        className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-md"
                      />
                    ) : (
                      <div className="w-14 h-14 rounded-full bg-slate-200 text-slate-400 flex items-center justify-center font-bold text-base border-2 border-white shadow-inner">
                        👤
                      </div>
                    )}
                  </div>

                  {/* Upload controls */}
                  <div className="flex-1 space-y-2">
                    <label className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white border border-slate-300 hover:border-slate-400 text-slate-700 text-xs font-semibold shadow-xs transition-colors cursor-pointer">
                      <svg className="w-3.5 h-3.5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                      </svg>
                      <span>{uploadingAvatar ? 'Uploading image…' : 'Upload Image File'}</span>
                      <input
                        type="file"
                        accept="image/png, image/jpeg, image/webp, image/jpg"
                        onChange={handleAvatarFileChange}
                        disabled={uploadingAvatar}
                        className="hidden"
                      />
                    </label>
                    <p className="text-[10px] text-slate-400">
                      PNG, JPG, or WEBP up to 4MB. Or enter an image URL below:
                    </p>
                  </div>
                </div>

                {/* Alternative: direct URL input */}
                <div>
                  <input
                    type="text"
                    value={formData.avatar}
                    onChange={(e) => {
                      setFormData({ ...formData, avatar: e.target.value })
                      setAvatarPreview(e.target.value)
                    }}
                    placeholder="Or enter direct image URL (https://...)"
                    className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-1 focus:ring-[#0a3622]"
                  />
                  {formErrors.avatar && (
                    <p className="text-[11px] text-red-500 mt-1">{formErrors.avatar}</p>
                  )}
                </div>
              </div>

              {/* Row 5: Sort Order & Is Active toggle */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center pt-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Display Sort Order
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formData.sort_order}
                    onChange={(e) => setFormData({ ...formData, sort_order: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#0a3622]"
                  />
                  <p className="text-[10px] text-slate-400 mt-1">Lower numbers appear first on the site</p>
                </div>

                <div className="sm:pt-2">
                  <label className="flex items-center gap-3 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={formData.is_active}
                      onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                      className="w-4 h-4 text-[#0a3622] rounded border-slate-300 focus:ring-[#0a3622] cursor-pointer"
                    />
                    <div>
                      <span className="text-xs font-bold text-slate-800">
                        Active (Visible on Website)
                      </span>
                      <p className="text-[10px] text-slate-400">
                        Uncheck to keep as draft or hide from visitors
                      </p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Modal Action Buttons */}
              <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  disabled={saving}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving || uploadingAvatar}
                  className="px-5 py-2.5 rounded-xl bg-[#0a3622] hover:bg-[#0f4d30] text-white text-xs sm:text-sm font-bold shadow-sm shadow-[#0a3622]/20 hover:shadow-md transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {saving && (
                    <svg className="w-4 h-4 animate-spin text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  )}
                  <span>
                    {saving
                      ? 'Saving…'
                      : modalMode === 'add'
                      ? 'Create Testimonial'
                      : 'Save Changes'}
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── 6. Delete Confirmation Modal ───────────────────────────── */}
      {deleteModalOpen && deletingTarget && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs"
          onClick={() => !isDeleting && setDeleteModalOpen(false)}
        >
          <div
            className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-md w-full p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center text-xl mx-auto border border-red-100">
              ⚠️
            </div>

            <div className="text-center mt-3.5 space-y-1.5">
              <h3 className="text-base sm:text-lg font-bold text-slate-900">
                Delete Testimonial?
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Are you sure you want to delete the testimonial from{' '}
                <strong className="text-slate-800 font-semibold">{deletingTarget.name}</strong>
                {deletingTarget.company ? ` (${deletingTarget.company})` : ''}? This will remove it from the public homepage carousel.
              </p>
            </div>

            <div className="flex items-center justify-center gap-3 mt-6">
              <button
                type="button"
                onClick={() => setDeleteModalOpen(false)}
                disabled={isDeleting}
                className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-50 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                disabled={isDeleting}
                className="flex-1 px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                {isDeleting ? 'Deleting…' : 'Yes, Delete'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── 7. View Quote Detail Modal ─────────────────────────────── */}
      {viewingTarget && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs"
          onClick={() => setViewingTarget(null)}
        >
          <div
            className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-lg w-full p-6 sm:p-7 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3.5">
                {renderAvatar(viewingTarget, 'w-12 h-12')}
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    {viewingTarget.name}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {viewingTarget.role ? `${viewingTarget.role} • ` : ''}
                    {viewingTarget.company || ''}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setViewingTarget(null)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                ✕
              </button>
            </div>

            <div className="my-5 p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <p className="text-sm text-slate-700 italic leading-relaxed">
                “{viewingTarget.quote}”
              </p>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400 pt-3 border-t border-slate-100">
              <span>Display Order: #{viewingTarget.sort_order ?? 0}</span>
              <span
                className={`font-bold ${
                  viewingTarget.is_active ? 'text-emerald-700' : 'text-slate-400'
                }`}
              >
                {viewingTarget.is_active ? '● Active on site' : '○ Inactive'}
              </span>
            </div>

            <div className="mt-5 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => {
                  const target = viewingTarget
                  setViewingTarget(null)
                  handleOpenEdit(target)
                }}
                className="px-4 py-2 rounded-xl bg-[#0a3622] text-white text-xs font-bold hover:bg-[#0f4d30] cursor-pointer"
              >
                Edit Testimonial
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── 8. Notification Toast ──────────────────────────────────── */}
      {toast && (
        <div
          className={`fixed bottom-6 right-6 z-50 px-4 py-3 rounded-2xl shadow-xl border text-xs sm:text-sm font-semibold flex items-center gap-2.5 transition-all animate-bounce ${
            toast.type === 'error'
              ? 'bg-red-50 text-red-800 border-red-200'
              : 'bg-[#0a3622] text-white border-emerald-900 shadow-emerald-950/20'
          }`}
        >
          <span>{toast.type === 'error' ? '⚠️' : '✅'}</span>
          <span>{toast.message}</span>
        </div>
      )}
    </div>
  )
}
