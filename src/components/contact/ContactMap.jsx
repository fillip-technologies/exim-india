export default function ContactMap() {
  // Official Exim India Corporation Google Map pin embed URL
  const mapSrc =
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3408.74558589839!2d72.8471282!3d19.2481348!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b0fcd8d0d0f1%3A0xcc9c6ab99e5cc3a8!2sExim%20India%20Corporation!5e1!3m2!1sen!2sin!4v1790162942080!5m2!1sen!2sin'

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
        </div>

      </div>
    </section>
  )
}
