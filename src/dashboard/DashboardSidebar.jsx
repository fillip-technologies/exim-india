import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { logout, getUser } from '../api'
import logoImg from '../assets/logo.png'

const NAV_ITEMS = [
  {
    label: 'Overview',
    path: '/dashboard',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    label: 'Contacts',
    path: '/dashboard/contacts',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  // Categories & Products will be integrated in future phases:
  // {
  //   label: 'Categories',
  //   path: '/dashboard/categories',
  //   icon: (
  //     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
  //       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
  //         d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
  //     </svg>
  //   ),
  // },
  // {
  //   label: 'Products',
  //   path: '/dashboard/products',
  //   icon: (
  //     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
  //       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
  //         d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
  //     </svg>
  //   ),
  // },
  {
    label: 'Testimonials',
    path: '/dashboard/testimonials',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
  },

]

export default function DashboardSidebar({ isOpen = false, onClose = () => { } }) {
  const navigate = useNavigate()
  const user = getUser()
  const [loggingOut, setLoggingOut] = useState(false)

  const handleLogout = async () => {
    setLoggingOut(true)
    onClose()
    await logout()
    navigate('/login', { replace: true })
  }

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-40 lg:hidden transition-opacity duration-300"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar Drawer on Mobile / Fixed Left Column on Desktop */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-white border-r border-slate-200 flex flex-col h-full transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 lg:z-auto lg:shrink-0 ${isOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full lg:shadow-none'
          }`}
      >
        {/* Logo & Close Button */}
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
          <div>
            <img src={logoImg} alt="Exim India" className="h-8 w-auto object-contain" />
            <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mt-1">
              Admin Panel
            </p>
          </div>

          {/* Close button on mobile */}
          <button
            type="button"
            onClick={onClose}
            className="lg:hidden p-1.5 -mr-1 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            aria-label="Close sidebar"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/dashboard'}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${isActive
                  ? 'bg-[#0a3622] text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`
              }
            >
              {item.icon}
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* User Profile & Logout */}
        <div className="px-4 py-4 border-t border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-full bg-[#0a3622] text-white flex items-center justify-center text-xs font-bold shrink-0">
              {user?.name?.[0]?.toUpperCase() || 'A'}
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-slate-800 truncate">
                {user?.name || 'Admin'}
              </p>
              <p className="text-[10px] text-slate-400 truncate">
                {user?.email || ''}
              </p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-red-600 hover:bg-red-50 transition-colors cursor-pointer disabled:opacity-50"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            {loggingOut ? 'Logging out...' : 'Logout'}
          </button>
        </div>
      </aside>
    </>
  )
}
