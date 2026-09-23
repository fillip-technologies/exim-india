import { Link } from 'react-router-dom'
import footerBg from '../../assets/footer-bg.jpg'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const productCategories = [
    {
      left: { name: 'Synthetic food colours', path: '/products/synthetic-food-colours' },
      right: { name: 'Food additives', path: '/products/food-additives' },
    },
    {
      left: { name: 'Lake colours', path: '/products/lake-colours' },
      right: { name: 'Botanical Extracts', path: '/products/botanical-extracts' },
    },
    {
      left: { name: 'Blended Colours', path: '/products/blended-colours' },
      right: { name: 'Natural Food Colours', path: '/products/natural-food-colors' },
    },
    {
      left: { name: 'Cosmetic Colours', path: '/products/cosmetic-colours' },
      right: { name: 'Mango Pulp', path: '/products/mango-pulp' },
    },
    {
      left: { name: 'Liquid Flavours', path: '/products/liquid-flavours' },
      right: { name: 'Titanium Dioxide', path: '/products/titanium-dioxide' },
    },
    {
      left: { name: 'Emulsion Flavours', path: '/products/emulsion-flavours' },
      right: { name: 'Essential Oils', path: '/products/essential-oils' },
    },
    {
      left: { name: 'Powder Flavours', path: '/products/powder-flavours' },
      right: { name: 'Edible Lustre', path: '/products/edible-lustre' },
    },
    {
      left: { name: 'Fruit Fragrance', path: '/products/fruit-fragrance' },
      right: { name: 'Disco Dust Powder', path: '/products/disco-dust-powder' },
    },
  ]

  return (
    <footer className="relative bg-gradient-to-br from-[#072417] via-[#0a3622] to-[#062014] text-white text-xs overflow-hidden">
      {/* Subtle Tech Grid Pattern matching AboutSection */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.06] bg-repeat bg-center"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)`,
          backgroundSize: '28px 28px',
        }}
      />

      {/* Atmospheric Ambient Glow Orbs */}
      <div className="pointer-events-none absolute -top-24 left-1/4 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-10 w-80 h-80 bg-amber-400/10 rounded-full blur-3xl" />

      {/* Background Logistics Port Image with AboutSection Brand Shading */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none">
        <img
          src={footerBg}
          alt="Exim Global Logistics and Shipping Port"
          className="w-full h-full object-cover object-right sm:object-center opacity-20 filter contrast-120 saturate-110 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#072417]/95 via-[#0a3622]/85 to-[#062014]/80" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-10 sm:pt-14 pb-8">
        {/* 3 Main Columns: Head Office, Warehouses, Product Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 pb-10 border-b border-white/15">
          
          {/* Column 1: Head Office (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-4">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-amber-400 font-heading tracking-wide">
                Head Office
              </h3>
              <div className="w-full h-[1px] bg-white/20 mt-2 mb-4" />
            </div>

            {/* Address */}
            <div className="flex items-start gap-3 text-slate-200 leading-relaxed text-xs">
              <svg className="w-5 h-5 text-white shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <p>
                San Mamede Cottage, Flat No.1, 1st Floor,<br />
                Cross Road No. 4, I. C. Colony, Borivali West,<br />
                Mumbai, Maharashtra-400103
              </p>
            </div>

            {/* Phone & WhatsApp */}
            <div className="pt-2 space-y-2">
              <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-200">
                {/* WhatsApp */}
                <a
                  href="https://wa.me/919892700271"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 hover:text-emerald-300 transition-colors"
                >
                  <svg className="w-5 h-5 text-emerald-400 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                  </svg>
                  <span>+91-9892700271</span>
                </a>

                {/* Phone Handset */}
                <a
                  href="tel:+917977523176"
                  className="inline-flex items-center gap-2 hover:text-emerald-300 transition-colors"
                >
                  <svg className="w-4 h-4 text-emerald-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>+91-7977523176</span>
                </a>
              </div>
            </div>

            {/* Email Addresses */}
            <div className="pt-2 flex items-start gap-3 text-xs">
              <svg className="w-5 h-5 text-white shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <div className="space-y-1">
                <div>
                  <a href="mailto:eximindiacorp@gmail.com" className="text-slate-200 hover:text-amber-300 transition-colors">
                    eximindiacorp@gmail.com
                  </a>
                </div>
                <div>
                  <a href="mailto:info@eximindiacorporation.com" className="text-slate-200 hover:text-amber-300 transition-colors">
                    info@eximindiacorporation.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Column 2: Warehouses (lg:col-span-4) */}
          <div className="lg:col-span-4 space-y-4">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-amber-400 font-heading tracking-wide">
                Warehouses
              </h3>
              <div className="w-full h-[1px] bg-white/20 mt-2 mb-4" />
            </div>

            {/* Warehouse 1 */}
            <div className="flex items-start gap-3 text-slate-200 leading-relaxed text-xs">
              <svg className="w-5 h-5 text-white shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <p>
                Pooja Complex, Opposite Bhadra Petrol Pump,<br />
                Near Apollo Road-lines, Rahnal Village,<br />
                Bhiwandi.
              </p>
            </div>

            {/* Warehouse 2 */}
            <div className="flex items-start gap-3 text-slate-200 leading-relaxed text-xs pt-1">
              <svg className="w-5 h-5 text-white shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <p>
                Andhra Bombay Carriers, Sativali Road, Vasai East, Thane.
              </p>
            </div>

          </div>

          {/* Column 3: Product Categories (lg:col-span-5) */}
          <div className="lg:col-span-5 space-y-4">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-amber-400 font-heading tracking-wide">
                Product Categories
              </h3>
              <div className="w-full h-[1px] bg-white/20 mt-2 mb-4" />
            </div>

            {/* 2-Column Subgrid with Rows and Dashed Dividers */}
            <div className="space-y-1.5 text-xs">
              {productCategories.map((item, idx) => (
                <div
                  key={idx}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 pb-1.5 border-b border-white/10 border-dashed"
                >
                  {/* Left Column Item */}
                  <Link
                    to={item.left.path}
                    className="flex items-center gap-2 text-slate-200 hover:text-amber-300 transition-colors group"
                  >
                    <span className="w-4 h-4 rounded-full border border-amber-400/80 flex items-center justify-center text-amber-400 text-[9px] font-black shrink-0 group-hover:bg-amber-400 group-hover:text-slate-900 transition-colors">
                      &rsaquo;
                    </span>
                    <span className="truncate">{item.left.name}</span>
                  </Link>

                  {/* Right Column Item */}
                  <Link
                    to={item.right.path}
                    className="flex items-center gap-2 text-slate-200 hover:text-amber-300 transition-colors group"
                  >
                    <span className="w-4 h-4 rounded-full border border-amber-400/80 flex items-center justify-center text-amber-400 text-[9px] font-black shrink-0 group-hover:bg-amber-400 group-hover:text-slate-900 transition-colors">
                      &rsaquo;
                    </span>
                    <span className="truncate">{item.right.name}</span>
                  </Link>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-400 text-xs">
          <div>
            &copy; {currentYear} Exim India Corporation. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <Link to="/privacy" className="hover:text-emerald-300 transition-colors">
              Privacy Policy
            </Link>
            <span>&bull;</span>
            <Link to="/terms" className="hover:text-emerald-300 transition-colors">
              Terms of Export
            </Link>
            <span>&bull;</span>
            <Link to="/quality" className="hover:text-emerald-300 transition-colors">
              Quality Assurance
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
