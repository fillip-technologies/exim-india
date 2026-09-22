import { Link } from 'react-router-dom'
import aboutHeroPort from '../../assets/about-hero-port.jpg'

export default function AboutHeroSection() {
  return (
    <section className="relative w-full overflow-hidden bg-[#03131e] min-h-[380px] sm:min-h-[440px] lg:min-h-[500px] flex items-center select-none">
      {/* Single Background Image: about-hero-port.jpg only */}
      <div className="absolute inset-0 z-0">
        <img
          src={aboutHeroPort}
          alt="Exim India Maritime Trade Logistics"
          className="w-full h-full object-cover object-right"
        />
      </div>

      {/* Vector Content Layer */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-28 sm:pt-32 pb-14 sm:pb-16">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8 sm:gap-12">
          
          {/* Left Column: Breadcrumb, Serif Title, Subtitle, Divider, Tagline */}
          <div className="max-w-xl text-left">
            {/* Breadcrumb Navigation */}
            <nav className="flex items-center gap-2 text-xs sm:text-sm text-slate-300 font-medium mb-3 sm:mb-4">
              <Link to="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <span className="text-slate-400 text-xs">&gt;</span>
              <span className="text-slate-200">About Us</span>
            </nav>

            {/* Heading in Master Font Style Outfit */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-heading font-black text-white tracking-tight leading-none mb-3 sm:mb-4 drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
              About Us
            </h1>

            {/* Subtitle Description in Master Font Style Plus Jakarta Sans */}
            <p className="text-sm sm:text-base text-slate-200 font-normal font-body leading-relaxed max-w-md drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]">
              Building global connections through quality, trust and Indian excellence.
            </p>

            {/* Warm Gold Accent Divider */}
            <div className="w-12 h-1 bg-[#c59b27] mt-5 mb-4 rounded-full" />

            {/* Bottom Tagline in Master Font Style Outfit */}
            <div className="text-[11px] sm:text-xs font-bold font-heading tracking-[0.25em] text-slate-300 uppercase drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)]">
              TRUST &nbsp;|&nbsp; TRADE &nbsp;|&nbsp; TOGETHER
            </div>
          </div>

          {/* Right Column: Gold Line + "FROM INDIA TO A BRIGHTER WORLD" */}
          <div className="text-left md:text-right self-start md:self-end">
            <div className="w-8 h-1 bg-[#c59b27] mb-3 md:ml-auto rounded-full" />
            <div className="text-[11px] sm:text-xs font-bold tracking-[0.22em] text-slate-200 uppercase leading-snug drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)]">
              <span>FROM</span><br />
              <span>INDIA</span><br />
              <span>TO A</span><br />
              <span>BRIGHTER</span><br />
              <span>WORLD</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
