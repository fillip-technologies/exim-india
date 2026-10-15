/**
 * src/dashboard/products/components/ProductCard.jsx
 * ─────────────────────────────────────────────────────────────
 * Visual Card Component for Grid View of Catalog Products.
 */

import { Link } from 'react-router-dom'
import { PRODUCT_CATEGORIES, PRODUCT_STATUSES } from '../productStructure'

export default function ProductCard({
  product = {},
  isSelected = false,
  onToggleSelect = () => {},
  onDuplicate = () => {},
  onDelete = () => {},
}) {
  const cat = PRODUCT_CATEGORIES.find((c) => c.id === product.category) || {
    label: product.category,
    icon: '📦',
  }

  const st = PRODUCT_STATUSES.find((s) => s.id === product.status) || {
    label: product.status,
    color: 'bg-slate-100 text-slate-700 ring-slate-200',
  }

  return (
    <div
      className={`group relative bg-white rounded-2xl border transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-xs hover:shadow-xl ${
        isSelected
          ? 'border-emerald-500 ring-2 ring-emerald-500/20'
          : 'border-slate-200/90 hover:border-slate-300'
      }`}
    >
      {/* Top Banner Image / Color Preview */}
      <div className="relative h-44 w-full bg-slate-100 overflow-hidden flex items-center justify-center">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="text-4xl opacity-50">🎨</div>
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10 pointer-events-none" />

        {/* Select checkbox (top-left) */}
        <div className="absolute top-3 left-3 z-10">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => onToggleSelect(product.id)}
            aria-label={`Select ${product.name}`}
            className="w-4 h-4 rounded border-white/60 bg-white/80 text-[#0a3622] focus:ring-[#0a3622] cursor-pointer shadow-xs"
          />
        </div>

        {/* Status Pill (top-right) */}
        <div className="absolute top-3 right-3 z-10">
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold shadow-xs backdrop-blur-md ${
              product.status === 'active'
                ? 'bg-emerald-600/90 text-white'
                : product.status === 'draft'
                ? 'bg-slate-700/80 text-white'
                : product.status === 'low_stock'
                ? 'bg-amber-600/90 text-white'
                : 'bg-rose-600/90 text-white'
            }`}
          >
            {st.label}
          </span>
        </div>

        {/* Category & Color Chip (bottom-left) */}
        <div className="absolute bottom-3 left-3 right-3 z-10 flex items-center justify-between text-white">
          <span className="text-[11px] font-semibold bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10 flex items-center gap-1.5 truncate max-w-[70%]">
            <span>{cat.icon}</span>
            <span className="truncate">{cat.label}</span>
          </span>

          {product.colorHex && (
            <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-2 py-1 rounded-lg border border-white/10">
              <span
                className="w-3 h-3 rounded-full border border-white/80 shadow-xs shrink-0"
                style={{ backgroundColor: product.colorHex }}
              />
              <span className="text-[10px] font-mono text-slate-200">
                {product.colorHex}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Body Information */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* SKU & Featured */}
          <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono mb-1">
            <span>{product.sku || 'SKU-NONE'}</span>
            {product.featured && (
              <span className="text-amber-600 font-semibold font-sans flex items-center gap-0.5">
                ★ Featured
              </span>
            )}
          </div>

          {/* Title */}
          <Link
            to={`/dashboard/products/${product.id}`}
            className="text-sm font-bold text-slate-900 hover:text-[#0a3622] transition-colors line-clamp-1 block"
            title={product.name}
          >
            {product.name}
          </Link>

          {/* Description */}
          <p className="text-xs text-slate-500 line-clamp-2 mt-1 leading-relaxed">
            {product.shortDescription || product.description || 'Export grade food color formulation.'}
          </p>

          {/* Technical Specs Tags */}
          <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-slate-100 text-[11px]">
            <div className="bg-slate-50 p-2 rounded-lg">
              <span className="text-slate-400 block text-[10px] uppercase font-semibold">HS Code</span>
              <span className="font-mono font-medium text-slate-700">{product.hsCode || '—'}</span>
            </div>
            <div className="bg-slate-50 p-2 rounded-lg">
              <span className="text-slate-400 block text-[10px] uppercase font-semibold">CAS Number</span>
              <span className="font-mono font-medium text-slate-700">{product.casNo || '—'}</span>
            </div>
          </div>
        </div>

        {/* Pricing & Actions Footer */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-semibold block">Export Price</span>
            <div className="text-sm font-extrabold text-slate-900">
              {product.currency === 'USD' ? '$' : product.currency === 'INR' ? '₹' : '€'}
              {Number(product.price || 0).toFixed(2)}
              <span className="text-[11px] font-normal text-slate-500"> / {product.priceUnit}</span>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <Link
              to={`/dashboard/products/${product.id}`}
              className="p-2 rounded-xl text-slate-600 hover:text-[#0a3622] hover:bg-emerald-50 transition-colors"
              title="View Specifications"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </Link>
            <Link
              to={`/dashboard/products/${product.id}/edit`}
              className="p-2 rounded-xl text-slate-600 hover:text-blue-600 hover:bg-blue-50 transition-colors"
              title="Edit Product"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </Link>
            <button
              type="button"
              onClick={() => onDuplicate(product.id)}
              className="p-2 rounded-xl text-slate-600 hover:text-amber-600 hover:bg-amber-50 transition-colors cursor-pointer"
              title="Duplicate"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => onDelete(product)}
              className="p-2 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
              title="Delete"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
