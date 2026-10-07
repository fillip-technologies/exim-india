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
      right: { name: 'Chemicals', path: '/products/chemicals' },
    },
    {
      left: { name: 'Liquid Flavours', path: '/products/liquid-flavours' },
      right: { name: 'Titanium Dioxide', path: '/products/titanium-dioxide' },
    },
    {
      left: { name: 'Emulsion Flavours', path: '/products/emulsion-flavours' },
      right: { name: 'Pearl Pigment Powder', path: '/products/pearl-pigment-powder' },
    },
    {
      left: { name: 'Powder Flavours', path: '/products/powder-flavours' },
      right: { name: 'Edible Lustre', path: '/products/edible-lustre' },
    },
    {
      left: { name: 'Fluorescent Colours', path: '/products/fluorescent-colours' },
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

            {/* Phone Numbers */}
            <div className="pt-2 space-y-2">
              <div className="flex flex-col gap-2 text-xs font-semibold text-slate-200">
                <a
                  href="tel:+917977523176"
                  className="inline-flex items-center gap-2 hover:text-emerald-300 transition-colors"
                >
                  <svg className="w-4 h-4 text-emerald-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>+91-7977523176</span>
                </a>

                <a
                  href="tel:+919892364600"
                  className="inline-flex items-center gap-2 hover:text-emerald-300 transition-colors"
                >
                  <svg className="w-4 h-4 text-emerald-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>+91-9892364600</span>
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
                  <a href="mailto:info@eximindiacorporation.com" className="text-slate-200 hover:text-amber-300 transition-colors">
                    info@eximindiacorporation.com
                  </a>
                </div>
                <div>
                  <a href="mailto:eximindiacorp@gmail.com" className="text-slate-200 hover:text-amber-300 transition-colors">
                    eximindiacorp@gmail.com
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
            <span>&bull;</span>
            <Link to="/login" className="text-slate-400 hover:text-emerald-400 transition-colors flex items-center gap-1">
              <span>Portal Sign In</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
