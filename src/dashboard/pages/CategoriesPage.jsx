/**
 * Admin category manager (GET/POST/PUT/DELETE /admin/categories).
 * These categories drive the public navbar, footer, home page and product pages.
 */

import { useState, useEffect, useCallback, useRef } from 'react'
import {
  adminGetCategories,
  adminCreateCategory,
  adminUpdateCategory,
  adminDeleteCategory,
  adminUploadImage,
} from '../../api'

const slugify = (value) =>
  (value || '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')

const EMPTY = {
  name: '',
  slug: '',
  description: '',
  image: '',
  nav_label: '',
  show_in_nav: true,
  is_active: true,
  sort_order: '',
}

const inputCls =
  'w-full text-sm px-3 py-2 rounded-xl border border-slate-300 bg-white focus:outline-none focus:border-[#0a3622] focus:ring-1 focus:ring-[#0a3622]'

export default function CategoriesPage() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [editing, setEditing] = useState(null) // null | { slug: string|null, form, imageUrl }
  const [errors, setErrors] = useState({})
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [slugTouched, setSlugTouched] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const fileRef = useRef(null)

  const load = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const res = await adminGetCategories()
      setCategories(Array.isArray(res) ? res : res?.data || [])
    } catch (err) {
      setError(err.message || 'Failed to load categories.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    document.title = 'Categories | Exim India Admin'
    load()
  }, [load])

  const openNew = () => {
    setErrors({})
    setSlugTouched(false)
    setEditing({ slug: null, form: { ...EMPTY, sort_order: categories.length + 1 }, imageUrl: '' })
  }

  const openEdit = (c) => {
    setErrors({})
    setSlugTouched(true)
    setEditing({
      slug: c.slug,
      imageUrl: c.image_url || '',
      form: {
        name: c.name || '',
        slug: c.slug || '',
        description: c.description || '',
        image: c.image || '',
        nav_label: c.nav_label || '',
        show_in_nav: Boolean(c.show_in_nav),
        is_active: Boolean(c.is_active),
        sort_order: c.sort_order ?? '',
      },
    })
  }

  const setField = (field, value) => {
    setEditing((prev) => {
      const form = { ...prev.form, [field]: value }
      if (field === 'name' && !slugTouched && !prev.slug) form.slug = slugify(value)
      return { ...prev, form }
    })
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  const handleUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    try {
      const res = await adminUploadImage(file)
      setEditing((prev) => ({ ...prev, imageUrl: res.url, form: { ...prev.form, image: res.path } }))
    } catch (err) {
      setErrors({ image: err.message || 'Image upload failed.' })
    } finally {
      setUploading(false)
      if (fileRef.current) fileRef.current.value = ''
    }
  }

  const handleSave = async (e) => {
    e.preventDefault()
    const { form, slug } = editing
    const nextErrors = {}
    if (!form.name.trim()) nextErrors.name = 'Name is required.'
    if (!form.slug.trim()) nextErrors.slug = 'Slug is required.'
    if (Object.keys(nextErrors).length) return setErrors(nextErrors)

    const payload = {
      name: form.name.trim(),
      slug: form.slug.trim(),
      description: form.description.trim() || null,
      image: form.image || null,
      nav_label: form.nav_label.trim() || null,
      show_in_nav: form.show_in_nav,
      is_active: form.is_active,
      sort_order: form.sort_order === '' ? 0 : Number(form.sort_order),
    }

    setSaving(true)
    try {
      if (slug) await adminUpdateCategory(slug, payload)
      else await adminCreateCategory(payload)
      setEditing(null)
      load()
    } catch (err) {
      if (err.status === 422 && err.errors) {
        setErrors(Object.fromEntries(Object.entries(err.errors).map(([k, v]) => [k, v[0]])))
      } else {
        setErrors({ form: err.message || 'Could not save the category.' })
      }
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    try {
      await adminDeleteCategory(deleteTarget.slug)
      setDeleteTarget(null)
      load()
    } catch (err) {
      setError(err.message || 'Could not delete the category.')
      setDeleteTarget(null)
    }
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl w-full mx-auto space-y-5">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Categories</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Shown in the website menu, footer, home page and the Products page.
          </p>
        </div>
        <button
          type="button"
          onClick={openNew}
          className="px-4 py-2 rounded-xl bg-[#0a3622] hover:bg-[#0f4d30] text-white text-xs font-bold shadow-sm cursor-pointer"
        >
          + Add Category
        </button>
      </div>

      {error && (
        <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs">{error}</div>
      )}

      <div className="bg-white border border-slate-200 rounded-2xl overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[10px]">
            <tr>
              <th className="px-4 py-3 font-bold">Category</th>
              <th className="px-4 py-3 font-bold">Products</th>
              <th className="px-4 py-3 font-bold">Visibility</th>
              <th className="px-4 py-3 font-bold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {loading && (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-slate-400">
                  Loading…
                </td>
              </tr>
            )}
            {!loading && categories.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-10 text-center text-slate-500">
                  No categories yet.
                </td>
              </tr>
            )}
            {categories.map((c) => (
              <tr key={c.id} className="hover:bg-slate-50/60">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <span className="w-10 h-10 rounded-lg bg-slate-100 border border-slate-200 overflow-hidden flex items-center justify-center shrink-0">
                      {c.image_url ? (
                        <img src={c.image_url} alt="" className="w-full h-full object-cover" loading="lazy" />
                      ) : (
                        <span className="text-slate-400 font-black">{c.name.charAt(0)}</span>
                      )}
                    </span>
                    <div className="min-w-0">
                      <div className="font-bold text-slate-900 truncate">{c.name}</div>
                      <div className="text-[11px] text-slate-400 truncate">/products/{c.slug}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-slate-700">{c.products_count ?? 0}</td>
                <td className="px-4 py-3 space-x-1.5">
                  <span
                    className={`px-2 py-1 rounded-full text-[10px] font-bold ring-1 ${
                      c.is_active
                        ? 'bg-emerald-50 text-emerald-700 ring-emerald-200'
                        : 'bg-slate-100 text-slate-600 ring-slate-200'
                    }`}
                  >
                    {c.is_active ? 'Active' : 'Hidden'}
                  </span>
                  {c.is_active && !c.show_in_nav && (
                    <span className="px-2 py-1 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 ring-1 ring-amber-200">
                      Not in menu
                    </span>
                  )}
                </td>
                <td className="px-4 py-3 text-right whitespace-nowrap">
                  <button
                    type="button"
                    onClick={() => openEdit(c)}
                    className="text-[#0a3622] font-bold hover:underline mr-3 cursor-pointer"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeleteTarget(c)}
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

      {/* Create / edit modal */}
      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60">
          <form
            onSubmit={handleSave}
            className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6 space-y-4 shadow-2xl"
          >
            <h2 className="text-base font-extrabold text-slate-900">
              {editing.slug ? 'Edit Category' : 'New Category'}
            </h2>

            {errors.form && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs">
                {errors.form}
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Name *</label>
              <input className={inputCls} value={editing.form.name} onChange={(e) => setField('name', e.target.value)} />
              {errors.name && <p className="text-[11px] text-red-600 mt-1">{errors.name}</p>}
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Slug (URL) *</label>
              <input
                className={inputCls}
                value={editing.form.slug}
                onChange={(e) => {
                  setSlugTouched(true)
                  setField('slug', slugify(e.target.value))
                }}
              />
              {errors.slug && <p className="text-[11px] text-red-600 mt-1">{errors.slug}</p>}
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Description</label>
              <textarea
                rows={3}
                className={inputCls}
                value={editing.form.description}
                onChange={(e) => setField('description', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Menu label (optional)</label>
              <input
                className={inputCls}
                value={editing.form.nav_label}
                onChange={(e) => setField('nav_label', e.target.value)}
                placeholder="Defaults to the category name"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Image</label>
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 rounded-xl bg-slate-100 border border-slate-200 overflow-hidden flex items-center justify-center">
                  {editing.imageUrl ? (
                    <img src={editing.imageUrl} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-[10px] text-slate-400">None</span>
                  )}
                </div>
                <input ref={fileRef} type="file" accept="image/*" onChange={handleUpload} className="hidden" />
                <button
                  type="button"
                  disabled={uploading}
                  onClick={() => fileRef.current?.click()}
                  className="px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-60 cursor-pointer"
                >
                  {uploading ? 'Uploading…' : editing.imageUrl ? 'Replace' : 'Upload'}
                </button>
                {editing.imageUrl && (
                  <button
                    type="button"
                    onClick={() => setEditing((prev) => ({ ...prev, imageUrl: '', form: { ...prev.form, image: '' } }))}
                    className="text-xs font-bold text-red-600 hover:underline cursor-pointer"
                  >
                    Remove
                  </button>
                )}
              </div>
              {errors.image && <p className="text-[11px] text-red-600 mt-1">{errors.image}</p>}
            </div>

            <div className="flex flex-wrap items-center gap-5">
              <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={editing.form.is_active}
                  onChange={(e) => setField('is_active', e.target.checked)}
                  className="w-4 h-4 accent-[#0a3622]"
                />
                Active
              </label>
              <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={editing.form.show_in_nav}
                  onChange={(e) => setField('show_in_nav', e.target.checked)}
                  className="w-4 h-4 accent-[#0a3622]"
                />
                Show in menu
              </label>
              <label className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                Order
                <input
                  type="number"
                  min="0"
                  className={`${inputCls} w-20`}
                  value={editing.form.sort_order}
                  onChange={(e) => setField('sort_order', e.target.value)}
                />
              </label>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setEditing(null)}
                disabled={saving}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving || uploading}
                className="px-5 py-2 rounded-xl bg-[#0a3622] hover:bg-[#0f4d30] text-white text-xs font-bold disabled:opacity-60 cursor-pointer"
              >
                {saving ? 'Saving…' : 'Save'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Delete confirmation */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-3">
            <h2 className="text-base font-extrabold text-slate-900">Delete “{deleteTarget.name}”?</h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              {deleteTarget.products_count > 0
                ? `This also permanently deletes its ${deleteTarget.products_count} product${deleteTarget.products_count === 1 ? '' : 's'}. To keep them, set the category to hidden instead.`
                : 'This cannot be undone.'}
            </p>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
