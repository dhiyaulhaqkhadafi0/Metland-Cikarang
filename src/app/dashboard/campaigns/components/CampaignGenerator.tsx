"use client";

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { Copy, Check, Link as LinkIcon, Loader2, Target, Globe, Sliders } from 'lucide-react';
import { generateCampaignLink } from '@/app/actions/campaign.actions';
import { createClient } from '@/lib/supabase/client';

export default function CampaignGenerator({ onGenerated }: { onGenerated: () => void }) {
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const [generatedLink, setGeneratedLink] = useState('');
  const [copied, setCopied] = useState(false);
  const [salesName, setSalesName] = useState('');

  useEffect(() => {
    async function loadSalesName() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const metaName = user.user_metadata?.full_name || user.user_metadata?.name;
        if (metaName) {
          setSalesName(metaName);
        } else if (user.email) {
          const formatted = user.email.split('@')[0].replace(/[0-9_]/g, ' ')
            .split(' ').map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ').trim();
          setSalesName(formatted || 'Sales Executive');
        }
      }
    }
    loadSalesName();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setGeneratedLink('');
    setCopied(false);

    const formData = new FormData(e.currentTarget);
    const result = await generateCampaignLink(formData);

    if (result.success && result.data) {
      const origin = typeof window !== 'undefined' ? window.location.origin : 'https://metland.id';
      setGeneratedLink(`${origin}/go/${result.data.short_code}`);
      onGenerated();
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
    <Card className="p-6 border border-emerald-500/20 bg-[#0B0F14] shadow-2xl relative overflow-hidden">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-emerald-500/20 rounded-xl border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
          <LinkIcon className="text-emerald-400" size={22} />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Generator Campaign Link & Tracking Pixel</h2>
          <p className="text-sm text-slate-400">Buat shortlink unik ber-pixel untuk mengukur konversi & atribusi sales otomatis.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Section 1: Main Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Nama Sales</label>
            <input 
              required 
              name="sales_name" 
              value={salesName}
              onChange={(e) => setSalesName(e.target.value)}
              placeholder="Misal: Daffa Khadafi" 
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-emerald-500/50 outline-none transition-all" 
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Nama Campaign Iklan</label>
            <input 
              required 
              name="campaign_name" 
              placeholder="Misal: Meta-Ads-Promo-Myzora" 
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-emerald-500/50 outline-none transition-all" 
            />
          </div>
        </div>

        {/* Section 2: Destination & Platform */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Platform</label>
            <select required name="platform" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-slate-200 focus:border-emerald-500/50 outline-none cursor-pointer transition-all">
              <option value="Facebook Ads" className="bg-[#0B0F14]">Facebook Ads</option>
              <option value="Instagram Ads" className="bg-[#0B0F14]">Instagram Ads</option>
              <option value="TikTok Ads" className="bg-[#0B0F14]">TikTok Ads</option>
              <option value="Google Ads" className="bg-[#0B0F14]">Google Search / PPC</option>
              <option value="Brosur / QR" className="bg-[#0B0F14]">Brosur Fisik / QR Code</option>
              <option value="Organic Social" className="bg-[#0B0F14]">Organik Media Sosial</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Sub-cluster / Unit Target</label>
            <select required name="cluster" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-slate-200 focus:border-emerald-500/50 outline-none cursor-pointer transition-all">
              <option value="Semua Unit" className="bg-[#0B0F14]">Semua Unit</option>
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
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Link Target URL</label>
            <div className="relative">
              <Globe size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
              <input 
                name="original_url" 
                placeholder="https://metland.id/discover" 
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-emerald-500/50 outline-none transition-all" 
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Custom Shortlink (Opsional)</label>
            <div className="relative">
              <LinkIcon size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
              <input 
                name="custom_short_code" 
                placeholder="Misal: promo-myzora" 
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-emerald-500/50 outline-none transition-all" 
              />
            </div>
          </div>
        </div>

        {/* Section 3: Tracking Pixels (Meta & TikTok) */}
        <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-4 mt-4 shadow-inner">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2">
            <Target size={16} /> Pengaturan Tracking Pixel (Opsional)
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-2">Meta Pixel ID (Facebook / Instagram)</label>
              <input 
                name="meta_pixel_id" 
                placeholder="Misal: 123456789098765" 
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-emerald-500/50 outline-none font-mono transition-all" 
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-2">TikTok Pixel ID</label>
              <input 
                name="tiktok_pixel_id" 
                placeholder="Misal: C1234567890ABCD" 
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-emerald-500/50 outline-none font-mono transition-all" 
              />
            </div>
          </div>
        </div>

        <button 
          disabled={loading}
          type="submit" 
          className="mt-4 w-full flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-900 font-bold py-3 rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_25px_rgba(16,185,129,0.5)] disabled:opacity-50"
        >
          {loading ? <Loader2 className="animate-spin" size={18} /> : <LinkIcon size={18} />}
          {loading ? 'Sedang Membuat Shortlink...' : 'Generate Shortlink Ber-Pixel'}
        </button>
      </form>

      {generatedLink && (
        <div className="mt-6 p-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10 flex flex-col sm:flex-row items-center gap-4 justify-between animate-in zoom-in-95">
          <div className="truncate font-mono text-emerald-400 text-base font-bold w-full text-center sm:text-left">
            {generatedLink}
          </div>
          <button 
            onClick={copyToClipboard}
            className="flex-shrink-0 flex items-center gap-2 px-4 py-2 bg-emerald-500 text-slate-900 hover:bg-emerald-400 font-bold rounded-lg transition-colors text-sm shadow-md"
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
            {copied ? 'Tersalin!' : 'Copy Link'}
          </button>
        </div>
      )}
    </Card>
  );
}
