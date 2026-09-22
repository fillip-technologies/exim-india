export default function ContactInfoCards() {
  const offices = [
    {
      id: 'headquarters',
      tag: 'Global Headquarters',
      title: 'Mumbai Corporate Office',
      icon: '🏢',
      address:
        'San Mamede Cottage, Flat No. 1, 1st Floor, Cross Road No. 4, I. C. Colony, Borivali West, Mumbai, Maharashtra 400103, India.',
      phones: [
        { label: 'Mr. Sanjay Shenoy (Partner)', number: '+91 98927 00271', wa: '919892700271' },
        { label: "Mr. Clifford D'Souza (Partner)", number: '+91 98923 64600', wa: '919892364600' },
        { label: 'Mr. Narayan Tari (General Manager)', number: '+91 98673 42704', wa: '919867342704' },
        { label: 'Board Line Tel', number: '+91 22 2892 5032' },
      ],
      emails: ['info@eximindiacorporation.com', 'eximindiacorp@gmail.com'],
      badgeColor: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    },
    {
      id: 'dubai',
      tag: 'Middle East Hub',
      title: 'Dubai / UAE Regional Desk',
      icon: '🌍',
      address:
        'Orchid Residency, Al Nahda, Sharjah / Dubai, United Arab Emirates.',
      phones: [
        { label: 'Direct UAE Liaison Line', number: '+971 50 802 7804', wa: '971508027804' },
      ],
      emails: ['info@eximindiacorporation.com'],
      badgeColor: 'bg-amber-50 text-amber-800 border-amber-200',
      note: 'Serving GCC, Levant, Middle Eastern & African trade partners with regional coordination.',
    },
    {
      id: 'warehouses',
      tag: 'Export Logistics & QC Hubs',
      title: 'Packaging & Warehouse Depots',
      icon: '📦',
      address:
        'Pooja Complex, Opp. Bhadra Petrol Pump, Near Apollo Roadlines, Rahnal Village, Bhiwandi, Maharashtra.',
      secondAddress:
        'Andhra Bombay Carriers, Sativali Road, Vasai East, Thane, Maharashtra.',
      phones: [
        { label: 'Logistics Dispatch Desk', number: '+91 22 2892 5032' },
      ],
      emails: ['exports@eximindiacorp.com'],
      badgeColor: 'bg-blue-50 text-blue-800 border-blue-200',
      note: 'Prime transit corridors connected directly to JNPT Nhava Sheva Sea Port and Mumbai Air Cargo.',
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {offices.map((office) => (
        <div
          key={office.id}
          className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-7 shadow-xs hover:shadow-xl hover:border-emerald-600/40 transition-all duration-300 flex flex-col justify-between"
        >
          <div>
            {/* Badge & Icon */}
            <div className="flex items-center justify-between gap-2 mb-4">
              <span
                className={`text-[11px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full border ${office.badgeColor}`}
              >
                {office.tag}
              </span>
              <span className="text-2xl">{office.icon}</span>
            </div>

            {/* Title */}
            <h2 className="text-lg sm:text-xl font-bold font-heading text-slate-900 mb-2">
              {office.title}
            </h2>

            {/* Address */}
            <div className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4 flex items-start gap-2">
              <span className="text-slate-400 mt-0.5 shrink-0">📍</span>
              <span>{office.address}</span>
            </div>

            {office.secondAddress && (
              <div className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4 flex items-start gap-2 border-t border-slate-100 pt-2">
                <span className="text-slate-400 mt-0.5 shrink-0">📍</span>
                <span>{office.secondAddress}</span>
              </div>
            )}

            {/* Phone List */}
            <div className="space-y-2 border-t border-slate-100 pt-4 mb-4">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Direct Contacts
              </div>
              {office.phones.map((phone, idx) => (
                <div key={idx} className="flex flex-col text-xs">
                  <span className="text-slate-500 font-medium">{phone.label}</span>
                  <div className="flex items-center gap-2 mt-0.5">
                    <a
                      href={`tel:${phone.number.replace(/\s+/g, '')}`}
                      className="font-bold text-slate-900 hover:text-emerald-800 transition-colors"
                    >
                      {phone.number}
                    </a>
                    {phone.wa && (
                      <a
                        href={`https://wa.me/${phone.wa}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[10px] bg-emerald-100/80 hover:bg-emerald-200 text-emerald-800 px-1.5 py-0.5 rounded font-bold transition-colors"
                        title="Chat on WhatsApp"
                      >
                        WhatsApp ↗
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Email & Note Footer */}
          <div className="border-t border-slate-100 pt-4 space-y-2">
            <div className="text-xs text-slate-600">
              <span className="font-semibold text-slate-700">Email: </span>
              {office.emails.map((em, idx) => (
                <a
                  key={idx}
                  href={`mailto:${em}`}
                  className="text-emerald-800 hover:text-emerald-950 hover:underline font-semibold block truncate"
                >
                  {em}
                </a>
              ))}
            </div>

            {office.note && (
              <p className="text-[11px] text-slate-500 italic bg-slate-50 p-2 rounded-xl border border-slate-100">
                {office.note}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
