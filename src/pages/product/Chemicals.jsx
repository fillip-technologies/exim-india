/**
 * src/pages/product/Chemicals.jsx
 * ─────────────────────────────────────────────────────────────
 * Chemicals & Industrial Intermediates Product Catalogue,
 * styled to match the Bakery Colors product list layout with
 * edge-to-edge product cards and no separate detail subpages.
 */

import { useEffect } from 'react'
import ProductHero from '../../components/product/ProductHero'
import ChemicalProductCard from '../../components/product/chemical/ChemicalProductCard'
import { CHEMICALS_PRODUCTS } from '../../constants/chemicalsData'

export default function Chemicals() {
  useEffect(() => {
    document.title = 'Chemicals & Industrial Intermediates | Exim India Corporation'
  }, [])

  return (
    <div className="bg-white min-h-screen text-slate-900 pb-16">
      {/* Product Hero Banner matching all product pages */}
      <ProductHero />

      {/* Main Catalog Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12">
        <div className="mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black font-heading text-slate-900">
              Chemicals &amp; Industrial Intermediates
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              High-purity organic amines, solvents, and specialty chemical intermediates for industrial manufacturing and global export.
            </p>
          </div>
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 text-slate-600 self-start sm:self-auto shrink-0">
            {CHEMICALS_PRODUCTS.length} Featured Formulations
          </span>
        </div>

        {/* Product Cards Grid: matching Bakery layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {CHEMICALS_PRODUCTS.map((product) => (
            <ChemicalProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      </main>
    </div>
  )
}
