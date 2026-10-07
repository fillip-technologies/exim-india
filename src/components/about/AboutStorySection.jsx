import { Link } from 'react-router-dom'
import buildingImg from '../../assets/exim-building.jpg'

export default function AboutStorySection() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white relative font-body">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Left Column: Heading, Narrative, "Our Journey" CTA */}
          <div className="lg:col-span-7 text-left">
            {/* Overline with Gold Accent Bar */}
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-0.5 bg-[#c59b27]" />
              <span className="text-xs font-black uppercase tracking-widest text-[#0a3622] font-heading">
                OUR STORY
              </span>
            </div>

            {/* Main Heading with Master Font Style Outfit */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading text-slate-900 tracking-tight leading-[1.15]">
              <span>Connecting India</span>
              <br />
              <span>to </span>
              <span className="bg-gradient-to-r from-[#b45309] via-[#c2410c] to-[#d97706] bg-clip-text text-transparent font-heading">
                Global Opportunities
              </span>
            </h2>

            {/* Narrative Body text with User's Exact Company Story */}
            <div className="mt-6 space-y-4 text-sm sm:text-base text-slate-600 leading-relaxed font-normal font-body">
              <p className="text-base sm:text-lg text-slate-800 font-semibold leading-relaxed border-l-4 border-[#0a3622] pl-4 bg-emerald-50/60 py-2.5 rounded-r-xl">
                Welcome to EXIM India Corporation, where the art of bakery decoration comes to life! Established in the year 2011, we have emerged as an eminent exporter of food colours, flavours and bakery decorations.
              </p>
              <p>
                We are blessed with an adept team of professionals, who are experienced and trained in their respective field of specialisation, thereby providing complete business solutions in importing Indian products. We understand that every celebration is unique, and that’s why we offer a wide range of customisation options.
              </p>
              <p>
                We also have a commodious warehouse unit for safe and systematic storage of our products. Over the years we have expanded and diversified our Product Portfolio by investing in technology, people and product innovations.
              </p>
              <p>
                Assuring quality products and expeditious delivery is our top priority and we take utmost care right from handling, storage, transportation & delivery.
              </p>
              <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/80 text-slate-900 font-semibold text-sm sm:text-base flex items-start gap-3 shadow-xs">
                <span className="text-xl shrink-0">✨</span>
                <p>
                  We have the best minds at work, tell us your challenges and we assure to meet your expectations.
                </p>
              </div>
            </div>

            {/* "Our Journey" Pill CTA Button */}
            <div className="mt-8 pt-2">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-[#0a3622] hover:bg-[#0f4d30] text-white px-7 py-3 text-sm font-semibold font-heading shadow-md hover:shadow-lg transition-all active:scale-95"
              >
                <span>Partner With Us</span>
                <span>&rarr;</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Clean Corporate Building Image */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-4">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-slate-900/10 border border-slate-200/80 group">
              <img
                src={buildingImg}
                alt="EXIM India Corporate Headquarters & Global Trade Facility"
                className="w-full h-auto object-cover object-center group-hover:scale-102 transition-transform duration-700 block"
              />
            </div>
            {/* Quick Credential Highlights */}
            <div className="p-4 rounded-2xl bg-slate-900 text-white flex items-center justify-between shadow-lg">
              <div>
                <p className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">Established</p>
                <p className="text-xl font-bold font-heading text-amber-400">2011</p>
              </div>
              <div className="h-8 w-px bg-slate-700" />
              <div>
                <p className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">Global Reach</p>
                <p className="text-xl font-bold font-heading text-emerald-400">50+ Nations</p>
              </div>
              <div className="h-8 w-px bg-slate-700" />
              <div>
                <p className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">Warehouse</p>
                <p className="text-xl font-bold font-heading text-sky-400">Safe & Systematic</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
