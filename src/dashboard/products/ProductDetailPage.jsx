/**
 * Read-only product sheet for admins (GET /admin/products/{id}).
 * A block is rendered only when the product has data for it.
 */

import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { adminGetProduct, adminDeleteProduct } from '../../api'
import ProductDeleteModal from './components/ProductDeleteModal'

const DETAIL_FIELDS = [
  ['short_name', 'Short name'],
  ['tagline', 'Tagline'],
  ['group_name', 'Group'],
  ['cas_no', 'CAS No.'],
  ['mf', 'Molecular Formula'],
  ['einecs_no', 'EINECS No.'],
  ['fema_no', 'FEMA No.'],
  ['types', 'Type'],
  ['grade', 'Grade'],
  ['purity', 'Purity'],
  ['color_desc', 'Appearance'],
  ['brand_name', 'Brand Name'],
  ['model_number', 'Model Number'],
  ['other_names', 'Other Names'],
  ['place_of_origin', 'Place of Origin'],
  ['shelf_life', 'Shelf Life'],
  ['moq', 'Minimum Order Quantity'],
  ['supply_ability', 'Supply Ability'],
  ['port', 'Port'],
  ['delivery_detail', 'Delivery Detail'],
  ['packaging_details', 'Packaging Details'],
  ['storage', 'Storage'],
  ['application_summary', 'Applications'],
]

const present = (v) => v !== null && v !== undefined && String(v).trim() !== ''

function Section({ title, children }) {
  return (
    <section className="bg-white border border-slate-200 rounded-2xl p-5">
      <h2 className="text-sm font-extrabold text-slate-900 mb-3">{title}</h2>
      {children}
    </section>
  )
}

function Rows({ rows }) {
  return (
    <dl className="divide-y divide-slate-100 text-xs">
      {rows.map(([label, value], i) => (
        <div key={`${label}-${i}`} className="grid grid-cols-1 sm:grid-cols-[220px_1fr] gap-1 sm:gap-4 py-2">
          <dt className="font-bold text-slate-500">{label}</dt>
          <dd className="text-slate-900 whitespace-pre-line">{value}</dd>
        </div>
      ))}
    </dl>
  )
}

export default function ProductDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showDelete, setShowDelete] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    let active = true
    setLoading(true)
    setError('')
    adminGetProduct(id)
      .then((p) => {
        if (!active) return
        setProduct(p)
        document.title = `${p.name} | Exim India Admin`
      })
      .catch((err) => active && setError(err.status === 404 ? 'Product not found.' : err.message))
      .finally(() => active && setLoading(false))
    return () => {
      active = false
    }
  }, [id])

  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      await adminDeleteProduct(product.id)
      navigate('/dashboard/products')
    } catch (err) {
      setError(err.message || 'Could not delete the product.')
      setShowDelete(false)
    } finally {
      setIsDeleting(false)
    }
  }

  if (loading) {
    return (
      <div className="p-8 flex justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-900" />
      </div>
    )
  }

  if (!product) {
    return (
      <div className="p-8 text-center space-y-3">
        <p className="text-sm text-slate-600">{error || 'Product not found.'}</p>
        <Link to="/dashboard/products" className="text-xs font-bold text-[#0a3622] hover:underline">
          ← Back to products
        </Link>
      </div>
    )
  }

  const detailRows = DETAIL_FIELDS.filter(([key]) => present(product[key])).map(([key, label]) => [
    label,
    product[key],
  ])
  const attributes = (product.detail_attributes || []).map((a) => [a.label, a.value])
  const analysis = (product.analysis_specs || []).map((s) => [s.characteristic, s.requirement])
  const extra = Object.entries(product.extra || {}).filter(([, v]) => present(v))
  const variants = product.variants || []

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl w-full mx-auto space-y-5">
      {error && (
        <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs">{error}</div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div className="flex items-start gap-4 min-w-0">
          <div className="w-20 h-20 rounded-2xl bg-slate-100 border border-slate-200 overflow-hidden flex items-center justify-center shrink-0">
            {product.image_url ? (
              <img src={product.image_url} alt="" className="w-full h-full object-cover" />
            ) : (
              <span className="text-2xl font-black text-slate-300">{product.name.charAt(0)}</span>
            )}
          </div>
          <div className="min-w-0">
            <Link to="/dashboard/products" className="text-xs text-slate-500 hover:text-slate-800">
              ← Back to products
            </Link>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight truncate">{product.name}</h1>
            <div className="flex flex-wrap items-center gap-2 mt-1.5 text-[11px]">
              {product.category && (
                <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 ring-1 ring-emerald-200 font-bold">
                  {product.category.name}
                </span>
              )}
              <span
                className={`px-2.5 py-1 rounded-full font-bold ring-1 ${
                  product.is_active
                    ? 'bg-emerald-50 text-emerald-700 ring-emerald-200'
                    : 'bg-slate-100 text-slate-600 ring-slate-200'
                }`}
              >
                {product.is_active ? 'Published' : 'Hidden'}
              </span>
              {product.is_featured && (
                <span className="px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 ring-1 ring-amber-200 font-bold">
                  Featured
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {product.is_active && product.category && (
            <Link
              to={`/products/${product.category.slug}/${product.slug}`}
              target="_blank"
              className="px-3.5 py-2 rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-700 hover:bg-slate-50"
            >
              View on site ↗
            </Link>
          )}
          <Link
            to={`/dashboard/products/${product.id}/edit`}
            className="px-3.5 py-2 rounded-xl bg-[#0a3622] hover:bg-[#0f4d30] text-white text-xs font-bold"
          >
            Edit
          </Link>
          <button
            type="button"
            onClick={() => setShowDelete(true)}
            className="px-3.5 py-2 rounded-xl border border-red-200 text-red-600 text-xs font-bold hover:bg-red-50 cursor-pointer"
          >
            Delete
          </button>
        </div>
      </div>

      {present(product.description) && (
        <Section title="Description">
          <p className="text-xs text-slate-700 leading-relaxed whitespace-pre-line">{product.description}</p>
        </Section>
      )}

      {present(product.usage_guide) && (
        <Section title="Usage guide">
          <p className="text-xs text-slate-700 leading-relaxed whitespace-pre-line">{product.usage_guide}</p>
        </Section>
      )}

      {detailRows.length > 0 && (
        <Section title="Specifications">
          <Rows rows={detailRows} />
        </Section>
      )}

      {attributes.length > 0 && (
        <Section title="Extra details">
          <Rows rows={attributes} />
        </Section>
      )}

      {extra.length > 0 && (
        <Section title="Custom data">
          <Rows rows={extra.map(([k, v]) => [k, typeof v === 'object' ? JSON.stringify(v) : String(v)])} />
        </Section>
      )}

      {analysis.length > 0 && (
        <Section title="Quality analysis">
          <Rows rows={analysis} />
        </Section>
      )}

      {variants.length > 0 && (
        <Section title={`Variants (${variants.length})`}>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="text-slate-500 text-[10px] uppercase tracking-wider">
                <tr>
                  <th className="py-2 pr-4">SKU</th>
                  <th className="py-2 pr-4">MOQ</th>
                  <th className="py-2 pr-4">Price</th>
                  <th className="py-2 pr-4">Stock</th>
                  <th className="py-2">Active</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {variants.map((v) => (
                  <tr key={v.id}>
                    <td className="py-2 pr-4 font-mono">{v.sku || `#${v.id}`}</td>
                    <td className="py-2 pr-4">{v.moq || '—'}</td>
                    <td className="py-2 pr-4">
                      {v.price != null ? [v.currency, v.price, v.price_unit && `/ ${v.price_unit}`].filter(Boolean).join(' ') : '—'}
                    </td>
                    <td className="py-2 pr-4">{v.stock_status || '—'}</td>
                    <td className="py-2">{v.is_active ? 'Yes' : 'No'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>
      )}

      <ProductDeleteModal
        isOpen={showDelete}
        target={product}
        onClose={() => setShowDelete(false)}
        onConfirm={handleDelete}
        isDeleting={isDeleting}
      />
    </div>
  )
}
