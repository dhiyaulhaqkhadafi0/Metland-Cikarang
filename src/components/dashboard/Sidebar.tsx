'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Users, Building2, Link as LinkIcon, Settings } from 'lucide-react'

const navItems = [
  { name: 'Beranda', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Lead Inbox', href: '/dashboard/leads', icon: Users },
  { name: 'Campaign Links', href: '/dashboard/campaigns', icon: LinkIcon },
  { name: 'Ketersediaan Unit', href: '/dashboard/units', icon: Building2 },
]

export function Sidebar({ isCollapsed }: { isCollapsed?: boolean }) {
  const pathname = usePathname()

  return (
    <aside className={`h-screen bg-[#0B0F14] border-r border-white/10 flex flex-col hidden md:flex sticky top-0 transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-64'}`}>
      <div className={`p-6 ${isCollapsed ? 'px-3 text-center' : ''}`}>
        <Link href="/dashboard" className="inline-block group relative">
          <div className="absolute -inset-2 bg-gradient-to-r from-emerald-500 to-teal-400 rounded-lg blur opacity-20 group-hover:opacity-60 transition duration-1000 group-hover:duration-200"></div>
          <span className={`relative font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300 drop-shadow-[0_0_15px_rgba(52,211,153,0.3)] transition-all ${isCollapsed ? 'text-xl' : 'text-2xl'}`}>
            {isCollapsed ? 'M.' : 'Metland.'}
          </span>
        </Link>
        {!isCollapsed && (
          <div className="mt-2 flex items-center gap-2">
            <div className="px-2 py-0.5 rounded text-[10px] font-bold bg-white/10 text-slate-400 uppercase tracking-wider border border-white/5">
              Sales
            </div>
            <div className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400 uppercase tracking-wider border border-emerald-500/20 flex items-center gap-1.5">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
              </span>
              Live
            </div>
          </div>
        )}
      </div>

      <nav className={`flex-1 ${isCollapsed ? 'px-2' : 'px-4'} py-4 space-y-1.5 overflow-y-auto`}>
        {!isCollapsed && (
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 px-2">
            Main Menu
          </div>
        )}
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(`${item.href}/`))
          
          return (
            <Link
              key={item.name}
              href={item.href}
              title={isCollapsed ? item.name : undefined}
              className={`
                flex items-center gap-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group relative overflow-hidden
                ${isCollapsed ? 'justify-center px-2' : 'px-3'}
                ${isActive 
                  ? 'text-emerald-300 bg-emerald-500/10 border border-emerald-500/20' 
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
                }
              `}
            >
              {/* Active Indicator Line */}
              {isActive && !isCollapsed && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)] rounded-r-full" />
              )}
              
              <item.icon size={20} className={`
                ${isActive ? 'text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.5)]' : 'text-slate-500 group-hover:text-slate-300'}
              `} />
              {!isCollapsed && <span className="relative z-10">{item.name}</span>}
            </Link>
          )
        })}
      </nav>

      {/* Footer Branding Info */}
      {!isCollapsed && (
        <div className="p-4 border-t border-white/10 text-center">
          <p className="text-[11px] text-slate-500 font-medium">Metland Sales Platform v2.0</p>
        </div>
      )}
    </aside>
  )
}
