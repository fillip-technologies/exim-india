import { useState } from 'react'
import bgTelephoneImg from '../../assets/support-bg-telephone.jpg'
import { submitContact } from '../../api'

export default function InquirySection() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    purpose: '',
    message: '',
    website: '', // Honeypot field for anti-spam
  })

  const [submitted, setSubmitted]   = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError]           = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (error) setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSubmitting(true)

    try {
      await submitContact({
        name:             formData.fullName.trim(),
        email:            formData.email.trim(),
        phone:            formData.phone.trim() || undefined,
        product_interest: formData.purpose || undefined,
        message:          formData.message.trim(),
        website:          formData.website || undefined,
      })

      setSubmitted(true)
    } catch (err) {
      console.error('Support inquiry submission failed:', err)
      const msg =
        err?.errors?.message?.[0] ||
        err?.errors?.email?.[0] ||
        err?.errors?.name?.[0] ||
        err?.errors?.phone?.[0] ||
        err?.message ||
        'Unable to send your inquiry. Please verify your details and try again.'
      setError(msg)
    } finally {
      setSubmitting(false)
    }
  }

  const resetForm = () => {
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      purpose: '',
      message: '',
      website: '',
    })
    setError('')
    setSubmitted(false)
  }

  const purposeOptions = [
    'Food Colors & Lake Dyes',
    'Food Flavours & Emulsions',
    'Fragrances & Aroma Compounds',
    'Essential Oils & Extracts',
    'Cosmetic Colours & Pigments',
    'Sample Request / Quotation',
    'General Inquiry',
  ]

  return (
    <section id="inquiry-form" className="py-12 sm:py-16 bg-[#f8fafc] border-t border-slate-200/80 text-slate-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Seamless Panoramic Support Card */}
        <div className="relative w-full bg-white rounded-3xl border border-slate-200/80 shadow-2xl shadow-slate-200/60 overflow-hidden">
          
          {/* Panoramic Telephone Background on Desktop */}
          <div className="hidden md:block absolute inset-0 w-full h-full pointer-events-none select-none">
            <img
              src={bgTelephoneImg}
              alt="Need support? Direct contact telephone"
              className="w-full h-full object-cover object-left"
            />
            {/* Soft gradient that keeps the left telephone vivid while providing a clean canvas for the form */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent via-35% to-white/95 to-65%" />
          </div>

          {/* Mobile Telephone Header Banner */}
          <div className="md:hidden relative h-48 sm:h-56 w-full overflow-hidden bg-white border-b border-slate-100">
            <img
              src={bgTelephoneImg}
              alt="Need support? Direct contact telephone"
              className="w-full h-full object-cover object-left"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
          </div>

          {/* Card Content Grid */}
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 items-center min-h-[540px]">
            
            {/* Left Spacer on Desktop: Clean space to showcase the telephone handset and cord */}
            <div className="hidden md:block md:col-span-5" aria-hidden="true" />

            {/* Right Side: Form Container */}
            <div className="md:col-span-7 p-6 sm:p-9 lg:p-11 text-left bg-white/95 md:bg-transparent backdrop-blur-xs md:backdrop-blur-none">
              
              {/* Header */}
              <div className="mb-6">
                <h3 className="text-3xl sm:text-4xl font-black font-heading text-[#eb4738] tracking-tight">
                  Need support?
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
                  Contact us if you need further assistance.
                </p>
              </div>

              {submitted ? (
                /* Success State */
                <div className="py-10 text-center space-y-4 bg-white/95 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-emerald-100 shadow-sm animate-fadeIn">
                  <div className="w-14 h-14 bg-emerald-100 text-[#0a3622] rounded-full flex items-center justify-center mx-auto text-2xl font-bold shadow-xs">
                    ✓
                  </div>
                  <h4 className="text-xl font-bold font-heading text-slate-900">
                    Message Sent Successfully!
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 max-w-sm mx-auto leading-relaxed">
                    Thank you, <span className="font-semibold text-slate-900">{formData.fullName}</span>. Your inquiry has been delivered directly to our team. We will get back to you shortly.
                  </p>
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={resetForm}
                      className="px-6 py-2.5 rounded-xl bg-[#eb4738] hover:bg-[#d83c2e] text-white font-bold text-xs sm:text-sm tracking-wider uppercase transition-all shadow-md shadow-[#eb4738]/25 cursor-pointer active:scale-95"
                    >
                      Send Another Message
                    </button>
                  </div>
                </div>
              ) : (
                /* Contact / Inquiry Form */
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Error Alert */}
                  {error && (
                    <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm flex items-start gap-2.5">
                      <span className="font-bold text-red-500 text-base leading-none">⚠</span>
                      <span className="flex-1">{error}</span>
                    </div>
                  )}

                  {/* Honeypot field (hidden from real users) */}
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

                  {/* Name and surname */}
                  <div>
                    <label htmlFor="fullName" className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Name and surname <span className="text-[#eb4738]">*</span>
                    </label>
                    <input
                      id="fullName"
                      name="fullName"
                      type="text"
                      required
                      disabled={submitting}
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Your full name"
                      className="w-full px-4 py-3 text-xs sm:text-sm rounded-xl bg-[#f5f1ef]/85 hover:bg-[#f5f1ef] focus:bg-white border border-[#ebdcd8]/80 focus:border-[#eb4738] focus:ring-2 focus:ring-[#eb4738]/20 outline-none transition-all placeholder:text-slate-400 text-slate-900 shadow-xs disabled:opacity-60"
                    />
                  </div>

                  {/* Email & Contact Number in 2 Columns */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label htmlFor="email" className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Email <span className="text-[#eb4738]">*</span>
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        disabled={submitting}
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@company.com"
                        className="w-full px-4 py-3 text-xs sm:text-sm rounded-xl bg-[#f5f1ef]/85 hover:bg-[#f5f1ef] focus:bg-white border border-[#ebdcd8]/80 focus:border-[#eb4738] focus:ring-2 focus:ring-[#eb4738]/20 outline-none transition-all placeholder:text-slate-400 text-slate-900 shadow-xs disabled:opacity-60"
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Contact Number <span className="text-[#eb4738]">*</span>
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        required
                        disabled={submitting}
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 / International"
                        className="w-full px-4 py-3 text-xs sm:text-sm rounded-xl bg-[#f5f1ef]/85 hover:bg-[#f5f1ef] focus:bg-white border border-[#ebdcd8]/80 focus:border-[#eb4738] focus:ring-2 focus:ring-[#eb4738]/20 outline-none transition-all placeholder:text-slate-400 text-slate-900 shadow-xs disabled:opacity-60"
                      />
                    </div>
                  </div>

                  {/* Product Requirement */}
                  <div>
                    <label htmlFor="purpose" className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Product Requirement <span className="text-[#eb4738]">*</span>
                    </label>
                    <select
                      id="purpose"
                      name="purpose"
                      required
                      disabled={submitting}
                      value={formData.purpose}
                      onChange={handleChange}
                      className="w-full px-4 py-3 text-xs sm:text-sm rounded-xl bg-[#f5f1ef]/85 hover:bg-[#f5f1ef] focus:bg-white border border-[#ebdcd8]/80 focus:border-[#eb4738] focus:ring-2 focus:ring-[#eb4738]/20 outline-none transition-all text-slate-900 cursor-pointer shadow-xs disabled:opacity-60"
                    >
                      <option value="" disabled>Select your requirement</option>
                      {purposeOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Please enter the details of your request. */}
                  <div>
                    <label htmlFor="message" className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Please enter the details of your request. <span className="text-[#eb4738]">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={3}
                      required
                      disabled={submitting}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Write your request details here..."
                      className="w-full px-4 py-3 text-xs sm:text-sm rounded-xl bg-[#f5f1ef]/85 hover:bg-[#f5f1ef] focus:bg-white border border-[#ebdcd8]/80 focus:border-[#eb4738] focus:ring-2 focus:ring-[#eb4738]/20 outline-none transition-all placeholder:text-slate-400 text-slate-900 resize-none shadow-xs disabled:opacity-60"
                    />
                  </div>

                  {/* Bottom Row: Clean and fitted SUBMIT button (Attach document removed) */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <p className="text-[11px] sm:text-xs text-slate-400 font-medium order-2 sm:order-1 text-center sm:text-left">
                      Direct inquiry to Exim India Corporation
                    </p>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full sm:w-auto px-10 py-3.5 rounded-xl bg-[#eb4738] hover:bg-[#d83c2e] text-white font-extrabold uppercase tracking-wider text-xs sm:text-sm shadow-xl shadow-[#eb4738]/30 hover:shadow-[#eb4738]/50 active:scale-95 transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 order-1 sm:order-2 shrink-0"
                    >
                      {submitting ? (
                        <>
                          <svg className="w-4 h-4 animate-spin text-white" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                          </svg>
                          <span>SENDING...</span>
                        </>
                      ) : (
                        <>
                          <span>SUBMIT</span>
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>

          </div>
        </div>

      </div>
    </section>
  )
}
