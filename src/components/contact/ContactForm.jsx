import { useState } from 'react'

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    product: 'Food Colours',
    message: '',
  })

  const productOptions = [
    'Synthetic Food Colours',
    'Lake Colours',
    'Blended Colours',
    'Cosmetic Colours',
    'Pharmaceutical Colours',
    'Liquid Flavours',
    'Emulsion Flavours',
    'Powder Flavours',
    'Natural Fruit Powder',
    'Natural Food Colors',
    'Fruit Fragrance',
    'Edible Lustre',
    'Fluorescent Colours',
    'Pearl Pigment Powder',
    'Food Additives & Chemicals',
    'Mango Pulp & Purees',
    'Other / Custom Requirement',
  ]

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-10 shadow-sm">
      {submitted ? (
        /* Clean Success State */
        <div className="py-12 px-4 text-center space-y-4 max-w-md mx-auto">
          <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 text-[#0a3622] flex items-center justify-center text-3xl font-bold">
            ✓
          </div>
          <h3 className="text-2xl font-bold font-heading text-slate-900">
            Thank You, {formData.name}!
          </h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            Your inquiry has been received. Our export team will contact you at{' '}
            <strong className="text-slate-900">{formData.email}</strong> shortly with product specifications and pricing.
          </p>
          <div className="pt-4">
            <button
              type="button"
              onClick={() => {
                setSubmitted(false)
                setFormData({
                  name: '',
                  email: '',
                  phone: '',
                  company: '',
                  product: 'Food Colours',
                  message: '',
                })
              }}
              className="px-6 py-2.5 rounded-full bg-[#0a3622] text-white text-xs font-bold hover:bg-[#15803d] transition-colors cursor-pointer"
            >
              Send Another Message
            </button>
          </div>
        </div>
      ) : (
        /* Simple Clean Form */
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="border-b border-slate-100 pb-4 mb-2">
            <h2 className="text-xl sm:text-2xl font-bold font-heading text-slate-900">
              Send Us a Message
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Fill in the form below and our export team will get back to you promptly.
            </p>
          </div>

          {/* Row 1: Name & Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Your Name"
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#0a3622] focus:ring-1 focus:ring-[#0a3622] transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="name@company.com"
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#0a3622] focus:ring-1 focus:ring-[#0a3622] transition-colors"
              />
            </div>
          </div>

          {/* Row 2: Phone & Company */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Phone / WhatsApp Number
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+91 98927 00271"
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#0a3622] focus:ring-1 focus:ring-[#0a3622] transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Company / Organization
              </label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                placeholder="Company Name"
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#0a3622] focus:ring-1 focus:ring-[#0a3622] transition-colors"
              />
            </div>
          </div>

          {/* Row 3: Product Category */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Product of Interest
            </label>
            <select
              value={formData.product}
              onChange={(e) => setFormData({ ...formData, product: e.target.value })}
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-[#0a3622] focus:ring-1 focus:ring-[#0a3622] transition-colors cursor-pointer"
            >
              {productOptions.map((prod) => (
                <option key={prod} value={prod}>
                  {prod}
                </option>
              ))}
            </select>
          </div>

          {/* Row 4: Message */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Your Message / Requirements <span className="text-red-500">*</span>
            </label>
            <textarea
              rows={5}
              required
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Describe your inquiry, requested quantities, technical specifications, or sample courier requests..."
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#0a3622] focus:ring-1 focus:ring-[#0a3622] transition-colors"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#0a3622] hover:bg-[#15803d] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all active:scale-98 cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Submit Message</span>
              <span>&rarr;</span>
            </button>
          </div>
        </form>
      )}
    </div>
  )
}
