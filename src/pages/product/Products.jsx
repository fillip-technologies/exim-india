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
    {
      category: 'Food Additives',
      description: 'High-purity food grade acidulants, emulsifiers, gelling agents, texturizers, and botanical ingredients.',
      badge: 'FSSAI, FCC & USP Grade',
      items: ['Citric Acid (Anhydrous/Mono)', 'Soya Lecithin (Fluid & Powder)', 'Edible Gelatin Bloom 160-260', 'Cornstarch', 'Sucrose Pharma Grade', 'Pure Natural Saffron'],
    },
    {
      category: 'Mango Pulp & Purees',
      description: '100% natural, hand-picked Indian mango pulps processed under sterile aseptic conditions for global export.',
      badge: 'Aseptic Sterile & Canned',
      items: ['Alphonso Mango Pulp (24° Brix)', 'Totapuri Mango Puree (14° Brix)', 'Kesar Mango Pulp (16-18° Brix)', 'Bulk 215 Kg Drums & A10 Cans'],
    },
    {
      category: 'Chemicals & Intermediates',
      description: 'Comprehensive portfolio of 120+ high-purity industrial, food, pharmaceutical, and veterinary chemical compounds.',
      badge: 'ISO & WHO-GMP Compliant',
      items: ['Acetic Acid Glacial 99.85%', 'Propylene Glycol USP', 'Sodium Benzoate FCC', 'Dextrose Anhydrous', 'Sorbitol 70%', 'Industrial Solvents'],
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
                      <Link
                        to="/products/pharmaceutical-colours"
                        className="inline-flex items-center gap-1.5 text-xs font-extrabold text-teal-800 hover:text-teal-950 bg-teal-50 px-3 py-1.5 rounded-lg border border-teal-200 transition-colors"
                      >
                        <span>Explore 16 Pharmaceutical Colours (IP/USP)</span>
                        <span>&rarr;</span>
                      </Link>
                      <Link
                        to="/products/disco-dust-powder"
                        className="inline-flex items-center gap-1.5 text-xs font-extrabold text-pink-800 hover:text-pink-950 bg-pink-50 px-3 py-1.5 rounded-lg border border-pink-200 transition-colors"
                      >
                        <span>Explore 10 Disco Dust Powders &amp; 50+ Custom Shades</span>
                        <span>&rarr;</span>
                      </Link>
                      <Link
                        to="/products/titanium-dioxide"
                        className="inline-flex items-center gap-1.5 text-xs font-extrabold text-slate-800 hover:text-slate-950 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg border border-slate-300 transition-colors"
                      >
                        <span>Explore Titanium Dioxide (Rutile, Anatase &amp; Pharma)</span>
                        <span>&rarr;</span>
                      </Link>
                      <Link
                        to="/products/natural-food-colors"
                        className="inline-flex items-center gap-1.5 text-xs font-extrabold text-lime-900 hover:text-lime-950 bg-lime-50 hover:bg-lime-100 px-3 py-1.5 rounded-lg border border-lime-300 transition-colors"
                      >
                        <span>Explore 13 Certified Natural Food Colors</span>
                        <span>&rarr;</span>
                      </Link>
                      <Link
                        to="/products/pearl-pigment-powder"
                        className="inline-flex items-center gap-1.5 text-xs font-extrabold text-amber-900 hover:text-amber-950 bg-amber-50/80 hover:bg-amber-100 px-3 py-1.5 rounded-lg border border-amber-300 transition-colors"
                      >
                        <span>Explore 6 Pearl Pigments (Food &amp; Cosmetic Mica)</span>
                        <span>&rarr;</span>
                      </Link>
                      <Link
                        to="/products/edible-lustre"
                        className="inline-flex items-center gap-1.5 text-xs font-extrabold text-yellow-900 hover:text-yellow-950 bg-yellow-50/80 hover:bg-yellow-100 px-3 py-1.5 rounded-lg border border-yellow-300 transition-colors"
                      >
                        <span>Explore 10 Edible Lustre Dusts (Confectionery Shimmer)</span>
                        <span>&rarr;</span>
                      </Link>
                      <Link
                        to="/products/fluorescent-colours"
                        className="inline-flex items-center gap-1.5 text-xs font-extrabold text-fuchsia-900 hover:text-fuchsia-950 bg-fuchsia-50/80 hover:bg-fuchsia-100 px-3 py-1.5 rounded-lg border border-fuchsia-300 transition-colors"
                      >
                        <span>Explore 7 Fluorescent Colours (Neon High-Visibility)</span>
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
                      <Link
                        to="/products/emulsion-flavours"
                        className="inline-flex items-center gap-1.5 text-xs font-extrabold text-orange-800 hover:text-orange-950 bg-orange-50 px-3 py-1.5 rounded-lg border border-orange-200 transition-colors"
                      >
                        <span>Explore 19 Emulsion Flavours &amp; Clouding Bases</span>
                        <span>&rarr;</span>
                      </Link>
                      <Link
                        to="/products/powder-flavours"
                        className="inline-flex items-center gap-1.5 text-xs font-extrabold text-amber-800 hover:text-amber-950 bg-amber-50 px-3 py-1.5 rounded-lg border border-amber-200 transition-colors"
                      >
                        <span>Explore 13 Powder Flavours (Encapsulated)</span>
                        <span>&rarr;</span>
                      </Link>
                      <Link
                        to="/products/natural-fruit-powder"
                        className="inline-flex items-center gap-1.5 text-xs font-extrabold text-rose-800 hover:text-rose-950 bg-rose-50 px-3 py-1.5 rounded-lg border border-rose-200 transition-colors"
                      >
                        <span>Explore 19 Natural Fruit Powders (Spray Dried)</span>
                        <span>&rarr;</span>
                      </Link>
                    </div>
                  ) : prod.category === 'Fragrances & Aromas' ? (
                    <div className="flex flex-wrap items-center gap-2.5">
                      <Link
                        to="/products/fruit-fragrance"
                        className="inline-flex items-center gap-1.5 text-xs font-extrabold text-violet-800 hover:text-violet-950 bg-violet-50 px-3 py-1.5 rounded-lg border border-violet-200 transition-colors"
                      >
                        <span>Explore 13 Premium Fruit Fragrances (IFRA Certified)</span>
                        <span>&rarr;</span>
                      </Link>
                    </div>
                  ) : prod.category === 'Food Additives' ? (
                    <div className="flex flex-wrap items-center gap-2.5">
                      <Link
                        to="/products/food-additives"
                        className="inline-flex items-center gap-1.5 text-xs font-extrabold text-blue-800 hover:text-blue-950 bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-200 transition-colors"
                      >
                        <span>Explore 7 Essential Food Additives &amp; Extended Portfolio</span>
                        <span>&rarr;</span>
                      </Link>
                    </div>
                  ) : prod.category === 'Mango Pulp & Purees' ? (
                    <div className="flex flex-wrap items-center gap-2.5">
                      <Link
                        to="/products/mango-pulp"
                        className="inline-flex items-center gap-1.5 text-xs font-extrabold text-amber-800 hover:text-amber-950 bg-amber-50 px-3 py-1.5 rounded-lg border border-amber-200 transition-colors"
                      >
                        <span>Explore 3 Authentic Indian Mango Pulps</span>
                        <span>&rarr;</span>
                      </Link>
                    </div>
                  ) : prod.category === 'Chemicals & Intermediates' ? (
                    <div className="flex flex-wrap items-center gap-2.5">
                      <Link
                        to="/products/chemicals"
                        className="inline-flex items-center gap-1.5 text-xs font-extrabold text-cyan-800 hover:text-cyan-950 bg-cyan-50 px-3 py-1.5 rounded-lg border border-cyan-200 transition-colors"
                      >
                        <span>Explore Chemicals Directory &amp; 120+ Master Index</span>
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
