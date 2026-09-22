// Import all certificate images available in src/assets/img/certificate
import chemexilCert from '../../assets/img/certificate/chemexil-certificate.jpg'
import gmpCert from '../../assets/img/certificate/gmp-certificate.jpg'
import halaalCert from '../../assets/img/certificate/halaal-certificate.jpg'
import fdaCert1 from '../../assets/img/certificate/fda-certificate.PNG'
import fdaCert2 from '../../assets/img/certificate/fda-certificate-2.PNG'
import eximCert from '../../assets/img/certificate/exim-certificate.PNG'
import eximJpg from '../../assets/img/certificate/exim.JPG'
import exim1Jpeg from '../../assets/img/certificate/exim1.jpeg'
import india5000Cert1 from '../../assets/img/certificate/India5000_Nomination_Certificate.jpg'
import india5000Cert2 from '../../assets/img/certificate/India5000_Nomination_Certificate2018.jpg'

const CERTIFICATES = [
  { id: 1, src: gmpCert, alt: 'GMP Certificate' },
  { id: 2, src: halaalCert, alt: 'Halal Certificate' },
  { id: 3, src: fdaCert1, alt: 'FDA Registration Certificate' },
  { id: 4, src: fdaCert2, alt: 'FDA Compliance Certificate' },
  { id: 5, src: chemexilCert, alt: 'Chemexcil Export Certificate' },
  { id: 6, src: eximCert, alt: 'Exim Corporation Certificate' },
  { id: 7, src: eximJpg, alt: 'Exim Government Accreditation' },
  { id: 8, src: exim1Jpeg, alt: 'Exim Quality Assurance Certificate' },
  { id: 9, src: india5000Cert1, alt: 'India 5000 Business Award' },
  { id: 10, src: india5000Cert2, alt: 'India 5000 Nomination Certificate' },
]

export default function CertificationSection() {
  return (
    <section className="py-12 sm:py-16 bg-[#f8fafc] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Strictly certificates display grid - no long text paragraphs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
          {CERTIFICATES.map((cert) => (
            <a
              key={cert.id}
              href={cert.src}
              target="_blank"
              rel="noopener noreferrer"
              title={`View ${cert.alt} in new tab`}
              className="group relative bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-emerald-600/50 p-2 sm:p-2.5 cursor-pointer transition-all duration-300 hover:-translate-y-1.5 flex flex-col items-center justify-center overflow-hidden block"
            >
              <div className="w-full aspect-[3/4] rounded-xl overflow-hidden bg-slate-50 flex items-center justify-center relative">
                <img
                  src={cert.src}
                  alt={cert.alt}
                  className="w-full h-full object-contain p-1 group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />

                {/* Hover overlay with external link / open in new tab icon */}
                <div className="absolute inset-0 bg-[#0a3622]/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="w-10 h-10 rounded-full bg-white text-[#0a3622] shadow-lg flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform duration-300">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
