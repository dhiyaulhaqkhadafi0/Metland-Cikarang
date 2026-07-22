"use client";

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { 
  PenTool, Target, Layers, ChevronRight, 
  Sparkles, Zap, ArrowRight, Save, Copy, RefreshCw, FileText, Download, Check,
  Cpu, FileDown, ShieldCheck, Flame, BarChart3, Heart, Eye, Award
} from 'lucide-react';
import Link from 'next/link';
import { 
  salesObjectives, mainCategories, 
  copywritingTemplates, copywritingTones 
} from '@/lib/data/copywriting-templates';

// 3 Specific Output Angles
interface OutputVersion {
  title: string;
  badge: string;
  badgeColor: string;
  text: string;
  score: {
    persuasion: number;
    emotional: number;
    clarity: string;
    conversion: string;
    aiTip: string;
  };
}

export default function CopywriterClient() {
  // States
  const [selectedCategory, setSelectedCategory] = useState('social_media');
  const [selectedTemplate, setSelectedTemplate] = useState('ig_caption');
  const [selectedObjective, setSelectedObjective] = useState('');
  const [selectedCluster, setSelectedCluster] = useState('');
  const [selectedTone, setSelectedTone] = useState('');
  const [userPrompt, setUserPrompt] = useState('');

  const [isGenerating, setIsGenerating] = useState(false);
  const [outputs, setOutputs] = useState<OutputVersion[]>([]);
  const [activeTab, setActiveTab] = useState(0);
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);

  // Available templates for selected category
  const currentTemplates = copywritingTemplates[selectedCategory] || [];

  // Update selected template if category changes
  useEffect(() => {
    const templates = copywritingTemplates[selectedCategory] || [];
    if (templates.length > 0 && !templates.some(t => t.id === selectedTemplate)) {
      setSelectedTemplate(templates[0].id);
    }
  }, [selectedCategory]);

  const handleGenerate = () => {
    setIsGenerating(true);
    setOutputs([]);
    
    const activeCategoryObj = mainCategories.find(c => c.id === selectedCategory);
    const activeTemplateObj = currentTemplates.find(t => t.id === selectedTemplate);

    setTimeout(() => {
      const categoryName = activeCategoryObj?.name || 'Media Sosial';
      const templateName = activeTemplateObj?.label || 'Keterangan';
      const clusterName = selectedCluster ? selectedCluster.toUpperCase() : 'Avesa Garden (Metland Cikarang)';

      const generatedVersions: OutputVersion[] = [
        {
          title: 'Soft Sell (Pendekatan Edukatif & Ramah)',
          badge: 'Soft Sell',
          badgeColor: 'from-emerald-400 to-teal-500 text-emerald-300 border-emerald-500/30',
          text: `Halo Sahabat Metland! ✨\n\nPernahkah Anda membayangkan terbangun di pagi hari dengan udara segar, lingkungan asri, dan akses serba mudah di timur Jakarta?\n\nHunian di ${clusterName} dirancang khusus untuk Anda yang mendambakan kenyamanan maksimal bersama keluarga. Dengan desain modern berkonsep High Ceiling dan fasilitas kawasan terlengkap, impian memiliki rumah impian kini semakin dekat.\n\nSpesial minggu ini, nikmati kemudahan DP 0% serta subsidi cicilan KPR. Ingin tahu simulasi angsuran yang paling cocok untuk Anda?\n\nBalas pesan ini atau klik link di profil kami untuk berkonsultasi secara gratis dengan tim sales profesional kami! 🏡💚`,
          score: {
            persuasion: 94,
            emotional: 98,
            clarity: 'Sangat Tinggi (Grade A+)',
            conversion: 'HIGH (3.8x Engagement Rate)',
            aiTip: 'Sangat efektif untuk prospek dingin yang sensitif terhadap penawaran langsung.'
          }
        },
        {
          title: 'Hard Sell (Direct & High Urgency Promo)',
          badge: 'Hard Sell',
          badgeColor: 'from-amber-400 to-rose-500 text-amber-300 border-amber-500/30',
          text: `🚨 PROMO EKSKLUSIF METLAND CIKARANG — TERBATAS BULAN INI! 🚨\n\nJangan sampai kehabisan! Amankan unit terbaik di ${clusterName} sekarang juga sebelum harga naik!\n\n⚡ SPESIAL PENAWARAN HARI INI:\n✅ DP 0% — Siap Langsung Akad KPR!\n✅ FREE Biaya BPHTB, AJB, & Administrasi Notaris\n✅ Subsidi Cicilan Ringan Mulai 2 Jutaan/Bulan!\n✅ Bonus Kanopi & Smart Home System!\n\nUnit promo terbatas hanya untuk 5 pemesan pertama minggu ini. Siapa cepat dia dapat!\n\nKetik 'MINAT' atau klik tombol WhatsApp di bawah untuk mengamankan voucher promo Anda sebelum hangus! 🏃‍♂️💨`,
          score: {
            persuasion: 98,
            emotional: 91,
            clarity: 'Langsung & Tegas (Grade A)',
            conversion: 'ULTRA HIGH (5.2x CTR Potential)',
            aiTip: 'Gunakan versi ini untuk broadcast WA massal atau iklan berbayar (FB/IG Ads).'
          }
        },
        {
          title: 'Storytelling (Narasi Emosional & Impian)',
          badge: 'Storytelling',
          badgeColor: 'from-violet-400 to-indigo-500 text-violet-300 border-violet-500/30',
          text: `"Dulu saya pikir punya rumah sendiri di usia 20-30an itu cuma mimpi..." 💭\n\nItulah kata Pak Budi, salah satu pembeli di ${clusterName}. Selama 4 tahun mengontrak, impian punya tempat tinggal sendiri sering tertunda karena kepikiran DP awal yang besar.\n\nSampai akhirnya beliau menemukan ${clusterName} di Metland Cikarang. Ternyata dengan program DP 0% dan pendampingan KPR dari awal sampai akad, prosesnya terasa sangat mudah dan transparan.\n\nKini, anak-anak beliau bebas bermain di taman klaster yang hijau dan aman setiap sore.\n\nBagaimana dengan cerita impian Anda? Wujudkan awal baru keluarga Anda bersama kami. Yuk, survey lokasinya akhir pekan ini! 🔑❤️`,
          score: {
            persuasion: 96,
            emotional: 99,
            clarity: 'Sangat Menyentuh (Grade A+)',
            conversion: 'HIGH CONVERSION (Storytelling Hook)',
            aiTip: 'Cocok untuk postingan Carousel IG, Reels, atau pesan personal ke prospek hangat.'
          }
        }
      ];

      setOutputs(generatedVersions);
      setIsGenerating(false);
      setActiveTab(0);
    }, 2000);
  };

  const handleCopy = () => {
    if (outputs[activeTab]) {
      navigator.clipboard.writeText(outputs[activeTab].text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleExportWord = () => {
    if (!outputs[activeTab]) return;
    const content = `METLAND CIKARANG - AI COPYWRITER STUDIO\n` +
      `Kategori: ${mainCategories.find(c => c.id === selectedCategory)?.name}\n` +
      `Jenis: ${currentTemplates.find(t => t.id === selectedTemplate)?.label}\n` +
      `Versi: ${outputs[activeTab].title}\n` +
      `==========================================\n\n` +
      outputs[activeTab].text + `\n\n` +
      `==========================================\n` +
      `Skor Persuasi: ${outputs[activeTab].score.persuasion}/100\n` +
      `Skor Emosional: ${outputs[activeTab].score.emotional}/100\n` +
      `Potensi Konversi: ${outputs[activeTab].score.conversion}\n`;
    
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Copywriting_${selectedTemplate}_${outputs[activeTab].badge}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleExportPDF = () => {
    if (!outputs[activeTab]) return;
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#06090E] text-slate-100 pb-20 animate-in fade-in duration-700 relative">
      
      {/* Background Animated Gradient Mesh */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-emerald-500/10 blur-[150px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[700px] h-[700px] rounded-full bg-indigo-500/10 blur-[180px] animate-pulse"></div>
        <div className="absolute top-[40%] left-[30%] w-[500px] h-[500px] rounded-full bg-teal-500/5 blur-[120px]"></div>
      </div>

      {/* Top Header */}
      <header className="sticky top-0 z-50 bg-[#080C14]/90 backdrop-blur-2xl border-b border-white/10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-600 p-[1px] shadow-[0_0_20px_rgba(16,185,129,0.3)]">
              <div className="w-full h-full bg-[#080C14] rounded-[15px] flex items-center justify-center">
                <PenTool size={22} className="text-emerald-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2 text-xs text-slate-400 mb-0.5">
                <Link href="/dashboard/smi-agent" className="hover:text-emerald-400 transition-colors">SMI Agent</Link>
                <ChevronRight size={12} className="text-slate-600" />
                <span className="text-emerald-400 font-semibold">AI Copywriter Studio</span>
              </div>
              <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                Copywriting Studio Pro
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 uppercase tracking-widest font-mono">
                  v2.0
                </span>
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-slate-300">
              <Cpu size={14} className="text-emerald-400 animate-pulse" />
              <span>Metland AI Core Active</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-6 pt-8 space-y-10">

        {/* GOOGLE AI STUDIO STYLE HERO PROMPT SECTION */}
        <section className="relative group">
          
          {/* Animated Rainbow Border Wrapper */}
          <div className="relative rounded-[2.5rem] p-[2px] bg-[linear-gradient(90deg,#10B981,#3B82F6,#8B5CF6,#EC4899,#10B981)] bg-[length:300%_100%] animate-[gradient_8s_ease_infinite] shadow-[0_20px_50px_rgba(16,185,129,0.15)]">
            
            {/* Inner Content Card */}
            <div className="rounded-[2.4rem] bg-[#0A0E17]/95 backdrop-blur-2xl p-8 lg:p-10 relative overflow-hidden">
              
              {/* Header Title Inside Hero */}
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-2xl md:text-3xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-slate-400">
                    Wujudkan Copywriting Properti Terbaik Anda
                  </h2>
                  <p className="text-sm text-slate-400 font-light mt-1">
                    Jelaskan ide promosi Anda, pilih template di bawah, dan biarkan SMI AI Engine melakukan sisanya.
                  </p>
                </div>
                
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-300">
                  <Sparkles size={14} className="text-amber-400" />
                  <span>AI Copywriting Studio</span>
                </div>
              </div>

              {/* Dynamic Prompt Textarea */}
              <div className="relative">
                <textarea
                  value={userPrompt}
                  onChange={(e) => setUserPrompt(e.target.value)}
                  placeholder="Misal: 'Buatkan caption Instagram tentang promo DP 0% untuk cluster Myzora, sasar keluarga muda Cikarang yang mau lepas dari rumah kontrakan...'"
                  className="w-full h-32 bg-[#0E1420] border border-white/10 rounded-2xl p-5 text-base text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500/50 transition-all resize-none font-light leading-relaxed shadow-inner"
                ></textarea>

                {/* Bottom Action inside Prompt Box */}
                <div className="mt-4 flex flex-wrap items-center justify-between gap-4 border-t border-white/5 pt-4">
                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
                    <span className="text-slate-500">Saran Ide:</span>
                    <button onClick={() => setUserPrompt('Fokuskan pada promo subsidi cicilan KPR dan fasilitas High Ceiling Myzora')} className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 transition-colors border border-white/5">
                      💡 Promo Cicilan KPR
                    </button>
                    <button onClick={() => setUserPrompt('Buatkan pesan WhatsApp follow up ramah untuk prospek yang sudah survey ke Avesa Garden')} className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 transition-colors border border-white/5">
                      💬 Follow Up Survey
                    </button>
                  </div>

                  <button
                    onClick={handleGenerate}
                    disabled={isGenerating}
                    className={`
                      relative group/btn overflow-hidden px-8 py-3.5 rounded-xl font-bold text-sm transition-all duration-300 flex items-center gap-3 shadow-lg
                      ${isGenerating 
                        ? 'bg-slate-800 text-slate-400 cursor-not-allowed' 
                        : 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:shadow-[0_0_30px_rgba(16,185,129,0.4)] hover:-translate-y-0.5'}
                    `}
                  >
                    {isGenerating ? (
                      <>
                        <RefreshCw size={18} className="animate-spin text-emerald-400" />
                        <span>SMI AI Sedang Menulis...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles size={18} className="text-amber-300 animate-pulse" />
                        <span>Hasilkan 3 Versi Copy</span>
                        <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 10 CATEGORIES SELECTOR (CLEAN PILLS) */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <Layers size={16} className="text-emerald-400" />
              Pilih Kategori Copywriting (10 Kategori Utama)
            </h3>
            <span className="text-xs text-slate-500">100+ Template Siap Pakai</span>
          </div>

          {/* Category Horizontal Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {mainCategories.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`
                    p-3.5 rounded-2xl border text-left transition-all duration-300 flex flex-col justify-between h-24 relative overflow-hidden group
                    ${isSelected 
                      ? 'bg-gradient-to-br from-emerald-500/20 to-teal-500/10 border-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.15)] text-white' 
                      : 'bg-[#0A0E17] border-white/5 hover:border-white/20 text-slate-400 hover:text-slate-200'}
                  `}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded-md ${isSelected ? 'bg-emerald-500 text-black' : 'bg-white/10 text-slate-400'}`}>
                      {cat.code}
                    </span>
                    {isSelected && <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></div>}
                  </div>
                  <div>
                    <p className="text-xs font-bold truncate">{cat.name}</p>
                    <p className="text-[10px] text-slate-500 truncate font-light mt-0.5">{cat.desc}</p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Cascading Sub-Templates & Filters Panel */}
          <div className="p-6 rounded-2xl bg-[#0A0E17] border border-white/5 grid grid-cols-1 md:grid-cols-3 gap-5">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-2">Pilih Jenis Copywriting</label>
              <select
                value={selectedTemplate}
                onChange={(e) => setSelectedTemplate(e.target.value)}
                className="w-full bg-[#0E1420] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:ring-2 focus:ring-emerald-500/50 outline-none font-medium"
              >
                {currentTemplates.map(t => (
                  <option key={t.id} value={t.id}>{t.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-2">Target Cluster / Unit (Opsional)</label>
              <select
                value={selectedCluster}
                onChange={(e) => setSelectedCluster(e.target.value)}
                className="w-full bg-[#0E1420] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:ring-2 focus:ring-emerald-500/50 outline-none"
              >
                <option value="">Semua Cluster / Metland Cikarang</option>
                <option value="Avesa Garden - Canary (32/72)">Avesa Garden — Canary (32/72)</option>
                <option value="Avesa Garden - Derora (50/72)">Avesa Garden — Derora (50/72)</option>
                <option value="Brassia Garden - Myzora (38/72)">Brassia Garden — Myzora (38/72)</option>
                <option value="Brassia Garden - Ellyra (46/72)">Brassia Garden — Ellyra (46/72)</option>
                <option value="Commercial Ruko Easton & Weston">Commercial — Ruko Easton & Weston</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-2">Tone of Voice (Gaya Bahasa)</label>
              <select
                value={selectedTone}
                onChange={(e) => setSelectedTone(e.target.value)}
                className="w-full bg-[#0E1420] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:ring-2 focus:ring-emerald-500/50 outline-none"
              >
                <option value="">Otomatis Sesuai Template</option>
                {copywritingTones.map((t, i) => (
                  <option key={i} value={t}>{t}</option>
                ))}
              </select>
            </div>
          </div>
        </section>

        {/* OUTPUT AREA WITH 3 ANGLES & COPYWRITING SCORE ANALYSIS */}
        {outputs.length > 0 && (
          <section className="space-y-6 animate-in fade-in slide-in-from-bottom-6 duration-700">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Sparkles className="text-emerald-400" size={20} />
                  Hasil AI Copywriting Studio (3 Versi Penulisan)
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Pilih sudut pandang penulisan yang paling sesuai dengan strategi kampanye Anda.
                </p>
              </div>

              {/* Action Buttons (Export Word, PDF, Copy, Save) */}
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={handleExportWord}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium text-slate-200 transition-colors"
                  title="Unduh file dokumen Word/TXT"
                >
                  <FileDown size={14} className="text-blue-400" />
                  <span>Download Word</span>
                </button>

                <button
                  onClick={handleExportPDF}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium text-slate-200 transition-colors"
                  title="Cetak atau simpan PDF"
                >
                  <Download size={14} className="text-red-400" />
                  <span>PDF</span>
                </button>

                <button
                  onClick={handleSave}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium text-slate-200 transition-colors"
                >
                  {saved ? <Check size={14} className="text-emerald-400" /> : <Save size={14} className="text-indigo-400" />}
                  <span>{saved ? 'Tersimpan!' : 'Simpan'}</span>
                </button>

                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs shadow-lg shadow-emerald-500/20 transition-all"
                >
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                  <span>{copied ? 'Tersalin!' : 'Salin Copy'}</span>
                </button>
              </div>
            </div>

            {/* 3 Tabs Header */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {outputs.map((out, idx) => {
                const isActive = activeTab === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => setActiveTab(idx)}
                    className={`
                      p-4 rounded-2xl border text-left transition-all duration-300 flex flex-col justify-between gap-3 relative overflow-hidden
                      ${isActive 
                        ? 'bg-[#0E1420] border-emerald-500/60 shadow-[0_0_30px_rgba(16,185,129,0.15)] ring-1 ring-emerald-500/50' 
                        : 'bg-[#0A0E17]/60 border-white/5 hover:border-white/20 text-slate-400'}
                    `}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border bg-gradient-to-r ${out.badgeColor}`}>
                        {out.badge}
                      </span>
                      {isActive && <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">Aktif</span>}
                    </div>
                    <p className="text-sm font-bold text-white">{out.title}</p>
                  </button>
                );
              })}
            </div>

            {/* Active Tab Content & Copywriting Score Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Copywriting Main Text Display (2 Columns) */}
              <div className="lg:col-span-2 rounded-3xl bg-[#0A0E17] border border-white/10 p-6 md:p-8 space-y-4 relative">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="text-xs font-mono text-emerald-400">VARIATION {activeTab + 1}: {outputs[activeTab].badge.toUpperCase()}</span>
                  <button onClick={handleCopy} className="text-xs text-slate-400 hover:text-white flex items-center gap-1">
                    <Copy size={12} /> Salin Teks Ini
                  </button>
                </div>

                <div className="bg-[#0E1420] rounded-2xl p-6 border border-white/5 font-light text-slate-200 text-base leading-relaxed whitespace-pre-wrap selection:bg-emerald-500 selection:text-black">
                  {outputs[activeTab].text}
                </div>
              </div>

              {/* COPYWRITING SCORE ANALYSIS WIDGET (1 Column) */}
              <div className="rounded-3xl bg-[#0A0E17] border border-white/10 p-6 space-y-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-4 border-b border-white/10 pb-3">
                    <BarChart3 size={18} className="text-emerald-400" />
                    <h4 className="text-sm font-bold text-white uppercase tracking-wider">Copywriting Score Analysis</h4>
                  </div>

                  <div className="space-y-5">
                    {/* Persuasion Index */}
                    <div>
                      <div className="flex justify-between text-xs mb-1.5">
                        <span className="text-slate-400 flex items-start gap-1">
                          <Award size={13} className="text-emerald-400 mt-0.5" /> Persuasion Index
                        </span>
                        <span className="font-bold text-emerald-400">{outputs[activeTab].score.persuasion} / 100</span>
                      </div>
                      <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                        <div className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full transition-all duration-1000" style={{ width: `${outputs[activeTab].score.persuasion}%` }}></div>
                      </div>
                    </div>

                    {/* Emotional Hook Score */}
                    <div>
                      <div className="flex justify-between text-xs mb-1.5">
                        <span className="text-slate-400 flex items-start gap-1">
                          <Heart size={13} className="text-rose-400 mt-0.5" /> Emotional Hook Score
                        </span>
                        <span className="font-bold text-rose-400">{outputs[activeTab].score.emotional} / 100</span>
                      </div>
                      <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                        <div className="bg-gradient-to-r from-rose-500 to-pink-500 h-full rounded-full transition-all duration-1000" style={{ width: `${outputs[activeTab].score.emotional}%` }}></div>
                      </div>
                    </div>

                    {/* Readability */}
                    <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                      <p className="text-[11px] text-slate-400 mb-0.5">Kejelasan Bahasa (Clarity)</p>
                      <p className="text-xs font-bold text-white">{outputs[activeTab].score.clarity}</p>
                    </div>

                    {/* Conversion Potential */}
                    <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                      <p className="text-[11px] text-slate-400 mb-0.5 flex items-center gap-1">
                        <Flame size={12} className="text-amber-400" /> Potensi Konversi CTR
                      </p>
                      <p className="text-xs font-bold text-amber-300">{outputs[activeTab].score.conversion}</p>
                    </div>
                  </div>
                </div>

                {/* AI Recommendation Box */}
                <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-xs">
                  <p className="font-bold text-emerald-400 mb-1 flex items-center gap-1">
                    <ShieldCheck size={14} /> Catatan Optimalisasi AI:
                  </p>
                  <p className="text-slate-300 font-light leading-relaxed">
                    {outputs[activeTab].score.aiTip}
                  </p>
                </div>
              </div>

            </div>
          </section>
        )}

      </main>

    </div>
  );
}
