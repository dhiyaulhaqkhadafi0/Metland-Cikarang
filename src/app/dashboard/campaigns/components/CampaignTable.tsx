"use client";

import React from 'react';
import { Card } from '@/components/ui/Card';
import { BarChart3, ExternalLink } from 'lucide-react';

export default function CampaignTable({ campaigns }: { campaigns: any[] }) {
  return (
    <Card>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-white/[0.02] border-b border-white/10 text-slate-400 uppercase tracking-wider text-xs">
            <tr>
              <th className="px-6 py-4 font-semibold">Detail Kampanye</th>
              <th className="px-6 py-4 font-semibold">Shortlink</th>
              <th className="px-6 py-4 font-semibold text-center">Total Klik</th>
              <th className="px-6 py-4 font-semibold">Tujuan</th>
              <th className="px-6 py-4 font-semibold text-right">Dibuat Pada</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {campaigns.length > 0 ? campaigns.map((camp) => (
              <tr key={camp.id} className="hover:bg-white/[0.02] transition-colors group">
                <td className="px-6 py-4">
                  <div className="font-semibold text-white mb-1">{camp.campaign_name}</div>
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10">{camp.platform}</span>
                    <span>oleh {camp.sales_name}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <a href={`/go/${camp.short_code}`} target="_blank" className="font-mono text-emerald-400 flex items-center gap-2 hover:underline">
                    smmc.id/go/{camp.short_code}
                    <ExternalLink size={12} />
                  </a>
                </td>
                <td className="px-6 py-4 text-center">
                  <div className="inline-flex items-center justify-center gap-2 px-3 py-1 bg-blue-500/10 text-blue-400 rounded-lg border border-blue-500/20 font-bold">
                    <BarChart3 size={14} />
                    {camp.total_clicks}
                  </div>
                </td>
                <td className="px-6 py-4 text-slate-300">
                  {camp.cluster}
                </td>
                <td className="px-6 py-4 text-right text-slate-400 text-xs">
                  {new Date(camp.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                  Belum ada tautan kampanye yang dibuat.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
