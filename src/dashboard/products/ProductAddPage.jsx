/**
 * Create / edit a product through the admin API
 * (POST /admin/products, PUT /admin/products/{id}).
 * Category choices come from GET /admin/categories; nothing is pre-filled
 * with sample values.
 */

import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {
  adminGetCategories,
  adminGetProduct,
  adminCreateProduct,
  adminUpdateProduct,
  adminUploadImage,
} from '../../api'

/** Optional product columns (backend snake_case) grouped for the form. */
const FIELD_GROUPS = [
  {
    title: 'Identification',
    fields: [
      ['cas_no', 'CAS No.'],
      ['mf', 'Molecular Formula'],
      ['einecs_no', 'EINECS No.'],
      ['fema_no', 'FEMA No.'],
      ['types', 'Type'],
      ['grade', 'Grade'],
      ['purity', 'Purity'],
      ['color_desc', 'Appearance'],
      ['brand_name', 'Brand Name'],
      ['model_number', 'Model Number'],
      ['other_names', 'Other Names', 'textarea'],
    ],
  },
  {
    title: 'Trade & logistics',
    fields: [
      ['moq', 'Minimum Order Quantity'],
      ['supply_ability', 'Supply Ability'],
      ['port', 'Port'],
      ['place_of_origin', 'Place of Origin'],
      ['shelf_life', 'Shelf Life'],
      ['delivery_detail', 'Delivery Detail'],
      ['packaging_details', 'Packaging Details', 'textarea'],
      ['storage', 'Storage', 'textarea'],
      ['application_summary', 'Applications', 'textarea'],
    ],
  },
]

const TEXT_KEYS = [
  'name', 'slug', 'short_name', 'tagline', 'group_key', 'group_name', 'description', 'usage_guide',
  ...FIELD_GROUPS.flatMap((g) => g.fields.map(([key]) => key)),
]

const slugify = (value) =>
  (value || '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')

const emptyForm = () => ({
  category_id: '',
  ...Object.fromEntries(TEXT_KEYS.map((k) => [k, ''])),
  image: '',
  sort_order: '',
  is_active: true,
  is_featured: false,
})

const inputCls =
  'w-full text-sm px-3 py-2 rounded-xl border border-slate-300 bg-white focus:outline-none focus:border-[#0a3622] focus:ring-1 focus:ring-[#0a3622] disabled:opacity-60'

function Field({ label, error, required, children, className = '' }) {
  return (
    <div className={className}>
      <label className="block text-xs font-bold text-slate-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children}
      {error && <p className="text-[11px] text-red-600 mt-1">{error}</p>}
    </div>
  )
}

function Card({ title, hint, children }) {
  return (
    <section className="bg-white border border-slate-200 rounded-2xl p-5 space-y-4">
      <div>
        <h2 className="text-sm font-extrabold text-slate-900">{title}</h2>
        {hint && <p className="text-[11px] text-slate-500 mt-0.5">{hint}</p>}
      </div>
      {children}
    </section>
  )
}

/** Editable list of two-column rows (analysis specs / detail attributes). */
function RowsEditor({ rows, onChange, keyLabel, valueLabel }) {
  const update = (i, field, value) =>
    onChange(rows.map((r, idx) => (idx === i ? { ...r, [field]: value } : r)))

  return (
    <div className="space-y-2">
      {rows.map((row, i) => (
        <div key={i} className="grid grid-cols-1 sm:grid-cols-[1fr_1fr_auto] gap-2">
          <input
            className={inputCls}
            placeholder={keyLabel}
            value={row.key}
            onChange={(e) => update(i, 'key', e.target.value)}
          />
          <input
            className={inputCls}
            placeholder={valueLabel}
            value={row.value}
            onChange={(e) => update(i, 'value', e.target.value)}
          />
          <button
            type="button"
            onClick={() => onChange(rows.filter((_, idx) => idx !== i))}
            className="px-3 text-red-600 text-xs font-bold hover:bg-red-50 rounded-xl cursor-pointer"
            aria-label="Remove row"
          >
            ✕
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => onChange([...rows, { key: '', value: '' }])}
        className="text-xs font-bold text-[#0a3622] hover:underline cursor-pointer"
      >
        + Add row
      </button>
    </div>
  )
}

export default function ProductAddPage({ isEdit = false }) {
  const navigate = useNavigate()
  const { id } = useParams()

  const [form, setForm] = useState(emptyForm)
  const [imageUrl, setImageUrl] = useState('')
  const [analysis, setAnalysis] = useState([])
  const [attributes, setAttributes] = useState([])
  const [extraText, setExtraText] = useState('')
  const [categories, setCategories] = useState([])
  const [slugTouched, setSlugTouched] = useState(isEdit)
  const [loading, setLoading] = useState(isEdit)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [errors, setErrors] = useState({})
  const [formError, setFormError] = useState('')
  const fileRef = useRef(null)

  useEffect(() => {
    document.title = `${isEdit ? 'Edit' : 'New'} Product | Exim India Admin`
  }, [isEdit])

  useEffect(() => {
    adminGetCategories()
      .then((res) => setCategories(Array.isArray(res) ? res : res?.data || []))
      .catch(() => setFormError('Could not load categories.'))
  }, [])

  // Edit mode: load the product
  useEffect(() => {
    if (!isEdit) return undefined
    let active = true
    setLoading(true)
    adminGetProduct(id)
      .then((p) => {
        if (!active) return
        const next = emptyForm()
        Object.keys(next).forEach((k) => {
          if (p[k] !== null && p[k] !== undefined) next[k] = p[k]
        })
        next.sort_order = p.sort_order ?? ''
        setForm(next)
        setImageUrl(p.image_url || '')
        setAnalysis((p.analysis_specs || []).map((s) => ({ key: s.characteristic, value: s.requirement })))
        setAttributes((p.detail_attributes || []).map((a) => ({ key: a.label, value: a.value })))
        setExtraText(p.extra && Object.keys(p.extra).length ? JSON.stringify(p.extra, null, 2) : '')
      })
      .catch((err) => active && setFormError(err.message || 'Could not load the product.'))
      .finally(() => active && setLoading(false))
    return () => {
      active = false
    }
  }, [isEdit, id])

  const set = (field, value) => {
    setForm((prev) => {
      const next = { ...prev, [field]: value }
      if (field === 'name' && !slugTouched) next.slug = slugify(value)
      return next
    })
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  const handleUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    setFormError('')
    try {
      const res = await adminUploadImage(file)
      set('image', res.path)
      setImageUrl(res.url)
    } catch (err) {
      setFormError(err.message || 'Image upload failed.')
    } finally {
      setUploading(false)
      if (fileRef.current) fileRef.current.value = ''
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormError('')

    const nextErrors = {}
    if (!form.category_id) nextErrors.category_id = 'Choose a category.'
    if (!form.name.trim()) nextErrors.name = 'Name is required.'
    if (!form.slug.trim()) nextErrors.slug = 'Slug is required.'

    let extra = null
    if (extraText.trim()) {
      try {
        extra = JSON.parse(extraText)
        if (!extra || typeof extra !== 'object' || Array.isArray(extra)) throw new Error()
      } catch {
        nextErrors.extra = 'Must be a valid JSON object, e.g. {"certificates": ["ISO"]}.'
      }
    }
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors)
      return
    }

    const payload = {
      category_id: Number(form.category_id),
      image: form.image || null,
      sort_order: form.sort_order === '' ? 0 : Number(form.sort_order),
      is_active: form.is_active,
      is_featured: form.is_featured,
      extra,
      analysis: analysis
        .filter((r) => r.key.trim() && r.value.trim())
        .map((r) => ({ characteristic: r.key.trim(), requirement: r.value.trim() })),
      attributes: attributes
        .filter((r) => r.key.trim() && r.value.trim())
        .map((r) => ({ label: r.key.trim(), value: r.value.trim() })),
    }
    TEXT_KEYS.forEach((k) => {
      const v = String(form[k] ?? '').trim()
      payload[k] = k === 'name' || k === 'slug' ? v : v || null
    })

    setSaving(true)
    try {
      const saved = isEdit ? await adminUpdateProduct(id, payload) : await adminCreateProduct(payload)
      navigate(`/dashboard/products/${saved.id}`)
    } catch (err) {
      if (err.status === 422 && err.errors) {
        setErrors(
          Object.fromEntries(Object.entries(err.errors).map(([k, v]) => [k.split('.')[0], v[0]])),
        )
      }
      setFormError(err.message || 'Could not save the product.')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="p-8 flex justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-900" />
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 sm:p-6 lg:p-8 max-w-4xl w-full mx-auto space-y-5">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            {isEdit ? 'Edit Product' : 'New Product'}
          </h1>
          <Link to="/dashboard/products" className="text-xs text-slate-500 hover:text-slate-800">
            ← Back to products
          </Link>
        </div>
        <button
          type="submit"
          disabled={saving || uploading}
          className="px-5 py-2.5 rounded-xl bg-[#0a3622] hover:bg-[#0f4d30] text-white text-xs font-bold shadow-sm disabled:opacity-60 cursor-pointer"
        >
          {saving ? 'Saving…' : isEdit ? 'Save Changes' : 'Create Product'}
        </button>
      </div>

      {formError && (
        <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs">{formError}</div>
      )}

      <Card title="Basics">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Category" required error={errors.category_id}>
            <select
              className={inputCls}
              value={form.category_id}
              onChange={(e) => set('category_id', e.target.value)}
            >
              <option value="">Select a category…</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Name" required error={errors.name}>
            <input className={inputCls} value={form.name} onChange={(e) => set('name', e.target.value)} />
          </Field>
          <Field label="Slug (URL)" required error={errors.slug}>
            <input
              className={inputCls}
              value={form.slug}
              onChange={(e) => {
                setSlugTouched(true)
                set('slug', slugify(e.target.value))
              }}
            />
          </Field>
          <Field label="Short name" error={errors.short_name}>
            <input className={inputCls} value={form.short_name} onChange={(e) => set('short_name', e.target.value)} />
          </Field>
          <Field label="Tagline" error={errors.tagline} className="sm:col-span-2">
            <input className={inputCls} value={form.tagline} onChange={(e) => set('tagline', e.target.value)} />
          </Field>
          <Field label="Group label" error={errors.group_name}>
            <input
              className={inputCls}
              value={form.group_name}
              onChange={(e) => set('group_name', e.target.value)}
              placeholder="Shown on the filter chip"
            />
          </Field>
          <Field label="Group key" error={errors.group_key}>
            <input
              className={inputCls}
              value={form.group_key}
              onChange={(e) => set('group_key', e.target.value)}
              placeholder="Products sharing a key are grouped"
            />
          </Field>
          <Field label="Description" error={errors.description} className="sm:col-span-2">
            <textarea
              rows={4}
              className={inputCls}
              value={form.description}
              onChange={(e) => set('description', e.target.value)}
            />
          </Field>
          <Field label="Usage guide" error={errors.usage_guide} className="sm:col-span-2">
            <textarea
              rows={3}
              className={inputCls}
              value={form.usage_guide}
              onChange={(e) => set('usage_guide', e.target.value)}
            />
          </Field>
        </div>
      </Card>

      <Card title="Image" hint="JPG, PNG or WebP up to 4 MB.">
        <div className="flex items-center gap-4">
          <div className="w-24 h-24 rounded-xl bg-slate-100 border border-slate-200 overflow-hidden flex items-center justify-center">
            {imageUrl ? (
              <img src={imageUrl} alt="" className="w-full h-full object-cover" />
            ) : (
              <span className="text-[11px] text-slate-400">No image</span>
            )}
          </div>
          <div className="space-x-3">
            <input ref={fileRef} type="file" accept="image/*" onChange={handleUpload} className="hidden" />
            <button
              type="button"
              disabled={uploading}
              onClick={() => fileRef.current?.click()}
              className="px-4 py-2 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-60 cursor-pointer"
            >
              {uploading ? 'Uploading…' : imageUrl ? 'Replace image' : 'Upload image'}
            </button>
            {imageUrl && (
              <button
                type="button"
                onClick={() => {
                  set('image', '')
                  setImageUrl('')
                }}
                className="text-xs font-bold text-red-600 hover:underline cursor-pointer"
              >
                Remove
              </button>
            )}
          </div>
        </div>
        {errors.image && <p className="text-[11px] text-red-600">{errors.image}</p>}
      </Card>

      {FIELD_GROUPS.map((group) => (
        <Card key={group.title} title={group.title} hint="Leave blank to hide a field on the public page.">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {group.fields.map(([key, label, kind]) => (
              <Field
                key={key}
                label={label}
                error={errors[key]}
                className={kind === 'textarea' ? 'sm:col-span-2' : ''}
              >
                {kind === 'textarea' ? (
                  <textarea
                    rows={2}
                    className={inputCls}
                    value={form[key]}
                    onChange={(e) => set(key, e.target.value)}
                  />
                ) : (
                  <input className={inputCls} value={form[key]} onChange={(e) => set(key, e.target.value)} />
                )}
              </Field>
            ))}
          </div>
        </Card>
      ))}

      <Card title="Quality analysis" hint="Parameter / requirement rows. Leave empty to inherit the category's specification table.">
        <RowsEditor rows={analysis} onChange={setAnalysis} keyLabel="Parameter" valueLabel="Requirement" />
      </Card>

      <Card title="Extra details" hint="Any additional label/value pairs shown in the specification table (e.g. C.I. No., E Number).">
        <RowsEditor rows={attributes} onChange={setAttributes} keyLabel="Label" valueLabel="Value" />
      </Card>

      <Card title="Custom data (JSON)" hint="Optional free-form object; each top-level key becomes a row on the public page.">
        <textarea
          rows={4}
          className={`${inputCls} font-mono text-xs`}
          value={extraText}
          onChange={(e) => {
            setExtraText(e.target.value)
            if (errors.extra) setErrors((prev) => ({ ...prev, extra: undefined }))
          }}
          placeholder='{"certificates": ["ISO", "FSSAI"]}'
        />
        {errors.extra && <p className="text-[11px] text-red-600">{errors.extra}</p>}
      </Card>

      <Card title="Visibility">
        <div className="flex flex-wrap items-center gap-6">
          <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer">
            <input
              type="checkbox"
              checked={form.is_active}
              onChange={(e) => set('is_active', e.target.checked)}
              className="w-4 h-4 accent-[#0a3622]"
            />
            Published
          </label>
          <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer">
            <input
              type="checkbox"
              checked={form.is_featured}
              onChange={(e) => set('is_featured', e.target.checked)}
              className="w-4 h-4 accent-[#0a3622]"
            />
            Featured
          </label>
          <Field label="Sort order" error={errors.sort_order}>
            <input
              type="number"
              min="0"
              className={`${inputCls} w-28`}
              value={form.sort_order}
              onChange={(e) => set('sort_order', e.target.value)}
            />
          </Field>
        </div>
      </Card>
    </form>
  )
}
