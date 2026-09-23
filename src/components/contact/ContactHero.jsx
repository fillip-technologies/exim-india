import { Link } from 'react-router-dom'
import heroImg from '../../assets/about-hero-port.jpg'

export default function ContactHero() {
  return (
    <section className="relative w-full overflow-hidden bg-[#03131e] min-h-[380px] sm:min-h-[440px] lg:min-h-[480px] flex items-center select-none">
      {/* Background Image with High Visibility */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImg}
          alt="Exim India Global Trade"
          className="w-full h-full object-cover object-right sm:object-center brightness-[0.88] contrast-[1.05]"
        />
        {/* Soft left-aligned shadow so text is crisp while the rest of the image shines through */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#020b12]/80 via-[#020b12]/45 to-transparent" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-28 sm:pt-32 pb-14 sm:pb-16">
        <div className="max-w-2xl text-left">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs sm:text-sm text-slate-300 font-medium mb-3 sm:mb-4">
            <Link to="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span className="text-slate-400 text-xs">&gt;</span>
            <span className="text-slate-200">Contact Us</span>
          </nav>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-black text-white tracking-tight leading-none mb-3 sm:mb-4 drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
            Contact Us
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-slate-200 font-normal font-body leading-relaxed max-w-lg drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]">
            Connect directly with our export team for price quotations, sample requests, technical dossiers, and global trade inquiries.
          </p>

          {/* Warm Gold Accent Divider */}
          <div className="w-12 h-1 bg-[#c59b27] mt-5 mb-4 rounded-full" />

          {/* Bottom Tagline */}
          <div className="text-[11px] sm:text-xs font-bold font-heading tracking-[0.25em] text-slate-300 uppercase drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)]">
            CONNECT &nbsp;|&nbsp; TRADE &nbsp;|&nbsp; GROW
          </div>
        </div>
      </div>
    </section>
  )
}
