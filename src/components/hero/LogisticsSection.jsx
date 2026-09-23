import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function LogisticsSection() {
  const [activeTab, setActiveTab] = useState(0)

  const solutions = [
    {
      title: 'Warehouse Storage',
      description:
        'Dedicated climate-controlled warehousing in Mumbai safeguarding food colours, liquid flavours, and extract potency.',
      icon: (
        <svg className="w-5 h-5 text-[#0a3622] group-hover:text-emerald-700 transition-colors stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth={1.8}>
          <circle cx="12" cy="12" r="9" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.6 9h16.8M3.6 15h16.8" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3a14 14 0 014 9 14 14 0 01-4 9 14 14 0 01-4-9 14 14 0 014-9z" />
          <circle cx="17.5" cy="6.5" r="2" className="fill-emerald-600 stroke-none" />
        </svg>
      ),
    },
    {
      title: 'Real Time Tracking',
      description:
        'Complete visibility across ocean freight and air cargo with automated status updates and 24/7 consignment tracking.',
      icon: (
        <svg className="w-5 h-5 text-[#0a3622] group-hover:text-emerald-700 transition-colors stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M1 3h15v13H1z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M16 8h4l3 3v5h-7V8z" />
          <circle cx="5.5" cy="18.5" r="2.5" />
          <circle cx="18.5" cy="18.5" r="2.5" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l2 2 4-4" />
        </svg>
      ),
    },
    {
      title: 'Distribution Centers',
      description:
        'Strategic multimodal hubs connecting Mumbai seaport and international air cargo terminals to 50+ destination countries.',
      icon: (
        <svg className="w-5 h-5 text-[#0a3622] group-hover:text-emerald-700 transition-colors stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21s-7-5.5-7-11.5A7 7 0 0119 9.5c0 6-7 11.5-7 11.5z" />
          <circle cx="12" cy="9.5" r="3" />
        </svg>
      ),
    },
    {
      title: 'Bonded Warehousing',
      description:
        'Comprehensive customs clearance, bonded storage, and full regulatory documentation including COA, FDA, and Halal.',
      icon: (
        <svg className="w-5 h-5 text-[#0a3622] group-hover:text-emerald-700 transition-colors stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 12v3l2 1" />
        </svg>
      ),
    },
  ]

  return (
    <section className="py-8 sm:py-10 lg:py-12 bg-slate-50/80 border-t border-slate-200/80 relative overflow-hidden text-slate-900">
      {/* Decorative Elegant Wave Vector Lines in Top-Right Corner */}
      <div className="absolute top-0 right-0 w-64 sm:w-80 lg:w-96 h-36 pointer-events-none opacity-40 overflow-hidden">
        <svg
          viewBox="0 0 400 150"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full text-slate-400"
        >
          <path
            d="M0 60 C80 10, 160 120, 240 40 C320 -40, 360 80, 400 50"
            stroke="currentColor"
            strokeWidth="1.2"
          />
          <path
            d="M0 80 C80 30, 160 140, 240 60 C320 -20, 360 100, 400 70"
            stroke="currentColor"
            strokeWidth="1.2"
          />
          <path
            d="M0 100 C80 50, 160 160, 240 80 C320 0, 360 120, 400 90"
            stroke="currentColor"
            strokeWidth="1.2"
          />
          <path
            d="M0 120 C80 70, 160 180, 240 100 C320 20, 360 140, 400 110"
            stroke="currentColor"
            strokeWidth="1.2"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header with Overline, Headline and Top-Right Pagination Pill */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 sm:mb-8">
          <div className="text-left max-w-2xl">
            {/* Overline with Accent */}
            <div className="flex items-center gap-2 mb-2">
              <span className="w-6 h-[2px] bg-emerald-700 rounded-full inline-block" />
              <span className="text-[10px] sm:text-[11px] font-black tracking-[0.2em] text-[#0a3622] uppercase">
                OUR EXPERIENCE
              </span>
            </div>

            {/* 2-Line Bold Heading */}
            <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-black font-heading tracking-tight leading-[1.18] text-slate-900">
              <span>Logistics Solutions</span>{' '}
              <span className="block mt-0.5 text-slate-800">
                to Help Business
              </span>
            </h2>
          </div>

          {/* Top-Right Pagination Indicator Pill (Interactive) */}
          <div className="flex items-center justify-start md:justify-end">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white border border-slate-200 shadow-xs">
              {solutions.map((item, idx) => (
                <button
                  key={item.title}
                  type="button"
                  onClick={() => setActiveTab(idx)}
                  className={`transition-all duration-300 cursor-pointer ${
                    activeTab === idx
                      ? 'w-4 h-1.5 rounded-full bg-[#0a3622]'
                      : 'w-1.5 h-1.5 rounded-full bg-slate-300 hover:bg-slate-400'
                  }`}
                  aria-label={`View ${item.title}`}
                  title={item.title}
                />
              ))}
            </div>
          </div>
        </div>

        {/* 4 Feature Columns Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6 text-left">
          {solutions.map((item, idx) => (
            <div
              key={item.title}
              onMouseEnter={() => setActiveTab(idx)}
              className="group flex flex-col justify-between p-4 sm:p-4.5 rounded-xl bg-white border border-slate-200/90 shadow-xs hover:shadow-lg hover:border-emerald-600/40 transition-all duration-300 hover:-translate-y-1"
            >
              {/* Top: Title & Narrative */}
              <div>
                <h3 className="text-base sm:text-[17px] font-bold font-heading text-slate-900 group-hover:text-[#0a3622] transition-colors">
                  {item.title}
                </h3>
                <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Bottom: Rounded Squircle Icon Card */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-slate-50 group-hover:bg-emerald-50/80 border border-slate-200/80 group-hover:border-emerald-500/30 flex items-center justify-center shadow-xs transition-all duration-300 group-hover:scale-105">
                  {item.icon}
                </div>

                <Link
                  to="/contact"
                  className="text-[11px] font-semibold text-slate-500 group-hover:text-[#0a3622] hover:text-emerald-700 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <span>Explore</span>
                  <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
