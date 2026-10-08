import { useState, useMemo, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { BAKERY_PRODUCTS } from '../../constants/bakeryColorsData'
import ProductDetailHeader from '../../components/product/detail/ProductDetailHeader'
import ProductDetailTabs from '../../components/product/detail/ProductDetailTabs'
import OrderModal from '../../components/product/detail/OrderModal'

export default function BakeryColorDetail() {
  const { id } = useParams()
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false)

  // Find product by id (or fallback to first product, handling sprinkles aliases)
  const product = useMemo(() => {
    return (
      BAKERY_PRODUCTS.find((p) => p.id === id) ||
      (id === 'sprinkles' || id === 'dazzling-sprinkles-1-5mm' || id === 'sprinkles-1-5mm'
        ? BAKERY_PRODUCTS.find((p) => p.id === 'dazzling-sprinkles')
        : null) ||
      (id === 'sprinkles-4mm'
        ? BAKERY_PRODUCTS.find((p) => p.id === 'dazzling-sprinkles-4mm')
        : null) ||
      (id === 'sprinkles-6mm'
        ? BAKERY_PRODUCTS.find((p) => p.id === 'dazzling-sprinkles-6mm')
        : null) ||
      BAKERY_PRODUCTS[0]
    )
  }, [id])

  const [selectedColorState, setSelectedColor] = useState(null)
  const selectedColor = useMemo(() => {
    if (selectedColorState && product?.colors?.some((c) => c.id === selectedColorState.id)) {
      return selectedColorState
    }
    return product?.colors?.[0] || null
  }, [product, selectedColorState])

  useEffect(() => {
    if (product) {
      document.title = `${product.name} | Bakery Colors | Exim India Corporation`
    }
  }, [product])

  if (!product) return null

  return (
    <div className="bg-white min-h-screen text-slate-900 pt-20 sm:pt-24 pb-16 font-body">
      {/* 1. Header Banner with Breadcrumbs */}
      <ProductDetailHeader
        productName={product.name}
        categoryName="Bakery Colors"
        categoryUrl="/products/bakery-colors"
        totalCount={BAKERY_PRODUCTS.length}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Product Switcher Tabs */}
        <ProductDetailTabs
          products={BAKERY_PRODUCTS}
          currentId={product.id}
          baseUrl="/products/bakery-colors"
        />

        {/* ========================================================================= */}
        {/* 2. PRODUCT OVERVIEW: Left Media & CTA + Right Narrative & Pack Sizes      */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start mb-14">
          
          {/* Left Column: Image Card & CTAs */}
          <div className="lg:col-span-5 xl:col-span-4 text-center space-y-4">
            {/* Full Product Image Card */}
            <div className="group relative rounded-3xl border border-slate-200/90 bg-white p-3 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
              <div className="relative aspect-[4/5] sm:aspect-square w-full rounded-2xl overflow-hidden bg-slate-900/5 border border-slate-100 flex items-center justify-center p-1">
                <img
                  src={product.image}
                  alt={`${product.name} - Exim India Corporation`}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>

            {/* Order Now / Request Quote CTA */}
            <button
              type="button"
              onClick={() => setIsOrderModalOpen(true)}
              className="w-full py-3.5 px-6 rounded-2xl bg-[#0a3622] hover:bg-[#0f4d30] text-white font-bold font-heading text-sm shadow-md hover:shadow-lg transition-all active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Order Now / Request Quote</span>
              <span>&rarr;</span>
            </button>

            {/* Direct WhatsApp & Email Buttons */}
            <div className="grid grid-cols-2 gap-2.5">
              <a
                href={`https://wa.me/917977523176?text=${encodeURIComponent('Hello Exim India, I want to inquire about ' + product.name + (selectedColor ? ' (' + selectedColor.name + ')' : ''))}`}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 px-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
              >
                <span>💬 WhatsApp</span>
              </a>
              <a
                href={`mailto:info@eximindiacorporation.com?cc=eximindiacorp@gmail.com&subject=${encodeURIComponent('Inquiry: ' + product.name)}`}
                className="py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
              >
                <span>✉ Email Quote</span>
              </a>
            </div>
          </div>

          {/* Right Column: Title, Narrative & Pack Sizes */}
          <div className="lg:col-span-7 xl:col-span-8 text-left space-y-5">
            {/* Product Title */}
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading text-slate-900 tracking-tight">
                {product.name}
              </h2>
              <p className="mt-2 text-sm sm:text-base font-semibold text-amber-900 tracking-wide">
                {product.tagline}
              </p>
            </div>

            {/* Gold Divider */}
            <div className="w-20 h-1 bg-gradient-to-r from-amber-500 to-yellow-300 rounded-full" />

            {/* Quick Ball Size Switcher when viewing Sprinkles products */}
            {product?.id?.includes('sprinkles') && (
              <div className="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200/90 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
                <div className="flex items-center gap-2.5">
                  <span className="w-8 h-8 rounded-xl bg-amber-500/15 text-amber-900 flex items-center justify-center text-sm font-black shrink-0">
                    ⚪
                  </span>
                  <div>
                    <span className="text-xs font-black uppercase tracking-wider text-amber-950 block font-heading">
                      Select Ball Diameter / Size
                    </span>
                    <span className="text-[11px] text-amber-800">
                      Calibrated sphere diameters: 1.5mm, 4mm, and 6mm
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {[
                    { id: 'dazzling-sprinkles', label: '1.5mm Balls' },
                    { id: 'dazzling-sprinkles-4mm', label: '4mm Balls' },
                    { id: 'dazzling-sprinkles-6mm', label: '6mm Balls' },
                  ].map((variant) => {
                    const isActive = product.id === variant.id
                    return (
                      <Link
                        key={variant.id}
                        to={`/products/bakery-colors/${variant.id}`}
                        className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all border flex items-center gap-1.5 cursor-pointer ${
                          isActive
                            ? 'bg-[#0a3622] text-white border-[#0a3622] shadow-sm ring-2 ring-emerald-500/30'
                            : 'bg-white hover:bg-amber-100 text-slate-800 border-amber-300 shadow-2xs'
                        }`}
                      >
                        <span>{variant.label}</span>
                        {isActive && <span className="text-amber-400 font-bold">✓</span>}
                      </Link>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Narrative Description */}
            <div className="space-y-3.5 text-xs sm:text-sm text-slate-600 leading-relaxed">
              <p className="text-slate-700 font-medium text-sm sm:text-base leading-relaxed">
                {product.description}
              </p>
              <p>
                Engineered for maximum brilliance, {product.name} from Exim India Corporation provides a breathtaking metallic pearl effect that spreads evenly across finished confections and desserts. Formulated with high-purity food-grade components to adhere cleanly without altering textures, flavor, or structural integrity.
              </p>
            </div>

            {/* Available Pack Sizes */}
            <div className="pt-2">
              <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-800 mb-3 flex items-center gap-2">
                <span>📦 Available Pack Sizes</span>
                <span className="text-[11px] font-normal text-slate-500 normal-case">(Retail to bulk export packing)</span>
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {product.packSizes.map((pack) => (
                  <div
                    key={pack.size}
                    className="p-3 rounded-2xl bg-white border border-slate-200 hover:border-amber-300 hover:shadow-sm transition-all"
                  >
                    <div className="text-base font-extrabold text-slate-900 font-heading">
                      {pack.size}
                    </div>
                    <div className="text-xs font-bold text-amber-800 mt-0.5">
                      {pack.container}
                    </div>
                    <div className="text-[10px] text-slate-400 mt-1">
                      {pack.target}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 3. INTERACTIVE METALLIC COLOUR SWATCHES RANGE                            */}
        {/* ========================================================================= */}
        <section className="mb-14 pt-8 border-t border-slate-200">
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-5 h-1 bg-[#c59b27] rounded-full inline-block" />
              <h3 className="text-xl sm:text-2xl font-black font-heading text-slate-900 tracking-tight">
                Standard Colour Range ({product.colors?.length} Shades)
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-500">
              Click any shade to preview details, tone description, and formulation specs.
            </p>
          </div>

          {/* Color Swatches Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-3 sm:gap-4 mb-6">
            {product.colors.map((color) => {
              const isSelected = selectedColor?.id === color.id
              return (
                <div
                  key={color.id}
                  onClick={() => setSelectedColor(color)}
                  className={`p-3.5 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-between gap-2.5 group ${
                    isSelected
                      ? 'border-amber-500 bg-amber-50/60 shadow-md ring-2 ring-amber-400/60 -translate-y-1'
                      : 'border-slate-200 bg-white hover:border-amber-300 hover:shadow-md hover:-translate-y-0.5'
                  }`}
                >
                  {/* Metallic Shimmer / Pearl Ball Circle */}
                  <div
                    className="relative w-14 h-14 rounded-full shadow-md border border-black/10 flex items-center justify-center transition-transform group-hover:scale-110 overflow-hidden"
                    style={{
                      backgroundColor: color.hex,
                      backgroundImage: color.bgGradient || `radial-gradient(circle at 35% 35%, rgba(255,255,255,0.75) 0%, rgba(255,255,255,0.15) 30%, transparent 65%)`,
                    }}
                  >
                    {/* Pearlescent 3D sphere highlight sheen */}
                    <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_35%_35%,rgba(255,255,255,0.7)_0%,rgba(255,255,255,0.15)_30%,transparent_65%)] pointer-events-none" />
                    {isSelected && (
                      <span className="relative z-10 text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] text-sm font-black">
                        ✓
                      </span>
                    )}
                  </div>

                  {/* Name & Tone */}
                  <div className="w-full">
                    <p className="text-xs font-extrabold text-slate-800 group-hover:text-amber-950 truncate">
                      {color.name}
                    </p>
                    <p className="text-[10px] text-slate-500 truncate mt-0.5" title={color.tone}>
                      {color.tone}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 4. TECHNICAL SPECIFICATION MONOGRAPH TABLE                                */}
        {/* ========================================================================= */}
        <section className="mb-14 pt-8 border-t border-slate-200">
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-5 h-1 bg-[#0a3622] rounded-full inline-block" />
              <h3 className="text-xl sm:text-2xl font-black font-heading text-slate-900 tracking-tight">
                Product Technical Specifications &amp; Quality Monograph
              </h3>
            </div>
            <p className="text-xs text-slate-500 font-medium">
              Verified physical, chemical, and analytical compliance parameters for global food export
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-xs bg-white">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#d9edf7] border-b border-slate-200">
                  <th className="p-3 font-bold text-slate-900 w-[40%]">Specification Parameter</th>
                  <th className="p-3 text-center font-bold text-slate-600 w-[5%]">:</th>
                  <th className="p-3 font-bold text-slate-900 w-[55%]">Quality Standard / Threshold</th>
                </tr>
              </thead>
              <tbody>
                {product.analysis.map((row, idx) => (
                  <tr
                    key={row.characteristic}
                    className={`border-b border-slate-200 ${idx % 2 === 0 ? 'bg-white' : 'bg-[#dff0d8]/40'}`}
                  >
                    <td className="p-3 font-bold text-slate-900">{row.characteristic}</td>
                    <td className="p-3 text-center font-bold text-slate-400">:</td>
                    <td className="p-3 text-slate-800 font-medium">{row.requirement}</td>
                  </tr>
                ))}
                <tr className="bg-white border-b border-slate-200">
                  <td className="p-3 font-bold text-slate-900">Packaging Details</td>
                  <td className="p-3 text-center font-bold text-slate-400">:</td>
                  <td className="p-3 text-slate-800">{product.packagingDetails}</td>
                </tr>
                <tr className="bg-[#dff0d8]/40 border-b border-slate-200">
                  <td className="p-3 font-bold text-slate-900">Recommended Storage</td>
                  <td className="p-3 text-center font-bold text-slate-400">:</td>
                  <td className="p-3 text-slate-800">{product.storage}</td>
                </tr>
                <tr className="bg-white">
                  <td className="p-3 font-bold text-slate-900">Dispatch Port &amp; Delivery</td>
                  <td className="p-3 text-center font-bold text-slate-400">:</td>
                  <td className="p-3 text-emerald-800 font-semibold">{product.deliveryDetail}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 5. BOTTOM CALL TO ACTION BANNER                                           */}
        {/* ========================================================================= */}
        <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-[#0a3622] to-slate-900 text-white p-8 sm:p-10 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1.5 max-w-xl">
            <h3 className="text-xl sm:text-2xl font-black font-heading text-white">
              Ready to Order or Need a Free Shade Sample?
            </h3>
            <p className="text-xs sm:text-sm text-slate-200">
              We ship sample kits and bulk consignments to commercial bakeries, patisseries, and confectionery manufacturers worldwide.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <Link
              to="/products/bakery-colors"
              className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs transition-colors"
            >
              &larr; Back to Bakery Colors
            </Link>
            <button
              type="button"
              onClick={() => setIsOrderModalOpen(true)}
              className="px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs shadow-lg transition-all cursor-pointer hover:scale-105"
            >
              Request Free Sample / Quote &rarr;
            </button>
          </div>
        </div>
      </div>


      {/* ========================================================================= */}
      {/* 6. ORDER INQUIRY MODAL                                                    */}
      {/* ========================================================================= */}
      <OrderModal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        product={product}
      />
    </div>
  )
}
