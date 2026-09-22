import { useState, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { COSMETIC_COLORS } from '../constants/cosmeticColorsData'
import ProductDetailHeader from '../components/product/detail/ProductDetailHeader'
import ProductDetailTabs from '../components/product/detail/ProductDetailTabs'
import ProductOverviewSection from '../components/product/detail/ProductOverviewSection'
import ProductAnalysisTable from '../components/product/detail/ProductAnalysisTable'
import OrderModal from '../components/product/detail/OrderModal'

export default function CosmeticColorDetail() {
  const { id } = useParams()
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false)

  // Find product by id (or default to first item)
  const currentProduct = useMemo(() => {
    return (
      COSMETIC_COLORS.find((p) => p.id === id) ||
      COSMETIC_COLORS[0]
    )
  }, [id])

  return (
    <div className="bg-white min-h-screen text-slate-900 pt-20 sm:pt-24 pb-16">
      {/* 1. Header Banner */}
      <ProductDetailHeader
        productName={currentProduct.name}
        categoryName="Cosmetic Colours"
        categoryUrl="/products/cosmetic-colours"
        totalCount={COSMETIC_COLORS.length}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 2. Horizontal Switcher Tabs */}
        <ProductDetailTabs
          products={COSMETIC_COLORS}
          currentId={currentProduct.id}
          baseUrl="/products/cosmetic-colours"
        />

        {/* 3. Product Media & Specifications Matrix */}
        <ProductOverviewSection
          product={currentProduct}
          onOrderClick={() => setIsOrderModalOpen(true)}
        />

        {/* 4. Chemical & Heavy Metals Analysis Table */}
        <ProductAnalysisTable
          title="Cosmetic Quality & Heavy Metals Analysis"
          subtitle="Compliant with US-FDA (21 CFR), EU Regulation 1223/2009 & Indian Standards (IS 4707)"
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
