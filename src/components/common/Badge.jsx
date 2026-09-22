export default function Badge({
  children,
  variant = 'orange',
  className = '',
  dot = false,
}) {
  const variants = {
    orange: 'bg-orange-500/15 text-orange-400 border-orange-500/30',
    green: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
    blue: 'bg-sky-500/15 text-sky-400 border-sky-500/30',
    purple: 'bg-purple-500/15 text-purple-400 border-purple-500/30',
    glass: 'bg-white/10 text-slate-200 border-white/20 backdrop-blur-md',
  }

  const dotColors = {
    orange: 'bg-orange-400 animate-pulse',
    green: 'bg-emerald-400 animate-pulse',
    blue: 'bg-sky-400 animate-pulse',
    purple: 'bg-purple-400 animate-pulse',
    glass: 'bg-white',
  }

  return (
    <span
      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wide border uppercase ${variants[variant] || variants.orange} ${className}`}
    >
      {dot && (
        <span className={`w-2 h-2 rounded-full ${dotColors[variant] || dotColors.orange}`} />
      )}
      {children}
    </span>
  )
}
