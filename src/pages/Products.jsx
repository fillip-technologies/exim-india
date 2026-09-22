import { Link } from 'react-router-dom'


export default function Products() {
  const items = [
    {
      category: 'Food Colors',
      description: 'Certified synthetic and natural food colorants, water-soluble dyes, and aluminum lakes.',
      badge: 'FSSAI, US-FDA & EU Compliant',
      items: ['Tartrazine Lake & Powder', 'Sunset Yellow FCF', 'Allura Red AC', 'Brilliant Blue FCF', 'Natural Chlorophyll & Annatto'],
    },
    {
      category: 'Flavours & Emulsions',
      description: 'Spray-dried encapsulated food flavours, liquid extracts, and beverage weighting emulsions.',
      badge: 'Bespoke Flavour Profiles',
      items: ['Mango & Tropical Fruit Emulsions', 'Vanilla Oleoresin', 'Chocolate & Toffee Aromas', 'Citrus Clouding Agents'],
    },
    {
      category: 'Fragrances & Aromas',
      description: 'Fine aromatic blends engineered for soaps, personal care, perfumes, and laundry detergents.',
      badge: 'IFRA Standard Compliant',
      items: ['Floral & Rose Otto Blends', 'Oud & Sandalwood Accords', 'Fresh Citrus & Aquatic Notes', 'Herbal Lavender Bases'],
    },
    {
      category: 'Essential Oils',
      description: '100% pure steam-distilled and cold-pressed Indian essential oils with GC-MS certificate of analysis.',
      badge: 'Therapeutic Grade',
      items: ['Lemongrass Oil (Cochin)', 'Peppermint Oil (Mentha Piperita)', 'Eucalyptus Globulus Oil', 'Ginger & Cardamom Oils'],
    },
    {
      category: 'Botanical Extracts',
      description: 'Standardized herbal extracts featuring active phytochemical concentrations for health and wellness.',
      badge: 'Standardized Bioactives',
      items: ['Curcumin 95% (Turmeric)', 'Ashwagandha Extract (5% Withanolides)', 'Boswellia Serrata Extract', 'Green Tea Polyphenols'],
    },
  ]

  return (
    <div className="pt-28 sm:pt-36 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-[#b45309] bg-amber-50 border border-amber-200 px-3.5 py-1 rounded-full">
              Export Catalog
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold font-heading text-slate-900 mt-4 tracking-tight">
              Our Ingredients &amp; Formulations
            </h1>
            <p className="text-sm sm:text-base text-slate-600 mt-3 max-w-2xl mx-auto leading-relaxed">
              Explore our laboratory-tested food colors, flavours, aromatic fragrances, essential oils, and botanical extracts delivered to 50+ countries.
            </p>
          </div>

          <div className="space-y-8">
            {items.map((prod) => (
              <div
                key={prod.category}
                className="rounded-3xl border border-slate-200 bg-slate-50/50 p-6 sm:p-8 hover:border-emerald-700/40 transition-all shadow-sm"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                  <div>
                    <h2 className="text-2xl font-bold font-heading text-slate-900">
                      {prod.category}
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1">
                      {prod.description}
                    </p>
                  </div>
                  <span className="self-start sm:self-auto text-xs font-semibold text-emerald-800 bg-emerald-100/70 border border-emerald-300 px-3 py-1 rounded-full">
                    {prod.badge}
                  </span>
                </div>

                <div className="pt-4 border-t border-slate-200">
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                    Popular Grades &amp; Formulations:
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {prod.items.map((item) => (
                      <span
                        key={item}
                        className="rounded-xl bg-white border border-slate-200 px-3 py-1.5 text-xs text-slate-700 font-medium"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                  {prod.category === 'Food Colors' ? (
                    <div className="flex flex-wrap items-center gap-2.5">
                      <Link
                        to="/products/synthetic-food-colours"
                        className="inline-flex items-center gap-1.5 text-xs font-extrabold text-emerald-800 hover:text-emerald-950 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200 transition-colors"
                      >
                        <span>Explore 15 Primary Synthetic Food Colours</span>
                        <span>&rarr;</span>
                      </Link>
                      <Link
                        to="/products/blended-colours"
                        className="inline-flex items-center gap-1.5 text-xs font-extrabold text-amber-800 hover:text-amber-950 bg-amber-50 px-3 py-1.5 rounded-lg border border-amber-200 transition-colors"
                      >
                        <span>Explore 19 Blended Colours</span>
                        <span>&rarr;</span>
                      </Link>
                      <Link
                        to="/products/lake-colours"
                        className="inline-flex items-center gap-1.5 text-xs font-extrabold text-sky-800 hover:text-sky-950 bg-sky-50 px-3 py-1.5 rounded-lg border border-sky-200 transition-colors"
                      >
                        <span>Explore 12 Lake Colours</span>
                        <span>&rarr;</span>
                      </Link>
                      <Link
                        to="/products/cosmetic-colours"
                        className="inline-flex items-center gap-1.5 text-xs font-extrabold text-purple-800 hover:text-purple-950 bg-purple-50 px-3 py-1.5 rounded-lg border border-purple-200 transition-colors"
                      >
                        <span>Explore 15 Cosmetic Colours</span>
                        <span>&rarr;</span>
                      </Link>
                    </div>
                  ) : prod.category === 'Flavours & Emulsions' ? (
                    <div className="flex flex-wrap items-center gap-2.5">
                      <Link
                        to="/products/liquid-flavours"
                        className="inline-flex items-center gap-1.5 text-xs font-extrabold text-emerald-800 hover:text-emerald-950 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200 transition-colors"
                      >
                        <span>Explore 20 Liquid Flavours &amp; Enhancers</span>
                        <span>&rarr;</span>
                      </Link>
                    </div>
                  ) : <div />}
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0a3622] hover:text-[#0f4d30]"
                  >
                    <span>Request Technical Specification &amp; Sample</span>
                    <span>&rarr;</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
    </div>
  )
}
