import { useState, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { EMULSION_FLAVOURS } from '../constants/emulsionFlavoursData'
import ProductDetailHeader from '../components/product/detail/ProductDetailHeader'
import ProductDetailTabs from '../components/product/detail/ProductDetailTabs'
import ProductOverviewSection from '../components/product/detail/ProductOverviewSection'
import ProductAnalysisTable from '../components/product/detail/ProductAnalysisTable'
import OrderModal from '../components/product/detail/OrderModal'

export default function EmulsionFlavourDetail() {
  const { id } = useParams()
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false)

  // Find product by id (or fallback to first emulsion flavour)
  const currentProduct = useMemo(() => {
    return (
      EMULSION_FLAVOURS.find((p) => p.id === id) ||
      EMULSION_FLAVOURS[0]
    )
  }, [id])

  return (
    <div className="bg-white min-h-screen text-slate-900 pt-20 sm:pt-24 pb-16">
      {/* 1. Header Banner */}
      <ProductDetailHeader
        productName={currentProduct.name}
        categoryName="Emulsion Flavours"
        categoryUrl="/products/emulsion-flavours"
        totalCount={EMULSION_FLAVOURS.length}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 2. Horizontal Switcher Tabs */}
        <ProductDetailTabs
          products={EMULSION_FLAVOURS}
          currentId={currentProduct.id}
          baseUrl="/products/emulsion-flavours"
        />

        {/* 3. Product Media & Specifications Matrix */}
        <ProductOverviewSection
          product={currentProduct}
          onOrderClick={() => setIsOrderModalOpen(true)}
        />

        {/* 4. Chemical & Physical Emulsion Analysis Table */}
        <ProductAnalysisTable
          title="Emulsion Quality & Analytical Specifications"
          subtitle="FSSAI, US-FDA 21 CFR & FEMA GRAS Approved Clouding Stability Parameters"
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
