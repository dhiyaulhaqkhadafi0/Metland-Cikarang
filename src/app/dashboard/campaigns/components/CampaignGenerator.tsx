"use client";

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Copy, Check, Link as LinkIcon, Loader2 } from 'lucide-react';
import { generateCampaignLink } from '@/app/actions/campaign.actions';

export default function CampaignGenerator({ onGenerated }: { onGenerated: () => void }) {
  const [loading, setLoading] = useState(false);
  const [generatedLink, setGeneratedLink] = useState('');
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setGeneratedLink('');
    setCopied(false);

    const formData = new FormData(e.currentTarget);
    const result = await generateCampaignLink(formData);

    if (result.success && result.data) {
      const origin = typeof window !== 'undefined' ? window.location.origin : 'https://smmc.id';
      setGeneratedLink(`${origin}/go/${result.data.short_code}`);
      onGenerated(); // Memicu pembaruan tabel
    } else {
      alert("Gagal membuat link: " + result.error);
    }
    setLoading(false);
  };

  const copyToClipboard = () => {
    if (!generatedLink) return;
    navigator.clipboard.writeText(generatedLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="p-6 border border-emerald-500/20 bg-emerald-500/5">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2.5 bg-emerald-500/20 rounded-lg">
          <LinkIcon className="text-emerald-400" size={20} />
        </div>
        <div>
          <h2 className="text-lg font-bold text-white">Buat Shortlink Baru</h2>
          <p className="text-sm text-emerald-400/80">Generator link cerdas untuk dipasang di iklan Anda.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Nama Sales</label>
            <input required name="sales_name" placeholder="Misal: Budi Pratama" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-emerald-500/50 outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Nama Campaign</label>
            <input required name="campaign_name" placeholder="Misal: FB-Myzora-Juli" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-emerald-500/50 outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Platform (Sumber)</label>
            <select required name="platform" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:border-emerald-500/50 outline-none">
              <option value="Facebook" className="bg-[#0B0F14]">Facebook Ads</option>
              <option value="Instagram" className="bg-[#0B0F14]">Instagram Ads</option>
              <option value="TikTok" className="bg-[#0B0F14]">TikTok</option>
              <option value="Google" className="bg-[#0B0F14]">Google Search</option>
              <option value="Brosur" className="bg-[#0B0F14]">Brosur Fisik / QR</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Cluster Tujuan</label>
            <select required name="cluster" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:border-emerald-500/50 outline-none">
              <option value="Semua" className="bg-[#0B0F14]">Semua Cluster (Beranda)</option>
              <option value="Brassia Garden" className="bg-[#0B0F14]">Brassia Garden</option>
              <option value="Weston Gateway" className="bg-[#0B0F14]">Weston Gateway</option>
            </select>
          </div>
        </div>

        <button 
          disabled={loading}
          type="submit" 
          className="mt-4 w-full flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-slate-900 font-bold py-3 rounded-xl transition-all disabled:opacity-50"
        >
          {loading ? <Loader2 className="animate-spin" size={18} /> : <LinkIcon size={18} />}
          {loading ? 'Sedang Membuat...' : 'Generate Shortlink'}
        </button>
      </form>

      {generatedLink && (
        <div className="mt-6 p-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10 flex flex-col sm:flex-row items-center gap-4 justify-between animate-in zoom-in-95">
          <div className="truncate font-mono text-emerald-400 text-lg w-full text-center sm:text-left">
            {generatedLink}
          </div>
          <button 
            onClick={copyToClipboard}
            className="flex-shrink-0 flex items-center gap-2 px-4 py-2 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 font-medium rounded-lg transition-colors border border-emerald-500/20"
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
            {copied ? 'Tersalin!' : 'Copy Link'}
          </button>
        </div>
      )}
    </Card>
  );
}
