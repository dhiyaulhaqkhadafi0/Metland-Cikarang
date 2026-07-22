import React from 'react';
import { Search } from 'lucide-react';

interface LeadFiltersProps {
  searchTerm: string;
  setSearchTerm: (val: string) => void;
  filterProject: string;
  setFilterProject: (val: string) => void;
  filterStatus: string;
  setFilterStatus: (val: string) => void;
  filterDate: string;
  setFilterDate: (val: string) => void;
}

export default function LeadFilters({
  searchTerm, setSearchTerm,
  filterProject, setFilterProject,
  filterStatus, setFilterStatus,
  filterDate, setFilterDate
}: LeadFiltersProps) {
  return (
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
      <div className="flex gap-4 flex-wrap md:flex-nowrap">
        <select 
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
          className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-300 focus:outline-none focus:border-emerald-500/50 focus:bg-white/10 transition-all appearance-none cursor-pointer flex-1 md:flex-none"
        >
          <option value="all" className="bg-[#0B0F14]">Waktu</option>
          <option value="today" className="bg-[#0B0F14]">Hari Ini</option>
          <option value="week" className="bg-[#0B0F14]">Minggu Ini</option>
          <option value="month" className="bg-[#0B0F14]">Bulan Ini</option>
        </select>

        <select 
          value={filterProject}
          onChange={(e) => setFilterProject(e.target.value)}
          className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-300 focus:outline-none focus:border-emerald-500/50 focus:bg-white/10 transition-all appearance-none cursor-pointer flex-1 md:flex-none"
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
          <option value="General" className="bg-[#0B0F14] text-white">General (Kawasan)</option>
        </select>
        
        <select 
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-300 focus:outline-none focus:border-emerald-500/50 focus:bg-white/10 transition-all appearance-none cursor-pointer flex-1 md:flex-none"
        >
          <option value="all" className="bg-[#0B0F14]">Pipeline</option>
          <option value="New" className="bg-[#0B0F14]">New</option>
          <option value="Contacted" className="bg-[#0B0F14]">Contacted</option>
          <option value="Survey" className="bg-[#0B0F14]">Survey</option>
          <option value="Negotiation" className="bg-[#0B0F14]">Negotiation</option>
          <option value="Booked" className="bg-[#0B0F14]">Booked</option>
          <option value="Closing" className="bg-[#0B0F14]">Closing</option>
          <option value="Lost" className="bg-[#0B0F14]">Lost</option>
        </select>
      </div>
    </div>
  );
}
