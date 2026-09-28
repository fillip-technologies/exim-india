import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function CosmeticCard({ product }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative bg-white rounded-2xl border border-slate-200 hover:border-emerald-600/40 p-3 sm:p-3.5 flex flex-col justify-between shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
    >
      {/* Top Media Container */}
      <div className="relative w-full min-h-[220px] aspect-[4/3] sm:aspect-square rounded-xl overflow-hidden bg-white mb-2.5 border border-slate-100 flex items-center justify-center">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* ============================================================== */}
        {/* HOVER OVERLAY: Order Now Button Only                          */}
        {/* ============================================================== */}
        <div
          className={`absolute inset-0 bg-white/80 backdrop-blur-[2px] p-4 flex items-center justify-center transition-all duration-300 z-20 ${
            isHovered
              ? 'opacity-100 pointer-events-auto'
              : 'opacity-0 pointer-events-none'
          }`}
        >
          {/* White Button: Order Now (Directly navigates to Contact Us page) */}
          <Link
            to="/contact"
            className="bg-white hover:bg-slate-100 text-slate-900 border border-slate-400 py-2 px-6 text-xs sm:text-[13px] font-semibold rounded-xs shadow-xs transition-all active:scale-95 text-center inline-block cursor-pointer"
          >
            Order Now
          </Link>
        </div>
      </div>

      {/* Card Content: Product Name & Order Now Button */}
      <div className="pt-2 px-1 pb-0.5 flex items-center justify-between gap-2">
        <h3 className="text-xs sm:text-sm font-extrabold font-heading text-slate-900 group-hover:text-emerald-800 transition-colors line-clamp-2 leading-snug flex-1">
          {product.name}
        </h3>

        <Link
          to="/contact"
          className="inline-flex items-center gap-1 text-xs font-bold text-white bg-[#0a3622] hover:bg-[#15803d] px-3 py-1.5 rounded-lg transition-all shrink-0 shadow-xs cursor-pointer active:scale-95 whitespace-nowrap"
        >
          <span>Order Now</span>
        </Link>
      </div>
    </div>
  )
}
