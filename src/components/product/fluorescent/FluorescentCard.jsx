import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function FluorescentCard({ product }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative bg-white rounded-2xl border border-slate-200 hover:border-emerald-600/40 p-3 sm:p-3.5 flex flex-col justify-between shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
    >
      {/* Top Media Container */}
      <div className="relative w-full min-h-[220px] aspect-[4/3] sm:aspect-square rounded-xl overflow-hidden bg-white mb-2.5 select-none border border-slate-100 flex items-center justify-center">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* ============================================================== */}
        {/* EXACT HOVER OVERLAY: Badges + Direct Contact Us Link          */}
        {/* ============================================================== */}
        <div
          className={`absolute inset-0 bg-white/85 backdrop-blur-[2px] p-3 sm:p-4 flex flex-col items-center justify-center gap-2.5 transition-all duration-300 z-20 ${
            isHovered
              ? 'opacity-100 pointer-events-auto'
              : 'opacity-0 pointer-events-none'
          }`}
        >
          {/* 1. Blue Badge: Minimum Order Quantity */}
          <div className="w-full max-w-[94%] bg-[#337ab7] hover:bg-[#286090] text-white text-xs sm:text-[13px] font-bold py-1.5 px-3 rounded-xs text-center shadow-xs transition-colors">
            Min.Order Quantity : {product.moq}
          </div>

          {/* 2. Red Badge: Supply Ability */}
          <div className="w-full max-w-[94%] bg-[#d9534f] hover:bg-[#c9302c] text-white text-xs sm:text-[13px] font-bold py-1.5 px-3 rounded-xs text-center shadow-xs transition-colors">
            Supply Ability : {product.supplyAbility}
          </div>

          {/* 3. Orange/Amber Badge: Port */}
          <div className="w-full max-w-[94%] bg-[#f0ad4e] hover:bg-[#ec971f] text-white text-xs sm:text-[13px] font-bold py-1.5 px-3 rounded-xs text-center shadow-xs transition-colors">
            Port: {product.port}
          </div>

          {/* 4. White Button: Order Now (Directly navigates to Contact Us page) */}
          <Link
            to="/contact"
            className="mt-1 bg-white hover:bg-slate-100 text-slate-900 border border-slate-400 py-1.5 px-5 text-xs sm:text-[13px] font-semibold rounded-xs shadow-xs transition-all active:scale-95 text-center inline-block cursor-pointer"
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
