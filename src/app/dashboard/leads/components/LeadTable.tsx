import React from 'react';
import { Card } from '@/components/ui/Card';
import { Phone, User } from 'lucide-react';
import Link from 'next/link';
import { Lead } from './LeadsClientPage';

export default function LeadTable({ leads }: { leads: Lead[] }) {
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
    <Card>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-white/[0.02] border-b border-white/10 text-slate-400 uppercase tracking-wider text-xs">
            <tr>
              <th className="px-6 py-4 font-semibold">Kontak Prospek</th>
              <th className="px-6 py-4 font-semibold">Sumber Traffic (UTM)</th>
              <th className="px-6 py-4 font-semibold">Status</th>
              <th className="px-6 py-4 font-semibold">Waktu Masuk</th>
              <th className="px-6 py-4 font-semibold text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {leads.length > 0 ? (
              leads.map((lead) => (
                <tr key={lead.id} className="hover:bg-white/[0.03] transition-colors group">
                  <td className="px-6 py-4">
                    <div className="font-semibold text-white mb-1 flex items-center gap-2">
                      <User size={14} className="text-slate-400"/> 
                      {lead.name ? lead.name : <span className="text-slate-500 italic">Belum Ada Nama</span>}
                    </div>
                    <div className="flex items-center gap-3 text-xs text-slate-400">
                      <span className="flex items-center gap-1">
                        <Phone size={12} /> {lead.phone || '-'}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-slate-200 mb-1">
                      {lead.utm_source ? `${lead.utm_source} ${lead.utm_medium ? `/ ${lead.utm_medium}` : ''}` : 'Organic / Direct'}
                    </div>
                    <div className="text-xs text-slate-400">
                      Camp: {lead.utm_campaign || '-'}
                    </div>
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
                  Tidak ada lead yang ditemukan pada kriteria ini.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
