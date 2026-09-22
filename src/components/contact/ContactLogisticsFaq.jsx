import { useState } from 'react'

export default function ContactLogisticsFaq() {
  const [openFaq, setOpenFaq] = useState(0)
  const [activeLocation, setActiveLocation] = useState('mumbai')

  const faqs = [
    {
      q: 'How fast can sample couriers reach our laboratory or production plant?',
      a: 'Pre-shipment evaluation samples (100g – 1kg) are dispatched within 24–48 hours via express international couriers (DHL / FedEx / Aramex). Transit time to GCC & Middle East is typically 2–3 business days; Europe & Southeast Asia 3–4 days; North America & Latin America 4–5 days. All samples include batch-specific Certificate of Analysis (COA) and MSDS.',
    },
    {
      q: 'What shipping terms (Incoterms) and sea freight ports do you operate from?',
      a: 'We routinely execute contracts under FOB (JNPT / Nhava Sheva Sea Port, Mumbai), CIF (Destination Port), CFR, and Ex-Works Mumbai. Air cargo consignments are routed via Mumbai International Air Cargo (BOM / Sahar). JNPT port is directly linked via dedicated freight expressways to our Bhiwandi and Vasai warehousing depots.',
    },
    {
      q: 'What regulatory and export compliance dossiers accompany shipments?',
      a: 'Every export consignment is accompanied by a full regulatory packet including: Certificate of Analysis (COA), Safety Data Sheet (SDS/MSDS), Halal Certificate, Kosher Certificate, Certificate of Origin (Chamber of Commerce / GSP), Non-GMO & Allergen Statements, and Commercial Packing List with palletized batch tracking.',
    },
    {
      q: 'Can you match custom color shades or create proprietary flavor profiles?',
      a: 'Yes. Our technical team and application laboratory formulate custom shades matching customer spectrophotometer targets, RAL, or Pantone codes. For flavours and fragrances, we formulate tailored flavor profiles (liquid, emulsion, or encapsulated powder) suited to your exact pH, heat processing, and sensory criteria.',
    },
    {
      q: 'What are the standard Minimum Order Quantities (MOQ) and packaging options?',
      a: 'Standard MOQs are 25 kg to 100 kg for specialty dyes, lake pigments, and flavours. For commercial bulk container shipments (FCL / LCL), standard packaging includes 25 kg fiber drums with tamper-proof food-grade polyethylene inner liners, 20 kg HDPE carboys for liquids, or custom-palletized shrink-wrapped export drums.',
    },
  ]

  const locationDetails = {
    mumbai: {
      name: 'Mumbai Corporate Office',
      sub: 'Corporate Headquarters & Commercial Directorate',
      address: 'San Mamede Cottage, Flat No. 1, 1st Floor, Cross Road No. 4, I. C. Colony, Borivali West, Mumbai - 400103, Maharashtra, India',
      hours: 'Mon – Sat: 09:30 AM – 06:30 PM IST (GMT +5:30)',
      phone: '+91 22 2892 5032 / +91 98927 00271',
      mapQuery: 'https://maps.google.com/maps?q=I.+C.+Colony+Borivali+West+Mumbai+400103&t=&z=15&ie=UTF8&iwloc=&output=embed',
    },
    dubai: {
      name: 'Dubai / UAE Regional Desk',
      sub: 'Middle East & North Africa Trade Coordination',
      address: 'Orchid Residency, Al Nahda, Sharjah / Dubai border, United Arab Emirates',
      hours: 'Mon – Fri: 09:00 AM – 06:00 PM GST (GMT +4:00)',
      phone: '+971 50 802 7804',
      mapQuery: 'https://maps.google.com/maps?q=Orchid+Residency+Al+Nahda+Sharjah&t=&z=15&ie=UTF8&iwloc=&output=embed',
    },
    warehouses: {
      name: 'Warehouses & Port Depots',
      sub: 'Bhiwandi & Vasai Packaging Hubs (Near JNPT Sea Port)',
      address: 'Pooja Complex, Opp Bhadra Petrol Pump, Rahnal Village, Bhiwandi & Andhra Bombay Carriers, Sativali Road, Vasai East, Maharashtra',
      hours: 'Dispatch Operations: 24/7 Sea & Air Consignment Processing',
      phone: '+91 22 2892 5032',
      mapQuery: 'https://maps.google.com/maps?q=Bhiwandi+Maharashtra+Warehousing+Zone&t=&z=13&ie=UTF8&iwloc=&output=embed',
    },
  }

  const currentLoc = locationDetails[activeLocation]

  return (
    <div className="space-y-12">
      {/* Port Logistics & Export Hub Advantage Grid */}
      <div className="bg-slate-50/70 rounded-3xl border border-slate-200/90 p-6 sm:p-8">
        <div className="max-w-3xl mb-8">
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-800 bg-emerald-100/70 px-2.5 py-1 rounded-md border border-emerald-200">
            Logistics &amp; Port Infrastructure
          </span>
          <h2 className="text-xl sm:text-2xl font-extrabold font-heading text-slate-900 mt-2">
            Strategically Positioned for Rapid Global Sea &amp; Air Transit
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Our corporate facilities and primary packaging warehouses are located directly along India&apos;s premier western maritime export corridors.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Card 1 */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center text-xl mb-3 border border-emerald-100">
                ⚓
              </div>
              <h3 className="text-sm font-bold text-slate-900 mb-1">
                JNPT (Nhava Sheva) Gateway
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Direct expressway access to India&apos;s largest container seaport, ensuring streamlined customs clearance and timely loading for 20ft &amp; 40ft FCL shipments to 50+ countries.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-slate-500">
              <span>Transit Corridor</span>
              <span className="text-emerald-700 font-bold">Western Expressway</span>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center text-xl mb-3 border border-blue-100">
                ✈️
              </div>
              <h3 className="text-sm font-bold text-slate-900 mb-1">
                Mumbai Air Cargo (BOM / Sahar)
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Only 25 minutes from our headquarters for time-sensitive commercial air freight, perishable food aromas, and pharmaceutical urgent ingredients.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-slate-500">
              <span>Air Freight Hub</span>
              <span className="text-blue-700 font-bold">24-Hr Custom Clearance</span>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center text-xl mb-3 border border-amber-100">
                📦
              </div>
              <h3 className="text-sm font-bold text-slate-900 mb-1">
                DHL &amp; FedEx Express Lab Samples
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Complimentary sample dispatch program for R&amp;D evaluation, complete with tamper-proof packaging, lot certificates, and international courier tracking.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-slate-500">
              <span>Dispatch SLA</span>
              <span className="text-amber-800 font-bold">Within 24–48 Hours</span>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Map & Office Selector Section */}
      <div className="bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-xs">
        <div className="p-6 sm:p-8 border-b border-slate-100">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-800 bg-emerald-100/70 px-2.5 py-1 rounded-md border border-emerald-200">
                Global Coordinates
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold font-heading text-slate-900 mt-2">
                Visit or Dispatch to Our Facilities
              </h2>
            </div>

            {/* Location Switcher Buttons */}
            <div className="inline-flex p-1 bg-slate-100 rounded-2xl border border-slate-200 self-start sm:self-auto">
              <button
                type="button"
                onClick={() => setActiveLocation('mumbai')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeLocation === 'mumbai'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Mumbai HQ
              </button>
              <button
                type="button"
                onClick={() => setActiveLocation('dubai')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeLocation === 'dubai'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Dubai Hub
              </button>
              <button
                type="button"
                onClick={() => setActiveLocation('warehouses')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeLocation === 'warehouses'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Packaging Depots
              </button>
            </div>
          </div>
        </div>

        {/* Location Info Banner + Embedded Map */}
        <div className="grid grid-cols-1 lg:grid-cols-12">
          {/* Details Column */}
          <div className="lg:col-span-5 p-6 sm:p-8 bg-slate-50/50 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-200">
            <div className="space-y-4">
              <div>
                <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
                  {currentLoc.sub}
                </span>
                <h3 className="text-lg sm:text-xl font-bold font-heading text-slate-900 mt-1">
                  {currentLoc.name}
                </h3>
              </div>

              <div className="space-y-3 text-xs sm:text-sm text-slate-700">
                <div className="flex items-start gap-2.5">
                  <span className="text-slate-400 mt-0.5 shrink-0 text-base">📍</span>
                  <span className="leading-relaxed">{currentLoc.address}</span>
                </div>

                <div className="flex items-start gap-2.5">
                  <span className="text-slate-400 mt-0.5 shrink-0 text-base">🕒</span>
                  <span className="leading-relaxed font-medium">{currentLoc.hours}</span>
                </div>

                <div className="flex items-start gap-2.5">
                  <span className="text-slate-400 mt-0.5 shrink-0 text-base">📞</span>
                  <span className="font-semibold text-slate-900">{currentLoc.phone}</span>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-200 mt-6 flex flex-wrap gap-2.5">
              <a
                href={`https://wa.me/919892700271?text=Hello%20Exim%20India,%20I%20am%20inquiring%20about%20${encodeURIComponent(
                  currentLoc.name
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-xs"
              >
                Connect on WhatsApp ↗
              </a>
              <a
                href="mailto:info@eximindiacorporation.com"
                className="px-4 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 text-xs font-bold transition-all shadow-xs"
              >
                Send Direct Email
              </a>
            </div>
          </div>

          {/* Map Column */}
          <div className="lg:col-span-7 h-72 sm:h-96 relative bg-slate-100">
            <iframe
              title={`Map showing ${currentLoc.name}`}
              src={currentLoc.mapQuery}
              className="w-full h-full border-0 grayscale-[25%] contrast-[105%]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>

      {/* Frequently Asked Export Questions Accordion */}
      <div className="bg-slate-50/50 rounded-3xl border border-slate-200/90 p-6 sm:p-10">
        <div className="max-w-3xl mb-8">
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-800 bg-emerald-100/70 px-2.5 py-1 rounded-md border border-emerald-200">
            Buyer Assistance &amp; FAQ
          </span>
          <h2 className="text-xl sm:text-2xl font-extrabold font-heading text-slate-900 mt-2">
            Frequently Asked Export &amp; Procurement Questions
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Key information regarding sample dispatch, quality verification dossiers, and global shipping policies.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                  className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-slate-900 hover:text-emerald-800 cursor-pointer"
                >
                  <span className="leading-snug">{faq.q}</span>
                  <span
                    className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 border border-slate-200 text-xs transition-transform duration-200 ${
                      isOpen ? 'rotate-180 bg-emerald-50 text-emerald-800 border-emerald-300' : 'bg-slate-50 text-slate-500'
                    }`}
                  >
                    ▼
                  </span>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/30">
                    {faq.a}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
