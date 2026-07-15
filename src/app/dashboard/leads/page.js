'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Search, Filter, Plus, Phone, Mail, ArrowRight } from 'lucide-react'

// Dummy Data untuk Development
const allLeads = [
  { id: 1, name: 'Bapak Ahmad', phone: '081234567890', email: 'ahmad@gmail.com', project: 'Brassia Garden', source: 'Instagram Ads', status: 'baru', date: 'Hari ini, 09:30' },
  { id: 2, name: 'Ibu Sarah', phone: '085678901234', email: 'sarah.w@yahoo.com', project: 'Weston Gateway', source: 'Walk In', status: 'kontak', date: 'Hari ini, 08:15' },
  { id: 3, name: 'Dr. Hendra', phone: '081122334455', email: 'hendra.dr@clinic.co.id', project: 'Brassia Garden', source: 'Referral', status: 'nego', date: 'Kemarin, 16:45' },
  { id: 4, name: 'Dimas Aditya', phone: '082233445566', email: 'dimasaditya88@gmail.com', project: 'Weston Gateway', source: 'Facebook Ads', status: 'follow_up', date: 'Kemarin, 14:20' },
  { id: 5, name: 'Keluarga Wijaya', phone: '081998877665', email: '-', project: 'Brassia Garden', source: 'Organic', status: 'closing', date: '12 Jul 2026' },
  { id: 6, name: 'Andi Saputra', phone: '081223344556', email: 'andi.s@gmail.com', project: 'Brassia Garden', source: 'Tiktok', status: 'hilang', date: '10 Jul 2026' },
]

export default function LeadsInbox() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterProject, setFilterProject] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')

  // Logika Filter Sederhana
  const filteredLeads = allLeads.filter(lead => {
    const matchSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) || lead.phone.includes(searchTerm)
    const matchProject = filterProject === 'all' || lead.project.toLowerCase().includes(filterProject)
    const matchStatus = filterStatus === 'all' || lead.status === filterStatus
    return matchSearch && matchProject && matchStatus
  })

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Lead Inbox</h1>
          <p className="text-slate-400 mt-1">Kelola dan pantau semua prospek Anda di sini.</p>
        </div>
        <Link 
          href="/dashboard/leads/new"
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-semibold rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all duration-300 hover:-translate-y-0.5"
        >
          <Plus size={18} />
          Tambah Lead
        </Link>
      </div>

      {/* Toolbar: Search & Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input 
            type="text"
            placeholder="Cari nama atau nomor HP..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500/50 focus:bg-white/10 transition-all"
          />
        </div>
        <div className="flex gap-4">
          <select 
            value={filterProject}
            onChange={(e) => setFilterProject(e.target.value)}
            className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-300 focus:outline-none focus:border-emerald-500/50 focus:bg-white/10 transition-all appearance-none pr-8 relative cursor-pointer"
          >
            <option value="all" className="bg-[#0B0F14]">Semua Project</option>
            <option value="brassia" className="bg-[#0B0F14]">Brassia Garden</option>
            <option value="weston" className="bg-[#0B0F14]">Weston Gateway</option>
          </select>
          
          <select 
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-300 focus:outline-none focus:border-emerald-500/50 focus:bg-white/10 transition-all appearance-none pr-8 cursor-pointer"
          >
            <option value="all" className="bg-[#0B0F14]">Semua Status</option>
            <option value="baru" className="bg-[#0B0F14]">Baru</option>
            <option value="kontak" className="bg-[#0B0F14]">Kontak</option>
            <option value="follow_up" className="bg-[#0B0F14]">Follow-up</option>
            <option value="nego" className="bg-[#0B0F14]">Nego</option>
            <option value="closing" className="bg-[#0B0F14]">Closing</option>
            <option value="hilang" className="bg-[#0B0F14]">Hilang</option>
          </select>
        </div>
      </div>

      {/* Leads Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-white/[0.02] border-b border-white/10 text-slate-400 uppercase tracking-wider text-xs">
              <tr>
                <th className="px-6 py-4 font-semibold">Kontak Prospek</th>
                <th className="px-6 py-4 font-semibold">Project & Sumber</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold">Update Terakhir</th>
                <th className="px-6 py-4 font-semibold text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredLeads.length > 0 ? (
                filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-white/[0.03] transition-colors group">
                    <td className="px-6 py-4">
                      <div className="font-semibold text-white mb-1">{lead.name}</div>
                      <div className="flex items-center gap-3 text-xs text-slate-400">
                        <span className="flex items-center gap-1"><Phone size={12} /> {lead.phone}</span>
                        {lead.email !== '-' && <span className="flex items-center gap-1"><Mail size={12} /> {lead.email}</span>}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-slate-200 mb-1">{lead.project}</div>
                      <div className="text-xs text-slate-400">{lead.source}</div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant={lead.status}>
                        {lead.status.replace('_', ' ').toUpperCase()}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-slate-400 text-xs">
                      {lead.date}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link 
                        href={`/dashboard/leads/${lead.id}`}
                        className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 text-xs font-semibold transition-colors opacity-0 group-hover:opacity-100 border border-emerald-500/20"
                      >
                        Buka Detail
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                    Tidak ada lead yang ditemukan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
      
    </div>
  )
}
