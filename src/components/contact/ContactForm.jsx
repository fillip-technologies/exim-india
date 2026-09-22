import { useState } from 'react'

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [inquiryType, setInquiryType] = useState('Quotation')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    country: '',
    product: 'Synthetic Food Colours',
    quantity: '500 Kgs',
    incoterm: 'FOB JNPT Mumbai',
    message: '',
  })

  const inquiryTypes = [
    { id: 'Quotation', label: 'Commercial Price Quotation' },
    { id: 'Samples', label: 'Sample Courier Request' },
    { id: 'Technical', label: 'COA / MSDS / Halal Dossier' },
    { id: 'Custom', label: 'Custom Formulation / Shade Match' },
  ]

  const productCategories = [
    'Synthetic Food Colours (Powders & Dyes)',
    'Aluminum Lake Colours',
    'Blended Food Colours',
    'Cosmetic Colours (US FDA D&C Grade)',
    'Pharmaceutical Colours (IP / USP Grade)',
    'Liquid Food Flavours',
    'Emulsion Flavours & Clouding Bases',
    'Powder Flavours (Encapsulated)',
    'Disco Dust Powder & Lustre Shimmers',
    'Food Additives (Citric Acid, Lecithin, Gelatin)',
    'Titanium Dioxide (Rutile & Anatase Food/Pharma)',
    'Natural Food Colors (Annatto, Chlorophyll, Beet)',
    'Pearl Pigment Powder (Food & Cosmetic Mica)',
    'Edible Lustre Dust',
    'Fluorescent Colours (High-Visibility)',
    'Natural Fruit Powder (Spray Dried)',
    'Fruit Fragrances & Aromatic Compounds',
    'Mango Pulp & Purees (Alphonso & Totapuri)',
    'Industrial & Pharmaceutical Chemicals',
  ]

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitted(true)
    }, 600)
  }

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-10 shadow-sm">
      {/* Header Inside Card */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-slate-100">
        <div>
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-800 bg-emerald-100/70 px-2.5 py-1 rounded-md border border-emerald-200">
            Export Inquiry Portal
          </span>
          <h2 className="text-xl sm:text-2xl font-extrabold font-heading text-slate-900 mt-2">
            Send Official Business Inquiry
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Fill out the export requisition below for immediate response from our international sales directorate.
          </p>
        </div>

        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 shrink-0">
          <span className="text-emerald-600 font-bold">●</span>
          <span>Average Response: <strong>&lt; 2 Hours</strong></span>
        </div>
      </div>

      {submitted ? (
        /* Success State */
        <div className="py-12 px-4 text-center space-y-4 max-w-lg mx-auto animate-fadeIn">
          <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-3xl font-bold shadow-xs">
            ✓
          </div>
          <h3 className="text-2xl font-extrabold font-heading text-slate-900">
            Export Inquiry Dispatched Successfully
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Thank you, <strong className="text-slate-900">{formData.name}</strong> from{' '}
            <strong className="text-slate-900">{formData.company || 'your enterprise'}</strong>. Your requisition has been logged with reference ticket{' '}
            <code className="bg-slate-100 text-slate-800 font-mono text-xs px-2 py-0.5 rounded border border-slate-200">
              EXIM-{Math.floor(100000 + Math.random() * 900000)}
            </code>
            . Our trade specialist for <strong className="text-slate-900">{formData.country || 'your territory'}</strong> will connect via email and WhatsApp.
          </p>

          <div className="pt-4 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={() => {
                setSubmitted(false)
                setFormData({
                  name: '',
                  email: '',
                  phone: '',
                  company: '',
                  country: '',
                  product: 'Synthetic Food Colours',
                  quantity: '500 Kgs',
                  incoterm: 'FOB JNPT Mumbai',
                  message: '',
                })
              }}
              className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-all cursor-pointer"
            >
              Submit Another Inquiry
            </button>

            <a
              href={`https://wa.me/919892700271?text=Hello%20Exim%20India,%20I%20just%20submitted%20an%20inquiry%20for%20${encodeURIComponent(
                formData.product
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl bg-[#0a3622] hover:bg-[#15803d] text-white text-xs font-bold transition-all cursor-pointer shadow-sm"
            >
              Fast-Track on WhatsApp ↗
            </a>
          </div>
        </div>
      ) : (
        /* Form View */
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Inquiry Type Selector Pills */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Primary Purpose of Requisition
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {inquiryTypes.map((type) => (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => setInquiryType(type.id)}
                  className={`py-2 px-3 rounded-xl text-xs font-bold transition-all text-center border cursor-pointer ${
                    inquiryType === type.id
                      ? 'bg-[#0a3622] text-white border-[#0a3622] shadow-xs'
                      : 'bg-slate-50/70 hover:bg-slate-100 text-slate-700 border-slate-200'
                  }`}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </div>

          {/* Row 1: Name & Corporate Email */}
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
                placeholder="e.g. Michael Robertson"
                className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0a3622]/20 focus:border-[#0a3622] transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Corporate Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="buyer@globalcorp.com"
                className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0a3622]/20 focus:border-[#0a3622] transition-all"
              />
            </div>
          </div>

          {/* Row 2: Phone / WhatsApp & Company */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Phone / WhatsApp Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+1 (555) 019-2834 or +971..."
                className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0a3622]/20 focus:border-[#0a3622] transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Company / Importer Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                placeholder="Apex Foods International LLC"
                className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0a3622]/20 focus:border-[#0a3622] transition-all"
              />
            </div>
          </div>

          {/* Row 3: Destination Country & Product Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Destination Port / Country <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.country}
                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                placeholder="e.g. Hamburg (Germany), Jebel Ali (UAE), Long Beach (USA)"
                className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0a3622]/20 focus:border-[#0a3622] transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Product of Interest <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.product}
                onChange={(e) => setFormData({ ...formData, product: e.target.value })}
                className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0a3622]/20 focus:border-[#0a3622] transition-all cursor-pointer"
              >
                {productCategories.map((prod) => (
                  <option key={prod} value={prod}>
                    {prod}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Row 4: Target Quantity & Incoterms */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Estimated Order Quantity
              </label>
              <input
                type="text"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                placeholder="e.g. 500 Kgs, 2x 20ft FCL, 25 Kg sample"
                className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0a3622]/20 focus:border-[#0a3622] transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Preferred Shipping Terms (Incoterms)
              </label>
              <select
                value={formData.incoterm}
                onChange={(e) => setFormData({ ...formData, incoterm: e.target.value })}
                className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0a3622]/20 focus:border-[#0a3622] transition-all cursor-pointer"
              >
                <option value="FOB JNPT Mumbai">FOB - JNPT (Nhava Sheva) Mumbai</option>
                <option value="CIF Destination Port">CIF - Destination Sea Port</option>
                <option value="CFR Destination Port">CFR - Cost &amp; Freight</option>
                <option value="Air Courier Samples">Air Freight / Courier Express (Samples)</option>
                <option value="Ex-Works Mumbai">Ex-Works - Mumbai Warehouse</option>
              </select>
            </div>
          </div>

          {/* Message / Specifications Textarea */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Technical Specifications / Custom Requirements <span className="text-red-500">*</span>
            </label>
            <textarea
              rows={4}
              required
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Please describe application type (e.g. confectionery, beverage, pharmaceutical syrup, bakery), requested shade/purity percentage, cert requirements (Halal, Kosher, FSSAI, US-FDA), or courier delivery address for sample dispatch..."
              className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0a3622]/20 focus:border-[#0a3622] transition-all"
            />
          </div>

          {/* Submit Button & Security Reassurance */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-[11px] text-slate-500 flex items-center gap-1.5">
              <span>🔒</span>
              <span>Encrypted corporate data transmission. Zero spam guarantee.</span>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#0a3622] hover:bg-[#15803d] text-white font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  <span>Transmitting...</span>
                </>
              ) : (
                <>
                  <span>Dispatch Export Inquiry</span>
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
