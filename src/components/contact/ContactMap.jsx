export default function ContactMap() {
  // Google Map embed URL centered on Borivali West, Mumbai (can easily replace with specific pin embed later)
  const mapSrc =
    'https://maps.google.com/maps?q=I.C.+Colony,+Borivali+West,+Mumbai,+Maharashtra+400103,+India&t=&z=15&ie=UTF8&iwloc=&output=embed'

  return (
    <section className="py-12 sm:py-16 bg-white border-t border-slate-200/80 font-body">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="w-6 h-0.5 bg-[#c59b27] rounded-full inline-block" />
            <span className="text-xs font-black uppercase tracking-widest text-[#0a3622] font-heading">
              LOCATION &amp; DIRECTIONS
            </span>
            <span className="w-6 h-0.5 bg-[#c59b27] rounded-full inline-block" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900 tracking-tight">
            Our Corporate Office Location
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
            San Mamede Cottage, Flat No. 1, 1st Floor, Cross Road No. 4, I. C. Colony, Borivali West, Mumbai - 400103, Maharashtra, India.
          </p>
        </div>

        {/* Map Wrapper with Floating Card */}
        <div className="relative w-full h-[400px] sm:h-[480px] lg:h-[520px] rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-200/90 shadow-md">
          {/* Google Maps Iframe */}
          <iframe
            title="Exim India Corporation Office Map"
            src={mapSrc}
            className="w-full h-full border-0"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          />

          {/* Floating Directions Badge on Map */}
          <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 z-10 bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-2xl p-4 sm:p-5 shadow-xl max-w-xs sm:max-w-sm text-left">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 font-heading">
                Corporate Headquarters
              </span>
            </div>
            <h3 className="font-bold text-slate-900 text-sm sm:text-base mt-1">
              Exim India Corporation
            </h3>
            <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
              I. C. Colony, Borivali West, Mumbai 400103
            </p>
            <div className="mt-3 pt-2.5 border-t border-slate-100">
              <a
                href="https://maps.google.com/?q=I.C.+Colony,+Borivali+West,+Mumbai,+Maharashtra+400103,+India"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0a3622] hover:text-[#15803d] transition-colors"
              >
                <span>Open in Google Maps</span>
                <span>&rarr;</span>
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
