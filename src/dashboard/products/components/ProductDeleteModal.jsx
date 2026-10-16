/**
 * src/dashboard/products/components/ProductDeleteModal.jsx
 * ─────────────────────────────────────────────────────────────
 * Confirmation modal for deleting products (supports single and bulk).
 */

export default function ProductDeleteModal({
  isOpen = false,
  target = null, // product object or array of ids
  isBulk = false,
  onClose = () => {},
  onConfirm = () => {},
  isDeleting = false,
}) {
  if (!isOpen) return null

  const title = isBulk
    ? `Delete ${Array.isArray(target) ? target.length : ''} Products?`
    : `Delete "${target?.name || 'Product'}"?`

  const description = isBulk
    ? `Are you sure you want to delete these ${Array.isArray(target) ? target.length : ''} selected products? This will remove them from the export catalog.`
    : `Are you sure you want to delete "${target?.name}"? It will be removed from the public catalogue.`

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100 z-10 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-red-100 text-red-600 flex items-center justify-center shrink-0">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="text-base font-bold text-slate-900 leading-snug">
              {title}
            </h3>
            <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
              {description}
            </p>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-end gap-2.5">
          <button
            type="button"
            onClick={onClose}
            disabled={isDeleting}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 border border-slate-200 transition-colors cursor-pointer disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isDeleting}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-red-600 hover:bg-red-700 shadow-sm shadow-red-600/30 transition-colors flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isDeleting && (
              <svg className="w-3.5 h-3.5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            )}
            <span>{isDeleting ? 'Deleting…' : 'Delete Product'}</span>
          </button>
        </div>
      </div>
    </div>
  )
}
