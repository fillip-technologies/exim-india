import { useState, useEffect, useRef } from 'react'
import { Link, NavLink } from 'react-router-dom'
import gsap from 'gsap'
import logoImg from '../../assets/logo.png'
import { NAV_LINKS } from '../../constants/navigation'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [productsDropdownOpen, setProductsDropdownOpen] = useState(false)
  const navPillRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // GSAP First Load Entrance Animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      // 1. Navbar pill slide down and fade in
      tl.fromTo(
        navPillRef.current,
        { y: -30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.85, delay: 0.1 }
      )

      // 2. Logo entrance
      tl.fromTo(
        '.nav-logo',
        { x: -15, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6 },
        '-=0.55'
      )

      // 3. Desktop nav items stagger
      tl.fromTo(
        '.nav-link-item',
        { y: -10, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.05 },
        '-=0.45'
      )

      // 4. CTA button pop
      tl.fromTo(
        '.nav-cta-btn',
        { scale: 0.9, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.4)' },
        '-=0.3'
      )
    }, navPillRef)

    return () => ctx.revert()
  }, [])

  return (
    <header className="fixed top-0 inset-x-0 z-50 w-full px-4 sm:px-6 lg:px-8 pt-3 sm:pt-4 pointer-events-none transition-all duration-300">
      {/* Floating Circular/Pill Light Theme Navbar */}
      <div
        ref={navPillRef}
        className={`max-w-7xl mx-auto rounded-full pointer-events-auto transition-all duration-300 ${
          scrolled
            ? 'glass-nav-pill-scrolled py-2 sm:py-2.5 px-4 sm:px-6'
            : 'glass-nav-pill py-2.5 sm:py-3 px-4 sm:px-6'
        }`}
      >
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <Link to="/" className="nav-logo flex items-center gap-3 shrink-0 group">
            <div className="transition-transform group-hover:scale-105 duration-300">
              <img
                src={logoImg}
                alt="Exim India Corporation"
                className="h-8 sm:h-10 w-auto object-contain"
              />
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {NAV_LINKS.map((link) => {
              if (link.dropdown) {
                return (
                  <div
                    key={link.name}
                    className="nav-link-item relative"
                    onMouseEnter={() => setProductsDropdownOpen(true)}
                    onMouseLeave={() => setProductsDropdownOpen(false)}
                  >
                    <button
                      type="button"
                      className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-100/80 transition-colors"
                      onClick={() => setProductsDropdownOpen(!productsDropdownOpen)}
                    >
                      <span>{link.name}</span>
                      <svg
                        className={`w-4 h-4 transition-transform duration-200 ${productsDropdownOpen ? 'rotate-180 text-orange-600' : 'text-slate-500'}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {/* 2-Column Products Mega Dropdown Menu */}
                    {productsDropdownOpen && (
                      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[560px] sm:w-[620px] rounded-2xl bg-white/98 backdrop-blur-2xl border border-slate-200/90 shadow-2xl shadow-slate-900/15 p-4 z-50 animate-fadeIn">
                        <div className="grid grid-cols-2 gap-x-4 sm:gap-x-6 gap-y-1">
                          {link.dropdown.map((item) => (
                            <Link
                              key={item.name}
                              to={item.path}
                              onClick={() => setProductsDropdownOpen(false)}
                              className="flex items-center gap-2 py-1.5 px-2.5 rounded-lg text-xs font-semibold text-slate-700 hover:text-[#0a3622] hover:bg-emerald-50/70 transition-all group"
                            >
                              <span className="text-purple-700 font-extrabold text-sm leading-none group-hover:translate-x-0.5 transition-transform">
                                &rsaquo;
                              </span>
                              <span className="truncate">{item.name}</span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )
              }

              return (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={({ isActive }) =>
                    `nav-link-item px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-slate-100 text-emerald-800 font-semibold'
                        : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100/80'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              )
            })}
          </nav>

          {/* Right Action: Enquire Now CTA & Mobile Hamburger */}
          <div className="flex items-center gap-3">
            <Link
              to="/contact"
              className="nav-cta-btn hidden sm:inline-flex items-center justify-center rounded-full bg-[#0a3622] hover:bg-[#0f4d30] text-white px-5 py-2 text-xs sm:text-sm font-semibold shadow-sm hover:shadow-md transition-all active:scale-95"
            >
              Export Inquiry &rarr;
            </Link>

            {/* Mobile Menu Toggle Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-full text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Panel - Clean Separate Floating Glass Card */}
      {mobileMenuOpen && (
        <div className="lg:hidden max-w-md mx-auto mt-2.5 rounded-3xl bg-white/95 backdrop-blur-2xl border border-slate-200/90 shadow-2xl p-5 pointer-events-auto animate-fadeIn max-h-[80vh] overflow-y-auto">
          <div className="space-y-1">
            {NAV_LINKS.map((link) => (
              <div key={link.name}>
                <Link
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3.5 py-2.5 rounded-xl text-sm font-bold text-slate-800 hover:text-emerald-900 hover:bg-slate-100 transition-colors"
                >
                  {link.name}
                </Link>
                {link.dropdown && (
                  <div className="pl-3.5 space-y-1 py-1 max-h-72 overflow-y-auto pr-1">
                    {link.dropdown.map((sub) => (
                      <Link
                        key={sub.name}
                        to={sub.path}
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 hover:text-emerald-800 hover:bg-emerald-50/60 transition-colors"
                      >
                        <span className="text-purple-700 font-extrabold text-sm leading-none">&rsaquo;</span>
                        <span className="truncate">{sub.name}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-100 mt-3">
            <Link
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-center rounded-xl bg-[#0a3622] hover:bg-[#0f4d30] text-white py-3 text-xs sm:text-sm font-bold shadow-md transition-all active:scale-95"
            >
              Export Inquiry &rarr;
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
