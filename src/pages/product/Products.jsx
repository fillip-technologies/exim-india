import { Link } from 'react-router-dom'
import ProductHero from '../../components/product/ProductHero'
import { useCategories } from '../../api/useCatalog'

export default function Products() {
  const { categories, loading } = useCategories()

  return (
    <div className="bg-white min-h-screen text-slate-900 pb-16">
      <ProductHero
        title="Our Ingredients & Formulations"
        subtitle="Explore our laboratory-tested food colors, flavours, bakery decorations, botanical extracts, and chemicals delivered to 50+ countries worldwide."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        {loading ? (
          <div className="space-y-6">
            {[1, 2, 3, 4, 5].map((n) => (
              <div key={n} className="rounded-3xl border border-slate-200 bg-slate-50/50 p-6 sm:p-8 animate-pulse">
                <div className="h-7 bg-slate-200 rounded w-1/3 mb-3" />
                <div className="h-4 bg-slate-200 rounded w-2/3 mb-4" />
                <div className="h-10 bg-slate-200 rounded w-1/4 mt-4" />
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-8">
            {categories.map((cat) => (
              <div
                key={cat.slug}
                className="rounded-3xl border border-slate-200 bg-slate-50/50 p-6 sm:p-8 hover:border-emerald-700/40 transition-all shadow-sm group"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                  <div>
                    <h2 className="text-2xl font-bold font-heading text-slate-900 group-hover:text-emerald-900 transition-colors">
                      {cat.name}
                    </h2>
                    {cat.description && (
                      <p className="text-xs sm:text-sm text-slate-600 mt-1">
                        {cat.description}
                      </p>
                    )}
                  </div>
                  {cat.productCount !== undefined && (
                    <span className="self-start sm:self-auto text-xs font-semibold text-emerald-800 bg-emerald-100/70 border border-emerald-300 px-3 py-1 rounded-full whitespace-nowrap">
                      {cat.productCount} {cat.productCount === 1 ? 'Product' : 'Products'} Available
                    </span>
                  )}
                </div>

                <div className="mt-5 pt-4 border-t border-slate-200/80 flex flex-wrap items-center justify-between gap-3">
                  <Link
                    to={cat.path || `/products/${cat.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-extrabold text-emerald-800 hover:text-emerald-950 bg-emerald-50 hover:bg-emerald-100/80 px-4 py-2 rounded-xl border border-emerald-200 transition-all shadow-xs"
                  >
                    <span>Explore {cat.name} Collection</span>
                    <span>&rarr;</span>
                  </Link>

                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0a3622] hover:text-[#0f4d30]"
                  >
                    <span>Request Technical Specification &amp; Sample</span>
                    <span>&rarr;</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
