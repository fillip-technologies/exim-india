/**
 * src/dashboard/products/index.js
 * ─────────────────────────────────────────────────────────────
 * Barrel export for all components and pages within the
 * dashboard/products directory.
 */

export { default as ProductListingPage } from './ProductListingPage'
export { default as ProductAddPage } from './ProductAddPage'
export { default as ProductDetailPage } from './ProductDetailPage'

// Subcomponents
export { default as ProductFilters } from './components/ProductFilters'
export { default as ProductTable } from './components/ProductTable'
export { default as ProductCard } from './components/ProductCard'
export { default as ProductSpecsEditor } from './components/ProductSpecsEditor'
export { default as ProductDeleteModal } from './components/ProductDeleteModal'

// Data & Store
export {
  productStore,
  PRODUCT_CATEGORIES,
  PRODUCT_GRADES,
  PRODUCT_STATUSES,
  CURRENCIES,
  PRICE_UNITS,
  AVAILABLE_CERTIFICATIONS,
  COMMON_APPLICATIONS,
  STANDARD_ANALYSIS_TEMPLATE,
  EMPTY_PRODUCT_FORM,
  validateProduct,
  generateSlug,
  generateSKU,
} from './productStructure'
