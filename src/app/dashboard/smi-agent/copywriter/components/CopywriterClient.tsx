"use client";

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { 
  PenTool, Target, Layers, Layout, ChevronDown, 
  Sparkles, Zap, ArrowRight, Save, Copy, RefreshCw, FileText, Download, Check
} from 'lucide-react';
import Link from 'next/link';
import { 
  salesObjectives, copywritingCategories, 
  copywritingTypes, copywritingTones 
} from '@/lib/data/copywriting-templates';

// Dummy output for prototype
const DUMMY_OUTPUT = [
  "Bapak/Ibu, punya impian tinggal di hunian asri dengan cicilan terjangkau? ✨\n\nDi Avesa Garden, Metland Cikarang, wujudkan rumah idaman mulai dari cicilan 2 Jutaan saja per bulan! Nikmati promo DP 0% dan Free BPHTB khusus pemesanan bulan ini.\n\nFasilitas lengkap, selangkah ke stasiun, dan investasi pasti naik.\n\nYuk, amankan unitnya sekarang sebelum kehabisan! Balas pesan ini untuk info e-brosur ya, Pak/Bu. 👇",
  
  "🚨 PROMO TERBATAS BULAN INI! 🚨\n\nKabar gembira buat kamu yang lagi cari rumah di timur Jakarta!\nAvesa Garden by Metland Cikarang ngasih kemudahan luar biasa:\n✅ DP 0% (Bisa Langsung KPR!)\n✅ Bebas Biaya BPHTB & AJB\n✅ Lokasi super strategis!\n\nUnit sangat terbatas! Jangan tunggu harga naik. Klik link di bio untuk download Pricelist lengkapnya sekarang juga! 🏃‍♂️💨",
  
  "Halo Kak, lagi cari rumah pertama yang nggak bikin kantong jebol tapi tetep dapet fasilitas bintang 5?\n\nKenalin, Cluster Avesa Garden di Metland Cikarang. Konsepnya asri banget, cocok buat keluarga muda kayak Kakak.\n\nSpesial minggu ini, kita ada subsidi cicilan KPR dan Free biaya surat-surat lho! Boleh saya kirimkan pricelist dan rincian cicilannya ke WA Kakak?"
];

export default function CopywriterClient() {
  // States
  const [objective, setObjective] = useState('');
  const [category, setCategory] = useState('');
  const [type, setType] = useState('');
  const [cluster, setCluster] = useState('');
  const [tone, setTone] = useState('');
  const [prompt, setPrompt] = useState('');
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedResults, setGeneratedResults] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState(0);
  const [copied, setCopied] = useState(false);

  // Filtered lists based on progressive disclosure
  const [availableCategories, setAvailableCategories] = useState(copywritingCategories);
  const [availableTypes, setAvailableTypes] = useState<{id: string, label: string}[]>([]);

  // Handlers for dynamic dropdowns
  useEffect(() => {
    if (objective) {
      const filteredCats = copywritingCategories.filter(cat => cat.objectives.includes(objective));
      setAvailableCategories(filteredCats.length > 0 ? filteredCats : copywritingCategories);
      setCategory('');
      setType('');
    } else {
      setAvailableCategories(copywritingCategories);
    }
  }, [objective]);

  useEffect(() => {
    if (category) {
      setAvailableTypes(copywritingTypes[category] || []);
      setType('');
    } else {
      setAvailableTypes([]);
    }
  }, [category]);

  const handleGenerate = () => {
    setIsGenerating(true);
    setGeneratedResults([]);
    
    // Simulate API call
    setTimeout(() => {
      setGeneratedResults(DUMMY_OUTPUT);
      setIsGenerating(false);
      setActiveTab(0);
    }, 2500);
  };

  const handleCopy = () => {
    if (generatedResults[activeTab]) {
      navigator.clipboard.writeText(generatedResults[activeTab]);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#070A0E] animate-in fade-in duration-700">
      
      {/* Header */}
      <div className="sticky top-0 z-40 bg-[#0B0F14]/90 backdrop-blur-xl border-b border-white/5 p-6">
        <div className="max-w-screen-2xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 bg-opacity-10 border border-emerald-500/20 flex items-center justify-center">
              <PenTool className="text-emerald-400" size={24} />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Link href="/dashboard/smi-agent" className="text-xs text-slate-400 hover:text-white transition-colors">SMI Agent</Link>
                <span className="text-slate-600 text-xs">/</span>
                <span className="text-xs text-emerald-400 font-medium">AI Copywriter</span>
              </div>
              <h1 className="text-2xl font-bold text-white tracking-tight">Copywriting Studio</h1>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-emerald-500/50 uppercase tracking-widest bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/10 hidden sm:inline-block">
              Powered by SMI Agent
            </span>
          </div>
        </div>
      </div>

      {/* Main 3-Column Layout */}
      <div className="flex-grow p-6 h-[calc(100vh-100px)]">
        <div className="max-w-screen-2xl mx-auto h-full flex flex-col lg:flex-row gap-6">
          
          {/* COLUMN 1: Settings Panel (Progressive Disclosure) */}
          <div className="w-full lg:w-[350px] flex-shrink-0 flex flex-col gap-5 overflow-y-auto pr-2 pb-32 custom-scrollbar">
            <Card className="bg-[#0B0F14] border border-white/5 p-5 shadow-xl">
              <h2 className="text-sm font-bold text-white uppercase tracking-wider mb-5 flex items-center gap-2">
                <Target size={16} className="text-emerald-400" />
                Sales Objective
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-2">Apa Tujuan Anda?</label>
                  <select 
                    value={objective}
                    onChange={(e) => setObjective(e.target.value)}
                    className="w-full bg-[#111822] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:ring-2 focus:ring-emerald-500/50 outline-none transition-all appearance-none"
                  >
                    <option value="">-- Pilih Tujuan --</option>
                    {salesObjectives.map(obj => (
                      <option key={obj.id} value={obj.id}>{obj.label}</option>
                    ))}
                  </select>
                </div>

                {/* Categories - Only show clearly when objective is selected */}
                <div className={`transition-all duration-500 ${!objective ? 'opacity-40 grayscale pointer-events-none' : ''}`}>
                  <label className="block text-xs font-medium text-slate-400 mb-2">Kategori Copywriting</label>
                  <select 
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-[#111822] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:ring-2 focus:ring-emerald-500/50 outline-none transition-all appearance-none"
                  >
                    <option value="">-- Pilih Kategori --</option>
                    {availableCategories.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.label}</option>
                    ))}
                  </select>
                </div>

                {/* Types */}
                <div className={`transition-all duration-500 ${!category ? 'opacity-40 grayscale pointer-events-none' : ''}`}>
                  <label className="block text-xs font-medium text-slate-400 mb-2">Jenis Spesifik</label>
                  <select 
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="w-full bg-[#111822] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:ring-2 focus:ring-emerald-500/50 outline-none transition-all appearance-none"
                  >
                    <option value="">-- Pilih Jenis --</option>
                    {availableTypes.map(t => (
                      <option key={t.id} value={t.id}>{t.label}</option>
                    ))}
                  </select>
                </div>
              </div>
            </Card>

            <Card className="bg-[#0B0F14] border border-white/5 p-5 shadow-xl">
              <h2 className="text-sm font-bold text-white uppercase tracking-wider mb-5 flex items-center gap-2">
                <Layers size={16} className="text-indigo-400" />
                Target & Context
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-2">Produk Target (Opsional)</label>
                  <select 
                    value={cluster}
                    onChange={(e) => setCluster(e.target.value)}
                    className="w-full bg-[#111822] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:ring-2 focus:ring-indigo-500/50 outline-none transition-all appearance-none"
                  >
                    <option value="">Semua Cluster / General</option>
                    <optgroup label="Avesa Garden">
                      <option value="canary">Canary (32/72)</option>
                      <option value="derora">Derora (50/72)</option>
                    </optgroup>
                    <optgroup label="Brassia Garden">
                      <option value="myzora">Myzora (38/72)</option>
                      <option value="ellyra">Ellyra (46/72)</option>
                    </optgroup>
                    <optgroup label="Commercial">
                      <option value="ruko_easton">Ruko Easton</option>
                      <option value="ruko_weston">Ruko Weston</option>
                    </optgroup>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-2">Tone of Voice (Gaya Bahasa)</label>
                  <select 
                    value={tone}
                    onChange={(e) => setTone(e.target.value)}
                    className="w-full bg-[#111822] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:ring-2 focus:ring-indigo-500/50 outline-none transition-all appearance-none"
                  >
                    <option value="">-- Pilih Tone --</option>
                    {copywritingTones.map((t, i) => (
                      <option key={i} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
              </div>
            </Card>
          </div>

          {/* COLUMN 2: Workspace & Output (Takes up remaining space) */}
          <div className="flex-1 flex flex-col gap-6 min-w-0">
            {/* Prompt Editor */}
            <Card className="bg-[#0B0F14] border border-white/5 p-5 shadow-xl flex-shrink-0">
              <label className="block text-sm font-bold text-white mb-3">Informasi Tambahan (Opsional)</label>
              <textarea 
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Misal: 'Fokuskan pada promo cicilan KPR dan sasar milenial yang baru menikah...'"
                className="w-full h-24 bg-[#111822] border border-white/10 rounded-xl p-4 text-sm text-white focus:ring-2 focus:ring-emerald-500/50 outline-none resize-none transition-all placeholder:text-slate-600"
              ></textarea>
              
              <div className="mt-4 flex justify-end">
                <button 
                  onClick={handleGenerate}
                  disabled={isGenerating || !type}
                  className={`
                    relative group overflow-hidden px-8 py-3 rounded-xl font-semibold transition-all duration-300
                    ${isGenerating || !type 
                      ? 'bg-slate-800 text-slate-500 cursor-not-allowed' 
                      : 'bg-emerald-500 text-white hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] hover:-translate-y-0.5'}
                  `}
                >
                  {isGenerating ? (
                    <div className="flex items-center gap-2">
                      <RefreshCw size={18} className="animate-spin" />
                      <span>Generating AI...</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 relative z-10">
                      <Sparkles size={18} />
                      <span>Generate Copy</span>
                    </div>
                  )}
                  {/* Button Glow Effect */}
                  {!isGenerating && type && (
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-0"></div>
                  )}
                  <div className="relative z-10 hidden group-hover:block absolute inset-0 mix-blend-overlay"></div>
                </button>
              </div>
            </Card>

            {/* Output Area */}
            <Card className="flex-1 bg-[#0B0F14] border border-white/5 shadow-xl flex flex-col overflow-hidden relative">
              {/* Background watermark */}
              <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none">
                <Zap size={200} />
              </div>

              {generatedResults.length > 0 ? (
                <div className="h-full flex flex-col relative z-10">
                  <div className="flex border-b border-white/10 px-4">
                    {generatedResults.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveTab(idx)}
                        className={`px-6 py-4 text-sm font-bold border-b-2 transition-colors ${
                          activeTab === idx 
                            ? 'border-emerald-500 text-emerald-400' 
                            : 'border-transparent text-slate-500 hover:text-slate-300'
                        }`}
                      >
                        Version {idx + 1}
                      </button>
                    ))}
                  </div>
                  
                  <div className="flex-1 p-6 overflow-y-auto custom-scrollbar">
                    <div className="bg-[#111822] border border-white/5 rounded-xl p-6 whitespace-pre-wrap text-slate-300 text-[15px] leading-relaxed font-light shadow-inner">
                      {generatedResults[activeTab]}
                    </div>
                  </div>

                  {/* Action Bar */}
                  <div className="p-4 border-t border-white/10 bg-[#0F141A] flex items-center justify-between">
                    <button className="flex items-center gap-2 text-slate-400 hover:text-white text-sm font-medium transition-colors">
                      <RefreshCw size={16} /> Improve
                    </button>
                    
                    <div className="flex items-center gap-3">
                      <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white text-sm font-medium transition-colors border border-white/5 hover:border-white/10">
                        <Save size={16} /> Save to Library
                      </button>
                      <button 
                        onClick={handleCopy}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 text-sm font-medium transition-colors border border-emerald-500/20"
                      >
                        {copied ? <Check size={16} /> : <Copy size={16} />} 
                        {copied ? 'Copied!' : 'Copy to Clipboard'}
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-slate-500 p-8 text-center relative z-10">
                  <FileText size={48} className="opacity-20 mb-4" />
                  <p className="text-lg font-medium text-slate-400 mb-2">Output Copywriting</p>
                  <p className="text-sm font-light max-w-sm">
                    Pilih tujuan, kategori, dan jenis copywriting di panel kiri, lalu klik Generate untuk melihat hasilnya di sini.
                  </p>
                </div>
              )}
            </Card>
          </div>

        </div>
      </div>
      
    </div>
  );
}
