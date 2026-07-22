'use client'

import React, { useState } from 'react'
import { Sidebar } from '@/components/dashboard/Sidebar'
import { TopBar } from '@/components/dashboard/TopBar'

export default function DashboardLayout({ children }) {
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <div className="flex min-h-screen bg-[#0B0F14] text-slate-200 font-sans selection:bg-emerald-500/30 selection:text-emerald-200">
      <Sidebar isCollapsed={isCollapsed} />
      
      <div className="flex-1 flex flex-col min-w-0 transition-all duration-300">
        <TopBar isCollapsed={isCollapsed} onToggleCollapse={() => setIsCollapsed(!isCollapsed)} />
        
        {/* Main Content Area */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-[#0B0F14] p-4 md:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
