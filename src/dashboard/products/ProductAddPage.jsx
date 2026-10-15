/**
 * src/dashboard/products/ProductAddPage.jsx
 * ─────────────────────────────────────────────────────────────
 * Multi-section Product Creation and Editing Form for Exim India
 * Admin Dashboard, featuring chemical specs, export identifiers,
 * validation, and live preview drawer.
 */

import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {
  productStore,
  PRODUCT_CATEGORIES,
  PRODUCT_GRADES,
  PRODUCT_STATUSES,
  CURRENCIES,
  PRICE_UNITS,
  AVAILABLE_CERTIFICATIONS,
  COMMON_APPLICATIONS,
  EMPTY_PRODUCT_FORM,
  validateProduct,
  generateSlug,
  generateSKU,
} from './productStructure'
import ProductSpecsEditor from './components/ProductSpecsEditor'

export default function ProductAddPage({ isEdit = false }) {
  const navigate = useNavigate()
  const { id } = useParams()

  const [formData, setFormData] = useState({ ...EMPTY_PRODUCT_FORM })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPreviewDrawer, setShowPreviewDrawer] = useState(false)
  const [toast, setToast] = useState(null)
  const [skuLocked, setSkuLocked] = useState(isEdit)

  // Load existing product if in Edit mode
  useEffect(() => {
    if (isEdit && id) {
      const existing = productStore.getById(id)
      if (existing) {
        setFormData({ ...existing })
        document.title = `Edit: ${existing.name} | Exim India Admin`
      } else {
        setToast({ message: 'Product not found, redirected.', type: 'error' })
        setTimeout(() => navigate('/dashboard/products'), 1500)
      }
    } else {
      document.title = 'Add New Product | Exim India Admin'
      // Generate default SKU for initial category
      const initialSku = generateSKU('synthetic-food-colours', '')
      setFormData((prev) => ({ ...prev, sku: initialSku }))
    }
  }, [isEdit, id, navigate])

  const showToast = (message, type = 'success') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }

  // Handle simple input change
  const handleChange = (field, value) => {
    setFormData((prev) => {
      const updated = { ...prev, [field]: value }

      // Auto-generate slug if title changes and wasn't manually edited
      if (field === 'name' && !isEdit) {
        updated.slug = generateSlug(value)
        if (!skuLocked) {
          updated.sku = generateSKU(updated.category, value)
        }
      }

      // Auto-generate SKU prefix if category changes and wasn't locked
      if (field === 'category' && !skuLocked) {
        updated.sku = generateSKU(value, updated.name)
      }

      return updated
    })

    // Clear field-specific validation error
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }))
    }
  }

  // Handle applications array toggle
  const handleToggleApplication = (app) => {
    setFormData((prev) => {
      const exists = prev.applications.includes(app)
      return {
        ...prev,
        applications: exists
          ? prev.applications.filter((a) => a !== app)
          : [...prev.applications, app],
      }
    })
  }

  // Handle certifications array toggle
  const handleToggleCertification = (cert) => {
    setFormData((prev) => {
      const exists = prev.certifications.includes(cert)
      return {
        ...prev,
        certifications: exists
          ? prev.certifications.filter((c) => c !== cert)
          : [...prev.certifications, cert],
      }
    })
  }

  // Submit Handler
  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    const { isValid, errors: validationErrors } = validateProduct(formData)

    if (!isValid) {
      setErrors(validationErrors)
      setIsSubmitting(false)
      showToast('Please resolve validation errors in the form.', 'error')
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }

    try {
      if (isEdit && id) {
        productStore.update(id, formData)
        showToast('Product updated successfully!')
      } else {
        const created = productStore.create(formData)
        showToast('New product created successfully!')
      }
      setTimeout(() => {
        navigate('/dashboard/products')
      }, 700)
    } catch (err) {
      console.error('Error saving product:', err)
      showToast(err.message || 'Failed to save product.', 'error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-6xl w-full mx-auto space-y-6">
      {/* ── Toast Notification ─────────────────────────────── */}
      {toast && (
        <div
          className={`fixed bottom-6 right-6 z-50 px-4 py-3 rounded-2xl shadow-xl border flex items-center gap-3 text-xs sm:text-sm font-semibold animate-in fade-in slide-in-from-bottom-5 ${
            toast.type === 'error'
              ? 'bg-rose-50 border-rose-200 text-rose-800'
              : 'bg-emerald-50 border-emerald-200 text-emerald-800'
          }`}
        >
          <span>{toast.type === 'error' ? '⚠️' : '✓'}</span>
          <span>{toast.message}</span>
        </div>
      )}

      {/* ── 1. Breadcrumbs & Header ────────────────────────── */}
      <div className="space-y-2">
        <nav className="flex items-center gap-2 text-xs text-slate-400">
          <Link to="/dashboard" className="hover:text-slate-600 transition-colors">
            Dashboard
          </Link>
          <span>/</span>
          <Link to="/dashboard/products" className="hover:text-slate-600 transition-colors">
            Products
          </Link>
          <span>/</span>
          <span className="text-slate-700 font-semibold">
            {isEdit ? 'Edit Product' : 'Add New Product'}
          </span>
        </nav>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              {isEdit ? `Edit: ${formData.name || 'Product'}` : 'Create Export Product'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Enter comprehensive chemical, regulatory, and international trade specifications.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => setShowPreviewDrawer(true)}
              className="px-3.5 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              <span>Live Preview</span>
            </button>

            <Link
              to="/dashboard/products"
              className="px-3.5 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 text-xs font-semibold shadow-xs transition-colors cursor-pointer"
            >
              Cancel
            </Link>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="px-4 py-2 rounded-xl bg-[#0a3622] hover:bg-[#0f4d30] text-white text-xs sm:text-sm font-bold shadow-sm shadow-[#0a3622]/20 hover:shadow-md transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isSubmitting && (
                <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              )}
              <span>{isEdit ? 'Update Product' : 'Publish Product'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* ── Form Body ──────────────────────────────────────── */}
      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* ── Section 1: Basic Information ── */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-5">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
            <span className="w-7 h-7 rounded-lg bg-emerald-50 text-[#0a3622] flex items-center justify-center font-bold text-xs">
              1
            </span>
            <div>
              <h2 className="text-base font-bold text-slate-900">Basic Information</h2>
              <p className="text-xs text-slate-500">Commercial nomenclature, categories, and storefront visibility</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Product Name */}
            <div className="sm:col-span-2 space-y-1">
              <label className="text-xs font-bold text-slate-700">
                Product Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                placeholder="e.g. Tartrazine Yellow (Food Grade E102)"
                className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm outline-none transition-colors ${
                  errors.name
                    ? 'border-rose-400 bg-rose-50/30 focus:border-rose-500'
                    : 'border-slate-200 bg-slate-50/50 focus:bg-white focus:border-[#0a3622] focus:ring-1 focus:ring-[#0a3622]'
                }`}
              />
              {errors.name && <p className="text-[11px] text-rose-500">{errors.name}</p>}
            </div>

            {/* SKU / Code */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-700">
                  Product SKU <span className="text-rose-500">*</span>
                </label>
                <button
                  type="button"
                  onClick={() => setSkuLocked(!skuLocked)}
                  className="text-[10px] text-slate-400 hover:text-slate-600 underline cursor-pointer"
                >
                  {skuLocked ? 'Unlock Auto-Gen' : 'Lock SKU'}
                </button>
              </div>
              <input
                type="text"
                value={formData.sku}
                onChange={(e) => {
                  setSkuLocked(true)
                  handleChange('sku', e.target.value)
                }}
                placeholder="e.g. EX-SYN-102"
                className={`w-full px-3.5 py-2.5 rounded-xl border font-mono text-xs sm:text-sm outline-none transition-colors ${
                  errors.sku
                    ? 'border-rose-400 bg-rose-50/30 focus:border-rose-500'
                    : 'border-slate-200 bg-slate-50/50 focus:bg-white focus:border-[#0a3622] focus:ring-1 focus:ring-[#0a3622]'
                }`}
              />
              {errors.sku && <p className="text-[11px] text-rose-500">{errors.sku}</p>}
            </div>

            {/* Category */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">
                Product Category <span className="text-rose-500">*</span>
              </label>
              <select
                value={formData.category}
                onChange={(e) => handleChange('category', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm text-slate-800 outline-none focus:border-[#0a3622] focus:ring-1 focus:ring-[#0a3622] cursor-pointer"
              >
                {PRODUCT_CATEGORIES.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.icon} {cat.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Sub-Category / Family */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Sub-Family / Chemical Class</label>
              <input
                type="text"
                value={formData.subCategory}
                onChange={(e) => handleChange('subCategory', e.target.value)}
                placeholder="e.g. Azo Dyes, Lake Pigments"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-[#0a3622] focus:ring-1 focus:ring-[#0a3622] text-xs sm:text-sm outline-none transition-colors"
              />
            </div>

            {/* Status */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Status</label>
              <select
                value={formData.status}
                onChange={(e) => handleChange('status', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm text-slate-800 outline-none focus:border-[#0a3622] focus:ring-1 focus:ring-[#0a3622] cursor-pointer"
              >
                {PRODUCT_STATUSES.map((st) => (
                  <option key={st.id} value={st.id}>
                    {st.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Brand Name */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Manufacturer / Brand</label>
              <input
                type="text"
                value={formData.brandName}
                onChange={(e) => handleChange('brandName', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-[#0a3622] focus:ring-1 focus:ring-[#0a3622] text-xs sm:text-sm outline-none transition-colors"
              />
            </div>

            {/* Featured Checkbox */}
            <div className="flex items-center gap-2 pt-5 sm:col-span-2">
              <input
                type="checkbox"
                id="featuredToggle"
                checked={formData.featured}
                onChange={(e) => handleChange('featured', e.target.checked)}
                className="w-4 h-4 rounded border-slate-300 text-[#0a3622] focus:ring-[#0a3622] cursor-pointer"
              />
              <label htmlFor="featuredToggle" className="text-xs font-semibold text-slate-800 cursor-pointer select-none">
                Featured Product (Spotlight on website homepage & header recommendations)
              </label>
            </div>

            {/* Short Tagline / Summary */}
            <div className="col-span-full space-y-1">
              <label className="text-xs font-bold text-slate-700">Short Summary</label>
              <input
                type="text"
                value={formData.shortDescription}
                onChange={(e) => handleChange('shortDescription', e.target.value)}
                placeholder="High-purity water-soluble synthetic food color providing bright lemon shade."
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-[#0a3622] focus:ring-1 focus:ring-[#0a3622] text-xs sm:text-sm outline-none transition-colors"
              />
            </div>

            {/* Full Technical Description */}
            <div className="col-span-full space-y-1">
              <label className="text-xs font-bold text-slate-700">Technical Description</label>
              <textarea
                rows={3}
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                placeholder="Provide detailed chemical properties, solubility characteristics, applications in bakery, pharma, or confectionery..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-[#0a3622] focus:ring-1 focus:ring-[#0a3622] text-xs sm:text-sm outline-none transition-colors"
              />
            </div>
          </div>
        </div>

        {/* ── Section 2: Chemical & Technical Identifiers ── */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-5">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
            <span className="w-7 h-7 rounded-lg bg-emerald-50 text-[#0a3622] flex items-center justify-center font-bold text-xs">
              2
            </span>
            <div>
              <h2 className="text-base font-bold text-slate-900">Technical & Chemical Identifiers</h2>
              <p className="text-xs text-slate-500">Colour Index, CAS number, E-numbers, and pharmacopoeia grade</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* CI Number */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">CI Number (Colour Index)</label>
              <input
                type="text"
                value={formData.ciNo}
                onChange={(e) => handleChange('ciNo', e.target.value)}
                placeholder="e.g. 19140"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-[#0a3622] font-mono text-xs sm:text-sm outline-none transition-colors"
              />
            </div>

            {/* CAS Number */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">CAS Number</label>
              <input
                type="text"
                value={formData.casNo}
                onChange={(e) => handleChange('casNo', e.target.value)}
                placeholder="e.g. 1934-21-0"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-[#0a3622] font-mono text-xs sm:text-sm outline-none transition-colors"
              />
            </div>

            {/* E-Number */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">E-Number (EU Standard)</label>
              <input
                type="text"
                value={formData.eNumber}
                onChange={(e) => handleChange('eNumber', e.target.value)}
                placeholder="e.g. E102"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-[#0a3622] text-xs sm:text-sm outline-none transition-colors"
              />
            </div>

            {/* US FDA Name */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">US FDA Name</label>
              <input
                type="text"
                value={formData.fdcName}
                onChange={(e) => handleChange('fdcName', e.target.value)}
                placeholder="e.g. FD&C Yellow No 5"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-[#0a3622] text-xs sm:text-sm outline-none transition-colors"
              />
            </div>

            {/* Grade */}
            <div className="space-y-1 sm:col-span-2">
              <label className="text-xs font-bold text-slate-700">Product Grade</label>
              <select
                value={formData.grade}
                onChange={(e) => handleChange('grade', e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm text-slate-800 outline-none focus:border-[#0a3622] cursor-pointer"
              >
                {PRODUCT_GRADES.map((g) => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
            </div>

            {/* Purity / Assay */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Assay / Purity</label>
              <input
                type="text"
                value={formData.purity}
                onChange={(e) => handleChange('purity', e.target.value)}
                placeholder="e.g. 87% Min Pure Dye"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-[#0a3622] text-xs sm:text-sm outline-none transition-colors"
              />
            </div>

            {/* Shelf Life */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Shelf Life</label>
              <input
                type="text"
                value={formData.shelfLife}
                onChange={(e) => handleChange('shelfLife', e.target.value)}
                placeholder="e.g. 3 Years"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-[#0a3622] text-xs sm:text-sm outline-none transition-colors"
              />
            </div>

            {/* Color Hex & Color Description */}
            <div className="space-y-1 sm:col-span-2">
              <label className="text-xs font-bold text-slate-700">Color Swatch & Description</label>
              <div className="flex items-center gap-2.5">
                <input
                  type="color"
                  value={formData.colorHex}
                  onChange={(e) => handleChange('colorHex', e.target.value)}
                  className="w-10 h-10 rounded-xl border border-slate-200 cursor-pointer p-0.5 bg-white shrink-0"
                  title="Pick Color"
                />
                <input
                  type="text"
                  value={formData.colorHex}
                  onChange={(e) => handleChange('colorHex', e.target.value)}
                  placeholder="#facc15"
                  className="w-28 px-3 py-2 rounded-xl border border-slate-200 bg-slate-50/50 font-mono text-xs sm:text-sm outline-none"
                />
                <input
                  type="text"
                  value={formData.colorDesc}
                  onChange={(e) => handleChange('colorDesc', e.target.value)}
                  placeholder="e.g. Intense Lemon-Yellow Fine Powder"
                  className="flex-1 px-3 py-2 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white text-xs sm:text-sm outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* ── Section 3: Commercial & Export Logistics ── */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-5">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
            <span className="w-7 h-7 rounded-lg bg-emerald-50 text-[#0a3622] flex items-center justify-center font-bold text-xs">
              3
            </span>
            <div>
              <h2 className="text-base font-bold text-slate-900">Commercial & Export Logistics</h2>
              <p className="text-xs text-slate-500">Tariff codes, FOB/CIF pricing, minimum orders, and freight details</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* HS Code */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">
                HS Tariff Code <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={formData.hsCode}
                onChange={(e) => handleChange('hsCode', e.target.value)}
                placeholder="e.g. 3204.12.91"
                className={`w-full px-3 py-2 rounded-xl border font-mono text-xs sm:text-sm outline-none transition-colors ${
                  errors.hsCode
                    ? 'border-rose-400 bg-rose-50/30'
                    : 'border-slate-200 bg-slate-50/50 focus:bg-white focus:border-[#0a3622]'
                }`}
              />
              {errors.hsCode && <p className="text-[11px] text-rose-500">{errors.hsCode}</p>}
            </div>

            {/* Base Price & Currency */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">
                Unit Export Price <span className="text-rose-500">*</span>
              </label>
              <div className="flex items-center gap-1.5">
                <select
                  value={formData.currency}
                  onChange={(e) => handleChange('currency', e.target.value)}
                  className="w-20 px-2 py-2 rounded-xl border border-slate-200 bg-white text-xs font-bold outline-none cursor-pointer"
                >
                  {CURRENCIES.map((c) => (
                    <option key={c.code} value={c.code}>{c.code}</option>
                  ))}
                </select>
                <input
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => handleChange('price', e.target.value)}
                  placeholder="14.50"
                  className={`w-full px-3 py-2 rounded-xl border text-xs sm:text-sm font-bold outline-none transition-colors ${
                    errors.price
                      ? 'border-rose-400 bg-rose-50/30'
                      : 'border-slate-200 bg-slate-50/50 focus:bg-white focus:border-[#0a3622]'
                  }`}
                />
              </div>
              {errors.price && <p className="text-[11px] text-rose-500">{errors.price}</p>}
            </div>

            {/* Price Unit */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Per Unit</label>
              <select
                value={formData.priceUnit}
                onChange={(e) => handleChange('priceUnit', e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm text-slate-800 outline-none focus:border-[#0a3622] cursor-pointer"
              >
                {PRICE_UNITS.map((u) => (
                  <option key={u} value={u}>{u}</option>
                ))}
              </select>
            </div>

            {/* MOQ */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">
                Minimum Order Quantity (MOQ) <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={formData.moq}
                onChange={(e) => handleChange('moq', e.target.value)}
                placeholder="e.g. 25 Kg or 1 MT"
                className={`w-full px-3 py-2 rounded-xl border text-xs sm:text-sm outline-none transition-colors ${
                  errors.moq
                    ? 'border-rose-400 bg-rose-50/30'
                    : 'border-slate-200 bg-slate-50/50 focus:bg-white focus:border-[#0a3622]'
                }`}
              />
              {errors.moq && <p className="text-[11px] text-rose-500">{errors.moq}</p>}
            </div>

            {/* Place of Origin */}
            <div className="space-y-1 sm:col-span-2">
              <label className="text-xs font-bold text-slate-700">Place of Origin / Port</label>
              <input
                type="text"
                value={formData.placeOfOrigin}
                onChange={(e) => handleChange('placeOfOrigin', e.target.value)}
                placeholder="e.g. Maharashtra, India / Nhava Sheva Sea Port"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-[#0a3622] text-xs sm:text-sm outline-none transition-colors"
              />
            </div>

            {/* Incoterms & Payment Terms */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Incoterms</label>
              <input
                type="text"
                value={formData.incoterms}
                onChange={(e) => handleChange('incoterms', e.target.value)}
                placeholder="e.g. FOB Mumbai / CIF"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white text-xs sm:text-sm outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Delivery Lead Time</label>
              <input
                type="text"
                value={formData.deliveryDetail}
                onChange={(e) => handleChange('deliveryDetail', e.target.value)}
                placeholder="e.g. 7-14 business days"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white text-xs sm:text-sm outline-none"
              />
            </div>

            {/* Packaging Details */}
            <div className="col-span-full space-y-1">
              <label className="text-xs font-bold text-slate-700">Export Packaging Details</label>
              <input
                type="text"
                value={formData.packagingDetails}
                onChange={(e) => handleChange('packagingDetails', e.target.value)}
                placeholder="e.g. 25 Kg Fiber HDPE Drum with food-grade double inner poly-liner"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-[#0a3622] text-xs sm:text-sm outline-none transition-colors"
              />
            </div>
          </div>
        </div>

        {/* ── Section 4: Specifications & Lab Analysis ── */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-xs">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100 mb-4">
            <span className="w-7 h-7 rounded-lg bg-emerald-50 text-[#0a3622] flex items-center justify-center font-bold text-xs">
              4
            </span>
            <div>
              <h2 className="text-base font-bold text-slate-900">Certificate of Analysis (COA) Specifications</h2>
              <p className="text-xs text-slate-500">Chemical assays, heavy metal thresholds, and purity requirements</p>
            </div>
          </div>

          <ProductSpecsEditor
            specifications={formData.specifications}
            onChange={(updated) => handleChange('specifications', updated)}
          />
        </div>

        {/* ── Section 5: Media, Certifications & Applications ── */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-6">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
            <span className="w-7 h-7 rounded-lg bg-emerald-50 text-[#0a3622] flex items-center justify-center font-bold text-xs">
              5
            </span>
            <div>
              <h2 className="text-base font-bold text-slate-900">Media, Compliance & Target Applications</h2>
              <p className="text-xs text-slate-500">Quality certifications, product photos, and food/industrial usages</p>
            </div>
          </div>

          {/* Product Image URL with Live Thumbnail */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-center">
            <div className="sm:col-span-3 space-y-1">
              <label className="text-xs font-bold text-slate-700">Product Image URL or Path</label>
              <input
                type="text"
                value={formData.image}
                onChange={(e) => handleChange('image', e.target.value)}
                placeholder="e.g. /src/assets/img/synthesis-food-color/high-quality-Tartrazine.jpg or https://..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white text-xs sm:text-sm outline-none font-mono"
              />
              <p className="text-[11px] text-slate-400">
                You can paste an external image URL or link to an asset within the project.
              </p>
            </div>

            <div className="flex flex-col items-center justify-center border border-dashed border-slate-200 rounded-2xl p-2 h-24 bg-slate-50/50 overflow-hidden">
              {formData.image ? (
                <img
                  src={formData.image}
                  alt="Preview"
                  className="w-full h-full object-contain rounded-xl"
                  onError={(e) => (e.target.style.display = 'none')}
                />
              ) : (
                <div className="text-center text-slate-400 text-xs">
                  <span className="text-xl block">🖼️</span>
                  <span>No image</span>
                </div>
              )}
            </div>
          </div>

          {/* Certifications Checkboxes */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <label className="text-xs font-bold text-slate-800 block">
              Quality & Regulatory Certifications
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
              {AVAILABLE_CERTIFICATIONS.map((cert) => {
                const isChecked = formData.certifications.includes(cert)
                return (
                  <label
                    key={cert}
                    className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs font-medium cursor-pointer transition-colors ${
                      isChecked
                        ? 'border-emerald-500 bg-emerald-50/60 text-[#0a3622]'
                        : 'border-slate-200 bg-slate-50/40 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => handleToggleCertification(cert)}
                      className="w-3.5 h-3.5 rounded border-slate-300 text-[#0a3622] focus:ring-[#0a3622]"
                    />
                    <span className="truncate">{cert}</span>
                  </label>
                )
              })}
            </div>
          </div>

          {/* Applications Multi-Select Tags */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <label className="text-xs font-bold text-slate-800 block">
              Industry Applications
            </label>
            <div className="flex flex-wrap gap-2">
              {COMMON_APPLICATIONS.map((app) => {
                const isSelected = formData.applications.includes(app)
                return (
                  <button
                    key={app}
                    type="button"
                    onClick={() => handleToggleApplication(app)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#0a3622] text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {isSelected ? '✓ ' : '+ '}
                    {app}
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* ── Form Actions Bar (Bottom) ─────────────────────── */}
        <div className="flex items-center justify-end gap-3 pt-4">
          <Link
            to="/dashboard/products"
            className="px-5 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs sm:text-sm font-semibold shadow-xs transition-colors cursor-pointer"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2.5 rounded-xl bg-[#0a3622] hover:bg-[#0f4d30] text-white text-xs sm:text-sm font-bold shadow-md shadow-[#0a3622]/20 hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isSubmitting && (
              <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            )}
            <span>{isEdit ? 'Save Changes' : 'Create & Publish Product'}</span>
          </button>
        </div>
      </form>

      {/* ── Live Preview Slide-over Drawer ─────────────────── */}
      {showPreviewDrawer && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity"
            onClick={() => setShowPreviewDrawer(false)}
          />
          <div className="fixed inset-y-0 right-0 max-w-xl w-full bg-white shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-300">
            {/* Header */}
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div>
                <h3 className="text-sm font-bold text-slate-800">Product Card Preview</h3>
                <p className="text-xs text-slate-500">Live preview of how this product appears in the directory</p>
              </div>
              <button
                type="button"
                onClick={() => setShowPreviewDrawer(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Preview content */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1">
              <div className="max-w-sm mx-auto bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-lg">
                <div className="relative h-48 bg-slate-100 flex items-center justify-center overflow-hidden">
                  {formData.image ? (
                    <img src={formData.image} alt={formData.name} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-5xl">🎨</span>
                  )}
                  {formData.colorHex && (
                    <span
                      className="absolute bottom-3 right-3 w-5 h-5 rounded-full border-2 border-white shadow-md"
                      style={{ backgroundColor: formData.colorHex }}
                    />
                  )}
                  <span className="absolute top-3 right-3 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-600 text-white">
                    {formData.status}
                  </span>
                </div>
                <div className="p-4 space-y-2">
                  <span className="text-[10px] font-mono text-slate-400">{formData.sku || 'SKU'}</span>
                  <h4 className="text-sm font-bold text-slate-900">{formData.name || 'Untitled Product'}</h4>
                  <p className="text-xs text-slate-500 line-clamp-2">{formData.shortDescription || 'No description provided.'}</p>
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-extrabold text-slate-900">
                      {formData.currency} {Number(formData.price || 0).toFixed(2)} / {formData.priceUnit}
                    </span>
                    <span className="text-[10px] text-slate-400">MOQ: {formData.moq}</span>
                  </div>
                </div>
              </div>

              {/* Specs snapshot */}
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-2 text-xs">
                <h5 className="font-bold text-slate-800">Product Specs Snapshot</h5>
                <div className="grid grid-cols-2 gap-2 text-slate-600">
                  <div><strong>HS Code:</strong> {formData.hsCode || '—'}</div>
                  <div><strong>CAS No:</strong> {formData.casNo || '—'}</div>
                  <div><strong>CI No:</strong> {formData.ciNo || '—'}</div>
                  <div><strong>Grade:</strong> {formData.grade || '—'}</div>
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-slate-100 bg-slate-50 text-right">
              <button
                type="button"
                onClick={() => setShowPreviewDrawer(false)}
                className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold cursor-pointer"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
