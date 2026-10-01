import { useState } from 'react'
import { submitContact } from '../../api'

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading]     = useState(false)
  const [apiError, setApiError]   = useState('')
  const [formData, setFormData] = useState({
    name:             '',
    email:            '',
    phone:            '',
    company:          '',
    product_interest: 'Synthetic Food Colours',
    message:          '',
    website:          '', // honeypot — never filled by real users
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

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setApiError('')
    setLoading(true)

    try {
      await submitContact({
        name:             formData.name.trim(),
        email:            formData.email.trim(),
        phone:            formData.phone.trim() || undefined,
        company:          formData.company.trim() || undefined,
        product_interest: formData.product_interest || undefined,
        message:          formData.message.trim(),
        website:          formData.website || undefined,
      })

      setSubmitted(true)
    } catch (err) {
      const message =
        err?.errors?.message?.[0] ||
        err?.errors?.email?.[0]   ||
        err?.errors?.name?.[0]    ||
        err?.message              ||
        'Something went wrong. Please try again.'
      setApiError(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-10 shadow-sm">
      {submitted ? (
        /* Success State */
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
                setApiError('')
                setFormData({
                  name:             '',
                  email:            '',
                  phone:            '',
                  company:          '',
                  product_interest: 'Synthetic Food Colours',
                  message:          '',
                  website:          '',
                })
              }}
              className="px-6 py-2.5 rounded-full bg-[#0a3622] text-white text-xs font-bold hover:bg-[#15803d] transition-colors cursor-pointer"
            >
              Send Another Message
            </button>
          </div>
        </div>
      ) : (
        /* Form */
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="border-b border-slate-100 pb-4 mb-2">
            <h2 className="text-xl sm:text-2xl font-bold font-heading text-slate-900">
              Send Us a Message
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Fill in the form below and our export team will get back to you promptly.
            </p>
          </div>

          {/* API Error */}
          {apiError && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
              {apiError}
            </div>
          )}

          {/* Honeypot — hidden from real users */}
          <input
            type="text"
            name="website"
            value={formData.website}
            onChange={handleChange}
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            style={{ display: 'none' }}
          />

          {/* Row 1: Name & Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                required
                disabled={loading}
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#0a3622] focus:ring-1 focus:ring-[#0a3622] transition-colors disabled:bg-slate-50 disabled:opacity-60"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                required
                disabled={loading}
                value={formData.email}
                onChange={handleChange}
                placeholder="name@company.com"
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#0a3622] focus:ring-1 focus:ring-[#0a3622] transition-colors disabled:bg-slate-50 disabled:opacity-60"
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
                name="phone"
                disabled={loading}
                value={formData.phone}
                onChange={handleChange}
                placeholder="+91 98927 00271"
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#0a3622] focus:ring-1 focus:ring-[#0a3622] transition-colors disabled:bg-slate-50 disabled:opacity-60"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Company / Organization
              </label>
              <input
                type="text"
                name="company"
                disabled={loading}
                value={formData.company}
                onChange={handleChange}
                placeholder="Company Name"
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#0a3622] focus:ring-1 focus:ring-[#0a3622] transition-colors disabled:bg-slate-50 disabled:opacity-60"
              />
            </div>
          </div>

          {/* Row 3: Product Category */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Product of Interest
            </label>
            <select
              name="product_interest"
              disabled={loading}
              value={formData.product_interest}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-[#0a3622] focus:ring-1 focus:ring-[#0a3622] transition-colors cursor-pointer disabled:opacity-60"
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
              name="message"
              rows={5}
              required
              disabled={loading}
              value={formData.message}
              onChange={handleChange}
              placeholder="Describe your inquiry, requested quantities, technical specifications, or sample courier requests..."
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#0a3622] focus:ring-1 focus:ring-[#0a3622] transition-colors disabled:bg-slate-50 disabled:opacity-60"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#0a3622] hover:bg-[#15803d] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  <span>Sending…</span>
                </>
              ) : (
                <>
                  <span>Submit Message</span>
                  <span>&rarr;</span>
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  )
}

