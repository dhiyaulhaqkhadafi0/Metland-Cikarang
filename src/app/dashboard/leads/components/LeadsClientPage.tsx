"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import LeadMetrics from './LeadMetrics';
import LeadFilters from './LeadFilters';
import LeadTable from './LeadTable';

export interface Lead {
  id: string;
  created_at: string;
  name: string | null;
  phone: string | null;
  interest_cluster: string | null;
  budget: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_content: string | null;
  utm_term: string | null;
  landing_page: string | null;
  full_url: string | null;
  referrer: string | null;
  device: string | null;
  status: string;
  whatsapp_clicked: boolean;
}

export default function LeadsClientPage({ initialLeads }: { initialLeads: Lead[] }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterProject, setFilterProject] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterDate, setFilterDate] = useState('all');

  const filteredLeads = useMemo(() => {
    return initialLeads.filter(lead => {
      const matchSearch = 
        (lead.name || '').toLowerCase().includes(searchTerm.toLowerCase()) || 
        (lead.phone || '').includes(searchTerm);
      const matchProject = filterProject === 'all' || (lead.interest_cluster || '').toLowerCase().includes(filterProject.toLowerCase());
      const matchStatus = filterStatus === 'all' || lead.status === filterStatus;
      
      let matchDate = true;
      if (filterDate !== 'all') {
        const leadDate = new Date(lead.created_at);
        const now = new Date();
        if (filterDate === 'today') {
          matchDate = leadDate.toDateString() === now.toDateString();
        } else if (filterDate === 'week') {
          const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          matchDate = leadDate >= oneWeekAgo;
        } else if (filterDate === 'month') {
          matchDate = leadDate.getMonth() === now.getMonth() && leadDate.getFullYear() === now.getFullYear();
        }
      }

      return matchSearch && matchProject && matchStatus && matchDate;
    });
  }, [initialLeads, searchTerm, filterProject, filterStatus, filterDate]);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">SMMC Lead Inbox</h1>
          <p className="text-slate-400 mt-1">Sistem analitik prospek masuk dari seluruh sumber marketing Metland.</p>
        </div>
        <Link 
          href="/dashboard/leads/new"
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-semibold rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all duration-300 hover:-translate-y-0.5"
        >
          <Plus size={18} />
          Tambah Lead Manual
        </Link>
      </div>

      <LeadMetrics leads={initialLeads} />

      <LeadFilters 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filterProject={filterProject}
        setFilterProject={setFilterProject}
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
        filterDate={filterDate}
        setFilterDate={setFilterDate}
      />

      <LeadTable leads={filteredLeads} />
    </div>
  );
}
