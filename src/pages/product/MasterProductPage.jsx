import { useState, useMemo, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import ProductHero from '../../components/product/ProductHero'
import UniversalProductCard from '../../components/common/UniversalProductCard'
import { useCategory, useCategoryProducts } from '../../api/useCatalog'

/**
 * MasterProductPage
 * ─────────────────────────────────────────────────────────────
 * Category page. Everything on it comes from the API:
 *   GET /categories/{slug}           → title, description, analysis, sections
 *   GET /categories/{slug}/products  → product cards + filter groups
 * A block (description, filters, spec table, sections, …) is only rendered
 * when the API returned data for it.
 */
export default function MasterProductPage() {
  const { category } = useParams()
  // Keyed so search/filter state starts fresh for every category
  return <CategoryPage key={category} slug={category} />
}

function CategoryPage({ slug }) {

  const { category, loading: categoryLoading, error: categoryError } = useCategory(slug)
  const { products, loading: productsLoading } = useCategoryProducts(slug)

  const [searchQuery, setSearchQuery] = useState('')
  const [activeFilter, setActiveFilter] = useState('all')

  const title = category?.name || ''
  const description = category?.description || ''
  const categoryPath = category?.path || `/products/${slug}`

  useEffect(() => {
    if (title) document.title = `${title} | Exim India Corporation`
  }, [title])

  // Filter chips: one per distinct groupKey, labelled with groupName
  const filterGroups = useMemo(() => {
    const groups = new Map()
    products.forEach((p) => {
      if (p.groupKey && !groups.has(p.groupKey)) {
        groups.set(p.groupKey, p.groupName || p.groupKey)
      }
    })
    return Array.from(groups, ([key, label]) => ({ key, label }))
  }, [products])

  const filteredProducts = useMemo(() => {
    const q = searchQuery.toLowerCase().trim()
    return products.filter((item) => {
      if (activeFilter !== 'all' && item.groupKey !== activeFilter) return false
      if (!q) return true

      const haystack = [
        item.name,
        item.shortName,
        item.casNo,
        item.otherNames,
        item.description,
        ...(item.attributes || []).map((a) => a.value),
      ]
      return haystack.some((v) => v && String(v).toLowerCase().includes(q))
    })
  }, [products, searchQuery, activeFilter])

  const loading = categoryLoading || productsLoading

  if (!categoryLoading && (categoryError || !category)) {
    return (
      <div className="bg-white min-h-screen text-slate-900 pb-16">
        <ProductHero />
        <div className="py-24 text-center max-w-xl mx-auto px-4">
          <div className="text-4xl mb-3">🔍</div>
          <h2 className="text-2xl font-bold font-heading text-slate-900">
            {categoryError?.status === 404 ? 'Category Not Found' : 'Unable to Load Category'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-2">
            {categoryError?.status === 404
              ? 'This product category does not exist or is no longer available.'
              : categoryError?.message || 'Please try again in a moment.'}
          </p>
          <Link
            to="/products"
            className="mt-6 inline-block px-5 py-2.5 rounded-xl bg-[#0a3622] text-white font-bold text-xs hover:bg-[#0f4d30] transition-colors"
          >
            ← All Products
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white min-h-screen text-slate-900 pb-16">
      <ProductHero />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12">
        {/* Category Header: Title, Description & Search Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div className="flex-1">
            {title ? (
              <h1 className="text-2xl sm:text-3xl font-black font-heading text-slate-900">{title}</h1>
            ) : (
              <div className="h-8 w-64 bg-slate-100 rounded animate-pulse" />
            )}
            {description && (
              <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
                {description}
              </p>
            )}
          </div>

          {products.length > 0 && (
            <div className="relative w-full md:w-72 shrink-0">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={`Search ${title.toLowerCase()}...`}
                className="w-full pl-9 pr-8 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-hidden focus:border-amber-400 bg-white shadow-2xs transition-colors"
              />
              <svg
                className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-bold"
                  aria-label="Clear search"
                >
                  ✕
                </button>
              )}
            </div>
          )}
        </div>

        {/* Group filter pills (only when the products define 2+ groups) */}
        {filterGroups.length >= 2 && (
          <div className="flex flex-wrap items-center gap-2 mb-6 pb-2 border-b border-slate-100">
            <button
              type="button"
              onClick={() => setActiveFilter('all')}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                activeFilter === 'all'
                  ? 'bg-[#0a3622] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              All ({products.length})
            </button>
            {filterGroups.map((g) => (
              <button
                key={g.key}
                type="button"
                onClick={() => setActiveFilter(g.key)}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  activeFilter === g.key
                    ? 'bg-[#0a3622] text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {g.label}
              </button>
            ))}
          </div>
        )}

        {/* Product grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="aspect-square rounded-3xl bg-slate-100 animate-pulse" />
            ))}
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <UniversalProductCard
                key={product.productId || product.id}
                product={product}
                categoryPath={categoryPath}
              />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center bg-slate-50/50 rounded-3xl border border-slate-200">
            <div className="text-4xl mb-3">🔍</div>
            <h3 className="text-lg font-bold font-heading text-slate-900">No Products Found</h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-sm mx-auto">
              {searchQuery
                ? `No products matching "${searchQuery}" were found.`
                : 'There are currently no products available in this category.'}
            </p>
            {(searchQuery || activeFilter !== 'all') && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('')
                  setActiveFilter('all')
                }}
                className="mt-4 px-4 py-2 rounded-xl bg-[#0a3622] text-white text-xs font-bold hover:bg-[#0f4d30] transition-colors cursor-pointer"
              >
                Reset Filters
              </button>
            )}
            {!searchQuery && activeFilter === 'all' && (
              <div className="mt-4">
                <Link
                  to="/contact"
                  className="text-xs font-bold text-[#0a3622] hover:text-[#0f4d30]"
                >
                  Contact us about {title || 'this category'} &rarr;
                </Link>
              </div>
            )}
          </div>
        )}

        {/* Category-level specification table (only if the category has one) */}
        {category?.analysis?.length > 0 && (
          <section className="mt-14 pt-8 border-t border-slate-200">
            <h2 className="text-xl sm:text-2xl font-black font-heading text-slate-900 tracking-tight mb-4">
              Specification &amp; Quality Analysis
            </h2>
            <SpecTable rows={category.analysis.map((r) => [r.characteristic, r.requirement])} />
          </section>
        )}

        {/* Category content sections (application guides, shade lists, comparison tables, …) */}
        {category?.sections?.map((section) =>
          section.items?.length > 0 ? <CategorySection key={section.key} section={section} /> : null,
        )}
      </main>
    </div>
  )
}

function SpecTable({ rows }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-xs bg-white">
      <table className="w-full text-left text-xs border-collapse">
        <tbody>
          {rows.map(([label, value], idx) => (
            <tr
              key={`${label}-${idx}`}
              className={`border-b border-slate-200 last:border-b-0 ${idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/70'}`}
            >
              <td className="p-3 font-bold text-slate-900 w-[40%]">{label}</td>
              <td className="p-3 text-slate-800 font-medium">{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function CategorySection({ section }) {
  return (
    <section className="mt-14 pt-8 border-t border-slate-200">
      <h2 className="text-xl sm:text-2xl font-black font-heading text-slate-900 tracking-tight mb-5">
        {section.title}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {section.items.map((item, idx) => (
          <div
            key={`${item.title}-${idx}`}
            className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs"
          >
            <div className="flex items-center gap-3">
              {item.colorHex && (
                <span
                  className="w-8 h-8 rounded-full border border-black/10 shrink-0"
                  style={{ backgroundColor: item.colorHex }}
                />
              )}
              <div className="min-w-0">
                <h3 className="font-extrabold font-heading text-slate-900 text-sm">{item.title}</h3>
                {item.subtitle && <p className="text-[11px] text-slate-500">{item.subtitle}</p>}
              </div>
            </div>
            {item.attributes?.length > 0 && (
              <dl className="mt-3 space-y-1.5 text-xs">
                {item.attributes.map((a, i) => (
                  <div key={`${a.label}-${i}`}>
                    <dt className="font-bold text-slate-700 inline">{a.label}: </dt>
                    <dd className="text-slate-600 inline">{a.value}</dd>
                  </div>
                ))}
              </dl>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
