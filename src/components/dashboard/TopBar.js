'use client'

import React from 'react'
import { Search, Bell, Menu } from 'lucide-react'

export function TopBar() {
  return (
    <header className="h-16 border-b border-white/10 bg-[#0B0F14]/80 backdrop-blur-md flex items-center justify-between px-6 sticky top-0 z-40">
      
      {/* Mobile Menu Button (Hidden on Desktop) */}
      <button className="md:hidden text-slate-400 hover:text-white transition-colors">
        <Menu size={20} />
      </button>

      {/* Search Bar (Desktop) */}
      <div className="hidden md:flex items-center flex-1 max-w-md">
        <div className="relative w-full">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input 
            type="text"
            placeholder="Cari prospek atau nomor HP..."
            className="w-full bg-white/5 border border-white/10 rounded-full pl-10 pr-4 py-2 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500/50 focus:bg-white/10 transition-all"
          />
        </div>
      </div>

      {/* Right side icons & Profile */}
      <div className="flex items-center gap-4 ml-auto">
        <button className="relative text-slate-400 hover:text-white transition-colors p-2 rounded-full hover:bg-white/5">
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]"></span>
        </button>

        <div className="h-8 w-px bg-white/10 mx-2"></div>

        <div className="flex items-center gap-3 cursor-pointer group">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium text-white group-hover:text-emerald-300 transition-colors">Budi Pratama</p>
            <p className="text-xs text-slate-400">Sales Executive</p>
          </div>
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 p-0.5">
            <div className="w-full h-full rounded-full bg-[#0B0F14] flex items-center justify-center">
              <span className="text-xs font-bold text-emerald-400">BP</span>
            </div>
          </div>
        </div>
      </div>
      
    </header>
  )
}
