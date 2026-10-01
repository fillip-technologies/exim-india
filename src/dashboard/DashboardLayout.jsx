import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import DashboardSidebar from './DashboardSidebar'
import DashboardHeader from './DashboardHeader'

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      {/* Sidebar: Preserved exactly, desktop fixed & mobile drawer */}
      <DashboardSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content Container with Top Header */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        {/* Sticky / Top Header */}
        <DashboardHeader onOpenSidebar={() => setSidebarOpen(true)} />

        {/* Page Content Body */}
        <main className="flex-1 overflow-y-auto w-full min-w-0 bg-[#f8fafc]">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
