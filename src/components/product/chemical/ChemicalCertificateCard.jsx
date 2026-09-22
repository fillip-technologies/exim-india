import chemicalsCertificateImg from '../../../assets/img/chemicals.png'

export default function ChemicalCertificateCard() {
  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 p-2 sm:p-4">
      {/* Scrollable image container inside the card - ONLY the image, no text */}
      <div className="h-[70vh] sm:h-[76vh] max-h-[850px] overflow-y-auto rounded-xl sm:rounded-2xl border border-slate-100 bg-white p-1 sm:p-3 scrollbar-thin">
        <img
          src={chemicalsCertificateImg}
          alt="Chemicals"
          className="w-full h-auto object-contain mx-auto"
        />
      </div>
    </div>
  )
}
