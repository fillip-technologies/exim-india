import ContactHero from '../components/contact/ContactHero'
import ContactInfoCards from '../components/contact/ContactInfoCards'
import ContactForm from '../components/contact/ContactForm'
import ContactLogisticsFaq from '../components/contact/ContactLogisticsFaq'

export default function Contact() {
  const trustBadges = [
    { title: 'ISO 9001:2015', desc: 'Certified Quality Management' },
    { title: 'WHO-GMP Compliant', desc: 'Good Manufacturing Practices' },
    { title: 'Halal & Kosher Certified', desc: 'Global Dietary Compliance' },
    { title: 'FSSAI Licensed', desc: 'Food Safety & Standards Authority' },
    { title: 'US FDA Registered', desc: 'Compliant D&C & Food Grades' },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* 1. Hero Section */}
      <ContactHero />

      {/* 2. Global Compliance & Accreditation Strip */}
      <section className="border-b border-slate-200/80 bg-slate-50/60 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center sm:justify-between gap-4 text-center sm:text-left">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 shrink-0" />
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Export Compliance Standards:
              </span>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
              {trustBadges.map((badge, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-200 shadow-2xs text-[11px] font-bold text-slate-700 hover:border-emerald-600 transition-colors"
                  title={badge.desc}
                >
                  <span className="text-emerald-700">✓</span>
                  <span>{badge.title}</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
        {/* 3. Corporate Offices & Hubs Grid */}
        <section>
          <div className="max-w-2xl mb-8">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-800 bg-emerald-100/70 px-2.5 py-1 rounded-md border border-emerald-200">
              Corporate Directory
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900 mt-2">
              Our Offices, Liaison Desks &amp; Depots
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Direct access to our senior leadership, logistics managers, and export coordination desks.
            </p>
          </div>
          <ContactInfoCards />
        </section>

        {/* 4. Official Export Inquiry Form + Priority Support Sidebar */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Form (8 cols on lg) */}
          <div className="lg:col-span-8">
            <ContactForm />
          </div>

          {/* Right Support & Fast-Track Sidebar (4 cols on lg) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Instant Priority Desk Card */}
            <div className="bg-gradient-to-br from-emerald-50 via-white to-slate-50 rounded-3xl border border-emerald-200/80 p-6 sm:p-7 shadow-xs">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-900 bg-emerald-200/60 px-2.5 py-0.5 rounded-full border border-emerald-300">
                Direct Partner Line
              </span>
              <h3 className="text-lg font-bold font-heading text-slate-900 mt-3">
                Need Immediate Pricing or Sample Expediting?
              </h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Connect directly with our designated partners for urgent tender submissions, custom lab matching, or commercial contract finalization.
              </p>

              <div className="mt-5 space-y-3">
                <a
                  href="https://wa.me/919892700271?text=Hello%20Mr.%20Sanjay%20Shenoy,%20I%20have%20an%20urgent%20inquiry%20regarding%20Exim%20India%20products."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-[#0a3622] hover:bg-[#15803d] text-white text-xs font-bold transition-all shadow-xs cursor-pointer group"
                >
                  <span className="flex items-center gap-2">
                    <span>💬</span>
                    <span>Chat with Mr. Sanjay Shenoy</span>
                  </span>
                  <span className="group-hover:translate-x-0.5 transition-transform">&rarr;</span>
                </a>

                <a
                  href="https://wa.me/919892364600?text=Hello%20Mr.%20Clifford%20D'Souza,%20I%20am%20reaching%20out%20from%20the%20Exim%20India%20website."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 text-xs font-bold transition-all shadow-xs cursor-pointer group"
                >
                  <span className="flex items-center gap-2">
                    <span>💬</span>
                    <span>Chat with Mr. Clifford D&apos;Souza</span>
                  </span>
                  <span className="group-hover:translate-x-0.5 transition-transform">&rarr;</span>
                </a>
              </div>
            </div>

            {/* Standard Documentation Checklist Card */}
            <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-7 shadow-xs space-y-4">
              <h3 className="text-sm font-bold font-heading text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <span>📑</span>
                <span>Export Dossiers Provided</span>
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                All consignments are supplied with complete international regulatory dossiers for swift customs &amp; health authority clearance:
              </p>

              <ul className="space-y-2 text-xs text-slate-700">
                <li className="flex items-center gap-2">
                  <span className="text-emerald-700 font-bold">✓</span>
                  <span>Certificate of Analysis (Batch-Specific COA)</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-700 font-bold">✓</span>
                  <span>Safety Data Sheet (16-Point GHS MSDS)</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-700 font-bold">✓</span>
                  <span>Halal &amp; Kosher Authenticity Certificates</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-700 font-bold">✓</span>
                  <span>Non-GMO &amp; Allergen Declarations</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-700 font-bold">✓</span>
                  <span>Chamber of Commerce Certificate of Origin</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-700 font-bold">✓</span>
                  <span>Phytosanitary &amp; Fumigation (Where applicable)</span>
                </li>
              </ul>
            </div>

            {/* Operating Hours Card */}
            <div className="bg-slate-50/80 rounded-3xl border border-slate-200/90 p-6 shadow-xs">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2 flex items-center gap-2">
                <span>🕒</span>
                <span>Global Working Hours</span>
              </h4>
              <div className="text-xs text-slate-600 space-y-1.5 leading-relaxed">
                <div className="flex justify-between">
                  <span className="font-semibold text-slate-700">Monday – Saturday:</span>
                  <span>09:30 AM – 06:30 PM IST</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-slate-700">Sunday:</span>
                  <span className="text-slate-500">Emergency Dispatch Only</span>
                </div>
                <div className="flex justify-between pt-1 border-t border-slate-200">
                  <span className="font-semibold text-slate-700">Time Zone:</span>
                  <span className="text-emerald-800 font-bold">IST (GMT +5:30)</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Logistics Transit & Buyer FAQ Section */}
        <section>
          <ContactLogisticsFaq />
        </section>
      </div>
    </div>
  )
}
