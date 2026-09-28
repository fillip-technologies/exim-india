import { useState } from 'react'
import bgTelephoneImg from '../../assets/support-bg-telephone.jpg'

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
              className="w-full h-full object-cover object-left lg:object-center"
            />
            {/* Subtle soft gradient that keeps the left phone 100% vivid while providing a clean white canvas for the form */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent via-40% to-white/90 to-75%" />
          </div>

          {/* Mobile Telephone Header Banner */}
          <div className="md:hidden relative h-52 sm:h-64 w-full overflow-hidden bg-white border-b border-slate-100">
            <img
              src={bgTelephoneImg}
              alt="Need support? Direct contact telephone"
              className="w-full h-full object-cover object-left"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
          </div>

          {/* Card Content Grid */}
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 items-center min-h-[560px]">
            
            {/* Left Spacer on Desktop: Completely clean to let the telephone handset and cord shine */}
            <div className="hidden md:block md:col-span-5 lg:col-span-5" aria-hidden="true" />

            {/* Right Side: Form Container */}
            <div className="md:col-span-7 lg:col-span-7 p-6 sm:p-9 lg:p-12 text-left bg-white/95 md:bg-transparent backdrop-blur-xs md:backdrop-blur-none">
              
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
                <div className="py-12 text-center space-y-3.5 bg-white/95 backdrop-blur-md rounded-2xl p-6 border border-emerald-100 shadow-sm">
                  <div className="w-14 h-14 bg-emerald-100 text-[#0a3622] rounded-full flex items-center justify-center mx-auto text-2xl font-bold shadow-xs">
                    ✓
                  </div>
                  <h4 className="text-lg font-bold font-heading text-slate-900">
                    Message Sent Successfully!
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 max-w-sm mx-auto">
                    Thank you, <span className="font-semibold text-slate-900">{formData.fullName}</span>. Our support team will get in touch with you shortly.
                  </p>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="mt-4 px-6 py-2.5 rounded-xl bg-[#eb4738] hover:bg-[#d83c2e] text-white font-bold text-xs sm:text-sm tracking-wider uppercase transition-all shadow-md shadow-[#eb4738]/25 cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
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
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Your full name"
                      className="w-full px-4 py-3 text-xs sm:text-sm rounded-xl bg-[#f5f1ef]/85 hover:bg-[#f5f1ef] focus:bg-white border border-[#ebdcd8]/80 focus:border-[#eb4738] focus:ring-2 focus:ring-[#eb4738]/20 outline-none transition-all placeholder:text-slate-400 text-slate-900 shadow-xs"
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
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@company.com"
                        className="w-full px-4 py-3 text-xs sm:text-sm rounded-xl bg-[#f5f1ef]/85 hover:bg-[#f5f1ef] focus:bg-white border border-[#ebdcd8]/80 focus:border-[#eb4738] focus:ring-2 focus:ring-[#eb4738]/20 outline-none transition-all placeholder:text-slate-400 text-slate-900 shadow-xs"
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
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 / International"
                        className="w-full px-4 py-3 text-xs sm:text-sm rounded-xl bg-[#f5f1ef]/85 hover:bg-[#f5f1ef] focus:bg-white border border-[#ebdcd8]/80 focus:border-[#eb4738] focus:ring-2 focus:ring-[#eb4738]/20 outline-none transition-all placeholder:text-slate-400 text-slate-900 shadow-xs"
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
                      value={formData.purpose}
                      onChange={handleChange}
                      className="w-full px-4 py-3 text-xs sm:text-sm rounded-xl bg-[#f5f1ef]/85 hover:bg-[#f5f1ef] focus:bg-white border border-[#ebdcd8]/80 focus:border-[#eb4738] focus:ring-2 focus:ring-[#eb4738]/20 outline-none transition-all text-slate-900 cursor-pointer shadow-xs"
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
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Write your request details here..."
                      className="w-full px-4 py-3 text-xs sm:text-sm rounded-xl bg-[#f5f1ef]/85 hover:bg-[#f5f1ef] focus:bg-white border border-[#ebdcd8]/80 focus:border-[#eb4738] focus:ring-2 focus:ring-[#eb4738]/20 outline-none transition-all placeholder:text-slate-400 text-slate-900 resize-none shadow-xs"
                    />
                  </div>

                  {/* Bottom Row: File Attachment (Optional) & SUBMIT Button */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3.5 pt-2">
                    {/* Optional File Attachment */}
                    <div className="shrink-0">
                      {formData.file ? (
                        <div className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white border border-emerald-300 text-xs shadow-xs">
                          <span className="truncate max-w-[160px] text-slate-800 font-medium">
                            {formData.file.name}
                          </span>
                          <button
                            type="button"
                            onClick={handleRemoveFile}
                            className="text-red-600 hover:text-red-700 font-bold cursor-pointer"
                          >
                            ✕
                          </button>
                        </div>
                      ) : (
                        <label
                          htmlFor="document-upload"
                          className="inline-flex items-center gap-2 px-3.5 py-2.5 border border-dashed border-slate-300 hover:border-[#eb4738] rounded-xl bg-white hover:bg-slate-50 transition-colors cursor-pointer text-xs font-medium text-slate-600 shadow-xs"
                        >
                          <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                          </svg>
                          <span>Attach Document (Optional)</span>
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

                    {/* SUBMIT Button */}
                    <div className="sm:ml-auto">
                      <button
                        type="submit"
                        disabled={submitting}
                        className="w-full sm:w-auto px-10 py-3.5 rounded-xl bg-[#eb4738] hover:bg-[#d83c2e] text-white font-extrabold uppercase tracking-wider text-xs sm:text-sm shadow-xl shadow-[#eb4738]/30 hover:shadow-[#eb4738]/50 active:scale-95 transition-all cursor-pointer disabled:opacity-60 flex items-center justify-center gap-2"
                      >
                        {submitting ? 'SENDING...' : 'SUBMIT'}
                      </button>
                    </div>
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
