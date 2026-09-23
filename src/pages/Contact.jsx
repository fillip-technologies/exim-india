import ContactHero from '../components/contact/ContactHero'
import ContactForm from '../components/contact/ContactForm'
import ContactMap from '../components/contact/ContactMap'

export default function Contact() {
  return (
    <div className="min-h-screen bg-white">
      {/* 1. Hero Section with Hero Image */}
      <ContactHero />

      {/* 2. Simple Contact Section with Details & Form */}
      <section className="py-16 sm:py-20 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Left Column: Direct Corporate Contact Details */}
            <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200/90 p-8 sm:p-10 shadow-sm space-y-8">
              <div>
                <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#0a3622] bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
                  Exim India Corporation
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900 mt-3">
                  Get In Touch
                </h2>
                <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                  Have questions about our products, export logistics, or custom formulations? Our team is here to assist you.
                </p>
              </div>

              <div className="space-y-6 text-sm">
                {/* Address */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#0a3622] flex items-center justify-center shrink-0 border border-emerald-100 text-lg">
                    📍
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-base">Corporate Office</h3>
                    <p className="text-slate-600 text-xs sm:text-sm mt-1 leading-relaxed">
                      San Mamede Cottage, Flat No. 1, 1st Floor,<br />
                      Cross Road No. 4, I. C. Colony, Borivali West,<br />
                      Mumbai - 400103, Maharashtra, India.
                    </p>
                  </div>
                </div>

                {/* Telephone */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#0a3622] flex items-center justify-center shrink-0 border border-emerald-100 text-lg">
                    📞
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-base">Call Us Directly</h3>
                    <div className="mt-1 space-y-1 text-xs sm:text-sm">
                      <p className="text-slate-700">
                        <span className="text-slate-500">Board Line: </span>
                        <a href="tel:+912228925032" className="font-semibold text-slate-900 hover:text-[#0a3622]">
                          +91 22 2892 5032
                        </a>
                      </p>
                      <p className="text-slate-700">
                        <span className="text-slate-500">Mr. Sanjay Shenoy: </span>
                        <a href="tel:+919892700271" className="font-semibold text-slate-900 hover:text-[#0a3622]">
                          +91 98927 00271
                        </a>
                      </p>
                      <p className="text-slate-700">
                        <span className="text-slate-500">Mr. Clifford D&apos;Souza: </span>
                        <a href="tel:+919892364600" className="font-semibold text-slate-900 hover:text-[#0a3622]">
                          +91 98923 64600
                        </a>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#0a3622] flex items-center justify-center shrink-0 border border-emerald-100 text-lg">
                    ✉️
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-base">Email Us</h3>
                    <div className="mt-1 space-y-1 text-xs sm:text-sm">
                      <a
                        href="mailto:info@eximindiacorporation.com"
                        className="block font-semibold text-slate-900 hover:text-[#0a3622]"
                      >
                        info@eximindiacorporation.com
                      </a>
                      <a
                        href="mailto:eximindiacorp@gmail.com"
                        className="block text-slate-600 hover:text-[#0a3622]"
                      >
                        eximindiacorp@gmail.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* WhatsApp Quick Chat */}
              <div className="pt-4 border-t border-slate-100">
                <a
                  href="https://wa.me/919892700271?text=Hello%20Exim%20India,%20I%20am%20interested%20in%20your%20products."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#0a3622] hover:bg-[#15803d] text-white text-xs font-bold transition-all shadow-xs"
                >
                  <span>💬</span>
                  <span>Chat with Us on WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Right Column: Contact Form Only */}
            <div className="lg:col-span-7">
              <ContactForm />
            </div>

          </div>
        </div>
      </section>

      {/* 3. Google Maps Section (Office Location) */}
      <ContactMap />
    </div>
  )
}
