import { Link } from 'react-router-dom'

export default function ProductDetailHeader({
  productName,
  categoryName,
  categoryUrl,
  totalCount,
}) {
  return (
    <div className="bg-gradient-to-r from-sky-900 via-cyan-900 to-emerald-900 py-6 sm:py-8 text-white relative overflow-hidden mb-6 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black font-heading tracking-wide italic">
            Product Description
          </h1>
          <div className="flex items-center gap-2 text-xs text-sky-200 mt-1 font-medium">
            <Link to="/" className="hover:underline">Home</Link>
            <span>&rsaquo;</span>
            <Link to="/products" className="hover:underline">Products</Link>
            <span>&rsaquo;</span>
            <Link to={categoryUrl} className="hover:underline">{categoryName}</Link>
            <span>&rsaquo;</span>
            <span className="text-white font-bold">{productName}</span>
          </div>
        </div>

        <Link
          to={categoryUrl}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-white/15 hover:bg-white/25 px-4 py-2 rounded-xl backdrop-blur-xs transition-colors border border-white/20"
        >
          <span>&larr;</span>
          <span>Back to All {totalCount} Colours</span>
        </Link>
      </div>
    </div>
  )
}
