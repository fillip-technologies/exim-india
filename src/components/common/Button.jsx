export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  icon = null,
  onClick,
  ...props
}) {
  const baseStyles =
    'inline-flex items-center justify-center font-medium transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none'

  const variants = {
    primary:
      'gradient-btn-orange text-white shadow-lg shadow-orange-950/30 hover:brightness-105 active:scale-95 focus-visible:outline-orange-500',
    green:
      'bg-brand-green hover:bg-brand-green-dark text-white shadow-lg shadow-green-950/20 active:scale-95 focus-visible:outline-green-500',
    blue:
      'bg-brand-blue hover:bg-brand-blue-dark text-white shadow-lg shadow-sky-950/20 active:scale-95 focus-visible:outline-sky-500',
    glass:
      'bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/20 hover:border-white/30 active:scale-95',
    outline:
      'border border-slate-700 hover:border-slate-500 text-slate-200 hover:text-white hover:bg-white/5 active:scale-95',
    ghost:
      'text-slate-300 hover:text-white hover:bg-white/10 active:scale-95',
  }

  const sizes = {
    sm: 'text-xs px-3.5 py-1.5 rounded-full gap-1.5',
    md: 'text-sm px-5 py-2.5 rounded-full gap-2 font-semibold',
    lg: 'text-base px-7 py-3.5 rounded-full gap-2.5 font-bold',
  }

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${className}`}
      {...props}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </button>
  )
}
