import { useState } from 'react'
import { CONTACT_INFO } from '../constants/navigation'

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    name: '',
    company: '',
    country: '',
    email: '',
    product: 'Food Colors',
    message: '',
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="pt-28 sm:pt-36 pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-[#0a3622] bg-emerald-50 border border-emerald-200 px-3.5 py-1 rounded-full">
              Export Communications Desk
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold font-heading text-slate-900 mt-4 tracking-tight">
              Request Samples &amp; Export Quotations
            </h1>
            <p className="text-sm sm:text-base text-slate-600 mt-3 max-w-2xl mx-auto leading-relaxed">
              Connect directly with our international trade specialists for product documentation (COA, MSDS), sample couriers, or bulk container orders.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Contact Details Card */}
            <div className="lg:col-span-5 rounded-3xl bg-slate-50 border border-slate-200 p-8 space-y-6">
              <h2 className="text-2xl font-bold font-heading text-slate-900">
                Corporate &amp; Export Office
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Our export documentation and technical liaison teams ensure swift response times for international importers across all time zones.
              </p>

              <div className="space-y-4 text-sm text-slate-700">
                <div className="flex items-start gap-3">
                  <span className="text-xl text-amber-700">📍</span>
                  <div>
                    <div className="font-semibold text-slate-900">Headquarters</div>
                    <div className="text-xs text-slate-600 mt-0.5">
                      Exim Gateway Towers, Sector 11, CBD Belapur, Navi Mumbai - 400614, Maharashtra, India
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-xl text-amber-700">📞</span>
                  <div>
                    <div className="font-semibold text-slate-900">Direct Telephone</div>
                    <a href={`tel:${CONTACT_INFO.phone}`} className="text-xs text-emerald-800 hover:underline">
                      {CONTACT_INFO.phone} / {CONTACT_INFO.mobile}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-xl text-amber-700">✉️</span>
                  <div>
                    <div className="font-semibold text-slate-900">Export Desk Email</div>
                    <a href={`mailto:${CONTACT_INFO.email}`} className="text-xs text-emerald-800 hover:underline">
                      {CONTACT_INFO.email}
                    </a>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200">
                  <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                    Export Certifications
                  </div>
                  <div className="text-xs text-slate-700 font-medium">
                    {CONTACT_INFO.certifications}
                  </div>
                </div>
              </div>
            </div>

            {/* Inquiry Form */}
            <div className="lg:col-span-7 rounded-3xl bg-white border border-slate-200 p-8 shadow-sm">
              {submitted ? (
                <div className="p-8 text-center space-y-4">
                  <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-3xl">
                    ✓
                  </div>
                  <h3 className="text-2xl font-bold font-heading text-slate-900">
                    Inquiry Received
                  </h3>
                  <p className="text-sm text-slate-600 max-w-md mx-auto">
                    Thank you, {form.name}. Our export specialist will contact you within 24 hours with product specifications, sample dispatch details, and pricing.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h2 className="text-xl font-bold font-heading text-slate-900 mb-2">
                    Send Direct Export Inquiry
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm focus:outline-none focus:border-emerald-700"
                        placeholder="John Smith"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Company / Enterprise</label>
                      <input
                        type="text"
                        required
                        value={form.company}
                        onChange={(e) => setForm({ ...form, company: e.target.value })}
                        className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm focus:outline-none focus:border-emerald-700"
                        placeholder="Global Foods Ltd."
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Destination Country</label>
                      <input
                        type="text"
                        required
                        value={form.country}
                        onChange={(e) => setForm({ ...form, country: e.target.value })}
                        className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm focus:outline-none focus:border-emerald-700"
                        placeholder="Germany, UAE, USA..."
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Corporate Email</label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm focus:outline-none focus:border-emerald-700"
                        placeholder="buyer@company.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Product of Interest</label>
                    <select
                      value={form.product}
                      onChange={(e) => setForm({ ...form, product: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm focus:outline-none focus:border-emerald-700"
                    >
                      <option value="Food Colors">Food Colors &amp; Lakes</option>
                      <option value="Flavours & Emulsions">Flavours &amp; Beverage Emulsions</option>
                      <option value="Fragrances">Fragrances &amp; Aromatic Compounds</option>
                      <option value="Essential Oils">Pure Indian Essential Oils</option>
                      <option value="Botanical Extracts">Standardized Botanical Extracts</option>
                      <option value="Custom Formulation">Custom Formulation / Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Inquiry / Sample Requirements</label>
                    <textarea
                      rows={4}
                      required
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm focus:outline-none focus:border-emerald-700"
                      placeholder="Specify required quantity, delivery port, certification requirements, or technical specs..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full rounded-xl bg-[#0a3622] hover:bg-[#0f4d30] text-white py-3 font-semibold text-sm shadow-md transition-all cursor-pointer active:scale-95"
                  >
                    Submit Export Inquiry &rarr;
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
    </div>
  )
}
