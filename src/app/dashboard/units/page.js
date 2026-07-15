'use client'

import React, { useState } from 'react'
import { Card, CardContent } from '@/components/ui/Card'
import { Search, Building2, Home } from 'lucide-react'

// Dummy Data Unit
const allUnits = [
  { id: 1, project: 'Brassia Garden', cluster: 'Cluster A', unit_number: 'A-01', type: 'Rumah Tipe 45', status: 'available', price: 'Rp 850.000.000' },
  { id: 2, project: 'Brassia Garden', cluster: 'Cluster A', unit_number: 'A-02', type: 'Rumah Tipe 45', status: 'booked', price: 'Rp 850.000.000' },
  { id: 3, project: 'Brassia Garden', cluster: 'Cluster B', unit_number: 'B-15', type: 'Rumah Tipe 60', status: 'sold', price: 'Rp 1.150.000.000' },
  { id: 4, project: 'Brassia Garden', cluster: 'Cluster B', unit_number: 'B-16', type: 'Rumah Tipe 60', status: 'available', price: 'Rp 1.150.000.000' },
  { id: 5, project: 'Weston Gateway', cluster: 'Blok Barat', unit_number: 'W-01', type: 'Ruko 3 Lantai', status: 'available', price: 'Rp 3.500.000.000' },
  { id: 6, project: 'Weston Gateway', cluster: 'Blok Barat', unit_number: 'W-02', type: 'Ruko 3 Lantai', status: 'booked', price: 'Rp 3.500.000.000' },
  { id: 7, project: 'Weston Gateway', cluster: 'Blok Timur', unit_number: 'E-05', type: 'Ruko 2 Lantai', status: 'available', price: 'Rp 2.800.000.000' },
]

export default function UnitsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterProject, setFilterProject] = useState('all')

  const filteredUnits = allUnits.filter(unit => {
    const matchSearch = unit.unit_number.toLowerCase().includes(searchTerm.toLowerCase()) || unit.cluster.toLowerCase().includes(searchTerm.toLowerCase())
    const matchProject = filterProject === 'all' || (filterProject === 'brassia' && unit.project.includes('Brassia')) || (filterProject === 'weston' && unit.project.includes('Weston'))
    return matchSearch && matchProject
  })

  // Helper untuk Status Badge Unit
  const getUnitBadge = (status) => {
    if (status === 'available') return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">Available</span>
    if (status === 'booked') return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-yellow-500/20 text-yellow-400 border border-yellow-500/30">Booked</span>
    if (status === 'sold') return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-500/20 text-red-400 border border-red-500/30">Sold</span>
    return null
  }

  // Statistik Cepat
  const totalAvailable = filteredUnits.filter(u => u.status === 'available').length
  const totalBooked = filteredUnits.filter(u => u.status === 'booked').length

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Ketersediaan Unit</h1>
          <p className="text-slate-400 mt-1">Cek status unit Brassia Garden dan Weston Gateway secara real-time.</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col items-center justify-center text-center">
          <p className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-1">Total Unit (Filtered)</p>
          <p className="text-2xl font-bold text-white">{filteredUnits.length}</p>
        </div>
        <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 flex flex-col items-center justify-center text-center">
          <p className="text-xs text-emerald-400 font-medium uppercase tracking-wider mb-1">Available</p>
          <p className="text-2xl font-bold text-emerald-400">{totalAvailable}</p>
        </div>
        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4 flex flex-col items-center justify-center text-center">
          <p className="text-xs text-yellow-400 font-medium uppercase tracking-wider mb-1">Booked</p>
          <p className="text-2xl font-bold text-yellow-400">{totalBooked}</p>
        </div>
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 flex flex-col items-center justify-center text-center">
          <p className="text-xs text-red-400 font-medium uppercase tracking-wider mb-1">Sold</p>
          <p className="text-2xl font-bold text-red-400">{filteredUnits.length - totalAvailable - totalBooked}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input 
            type="text"
            placeholder="Cari Nomor Unit atau Klaster..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500/50 focus:bg-white/10 transition-all"
          />
        </div>
        <div className="flex gap-4">
          <select 
            value={filterProject}
            onChange={(e) => setFilterProject(e.target.value)}
            className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-300 focus:outline-none focus:border-emerald-500/50 focus:bg-white/10 transition-all appearance-none pr-8 cursor-pointer"
          >
            <option value="all" className="bg-[#0B0F14]">Semua Project</option>
            <option value="brassia" className="bg-[#0B0F14]">Brassia Garden (Residensial)</option>
            <option value="weston" className="bg-[#0B0F14]">Weston Gateway (Komersial)</option>
          </select>
        </div>
      </div>

      {/* Units Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-white/[0.02] border-b border-white/10 text-slate-400 uppercase tracking-wider text-xs">
              <tr>
                <th className="px-6 py-4 font-semibold">Nomor Unit</th>
                <th className="px-6 py-4 font-semibold">Tipe & Klaster</th>
                <th className="px-6 py-4 font-semibold">Project</th>
                <th className="px-6 py-4 font-semibold">Harga (Estimasi)</th>
                <th className="px-6 py-4 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredUnits.length > 0 ? (
                filteredUnits.map((unit) => (
                  <tr key={unit.id} className="hover:bg-white/[0.03] transition-colors group">
                    <td className="px-6 py-4">
                      <div className="font-bold text-white text-base">{unit.unit_number}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-slate-200 mb-1">{unit.type}</div>
                      <div className="text-xs text-slate-400">{unit.cluster}</div>
                    </td>
                    <td className="px-6 py-4 text-slate-300">
                      <div className="flex items-center gap-2">
                        {unit.project.includes('Brassia') ? <Home size={14} className="text-emerald-400" /> : <Building2 size={14} className="text-blue-400" />}
                        {unit.project}
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium text-emerald-400">
                      {unit.price}
                    </td>
                    <td className="px-6 py-4">
                      {getUnitBadge(unit.status)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                    Tidak ada unit yang cocok dengan pencarian Anda.
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
