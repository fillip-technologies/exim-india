import { useState, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { PEARL_PIGMENT_PRODUCTS } from '../constants/pearlPigmentData'
import ProductDetailHeader from '../components/product/detail/ProductDetailHeader'
import ProductDetailTabs from '../components/product/detail/ProductDetailTabs'
import ProductOverviewSection from '../components/product/detail/ProductOverviewSection'
import ProductAnalysisTable from '../components/product/detail/ProductAnalysisTable'
import OrderModal from '../components/product/detail/OrderModal'

export default function PearlPigmentDetail() {
  const { id } = useParams()
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false)

  // Find product by id (or fallback to first pearl pigment)
  const currentProduct = useMemo(() => {
    return (
      PEARL_PIGMENT_PRODUCTS.find((p) => p.id === id) ||
      PEARL_PIGMENT_PRODUCTS[0]
    )
  }, [id])

  return (
    <div className="bg-white min-h-screen text-slate-900 pt-20 sm:pt-24 pb-16">
      {/* 1. Header Banner */}
      <ProductDetailHeader
        productName={currentProduct.name}
        categoryName="Pearl Pigment Powder"
        categoryUrl="/products/pearl-pigment-powder"
        totalCount={PEARL_PIGMENT_PRODUCTS.length}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 2. Horizontal Switcher Tabs */}
        <ProductDetailTabs
          products={PEARL_PIGMENT_PRODUCTS}
          currentId={currentProduct.id}
          baseUrl="/products/pearl-pigment-powder"
        />

        {/* 3. Product Media & Specifications Matrix */}
        <ProductOverviewSection
          product={currentProduct}
          onOrderClick={() => setIsOrderModalOpen(true)}
        />

        {/* 4. Chemical & Physical Quality Analysis Table */}
        <ProductAnalysisTable
          title="Pearl Pigment Physical & Optical Quality Monograph"
          subtitle="Particle Size Calibration, Loss on Drying & Heavy Metals Specification"
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
