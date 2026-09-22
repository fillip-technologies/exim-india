import { Link } from 'react-router-dom'
import ChemicalCertificateCard from '../components/product/chemical/ChemicalCertificateCard'

export default function Chemicals() {
  return (
    <div className="bg-white min-h-screen text-slate-900 pt-24 sm:pt-28 pb-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Simple breadcrumb */}
        <div className="mb-4 sm:mb-6 flex items-center gap-2 text-xs font-semibold text-slate-500">
          <Link to="/" className="hover:text-emerald-800 transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link to="/products" className="hover:text-emerald-800 transition-colors">
            Products
          </Link>
          <span>/</span>
          <span className="text-slate-900 font-bold">Chemicals</span>
        </div>

        {/* Card containing ONLY the scrollable image */}
        <ChemicalCertificateCard />

      </div>
    </div>
  )
}
