import { useState } from 'react'

export default function InquirySection() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    purpose: '',
    message: '',
    file: null,
  })

  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, file: e.target.files[0] }))
    }
  }

  const handleRemoveFile = () => {
    setFormData((prev) => ({ ...prev, file: null }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitting(true)
    setTimeout(() => {
      setSubmitting(false)
      setSubmitted(true)
    }, 600)
  }

  const resetForm = () => {
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      purpose: '',
      message: '',
      file: null,
    })
    setSubmitted(false)
  }

  const purposeOptions = [
    'Food Colors & Lake Dyes',
    'Food Flavours & Emulsions',
    'Fragrances & Aroma Compounds',
    'Essential Oils',
    'Botanical Extracts',
    'Sample Request / Quotation',
    'General Inquiry',
  ]

  return (
    <section id="inquiry-form" className="py-10 sm:py-14 bg-white border-t border-slate-200/80 text-slate-900">
      <div className="max-w-5xl sm:max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Simple Centered Heading */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-2 mb-1.5">
            <span className="w-5 h-[2px] bg-emerald-700 rounded-full" />
            <span className="text-[11px] font-bold tracking-[0.2em] text-[#0a3622] uppercase">
              GET IN TOUCH
            </span>
            <span className="w-5 h-[2px] bg-emerald-700 rounded-full" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900 tracking-tight">
            Send Us a Message
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-slate-500">
            Have a question or looking for a product quote? Fill out the form below.
          </p>
        </div>

        {/* Landscape Wide Form Card */}
        <div className="bg-slate-50/90 rounded-2xl border border-slate-200 p-6 sm:p-8 lg:p-9 shadow-sm">
          {submitted ? (
            <div className="py-10 text-center space-y-3">
              <div className="w-12 h-12 bg-emerald-100 text-[#0a3622] rounded-full flex items-center justify-center mx-auto text-xl font-bold shadow-xs">
                ✓
              </div>
              <h3 className="text-lg font-bold font-heading text-slate-900">
                Message Sent Successfully!
              </h3>
              <p className="text-xs text-slate-600 max-w-sm mx-auto">
                Thank you, <span className="font-semibold text-slate-900">{formData.fullName}</span>. We have received your message and will get back to you shortly.
              </p>
              <button
                type="button"
                onClick={resetForm}
                className="mt-3 px-5 py-2 rounded-xl bg-[#0a3622] hover:bg-emerald-800 text-white font-semibold text-xs transition-colors cursor-pointer"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 items-start text-left">
              
              {/* Left Column: Contact & Purpose Details (lg:col-span-6) */}
              <div className="lg:col-span-6 space-y-3.5">
                {/* Full Name */}
                <div>
                  <label htmlFor="fullName" className="block text-xs font-semibold text-slate-800 mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Full Name"
                    className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:border-[#0a3622] focus:ring-2 focus:ring-emerald-600/20 bg-white text-slate-900 placeholder:text-slate-400 outline-none transition-all"
                  />
                </div>

                {/* Email Id & Contact Number Side by Side */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="email" className="block text-xs font-semibold text-slate-800 mb-1">
                      Email Id <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Email Id"
                      className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:border-[#0a3622] focus:ring-2 focus:ring-emerald-600/20 bg-white text-slate-900 placeholder:text-slate-400 outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-xs font-semibold text-slate-800 mb-1">
                      Contact Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Contact Number"
                      className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:border-[#0a3622] focus:ring-2 focus:ring-emerald-600/20 bg-white text-slate-900 placeholder:text-slate-400 outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Your Purpose */}
                <div>
                  <label htmlFor="purpose" className="block text-xs font-semibold text-slate-800 mb-1">
                    Your Purpose <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="purpose"
                    name="purpose"
                    required
                    value={formData.purpose}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:border-[#0a3622] focus:ring-2 focus:ring-emerald-600/20 bg-white text-slate-900 outline-none transition-all cursor-pointer"
                  >
                    <option value="" disabled>Select your purpose</option>
                    {purposeOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Right Column: Message, Upload & Submit (lg:col-span-6) */}
              <div className="lg:col-span-6 flex flex-col justify-between h-full space-y-3.5">
                {/* Your Message */}
                <div>
                  <label htmlFor="message" className="block text-xs font-semibold text-slate-800 mb-1">
                    Your Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Write your message..."
                    className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:border-[#0a3622] focus:ring-2 focus:ring-emerald-600/20 bg-white text-slate-900 placeholder:text-slate-400 outline-none transition-all resize-none"
                  />
                </div>

                {/* Upload Document & Submit Button in Landscape Row */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end pt-1">
                  {/* Upload Document */}
                  <div className="sm:col-span-7">
                    <label className="block text-xs font-semibold text-slate-800 mb-1">
                      Upload Document <span className="text-[11px] font-normal text-slate-400">(Optional)</span>
                    </label>
                    {formData.file ? (
                      <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-white border border-emerald-300 text-xs">
                        <span className="truncate text-slate-800 font-medium">{formData.file.name}</span>
                        <button
                          type="button"
                          onClick={handleRemoveFile}
                          className="text-red-600 hover:text-red-700 font-bold ml-2 shrink-0 cursor-pointer"
                        >
                          ✕
                        </button>
                      </div>
                    ) : (
                      <label
                        htmlFor="document-upload"
                        className="flex items-center justify-center gap-2 px-3 py-2 border border-dashed border-slate-300 hover:border-emerald-600 rounded-xl bg-white hover:bg-emerald-50/20 transition-colors cursor-pointer text-center"
                      >
                        <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                        </svg>
                        <span className="text-xs font-medium text-slate-600 truncate">
                          Attach file (PDF/DOC)
                        </span>
                        <input
                          id="document-upload"
                          type="file"
                          accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                          onChange={handleFileChange}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="sm:col-span-5">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full py-2.5 px-4 rounded-xl bg-[#0a3622] hover:bg-emerald-800 text-white font-bold text-xs sm:text-sm tracking-wide transition-all shadow-sm hover:shadow flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                    >
                      {submitting ? 'Sending...' : 'Submit Message'}
                    </button>
                  </div>
                </div>
              </div>

            </form>
          )}
        </div>

      </div>
    </section>
  )
}
