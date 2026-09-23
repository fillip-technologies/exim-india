import { useState, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { SYNTHETIC_FOOD_COLORS } from '../../constants/syntheticFoodColorsData'
import ProductDetailHeader from '../../components/product/detail/ProductDetailHeader'
import ProductDetailTabs from '../../components/product/detail/ProductDetailTabs'
import ProductOverviewSection from '../../components/product/detail/ProductOverviewSection'
import ProductAnalysisTable from '../../components/product/detail/ProductAnalysisTable'
import OrderModal from '../../components/product/detail/OrderModal'

export default function SyntheticFoodColorDetail() {
  const { id } = useParams()
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false)

  // Find product by id (or default to tartrazine)
  const currentProduct = useMemo(() => {
    return (
      SYNTHETIC_FOOD_COLORS.find((p) => p.id === id) ||
      SYNTHETIC_FOOD_COLORS[0]
    )
  }, [id])

  return (
    <div className="bg-white min-h-screen text-slate-900 pt-20 sm:pt-24 pb-16">
      {/* 1. Header Banner */}
      <ProductDetailHeader
        productName={currentProduct.name}
        categoryName="Synthetic Food Colours"
        categoryUrl="/products/synthetic-food-colours"
        totalCount={SYNTHETIC_FOOD_COLORS.length}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 2. Horizontal Switcher Tabs */}
        <ProductDetailTabs
          products={SYNTHETIC_FOOD_COLORS}
          currentId={currentProduct.id}
          baseUrl="/products/synthetic-food-colours"
        />

        {/* 3. Product Media & Specifications Matrix */}
        <ProductOverviewSection
          product={currentProduct}
          onOrderClick={() => setIsOrderModalOpen(true)}
        />

        {/* 4. Chemical & Purity Analysis Table */}
        <ProductAnalysisTable
          title="Complete Chemical & Purity Analysis"
          subtitle="Certified under IS 4707 / US-FDA 21 CFR standards"
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
