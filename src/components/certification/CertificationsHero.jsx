import { Link } from 'react-router-dom'
import certHeroImg from '../../assets/certifications-hero.jpg'

export default function CertificationsHero() {
  return (
    <section className="relative w-full overflow-hidden bg-[#03131e] min-h-[250px] sm:min-h-[280px] lg:min-h-[320px] flex items-center select-none font-body">
      {/* Background Laboratory Image with Soft Left Vignette */}
      <div className="absolute inset-0 z-0">
        <img
          src={certHeroImg}
          alt="Exim India Analytical Quality Assurance Laboratory"
          className="w-full h-full object-cover object-[center_35%] brightness-[0.92] contrast-[1.05]"
        />
        {/* Soft left-aligned shadow so text is crisp while the scientists & lab shine through */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#020b12]/85 via-[#020b12]/45 to-transparent" />
      </div>

      {/* Vector Content Layer */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-22 sm:pt-24 pb-7 sm:pb-8">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 sm:gap-10">
          
          {/* Left Column: Breadcrumb, Heading, Subtitle, Divider, Tagline */}
          <div className="max-w-xl text-left">
            {/* Breadcrumb Navigation */}
            <nav className="flex items-center gap-2 text-[11px] sm:text-xs text-slate-300 font-medium mb-1.5 sm:mb-2">
              <Link to="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <span className="text-slate-400 text-xs">&gt;</span>
              <span className="text-slate-200">Certifications</span>
            </nav>

            {/* Heading in Master Font Style Outfit */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black text-white tracking-tight leading-none mb-2 sm:mb-2.5 drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
              Certifications
            </h1>

            {/* Subtitle Description in Master Font Style Plus Jakarta Sans */}
            <p className="text-xs sm:text-sm text-slate-200 font-normal font-body leading-relaxed max-w-md drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]">
              Internationally recognized quality benchmarks, statutory export registrations, and laboratory compliance credentials.
            </p>

            {/* Warm Gold Accent Divider */}
            <div className="w-10 h-0.5 bg-[#c59b27] mt-3 mb-2 rounded-full" />

            {/* Bottom Tagline in Master Font Style Outfit */}
            <div className="text-[10px] sm:text-[11px] font-bold font-heading tracking-[0.22em] text-slate-300 uppercase drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)]">
              QUALITY &nbsp;|&nbsp; ACCREDITED &nbsp;|&nbsp; COMPLIANT
            </div>
          </div>

          {/* Right Column: Gold Line + Clean Stacked Editorial Typography */}
          <div className="text-left md:text-right self-start md:self-end">
            <div className="w-6 h-0.5 bg-[#c59b27] mb-2 md:ml-auto rounded-full" />
            <div className="text-[10px] sm:text-[11px] font-bold tracking-[0.22em] text-slate-200 uppercase leading-snug drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)] font-heading">
              <span>TESTED</span><br />
              <span>CERTIFIED</span><br />
              <span>GLOBAL</span><br />
              <span>QUALITY</span><br />
              <span>STANDARDS</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
