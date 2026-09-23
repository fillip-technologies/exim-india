import { useState, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { LIQUID_FLAVOURS } from '../../constants/liquidFlavoursData'
import ProductDetailHeader from '../../components/product/detail/ProductDetailHeader'
import ProductDetailTabs from '../../components/product/detail/ProductDetailTabs'
import ProductOverviewSection from '../../components/product/detail/ProductOverviewSection'
import ProductAnalysisTable from '../../components/product/detail/ProductAnalysisTable'
import OrderModal from '../../components/product/detail/OrderModal'

export default function LiquidFlavourDetail() {
  const { id } = useParams()
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false)

  // Find product by id (or default to first flavour)
  const currentProduct = useMemo(() => {
    return (
      LIQUID_FLAVOURS.find((p) => p.id === id) ||
      LIQUID_FLAVOURS[0]
    )
  }, [id])

  return (
    <div className="bg-white min-h-screen text-slate-900 pt-20 sm:pt-24 pb-16">
      {/* 1. Header Banner */}
      <ProductDetailHeader
        productName={currentProduct.name}
        categoryName="Liquid Flavours"
        categoryUrl="/products/liquid-flavours"
        totalCount={LIQUID_FLAVOURS.length}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 2. Horizontal Switcher Tabs */}
        <ProductDetailTabs
          products={LIQUID_FLAVOURS}
          currentId={currentProduct.id}
          baseUrl="/products/liquid-flavours"
        />

        {/* 3. Product Media & Specifications Matrix */}
        <ProductOverviewSection
          product={currentProduct}
          onOrderClick={() => setIsOrderModalOpen(true)}
        />

        {/* 4. Chemical & Physical Quality Analysis Table */}
        <ProductAnalysisTable
          title="Liquid Flavour Quality & Analytical Specifications"
          subtitle="FSSAI, US-FDA 21 CFR & FEMA GRAS Approved Testing Parameters"
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
