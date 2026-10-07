export default function ProductOverviewSection({ product, onOrderClick }) {
  const shareText = encodeURIComponent(`Check out ${product.name} from Exim India Corporation`)

  // Intelligent descriptive paragraph generator tailored to product attributes
  const getProductDescriptions = () => {
    if (product.description) {
      return {
        p1: product.description,
        p2: `Specifically developed for ${product.applicationSummary || 'high-standard industrial and commercial applications'}, it offers exceptional physical stability, reliable purity, and an extended shelf life of ${product.shelfLife || '24 months'}. Manufactured under stringent quality management with worldwide dispatch from ${product.placeOfOrigin || 'Mumbai, India'}.`,
      }
    }

    // Check if fruit puree / mango pulp
    if (product.variety || (product.types && product.types.toLowerCase().includes('fruit')) || product.name.toLowerCase().includes('pulp')) {
      return {
        p1: `${product.name} exported by Exim India Corporation is prepared from mature, hand-selected fruit sourced directly from the fertile agricultural belts of ${product.placeOfOrigin || 'India'}. Processed in certified facilities adhering to international standards (FSSAI, ISO 22000, US-FDA registered), it delivers 100% natural fruit solids with authentic color, aroma, and rich taste, free from artificial additives or extraneous matter.`,
        p2: `Engineered for versatile industrial and culinary use, it is widely utilized across ${product.applicationSummary || 'beverages, ice creams, confectionery, dairy products, bakery glazes, and fruit preparations'}. The product boasts exceptional batch-to-batch consistency, a standard shelf life of ${product.shelfLife || '2 Years'}, and is delivered in robust ${product.packagingDetails || 'aseptic packaging'} tailored for global export.`,
      }
    }

    // Check if pharma
    if (product.pharmacopoeia || (product.grade && product.grade.toLowerCase().includes('pharma'))) {
      return {
        p1: `${product.name} by Exim India Corporation is a certified pharmaceutical-grade color formulation compliant with international pharmacopoeial standards (${product.pharmacopoeia || 'IP / BP / USP / EP'}). Manufactured under rigorous WHO-GMP and ISO certified parameters, it features high dye purity (${product.purity || 'compliant with pharmacopoeia standards'}), ultra-low heavy metal thresholds, and stringent microbiological safety.`,
        p2: `Ideal for ${product.applicationSummary || 'pharmaceutical tablet coatings, hard gelatin capsules, oral syrups, and pediatric suspensions'}, it provides uniform hue stability and rapid dispersion. Each consignment is backed by a comprehensive Certificate of Analysis (COA) and regulatory documentation, packaged in ${product.packagingDetails || 'tamper-evident export grade containers'} for safe international transit.`,
      }
    }

    // Default for food colors, flavours, pigments, essential oils, and chemicals
    return {
      p1: `${product.name} from Exim India Corporation is a premium research-based ${product.types || 'export formulation'} developed to satisfy demanding global standards. Produced under strict quality control protocols in ${product.placeOfOrigin || 'India'}, it features verified ${product.purity || 'high purity'} and consistent performance across diverse processing conditions.`,
      p2: `Formulated specifically for ${product.applicationSummary || 'food, beverage, cosmetic, bakery, and industrial applications'}, it delivers superior chromatic strength, excellent heat and light resistance, and homogenous blending. Available in customized packaging formats (${product.packagingDetails || 'export-grade packaging'}) with prompt delivery within ${product.deliveryDetail || '15-20 days'} through JNPT Port, Mumbai.`,
    }
  }

  const desc = getProductDescriptions()

  return (
    <div className="mb-12 font-body">
      {/* ========================================================================= */}
      {/* 1. TOP SECTION: Product Image Card (Left) + Rich Description Card (Right) */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-10">
        
        {/* Left Column: Image Card, Order Now Button, Social Share */}
        <div className="lg:col-span-5 xl:col-span-4 text-center space-y-4">
          <div className="rounded-2xl border border-slate-200/90 p-4 bg-white shadow-xs hover:shadow-md transition-shadow">
            <img
              src={product.image}
              alt={`${product.name} product`}
              className="w-full aspect-square object-contain p-2 hover:scale-[1.02] transition-transform duration-300"
            />
          </div>

          {/* Order Now Button */}
          <button
            type="button"
            onClick={onOrderClick}
            className="w-full py-3 px-5 rounded-xl bg-[#0a3622] hover:bg-[#0f4d30] text-white font-bold font-heading text-sm shadow-md hover:shadow-lg transition-all active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Order Now / Request Quote</span>
            <span>&rarr;</span>
          </button>

          {/* Social Share Icons Row */}
          <div className="flex items-center justify-center gap-3 pt-1 text-slate-500 text-sm">
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
              href={`mailto:info@eximindiacorporation.com?cc=eximindiacorp@gmail.com&subject=${encodeURIComponent('Inquiry: ' + product.name)}`}
              title="Email: info@eximindiacorporation.com / eximindiacorp@gmail.com"
              className="w-8 h-8 rounded-full bg-slate-100 text-slate-700 hover:bg-slate-800 hover:text-white flex items-center justify-center transition-colors font-bold text-xs"
            >
              ✉
            </a>
          </div>

          {/* Quick Contact Helpline */}
          <div className="pt-1 text-[11px] text-slate-500">
            <span>Direct helpline: </span>
            <a href="tel:+917977523176" className="font-semibold text-slate-700 hover:text-[#0a3622]">+91 79775 23176</a>
            <span> / </span>
            <a href="tel:+919892364600" className="font-semibold text-slate-700 hover:text-[#0a3622]">+91 98923 64600</a>
          </div>
        </div>

        {/* Right Column: Title, Badges, Rich Narrative Paragraphs & Quick Highlights */}
        <div className="lg:col-span-7 xl:col-span-8 text-left space-y-4 sm:space-y-5">
          {/* Header row with badges */}
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2.5">
              <span className="px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-emerald-50 text-[#0a3622] border border-emerald-200">
                Export Certified Quality
              </span>
              {product.ciNo && (
                <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-rose-50 text-rose-800 border border-rose-200">
                  C.I. {product.ciNo}
                </span>
              )}
              {product.eNumber && (
                <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-50 text-amber-900 border border-amber-200">
                  {product.eNumber}
                </span>
              )}
              {product.grade && (
                <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                  {product.grade}
                </span>
              )}
            </div>

            {/* Product Title */}
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black font-heading text-slate-900 tracking-tight">
              {product.name}
            </h2>

            {/* Short Tagline / Origin */}
            <p className="mt-1.5 text-xs sm:text-sm font-semibold text-emerald-800 tracking-wide">
              {product.colorDesc || product.types || 'High-Purity Global Export Grade'} • {product.placeOfOrigin || 'Exim India Corporation, Mumbai'}
            </p>
          </div>

          {/* Decorative Divider */}
          <div className="w-16 h-0.5 bg-[#c59b27]" />

          {/* Product Paragraphs (Detailed Information) */}
          <div className="space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
            <p>{desc.p1}</p>
            <p>{desc.p2}</p>
          </div>

          {/* Quick Specifications Pills Matrix */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Purity</div>
              <div className="text-xs font-bold text-slate-800 mt-0.5 truncate" title={product.purity || '100% Pure'}>
                {product.purity || '100% Pure'}
              </div>
            </div>
            <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Shelf Life</div>
              <div className="text-xs font-bold text-slate-800 mt-0.5 truncate" title={product.shelfLife || '24 Months'}>
                {product.shelfLife || '24 Months'}
              </div>
            </div>
            <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Origin</div>
              <div className="text-xs font-bold text-slate-800 mt-0.5 truncate" title={product.placeOfOrigin || 'India'}>
                {product.placeOfOrigin ? product.placeOfOrigin.split('/')[0].split(',')[0].trim() : 'India'}
              </div>
            </div>
            <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Model / SKU</div>
              <div className="text-xs font-bold text-slate-800 mt-0.5 truncate" title={product.modelNumber || 'Standard Export'}>
                {product.modelNumber || 'Export Grade'}
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* 2. SPECIFICATION MATRIX TABLE: MOVED DOWN FULL-WIDTH WITH PROPER ALIGNMENT */}
      {/* ========================================================================= */}
      <div className="mt-8 pt-6 border-t border-slate-200">
        <div className="text-left mb-4 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-5 h-1 bg-[#0a3622] rounded-full inline-block" />
              <h3 className="text-lg sm:text-xl font-black font-heading text-slate-900 tracking-tight">
                Product Technical Specifications
              </h3>
            </div>
            <p className="text-xs text-slate-500 font-medium">
              Verified physical, chemical, packaging and analytical properties for international buyers
            </p>
          </div>
        </div>

        {/* Full-Width Table */}
        <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-xs bg-white">
          <table className="w-full text-left text-xs border-collapse">
            <tbody>
              {/* Row 1 */}
              <tr className="bg-[#dff0d8] border-b border-slate-200">
                <th className="p-3 font-bold text-slate-900 w-[14%]">CAS No.</th>
                <td className="p-3 text-center font-bold text-slate-600 w-[2%]">:</td>
                <td className="p-3 font-mono text-slate-800 w-[18%]">{product.casNo || 'N/A'}</td>
                <th className="p-3 font-bold text-slate-900 w-[14%]">Other Names</th>
                <td className="p-3 text-center font-bold text-slate-600 w-[2%]">:</td>
                <td className="p-3 text-slate-800 w-[20%]">{product.otherNames || product.fdcName || 'N/A'}</td>
                <th className="p-3 font-bold text-slate-900 w-[10%]">MF</th>
                <td className="p-3 text-center font-bold text-slate-600 w-[2%]">:</td>
                <td className="p-3 font-mono text-slate-800 w-[18%]">{product.mf || 'N/A'}</td>
              </tr>

              {/* Row 2 */}
              <tr className="bg-white border-b border-slate-200">
                <th className="p-3 font-bold text-slate-900">EINECS No.</th>
                <td className="p-3 text-center font-bold text-slate-600">:</td>
                <td className="p-3 font-bold text-slate-800">{product.einecsNo || product.eNumber || 'N/A'}</td>
                <th className="p-3 font-bold text-slate-900">FEMA No.</th>
                <td className="p-3 text-center font-bold text-slate-600">:</td>
                <td className="p-3 text-slate-800">{product.femaNo || 'N/A'}</td>
                <th className="p-3 font-bold text-slate-900">Place of Origin</th>
                <td className="p-3 text-center font-bold text-slate-600">:</td>
                <td className="p-3 text-slate-800">{product.placeOfOrigin}</td>
              </tr>

              {/* Row 3 */}
              <tr className="bg-[#d9edf7] border-b border-slate-200">
                <th className="p-3 font-bold text-slate-900">Types</th>
                <td className="p-3 text-center font-bold text-slate-600">:</td>
                <td className="p-3 text-slate-800 leading-tight">{product.types}</td>
                <th className="p-3 font-bold text-slate-900">Brand Name</th>
                <td className="p-3 text-center font-bold text-slate-600">:</td>
                <td className="p-3 font-semibold text-slate-800">{product.brandName}</td>
                <th className="p-3 font-bold text-slate-900">Modal Number</th>
                <td className="p-3 text-center font-bold text-slate-600">:</td>
                <td className="p-3 font-mono text-slate-800 font-bold">{product.modelNumber}</td>
              </tr>

              {/* Row 4 */}
              <tr className="bg-white border-b border-slate-200">
                <th className="p-3 font-bold text-slate-900">Grade</th>
                <td className="p-3 text-center font-bold text-slate-600">:</td>
                <td className="p-3 text-slate-800">{product.grade}</td>
                <th className="p-3 font-bold text-slate-900">Color</th>
                <td className="p-3 text-center font-bold text-slate-600">:</td>
                <td className="p-3 text-slate-800 font-medium">{product.colorDesc}</td>
                <th className="p-3 font-bold text-slate-900">Application</th>
                <td className="p-3 text-center font-bold text-slate-600">:</td>
                <td className="p-3 text-slate-800 leading-tight">{product.applicationSummary}</td>
              </tr>

              {/* Row 5 */}
              <tr className="bg-[#dff0d8] border-b border-slate-200">
                <th className="p-3 font-bold text-slate-900">Purity</th>
                <td className="p-3 text-center font-bold text-slate-600">:</td>
                <td className="p-3 font-bold text-emerald-800">{product.purity}</td>
                <th className="p-3 font-bold text-slate-900">Shelf Life</th>
                <td className="p-3 text-center font-bold text-slate-600">:</td>
                <td className="p-3 text-slate-800">{product.shelfLife}</td>
                <th className="p-3 font-bold text-slate-900">Packaging</th>
                <td className="p-3 text-center font-bold text-slate-600">:</td>
                <td className="p-3 text-slate-800">As per buyers requirements</td>
              </tr>

              {/* Header: Packaging & Delivery */}
              <tr className="bg-[#d9edf7] border-b border-slate-200">
                <th colSpan={9} className="p-2.5 text-center text-rose-700 font-bold text-xs uppercase tracking-wider">
                  Packaging &amp; Delivery
                </th>
              </tr>

              {/* Packaging Details */}
              <tr className="bg-white border-b border-slate-200">
                <th colSpan={3} className="p-3 font-bold text-slate-900">Packaging Details</th>
                <td className="p-3 text-center font-bold text-slate-600">:</td>
                <td colSpan={5} className="p-3 text-slate-800">
                  {product.packagingDetails}
                </td>
              </tr>

              {/* Delivery Detail */}
              <tr className="bg-white">
                <th colSpan={3} className="p-3 font-bold text-slate-900">Delivery Detail</th>
                <td className="p-3 text-center font-bold text-slate-600">:</td>
                <td colSpan={5} className="p-3 text-slate-800 font-semibold text-emerald-800">
                  {product.deliveryDetail}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
