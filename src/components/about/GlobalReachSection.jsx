import { Link } from 'react-router-dom'
import globalMapImg from '../../assets/common/global-export-image.png'

export default function GlobalReachSection() {
  const destinations = [
    {
      name: 'USA',
      color: 'bg-blue-50 text-blue-700 border-blue-200',
      dot: 'bg-blue-600',
    },
    {
      name: 'UK',
      color: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      dot: 'bg-emerald-700',
    },
    {
      name: 'European Countries',
      color: 'bg-teal-50 text-teal-800 border-teal-200',
      dot: 'bg-teal-600',
    },
    {
      name: 'Middle Eastern Countries',
      color: 'bg-purple-50 text-purple-700 border-purple-200',
      dot: 'bg-purple-600',
    },
    {
      name: 'Asian Countries',
      color: 'bg-amber-50 text-amber-800 border-amber-200',
      dot: 'bg-amber-600',
    },
    {
      name: 'Australia',
      color: 'bg-rose-50 text-rose-700 border-rose-200',
      dot: 'bg-rose-600',
    },
  ]

  return (
    <section className="py-14 sm:py-18 bg-gradient-to-b from-slate-50/60 via-white to-slate-50/50 border-t border-slate-200/80 font-body relative overflow-hidden select-none">
      {/* Precision Dot Pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.25]"
        style={{
          backgroundImage: `radial-gradient(#94a3b8 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
      />

      {/* Atmospheric Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[400px] bg-emerald-100/30 rounded-full blur-[140px] pointer-events-none" />

      {/* Header in Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mb-8 sm:mb-12">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading text-slate-900 tracking-tight leading-[1.15]">
            Global{' '}
            <span className="bg-gradient-to-r from-[#0a3622] via-emerald-700 to-teal-700 bg-clip-text text-transparent">
              Reach
            </span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-3xl mx-auto">
            With an established international presence, EXIM India Corporation actively exports to key destinations across the{' '}
            <span className="font-semibold text-slate-900">USA</span>,{' '}
            <span className="font-semibold text-slate-900">UK</span>,{' '}
            <span className="font-semibold text-slate-900">Europe</span>, the{' '}
            <span className="font-semibold text-slate-900">Middle East</span>,{' '}
            <span className="font-semibold text-slate-900">Asia</span>, and{' '}
            <span className="font-semibold text-slate-900">Australia</span> — with an active commitment to expanding our worldwide footprint even further.
          </p>
        </div>
      </div>

      {/* FULL WIDTH IMAGE - Spans 100% of Screen Edge-to-Edge */}
      <div className="w-full relative border-y border-slate-200/80 bg-white shadow-xs">
        <img
          src={globalMapImg}
          alt="EXIM India Global Export Map with Destinations Marked"
          className="w-full h-auto object-cover block"
          loading="lazy"
        />
      </div>

      {/* Destination Pills & Callout Bar in Container below Full-Width Image */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mt-8 sm:mt-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-4 sm:p-6 bg-white rounded-2xl border border-slate-200/80 shadow-xs">
          
          {/* Destination Pills */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5">
            {destinations.map((dest) => (
              <div
                key={dest.name}
                className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-bold transition-transform hover:scale-105 ${dest.color}`}
              >
                <span className={`w-2 h-2 rounded-full ${dest.dot}`} />
                <span>{dest.name}</span>
              </div>
            ))}
          </div>

          {/* Action Callout */}
          <div className="shrink-0 flex items-center gap-3">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0a3622] hover:bg-[#0f4d30] text-white text-xs font-bold transition-all shadow-sm hover:shadow-md active:scale-95"
            >
              <span>Inquire for Your Region</span>
              <span>&rarr;</span>
            </Link>
          </div>

        </div>
      </div>
    </section>
  )
}
