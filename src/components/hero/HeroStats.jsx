export default function HeroStats() {
  const stats = [
    {
      value: '150+',
      label: 'Global Ports Connected',
      detail: 'Direct shipping lines & feeder networks',
      accentColor: 'text-orange-400',
    },
    {
      value: '99.8%',
      label: 'Customs Clearance SLA',
      detail: 'Swift documentation & EDI processing',
      accentColor: 'text-emerald-400',
    },
    {
      value: '40,000+',
      label: 'TEUs Moved Annually',
      detail: 'FCL & LCL dry and reefer containers',
      accentColor: 'text-sky-400',
    },
    {
      value: '24/7',
      label: 'Port Logistics Desk',
      detail: 'Active tracking & emergency escalation',
      accentColor: 'text-purple-400',
    },
  ]

  return (
    <div className="w-full pt-10 sm:pt-14 pb-8 border-t border-white/10 mt-12 sm:mt-16">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl bg-slate-900/40 backdrop-blur-md border border-white/10 p-4 sm:p-5 hover:border-white/20 transition-all hover:translate-y-[-2px]"
          >
            <div className={`text-2xl sm:text-3xl lg:text-4xl font-extrabold font-heading ${stat.accentColor}`}>
              {stat.value}
            </div>
            <div className="text-xs sm:text-sm font-semibold text-white mt-1">
              {stat.label}
            </div>
            <div className="text-[11px] sm:text-xs text-slate-400 mt-1 leading-tight">
              {stat.detail}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
