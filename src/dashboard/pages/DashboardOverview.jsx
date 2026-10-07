import { useEffect, useState, useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { http, getUser } from '../../api'

const STATUS_STYLES = {
  new:      'bg-blue-50 text-blue-700 ring-1 ring-blue-200',
  read:     'bg-slate-100 text-slate-600 ring-1 ring-slate-200',
  replied:  'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200',
  archived: 'bg-amber-50 text-amber-700 ring-1 ring-amber-200',
}

function formatDate(dateStr) {
  if (!dateStr) return '—'
  return new Date(dateStr).toLocaleDateString('en-IN', {
    day: '2-digit', month: 'short',
    hour: '2-digit', minute: '2-digit',
  })
}

export default function DashboardOverview() {
  const user     = getUser()
  const navigate = useNavigate()

  const [stats, setStats] = useState({
    categories:   null,
    products:     null,
    contacts:     null,
    testimonials: null,
    newCount:     0,
  })
  const [recentContacts, setRecentContacts] = useState([])
  const [loading, setLoading]               = useState(true)
  const [refreshing, setRefreshing]         = useState(false)

  const fetchStats = useCallback(async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true)
    try {
      const [categories, products, contacts, testimonials] = await Promise.all([
        http.get('/admin/categories').catch(() => []),
        http.get('/admin/products').catch(() => ({ total: 0 })),
        http.get('/admin/contacts').catch(() => ({ data: [] })),
        http.get('/admin/testimonials').catch(() => []),
      ])

      const contactsList     = contacts?.data || []
      const newItems         = contactsList.filter(c => c.status === 'new').length
      const testimonialsList = Array.isArray(testimonials) ? testimonials : testimonials?.data || []

      setStats({
        categories:   Array.isArray(categories) ? categories.length : categories?.length ?? 0,
        products:     products?.total ?? products?.data?.length ?? 0,
        contacts:     contacts?.total ?? contactsList.length ?? 0,
        testimonials: testimonialsList.length,
        newCount:     newItems,
      })

      setRecentContacts(contactsList.slice(0, 5))
    } catch (err) {
      console.error('Failed to load dashboard statistics:', err)
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }, [])

  useEffect(() => {
    document.title = 'Dashboard | Exim India Corporation'
    fetchStats()
  }, [fetchStats])

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-6 sm:space-y-8">
      
      {/* ── 1. Welcome Hero Banner ────────────────────────────── */}
      <div className="relative overflow-hidden bg-gradient-to-r from-white via-white to-emerald-50/40 rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-2xl">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Welcome back, {user?.name || 'Administrator'} 👋
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Real-time platform activity for Exim India Corporation. Monitor export inquiries, manage catalog products, and oversee client communications.
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2.5 shrink-0 self-start md:self-center">
            <button
              type="button"
              onClick={() => fetchStats(true)}
              disabled={refreshing || loading}
              className="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold border border-slate-200 shadow-xs hover:border-slate-300 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <svg className={`w-3.5 h-3.5 text-slate-500 ${refreshing ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span>{refreshing ? 'Updating…' : 'Refresh'}</span>
            </button>
            <Link
              to="/dashboard/contacts"
              className="px-4 py-2 rounded-xl bg-[#0a3622] hover:bg-[#0f4d30] text-white text-xs font-bold shadow-sm shadow-[#0a3622]/20 hover:shadow-md transition-all flex items-center gap-1.5"
            >
              <span>View Inquiries</span>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* ── 2. Stat Cards Grid ─────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        
        {/* Card 1: Total Inquiries */}
        <Link
          to="/dashboard/contacts"
          className="group relative bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs hover:shadow-lg hover:border-amber-300 transition-all duration-300 flex flex-col justify-between"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center border border-amber-100 group-hover:scale-105 transition-transform">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <span className="text-[11px] font-bold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-100">
              Total Leads
            </span>
          </div>
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
              Total Inquiries
            </p>
            {loading ? (
              <div className="h-8 w-20 bg-slate-100 rounded animate-pulse" />
            ) : (
              <p className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                {stats.contacts ?? '—'}
              </p>
            )}
            <p className="text-[11px] text-slate-400 font-medium mt-1">
              Customer inquiries received
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-semibold group-hover:text-amber-700">
            <span>Manage Inquiries</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </div>
        </Link>

        {/* Card 2: New / Pending Leads */}
        <Link
          to="/dashboard/contacts?status=new"
          className="group relative bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs hover:shadow-lg hover:border-red-300 transition-all duration-300 flex flex-col justify-between"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-11 h-11 rounded-xl bg-red-50 text-red-600 flex items-center justify-center border border-red-100 group-hover:scale-105 transition-transform">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="text-[11px] font-bold text-red-600 bg-red-50 px-2.5 py-0.5 rounded-full border border-red-100 animate-pulse">
              Needs Review
            </span>
          </div>
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
              New Inquiries
            </p>
            {loading ? (
              <div className="h-8 w-20 bg-slate-100 rounded animate-pulse" />
            ) : (
              <p className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                {stats.newCount ?? 0}
              </p>
            )}
            <p className="text-[11px] text-slate-400 font-medium mt-1">
              Awaiting admin reply
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-semibold group-hover:text-red-600">
            <span>Filter New Leads</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </div>
        </Link>

        {/* Card 3: Client Testimonials */}
        <Link
          to="/dashboard/testimonials"
          className="group relative bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs hover:shadow-lg hover:border-emerald-300 transition-all duration-300 flex flex-col justify-between"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center border border-emerald-100 group-hover:scale-105 transition-transform text-lg">
              💬
            </div>
            <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100">
              Homepage
            </span>
          </div>
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
              Client Testimonials
            </p>
            {loading ? (
              <div className="h-8 w-20 bg-slate-100 rounded animate-pulse" />
            ) : (
              <p className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                {stats.testimonials ?? '—'}
              </p>
            )}
            <p className="text-[11px] text-slate-400 font-medium mt-1">
              Reviews & global endorsements
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-semibold group-hover:text-emerald-800">
            <span>Manage Testimonials</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </div>
        </Link>

      </div>

      {/* ── 3. Recent Inquiries + Quick Actions Split ─────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
        
        {/* Left Column (8 cols): Recent Inquiries Table */}
        <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-200/90 shadow-xs overflow-hidden">
          <div className="p-5 sm:p-6 border-b border-slate-100 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900">
                Recent Inquiries
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Latest submissions from website contact and export forms
              </p>
            </div>
            <Link
              to="/dashboard/contacts"
              className="text-xs font-bold text-[#0a3622] hover:text-[#0f4d30] flex items-center gap-1 hover:underline shrink-0"
            >
              <span>View All</span>
              <span>&rarr;</span>
            </Link>
          </div>

          {loading ? (
            <div className="p-6 space-y-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-14 bg-slate-50 rounded-xl animate-pulse" />
              ))}
            </div>
          ) : recentContacts.length === 0 ? (
            <div className="py-12 px-4 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto text-xl">
                ✉
              </div>
              <p className="text-sm font-semibold text-slate-700">No Inquiries Found</p>
              <p className="text-xs text-slate-400 max-w-xs mx-auto">
                Customer inquiries submitted via the website will appear here automatically.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100 overflow-x-auto">
              {recentContacts.map((item) => (
                <div
                  key={item.id}
                  onClick={() => navigate(`/dashboard/contacts/${item.id}`)}
                  className="p-4 sm:p-5 flex items-center justify-between gap-4 hover:bg-slate-50/80 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="w-10 h-10 rounded-full bg-emerald-100 text-[#0a3622] font-bold text-sm flex items-center justify-center shrink-0">
                      {item.name?.[0]?.toUpperCase() || '?'}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-bold text-slate-800 truncate">
                          {item.name}
                        </p>
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full capitalize ${STATUS_STYLES[item.status] || 'bg-slate-100 text-slate-600'}`}>
                          {item.status}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 truncate mt-0.5">
                        {item.email} {item.phone ? `• ${item.phone}` : ''}
                      </p>
                      {item.product_interest && (
                        <p className="text-[11px] text-emerald-700 font-medium mt-1 truncate">
                          🎯 {item.product_interest}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <p className="text-xs font-medium text-slate-400">
                      {formatDate(item.created_at)}
                    </p>
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#0a3622] mt-1.5 opacity-0 group-hover:opacity-100 sm:opacity-100">
                      <span>View</span>
                      <span>&rarr;</span>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column (4 cols): Quick Actions Hub */}
        <div className="lg:col-span-4 space-y-6">
          
          <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-4">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Quick Actions
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Fast shortcuts for daily administration
              </p>
            </div>

            <div className="space-y-2.5">
              {[
                {
                  title: 'All Inquiries',
                  desc: 'Review received messages & leads',
                  path: '/dashboard/contacts',
                  icon: '✉',
                  color: 'bg-emerald-50 text-[#0a3622] border-emerald-100',
                },
                {
                  title: 'Client Testimonials',
                  desc: 'Add, edit & review customer quotes',
                  path: '/dashboard/testimonials',
                  icon: '💬',
                  color: 'bg-teal-50 text-teal-800 border-teal-100',
                },
                // Categories & Products will be integrated later:
                // {
                //   title: 'Product Catalog',
                //   desc: 'Browse food colors & formulations',
                //   path: '/dashboard/products',
                //   icon: '📦',
                //   color: 'bg-blue-50 text-blue-700 border-blue-100',
                // },
                // {
                //   title: 'Categories',
                //   desc: 'Manage product group listings',
                //   path: '/dashboard/categories',
                //   icon: '📂',
                //   color: 'bg-purple-50 text-purple-700 border-purple-100',
                // },
                {
                  title: 'Live Storefront',
                  desc: 'View public customer experience',
                  path: '/',
                  icon: '🌐',
                  color: 'bg-amber-50 text-amber-700 border-amber-100',
                  external: true,
                },
              ].map((act) => (
                <Link
                  key={act.title}
                  to={act.path}
                  target={act.external ? '_blank' : undefined}
                  rel={act.external ? 'noopener noreferrer' : undefined}
                  className="group flex items-center justify-between p-3.5 rounded-2xl border border-slate-200/80 hover:border-slate-300 hover:bg-slate-50/80 transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm border shrink-0 ${act.color}`}>
                      {act.icon}
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-slate-800 group-hover:text-[#0a3622] transition-colors truncate">
                        {act.title}
                      </p>
                      <p className="text-[11px] text-slate-400 truncate mt-0.5">
                        {act.desc}
                      </p>
                    </div>
                  </div>
                  <svg className="w-4 h-4 text-slate-400 group-hover:text-slate-700 group-hover:translate-x-0.5 transition-all shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              ))}
            </div>
          </div>



        </div>

      </div>

    </div>
  )
}
