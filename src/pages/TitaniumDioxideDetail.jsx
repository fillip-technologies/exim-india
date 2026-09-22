import { useState, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { TITANIUM_DIOXIDE_PRODUCTS } from '../constants/titaniumDioxideData'
import ProductDetailHeader from '../components/product/detail/ProductDetailHeader'
import ProductDetailTabs from '../components/product/detail/ProductDetailTabs'
import ProductOverviewSection from '../components/product/detail/ProductOverviewSection'
import ProductAnalysisTable from '../components/product/detail/ProductAnalysisTable'
import OrderModal from '../components/product/detail/OrderModal'

export default function TitaniumDioxideDetail() {
  const { id } = useParams()
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false)

  // Find product by id (or fallback to Rutile)
  const currentProduct = useMemo(() => {
    return (
      TITANIUM_DIOXIDE_PRODUCTS.find((p) => p.id === id) ||
      TITANIUM_DIOXIDE_PRODUCTS[0]
    )
  }, [id])

  return (
    <div className="bg-white min-h-screen text-slate-900 pt-20 sm:pt-24 pb-16">
      {/* 1. Header Banner */}
      <ProductDetailHeader
        productName={currentProduct.name}
        categoryName="Titanium Dioxide"
        categoryUrl="/products/titanium-dioxide"
        totalCount={TITANIUM_DIOXIDE_PRODUCTS.length}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 2. Horizontal Switcher Tabs */}
        <ProductDetailTabs
          products={TITANIUM_DIOXIDE_PRODUCTS}
          currentId={currentProduct.id}
          baseUrl="/products/titanium-dioxide"
        />

        {/* 3. Product Media & Specifications Matrix */}
        <ProductOverviewSection
          product={currentProduct}
          onOrderClick={() => setIsOrderModalOpen(true)}
        />

        {/* 4. Chemical & Physical Quality Analysis Table */}
        <ProductAnalysisTable
          title="Titanium Dioxide Technical & Analytical Monograph"
          subtitle="Assay, Whiteness, Tinting Strength & Heavy Metals Quality Certificate"
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
