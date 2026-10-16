import { useState } from 'react'
import { submitOrder } from '../../../api/orders'
import { CONTACT_INFO } from '../../../constants/navigation'

/**
 * Order / sample-request modal.
 *
 * `selections` is the list of options the visitor picked on the product page
 * ([{ code, type, label, value: { label, hex, gradient, ... } }]) and
 * `activeVariant` the matching variant (if the product has variants). The
 * parent remounts the modal (via `key`) whenever it opens or the variant
 * changes, so the initial form state below is always fresh.
 */
export default function OrderModal({
  isOpen,
  onClose,
  product,
  selections = [],
  activeVariant,
  mode = 'order',
}) {
  const isOrderMode = mode === 'order'
  const defaultMoq = activeVariant?.moq || product?.moq || ''
  const [orderSubmitted, setOrderSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [apiError, setApiError] = useState('')
  const [orderForm, setOrderForm] = useState({
    name: '',
    email: '',
    phone: '',
    quantity: isOrderMode ? defaultMoq : '',
    address: '',
    message: '',
  })

  if (!isOpen || !product) return null

  const specs = selections.map((s) => `${s.label}: ${s.value.label}`)
  if (activeVariant?.sku) specs.push(`SKU: ${activeVariant.sku}`)
  const specsSummary = specs.join(' · ')
  const productLabel = specsSummary ? `${product.name} (${specsSummary})` : product.name

  const handleChange = (e) => {
    const { name, value } = e.target
    setOrderForm(prev => ({ ...prev, [name]: value }))
  }

  const handleOrderSubmit = async (e) => {
    e.preventDefault()
    setApiError('')
    setLoading(true)
    try {
      const quantity = orderForm.quantity.trim()
      const message = [
        isOrderMode ? null : 'Sample / quote request',
        `Product: ${productLabel}`,
        orderForm.message.trim() || null,
      ]
        .filter(Boolean)
        .join('\n')

      await submitOrder({
        product_id: product.productId,
        name:       orderForm.name.trim(),
        email:      orderForm.email.trim(),
        phone:      orderForm.phone.trim()   || undefined,
        quantity,
        address:    orderForm.address.trim() || undefined,
        message,
        items: [
          {
            product_id: product.productId,
            variant_id: activeVariant?.id,
            quantity,
            note:       specsSummary || undefined,
          },
        ],
      })
      setOrderSubmitted(true)
    } catch (err) {
      setApiError(err?.message || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => {
    setOrderSubmitted(false)
    setApiError('')
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-fadeIn">
      <div className="relative w-full max-w-lg bg-white rounded-3xl border border-slate-200 shadow-2xl p-6 text-left max-h-[90vh] overflow-y-auto">
        <div className="flex items-start justify-between border-b border-slate-100 pb-3 mb-4">
          <div>
            <div className="flex items-center gap-2">
              <span
                className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                  isOrderMode
                    ? 'bg-emerald-100 text-[#0a3622]'
                    : 'bg-amber-100 text-amber-900'
                }`}
              >
                {isOrderMode ? 'Direct Order Form' : 'Sample & Quote Request'}
              </span>
            </div>
            <h3 className="text-lg font-bold font-heading text-slate-900 mt-1">
              {isOrderMode ? `Order Now — ${product.name}` : `Request Free Sample / Quote — ${product.name}`}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              {isOrderMode
                ? 'Fill in your consignment details to place your commercial export order.'
                : 'Request a free certified sample kit and proforma export quotation.'}
            </p>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:text-slate-800 font-bold flex items-center justify-center cursor-pointer shrink-0 ml-2"
          >
            ✕
          </button>
        </div>

        {orderSubmitted ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto text-2xl font-bold">
              ✓
            </div>
            <h4 className="text-base font-bold text-slate-900">
              {isOrderMode ? 'Export Order Received!' : 'Sample & Quote Request Received!'}
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Thank you, <span className="font-bold text-slate-900">{orderForm.name}</span>.{' '}
              {isOrderMode
                ? `Your export order for ${product.name} (${orderForm.quantity}) has been placed. Our export operations team will contact you with the official Proforma Invoice (PI) and dispatch schedules.`
                : `Your sample and quotation request for ${product.name} has been received. Our export specialist will contact you shortly with product kit details.`}
            </p>
            <p className="text-[11px] text-slate-500 pt-1">
              For urgent requests, call{' '}
              {CONTACT_INFO.phones.map((phone, i) => (
                <span key={phone}>
                  {i > 0 && ' / '}
                  <a href={`tel:${phone.replace(/\s/g, '')}`} className="font-semibold text-slate-800 hover:text-emerald-700">{phone}</a>
                </span>
              ))}{' '}
              or email{' '}
              <a href={`mailto:${CONTACT_INFO.email}`} className="font-semibold text-slate-800 hover:text-emerald-700">{CONTACT_INFO.email}</a>.
            </p>
            <button
              type="button"
              onClick={handleClose}
              className="mt-3 px-5 py-2 rounded-xl bg-[#0a3622] text-white text-xs font-bold transition-all cursor-pointer hover:bg-[#0f4d30]"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleOrderSubmit} className="space-y-3">

            {/* Product (read-only) */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Product
              </label>
              <input
                type="text"
                value={productLabel}
                readOnly
                className="w-full text-xs px-3 py-2 bg-slate-100 rounded-lg border border-slate-200 text-slate-700 font-semibold truncate"
              />
              {(selections.length > 0 || activeVariant?.sku) && (
                <div className="flex flex-wrap items-center gap-1.5 mt-2">
                  {selections.map((sel) => (
                    <span
                      key={sel.code}
                      className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-slate-50 border border-slate-200 text-slate-800 text-[11px] font-bold"
                    >
                      {(sel.value.hex || sel.value.gradient) && (
                        <span
                          className="w-2.5 h-2.5 rounded-full border border-black/15 inline-block shrink-0"
                          style={{
                            backgroundColor: sel.value.hex || undefined,
                            backgroundImage: sel.value.gradient || undefined,
                          }}
                        />
                      )}
                      <span className="text-slate-500 font-semibold">{sel.label}:</span> {sel.value.label}
                    </span>
                  ))}
                  {activeVariant?.sku && (
                    <span className="px-2 py-0.5 rounded-md bg-slate-100 border border-slate-200 text-slate-600 text-[10px] font-mono font-medium">
                      {activeVariant.sku}
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* API Error */}
            {apiError && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs">
                {apiError}
              </div>
            )}

            {/* Name & Email */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Your Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  disabled={loading}
                  placeholder="Enter full name"
                  value={orderForm.name}
                  onChange={handleChange}
                  className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 focus:border-emerald-600 focus:outline-none disabled:opacity-60"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  disabled={loading}
                  placeholder="name@company.com"
                  value={orderForm.email}
                  onChange={handleChange}
                  className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 focus:border-emerald-600 focus:outline-none disabled:opacity-60"
                />
              </div>
            </div>

            {/* Phone & Quantity */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Phone / WhatsApp <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  disabled={loading}
                  placeholder="+91 79775 23176"
                  value={orderForm.phone}
                  onChange={handleChange}
                  className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 focus:border-emerald-600 focus:outline-none disabled:opacity-60"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {isOrderMode ? `Order Quantity${defaultMoq ? ` (MOQ: ${defaultMoq})` : ''}` : 'Estimated Requirement / Sample Size'}
                </label>
                <input
                  type="text"
                  name="quantity"
                  required
                  disabled={loading}
                  placeholder={isOrderMode ? 'e.g. 100 Kgs, 500 Kgs, 1 MT' : 'e.g. 100g sample, 50 Kgs pilot'}
                  value={orderForm.quantity}
                  onChange={handleChange}
                  className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 focus:border-emerald-600 focus:outline-none disabled:opacity-60"
                />
              </div>
            </div>

            {/* Delivery Address */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {isOrderMode ? 'Shipping Address / Destination Port' : 'Courier Delivery Address'}
              </label>
              <textarea
                name="address"
                rows="2"
                disabled={loading}
                placeholder={
                  isOrderMode
                    ? 'Enter destination port (e.g. Port of Rotterdam, Jebel Ali) or warehouse address...'
                    : 'Enter your laboratory or factory address for sample courier dispatch...'
                }
                value={orderForm.address}
                onChange={handleChange}
                className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 focus:border-emerald-600 focus:outline-none resize-none disabled:opacity-60"
              />
            </div>

            {/* Additional Message */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {isOrderMode ? 'Consignment Instructions / Special Requirements' : 'Application Notes / Certifications Needed'}
              </label>
              <textarea
                name="message"
                rows="2"
                disabled={loading}
                placeholder={
                  isOrderMode
                    ? 'Packaging preference (drums/bags), target delivery timeline, custom private labeling...'
                    : 'Application details, regulatory standards (HALAL, KOSHER, ISO), specific shades needed...'
                }
                value={orderForm.message}
                onChange={handleChange}
                className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 focus:border-emerald-600 focus:outline-none resize-none disabled:opacity-60"
              />
            </div>

            {/* Footer */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-2 border-t border-slate-100">
              <span className="text-[11px] text-slate-500">
                Helpline:{' '}
                {CONTACT_INFO.phones.map((phone, i) => (
                  <span key={phone}>
                    {i > 0 && ' / '}
                    <a href={`tel:${phone.replace(/\s/g, '')}`} className="font-semibold text-slate-700 hover:text-emerald-700">{phone}</a>
                  </span>
                ))}
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleClose}
                  disabled={loading}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-800 cursor-pointer disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className={`px-5 py-2 rounded-lg text-xs font-bold shadow-xs cursor-pointer transition-all disabled:opacity-60 flex items-center gap-1.5 ${
                    isOrderMode
                      ? 'bg-[#0a3622] hover:bg-[#0f4d30] text-white'
                      : 'bg-amber-400 hover:bg-amber-300 text-slate-950 font-black'
                  }`}
                >
                  {loading ? (
                    <>
                      <svg className="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                      </svg>
                      {isOrderMode ? 'Placing Order…' : 'Submitting…'}
                    </>
                  ) : (
                    isOrderMode ? 'Place Order Now →' : 'Request Sample / Quote →'
                  )}
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
