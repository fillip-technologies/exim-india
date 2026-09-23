import { useState, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { NATURAL_FOOD_COLORS } from '../../constants/naturalFoodColorsData'
import ProductDetailHeader from '../../components/product/detail/ProductDetailHeader'
import ProductDetailTabs from '../../components/product/detail/ProductDetailTabs'
import ProductOverviewSection from '../../components/product/detail/ProductOverviewSection'
import ProductAnalysisTable from '../../components/product/detail/ProductAnalysisTable'
import OrderModal from '../../components/product/detail/OrderModal'

export default function NaturalFoodColorDetail() {
  const { id } = useParams()
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false)

  // Find product by id (or fallback to Caramel)
  const currentProduct = useMemo(() => {
    return (
      NATURAL_FOOD_COLORS.find((p) => p.id === id) ||
      NATURAL_FOOD_COLORS[0]
    )
  }, [id])

  return (
    <div className="bg-white min-h-screen text-slate-900 pt-20 sm:pt-24 pb-16">
      {/* 1. Header Banner */}
      <ProductDetailHeader
        productName={currentProduct.name}
        categoryName="Natural Food Colors"
        categoryUrl="/products/natural-food-colors"
        totalCount={NATURAL_FOOD_COLORS.length}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 2. Horizontal Switcher Tabs */}
        <ProductDetailTabs
          products={NATURAL_FOOD_COLORS}
          currentId={currentProduct.id}
          baseUrl="/products/natural-food-colors"
        />

        {/* 3. Product Media & Specifications Matrix */}
        <ProductOverviewSection
          product={currentProduct}
          onOrderClick={() => setIsOrderModalOpen(true)}
        />

        {/* 4. Chemical & Physical Quality Analysis Table */}
        <ProductAnalysisTable
          title="Natural Botanical Colorant Technical & Quality Certificate"
          subtitle={`Complies with ${currentProduct.ecNo} / FSSAI / FCC Monograph Requirements`}
          analysis={currentProduct.analysis}
          storage={currentProduct.storage}
        />
      </div>

      {/* 5. Order Inquiry Modal */}
      <OrderModal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        product={currentProduct}
      />
    </div>
  )
}
