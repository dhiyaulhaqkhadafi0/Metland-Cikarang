'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Bell, Menu, Settings, LogOut, ChevronDown, PanelLeftClose, PanelLeftOpen } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

export function TopBar({ isCollapsed, onToggleCollapse }: { isCollapsed?: boolean; onToggleCollapse?: () => void }) {
  const router = useRouter()
  const supabase = createClient()
  
  const [user, setUser] = useState<any>(null)
  const [displayName, setDisplayName] = useState('Sales Executive')
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null)
  const [initials, setInitials] = useState('SE')
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    async function loadUser() {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        setUser(user)
        const metaName = user.user_metadata?.full_name || user.user_metadata?.name
        let formattedName = metaName
        
        if (!formattedName && user.email) {
          const username = user.email.split('@')[0].replace(/[0-9_]/g, ' ')
          formattedName = username.split(' ').map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ').trim()
        }
        
        const finalName = formattedName || 'Sales Executive'
        setDisplayName(finalName)
        
        // Read avatar exclusively from localStorage to avoid 494 Vercel header error
        const localAvatar = localStorage.getItem('sales_avatar_url')
        if (localAvatar) {
          setAvatarUrl(localAvatar)
        } else {
          setAvatarUrl(null)
        }
        
        const parts = finalName.trim().split(' ')
        const inits = parts.length > 1 ? (parts[0][0] + parts[1][0]) : (parts[0][0] || 'S')
        setInitials(inits.toUpperCase())
      }
    }
    loadUser()

    const handleAvatarUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<string | null>;
      if (customEvent.detail !== undefined) {
        setAvatarUrl(customEvent.detail);
      } else {
        const local = localStorage.getItem('sales_avatar_url');
        setAvatarUrl(local);
      }
    };

    window.addEventListener('avatar_updated', handleAvatarUpdate);
    return () => {
      window.removeEventListener('avatar_updated', handleAvatarUpdate);
    };
  }, [])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
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
      
      <div className="flex items-center gap-3">
        {/* Toggle Sidebar Button (Desktop) */}
        <button 
          onClick={onToggleCollapse}
          title={isCollapsed ? "Buka Sidebar Navigation" : "Tutup Sidebar Navigation"}
          className="hidden md:flex p-2 text-slate-400 hover:text-emerald-400 hover:bg-white/5 rounded-lg transition-colors border border-white/5"
        >
          {isCollapsed ? <PanelLeftOpen size={20} /> : <PanelLeftClose size={20} />}
        </button>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-slate-400 hover:text-white transition-colors">
          <Menu size={20} />
        </button>
      </div>

      {/* Right side icons & Profile */}
      <div className="flex items-center gap-4 ml-auto">
        <button className="relative text-slate-400 hover:text-white transition-colors p-2 rounded-full hover:bg-white/5">
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]"></span>
        </button>

        <div className="h-8 w-px bg-white/10 mx-1"></div>

        {/* Compact Profile Avatar-Only Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 cursor-pointer group focus:outline-none p-1 rounded-full hover:bg-white/5 transition-all"
            title={displayName}
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 p-0.5 shadow-[0_0_15px_rgba(16,185,129,0.2)] group-hover:scale-105 transition-transform">
              <div className="w-full h-full rounded-full bg-[#0B0F14] flex items-center justify-center overflow-hidden">
                {avatarUrl ? (
                  <img src={avatarUrl} alt={displayName} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-xs font-bold text-emerald-400">{initials}</span>
                )}
              </div>
            </div>
            <ChevronDown size={14} className={`text-slate-400 group-hover:text-white transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
          </button>

          {isOpen && (
            <div className="absolute right-0 mt-2 w-60 bg-[#141b25] border border-white/10 rounded-xl shadow-2xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="px-4 py-3 border-b border-white/10">
                <p className="text-sm font-bold text-white truncate">{displayName}</p>
                <p className="text-xs text-slate-400 truncate mt-0.5">{user?.email || 'Sales Executive'}</p>
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
