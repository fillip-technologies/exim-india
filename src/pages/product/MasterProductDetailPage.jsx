import { useState, useMemo, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useProduct, useCategoryProducts } from '../../api/useCatalog'
import { CONTACT_INFO } from '../../constants/navigation'
import ProductDetailHeader from '../../components/product/detail/ProductDetailHeader'
import ProductDetailTabs from '../../components/product/detail/ProductDetailTabs'
import OrderModal from '../../components/product/detail/OrderModal'

/** Product columns shown in the specification table. A row only renders when the product has a value. */
const SPEC_FIELDS = [
  ['casNo', 'CAS No.'],
  ['otherNames', 'Other Names'],
  ['mf', 'Molecular Formula'],
  ['einecsNo', 'EINECS No.'],
  ['femaNo', 'FEMA No.'],
  ['types', 'Type'],
  ['grade', 'Grade'],
  ['colorDesc', 'Appearance'],
  ['purity', 'Purity'],
  ['shelfLife', 'Shelf Life'],
  ['brandName', 'Brand Name'],
  ['modelNumber', 'Model Number'],
  ['placeOfOrigin', 'Place of Origin'],
  ['applicationSummary', 'Applications'],
  ['moq', 'Minimum Order Quantity'],
  ['supplyAbility', 'Supply Ability'],
  ['port', 'Port'],
  ['packagingDetails', 'Packaging Details'],
  ['storage', 'Recommended Storage'],
  ['deliveryDetail', 'Delivery Detail'],
]

const hasValue = (v) => v !== null && v !== undefined && String(v).trim() !== ''

const humanize = (key) =>
  key
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/[_-]+/g, ' ')
    .replace(/^./, (c) => c.toUpperCase())

/** Flatten the free-form `extra` JSON into label/value rows */
function extraRows(extra) {
  if (!extra || typeof extra !== 'object') return []
  return Object.entries(extra)
    .map(([key, value]) => {
      if (Array.isArray(value)) value = value.filter(hasValue).join(', ')
      else if (value && typeof value === 'object') value = JSON.stringify(value)
      return [humanize(key), value]
    })
    .filter(([, value]) => hasValue(value))
}

const formatPrice = (variant) => {
  if (variant?.price == null) return null
  const amount = Number(variant.price).toLocaleString(undefined, { maximumFractionDigits: 2 })
  return [variant.currency, amount].filter(Boolean).join(' ') + (variant.priceUnit ? ` / ${variant.priceUnit}` : '')
}

const STOCK_LABELS = {
  in_stock: 'In stock',
  low_stock: 'Low stock',
  out_of_stock: 'Out of stock',
  on_request: 'On request',
}

/**
 * MasterProductDetailPage
 * ─────────────────────────────────────────────────────────────────────────────
 * Fully dynamic product page driven by GET /categories/{slug}/products/{id}.
 * Option pickers (swatch / pack / text) are rendered from product.options[];
 * every other block is rendered only when the product actually has that data.
 */
export default function MasterProductDetailPage() {
  const { category, id } = useParams()
  // Keyed so the picked options / modal state reset when another product opens
  return <ProductDetail key={`${category}/${id}`} categorySlug={category} id={id} />
}

function ProductDetail({ categorySlug, id }) {

  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false)
  const [orderModalMode, setOrderModalMode] = useState('order')

  const { product, loading, error } = useProduct(categorySlug, id)
  const { products: siblings } = useCategoryProducts(categorySlug)

  const categoryName = product?.category?.name || ''
  const options = useMemo(() => product?.options || [], [product])
  const variants = useMemo(() => product?.variants || [], [product])

  // ── Variant selection: { [attributeCode]: valueId } ──────────────────────
  // Defaults come from the product's default variant, else the first value of
  // each axis; whatever the visitor clicks overrides them.
  const defaultSelection = useMemo(() => {
    const defaults = {}
    const defaultVariant =
      variants.find((v) => v.id === product?.defaultVariantId) || variants.find((v) => v.isDefault)

    for (const opt of options) {
      if (!opt.values?.length) continue
      const fromVariant = defaultVariant?.options?.[opt.code]
      defaults[opt.code] = opt.values.some((v) => v.id === fromVariant) ? fromVariant : opt.values[0].id
    }
    return defaults
  }, [product, options, variants])

  const [picked, setPicked] = useState({})
  const selectedValues = useMemo(() => ({ ...defaultSelection, ...picked }), [defaultSelection, picked])

  // A variant matches when every axis it defines agrees with the selection
  const activeVariant = useMemo(() => {
    if (variants.length === 0) return null
    return (
      variants.find((v) =>
        Object.entries(v.options || {}).every(
          ([code, valueId]) => selectedValues[code] === undefined || selectedValues[code] === valueId,
        ),
      ) || null
    )
  }, [variants, selectedValues])

  const selections = useMemo(
    () =>
      options
        .map((opt) => {
          const value = opt.values?.find((v) => v.id === selectedValues[opt.code])
          return value ? { code: opt.code, type: opt.type, label: opt.name, value } : null
        })
        .filter(Boolean),
    [options, selectedValues],
  )

  const variantMatches = (v, selection) =>
    Object.entries(v.options || {}).every(([c, val]) => selection[c] === undefined || selection[c] === val)

  // A value is available when some variant has it together with the other current picks
  const isAvailable = (code, valueId) =>
    variants.length === 0 ||
    variants.some((v) => v.options?.[code] === valueId && variantMatches(v, { ...selectedValues, [code]: valueId }))

  // Picking a value that doesn't exist with the other picks moves the other axes
  // to the closest combination that does exist.
  const handleSelectValue = (code, valueId) => {
    const next = { ...selectedValues, [code]: valueId }
    if (variants.length === 0 || variants.some((v) => variantMatches(v, next))) {
      setPicked((prev) => ({ ...prev, [code]: valueId }))
      return
    }
    let best = null
    let bestScore = -1
    for (const v of variants) {
      if (v.options?.[code] !== valueId) continue
      const score = Object.entries(v.options).filter(([c, val]) => selectedValues[c] === val).length
      if (score > bestScore) {
        best = v
        bestScore = score
      }
    }
    setPicked((prev) => ({ ...prev, ...(best ? best.options : {}), [code]: valueId }))
  }

  useEffect(() => {
    if (product) {
      document.title = [product.name, categoryName, 'Exim India Corporation'].filter(Boolean).join(' | ')
    }
  }, [product, categoryName])

  // Image: the option value's image, then the variant's, then the product's
  const displayImage = useMemo(() => {
    const optionImage = selections.find((s) => s.value.image)?.value.image
    return optionImage || activeVariant?.imageUrl || product?.image || null
  }, [selections, activeVariant, product])

  const specRows = useMemo(() => {
    if (!product) return []
    const rows = []
    const seen = new Set()
    const push = (label, value) => {
      if (!hasValue(value) || seen.has(label.toLowerCase())) return
      seen.add(label.toLowerCase())
      rows.push([label, value])
    }

    SPEC_FIELDS.forEach(([key, label]) => {
      if (key === 'moq') push(label, activeVariant?.moq || product.moq)
      else if (key === 'supplyAbility') push(label, activeVariant?.supplyAbility || product.supplyAbility)
      else push(label, product[key])
    })
    ;(product.attributes || []).forEach((a) => push(a.label, a.value))
    ;(product.fields || []).forEach((group) =>
      group.items?.forEach((item) =>
        push(item.label, hasValue(item.value) ? [item.value, item.unit].filter(hasValue).join(' ') : null),
      ),
    )
    extraRows(product.extra).forEach(([label, value]) => push(label, value))
    return rows
  }, [product, activeVariant])

  if (!product && loading) {
    return (
      <div className="bg-white min-h-screen text-slate-900 pt-28 pb-16 flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-emerald-900" />
      </div>
    )
  }

  if (!product) {
    const notFound = error?.status === 404
    return (
      <div className="bg-white min-h-screen text-slate-900 pt-28 pb-16 text-center max-w-xl mx-auto px-4">
        <div className="text-4xl mb-3">🔍</div>
        <h2 className="text-2xl font-bold font-heading text-slate-900">
          {notFound ? 'Product Not Found' : 'Unable to Load Product'}
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-2">
          {notFound
            ? 'The requested product could not be located in this category.'
            : error?.message || 'Please try again in a moment.'}
        </p>
        <Link
          to={`/products/${categorySlug}`}
          className="mt-6 inline-block px-5 py-2.5 rounded-xl bg-[#0a3622] text-white font-bold text-xs hover:bg-[#0f4d30] transition-colors"
        >
          ← Back to Products
        </Link>
      </div>
    )
  }

  const swatchOptions = options.filter((o) => o.type === 'swatch' && o.values?.length > 0)
  const packOptions = options.filter((o) => o.type === 'pack' && o.values?.length > 0)
  const otherOptions = options.filter(
    (o) => o.type !== 'swatch' && o.type !== 'pack' && o.values?.length > 0,
  )

  const whatsappText =
    `Hello Exim India, I want to inquire about ${product.name}` +
    (selections.length ? ` (${selections.map((s) => `${s.label}: ${s.value.label}`).join(', ')})` : '')
  const price = formatPrice(activeVariant)
  const stock = activeVariant?.stockStatus ? STOCK_LABELS[activeVariant.stockStatus] || null : null

  return (
    <div className="bg-white min-h-screen text-slate-900 pt-20 sm:pt-24 pb-16 font-body">
      <ProductDetailHeader
        productName={product.name}
        categoryName={categoryName || categorySlug}
        categoryUrl={`/products/${categorySlug}`}
        totalCount={siblings.length}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {siblings.length > 1 && (
          <ProductDetailTabs products={siblings} currentId={product.id} baseUrl={`/products/${categorySlug}`} />
        )}

        {/* ── Overview: image + CTAs | info ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start mb-14">
          <div className="lg:col-span-5 xl:col-span-4 text-center space-y-4">
            <div className="group relative rounded-3xl border border-slate-200/90 bg-white p-3 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
              <div className="relative aspect-[4/5] sm:aspect-square w-full rounded-2xl overflow-hidden bg-slate-900/5 border border-slate-100 flex items-center justify-center p-1">
                {displayImage ? (
                  <img
                    src={displayImage}
                    alt={`${product.name} - Exim India Corporation`}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <span className="text-6xl font-black font-heading text-slate-300">
                    {product.name.charAt(0)}
                  </span>
                )}
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                setOrderModalMode('order')
                setIsOrderModalOpen(true)
              }}
              className="w-full py-3.5 px-6 rounded-2xl bg-[#0a3622] hover:bg-[#0f4d30] text-white font-bold font-heading text-sm shadow-md hover:shadow-lg transition-all active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Order Now</span>
              <span>&rarr;</span>
            </button>

            <div className="grid grid-cols-2 gap-2.5">
              <a
                href={`https://wa.me/${CONTACT_INFO.whatsapp}?text=${encodeURIComponent(whatsappText)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 px-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
              >
                <span>💬 WhatsApp</span>
              </a>
              <a
                href={`mailto:${CONTACT_INFO.email}?cc=${CONTACT_INFO.secondaryEmail}&subject=${encodeURIComponent(
                  'Inquiry: ' + product.name,
                )}`}
                className="py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
              >
                <span>✉ Email Quote</span>
              </a>
            </div>

            <div className="pt-1 text-[11px] text-slate-500">
              <span>Direct helpline: </span>
              {CONTACT_INFO.phones.map((phone, i) => (
                <span key={phone}>
                  {i > 0 && <span> / </span>}
                  <a
                    href={`tel:${phone.replace(/\s/g, '')}`}
                    className="font-semibold text-slate-700 hover:text-[#0a3622]"
                  >
                    {phone}
                  </a>
                </span>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7 xl:col-span-8 text-left space-y-5">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                {categoryName && (
                  <span className="px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-emerald-50 text-[#0a3622] border border-emerald-200">
                    {categoryName}
                  </span>
                )}
                {product.groupName && (
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-50 text-amber-900 border border-amber-200">
                    {product.groupName}
                  </span>
                )}
                {product.grade && (
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                    {product.grade}
                  </span>
                )}
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading text-slate-900 tracking-tight">
                {product.name}
              </h2>
              {product.tagline && (
                <p className="mt-2 text-sm sm:text-base font-semibold text-amber-900 tracking-wide">
                  {product.tagline}
                </p>
              )}
            </div>

            <div className="w-20 h-1 bg-gradient-to-r from-amber-500 to-yellow-300 rounded-full" />

            {product.description && (
              <p className="text-slate-700 font-medium text-sm sm:text-base leading-relaxed">
                {product.description}
              </p>
            )}

            {/* Generic option pickers (everything that is not a swatch or pack axis) */}
            {otherOptions.map((opt) => (
              <OptionPills
                key={opt.id}
                option={opt}
                selectedId={selectedValues[opt.code]}
                onSelect={handleSelectValue}
                isAvailable={isAvailable}
              />
            ))}

            {/* Pack sizes */}
            {packOptions.map((opt) => (
              <PackGrid
                key={opt.id}
                option={opt}
                selectedId={selectedValues[opt.code]}
                onSelect={handleSelectValue}
                isAvailable={isAvailable}
              />
            ))}

            {/* Variant summary (SKU, MOQ, price, stock) */}
            {activeVariant &&
              (activeVariant.sku || activeVariant.moq || price || stock) && (
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-slate-500">
                  {activeVariant.sku && (
                    <span>
                      <span className="font-semibold text-slate-700">SKU:</span>{' '}
                      <span className="font-mono">{activeVariant.sku}</span>
                    </span>
                  )}
                  {activeVariant.moq && (
                    <span>
                      <span className="font-semibold text-slate-700">MOQ:</span> {activeVariant.moq}
                    </span>
                  )}
                  {price && (
                    <span>
                      <span className="font-semibold text-slate-700">Price:</span> {price}
                    </span>
                  )}
                  {stock && (
                    <span>
                      <span className="font-semibold text-slate-700">Availability:</span> {stock}
                    </span>
                  )}
                </div>
              )}

            {/* Applications */}
            {product.applications?.length > 0 && (
              <div>
                <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-800 mb-2">
                  Applications
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.applications.map((app) => (
                    <span
                      key={app}
                      className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200"
                    >
                      {app}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ── Swatches (every swatch-type option) ── */}
        {swatchOptions.map((opt) => (
          <SwatchSection
            key={opt.id}
            option={opt}
            selectedId={selectedValues[opt.code]}
            onSelect={handleSelectValue}
            isAvailable={isAvailable}
          />
        ))}

        {/* ── Usage guide / techniques ── */}
        {(product.usageGuide || product.techniques?.length > 0) && (
          <section className="mb-14 pt-8 border-t border-slate-200">
            <SectionTitle>Usage &amp; Application Techniques</SectionTitle>
            {product.usageGuide && (
              <p className="text-sm text-slate-600 leading-relaxed mb-5 max-w-4xl">{product.usageGuide}</p>
            )}
            {product.techniques?.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {product.techniques.map((t) => (
                  <div key={t.title} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs">
                    <h4 className="font-extrabold font-heading text-slate-900 text-sm">
                      {t.icon && <span className="mr-1.5">{t.icon}</span>}
                      {t.title}
                    </h4>
                    {t.desc && <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">{t.desc}</p>}
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {/* ── Specification details ── */}
        {specRows.length > 0 && (
          <section className="mb-14 pt-8 border-t border-slate-200">
            <SectionTitle>Product Specifications</SectionTitle>
            <KeyValueTable rows={specRows} />
          </section>
        )}

        {/* ── Quality analysis ── */}
        {product.analysis?.length > 0 && (
          <section className="mb-14 pt-8 border-t border-slate-200">
            <SectionTitle>Specification &amp; Quality Analysis</SectionTitle>
            <KeyValueTable
              rows={product.analysis.map((r) => [r.characteristic, r.requirement])}
              head={['Specification Parameter', 'Quality Standard / Threshold']}
            />
          </section>
        )}

        {/* ── Bundles ── */}
        {product.bundles?.length > 0 && (
          <section className="mb-14 pt-8 border-t border-slate-200">
            <SectionTitle>Bundles &amp; Assortments</SectionTitle>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {product.bundles.map((b) => (
                <div key={b.id} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs">
                  <h4 className="font-extrabold font-heading text-slate-900 text-sm">{b.name}</h4>
                  {b.description && <p className="text-xs text-slate-600 mt-1.5">{b.description}</p>}
                  {b.price != null && (
                    <p className="text-xs font-bold text-[#0a3622] mt-2">
                      {[b.currency, Number(b.price).toLocaleString()].filter(Boolean).join(' ')}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── Bottom CTA ── */}
        <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-[#0a3622] to-slate-900 text-white p-8 sm:p-10 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1.5 max-w-xl">
            <h3 className="text-xl sm:text-2xl font-black font-heading text-white">
              Ready to Order or Need a Free Product Sample?
            </h3>
            <p className="text-xs sm:text-sm text-slate-200">
              We ship certified sample kits and bulk consignments to commercial manufacturers,
              formulators, and distributors worldwide.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <Link
              to={`/products/${categorySlug}`}
              className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs transition-colors"
            >
              &larr; Back to {categoryName || 'Collection'}
            </Link>
            <button
              type="button"
              onClick={() => {
                setOrderModalMode('quote')
                setIsOrderModalOpen(true)
              }}
              className="px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs shadow-lg transition-all cursor-pointer hover:scale-105"
            >
              Request Free Sample / Quote &rarr;
            </button>
          </div>
        </div>
      </div>

      <OrderModal
        key={`${activeVariant?.id ?? 'none'}-${isOrderModalOpen}`}
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        product={product}
        selections={selections}
        activeVariant={activeVariant}
        mode={orderModalMode}
      />
    </div>
  )
}

// ════════════════════════════════════════════════════════════════════════════

function SectionTitle({ children }) {
  return (
    <div className="mb-4 flex items-center gap-2">
      <span className="w-5 h-1 bg-[#0a3622] rounded-full inline-block" />
      <h3 className="text-xl sm:text-2xl font-black font-heading text-slate-900 tracking-tight">{children}</h3>
    </div>
  )
}

function KeyValueTable({ rows, head }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-xs bg-white">
      <table className="w-full text-left text-xs border-collapse">
        {head && (
          <thead>
            <tr className="bg-[#d9edf7] border-b border-slate-200">
              <th className="p-3 font-bold text-slate-900 w-[40%]">{head[0]}</th>
              <th className="p-3 font-bold text-slate-900">{head[1]}</th>
            </tr>
          </thead>
        )}
        <tbody>
          {rows.map(([label, value], idx) => (
            <tr
              key={`${label}-${idx}`}
              className={`border-b border-slate-200 last:border-b-0 ${idx % 2 === 0 ? 'bg-white' : 'bg-[#dff0d8]/40'}`}
            >
              <td className="p-3 font-bold text-slate-900 w-[40%] align-top">{label}</td>
              <td className="p-3 text-slate-800 font-medium whitespace-pre-line">{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function OptionPills({ option, selectedId, onSelect, isAvailable }) {
  const selected = option.values.find((v) => v.id === selectedId)
  return (
    <div className="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200/90 space-y-2.5 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-amber-200/60 pb-2">
        <span className="text-xs font-black uppercase tracking-wider text-amber-950 font-heading">
          {option.name}
        </span>
        {selected && (
          <span className="text-[11px] text-amber-800 font-semibold">
            Selected: <span className="font-black">{selected.label}</span>
          </span>
        )}
      </div>
      <div className="flex flex-wrap items-center gap-2">
        {option.values.map((v) => {
          const isActive = selectedId === v.id
          const available = isAvailable(option.code, v.id)
          return (
            <button
              key={v.id}
              type="button"
              onClick={() => onSelect(option.code, v.id)}
              title={available ? undefined : 'Not offered with the current selection — click to switch'}
              className={`${available ? '' : 'opacity-40 '}px-3 py-1.5 rounded-xl text-xs font-black transition-all border flex items-center gap-1.5 cursor-pointer ${
                isActive
                  ? 'bg-[#0a3622] text-white border-[#0a3622] shadow-sm ring-2 ring-emerald-500/30'
                  : 'bg-white hover:bg-amber-100 text-slate-800 border-amber-300 shadow-2xs'
              }`}
            >
              {v.code && <span>{v.code}</span>}
              <span>{v.label}</span>
              {isActive && <span className="text-amber-400 font-bold">✓</span>}
            </button>
          )
        })}
      </div>
    </div>
  )
}

function PackGrid({ option, selectedId, onSelect, isAvailable }) {
  return (
    <div>
      <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-800 mb-3">
        {option.name}
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        {option.values.map((pack) => {
          const isActive = selectedId === pack.id
          const available = isAvailable(option.code, pack.id)
          return (
            <button
              key={pack.id}
              type="button"
              onClick={() => onSelect(option.code, pack.id)}
              title={available ? undefined : 'Not offered with the current selection — click to switch'}
              className={`${available ? '' : 'opacity-40 '}p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                isActive
                  ? 'border-amber-500 bg-amber-50/60 ring-2 ring-amber-400/50 shadow-sm'
                  : 'bg-white border-slate-200 hover:border-amber-300 hover:shadow-sm'
              }`}
            >
              <div className="text-base font-extrabold text-slate-900 font-heading">{pack.label}</div>
              {pack.container && <div className="text-xs font-bold text-amber-800 mt-0.5">{pack.container}</div>}
              {pack.target && <div className="text-[10px] text-slate-400 mt-1">{pack.target}</div>}
            </button>
          )
        })}
      </div>
    </div>
  )
}

function SwatchSection({ option, selectedId, onSelect, isAvailable }) {
  const selected = option.values.find((v) => v.id === selectedId) || null
  const swatchStyle = (v) => ({
    backgroundColor: v.hex || undefined,
    backgroundImage:
      v.gradient ||
      'radial-gradient(circle at 35% 35%, rgba(255,255,255,0.75) 0%, rgba(255,255,255,0.15) 30%, transparent 65%)',
  })

  return (
    <section className="mb-14 pt-8 border-t border-slate-200">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <span className="w-5 h-1 bg-[#c59b27] rounded-full inline-block" />
          <h3 className="text-xl sm:text-2xl font-black font-heading text-slate-900 tracking-tight">
            {option.name} ({option.values.length})
          </h3>
        </div>
        <p className="text-xs sm:text-sm text-slate-500">
          Click any option to select it for your order. The selected option is highlighted.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-3 sm:gap-4 mb-6">
        {option.values.map((v) => {
          const isSelected = selectedId === v.id
          const available = isAvailable(option.code, v.id)
          return (
            <button
              type="button"
              key={v.id}
              onClick={() => onSelect(option.code, v.id)}
              title={available ? undefined : 'Not offered with the current selection — click to switch'}
              className={`${available ? '' : 'opacity-40 '}p-3.5 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-between gap-2.5 group ${
                isSelected
                  ? 'border-amber-500 bg-amber-50/60 shadow-md ring-2 ring-amber-400/60 -translate-y-1'
                  : 'border-slate-200 bg-white hover:border-amber-300 hover:shadow-md hover:-translate-y-0.5'
              }`}
            >
              {v.hex || v.gradient ? (
                <div
                  className="relative w-14 h-14 rounded-full shadow-md border border-black/10 flex items-center justify-center transition-transform group-hover:scale-110 overflow-hidden"
                  style={swatchStyle(v)}
                >
                  {isSelected && (
                    <span className="relative z-10 text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] text-sm font-black">
                      ✓
                    </span>
                  )}
                </div>
              ) : null}
              <div className="w-full">
                <p className="text-xs font-extrabold text-slate-800 group-hover:text-amber-950 truncate">
                  {v.label}
                </p>
                {v.tone && v.tone !== v.label && (
                  <p className="text-[10px] text-slate-500 truncate mt-0.5" title={v.tone}>
                    {v.tone}
                  </p>
                )}
              </div>
            </button>
          )
        })}
      </div>

      {selected && (selected.hex || selected.tone) && (
        <div className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-amber-200/80 shadow-xs">
          {(selected.hex || selected.gradient) && (
            <div
              className="w-12 h-12 rounded-full border-2 border-white shadow-md flex-shrink-0"
              style={swatchStyle(selected)}
            />
          )}
          <div>
            <p className="text-sm font-black text-slate-900">{selected.label}</p>
            {selected.tone && selected.tone !== selected.label && (
              <p className="text-xs text-slate-500 mt-0.5">{selected.tone}</p>
            )}
          </div>
          {selected.hex && (
            <div className="ml-auto text-[11px] text-slate-400">
              <span
                className="font-mono bg-slate-100 px-2 py-0.5 rounded-lg text-slate-600"
                style={{ borderLeft: `4px solid ${selected.hex}` }}
              >
                {selected.hex}
              </span>
            </div>
          )}
        </div>
      )}
    </section>
  )
}
