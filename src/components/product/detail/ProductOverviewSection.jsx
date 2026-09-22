export default function ProductOverviewSection({ product, onOrderClick }) {
  const shareText = encodeURIComponent(`Check out ${product.name} from Exim India Corporation`)

  return (
    <div>
      {/* 1. Product Heading */}
      <div className="text-left mb-4">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl sm:text-3xl font-black font-heading text-emerald-800 tracking-tight">
            {product.name}
          </h2>
          {product.ciNo && (
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800 border border-rose-200">
              C.I. {product.ciNo}
            </span>
          )}
        </div>
        <div className="text-slate-400 font-bold text-sm">--</div>
      </div>

      {/* 2. Main Two-Column Layout (Image + Specs Table) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-10">
        
        {/* Left Column: Image, Order Now Button, Social Share */}
        <div className="lg:col-span-4 xl:col-span-3 text-center space-y-4">
          <div className="rounded-2xl border border-slate-200 p-3 bg-white shadow-xs">
            <img
              src={product.image}
              alt={`${product.name} powder`}
              className="w-full aspect-square object-contain p-2"
            />
          </div>

          {/* Order Now Button */}
          <button
            type="button"
            onClick={onOrderClick}
            className="w-full py-2.5 px-4 rounded-lg bg-[#337ab7] hover:bg-[#286090] text-white font-bold text-sm shadow-sm transition-all active:scale-98 cursor-pointer"
          >
            Order Now
          </button>

          {/* Social Share Icons Row */}
          <div className="flex items-center justify-center gap-3 pt-2 text-slate-500 text-sm">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Share:</span>
            <a
              href={`https://wa.me/?text=${shareText}`}
              target="_blank"
              rel="noopener noreferrer"
              title="Share on WhatsApp"
              className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white flex items-center justify-center transition-colors font-bold text-xs"
            >
              WA
            </a>
            <a
              href="mailto:eximindiacorp@gmail.com"
              title="Send Email"
              className="w-8 h-8 rounded-full bg-slate-100 text-slate-700 hover:bg-slate-800 hover:text-white flex items-center justify-center transition-colors font-bold text-xs"
            >
              ✉
            </a>
          </div>
        </div>

        {/* Right Column: Specification Matrix Table */}
        <div className="lg:col-span-8 xl:col-span-9">
          <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-xs">
            <table className="w-full text-left text-xs border-collapse">
              <tbody>
                {/* Row 1 */}
                <tr className="bg-[#dff0d8] border-b border-slate-200">
                  <th className="p-2.5 font-bold text-slate-900 w-[14%]">CAS No.</th>
                  <td className="p-2.5 text-center font-bold text-slate-600 w-[2%]">:</td>
                  <td className="p-2.5 font-mono text-slate-800 w-[18%]">{product.casNo || 'N/A'}</td>
                  <th className="p-2.5 font-bold text-slate-900 w-[14%]">Other Names</th>
                  <td className="p-2.5 text-center font-bold text-slate-600 w-[2%]">:</td>
                  <td className="p-2.5 text-slate-800 w-[20%]">{product.otherNames || product.fdcName || 'N/A'}</td>
                  <th className="p-2.5 font-bold text-slate-900 w-[10%]">MF</th>
                  <td className="p-2.5 text-center font-bold text-slate-600 w-[2%]">:</td>
                  <td className="p-2.5 font-mono text-slate-800 w-[18%]">{product.mf || 'N/A'}</td>
                </tr>

                {/* Row 2 */}
                <tr className="bg-white border-b border-slate-200">
                  <th className="p-2.5 font-bold text-slate-900">EINECS No.</th>
                  <td className="p-2.5 text-center font-bold text-slate-600">:</td>
                  <td className="p-2.5 font-bold text-slate-800">{product.einecsNo || product.eNumber || 'N/A'}</td>
                  <th className="p-2.5 font-bold text-slate-900">FEMA No.</th>
                  <td className="p-2.5 text-center font-bold text-slate-600">:</td>
                  <td className="p-2.5 text-slate-800">{product.femaNo || 'N/A'}</td>
                  <th className="p-2.5 font-bold text-slate-900">Place of Origin</th>
                  <td className="p-2.5 text-center font-bold text-slate-600">:</td>
                  <td className="p-2.5 text-slate-800">{product.placeOfOrigin}</td>
                </tr>

                {/* Row 3 */}
                <tr className="bg-[#d9edf7] border-b border-slate-200">
                  <th className="p-2.5 font-bold text-slate-900">Types</th>
                  <td className="p-2.5 text-center font-bold text-slate-600">:</td>
                  <td className="p-2.5 text-slate-800 leading-tight">{product.types}</td>
                  <th className="p-2.5 font-bold text-slate-900">Brand Name</th>
                  <td className="p-2.5 text-center font-bold text-slate-600">:</td>
                  <td className="p-2.5 font-semibold text-slate-800">{product.brandName}</td>
                  <th className="p-2.5 font-bold text-slate-900">Modal Number</th>
                  <td className="p-2.5 text-center font-bold text-slate-600">:</td>
                  <td className="p-2.5 font-mono text-slate-800 font-bold">{product.modelNumber}</td>
                </tr>

                {/* Row 4 */}
                <tr className="bg-white border-b border-slate-200">
                  <th className="p-2.5 font-bold text-slate-900">Grade</th>
                  <td className="p-2.5 text-center font-bold text-slate-600">:</td>
                  <td className="p-2.5 text-slate-800">{product.grade}</td>
                  <th className="p-2.5 font-bold text-slate-900">Color</th>
                  <td className="p-2.5 text-center font-bold text-slate-600">:</td>
                  <td className="p-2.5 text-slate-800 font-medium">{product.colorDesc}</td>
                  <th className="p-2.5 font-bold text-slate-900">Application</th>
                  <td className="p-2.5 text-center font-bold text-slate-600">:</td>
                  <td className="p-2.5 text-slate-800 leading-tight">{product.applicationSummary}</td>
                </tr>

                {/* Row 5 */}
                <tr className="bg-[#dff0d8] border-b border-slate-200">
                  <th className="p-2.5 font-bold text-slate-900">Purity</th>
                  <td className="p-2.5 text-center font-bold text-slate-600">:</td>
                  <td className="p-2.5 font-bold text-emerald-800">{product.purity}</td>
                  <th className="p-2.5 font-bold text-slate-900">Shelf Life</th>
                  <td className="p-2.5 text-center font-bold text-slate-600">:</td>
                  <td className="p-2.5 text-slate-800">{product.shelfLife}</td>
                  <th className="p-2.5 font-bold text-slate-900">Packaging</th>
                  <td className="p-2.5 text-center font-bold text-slate-600">:</td>
                  <td className="p-2.5 text-slate-800">As per buyers requirements</td>
                </tr>

                {/* Header: Packaging & Delivery */}
                <tr className="bg-[#d9edf7] border-b border-slate-200">
                  <th colSpan={9} className="p-2 text-center text-rose-700 font-bold text-xs uppercase tracking-wider">
                    Packaging &amp; Delivery
                  </th>
                </tr>

                {/* Packaging Details */}
                <tr className="bg-white border-b border-slate-200">
                  <th colSpan={3} className="p-2.5 font-bold text-slate-900">Packaging Details</th>
                  <td className="p-2.5 text-center font-bold text-slate-600">:</td>
                  <td colSpan={5} className="p-2.5 text-slate-800">
                    {product.packagingDetails}
                  </td>
                </tr>

                {/* Delivery Detail */}
                <tr className="bg-white">
                  <th colSpan={3} className="p-2.5 font-bold text-slate-900">Delivery Detail</th>
                  <td className="p-2.5 text-center font-bold text-slate-600">:</td>
                  <td colSpan={5} className="p-2.5 text-slate-800 font-semibold text-emerald-800">
                    {product.deliveryDetail}
                  </td>
                </tr>

              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  )
}
