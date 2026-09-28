import { useState } from 'react'
import { Link } from 'react-router-dom'
import experienceBg from '../../assets/experience-bg.png'

export default function LogisticsSection() {
  const [activeTab, setActiveTab] = useState(0)

  const solutions = [
    {
      title: 'Custom Shade Matching',
      description:
        'Advanced spectrophotometric pigment formulation and custom shade development tailored to precise food and cosmetic industry standards.',
      link: '/products',
      icon: (
        <svg className="w-5 h-5 text-[#0a3622] group-hover:text-emerald-700 transition-colors stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z" />
          <circle cx="12" cy="14" r="3" className="fill-emerald-600/30 stroke-emerald-700" />
        </svg>
      ),
    },
    {
      title: 'R&D & Quality Testing',
      description:
        'In-house laboratory testing ensuring heavy metal compliance, microbiological safety, and batch-to-batch consistency for every order.',
      link: '/certifications',
      icon: (
        <svg className="w-5 h-5 text-[#0a3622] group-hover:text-emerald-700 transition-colors stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      ),
    },
    {
      title: 'Global Compliance',
      description:
        'Full adherence to US FDA, European Union, FSSAI, HALAL, KOSHER, and ISO certifications for seamless global market entry.',
      link: '/certifications',
      icon: (
        <svg className="w-5 h-5 text-[#0a3622] group-hover:text-emerald-700 transition-colors stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    },
    {
      title: 'Bulk Export Supply',
      description:
        'High-capacity manufacturing plant supplying metric tons of certified pigments, food colours, and flavours to 50+ countries.',
      link: '/contact',
      icon: (
        <svg className="w-5 h-5 text-[#0a3622] group-hover:text-emerald-700 transition-colors stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth={1.8}>
          <circle cx="12" cy="12" r="9" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.6 9h16.8M3.6 15h16.8" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3a14 14 0 014 9 14 14 0 01-4 9 14 14 0 01-4-9 14 14 0 014-9z" />
        </svg>
      ),
    },
  ]

  return (
    <section className="py-14 sm:py-18 lg:py-22 border-t border-slate-200/80 relative overflow-hidden text-slate-900 bg-[#f8fafc]">
      {/* Background Image: experience-bg.png */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <img
          src={experienceBg}
          alt="Experience Background"
          className="w-full h-full object-cover object-center"
        />
        {/* Crisp subtle overlay ensuring 100% text readability */}
        <div className="absolute inset-0 bg-white/10" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header with Overline, Headline and Top-Right Pagination Pill */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 sm:mb-10">
          <div className="text-left max-w-2xl">
            {/* Overline with Accent */}
            <div className="flex items-center gap-2.5 mb-2.5">
              <span className="w-8 h-[2.5px] bg-[#0a3622] rounded-full inline-block" />
              <span className="text-[11px] font-black tracking-[0.22em] text-[#0a3622] uppercase font-heading">
                OUR EXPERIENCE
              </span>
            </div>

            {/* 2-Line Bold Heading */}
            <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-black font-heading tracking-tight leading-[1.18] text-slate-900 uppercase">
              <span>Manufacturing Expertise</span>{' '}
              <span className="block mt-0.5 text-slate-800">
                Tailored for Global Brands
              </span>
            </h2>
          </div>

          {/* Top-Right Pagination Indicator Pill (Interactive) */}
          <div className="flex items-center justify-start md:justify-end">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-sm border border-slate-200/90 shadow-sm">
              {solutions.map((item, idx) => (
                <button
                  key={item.title}
                  type="button"
                  onClick={() => setActiveTab(idx)}
                  className={`transition-all duration-300 cursor-pointer ${
                    activeTab === idx
                      ? 'w-5 h-1.5 rounded-full bg-[#0a3622]'
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
              className="group relative flex flex-col justify-between p-5 sm:p-6 rounded-2xl bg-white/95 backdrop-blur-sm border border-slate-200/90 shadow-[0_4px_20px_-4px_rgba(15,23,42,0.06)] hover:shadow-[0_16px_36px_-6px_rgba(10,54,34,0.12)] hover:border-emerald-600/50 transition-all duration-300 hover:-translate-y-1.5 overflow-hidden"
            >
              {/* Top Accent Gradient Border on Hover */}
              <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-emerald-600 via-[#0a3622] to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Top: Title & Narrative */}
              <div>
                <h3 className="text-base sm:text-[17px] font-bold font-heading text-slate-900 group-hover:text-[#0a3622] transition-colors">
                  {item.title}
                </h3>
                <p className="mt-2 text-xs sm:text-[13px] text-slate-600 leading-relaxed font-body">
                  {item.description}
                </p>
              </div>

              {/* Bottom: Rounded Squircle Icon Card */}
              <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-50/80 to-slate-100/80 group-hover:from-emerald-100 group-hover:to-emerald-50/60 border border-slate-200/80 group-hover:border-emerald-500/40 flex items-center justify-center shadow-xs transition-all duration-300 group-hover:scale-105">
                  {item.icon}
                </div>

                <Link
                  to={item.link}
                  className="text-xs font-semibold text-slate-500 group-hover:text-[#0a3622] hover:text-emerald-700 transition-colors flex items-center gap-1 cursor-pointer"
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

