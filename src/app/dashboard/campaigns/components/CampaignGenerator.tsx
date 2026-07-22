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

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Section 1: Main Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">Nama Sales</label>
            <input 
              required 
              name="sales_name" 
              value={salesName}
              onChange={(e) => setSalesName(e.target.value)}
              placeholder="Misal: Daffa Khadafi" 
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-emerald-500/50 outline-none" 
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">Nama Campaign Iklan</label>
            <input 
              required 
              name="campaign_name" 
              placeholder="Misal: Meta-Ads-Promo-Myzora" 
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-emerald-500/50 outline-none" 
            />
          </div>
        </div>

        {/* Section 2: Destination & Platform */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">Platform (Sumber Iklan)</label>
            <select required name="platform" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:border-emerald-500/50 outline-none cursor-pointer">
              <option value="Facebook Ads" className="bg-[#0B0F14]">Facebook Ads</option>
              <option value="Instagram Ads" className="bg-[#0B0F14]">Instagram Ads</option>
              <option value="TikTok Ads" className="bg-[#0B0F14]">TikTok Ads</option>
              <option value="Google Ads" className="bg-[#0B0F14]">Google Search / PPC</option>
              <option value="Brosur / QR" className="bg-[#0B0F14]">Brosur Fisik / QR Code</option>
              <option value="Organic Social" className="bg-[#0B0F14]">Organik Media Sosial</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">Sub-cluster / Unit Target</label>
            <select required name="cluster" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:border-emerald-500/50 outline-none cursor-pointer">
              <option value="Semua Unit" className="bg-[#0B0F14]">Semua Unit (Landing Page)</option>
              <optgroup label="Avesa Garden" className="bg-[#0B0F14] text-emerald-400 font-bold">
                <option value="Canary" className="bg-[#0B0F14] text-white">Canary</option>
                <option value="Derora" className="bg-[#0B0F14] text-white">Derora</option>
              </optgroup>
              <optgroup label="Brassia Garden" className="bg-[#0B0F14] text-emerald-400 font-bold">
                <option value="Myzora" className="bg-[#0B0F14] text-white">Myzora</option>
                <option value="Ellyra" className="bg-[#0B0F14] text-white">Ellyra</option>
              </optgroup>
              <optgroup label="Komersial" className="bg-[#0B0F14] text-emerald-400 font-bold">
                <option value="Ruko Easton" className="bg-[#0B0F14] text-white">Ruko Easton</option>
                <option value="Weston Gateway" className="bg-[#0B0F14] text-white">Weston Gateway</option>
              </optgroup>
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">Link Asli Target Landing Page</label>
            <div className="relative">
              <Globe size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input 
                name="original_url" 
                placeholder="https://metland.id/discover" 
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-emerald-500/50 outline-none" 
              />
            </div>
          </div>
        </div>

        {/* Section 3: Tracking Pixels (Meta & TikTok) */}
        <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-3 mt-2">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider">
            <Target size={14} /> Pengaturan Tracking Pixel (Opsional untuk Iklan Berbayar)
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Meta Pixel ID (Facebook / Instagram)</label>
              <input 
                name="meta_pixel_id" 
                placeholder="Misal: 123456789098765" 
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder:text-slate-600 focus:border-emerald-500/50 outline-none font-mono" 
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">TikTok Pixel ID</label>
              <input 
                name="tiktok_pixel_id" 
                placeholder="Misal: C1234567890ABCD" 
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder:text-slate-600 focus:border-emerald-500/50 outline-none font-mono" 
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
