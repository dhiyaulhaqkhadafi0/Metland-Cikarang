'use client'

import React from 'react'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Users, AlertCircle, Trophy, Plus, ArrowRight } from 'lucide-react'

// Dummy data untuk awal (nantinya fetch dari Supabase)
const recentLeads = [
  { id: 1, name: 'Bapak Ahmad', project: 'Brassia Garden', status: 'baru', date: 'Hari ini, 09:30' },
  { id: 2, name: 'Ibu Sarah', project: 'Weston Gateway', status: 'kontak', date: 'Hari ini, 08:15' },
  { id: 3, name: 'Dr. Hendra', project: 'Brassia Garden', status: 'nego', date: 'Kemarin, 16:45' },
  { id: 4, name: 'Dimas Aditya', project: 'Weston Gateway', status: 'follow_up', date: 'Kemarin, 14:20' },
  { id: 5, name: 'Keluarga Wijaya', project: 'Brassia Garden', status: 'closing', date: '12 Jul 2026' },
]

export default function DashboardHome() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Halo, Budi Pratama 👋</h1>
          <p className="text-slate-400 mt-1">Selamat datang di Command Center. Berikut ringkasan performa Anda.</p>
        </div>
        <Link 
          href="/dashboard/leads/new"
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-semibold rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_25px_rgba(16,185,129,0.5)] transition-all duration-300 hover:-translate-y-0.5"
        >
          <Plus size={18} />
          Tambah Lead Baru
        </Link>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card glow className="relative overflow-hidden group">
          <div className="absolute -right-6 -top-6 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl group-hover:bg-blue-500/20 transition-all"></div>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-500/20 rounded-xl border border-blue-500/20">
                <Users className="text-blue-400" size={24} />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-400">Total Lead Saya</p>
                <h3 className="text-3xl font-bold text-white mt-1">128</h3>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden group">
          <div className="absolute -right-6 -top-6 w-32 h-32 bg-orange-500/10 rounded-full blur-2xl group-hover:bg-orange-500/20 transition-all"></div>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="p-3 bg-orange-500/20 rounded-xl border border-orange-500/20">
                <AlertCircle className="text-orange-400" size={24} />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-400">Perlu Follow-up</p>
                <h3 className="text-3xl font-bold text-white mt-1">12</h3>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden group">
          <div className="absolute -right-6 -top-6 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl group-hover:bg-emerald-500/20 transition-all"></div>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="p-3 bg-emerald-500/20 rounded-xl border border-emerald-500/20">
                <Trophy className="text-emerald-400" size={24} />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-400">Closing Bulan Ini</p>
                <h3 className="text-3xl font-bold text-emerald-400 mt-1">4</h3>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Leads */}
      <div className="pt-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-white">Lead Terbaru</h2>
          <Link href="/dashboard/leads" className="text-sm text-emerald-400 hover:text-emerald-300 font-medium flex items-center gap-1 group">
            Lihat Semua 
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <Card>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-white/[0.02] border-b border-white/10 text-slate-400 uppercase tracking-wider text-xs">
                <tr>
                  <th className="px-6 py-4 font-semibold">Nama Prospek</th>
                  <th className="px-6 py-4 font-semibold">Project</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                  <th className="px-6 py-4 font-semibold">Update Terakhir</th>
                  <th className="px-6 py-4 font-semibold text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {recentLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="px-6 py-4 font-medium text-white">{lead.name}</td>
                    <td className="px-6 py-4 text-slate-300">{lead.project}</td>
                    <td className="px-6 py-4">
                      <Badge variant={lead.status}>
                        {lead.status.replace('_', ' ').toUpperCase()}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-slate-400 text-xs">{lead.date}</td>
                    <td className="px-6 py-4 text-right">
                      <Link 
                        href={`/dashboard/leads/${lead.id}`}
                        className="inline-flex items-center justify-center px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white text-xs font-medium transition-colors opacity-0 group-hover:opacity-100"
                      >
                        Detail
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

    </div>
  )
}
