import { useState, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { EDIBLE_LUSTRE_PRODUCTS } from '../constants/edibleLustreData'
import ProductDetailHeader from '../components/product/detail/ProductDetailHeader'
import ProductDetailTabs from '../components/product/detail/ProductDetailTabs'
import ProductOverviewSection from '../components/product/detail/ProductOverviewSection'
import ProductAnalysisTable from '../components/product/detail/ProductAnalysisTable'
import OrderModal from '../components/product/detail/OrderModal'

export default function EdibleLustreDetail() {
  const { id } = useParams()
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false)

  // Find product by id (or fallback to first product)
  const currentProduct = useMemo(() => {
    return (
      EDIBLE_LUSTRE_PRODUCTS.find((p) => p.id === id) ||
      EDIBLE_LUSTRE_PRODUCTS[0]
    )
  }, [id])

  return (
    <div className="bg-white min-h-screen text-slate-900 pt-20 sm:pt-24 pb-16">
      {/* 1. Header Banner */}
      <ProductDetailHeader
        productName={currentProduct.name}
        categoryName="Edible Lustre Dust"
        categoryUrl="/products/edible-lustre"
        totalCount={EDIBLE_LUSTRE_PRODUCTS.length}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 2. Horizontal Switcher Tabs */}
        <ProductDetailTabs
          products={EDIBLE_LUSTRE_PRODUCTS}
          currentId={currentProduct.id}
          baseUrl="/products/edible-lustre"
        />

        {/* 3. Product Media & Specifications Matrix */}
        <ProductOverviewSection
          product={currentProduct}
          onOrderClick={() => setIsOrderModalOpen(true)}
        />

        {/* 4. Chemical & Physical Quality Analysis Table */}
        <ProductAnalysisTable
          title="Edible Lustre Dust Confectionery Specification Monograph"
          subtitle="Micro-Prismatic Particle Distribution, Purity Calibration & Heavy Metals Limits"
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
