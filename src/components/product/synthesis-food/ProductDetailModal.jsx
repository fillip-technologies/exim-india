import { useState } from 'react'

export default function ProductDetailModal({ product, isOpen, onClose, initialMode = 'specs' }) {
  const [mode, setMode] = useState(initialMode) // 'specs' or 'inquiry'
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    quantity: product?.moq || '250 Kgs',
    destinationPort: '',
    message: '',
  })

  if (!isOpen || !product) return null

  const handleSubmit = (e) => {
    e.preventDefault()
    setFormSubmitted(true)
  }

  const handleReset = () => {
    setFormSubmitted(false)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col text-slate-900">
        
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-3">
            <span
              className="w-4 h-4 rounded-full border border-slate-300 shadow-xs"
              style={{ backgroundColor: product.colorHex }}
            />
            <div>
              <h2 className="text-lg sm:text-xl font-extrabold font-heading text-slate-900 leading-tight">
                {product.name}
              </h2>
              <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
                <span>{product.colorNo}</span>
                <span>•</span>
                <span>C.I. {product.ciNo}</span>
                <span>•</span>
                <span className="font-bold text-slate-700">{product.eNumber}</span>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center font-bold text-sm transition-colors cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Mode Switcher Tabs */}
        <div className="flex border-b border-slate-100 px-5 pt-2 bg-white">
          <button
            type="button"
            onClick={() => setMode('specs')}
            className={`pb-2.5 px-3 text-xs font-bold border-b-2 transition-all cursor-pointer ${
              mode === 'specs'
                ? 'border-[#0a3622] text-[#0a3622]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Technical Specification &amp; Analysis
          </button>
          <button
            type="button"
            onClick={() => setMode('inquiry')}
            className={`pb-2.5 px-3 text-xs font-bold border-b-2 transition-all cursor-pointer ${
              mode === 'inquiry'
                ? 'border-[#0a3622] text-[#0a3622]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Export Order / Sample Request
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-4 text-left">
          {mode === 'specs' ? (
            <>
              {/* Product Image & Quick Summary Row */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                <div className="sm:col-span-4 rounded-xl overflow-hidden border border-slate-200 aspect-[4/3] bg-slate-100">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="sm:col-span-8 text-xs text-slate-600 leading-relaxed">
                  <p className="font-medium text-slate-700 mb-2">
                    {product.description}
                  </p>
                  <div className="grid grid-cols-2 gap-2 text-[11px] pt-1 border-t border-slate-100">
                    <div>
                      <span className="text-slate-400 block font-semibold">FD&amp;C NAME</span>
                      <strong className="text-slate-800">{product.fdcName}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block font-semibold">CAS NUMBER</span>
                      <strong className="text-slate-800 font-mono">{product.casNo}</strong>
                    </div>
                  </div>
                </div>
              </div>

              {/* Technical Data Table */}
              <div className="rounded-xl border border-slate-200 overflow-hidden text-xs">
                <table className="w-full text-left border-collapse">
                  <tbody>
                    <tr className="border-b border-slate-100 bg-slate-50/60">
                      <td className="p-2.5 font-bold text-slate-700 w-1/3">Min. Order Quantity</td>
                      <td className="p-2.5 font-semibold text-emerald-800">{product.moq}</td>
                    </tr>
                    <tr className="border-b border-slate-100">
                      <td className="p-2.5 font-bold text-slate-700">Monthly Supply Capacity</td>
                      <td className="p-2.5 font-semibold text-amber-800">{product.supplyAbility}</td>
                    </tr>
                    <tr className="border-b border-slate-100 bg-slate-50/60">
                      <td className="p-2.5 font-bold text-slate-700">Port of Loading</td>
                      <td className="p-2.5 text-slate-800">{product.port}</td>
                    </tr>
                    <tr className="border-b border-slate-100">
                      <td className="p-2.5 font-bold text-slate-700">Purity / Dye Content</td>
                      <td className="p-2.5 text-slate-800">{product.purity}</td>
                    </tr>
                    <tr className="border-b border-slate-100 bg-slate-50/60">
                      <td className="p-2.5 font-bold text-slate-700">Solubility in Water</td>
                      <td className="p-2.5 text-slate-800">{product.solubility}</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold text-slate-700">Storage Specification</td>
                      <td className="p-2.5 text-slate-700 font-medium italic">{product.storage}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Recommended Applications */}
              <div>
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-2">
                  Key Application Areas:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {product.applications.map((app) => (
                    <span
                      key={app}
                      className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-900 border border-emerald-200/80 text-[11px] font-semibold"
                    >
                      {app}
                    </span>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Inquiry Form */}
              {formSubmitted ? (
                <div className="py-8 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto text-xl font-bold">
                    ✓
                  </div>
                  <h3 className="text-base font-bold text-slate-900">
                    Export Inquiry Dispatched!
                  </h3>
                  <p className="text-xs text-slate-600 max-w-sm mx-auto">
                    Thank you, <span className="font-semibold text-slate-900">{formData.name}</span>. Our international export liaison team will contact you with batch COA and pricing for <span className="font-semibold">{product.name}</span> within 24 hours.
                  </p>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="mt-2 px-5 py-2 rounded-xl bg-[#0a3622] text-white text-xs font-bold transition-all cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3 text-xs">
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-700">
                    Inquiring for: <strong className="text-slate-900">{product.name}</strong> ({product.colorNo}, C.I. {product.ciNo})
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Your Name"
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-700/30"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        Business Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="importer@company.com"
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-700/30"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        Phone / WhatsApp (with country code) *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+971 50 123 4567"
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-700/30"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        Order Quantity *
                      </label>
                      <select
                        value={formData.quantity}
                        onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-700/30 bg-white"
                      >
                        <option value="250 Kgs">250 Kgs (Standard MOQ)</option>
                        <option value="300 Kgs">300 Kgs</option>
                        <option value="500 Kgs">500 Kgs</option>
                        <option value="1000 Kgs">1,000 Kgs (1 Metric Ton)</option>
                        <option value="5000 Kgs+">5,000 Kgs+ (FCL Container)</option>
                        <option value="Lab Sample">Evaluation Lab Sample (100g – 500g)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Destination Port / Country &amp; Specific Requirements
                    </label>
                    <textarea
                      rows={2}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="e.g. CIF Port of Rotterdam, require COA & Halal certificate"
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-700/30 resize-none"
                    />
                  </div>

                  <div className="pt-2 flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setMode('specs')}
                      className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 font-bold hover:bg-slate-100 transition-colors cursor-pointer"
                    >
                      Back to Specs
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-lg bg-[#0a3622] hover:bg-[#0f4d30] text-white font-bold transition-all shadow-md active:scale-95 cursor-pointer"
                    >
                      Submit Export Order Request &rarr;
                    </button>
                  </div>
                </form>
              )}
            </>
          )}
        </div>

        {/* Modal Footer */}
        {mode === 'specs' && (
          <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
            <span className="text-[11px] text-slate-500 font-medium">
              Export Packing: 25 Kg fiber drums / carton with polythene liners
            </span>
            <button
              type="button"
              onClick={() => setMode('inquiry')}
              className="px-4 py-2 rounded-xl bg-[#0a3622] hover:bg-[#0f4d30] text-white font-bold text-xs shadow-md transition-all active:scale-95 cursor-pointer"
            >
              Order / Request Sample &rarr;
            </button>
          </div>
        )}

      </div>
    </div>
  )
}
