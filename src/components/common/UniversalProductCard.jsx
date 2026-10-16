import { Link } from 'react-router-dom'

/**
 * UniversalProductCard
 * ─────────────────────────────────────────────────────────────
 * Universal product card following the exact Bakery Colors design:
 * - Edge-to-edge aspect-square image container
 * - Subtle hover overlay with "View Details & Colors →" pill
 * - Clean product name display at the bottom
 * - Entire card clickable with smooth lift & shadow transition
 */
export default function UniversalProductCard({
  product,
  categoryPath,
  targetUrl: explicitTargetUrl,
  actionLabel = 'View Details',
}) {
  if (!product) return null

  const targetUrl =
    explicitTargetUrl ||
    product.targetUrl ||
    product.path ||
    (categoryPath
      ? categoryPath.includes('?')
        ? categoryPath
        : `${categoryPath}/${product.id || product.slug}`
      : product.category?.slug
        ? `/products/${product.category.slug}/${product.id || product.slug}`
        : null)

  if (!targetUrl) return null

  return (
    <Link
      to={targetUrl}
      className="group relative bg-white rounded-3xl border border-slate-200 hover:border-amber-400/90 p-4 flex flex-col justify-between shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer overflow-hidden max-w-sm w-full mx-auto sm:mx-0 block"
    >
      {/* Inner Card: Full Image Container with Edge-to-Edge Display */}
      <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-slate-50 border border-slate-100/90 shadow-2xs flex items-center justify-center">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-slate-300">
            <span className="text-3xl font-black font-heading">{product.name?.charAt(0)}</span>
          </div>
        )}

        {/* Subtle hover overlay hint */}
        <div className="absolute inset-0 bg-slate-900/15 group-hover:bg-slate-900/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <span className="px-3.5 py-1.5 rounded-full bg-white/95 text-slate-900 text-xs font-bold shadow-md transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
            {actionLabel} &rarr;
          </span>
        </div>
      </div>

      {/* Product Title Only */}
      <div className="pt-3.5 pb-1 text-center sm:text-left">
        <h3 className="text-base sm:text-lg font-extrabold font-heading text-slate-900 group-hover:text-amber-800 transition-colors line-clamp-2">
          {product.name}
        </h3>
        {(product.tagline || product.groupName) && (
          <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">
            {product.tagline || product.groupName}
          </p>
        )}
      </div>
    </Link>
  )
}
