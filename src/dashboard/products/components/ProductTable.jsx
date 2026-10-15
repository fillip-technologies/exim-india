/**
 * src/dashboard/products/components/ProductTable.jsx
 * ─────────────────────────────────────────────────────────────
 * High-density, professional Admin Table for Product Listings.
 */

import { useState } from 'react'
import { Link } from 'react-router-dom'
import { PRODUCT_CATEGORIES, PRODUCT_STATUSES } from '../productStructure'

export default function ProductTable({
  products = [],
  selectedIds = [],
  onToggleSelect = () => {},
  onSelectAll = () => {},
  onStatusChange = () => {},
  onDuplicate = () => {},
  onDelete = () => {},
}) {
  const [activeStatusDropdown, setActiveStatusDropdown] = useState(null)

  const isAllSelected = products.length > 0 && selectedIds.length === products.length

  const getCategoryInfo = (catId) => {
    return PRODUCT_CATEGORIES.find((c) => c.id === catId) || { label: catId, icon: '📦' }
  }

  const getStatusBadge = (statusId) => {
    const st = PRODUCT_STATUSES.find((s) => s.id === statusId) || {
      label: statusId,
      color: 'bg-slate-100 text-slate-700 ring-slate-200',
    }
    return (
      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold ring-1 ring-inset capitalize ${st.color}`}>
        <span className="w-1.5 h-1.5 rounded-full bg-current mr-1.5 opacity-70" />
        {st.label}
      </span>
    )
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs sm:text-sm">
          <thead>
            <tr className="bg-slate-50/90 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider text-[11px]">
              <th className="py-3 px-4 w-10 text-center">
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  onChange={onSelectAll}
                  aria-label="Select all products"
                  className="rounded border-slate-300 text-[#0a3622] focus:ring-[#0a3622] cursor-pointer"
                />
              </th>
              <th className="py-3 px-4 min-w-[240px]">Product & SKU</th>
              <th className="py-3 px-4 min-w-[150px]">Category</th>
              <th className="py-3 px-4 min-w-[140px]">Grade</th>
              <th className="py-3 px-4 min-w-[130px]">HS & CAS Code</th>
              <th className="py-3 px-4 min-w-[120px]">Price / MOQ</th>
              <th className="py-3 px-4 min-w-[110px]">Status</th>
              <th className="py-3 px-4 w-28 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {products.length === 0 ? (
              <tr>
                <td colSpan="8" className="py-12 text-center text-slate-400">
                  <div className="flex flex-col items-center justify-center">
                    <span className="text-3xl mb-2">🔍</span>
                    <p className="text-sm font-semibold text-slate-700">No products match your filter criteria.</p>
                    <p className="text-xs text-slate-400 mt-1">Try adjusting the search query, category, or status filter.</p>
                  </div>
                </td>
              </tr>
            ) : (
              products.map((p) => {
                const isSelected = selectedIds.includes(p.id)
                const cat = getCategoryInfo(p.category)

                return (
                  <tr
                    key={p.id}
                    className={`hover:bg-slate-50/80 transition-colors group ${
                      isSelected ? 'bg-emerald-50/40' : ''
                    }`}
                  >
                    {/* Checkbox */}
                    <td className="py-3 px-4 text-center">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => onToggleSelect(p.id)}
                        className="rounded border-slate-300 text-[#0a3622] focus:ring-[#0a3622] cursor-pointer"
                      />
                    </td>

                    {/* Product & SKU */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        {/* Thumbnail / Color Indicator */}
                        <div className="relative w-11 h-11 rounded-xl bg-slate-100 border border-slate-200 overflow-hidden shrink-0 flex items-center justify-center shadow-2xs">
                          {p.image ? (
                            <img
                              src={p.image}
                              alt={p.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          ) : (
                            <span className="text-lg">🎨</span>
                          )}
                          {p.colorHex && (
                            <span
                              className="absolute bottom-1 right-1 w-2.5 h-2.5 rounded-full border border-white shadow-xs"
                              style={{ backgroundColor: p.colorHex }}
                              title={`Color: ${p.colorDesc || p.colorHex}`}
                            />
                          )}
                        </div>

                        <div className="min-w-0">
                          <Link
                            to={`/dashboard/products/${p.id}`}
                            className="text-xs sm:text-sm font-bold text-slate-900 hover:text-[#0a3622] transition-colors truncate block"
                          >
                            {p.name}
                          </Link>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            <span className="text-[10px] font-mono text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                              {p.sku || 'NO-SKU'}
                            </span>
                            {p.featured && (
                              <span className="text-[10px] font-semibold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
                                Featured ★
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center gap-1.5 text-xs text-slate-700 font-medium">
                        <span className="text-sm">{cat.icon}</span>
                        <span className="truncate max-w-[130px]">{cat.label}</span>
                      </span>
                    </td>

                    {/* Grade */}
                    <td className="py-3 px-4">
                      <span className="text-xs text-slate-600 block truncate max-w-[140px]" title={p.grade}>
                        {p.grade || 'Standard'}
                      </span>
                      {p.purity && (
                        <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded mt-0.5 inline-block">
                          Assay: {p.purity}
                        </span>
                      )}
                    </td>

                    {/* HS & CAS Code */}
                    <td className="py-3 px-4">
                      <div className="text-xs font-mono space-y-0.5">
                        <div className="text-slate-800">
                          <span className="text-[10px] text-slate-400 font-sans mr-1">HS:</span>
                          {p.hsCode || '—'}
                        </div>
                        {p.casNo && (
                          <div className="text-slate-500 text-[11px]">
                            <span className="text-[10px] text-slate-400 font-sans mr-1">CAS:</span>
                            {p.casNo}
                          </div>
                        )}
                      </div>
                    </td>

                    {/* Price & MOQ */}
                    <td className="py-3 px-4">
                      <div className="text-xs">
                        <span className="font-bold text-slate-900">
                          {p.currency === 'USD' ? '$' : p.currency === 'INR' ? '₹' : '€'}
                          {Number(p.price || 0).toFixed(2)}
                        </span>
                        <span className="text-slate-500 text-[11px]"> / {p.priceUnit || 'Kg'}</span>
                      </div>
                      <div className="text-[10px] text-slate-400 mt-0.5">
                        MOQ: <span className="font-medium text-slate-600">{p.moq || '1 Drum'}</span>
                      </div>
                    </td>

                    {/* Status with quick switch */}
                    <td className="py-3 px-4 relative">
                      <div className="relative inline-block">
                        <button
                          type="button"
                          onClick={() =>
                            setActiveStatusDropdown(activeStatusDropdown === p.id ? null : p.id)
                          }
                          className="cursor-pointer group-hover:ring-1 group-hover:ring-slate-300 rounded-full"
                          title="Click to change status"
                        >
                          {getStatusBadge(p.status)}
                        </button>

                        {/* Status switcher popup */}
                        {activeStatusDropdown === p.id && (
                          <div
                            className="absolute left-0 mt-1 w-36 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-30 animate-in fade-in zoom-in-95"
                            onMouseLeave={() => setActiveStatusDropdown(null)}
                          >
                            <div className="px-2.5 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                              Change Status
                            </div>
                            {PRODUCT_STATUSES.map((st) => (
                              <button
                                key={st.id}
                                type="button"
                                onClick={() => {
                                  onStatusChange(p.id, st.id)
                                  setActiveStatusDropdown(null)
                                }}
                                className={`w-full text-left px-3 py-1.5 text-xs font-medium hover:bg-slate-50 flex items-center justify-between cursor-pointer ${
                                  p.status === st.id ? 'text-[#0a3622] font-bold bg-emerald-50/50' : 'text-slate-700'
                                }`}
                              >
                                <span>{st.label}</span>
                                {p.status === st.id && <span>✓</span>}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        {/* View Details */}
                        <Link
                          to={`/dashboard/products/${p.id}`}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-[#0a3622] hover:bg-emerald-50 transition-colors"
                          title="View Details"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </Link>

                        {/* Edit */}
                        <Link
                          to={`/dashboard/products/${p.id}/edit`}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                          title="Edit Product"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </Link>

                        {/* Duplicate */}
                        <button
                          type="button"
                          onClick={() => onDuplicate(p.id)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-amber-600 hover:bg-amber-50 transition-colors cursor-pointer"
                          title="Duplicate as Draft"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                        </button>

                        {/* Delete */}
                        <button
                          type="button"
                          onClick={() => onDelete(p)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                          title="Delete Product"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
