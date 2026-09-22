import fdaImg from '../../../assets/FDA-Maharashtra.jpg'
import isoImg from '../../../assets/iso-cer1.png'

export default function QualityAssuranceBanner({ onContactClick }) {
  return (
    <section className="mt-14 pt-12 pb-16 bg-slate-50 border-t border-slate-200/90 text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-8 text-left space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-black tracking-widest text-[#0a3622] uppercase">
              <span className="w-6 h-[2px] bg-emerald-700 rounded-full" />
              <span>EXPORT QUALITY ASSURANCE &amp; PACKAGING</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900 tracking-tight">
              International Packaging &amp; Stringent Regulatory Compliance
            </h2>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl">
              Every production batch is tested spectrophotometrically in our Mumbai testing laboratory. Each consignment dispatched from JNPT Port includes a comprehensive Certificate of Analysis (COA), Material Safety Data Sheet (MSDS), and strict non-heavy-metal verification conforming to US-FDA, EU, and FAO/WHO standards.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-3">
              <div className="p-3 bg-white rounded-xl border border-slate-200">
                <div className="text-xs font-bold text-slate-900">Standard Packaging</div>
                <div className="text-[11px] text-slate-500 mt-0.5">
                  25 Kgs UN-approved fiber drums with dual polythene moisture liners.
                </div>
              </div>

              <div className="p-3 bg-white rounded-xl border border-slate-200">
                <div className="text-xs font-bold text-slate-900">Documentation Included</div>
                <div className="text-[11px] text-slate-500 mt-0.5">
                  Batch COA, MSDS, Certificate of Origin, Halal &amp; Kosher papers.
                </div>
              </div>

              <div className="p-3 bg-white rounded-xl border border-slate-200">
                <div className="text-xs font-bold text-slate-900">Dispatch Port</div>
                <div className="text-[11px] text-slate-500 mt-0.5">
                  JNPT (Nhava Sheva) Mumbai sea freight / Air cargo terminals.
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Accreditation Badges & CTA */}
          <div className="lg:col-span-4 flex flex-col items-center lg:items-end gap-5">
            <div className="flex items-center gap-4 bg-white p-3.5 rounded-2xl border border-slate-200 shadow-sm">
              <img
                src={fdaImg}
                alt="FDA Maharashtra"
                className="h-9 w-auto object-contain"
              />
              <div className="h-8 w-px bg-slate-200" />
              <img
                src={isoImg}
                alt="ISO 22000:2018 Certified"
                className="h-9 w-auto object-contain"
              />
            </div>

            <button
              type="button"
              onClick={onContactClick}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0a3622] hover:bg-[#0f4d30] text-white px-6 py-3 text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer"
            >
              <span>Consult an Export Specialist</span>
              <span>&rarr;</span>
            </button>
          </div>

        </div>

      </div>
    </section>
  )
}
