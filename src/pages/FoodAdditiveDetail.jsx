import { useState, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { FOOD_ADDITIVES } from '../constants/foodAdditivesData'
import ProductDetailHeader from '../components/product/detail/ProductDetailHeader'
import ProductDetailTabs from '../components/product/detail/ProductDetailTabs'
import ProductOverviewSection from '../components/product/detail/ProductOverviewSection'
import ProductAnalysisTable from '../components/product/detail/ProductAnalysisTable'
import OrderModal from '../components/product/detail/OrderModal'

export default function FoodAdditiveDetail() {
  const { id } = useParams()
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false)

  // Find product by id (or fallback to first food additive)
  const currentProduct = useMemo(() => {
    return (
      FOOD_ADDITIVES.find((p) => p.id === id) ||
      FOOD_ADDITIVES[0]
    )
  }, [id])

  return (
    <div className="bg-white min-h-screen text-slate-900 pt-20 sm:pt-24 pb-16">
      {/* 1. Header Banner */}
      <ProductDetailHeader
        productName={currentProduct.name}
        categoryName="Food Additives"
        categoryUrl="/products/food-additives"
        totalCount={FOOD_ADDITIVES.length}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 2. Horizontal Switcher Tabs */}
        <ProductDetailTabs
          products={FOOD_ADDITIVES}
          currentId={currentProduct.id}
          baseUrl="/products/food-additives"
        />

        {/* 3. Product Media & Specifications Matrix */}
        <ProductOverviewSection
          product={currentProduct}
          onOrderClick={() => setIsOrderModalOpen(true)}
        />

        {/* 4. Chemical & Physical Quality Analysis Table */}
        <ProductAnalysisTable
          title="Food Additive Analytical Specifications & Certificate of Quality"
          subtitle="FSSAI, US-FDA 21 CFR, FCC & Pharmacopoeia Monograph Compliant"
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
