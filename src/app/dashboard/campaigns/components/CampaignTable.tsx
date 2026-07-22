"use client";

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { BarChart3, ExternalLink, Copy, Check, Target } from 'lucide-react';

export default function CampaignTable({ campaigns }: { campaigns: any[] }) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyShortlink = (code: string, id: string) => {
    const origin = typeof window !== 'undefined' ? window.location.origin : 'https://metland.id';
    const link = `${origin}/go/${code}`;
    navigator.clipboard.writeText(link);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <Card className="border-white/10 bg-[#0B0F14] shadow-2xl">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-white/[0.02] border-b border-white/10 text-slate-400 uppercase tracking-wider text-xs">
            <tr>
              <th className="px-6 py-4 font-semibold">Detail Kampanye Iklan</th>
              <th className="px-6 py-4 font-semibold">Shortlink Unik</th>
              <th className="px-6 py-4 font-semibold">Tracking Pixel</th>
              <th className="px-6 py-4 font-semibold text-center">Total Klik</th>
              <th className="px-6 py-4 font-semibold">Target Sub-cluster</th>
              <th className="px-6 py-4 font-semibold text-right">Dibuat Pada</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {campaigns.length > 0 ? campaigns.map((camp) => (
              <tr key={camp.id} className="hover:bg-white/[0.02] transition-colors group">
                <td className="px-6 py-4">
                  <div className="font-semibold text-white mb-1 flex items-center gap-2">
                    {camp.campaign_name}
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {camp.platform}
                    </span>
                  </div>
                  <div className="text-xs text-slate-400">
                    Oleh: <span className="text-slate-300 font-medium">{camp.sales_name}</span>
                  </div>
                  {camp.original_url && (
                    <div className="text-[11px] text-slate-500 font-mono truncate max-w-xs mt-0.5">
                      Target: {camp.original_url}
                    </div>
                  )}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <a href={`/go/${camp.short_code}`} target="_blank" className="font-mono text-emerald-400 flex items-center gap-1 hover:underline font-bold text-sm">
                      /go/{camp.short_code}
                      <ExternalLink size={12} />
                    </a>
                    <button 
                      onClick={() => copyShortlink(camp.short_code, camp.id)}
                      title="Salin Shortlink"
                      className="p-1.5 text-slate-400 hover:text-emerald-400 hover:bg-white/5 rounded-md transition-colors border border-white/5"
                    >
                      {copiedId === camp.id ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                    </button>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1.5">
                    {camp.meta_pixel_id ? (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center gap-1" title={`Meta Pixel: ${camp.meta_pixel_id}`}>
                        <Target size={10} /> Meta Pixel
                      </span>
                    ) : null}
                    {camp.tiktok_pixel_id ? (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-pink-500/10 text-pink-400 border border-pink-500/20 flex items-center gap-1" title={`TikTok Pixel: ${camp.tiktok_pixel_id}`}>
                        <Target size={10} /> TikTok Pixel
                      </span>
                    ) : null}
                    {!camp.meta_pixel_id && !camp.tiktok_pixel_id && (
                      <span className="text-xs text-slate-500 italic">Standar URL</span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 text-center">
                  <div className="inline-flex items-center justify-center gap-2 px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded-xl border border-emerald-500/20 font-bold text-sm shadow-[0_0_10px_rgba(16,185,129,0.15)]">
                    <BarChart3 size={14} />
                    {camp.total_clicks || 0}
                  </div>
                </td>
                <td className="px-6 py-4 text-slate-300 font-medium text-xs">
                  {camp.cluster || 'Semua Unit'}
                </td>
                <td className="px-6 py-4 text-right text-slate-400 text-xs">
                  {new Date(camp.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                  Belum ada tautan kampanye yang dibuat. Gunakan form di atas untuk membuat campaign shortlink pertama Anda!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
