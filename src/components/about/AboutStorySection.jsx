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
              <p>
                <strong className="text-slate-900 font-semibold">EXIM INDIA CORPORATION</strong> is a leading professionally managed Export House based in Mumbai, the financial capital of India, economically the most emerging Country in the world today.
              </p>
              <p>
                EXIM INDIA CORPORATION Welcomes you to the world of Food Colors, Flavours, Emulsions, Fragrances, Essential Oils, Botanical extracts and many more related products.
              </p>
              <p>
                The One and only research based export house, Exim India Corporation, is managed by a team of highly qualified professionals in the field of Export and Import. This is indeed a unique concept and perhaps is so much relevant in today’s vast global competitive market. Our team, highly qualified professionals in this field are always at your disposal to help you in your Import and Export business, thereby providing complete business solutions in importing Indian products.
              </p>
              <p>
                This unique concept in export has made our eight years most successful journey a memorable one and certainly made Exim India Corporation a most respected export house in India. Thanks to all our customers all over the world for believing and showing confidence on us.
              </p>
              <p>
                We are one of the market leaders in exporting our high standard products across the countries. The USP of Exim India Corporation is to make sure that all our clients get the best out of our expert marketing and research teams who always work in tandem to understand the need of our customers.
              </p>
              <p>
                Exim India Corporation is an exporter of full bouquet of above mentioned products throughout the World. All our research based incredible products have been highly accepted and appreciated by our clients across the countries. Given a chance we will be happy to associate with your esteemed organisation for a long standing, trustful and credible business relationship.
              </p>
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
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-slate-900/10 border border-slate-200/80 group">
              <img
                src={buildingImg}
                alt="EXIM India Corporate Headquarters & Global Trade Facility"
                className="w-full h-auto object-cover object-center group-hover:scale-102 transition-transform duration-700 block"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
