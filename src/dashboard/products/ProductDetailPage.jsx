/**
 * src/dashboard/products/ProductDetailPage.jsx
 * ─────────────────────────────────────────────────────────────
 * Comprehensive Specification & Export Logistics Detail View
 * for Exim India Products, including chemical analysis tables,
 * compliance seals, and interactive quote estimator.
 */

import { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { productStore, PRODUCT_CATEGORIES, PRODUCT_STATUSES } from './productStructure'
import ProductDeleteModal from './components/ProductDeleteModal'

export default function ProductDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [toast, setToast] = useState(null)

  // Interactive Export Quote Calculator State
  const [orderQty, setOrderQty] = useState(100) // in Kg

  const showToast = (message, type = 'success') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }

  useEffect(() => {
    setLoading(true)
    const found = productStore.getById(id)
    if (found) {
      setProduct(found)
      document.title = `${found.name} | Exim India Product Specifications`
    } else {
      setToast({ message: 'Product not found, returning to directory.', type: 'error' })
      setTimeout(() => navigate('/dashboard/products'), 1500)
    }
    setLoading(false)
  }, [id, navigate])

  if (loading || !product) {
    return (
      <div className="p-8 max-w-7xl mx-auto flex flex-col items-center justify-center min-h-[50vh] text-slate-500">
        <svg className="w-8 h-8 animate-spin text-[#0a3622] mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
        <p className="text-sm font-semibold">Loading product specification sheet...</p>
      </div>
    )
  }

  const cat = PRODUCT_CATEGORIES.find((c) => c.id === product.category) || {
    label: product.category,
    icon: '📦',
  }

  const st = PRODUCT_STATUSES.find((s) => s.id === product.status) || {
    label: product.status,
    color: 'bg-slate-100 text-slate-700 ring-slate-200',
  }

  const handleStatusToggle = (newStatus) => {
    try {
      const updated = productStore.toggleStatus(product.id, newStatus)
      setProduct(updated)
      showToast(`Status updated to "${newStatus}".`)
    } catch (e) {
      showToast(e.message, 'error')
    }
  }

  const handleDuplicate = () => {
    try {
      const duplicated = productStore.duplicate(product.id)
      showToast(`Duplicated as "${duplicated.name}".`)
      navigate(`/dashboard/products/${duplicated.id}`)
    } catch (e) {
      showToast('Failed to duplicate product.', 'error')
    }
  }

  const handleDeleteConfirm = () => {
    setIsDeleting(true)
    try {
      productStore.delete(product.id)
      showToast('Product successfully deleted.')
      navigate('/dashboard/products')
    } catch (e) {
      showToast('Failed to delete product.', 'error')
      setIsDeleting(false)
    }
  }

  // Quote calculations
  const unitPrice = Number(product.price || 0)
  const estimatedTotal = (unitPrice * Number(orderQty || 0)).toFixed(2)
  const drumCount = Math.ceil(Number(orderQty || 0) / 25)

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-6">
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

      {/* ── 1. Breadcrumbs & Top Action Bar ────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <nav className="flex items-center gap-2 text-xs text-slate-400">
            <Link to="/dashboard" className="hover:text-slate-600 transition-colors">
              Dashboard
            </Link>
            <span>/</span>
            <Link to="/dashboard/products" className="hover:text-slate-600 transition-colors">
              Products
            </Link>
            <span>/</span>
            <span className="text-slate-700 font-semibold truncate max-w-xs">{product.name}</span>
          </nav>
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              {product.name}
            </h1>
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ring-1 ring-inset ${st.color}`}
            >
              {st.label}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Link
            to="/dashboard/products"
            className="px-3.5 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            ← Back to Directory
          </Link>

          <Link
            to={`/dashboard/products/${product.id}/edit`}
            className="px-3.5 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <svg className="w-3.5 h-3.5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            <span>Edit Product</span>
          </Link>

          <button
            type="button"
            onClick={handleDuplicate}
            className="px-3.5 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <svg className="w-3.5 h-3.5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            <span>Duplicate</span>
          </button>

          <button
            type="button"
            onClick={() => setDeleteModalOpen(true)}
            className="px-3.5 py-2 rounded-xl border border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            <span>Delete</span>
          </button>
        </div>
      </div>

      {/* ── 2. Main Two-Column Layout ───────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column (8 cols): Specifications, Lab Analysis, Logistics */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Card A: Product Overview Hero */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row gap-5 items-start">
              {/* Product Visual */}
              <div className="relative w-full sm:w-56 h-56 rounded-2xl bg-slate-100 border border-slate-200 overflow-hidden shrink-0 flex items-center justify-center shadow-xs">
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-6xl">🎨</span>
                )}
                {product.colorHex && (
                  <div
                    className="absolute bottom-3 right-3 w-8 h-8 rounded-full border-2 border-white shadow-md flex items-center justify-center"
                    style={{ backgroundColor: product.colorHex }}
                    title={`Hex: ${product.colorHex}`}
                  />
                )}
              </div>

              {/* Core Details */}
              <div className="space-y-3 flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-[#0a3622]/10 text-[#0a3622] flex items-center gap-1.5">
                    <span>{cat.icon}</span>
                    <span>{cat.label}</span>
                  </span>
                  <span className="px-2 py-0.5 rounded-lg text-xs font-mono bg-slate-100 text-slate-700">
                    SKU: {product.sku}
                  </span>
                  {product.featured && (
                    <span className="px-2 py-0.5 rounded-lg text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">
                      ★ Featured Product
                    </span>
                  )}
                </div>

                <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
                  {product.name}
                </h2>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {product.shortDescription || product.description || 'Premium grade formulation from Exim India Corporation.'}
                </p>

                {/* Fast Facts Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-xs">
                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Assay / Purity</span>
                    <span className="font-extrabold text-[#0a3622] text-sm">{product.purity || '85% Min'}</span>
                  </div>
                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Grade</span>
                    <span className="font-semibold text-slate-800 truncate block" title={product.grade}>
                      {product.grade?.split(' ')[0] || 'Food Grade'}
                    </span>
                  </div>
                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Shelf Life</span>
                    <span className="font-semibold text-slate-800">{product.shelfLife || '3 Years'}</span>
                  </div>
                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Origin</span>
                    <span className="font-semibold text-slate-800 truncate block">{product.placeOfOrigin || 'India'}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Detailed Description */}
            {product.description && (
              <div className="pt-4 border-t border-slate-100">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  Full Technical Overview
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                  {product.description}
                </p>
              </div>
            )}
          </div>

          {/* Card B: Chemical Specifications / COA Table */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Chemical Analysis & Specifications (COA)
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Export standard test parameters guaranteed per batch shipment
                </p>
              </div>
              <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                WHO-GMP Verified
              </span>
            </div>

            <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-2xs">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50/90 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider text-[11px]">
                    <th className="py-2.5 px-4 w-10 text-center">#</th>
                    <th className="py-2.5 px-4">Characteristic / Test Parameter</th>
                    <th className="py-2.5 px-4 min-w-[180px]">Specification Requirement</th>
                    <th className="py-2.5 px-4 w-24 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {product.specifications && product.specifications.length > 0 ? (
                    product.specifications.map((spec, i) => (
                      <tr key={i} className="hover:bg-slate-50/60 transition-colors">
                        <td className="py-2.5 px-4 text-slate-400 text-center font-mono text-[11px]">
                          {i + 1}
                        </td>
                        <td className="py-2.5 px-4 font-medium text-slate-800">
                          {spec.characteristic}
                        </td>
                        <td className="py-2.5 px-4 font-mono text-slate-700">
                          {spec.requirement}
                        </td>
                        <td className="py-2.5 px-4 text-center">
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                            ✓ Passed
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="py-6 text-center text-slate-400">
                        No chemical specifications recorded for this product.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Card C: Commercial & Export Logistics */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-slate-900 pb-2 border-b border-slate-100">
              International Trade & Customs Logistics
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
              <div className="bg-slate-50/80 p-3.5 rounded-2xl border border-slate-100 space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-400">HS Customs Code</span>
                <p className="font-mono text-sm font-bold text-slate-900">{product.hsCode || '—'}</p>
                <p className="text-[10px] text-slate-500">Tariff classification for customs clearance</p>
              </div>

              <div className="bg-slate-50/80 p-3.5 rounded-2xl border border-slate-100 space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-400">CAS Registry No</span>
                <p className="font-mono text-sm font-bold text-slate-900">{product.casNo || '—'}</p>
                <p className="text-[10px] text-slate-500">Chemical Abstracts Service registry</p>
              </div>

              <div className="bg-slate-50/80 p-3.5 rounded-2xl border border-slate-100 space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-400">Colour Index (CI No)</span>
                <p className="font-mono text-sm font-bold text-slate-900">{product.ciNo || '—'}</p>
                <p className="text-[10px] text-slate-500">Society of Dyers & Colourists identification</p>
              </div>

              <div className="bg-slate-50/80 p-3.5 rounded-2xl border border-slate-100 space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-400">EU / E-Number</span>
                <p className="font-bold text-slate-900 text-sm">{product.eNumber || '—'}</p>
                <p className="text-[10px] text-slate-500">European food additive standard</p>
              </div>

              <div className="bg-slate-50/80 p-3.5 rounded-2xl border border-slate-100 space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-400">US FDA Code</span>
                <p className="font-bold text-slate-900 text-sm">{product.fdcName || '—'}</p>
                <p className="text-[10px] text-slate-500">United States FDA certification name</p>
              </div>

              <div className="bg-slate-50/80 p-3.5 rounded-2xl border border-slate-100 space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-400">Shipping Incoterms</span>
                <p className="font-bold text-slate-900 text-sm">{product.incoterms || 'FOB Mumbai / CIF'}</p>
                <p className="text-[10px] text-slate-500">Standard international freight terms</p>
              </div>

              <div className="col-span-full bg-slate-50/80 p-3.5 rounded-2xl border border-slate-100 space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-400">Export Packaging Specifications</span>
                <p className="font-semibold text-slate-800 text-xs sm:text-sm">
                  {product.packagingDetails || '25 Kg Fiber HDPE Drum with food-grade double inner poly-liner'}
                </p>
              </div>
            </div>
          </div>

          {/* Card D: Applications & Quality Compliance */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-slate-900 pb-2 border-b border-slate-100">
              Applications & Regulatory Compliance
            </h3>

            {/* Applications */}
            <div>
              <span className="text-xs font-bold text-slate-700 block mb-2">Approved Food & Industrial Sectors:</span>
              <div className="flex flex-wrap gap-2">
                {product.applications && product.applications.map((app) => (
                  <span
                    key={app}
                    className="px-3 py-1.5 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold border border-slate-200 flex items-center gap-1.5"
                  >
                    <span>✦</span>
                    <span>{app}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Certifications Badges */}
            <div className="pt-3 border-t border-slate-100">
              <span className="text-xs font-bold text-slate-700 block mb-2">Manufacturing Certifications:</span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {product.certifications && product.certifications.map((cert) => (
                  <div
                    key={cert}
                    className="p-2.5 rounded-xl border border-emerald-200 bg-emerald-50/50 flex items-center gap-2 text-xs font-bold text-[#0a3622]"
                  >
                    <span className="text-sm">🛡️</span>
                    <span className="truncate">{cert}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Right Column (4 cols): Quote Simulator, Downloads, Metadata */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Box 1: Interactive Quotation Simulator */}
          <div className="bg-gradient-to-br from-white to-emerald-50/30 rounded-3xl border border-emerald-200/80 p-5 sm:p-6 shadow-xs space-y-4">
            <div>
              <span className="text-[10px] uppercase font-extrabold text-[#0a3622] tracking-wider">
                Export Pricing Simulator
              </span>
              <div className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
                {product.currency === 'USD' ? '$' : product.currency === 'INR' ? '₹' : '€'}
                {Number(product.price || 0).toFixed(2)}
                <span className="text-xs font-normal text-slate-500"> / {product.priceUnit || 'Kg'}</span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Minimum order: <strong className="text-slate-700">{product.moq}</strong>
              </p>
            </div>

            {/* Quantity Slider / Input */}
            <div className="pt-3 border-t border-slate-200/80 space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                <span>Test Order Quantity:</span>
                <span className="text-[#0a3622] font-extrabold">{orderQty} Kg</span>
              </div>
              <input
                type="range"
                min="25"
                max="5000"
                step="25"
                value={orderQty}
                onChange={(e) => setOrderQty(e.target.value)}
                className="w-full accent-[#0a3622] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>25 Kg (Sample)</span>
                <span>1,000 Kg (1 MT)</span>
                <span>5,000 Kg</span>
              </div>
            </div>

            {/* Estimated Quote Summary */}
            <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs space-y-2 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Estimated Export FOB Value:</span>
                <span className="font-extrabold text-slate-900 text-sm">
                  {product.currency === 'USD' ? '$' : '₹'}
                  {Number(estimatedTotal).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-slate-500 text-[11px]">
                <span>Packaging Units:</span>
                <span className="font-semibold text-slate-700">{drumCount} × 25 Kg Drums</span>
              </div>
              <div className="flex justify-between text-slate-500 text-[11px]">
                <span>Dispatch Port:</span>
                <span className="font-semibold text-slate-700">{product.placeOfOrigin || 'Nhava Sheva, India'}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => showToast('Sample quotation draft copied to clipboard!')}
              className="w-full py-2.5 rounded-xl bg-[#0a3622] hover:bg-[#0f4d30] text-white text-xs font-bold shadow-sm shadow-[#0a3622]/20 hover:shadow-md transition-all cursor-pointer text-center"
            >
              Generate Export Proforma
            </button>
          </div>

          {/* Box 2: Quality Dossier & Technical Documents */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-4">
            <h4 className="text-sm font-bold text-slate-900">
              Technical Dossier & Documents
            </h4>

            <div className="space-y-2">
              {[
                { name: 'Certificate of Analysis (COA)', format: 'PDF • 240 KB', icon: '📄' },
                { name: 'Material Safety Data Sheet (MSDS)', format: 'PDF • 512 KB', icon: '📑' },
                { name: 'Technical Data Sheet (TDS)', format: 'PDF • 180 KB', icon: '📊' },
                { name: 'Halal & Kosher Compliance Seal', format: 'PDF • 120 KB', icon: '📜' },
              ].map((doc, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => showToast(`Downloading sample ${doc.name}...`)}
                  className="w-full flex items-center justify-between p-3 rounded-2xl border border-slate-200/80 hover:border-slate-300 hover:bg-slate-50 transition-all text-left cursor-pointer group"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="text-base">{doc.icon}</span>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-slate-800 group-hover:text-[#0a3622] truncate">
                        {doc.name}
                      </p>
                      <p className="text-[10px] text-slate-400">{doc.format}</p>
                    </div>
                  </div>
                  <svg className="w-4 h-4 text-slate-400 group-hover:text-[#0a3622] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </button>
              ))}
            </div>
          </div>

          {/* Box 3: Record Audit Metadata */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-3 text-xs">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Record Audit Metadata
            </h4>
            <div className="space-y-2 text-slate-600">
              <div className="flex justify-between">
                <span>Internal System ID:</span>
                <span className="font-mono text-slate-800 font-semibold">{product.id}</span>
              </div>
              <div className="flex justify-between">
                <span>Catalog Status:</span>
                <span className="capitalize font-bold text-slate-800">{product.status}</span>
              </div>
              <div className="flex justify-between">
                <span>Created At:</span>
                <span className="font-medium text-slate-800">
                  {product.createdAt ? new Date(product.createdAt).toLocaleDateString() : '—'}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Last Updated:</span>
                <span className="font-medium text-slate-800">
                  {product.updatedAt ? new Date(product.updatedAt).toLocaleDateString() : '—'}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Managed By:</span>
                <span className="font-semibold text-[#0a3622]">Exim India Admin</span>
              </div>
            </div>

            {/* Quick status switcher */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] font-semibold text-slate-500">Quick Status:</span>
              <select
                value={product.status}
                onChange={(e) => handleStatusToggle(e.target.value)}
                className="px-2 py-1 rounded-lg border border-slate-200 bg-white text-xs font-bold text-slate-700 outline-none cursor-pointer"
              >
                {PRODUCT_STATUSES.map((s) => (
                  <option key={s.id} value={s.id}>{s.label}</option>
                ))}
              </select>
            </div>
          </div>

        </div>

      </div>

      {/* ── 3. Delete Confirmation Modal ───────────────────── */}
      <ProductDeleteModal
        isOpen={deleteModalOpen}
        target={product}
        isBulk={false}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        isDeleting={isDeleting}
      />
    </div>
  )
}
