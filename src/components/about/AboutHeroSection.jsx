import { Link } from 'react-router-dom'
import aboutHeroPort from '../../assets/about-hero.png'

export default function AboutHeroSection() {
  return (
    <section className="relative w-full overflow-hidden bg-slate-50 min-h-[380px] sm:min-h-[440px] lg:min-h-[500px] flex items-center">
      {/* Background Banner Image: 100% visible with zero overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src={aboutHeroPort}
          alt="Exim India Corporation - About Us"
          className="w-full h-full object-cover object-right"
        />
      </div>

      {/* Content Layer */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-28 sm:pt-32 pb-14 sm:pb-16">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8 sm:gap-12">

          {/* Left Column: Breadcrumb, Heading, Subtitle, Divider, Tagline */}
          <div className="max-w-xl text-left">
            {/* Breadcrumb Navigation */}
            <nav className="flex items-center gap-2 text-xs sm:text-sm text-slate-600 font-medium mb-3 sm:mb-4">
              <Link to="/" className="hover:text-[#0a3622] transition-colors">
                Home
              </Link>
              <span className="text-slate-400 text-xs">&gt;</span>
              <span className="text-[#0a3622] font-bold">About Us</span>
            </nav>

            {/* Heading in Master Font Style Outfit */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-heading font-black text-[#0f172a] tracking-tight leading-none mb-3 sm:mb-4">
              About Us
            </h1>

            {/* Subtitle Description in Master Font Style Plus Jakarta Sans */}
            <p className="text-sm sm:text-base text-slate-700 font-medium font-body leading-relaxed max-w-md">
              Building global connections through quality, trust and Indian excellence.
            </p>

            {/* Warm Brand Accent Divider */}
            <div className="w-12 h-1.5 bg-[#ea580c] mt-5 mb-4 rounded-full" />

            {/* Bottom Tagline in Master Font Style Outfit */}
            <div className="text-[11px] sm:text-xs font-black font-heading tracking-[0.25em] text-[#0a3622] uppercase">
              TRUST &nbsp;|&nbsp; TRADE &nbsp;|&nbsp; TOGETHER
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
