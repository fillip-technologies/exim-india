import { useState, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { LAKE_COLORS } from '../../constants/lakeColorsData'
import ProductDetailHeader from '../../components/product/detail/ProductDetailHeader'
import ProductDetailTabs from '../../components/product/detail/ProductDetailTabs'
import ProductOverviewSection from '../../components/product/detail/ProductOverviewSection'
import ProductAnalysisTable from '../../components/product/detail/ProductAnalysisTable'
import OrderModal from '../../components/product/detail/OrderModal'

export default function LakeColorDetail() {
  const { id } = useParams()
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false)

  // Find product by id (or default to tartrazine lake)
  const currentProduct = useMemo(() => {
    return (
      LAKE_COLORS.find((p) => p.id === id) ||
      LAKE_COLORS[0]
    )
  }, [id])

  return (
    <div className="bg-white min-h-screen text-slate-900 pt-20 sm:pt-24 pb-16">
      {/* 1. Header Banner */}
      <ProductDetailHeader
        productName={currentProduct.name}
        categoryName="Lake Colours"
        categoryUrl="/products/lake-colours"
        totalCount={LAKE_COLORS.length}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 2. Horizontal Switcher Tabs */}
        <ProductDetailTabs
          products={LAKE_COLORS}
          currentId={currentProduct.id}
          baseUrl="/products/lake-colours"
        />

        {/* 3. Product Media & Specifications Matrix */}
        <ProductOverviewSection
          product={currentProduct}
          onOrderClick={() => setIsOrderModalOpen(true)}
        />

        {/* 4. Chemical & Purity Analysis Table */}
        <ProductAnalysisTable
          title="Aluminum Lake Quality & Purity Analysis"
          subtitle="Compliant with US-FDA (21 CFR), EU E-Numbers & BIS Specifications"
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
