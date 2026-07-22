"use client";

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/Card';
import { Users, AlertCircle, Trophy, Plus, ArrowRight, Search, Filter, RotateCcw, Calendar, Building2, Tag } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

export default function HomeDashboardClient({ initialLeads }: { initialLeads: any[] }) {
  const supabase = createClient();
  const [userName, setUserName] = useState('Sales Executive');
  
  // Filter States
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [clusterFilter, setClusterFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');

  useEffect(() => {
    async function getUserName() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const metaName = user.user_metadata?.full_name || user.user_metadata?.name;
        if (metaName) {
          setUserName(metaName);
        } else if (user.email) {
          const formatted = user.email.split('@')[0].replace(/[0-9_]/g, ' ')
            .split(' ').map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ').trim();
          setUserName(formatted || 'Sales Executive');
        }
      }
    }
    getUserName();
  }, []);

  // Filtered Leads Calculation
  const filteredLeads = useMemo(() => {
    return initialLeads.filter(lead => {
      // 1. Search Term (Nama, Phone, Campaign Code, UTM)
      const term = searchTerm.toLowerCase();
      const matchSearch = !term || 
        (lead.name || '').toLowerCase().includes(term) ||
        (lead.phone || '').includes(term) ||
        (lead.utm_source || '').toLowerCase().includes(term) ||
        (lead.campaign_code || '').toLowerCase().includes(term);

      // 2. Status Filter
      const matchStatus = statusFilter === 'all' || lead.status === statusFilter || 
        (statusFilter === 'New' && (lead.status === 'New' || lead.status === 'baru'));

      // 3. Cluster / Sub-cluster Filter
      const clusterStr = (lead.interest_cluster || lead.project || '').toLowerCase();
      const matchCluster = clusterFilter === 'all' || clusterStr.includes(clusterFilter.toLowerCase());

      // 4. Date Filter
      let matchDate = true;
      if (dateFilter !== 'all') {
        const leadDate = new Date(lead.created_at);
        const now = new Date();
        if (dateFilter === 'today') {
          matchDate = leadDate.toDateString() === now.toDateString();
        } else if (dateFilter === 'week') {
          const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          matchDate = leadDate >= oneWeekAgo;
        } else if (dateFilter === 'month') {
          matchDate = leadDate.getMonth() === now.getMonth() && leadDate.getFullYear() === now.getFullYear();
        }
      }

      return matchSearch && matchStatus && matchCluster && matchDate;
    });
  }, [initialLeads, searchTerm, statusFilter, clusterFilter, dateFilter]);

  const hasActiveFilters = searchTerm || statusFilter !== 'all' || clusterFilter !== 'all' || dateFilter !== 'all';

  const resetFilters = () => {
    setSearchTerm('');
    setStatusFilter('all');
    setClusterFilter('all');
    setDateFilter('all');
  };

  // Metrics Calculations
  const totalLeads = initialLeads.length;
  const needFollowUp = initialLeads.filter(l => l.status === 'New' || l.status === 'baru').length;
  
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const closingThisMonth = initialLeads.filter(l => {
    if (l.status !== 'Closing' && l.status !== 'closing') return false;
    const date = new Date(l.created_at);
    return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
  }).length;

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'New':
      case 'baru': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'Contacted':
      case 'follow_up': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
      case 'Survey': return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
      case 'Negotiation': return 'bg-orange-500/10 text-orange-400 border-orange-500/20';
      case 'Booked': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'Closing':
      case 'closing': return 'bg-green-500/10 text-green-400 border-green-500/20';
      case 'Lost': return 'bg-red-500/10 text-red-400 border-red-500/20';
      default: return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Header Section with Personalized Greeting */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">
            Halo, <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">{userName}</span> 👋
          </h1>
          <p className="text-slate-400 mt-1">Selamat datang di Command Center. Berikut ringkasan performa penjualan Anda.</p>
        </div>
        <Link 
          href="/dashboard/leads/new"
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-semibold rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_25px_rgba(16,185,129,0.5)] transition-all duration-300 hover:-translate-y-0.5"
        >
          <Plus size={18} />
          Tambah Lead Baru
        </Link>
      </div>

      {/* Summary Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card glow className="relative overflow-hidden group border-white/10 bg-[#0B0F14]">
          <div className="absolute -right-6 -top-6 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl group-hover:bg-blue-500/20 transition-all"></div>
          <CardContent className="p-6">
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

        <Card className="relative overflow-hidden group border-white/10 bg-[#0B0F14]">
          <div className="absolute -right-6 -top-6 w-32 h-32 bg-orange-500/10 rounded-full blur-2xl group-hover:bg-orange-500/20 transition-all"></div>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-orange-500/20 rounded-xl border border-orange-500/20">
                <AlertCircle className="text-orange-400" size={24} />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-400">Baru Masuk (New)</p>
                <h3 className="text-3xl font-bold text-white mt-1">{needFollowUp}</h3>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden group border-white/10 bg-[#0B0F14]">
          <div className="absolute -right-6 -top-6 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl group-hover:bg-emerald-500/20 transition-all"></div>
          <CardContent className="p-6">
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

      {/* Prominent Smart Search & Multi-Filter Bar */}
      <Card className="p-5 border-white/10 bg-[#0B0F14] shadow-2xl relative overflow-hidden">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Filter size={18} className="text-emerald-400" />
            <h3 className="text-base font-bold text-white">Smart Search & Filter Bar</h3>
          </div>
          {hasActiveFilters && (
            <button 
              onClick={resetFilters}
              className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-emerald-400 transition-colors bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-lg border border-white/10"
            >
              <RotateCcw size={12} /> Reset Filter
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          {/* 1. Wide Text Search Input */}
          <div className="relative md:col-span-1">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Cari nama, HP, atau campaign..."
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500/50 focus:bg-white/10 transition-all"
            />
          </div>

          {/* 2. Status Filter Select */}
          <div className="relative">
            <Tag size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500/50 transition-all appearance-none cursor-pointer"
            >
              <option value="all" className="bg-[#0B0F14]">Pipeline</option>
              <option value="New" className="bg-[#0B0F14]">Baru Masuk (New)</option>
              <option value="Contacted" className="bg-[#0B0F14]">Sudah Dihubungi</option>
              <option value="Survey" className="bg-[#0B0F14]">Survei Lokasi</option>
              <option value="Negotiation" className="bg-[#0B0F14]">Negosiasi</option>
              <option value="Booked" className="bg-[#0B0F14]">Booking Fee</option>
              <option value="Closing" className="bg-[#0B0F14]">Sukses Closing</option>
              <option value="Lost" className="bg-[#0B0F14]">Gagal (Lost)</option>
            </select>
          </div>

          {/* 3. Sub-cluster / Product Filter Select */}
          <div className="relative">
            <Building2 size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            <select
              value={clusterFilter}
              onChange={(e) => setClusterFilter(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500/50 transition-all appearance-none cursor-pointer"
            >
              <option value="all" className="bg-[#0B0F14]">Type Unit</option>
              <optgroup label="Avesa Garden" className="bg-[#0B0F14] text-emerald-400 font-bold">
                <option value="Canary (Tipe 22/72)" className="bg-[#0B0F14] text-white">Canary - Tipe 22/72</option>
                <option value="Canary (Tipe 30/72)" className="bg-[#0B0F14] text-white">Canary - Tipe 30/72</option>
                <option value="Derora (Tipe 33/72)" className="bg-[#0B0F14] text-white">Derora - Tipe 33/72</option>
                <option value="Derora (Tipe 59/84)" className="bg-[#0B0F14] text-white">Derora - Tipe 59/84</option>
              </optgroup>
              <optgroup label="Brassia Garden" className="bg-[#0B0F14] text-emerald-400 font-bold">
                <option value="Myzora (Tipe 33/72)" className="bg-[#0B0F14] text-white">Myzora - Tipe 33/72</option>
                <option value="Myzora (Tipe 45/72)" className="bg-[#0B0F14] text-white">Myzora - Tipe 45/72</option>
                <option value="Myzora (Tipe 56/84)" className="bg-[#0B0F14] text-white">Myzora - Tipe 56/84</option>
                <option value="Myzora (Tipe 77/98)" className="bg-[#0B0F14] text-white">Myzora - Tipe 77/98</option>
                <option value="Ellyra (Tipe 45/72)" className="bg-[#0B0F14] text-white">Ellyra - Tipe 45/72</option>
                <option value="Ellyra (Tipe 56/84)" className="bg-[#0B0F14] text-white">Ellyra - Tipe 56/84</option>
                <option value="Ellyra (Tipe 56/98)" className="bg-[#0B0F14] text-white">Ellyra - Tipe 56/98</option>
                <option value="Brassia Garden" className="bg-[#0B0F14] text-white">Brassia (General)</option>
              </optgroup>
              <optgroup label="Komersial" className="bg-[#0B0F14] text-emerald-400 font-bold">
                <option value="Ruko Easton" className="bg-[#0B0F14] text-white">Ruko Easton</option>
                <option value="Weston Gateway" className="bg-[#0B0F14] text-white">Weston Gateway</option>
              </optgroup>
            </select>
          </div>

          {/* 4. Date Range Select */}
          <div className="relative">
            <Calendar size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500/50 transition-all appearance-none cursor-pointer"
            >
              <option value="all" className="bg-[#0B0F14]">Waktu</option>
              <option value="today" className="bg-[#0B0F14]">Hari Ini</option>
              <option value="week" className="bg-[#0B0F14]">7 Hari Terakhir</option>
              <option value="month" className="bg-[#0B0F14]">Bulan Ini</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Recent Leads Table */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-bold text-white">Lead Terbaru & Hasil Filter</h2>
            <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
              {filteredLeads.length} Prospek
            </span>
          </div>
          <Link href="/dashboard/leads" className="text-sm text-emerald-400 hover:text-emerald-300 font-medium flex items-center gap-1 group">
            Buka Inbox Lengkap 
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <Card>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-white/[0.02] border-b border-white/10 text-slate-400 uppercase tracking-wider text-xs">
                <tr>
                  <th className="px-6 py-4 font-semibold">Nama Prospek</th>
                  <th className="px-6 py-4 font-semibold">Sub-cluster / Project</th>
                  <th className="px-6 py-4 font-semibold">Sumber Traffic</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                  <th className="px-6 py-4 font-semibold">Waktu Masuk</th>
                  <th className="px-6 py-4 font-semibold text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredLeads.length > 0 ? filteredLeads.slice(0, 10).map((lead: any) => (
                  <tr key={lead.id} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="px-6 py-4">
                      <div className="font-semibold text-white mb-0.5">{lead.name || <span className="text-slate-500 italic">Belum Ada Nama</span>}</div>
                      <div className="text-xs text-slate-400 font-mono">{lead.phone || '-'}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 rounded-md text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        {lead.interest_cluster || lead.project || 'General'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-300">
                      <div>{lead.utm_source || 'Organic'}</div>
                      {lead.campaign_code && <div className="text-[10px] text-slate-500 font-mono">Ref: {lead.campaign_code}</div>}
                    </td>
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
                        className="inline-flex items-center justify-center px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white text-xs font-medium transition-colors border border-white/10"
                      >
                        Detail
                      </Link>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                      Tidak ada lead yang cocok dengan filter pencarian ini.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

    </div>
  );
}
