/**
 * src/components/product/chemical/ChemicalProductCard.jsx
 * ─────────────────────────────────────────────────────────────
 * Product card for Chemicals listing, styled identically to Bakery
 * products with edge-to-edge image presentation, hover effects,
 * and direct inquiry trigger.
 */

import { Link } from 'react-router-dom'

export default function ChemicalProductCard({ product }) {
  return (
    <div className="group relative bg-white rounded-3xl border border-slate-200 hover:border-amber-400/90 p-4 flex flex-col justify-between shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden max-w-sm w-full mx-auto sm:mx-0">
      {/* Inner Card: Full Image Container with Edge-to-Edge Display */}
      <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-slate-50 border border-slate-100/90 shadow-2xs">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Subtle hover overlay hint */}
        <div className="absolute inset-0 bg-slate-900/15 group-hover:bg-slate-900/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <Link
            to={`/contact?subject=${encodeURIComponent(`Inquiry for ${product.name}`)}`}
            className="px-3.5 py-1.5 rounded-full bg-white/95 text-slate-900 text-xs font-bold shadow-md transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300"
          >
            Inquire for Export &rarr;
          </Link>
        </div>
      </div>

      {/* Product Title Only */}
      <div className="pt-3.5 pb-1 text-center sm:text-left">
        <h3 className="text-base sm:text-lg font-extrabold font-heading text-slate-900 group-hover:text-amber-800 transition-colors">
          {product.name}
        </h3>
      </div>
    </div>
  )
}
