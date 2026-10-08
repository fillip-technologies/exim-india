import { Link } from 'react-router-dom'
import ProductHero from '../../components/product/ProductHero'


export default function Products() {
  const items = [
    {
      category: 'Bakery Colors',
      description: 'Specialized high-performance food colorants engineered specifically for baking, pastry arts, and commercial confectionery. Heat-stable up to 220°C with zero fade.',
      badge: 'Heat-Stable to 220°C • Non-Bleeding',
      items: ['Heat-Resistant Sponge Dyes', 'Bake-Stable Gel Colours', 'Oil-Candy Bakery Pigments', 'Macaron Concentrates', 'Fondant & Sugarcraft Pastes'],
    },
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
      category: 'Bakery Decorations & Lustre',
      description: 'Artistic food-grade lustre dusts, sparkling disco powders, non-pareils, and premium sugar pearls.',
      badge: '100% Edible & Halal/Kosher',
      items: ['Edible Gold & Silver Lustre Dust', 'Disco Dust Powder (Sparkle Colors)', 'Silver Dragees & Sugar Balls', 'Confectionery Vermicelli'],
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
      category: 'Chemicals & Intermediates',
      description: 'Comprehensive portfolio of 120+ high-purity industrial, food, pharmaceutical, and veterinary chemical compounds.',
      badge: 'ISO & WHO-GMP Compliant',
      items: ['Acetic Acid Glacial 99.85%', 'Propylene Glycol USP', 'Sodium Benzoate FCC', 'Dextrose Anhydrous', 'Sorbitol 70%', 'Industrial Solvents'],
    },
  ]

  return (
    <div className="bg-white min-h-screen text-slate-900 pb-16">
      {/* Product Hero Banner with product-hero.png */}
      <ProductHero
        title="Our Ingredients & Formulations"
        subtitle="Explore our laboratory-tested food colors, flavours, bakery decorations, botanical extracts, and chemicals delivered to 50+ countries worldwide."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
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
                  {prod.category === 'Bakery Colors' ? (
                    <div className="flex flex-wrap items-center gap-2.5">
                      <Link
                        to="/products/bakery-colors"
                        className="inline-flex items-center gap-1.5 text-xs font-extrabold text-amber-900 hover:text-amber-950 bg-amber-50 hover:bg-amber-100 px-3.5 py-1.5 rounded-lg border border-amber-300 transition-colors shadow-xs"
                      >
                        <span>Explore Bakery Colors Collection (Bake-Stable Formulations)</span>
                        <span>&rarr;</span>
                      </Link>
                    </div>
                  ) : prod.category === 'Food Colors' ? (
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
                  ) : prod.category === 'Bakery Decorations & Lustre' ? (
                    <div className="flex flex-wrap items-center gap-2.5">
                      <Link
                        to="/products/edible-lustre"
                        className="inline-flex items-center gap-1.5 text-xs font-extrabold text-amber-800 hover:text-amber-950 bg-amber-50 px-3 py-1.5 rounded-lg border border-amber-200 transition-colors"
                      >
                        <span>Explore Edible Lustre Dusts</span>
                        <span>&rarr;</span>
                      </Link>
                      <Link
                        to="/products/disco-dust-powder"
                        className="inline-flex items-center gap-1.5 text-xs font-extrabold text-purple-800 hover:text-purple-950 bg-purple-50 px-3 py-1.5 rounded-lg border border-purple-200 transition-colors"
                      >
                        <span>Explore Disco Dust Powders</span>
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
