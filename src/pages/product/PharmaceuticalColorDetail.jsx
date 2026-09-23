import { useState, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { PHARMACEUTICAL_COLORS } from '../../constants/pharmaceuticalColorsData'
import ProductDetailHeader from '../../components/product/detail/ProductDetailHeader'
import ProductDetailTabs from '../../components/product/detail/ProductDetailTabs'
import ProductOverviewSection from '../../components/product/detail/ProductOverviewSection'
import ProductAnalysisTable from '../../components/product/detail/ProductAnalysisTable'
import OrderModal from '../../components/product/detail/OrderModal'

export default function PharmaceuticalColorDetail() {
  const { id } = useParams()
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false)

  // Find product by id (or default to tartrazine)
  const currentProduct = useMemo(() => {
    return (
      PHARMACEUTICAL_COLORS.find((p) => p.id === id) ||
      PHARMACEUTICAL_COLORS[0]
    )
  }, [id])

  return (
    <div className="bg-white min-h-screen text-slate-900 pt-20 sm:pt-24 pb-16">
      {/* 1. Header Banner */}
      <ProductDetailHeader
        productName={currentProduct.name}
        categoryName="Pharmaceutical Colours"
        categoryUrl="/products/pharmaceutical-colours"
        totalCount={PHARMACEUTICAL_COLORS.length}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 2. Horizontal Switcher Tabs */}
        <ProductDetailTabs
          products={PHARMACEUTICAL_COLORS}
          currentId={currentProduct.id}
          baseUrl="/products/pharmaceutical-colours"
        />

        {/* 3. Product Media & Specifications Matrix */}
        <ProductOverviewSection
          product={currentProduct}
          onOrderClick={() => setIsOrderModalOpen(true)}
        />

        {/* 4. Pharmacopoeia & Microbial Analysis Table */}
        <ProductAnalysisTable
          title="Pharmacopoeia Specification & Quality Certificate"
          subtitle={`Complies with ${currentProduct.pharmacopoeia} / Schedule M / WHO-GMP Monograph`}
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
