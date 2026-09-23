import { useState, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { BLENDED_COLORS } from '../../constants/blendedColorsData'
import ProductDetailHeader from '../../components/product/detail/ProductDetailHeader'
import ProductDetailTabs from '../../components/product/detail/ProductDetailTabs'
import ProductOverviewSection from '../../components/product/detail/ProductOverviewSection'
import ProductAnalysisTable from '../../components/product/detail/ProductAnalysisTable'
import OrderModal from '../../components/product/detail/OrderModal'

export default function BlendedColorDetail() {
  const { id } = useParams()
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false)

  // Find product by id (or default to first item)
  const currentProduct = useMemo(() => {
    return (
      BLENDED_COLORS.find((p) => p.id === id) ||
      BLENDED_COLORS[0]
    )
  }, [id])

  return (
    <div className="bg-white min-h-screen text-slate-900 pt-20 sm:pt-24 pb-16">
      {/* 1. Header Banner */}
      <ProductDetailHeader
        productName={currentProduct.name}
        categoryName="Blended Colours"
        categoryUrl="/products/blended-colours"
        totalCount={BLENDED_COLORS.length}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 2. Horizontal Switcher Tabs */}
        <ProductDetailTabs
          products={BLENDED_COLORS}
          currentId={currentProduct.id}
          baseUrl="/products/blended-colours"
        />

        {/* 3. Product Media & Specifications Matrix */}
        <ProductOverviewSection
          product={currentProduct}
          onOrderClick={() => setIsOrderModalOpen(true)}
        />

        {/* 4. Chemical & Purity Analysis Table */}
        <ProductAnalysisTable
          title="Specification & Quality Analysis"
          subtitle="Standard laboratory testing parameters for export-grade blended colors"
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
