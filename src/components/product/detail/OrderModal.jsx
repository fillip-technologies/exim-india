import { useState } from 'react'

export default function OrderModal({ isOpen, onClose, product }) {
  const [orderSubmitted, setOrderSubmitted] = useState(false)
  const [orderForm, setOrderForm] = useState({
    name: '',
    email: '',
    phone: '',
    quantity: product?.moq || '100 Kgs',
    address: '',
  })

  if (!isOpen || !product) return null

  const handleOrderSubmit = (e) => {
    e.preventDefault()
    setOrderSubmitted(true)
  }

  const handleClose = () => {
    setOrderSubmitted(false)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-fadeIn">
      <div className="relative w-full max-w-lg bg-white rounded-3xl border border-slate-200 shadow-2xl p-6 text-left">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
          <h3 className="text-lg font-bold font-heading text-slate-900">
            Order {product.name}
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
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto text-xl font-bold">
              ✓
            </div>
            <h4 className="text-base font-bold text-slate-900">Order Inquiry Received!</h4>
            <p className="text-xs text-slate-600">
              Thank you, <span className="font-bold text-slate-900">{orderForm.name}</span>. Our export specialist will contact you with shipment schedules for {product.name}.
            </p>
            <button
              type="button"
              onClick={handleClose}
              className="mt-3 px-5 py-2 rounded-xl bg-[#337ab7] text-white text-xs font-bold transition-all cursor-pointer"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleOrderSubmit} className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Product
              </label>
              <input
                type="text"
                value={product.ciNo ? `${product.name} (C.I. ${product.ciNo})` : product.name}
                readOnly
                className="w-full text-xs px-3 py-2 bg-slate-100 rounded-lg border border-slate-200 text-slate-600 font-semibold"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enter full name"
                  value={orderForm.name}
                  onChange={(e) => setOrderForm({ ...orderForm, name: e.target.value })}
                  className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 focus:border-emerald-600 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@company.com"
                  value={orderForm.email}
                  onChange={(e) => setOrderForm({ ...orderForm, email: e.target.value })}
                  className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 focus:border-emerald-600 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Phone / WhatsApp *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={orderForm.phone}
                  onChange={(e) => setOrderForm({ ...orderForm, phone: e.target.value })}
                  className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 focus:border-emerald-600 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Estimated Quantity
                </label>
                <input
                  type="text"
                  placeholder="e.g. 100 Kgs, 500 Kgs"
                  value={orderForm.quantity}
                  onChange={(e) => setOrderForm({ ...orderForm, quantity: e.target.value })}
                  className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 focus:border-emerald-600 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Delivery Address / Port of Destination
              </label>
              <textarea
                rows="2"
                placeholder="Enter delivery port or destination city..."
                value={orderForm.address}
                onChange={(e) => setOrderForm({ ...orderForm, address: e.target.value })}
                className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 focus:border-emerald-600 focus:outline-none resize-none"
              ></textarea>
            </div>

            <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-100">
              <button
                type="button"
                onClick={handleClose}
                className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-800 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-lg bg-[#0a3622] hover:bg-[#0f4d30] text-white text-xs font-bold shadow-xs cursor-pointer transition-all"
              >
                Submit Inquiry
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
