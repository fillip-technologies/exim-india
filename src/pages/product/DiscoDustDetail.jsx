import { useState, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { DISCO_DUST_POWDERS } from '../../constants/discoDustData'
import ProductDetailHeader from '../../components/product/detail/ProductDetailHeader'
import ProductDetailTabs from '../../components/product/detail/ProductDetailTabs'
import ProductOverviewSection from '../../components/product/detail/ProductOverviewSection'
import ProductAnalysisTable from '../../components/product/detail/ProductAnalysisTable'
import OrderModal from '../../components/product/detail/OrderModal'

export default function DiscoDustDetail() {
  const { id } = useParams()
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false)

  // Find product by id (or fallback to first disco dust powder)
  const currentProduct = useMemo(() => {
    return (
      DISCO_DUST_POWDERS.find((p) => p.id === id) ||
      DISCO_DUST_POWDERS[0]
    )
  }, [id])

  return (
    <div className="bg-white min-h-screen text-slate-900 pt-20 sm:pt-24 pb-16">
      {/* 1. Header Banner */}
      <ProductDetailHeader
        productName={currentProduct.name}
        categoryName="Disco Dust Powder"
        categoryUrl="/products/disco-dust-powder"
        totalCount={DISCO_DUST_POWDERS.length}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 2. Horizontal Switcher Tabs */}
        <ProductDetailTabs
          products={DISCO_DUST_POWDERS}
          currentId={currentProduct.id}
          baseUrl="/products/disco-dust-powder"
        />

        {/* 3. Product Media & Specifications Matrix */}
        <ProductOverviewSection
          product={currentProduct}
          onOrderClick={() => setIsOrderModalOpen(true)}
        />

        {/* 4. Chemical & Physical Quality Analysis Table */}
        <ProductAnalysisTable
          title="Disco Dust Powder Analytical Specifications & Quality Standard"
          subtitle="Ultra-Fine Particle Calibrated & Heavy Metal Certified Testing Parameters"
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
