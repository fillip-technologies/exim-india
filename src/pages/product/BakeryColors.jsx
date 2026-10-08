import { useEffect } from 'react'
import ProductHero from '../../components/product/ProductHero'
import BakeryProductCard from '../../components/product/bakery-colors/BakeryProductCard'
import { BAKERY_PRODUCTS } from '../../constants/bakeryColorsData'

export default function BakeryColors() {
  useEffect(() => {
    document.title = 'Bakery Colors | Exim India Corporation'
  }, [])

  return (
    <div className="bg-white min-h-screen text-slate-900 pb-16">
      {/* Product Hero Banner matching all product pages */}
      <ProductHero />

      {/* Main Catalog Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12">
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-black font-heading text-slate-900">
            Bakery Colors &amp; Formulations
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Specialized food-grade metallic lustres and heat-stable colors for professional baking and confectionery.
          </p>
        </div>

        {/* Product Cards Grid: only image and title */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {BAKERY_PRODUCTS.map((product) => (
            <BakeryProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      </main>
    </div>
  )
}



