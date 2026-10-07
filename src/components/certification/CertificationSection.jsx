// High-Resolution Certificate Previews (converted from authentic certificates)
import iso9001Cert from '../../assets/img/certificate/iso-9001-certificate.png'
import iso22000Cert from '../../assets/img/certificate/iso-22000-certificate.png'
import gmpCert from '../../assets/img/certificate/gmp-certificate-2024.png'
import newFdaCert from '../../assets/img/certificate/new-fda-certificate.png'
import fssaiCert from '../../assets/img/certificate/fssai-certificate.png'
import iecCert from '../../assets/img/certificate/iec-certificate.png'
import gstCert from '../../assets/img/certificate/gst-registration-certificate.png'
import rofCert from '../../assets/img/certificate/rof-registration-certificate.png'

// Existing Unique Image Certificates
import chemexilCert from '../../assets/img/certificate/chemexil-certificate.jpg'
import halaalCert from '../../assets/img/certificate/halaal-certificate.jpg'
import spicesBoardCert from '../../assets/img/certificate/exim1.jpeg'
import india5000Cert1 from '../../assets/img/certificate/India5000_Nomination_Certificate.jpg'
import india5000Cert2 from '../../assets/img/certificate/India5000_Nomination_Certificate2018.jpg'

// Original PDF Documents (for direct viewing/download)
import iso9001Pdf from '../../assets/img/certificate/EXIM-ISO-9001-(26-29).pdf'
import iso22000Pdf from '../../assets/img/certificate/ISO-22000.pdf'
import gmpPdf from '../../assets/img/certificate/GMP-2024-27.pdf'
import newFdaPdf from '../../assets/img/certificate/New-FDA-2024.pdf'
import fssaiPdf from '../../assets/img/certificate/FSSAI-25-30-EXIM.pdf'
import iecPdf from '../../assets/img/certificate/IEC-Certificate.pdf'
import gstPdf from '../../assets/img/certificate/25-GST-REGISTRATION.pdf'
import rofPdf from '../../assets/img/certificate/ROF-copy.pdf'

const CERTIFICATES = [
  { id: 1, src: iso9001Cert, fileUrl: iso9001Pdf, alt: 'ISO 9001:2015 Certificate' },
  { id: 2, src: iso22000Cert, fileUrl: iso22000Pdf, alt: 'ISO 22000:2018 Certificate' },
  { id: 3, src: gmpCert, fileUrl: gmpPdf, alt: 'GMP Certificate' },
  { id: 4, src: newFdaCert, fileUrl: newFdaPdf, alt: 'FDA Certificate' },
  { id: 5, src: fssaiCert, fileUrl: fssaiPdf, alt: 'FSSAI License Certificate' },
  { id: 6, src: iecCert, fileUrl: iecPdf, alt: 'IEC Importer-Exporter Code' },
  { id: 7, src: halaalCert, fileUrl: halaalCert, alt: 'Halal Certificate' },
  { id: 8, src: chemexilCert, fileUrl: chemexilCert, alt: 'CHEMEXCIL Export Certificate' },
  { id: 9, src: gstCert, fileUrl: gstPdf, alt: 'GST Registration Certificate' },
  { id: 10, src: rofCert, fileUrl: rofPdf, alt: 'ROF Registration Certificate' },
  { id: 11, src: spicesBoardCert, fileUrl: spicesBoardCert, alt: 'Spices Board Exporter Certificate' },
  { id: 12, src: india5000Cert1, fileUrl: india5000Cert1, alt: 'India 5000 Business Award' },
  { id: 13, src: india5000Cert2, fileUrl: india5000Cert2, alt: 'India 5000 Nomination Certificate' },
]

export default function CertificationSection() {
  return (
    <section className="py-12 sm:py-16 bg-[#f8fafc] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Strictly certificates display grid - no text or descriptions */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
          {CERTIFICATES.map((cert) => (
            <a
              key={cert.id}
              href={cert.fileUrl || cert.src}
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
