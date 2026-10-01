import { Link } from 'react-router-dom'
import ProductHero from '../../components/product/ProductHero'
import ChemicalCertificateCard from '../../components/product/chemical/ChemicalCertificateCard'

export default function Chemicals() {
  return (
    <div className="bg-white min-h-screen text-slate-900 pb-16">
      {/* Product Hero Banner with product-hero.png */}
      <ProductHero
        title="Chemicals & Industrial Intermediates"
        subtitle="Comprehensive portfolio of 120+ high-purity industrial, food, pharmaceutical, and veterinary chemicals delivered to international manufacturing units."
        badge="ISO & WHO-GMP"
        category="Chemicals"
        trustTags={['120+ Chemical Compounds', 'High Assay Purity', 'Full Regulatory Dossiers', 'Global Port Shipping']}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Card containing the scrollable image */}
        <ChemicalCertificateCard />
      </div>
    </div>
  )
}
