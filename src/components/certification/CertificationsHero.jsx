import { Link } from 'react-router-dom'
import certHeroImg from '../../assets/certifications-hero.jpg'

export default function CertificationsHero() {
  return (
    <section className="relative w-full overflow-hidden bg-[#03131e] min-h-[170px] sm:min-h-[200px] lg:min-h-[220px] flex items-center font-body">
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
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-20 sm:pt-24 pb-6 sm:pb-8">
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
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black text-white tracking-tight leading-none drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
            Certifications
          </h1>
        </div>
      </div>
    </section>
  )
}
