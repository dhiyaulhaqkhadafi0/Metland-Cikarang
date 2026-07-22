import React from 'react'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/Card'
import { Users, AlertCircle, Trophy, Plus, ArrowRight } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic';

export default async function DashboardHome() {
  const supabase = await createClient()
  
  // Fetch real data from Supabase
  const { data: rawLeads } = await supabase
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false });
  
  const allLeads = (rawLeads || []).map((l: any) => ({
    ...l,
    name: l.name || l.full_name || 'Pengunjung Web (CTA WA)',
    phone: l.phone || '-',
    interest_cluster: l.interest_cluster || l.project || 'Brassia Garden',
    budget: l.budget || l.budget_range || null,
    status: l.status === 'baru' ? 'New' : l.status === 'follow_up' ? 'Contacted' : l.status === 'closing' ? 'Closing' : (l.status || 'New'),
  }));
  
  // Hitung metrik
  const totalLeads = allLeads.length;
  const needFollowUp = allLeads.filter(l => l.status === 'New').length;
  
  // Closing bulan ini
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const closingThisMonth = allLeads.filter(l => {
    if (l.status !== 'Closing' && l.status !== 'closing') return false;
    const date = new Date(l.created_at);
    return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
  }).length;

  const recentLeads = allLeads.slice(0, 5);

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'New': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'Contacted': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
      case 'Survey': return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
      case 'Negotiation': return 'bg-orange-500/10 text-orange-400 border-orange-500/20';
      case 'Booked': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'Closing': return 'bg-green-500/10 text-green-400 border-green-500/20';
      case 'Lost': return 'bg-red-500/10 text-red-400 border-red-500/20';
      default: return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Halo, Tim Sales 👋</h1>
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
                <p className="text-sm font-medium text-slate-400">Total Lead Masuk</p>
                <h3 className="text-3xl font-bold text-white mt-1">{totalLeads}</h3>
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
                <p className="text-sm font-medium text-slate-400">Baru (New)</p>
                <h3 className="text-3xl font-bold text-white mt-1">{needFollowUp}</h3>
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
                <h3 className="text-3xl font-bold text-emerald-400 mt-1">{closingThisMonth}</h3>
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
                  <th className="px-6 py-4 font-semibold">Sumber Traffic</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                  <th className="px-6 py-4 font-semibold">Waktu Masuk</th>
                  <th className="px-6 py-4 font-semibold text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {recentLeads.length > 0 ? recentLeads.map((lead: any) => (
                  <tr key={lead.id} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="px-6 py-4 font-medium text-white">{lead.name || <span className="text-slate-500 italic">Belum Ada Nama</span>}</td>
                    <td className="px-6 py-4 text-slate-300">{lead.utm_source || 'Organic'}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-md text-xs font-medium border ${getStatusColor(lead.status)}`}>
                        {lead.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-400 text-xs">
                      {new Date(lead.created_at).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' })}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link 
                        href={`/dashboard/leads/${lead.id}`}
                        className="inline-flex items-center justify-center px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white text-xs font-medium transition-colors opacity-0 group-hover:opacity-100"
                      >
                        Detail
                      </Link>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                      Belum ada lead masuk di tabel.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

    </div>
  )
}
