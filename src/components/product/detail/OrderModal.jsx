import { useState } from 'react'
import { submitOrder } from '../../../api/orders'

export default function OrderModal({ isOpen, onClose, product }) {
  const [orderSubmitted, setOrderSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [apiError, setApiError] = useState('')
  const [orderForm, setOrderForm] = useState({
    name: '',
    email: '',
    phone: '',
    quantity: product?.moq || '100 Kgs',
    address: '',
    message: '',
  })

  if (!isOpen || !product) return null

  const productLabel = product.ciNo
    ? `${product.name} (C.I. ${product.ciNo})`
    : product.name

  const handleChange = (e) => {
    const { name, value } = e.target
    setOrderForm(prev => ({ ...prev, [name]: value }))
  }

  const handleOrderSubmit = async (e) => {
    e.preventDefault()
    setApiError('')
    setLoading(true)
    try {
      await submitOrder({
        name:             orderForm.name.trim(),
        email:            orderForm.email.trim(),
        phone:            orderForm.phone.trim()    || undefined,
        quantity:         orderForm.quantity.trim() || undefined,
        address:          orderForm.address.trim()  || undefined,
        message:          orderForm.message.trim()  || undefined,
        product_interest: productLabel,
      })
      setOrderSubmitted(true)
    } catch (err) {
      const msg =
        err?.errors?.email?.[0] ||
        err?.errors?.name?.[0]  ||
        err?.message            ||
        'Something went wrong. Please try again.'
      setApiError(msg)
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => {
    setOrderSubmitted(false)
    setApiError('')
    setOrderForm({
      name: '',
      email: '',
      phone: '',
      quantity: product?.moq || '100 Kgs',
      address: '',
      message: '',
    })
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-fadeIn">
      <div className="relative w-full max-w-lg bg-white rounded-3xl border border-slate-200 shadow-2xl p-6 text-left max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
          <h3 className="text-lg font-bold font-heading text-slate-900">
            Order Inquiry — {product.name}
          </h3>
          <button
            type="button"
            onClick={handleClose}
            className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:text-slate-800 font-bold flex items-center justify-center cursor-pointer"
          >
            ✕
          </button>
        </div>

        {orderSubmitted ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto text-2xl font-bold">
              ✓
            </div>
            <h4 className="text-base font-bold text-slate-900">Order Inquiry Received!</h4>
            <p className="text-xs text-slate-600">
              Thank you, <span className="font-bold text-slate-900">{orderForm.name}</span>. Our export specialist will contact you with shipment schedules for{' '}
              <span className="font-semibold">{product.name}</span>.
            </p>
            <p className="text-[11px] text-slate-500 pt-1">
              For urgent inquiries, call{' '}
              <a href="tel:+917977523176" className="font-semibold text-slate-800 hover:text-emerald-700">+91 79775 23176</a> /{' '}
              <a href="tel:+919892364600" className="font-semibold text-slate-800 hover:text-emerald-700">+91 98923 64600</a> or email{' '}
              <a href="mailto:info@eximindiacorporation.com" className="font-semibold text-slate-800 hover:text-emerald-700">info@eximindiacorporation.com</a>.
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
                className="w-full text-xs px-3 py-2 bg-slate-100 rounded-lg border border-slate-200 text-slate-600 font-semibold"
              />
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
                  Estimated Quantity
                </label>
                <input
                  type="text"
                  name="quantity"
                  disabled={loading}
                  placeholder="e.g. 100 Kgs, 500 Kgs"
                  value={orderForm.quantity}
                  onChange={handleChange}
                  className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 focus:border-emerald-600 focus:outline-none disabled:opacity-60"
                />
              </div>
            </div>

            {/* Delivery Address */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Delivery Address / Port of Destination
              </label>
              <textarea
                name="address"
                rows="2"
                disabled={loading}
                placeholder="Enter delivery port or destination city..."
                value={orderForm.address}
                onChange={handleChange}
                className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 focus:border-emerald-600 focus:outline-none resize-none disabled:opacity-60"
              />
            </div>

            {/* Additional Message */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Additional Notes / Requirements
              </label>
              <textarea
                name="message"
                rows="2"
                disabled={loading}
                placeholder="Packaging preference, specific grade, certifications needed..."
                value={orderForm.message}
                onChange={handleChange}
                className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 focus:border-emerald-600 focus:outline-none resize-none disabled:opacity-60"
              />
            </div>

            {/* Footer */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-2 border-t border-slate-100">
              <span className="text-[11px] text-slate-500">
                Helpline:{' '}
                <a href="tel:+917977523176" className="font-semibold text-slate-700 hover:text-emerald-700">+91 79775 23176</a>{' '}
                /{' '}
                <a href="tel:+919892364600" className="font-semibold text-slate-700 hover:text-emerald-700">+91 98923 64600</a>
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
                  className="px-5 py-2 rounded-lg bg-[#0a3622] hover:bg-[#0f4d30] text-white text-xs font-bold shadow-xs cursor-pointer transition-all disabled:opacity-60 flex items-center gap-1.5"
                >
                  {loading ? (
                    <>
                      <svg className="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                      </svg>
                      Submitting…
                    </>
                  ) : (
                    'Submit Inquiry'
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
