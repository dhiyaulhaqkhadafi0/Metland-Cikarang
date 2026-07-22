'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Search, Bell, Menu, Settings, LogOut, ChevronDown } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

export function TopBar() {
  const router = useRouter()
  const supabase = createClient()
  
  const [user, setUser] = useState(null)
  const [displayName, setDisplayName] = useState('Sales Executive')
  const [initials, setInitials] = useState('SE')
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    async function loadUser() {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        setUser(user)
        const metaName = user.user_metadata?.full_name || user.user_metadata?.name
        let formattedName = metaName
        
        if (!formattedName && user.email) {
          // Format email daffakhadafi692@gmail.com -> Daffa Khadafi
          const username = user.email.split('@')[0].replace(/[0-9_]/g, ' ')
          formattedName = username.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ').trim()
        }
        
        const finalName = formattedName || 'Sales Executive'
        setDisplayName(finalName)
        
        // Generate Inisial (misal Daffa Khadafi -> DK)
        const parts = finalName.trim().split(' ')
        const inits = parts.length > 1 ? (parts[0][0] + parts[1][0]) : (parts[0][0] || 'S')
        setInitials(inits.toUpperCase())
      }
    }
    loadUser()
  }, [])

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

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

        {/* Profile Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-3 cursor-pointer group focus:outline-none"
          >
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-white group-hover:text-emerald-300 transition-colors">{displayName}</p>
              <p className="text-xs text-slate-400 truncate max-w-[150px]">{user?.email || 'Sales Executive'}</p>
            </div>
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 p-0.5">
              <div className="w-full h-full rounded-full bg-[#0B0F14] flex items-center justify-center">
                <span className="text-xs font-bold text-emerald-400">{initials}</span>
              </div>
            </div>
            <ChevronDown size={14} className={`text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </button>

          {isOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-[#141b25] border border-white/10 rounded-xl shadow-2xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="px-4 py-3 border-b border-white/10">
                <p className="text-xs text-slate-400">Masuk sebagai</p>
                <p className="text-sm font-bold text-white truncate">{user?.email || displayName}</p>
              </div>

              <Link 
                href="/dashboard/settings"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
              >
                <Settings size={16} className="text-emerald-400" />
                Pengaturan Akun
              </Link>

              <button 
                onClick={handleLogout}
                className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10 transition-colors w-full text-left"
              >
                <LogOut size={16} />
                Keluar (Logout)
              </button>
            </div>
          )}
        </div>
      </div>
      
    </header>
  )
}
