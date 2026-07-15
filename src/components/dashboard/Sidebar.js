'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Users, Building2, LogOut, Search, Bell } from 'lucide-react'

const navItems = [
  { name: 'Beranda', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Lead Inbox', href: '/dashboard/leads', icon: Users },
  { name: 'Ketersediaan Unit', href: '/dashboard/units', icon: Building2 },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 h-screen bg-[#0B0F14] border-r border-white/10 flex flex-col hidden md:flex sticky top-0">
      <div className="p-6">
        <Link href="/dashboard" className="inline-block">
          <span className="text-2xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300 drop-shadow-[0_0_15px_rgba(52,211,153,0.3)]">
            Metland.
          </span>
        </Link>
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
      </div>

      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
        <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4 px-2">
          Main Menu
        </div>
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`
                flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group relative overflow-hidden
                ${isActive 
                  ? 'text-emerald-300 bg-emerald-500/10' 
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
                }
              `}
            >
              {/* Active Indicator Line */}
              {isActive && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)] rounded-r-full" />
              )}
              
              <item.icon size={18} className={`
                ${isActive ? 'text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.5)]' : 'text-slate-500 group-hover:text-slate-300'}
              `} />
              <span className="relative z-10">{item.name}</span>
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-white/10">
        <button className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200 w-full">
          <LogOut size={18} />
          <span>Keluar</span>
        </button>
      </div>
    </aside>
  )
}
