"use client";

import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, Zap, Paintbrush, LayoutTemplate, 
  Settings, CheckCircle2, ChevronRight, Check,
  Wand2, LayoutGrid, Smartphone, Globe, Share2,
  Plus, Trash2, ArrowUp, ArrowDown, ExternalLink,
  Target, BarChart3, AlertTriangle, PlayCircle, Loader2, Play,
  Network, TrendingUp, MessageSquare, UserCheck, BrainCircuit,
  Image as ImageIcon
} from 'lucide-react';
import Link from 'next/link';

// Mock Data for Wizard
const WIZARD_OPTIONS = {
  types: ['Landing Page Cluster', 'Landing Page Promo', 'Landing Page Open House', 'Landing Page Lead Magnet', 'Landing Page Survey', 'Landing Page Personal Branding', 'Landing Page Investasi', 'Landing Page Komersial'],
  clusters: ['Myzora', 'Ellyra', 'Derora', 'Brassia', 'Canary'],
  targets: ['Pasangan Baru', 'Keluarga Muda', 'Investor', 'Pebisnis', 'First Home Buyer', 'Upgrade Rumah'],
  goals: ['WhatsApp', 'Booking Survey', 'Download Brosur', 'Isi Form', 'Call'],
  styles: ['Luxury', 'Premium', 'Minimalis', 'Modern', 'Corporate', 'Friendly']
};

export default function FunnelBuilderClient() {
  const [activeMode, setActiveMode] = useState<'generate' | 'visual' | 'templates'>('generate');
  
  // Wizard State
  const [wizardStep, setWizardStep] = useState(1);
  const [wizardData, setWizardData] = useState({
    type: '',
    cluster: '',
    target: '',
    goal: '',
    style: ''
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);

  // Publish Modal State
  const [showPublishModal, setShowPublishModal] = useState(false);
  const [publishProgress, setPublishProgress] = useState(0); // 0 to 6 (steps)

  const handleWizardSelect = (key: keyof typeof wizardData, value: string) => {
    setWizardData({ ...wizardData, [key]: value });
    if (wizardStep < 5) {
      setTimeout(() => setWizardStep(wizardStep + 1), 300);
    }
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setHasGenerated(true);
      setActiveMode('visual'); // Switch to visual builder to see the result
    }, 2500);
  };

  const handlePublish = () => {
    setShowPublishModal(true);
    setPublishProgress(0);
    
    // Animate progress
    const interval = setInterval(() => {
      setPublishProgress(prev => {
        if (prev >= 6) {
          clearInterval(interval);
          return 6;
        }
        return prev + 1;
      });
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#0A0E17] text-white selection:bg-emerald-500/30 font-sans pb-20 overflow-x-hidden">
      
      {/* HEADER */}
      <header className="sticky top-0 z-40 bg-[#0A0E17]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link 
              href="/dashboard/smi-agent" 
              className="p-2 hover:bg-white/5 rounded-full transition-colors text-slate-400 hover:text-white"
            >
              <ArrowLeft size={18} />
            </Link>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-600 flex items-center justify-center shadow-[0_0_15px_rgba(139,92,246,0.3)]">
                <LayoutTemplate size={16} className="text-white" />
              </div>
              <div>
                <h1 className="text-sm font-bold text-white">AI Funnel Builder</h1>
                <p className="text-[10px] text-slate-400 flex items-center gap-1">
                  Powered by <span className="text-violet-400 font-bold">SMI Core</span>
                </p>
              </div>
            </div>
          </div>
          
          {/* Main 3 Modes Nav */}
          <div className="hidden md:flex bg-white/5 p-1 rounded-xl border border-white/5">
            <button 
              onClick={() => setActiveMode('generate')}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${activeMode === 'generate' ? 'bg-violet-500/20 text-violet-400' : 'text-slate-400 hover:text-slate-200'}`}
            >
              <Zap size={14} /> AI Generate
            </button>
            <button 
              onClick={() => setActiveMode('visual')}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${activeMode === 'visual' ? 'bg-violet-500/20 text-violet-400' : 'text-slate-400 hover:text-slate-200'}`}
            >
              <Paintbrush size={14} /> Visual Builder
            </button>
            <button 
              onClick={() => setActiveMode('templates')}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${activeMode === 'templates' ? 'bg-violet-500/20 text-violet-400' : 'text-slate-400 hover:text-slate-200'}`}
            >
              <LayoutGrid size={14} /> Templates
            </button>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={handlePublish}
              disabled={!hasGenerated && activeMode !== 'visual'}
              className="px-5 py-1.5 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white text-xs font-bold rounded-xl flex items-center gap-2 transition-all shadow-[0_0_20px_rgba(139,92,246,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Play size={14} className="fill-current" /> Publish Funnel
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        
        {/* ==============================================
            MODE 1: AI GENERATE (WIZARD)
            ============================================== */}
        {activeMode === 'generate' && !hasGenerated && (
          <div className="max-w-3xl mx-auto mt-10 relative">
            
            {/* Glowing background effect */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-[500px] max-h-[500px] bg-violet-500/20 blur-[120px] rounded-full pointer-events-none" />

            <div className="text-center mb-10 relative z-10">
              <h2 className="text-3xl font-bold mb-3">Apa yang ingin Anda bangun hari ini?</h2>
              <p className="text-slate-400">Jawab 5 pertanyaan singkat, AI kami akan merancang struktur funnel dengan tingkat konversi tinggi khusus untuk Anda.</p>
            </div>

            <div className="bg-[#0E1420] border border-white/10 rounded-3xl p-8 relative z-10 shadow-2xl">
              
              {/* Progress Bar */}
              <div className="flex gap-2 mb-8">
                {[1, 2, 3, 4, 5].map((step) => (
                  <div key={step} className="h-1 flex-1 rounded-full bg-white/5 relative overflow-hidden">
                    {wizardStep >= step && (
                      <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full" />
                    )}
                  </div>
                ))}
              </div>

              {/* Wizard Steps */}
              <div className="min-h-[250px]">
                
                {/* STEP 1 */}
                {wizardStep === 1 && (
                  <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                    <h3 className="text-lg font-bold mb-5 flex items-center gap-2">
                      <span className="text-violet-400">1.</span> Jenis Landing Page
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {WIZARD_OPTIONS.types.map((type) => (
                        <button
                          key={type}
                          onClick={() => handleWizardSelect('type', type)}
                          className={`p-4 rounded-xl border text-left transition-all ${wizardData.type === type ? 'bg-violet-500/20 border-violet-500 shadow-[0_0_15px_rgba(139,92,246,0.2)]' : 'bg-white/5 border-white/5 hover:border-white/20'}`}
                        >
                          <span className="text-sm font-bold">{type}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* STEP 2 */}
                {wizardStep === 2 && (
                  <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                    <h3 className="text-lg font-bold mb-5 flex items-center gap-2">
                      <span className="text-violet-400">2.</span> Pilih Cluster Utama
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {WIZARD_OPTIONS.clusters.map((cluster) => (
                        <button
                          key={cluster}
                          onClick={() => handleWizardSelect('cluster', cluster)}
                          className={`p-4 rounded-xl border text-center transition-all ${wizardData.cluster === cluster ? 'bg-violet-500/20 border-violet-500 shadow-[0_0_15px_rgba(139,92,246,0.2)]' : 'bg-white/5 border-white/5 hover:border-white/20'}`}
                        >
                          <span className="text-sm font-bold">{cluster}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* STEP 3 */}
                {wizardStep === 3 && (
                  <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                    <h3 className="text-lg font-bold mb-5 flex items-center gap-2">
                      <span className="text-violet-400">3.</span> Target Audience
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                      {WIZARD_OPTIONS.targets.map((target) => (
                        <button
                          key={target}
                          onClick={() => handleWizardSelect('target', target)}
                          className={`p-4 rounded-xl border text-left transition-all ${wizardData.target === target ? 'bg-violet-500/20 border-violet-500 shadow-[0_0_15px_rgba(139,92,246,0.2)]' : 'bg-white/5 border-white/5 hover:border-white/20'}`}
                        >
                          <span className="text-sm font-bold">{target}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* STEP 4 */}
                {wizardStep === 4 && (
                  <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                    <h3 className="text-lg font-bold mb-5 flex items-center gap-2">
                      <span className="text-violet-400">4.</span> Goal (Call To Action)
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                      {WIZARD_OPTIONS.goals.map((goal) => (
                        <button
                          key={goal}
                          onClick={() => handleWizardSelect('goal', goal)}
                          className={`p-4 rounded-xl border text-left transition-all ${wizardData.goal === goal ? 'bg-violet-500/20 border-violet-500 shadow-[0_0_15px_rgba(139,92,246,0.2)]' : 'bg-white/5 border-white/5 hover:border-white/20'}`}
                        >
                          <span className="text-sm font-bold">{goal}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* STEP 5 */}
                {wizardStep === 5 && (
                  <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                    <h3 className="text-lg font-bold mb-5 flex items-center gap-2">
                      <span className="text-violet-400">5.</span> Gaya Bahasa & Visual (Style)
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {WIZARD_OPTIONS.styles.map((style) => (
                        <button
                          key={style}
                          onClick={() => handleWizardSelect('style', style)}
                          className={`p-4 rounded-xl border text-center transition-all ${wizardData.style === style ? 'bg-violet-500/20 border-violet-500 shadow-[0_0_15px_rgba(139,92,246,0.2)]' : 'bg-white/5 border-white/5 hover:border-white/20'}`}
                        >
                          <span className="text-sm font-bold">{style}</span>
                        </button>
                      ))}
                    </div>

                    {wizardData.style && (
                      <div className="mt-8 flex justify-center animate-in fade-in zoom-in duration-300 delay-300">
                        <button 
                          onClick={handleGenerate}
                          disabled={isGenerating}
                          className="px-8 py-4 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white font-bold rounded-2xl flex items-center gap-3 transition-all shadow-[0_0_30px_rgba(139,92,246,0.4)] hover:shadow-[0_0_40px_rgba(139,92,246,0.6)] transform hover:-translate-y-1 w-full sm:w-auto"
                        >
                          {isGenerating ? (
                            <>
                              <Loader2 size={20} className="animate-spin" /> Sedang Meracik Funnel...
                            </>
                          ) : (
                            <>
                              <Wand2 size={20} /> Generate High-Converting Funnel
                            </>
                          )}
                        </button>
                      </div>
                    )}
                  </div>
                )}

              </div>
              
              {/* Step Navigation controls (if needed, though it auto advances) */}
              <div className="flex justify-between mt-8 border-t border-white/10 pt-4">
                <button 
                  onClick={() => setWizardStep(prev => Math.max(1, prev - 1))}
                  disabled={wizardStep === 1 || isGenerating}
                  className="text-xs text-slate-400 hover:text-white disabled:opacity-30 disabled:pointer-events-none"
                >
                  Kembali
                </button>
                <span className="text-xs text-slate-500 font-mono">Step {wizardStep} of 5</span>
              </div>
            </div>
          </div>
        )}

        {/* ==============================================
            MODE 2: VISUAL BUILDER (SECTION BUILDER)
            ============================================== */}
        {activeMode === 'visual' && (
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 animate-in fade-in duration-500">
            
            {/* Left/Center: Section Builder & Canvas Mockup */}
            <div className="xl:col-span-3 space-y-6">
              
              {/* Toolbar */}
              <div className="bg-[#0E1420] border border-white/5 p-4 rounded-2xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-violet-500/20 text-violet-400 p-2 rounded-lg">
                    <Smartphone size={18} />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm">Metland Myzora - Launching Promo</h3>
                    <p className="text-[10px] text-slate-400">Terakhir diedit: Baru saja</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5">
                    <Plus size={14} /> Tambah Seksi
                  </button>
                </div>
              </div>

              {/* Builder Layout: Left Sections List, Right Mockup Preview */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Sections List */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Struktur Halaman</h4>
                  
                  {['Hero Section', 'Why Choose Us', 'Gallery / Fasilitas', 'Location & Access', 'Promo CTA', 'FAQ', 'Footer'].map((section, idx) => (
                    <div key={idx} className={`p-3 rounded-xl border flex items-center justify-between group cursor-pointer transition-all ${idx === 0 ? 'bg-violet-500/10 border-violet-500/50' : 'bg-[#0E1420] border-white/5 hover:border-white/20'}`}>
                      <div className="flex items-center gap-3">
                        <span className="text-slate-500 cursor-grab active:cursor-grabbing">☰</span>
                        <span className={`text-sm font-bold ${idx === 0 ? 'text-violet-400' : 'text-slate-300'}`}>{section}</span>
                      </div>
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-1 text-slate-400 hover:text-white"><Settings size={14} /></button>
                        <button className="p-1 text-slate-400 hover:text-rose-400"><Trash2 size={14} /></button>
                      </div>
                    </div>
                  ))}
                  
                  <div className="pt-4 border-t border-white/5">
                    <button className="w-full py-3 rounded-xl border border-dashed border-white/20 text-slate-400 hover:text-white hover:border-white/40 transition-all text-xs font-bold flex items-center justify-center gap-2">
                      <Plus size={14} /> Buka Section Library
                    </button>
                  </div>
                </div>

                {/* Mockup Preview (Center) */}
                <div className="md:col-span-2">
                  <div className="bg-[#0A0E17] border border-white/10 rounded-3xl overflow-hidden relative shadow-2xl ring-1 ring-white/5">
                    {/* Browser bar */}
                    <div className="bg-[#121826] px-4 py-3 flex items-center gap-2 border-b border-white/5">
                      <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-rose-500"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-amber-500"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
                      </div>
                      <div className="ml-4 bg-white/5 rounded-md px-3 py-1 flex-1 text-[10px] text-slate-400 font-mono flex items-center gap-2">
                        <Globe size={10} /> page.smmc.id/myzora-juli
                      </div>
                    </div>
                    
                    {/* Fake Web Content (High Conversion Mockup) */}
                    <div className="bg-white h-[600px] overflow-y-auto">
                      {/* Hero */}
                      <div className="relative h-64 bg-slate-900 flex flex-col items-center justify-center text-center p-6 border-b-4 border-rose-500">
                        <div className="absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80')] bg-cover bg-center"></div>
                        <div className="relative z-10">
                          <span className="bg-rose-500 text-white text-[9px] font-bold px-2 py-1 rounded uppercase tracking-widest mb-3 inline-block">Promo Juli 2026</span>
                          <h1 className="text-2xl font-black text-white leading-tight mb-2">Myzora: Hunian Mewah Keluarga Muda<br/>Harga Mulai Rp 1 M-an</h1>
                          <p className="text-xs text-slate-200 mb-4 max-w-md mx-auto">Cicilan 5 Jutaan/Bulan. Free BPHTB, KPR, dan subsidi biaya surat-surat. Terbatas untuk 10 pembeli pertama!</p>
                          <button className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2.5 px-6 rounded-full text-xs shadow-lg flex items-center gap-2 mx-auto">
                            Dapatkan Pricelist Sekarang <ArrowRight size={14} />
                          </button>
                        </div>
                      </div>
                      
                      {/* Trust / Benefit */}
                      <div className="py-8 px-6 text-center text-slate-800">
                        <h2 className="text-lg font-bold mb-4">Kenapa Memilih Myzora?</h2>
                        <div className="grid grid-cols-3 gap-4">
                          <div className="text-center">
                            <div className="w-10 h-10 bg-slate-100 rounded-full mx-auto mb-2 flex items-center justify-center">🚆</div>
                            <h3 className="text-[10px] font-bold">5 Menit ke Stasiun</h3>
                          </div>
                          <div className="text-center">
                            <div className="w-10 h-10 bg-slate-100 rounded-full mx-auto mb-2 flex items-center justify-center">🛣️</div>
                            <h3 className="text-[10px] font-bold">Akses Tol Langsung</h3>
                          </div>
                          <div className="text-center">
                            <div className="w-10 h-10 bg-slate-100 rounded-full mx-auto mb-2 flex items-center justify-center">🏊</div>
                            <h3 className="text-[10px] font-bold">Clubhouse Mewah</h3>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Section Edit Overlay (Active State) */}
                    <div className="absolute top-12 left-0 right-0 h-64 border-2 border-violet-500 bg-violet-500/10 flex items-start justify-end p-2 pointer-events-none">
                      <div className="bg-violet-500 text-white text-[10px] font-bold px-2 py-1 rounded shadow-lg pointer-events-auto cursor-pointer hover:bg-violet-600 flex items-center gap-1">
                        <Paintbrush size={10} /> Edit Hero Section
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* AI Rewrite Panel for Active Section */}
              <div className="bg-gradient-to-br from-[#0E1420] to-[#121826] border border-violet-500/30 rounded-2xl p-5 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <Wand2 size={64} />
                </div>
                <div className="relative z-10 flex flex-col md:flex-row gap-5 items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-violet-400 flex items-center gap-2 mb-1">
                      <Wand2 size={14} /> AI Rewrite (Hero Section)
                    </h4>
                    <p className="text-xs text-slate-400">Gunakan AI untuk mengubah sudut pandang copywriting di seksi ini.</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {['Lebih Premium', 'Lebih Persuasif', 'Lebih Emosional', 'Lebih Singkat'].map(btn => (
                      <button key={btn} className="px-3 py-1.5 bg-white/5 hover:bg-violet-500/20 hover:text-violet-300 border border-white/10 hover:border-violet-500/50 rounded-lg text-[11px] font-bold transition-all">
                        {btn}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

            </div>

            {/* Right Panel: SMI AI Intelligence */}
            <div className="space-y-5">
              
              {/* Funnel Score */}
              <div className="bg-[#0E1420] border border-emerald-500/30 rounded-2xl p-5 shadow-[0_0_20px_rgba(16,185,129,0.05)]">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                      <BarChart3 size={14} /> Funnel Score
                    </h4>
                    <p className="text-[10px] text-slate-400">Prediksi Konversi AI</p>
                  </div>
                  <div className="w-12 h-12 rounded-full border-4 border-emerald-500 flex items-center justify-center bg-emerald-500/10">
                    <span className="text-lg font-black text-emerald-400">92</span>
                  </div>
                </div>

                <div className="space-y-3">
                  {[
                    { label: 'Headline', score: 95, color: 'emerald' },
                    { label: 'CTA / Penawaran', score: 91, color: 'emerald' },
                    { label: 'Trust (Testimoni)', score: 65, color: 'amber' },
                    { label: 'Speed & UX', score: 96, color: 'emerald' },
                  ].map((stat, i) => (
                    <div key={i}>
                      <div className="flex justify-between text-[10px] mb-1">
                        <span className="text-slate-400">{stat.label}</span>
                        <span className={`font-bold text-${stat.color}-400`}>{stat.score}/100</span>
                      </div>
                      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full bg-${stat.color}-500`} style={{ width: `${stat.score}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Smart Recommendations */}
              <div className="bg-[#0E1420] border border-amber-500/30 rounded-2xl p-5 shadow-[0_0_20px_rgba(245,158,11,0.05)]">
                <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <AlertTriangle size={14} /> AI Recommendation
                </h4>
                <p className="text-[11px] text-slate-300 mb-4">Landing page Anda belum memiliki elemen pemicu konversi berikut:</p>
                
                <div className="space-y-2">
                  {[
                    { title: 'FAQ Section', desc: 'Menjawab keraguan prospek' },
                    { title: 'Scarcity Banner', desc: 'Sisa unit terbatas' },
                    { title: 'Testimonial Video', desc: 'Bukti sosial penghuni' }
                  ].map((rec, i) => (
                    <div key={i} className="flex justify-between items-center bg-white/5 border border-white/5 rounded-xl p-2.5">
                      <div>
                        <p className="text-xs font-bold text-white">{rec.title}</p>
                        <p className="text-[9px] text-slate-400">{rec.desc}</p>
                      </div>
                      <button className="px-2 py-1 bg-amber-500/20 hover:bg-amber-500/40 text-amber-400 text-[10px] font-bold rounded flex items-center gap-1 transition-all">
                        <Plus size={10} /> Tambah
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Property Assets */}
              <div className="bg-[#0E1420] border border-white/5 rounded-2xl p-5">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <LayoutGrid size={14} /> Myzora Assets
                </h4>
                <p className="text-[10px] text-slate-500 mb-3">Tinggal klik untuk memasukkan ke landing page. Tersinkron dari Knowledge Base.</p>
                
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-white/5 hover:bg-white/10 rounded-lg p-2 cursor-pointer transition-all border border-white/5 text-center">
                    <ImageIcon size={20} className="mx-auto mb-1 text-slate-400" />
                    <span className="text-[10px] font-bold">12 Foto Unit</span>
                  </div>
                  <div className="bg-white/5 hover:bg-white/10 rounded-lg p-2 cursor-pointer transition-all border border-white/5 text-center">
                    <PlayCircle size={20} className="mx-auto mb-1 text-slate-400" />
                    <span className="text-[10px] font-bold">Video Tour</span>
                  </div>
                  <div className="bg-white/5 hover:bg-white/10 rounded-lg p-2 cursor-pointer transition-all border border-white/5 text-center">
                    <Target size={20} className="mx-auto mb-1 text-slate-400" />
                    <span className="text-[10px] font-bold">Logo & Siteplan</span>
                  </div>
                  <div className="bg-white/5 hover:bg-white/10 rounded-lg p-2 cursor-pointer transition-all border border-white/5 text-center">
                    <LayoutTemplate size={20} className="mx-auto mb-1 text-slate-400" />
                    <span className="text-[10px] font-bold">Brosur PDF</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* ==============================================
            MODE 3: TEMPLATES
            ============================================== */}
        {activeMode === 'templates' && (
          <div className="animate-in fade-in duration-500">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold mb-1">Templates High-Conversion</h2>
                <p className="text-slate-400 text-sm">Pilih struktur landing page yang sudah terbukti menghasilkan prospek (best performer).</p>
              </div>
              <div className="flex gap-2">
                <select className="bg-[#0E1420] border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-violet-500">
                  <option>Semua Kategori</option>
                  <option>Lead Generation</option>
                  <option>Open House</option>
                  <option>Promo & Launching</option>
                  <option>Personal Branding</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: 'Promo Launching Keras', category: 'Promo', conversions: '12% CVR', color: 'bg-rose-500/20 border-rose-500/50 text-rose-400' },
                { title: 'Open House Registration', category: 'Event', conversions: '18% CVR', color: 'bg-amber-500/20 border-amber-500/50 text-amber-400' },
                { title: 'Investasi Properti Kalkulator', category: 'Investor', conversions: '9% CVR', color: 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400' },
                { title: 'Minimalist Lead Gen', category: 'Lead Generation', conversions: '15% CVR', color: 'bg-blue-500/20 border-blue-500/50 text-blue-400' },
                { title: 'Sales Personal Branding', category: 'Branding', conversions: 'High Trust', color: 'bg-violet-500/20 border-violet-500/50 text-violet-400' },
                { title: 'Commercial / Ruko Brochure', category: 'Komersial', conversions: 'B2B Leads', color: 'bg-slate-500/20 border-slate-500/50 text-slate-400' },
              ].map((template, idx) => (
                <div key={idx} className="bg-[#0E1420] border border-white/5 hover:border-violet-500/50 rounded-2xl overflow-hidden group transition-all cursor-pointer shadow-lg hover:shadow-[0_0_20px_rgba(139,92,246,0.2)] flex flex-col h-full">
                  <div className="h-40 bg-[#121826] relative overflow-hidden border-b border-white/5 flex items-center justify-center group-hover:bg-violet-500/5 transition-colors">
                    <LayoutTemplate size={48} className="text-white/10 group-hover:text-violet-500/30 transition-colors transform group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0E1420] to-transparent opacity-80" />
                    
                    {/* Hover Action */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-sm">
                      <button 
                        onClick={() => { setActiveMode('visual'); setHasGenerated(true); }}
                        className="px-4 py-2 bg-violet-500 text-white font-bold text-xs rounded-xl flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-all"
                      >
                        Gunakan Template Ini
                      </button>
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-2">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase tracking-wider ${template.color}`}>
                        {template.category}
                      </span>
                      <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded flex items-center gap-1">
                        <TrendingUp size={10} /> {template.conversions}
                      </span>
                    </div>
                    <h3 className="font-bold text-base text-white">{template.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>

      {/* ==============================================
          PUBLISH MODAL (THE KILLER FEATURE)
          ============================================== */}
      {showPublishModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => publishProgress >= 6 && setShowPublishModal(false)}></div>
          
          <div className="bg-[#0A0E17] border border-violet-500/30 rounded-3xl w-full max-w-2xl relative z-10 overflow-hidden shadow-[0_0_50px_rgba(139,92,246,0.3)]">
            {/* Header */}
            <div className="bg-gradient-to-r from-violet-900/40 to-fuchsia-900/40 p-6 border-b border-white/5 flex items-center gap-4">
              <div className="w-12 h-12 bg-violet-500/20 border border-violet-500/50 rounded-2xl flex items-center justify-center">
                <Network className="text-violet-400" size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Membangun Ekosistem Funnel</h3>
                <p className="text-xs text-violet-300">Mengintegrasikan Landing Page dengan SMMC Lead Center</p>
              </div>
            </div>

            {/* Funnel Flow Diagram */}
            <div className="p-8">
              <div className="space-y-4 relative before:absolute before:inset-0 before:ml-[23px] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-violet-500 before:via-fuchsia-500 before:to-emerald-500 before:opacity-30">
                
                {[
                  { title: 'Generasi Landing Page', desc: 'Menyusun aset, optimasi SEO & kecepatan halaman.', icon: Globe, color: 'violet' },
                  { title: 'Integrasi CTA & WhatsApp', desc: 'Menghubungkan tombol ke nomor WA Sales yang aktif.', icon: MessageSquare, color: 'fuchsia' },
                  { title: 'Setup Tracking & Pixel', desc: 'Memasang UTM dan Meta/TikTok Pixel untuk retargeting.', icon: Target, color: 'rose' },
                  { title: 'Koneksi SMMC Lead Center', desc: 'Form otomatis tersimpan ke database prospek Anda.', icon: UserCheck, color: 'amber' },
                  { title: 'Aktivasi Auto Follow-up', desc: 'Menjadwalkan reminder dan pipeline CRM.', icon: BrainCircuit, color: 'emerald' },
                ].map((step, idx) => {
                  const isActive = publishProgress > idx;
                  const isCurrent = publishProgress === idx;
                  return (
                    <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                      <div className={`flex items-center justify-center w-12 h-12 rounded-full border-4 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-xl transition-all duration-500 ${isActive ? `bg-${step.color}-500 border-[#0A0E17]` : isCurrent ? `bg-[#0E1420] border-${step.color}-500 animate-pulse` : 'bg-[#0E1420] border-slate-700'}`}>
                        {isActive ? <Check size={20} className="text-[#0A0E17]" /> : <step.icon size={20} className={isCurrent ? `text-${step.color}-400` : 'text-slate-500'} />}
                      </div>
                      
                      <div className={`w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] p-4 rounded-2xl border transition-all duration-500 ${isActive ? `bg-${step.color}-500/10 border-${step.color}-500/30` : isCurrent ? 'bg-white/5 border-white/20' : 'bg-transparent border-transparent opacity-40'}`}>
                        <h4 className={`text-sm font-bold ${isActive ? `text-${step.color}-400` : 'text-white'}`}>{step.title}</h4>
                        <p className="text-[10px] text-slate-400 mt-1">{step.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Completion Result */}
            {publishProgress >= 6 && (
              <div className="bg-[#0E1420] p-6 border-t border-emerald-500/30 animate-in slide-in-from-bottom-4 duration-500">
                <div className="flex flex-col md:flex-row gap-6 items-center">
                  <div className="w-24 h-24 bg-white rounded-2xl p-2 flex-shrink-0 relative group">
                    {/* Mock QR Code */}
                    <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://page.smmc.id/myzora-juli" alt="QR Code" className="w-full h-full object-contain" />
                  </div>
                  
                  <div className="flex-1 w-full">
                    <h4 className="text-emerald-400 font-bold flex items-center gap-2 mb-2">
                      <CheckCircle2 size={18} /> Funnel Siap Digunakan!
                    </h4>
                    
                    <div className="flex items-center gap-2 mb-4">
                      <div className="bg-black/50 border border-white/10 rounded-lg px-3 py-2 flex-1 flex items-center justify-between">
                        <span className="text-xs text-slate-300 font-mono truncate">https://page.smmc.id/myzora-juli</span>
                        <ExternalLink size={14} className="text-slate-500" />
                      </div>
                      <button className="bg-violet-500 hover:bg-violet-600 text-white p-2 rounded-lg transition-colors">
                        <Share2 size={18} />
                      </button>
                    </div>

                    <button 
                      onClick={() => setShowPublishModal(false)}
                      className="w-full py-2.5 rounded-xl border border-white/10 hover:bg-white/5 text-xs font-bold transition-all"
                    >
                      Tutup & Kembali ke Dashboard
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
