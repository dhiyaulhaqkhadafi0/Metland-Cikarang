"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, Monitor, Tablet, Smartphone, ZoomIn, ZoomOut, 
  PanelLeftClose, PanelLeftOpen, Save, Send, Sparkles, LayoutTemplate, 
  Settings, Type, Image as ImageIcon, LayoutGrid, Layers, BarChart3, 
  ChevronDown, CheckCircle2, Play, Wand2, Paintbrush, FileText, ChevronLeft,
  Search, Eye, Box, AlertTriangle, ArrowRight, MousePointer2, Plus,
  Globe, Target, BrainCircuit
} from 'lucide-react';

type Mode = 'aigen' | 'builder' | 'template';
type BuilderTab = 'konten' | 'desain' | 'pengaturan';
type Device = 'desktop' | 'tablet' | 'mobile';

export default function FunnelBuilderClient() {
  const [activeMode, setActiveMode] = useState<Mode>('builder');
  const [builderTab, setBuilderTab] = useState<BuilderTab>('konten');
  const [device, setDevice] = useState<Device>('desktop');
  const [zoom, setZoom] = useState(100);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Publish Modal State
  const [showPublishModal, setShowPublishModal] = useState(false);
  const [publishProgress, setPublishProgress] = useState(0);

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 10, 200));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 10, 30));

  const handlePublish = () => {
    setShowPublishModal(true);
    setPublishProgress(0);
    const interval = setInterval(() => {
      setPublishProgress(prev => {
        if (prev >= 4) {
          clearInterval(interval);
          return 4;
        }
        return prev + 1;
      });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#111111] text-slate-200 font-sans flex flex-col overflow-hidden h-screen">
      
      {/* ========================================================
          1. TOP HEADER (BRAND & MAIN ACTIONS)
          ======================================================== */}
      <header className="h-14 bg-[#0a0a0a] border-b border-white/5 flex items-center justify-between px-4 shrink-0 z-50 shadow-md">
        <div className="flex items-center gap-4">
          <Link 
            href="/dashboard/smi-agent" 
            className="p-2 hover:bg-white/5 rounded-lg transition-colors text-slate-400 hover:text-white"
          >
            <ArrowLeft size={18} />
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500/20 to-rose-500/20 border border-amber-500/30 flex items-center justify-center">
              <Sparkles size={16} className="text-amber-400" />
            </div>
            <div>
              <h1 className="text-sm font-bold text-white tracking-wide">AI Funnel Studio</h1>
              <p className="text-[10px] text-slate-500 font-medium">Metland Myzora - Campaign Launch</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2 mr-4 px-3 py-1.5 rounded-full bg-white/5 border border-white/5 text-[11px] text-emerald-400 font-mono">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            SMI Engine Active
          </div>
          <button className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg text-xs font-bold transition-all border border-white/10 flex items-center gap-2">
            <Save size={14} /> Simpan Draft
          </button>
          <button 
            onClick={handlePublish}
            className="px-4 py-2 bg-gradient-to-r from-amber-600 to-rose-600 hover:from-amber-500 hover:to-rose-500 text-white rounded-lg text-xs font-bold transition-all shadow-[0_0_15px_rgba(245,158,11,0.3)] flex items-center gap-2"
          >
            <Send size={14} /> Simpan & Terbitkan
          </button>
        </div>
      </header>

      {/* ========================================================
          2. WORKSPACE AREA (SIDEBAR + CANVAS)
          ======================================================== */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* --- LEFT SIDEBAR --- */}
        <aside 
          className={`${isSidebarOpen ? 'w-[340px]' : 'w-0'} bg-[#161618] border-r border-white/5 flex flex-col transition-all duration-300 shrink-0 z-40 relative`}
        >
          {isSidebarOpen && (
            <>
              {/* Main Modes Selector (AI Gen | Builder | Template) */}
              <div className="p-4 border-b border-white/5 bg-[#1a1a1c]">
                <div className="flex bg-[#0a0a0a] rounded-xl p-1 border border-white/5">
                  <button 
                    onClick={() => setActiveMode('aigen')}
                    className={`flex-1 py-1.5 rounded-lg text-[11px] font-bold flex items-center justify-center gap-1.5 transition-all ${activeMode === 'aigen' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30 shadow-sm' : 'text-slate-400 hover:text-white'}`}
                  >
                    <Wand2 size={12} /> AI Gen
                  </button>
                  <button 
                    onClick={() => setActiveMode('builder')}
                    className={`flex-1 py-1.5 rounded-lg text-[11px] font-bold flex items-center justify-center gap-1.5 transition-all ${activeMode === 'builder' ? 'bg-white/10 text-white border border-white/20 shadow-sm' : 'text-slate-400 hover:text-white'}`}
                  >
                    <Paintbrush size={12} /> Builder
                  </button>
                  <button 
                    onClick={() => setActiveMode('template')}
                    className={`flex-1 py-1.5 rounded-lg text-[11px] font-bold flex items-center justify-center gap-1.5 transition-all ${activeMode === 'template' ? 'bg-white/10 text-white border border-white/20 shadow-sm' : 'text-slate-400 hover:text-white'}`}
                  >
                    <LayoutTemplate size={12} /> Template
                  </button>
                </div>
              </div>

              {/* Sidebar Content Based on Mode */}
              <div className="flex-1 overflow-y-auto custom-scrollbar">
                
                {/* MODE: AI GENERATE */}
                {activeMode === 'aigen' && (
                  <div className="p-5 animate-in fade-in duration-300">
                    <div className="mb-6 text-center">
                      <div className="w-12 h-12 bg-amber-500/10 border border-amber-500/30 rounded-2xl flex items-center justify-center mx-auto mb-3">
                        <Sparkles size={24} className="text-amber-400" />
                      </div>
                      <h3 className="text-sm font-bold text-white mb-1">Generate via Prompt</h3>
                      <p className="text-[11px] text-slate-400">Deskripsikan landing page yang Anda inginkan, AI akan merancang semuanya secara instan.</p>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 block">Prompt AI</label>
                        <textarea 
                          className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl p-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-amber-500/50 resize-none h-32"
                          placeholder="Buatkan landing page untuk promo kemerdekaan Myzora, target audiens keluarga muda, tonjolkan cicilan 5 jutaan dan akses stasiun KRL..."
                        ></textarea>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 block">Tone / Style Visual</label>
                        <div className="flex flex-wrap gap-2">
                          {['Premium Luxury', 'Minimalist', 'Colorful Promo', 'Corporate'].map(tone => (
                            <button key={tone} className="px-3 py-1.5 bg-[#0a0a0a] border border-white/5 hover:border-white/20 rounded-lg text-[10px] font-medium text-slate-300 transition-colors">
                              {tone}
                            </button>
                          ))}
                        </div>
                      </div>

                      <button className="w-full py-3 mt-4 bg-gradient-to-r from-amber-600 to-rose-600 hover:from-amber-500 hover:to-rose-500 text-white rounded-xl text-xs font-bold transition-all shadow-[0_0_15px_rgba(245,158,11,0.2)] flex items-center justify-center gap-2">
                        <Wand2 size={16} /> Generate Landing Page
                      </button>
                    </div>
                  </div>
                )}

                {/* MODE: BUILDER (MANUAL) */}
                {activeMode === 'builder' && (
                  <div className="animate-in fade-in duration-300 flex flex-col h-full">
                    
                    {/* Scalev-like 3 Tabs */}
                    <div className="flex border-b border-white/5 bg-[#161618]">
                      <button 
                        onClick={() => setBuilderTab('konten')}
                        className={`flex-1 py-3 text-xs font-bold border-b-2 transition-all ${builderTab === 'konten' ? 'border-amber-500 text-amber-400' : 'border-transparent text-slate-400 hover:text-white'}`}
                      >
                        Konten
                      </button>
                      <button 
                        onClick={() => setBuilderTab('desain')}
                        className={`flex-1 py-3 text-xs font-bold border-b-2 transition-all ${builderTab === 'desain' ? 'border-amber-500 text-amber-400' : 'border-transparent text-slate-400 hover:text-white'}`}
                      >
                        Desain
                      </button>
                      <button 
                        onClick={() => setBuilderTab('pengaturan')}
                        className={`flex-1 py-3 text-xs font-bold border-b-2 transition-all ${builderTab === 'pengaturan' ? 'border-amber-500 text-amber-400' : 'border-transparent text-slate-400 hover:text-white'}`}
                      >
                        Pengaturan
                      </button>
                    </div>

                    {/* Konten Tab */}
                    {builderTab === 'konten' && (
                      <div className="p-4 space-y-4">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Komponen Halaman</h4>
                          <button className="text-[10px] text-amber-400 hover:text-amber-300 flex items-center gap-1 font-bold">
                            <Plus size={10} /> Tambah
                          </button>
                        </div>
                        
                        {/* Section Item */}
                        <div className="bg-[#1a1a1c] border border-white/10 rounded-xl overflow-hidden group">
                          <div className="p-3 bg-white/5 flex items-center justify-between cursor-pointer border-b border-white/5">
                            <div className="flex items-center gap-2">
                              <ChevronDown size={14} className="text-slate-400" />
                              <Layers size={14} className="text-amber-400" />
                              <span className="text-xs font-bold text-white">Hero Section</span>
                            </div>
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                              <button className="p-1 hover:bg-white/10 rounded text-slate-400"><Eye size={12} /></button>
                              <button className="p-1 hover:bg-white/10 rounded text-slate-400"><Settings size={12} /></button>
                            </div>
                          </div>
                          <div className="p-3 bg-[#0a0a0a] space-y-3">
                            {/* Rich Text Editor Mockup */}
                            <div>
                              <div className="flex items-center gap-2 bg-[#161618] border border-white/5 rounded-t-lg p-2 overflow-x-auto">
                                <span className="font-serif font-bold px-2 cursor-pointer hover:bg-white/10 rounded text-sm">B</span>
                                <span className="italic px-2 cursor-pointer hover:bg-white/10 rounded text-sm">I</span>
                                <span className="underline px-2 cursor-pointer hover:bg-white/10 rounded text-sm">U</span>
                                <div className="w-px h-4 bg-white/10 mx-1"></div>
                                <span className="text-[10px] text-slate-300 px-2 cursor-pointer flex items-center gap-1 hover:bg-white/10 rounded">Normal <ChevronDown size={10} /></span>
                              </div>
                              <textarea 
                                className="w-full bg-[#111111] border border-t-0 border-white/5 rounded-b-lg p-3 text-xs text-white focus:outline-none focus:border-amber-500/50 resize-y min-h-[80px]"
                                defaultValue="Rumah Elite Budget Ngirit Myzora Metland Cikarang"
                              ></textarea>
                            </div>
                            {/* Image Uploader Mockup */}
                            <div className="border border-dashed border-white/20 rounded-lg p-4 text-center cursor-pointer hover:bg-white/5 transition-colors">
                              <ImageIcon size={20} className="mx-auto mb-2 text-slate-500" />
                              <p className="text-[10px] text-slate-400 font-medium">Ubah Background Hero</p>
                            </div>
                          </div>
                        </div>

                        {/* Other Sections */}
                        {['Why Choose Us', 'Benefit Cards', 'Gallery Carousel', 'Form Pemesanan'].map((sec, idx) => (
                          <div key={idx} className="bg-[#1a1a1c] border border-white/5 hover:border-white/20 rounded-xl p-3 flex items-center justify-between cursor-pointer transition-colors">
                            <div className="flex items-center gap-2">
                              <ChevronLeft size={14} className="text-slate-500" />
                              <Box size={14} className="text-slate-400" />
                              <span className="text-xs font-medium text-slate-300">{sec}</span>
                            </div>
                            <button className="text-slate-500 hover:text-white"><Settings size={12} /></button>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {/* Desain & Pengaturan Dummies */}
                    {builderTab !== 'konten' && (
                      <div className="p-8 text-center opacity-50 flex flex-col items-center justify-center h-48">
                        <Paintbrush size={32} className="mb-3" />
                        <p className="text-xs">Opsi {builderTab} sedang dimuat...</p>
                      </div>
                    )}
                  </div>
                )}

                {/* MODE: TEMPLATES */}
                {activeMode === 'template' && (
                  <div className="p-4 animate-in fade-in duration-300 space-y-4">
                    <div className="relative">
                      <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                      <input 
                        type="text" 
                        placeholder="Cari template..." 
                        className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-2 pl-9 pr-3 text-xs text-white focus:outline-none focus:border-amber-500/50"
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 gap-4">
                      {[
                        { title: 'Promo Launching (High CVR)', type: 'Lead Gen', img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' },
                        { title: 'Open House Registration', type: 'Event', img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' },
                        { title: 'Sales Personal Branding', type: 'Branding', img: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' },
                      ].map((tpl, i) => (
                        <div key={i} className="group cursor-pointer rounded-xl overflow-hidden border border-white/5 hover:border-amber-500/50 transition-all">
                          <div className="h-28 bg-slate-800 relative overflow-hidden">
                            <div className="absolute inset-0 bg-cover bg-center opacity-50 group-hover:opacity-100 transition-opacity" style={{ backgroundImage: `url(${tpl.img})` }}></div>
                            <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                              <span className="bg-amber-500 text-white text-[10px] font-bold px-3 py-1.5 rounded-lg">Gunakan Template</span>
                            </div>
                          </div>
                          <div className="p-3 bg-[#1a1a1c]">
                            <p className="text-[10px] text-amber-400 font-bold mb-1 uppercase">{tpl.type}</p>
                            <h4 className="text-xs font-bold text-white">{tpl.title}</h4>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </>
          )}

          {/* Toggle Sidebar Collapse Button (Positioned absolute outside right) */}
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="absolute -right-3.5 top-1/2 -translate-y-1/2 w-7 h-14 bg-[#161618] border border-white/10 border-l-0 rounded-r-xl flex items-center justify-center text-slate-400 hover:text-white hover:bg-[#1a1a1c] z-50 shadow-md"
          >
            {isSidebarOpen ? <PanelLeftClose size={14} /> : <PanelLeftOpen size={14} />}
          </button>
        </aside>

        {/* --- RIGHT CANVAS (LIVE PREVIEW) --- */}
        <div className="flex-1 bg-[#0a0a0a] flex flex-col relative overflow-hidden">
          
          {/* Canvas Toolbar */}
          <div className="h-12 border-b border-white/5 flex items-center justify-between px-4 shrink-0 bg-[#111111]">
            <div className="flex items-center gap-2">
              <div className="px-2 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded text-[10px] text-emerald-400 flex items-center gap-1 font-medium">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                Only you are editing this page
              </div>
            </div>

            {/* Device & Zoom Controls */}
            <div className="flex items-center gap-4 bg-[#1a1a1c] rounded-lg p-1 border border-white/5">
              <div className="flex items-center gap-1 border-r border-white/10 pr-2">
                <button onClick={() => setDevice('desktop')} className={`p-1.5 rounded ${device === 'desktop' ? 'bg-white/10 text-white' : 'text-slate-500 hover:text-slate-300'}`}><Monitor size={14} /></button>
                <button onClick={() => setDevice('tablet')} className={`p-1.5 rounded ${device === 'tablet' ? 'bg-white/10 text-white' : 'text-slate-500 hover:text-slate-300'}`}><Tablet size={14} /></button>
                <button onClick={() => setDevice('mobile')} className={`p-1.5 rounded ${device === 'mobile' ? 'bg-white/10 text-white' : 'text-slate-500 hover:text-slate-300'}`}><Smartphone size={14} /></button>
              </div>
              <div className="flex items-center gap-2 pl-1 pr-1">
                <button onClick={handleZoomOut} className="p-1 hover:bg-white/5 rounded text-slate-400 hover:text-white"><ZoomOut size={14} /></button>
                <span className="text-[11px] font-mono font-medium text-slate-300 w-10 text-center">{zoom}%</span>
                <button onClick={handleZoomIn} className="p-1 hover:bg-white/5 rounded text-slate-400 hover:text-white"><ZoomIn size={14} /></button>
              </div>
            </div>
          </div>

          {/* Canvas Area (Scrollable) */}
          <div className="flex-1 overflow-auto bg-grid-slate-800/[0.04] p-8 flex items-start justify-center relative">
            
            {/* The "Paper" / Mockup Container */}
            <div 
              className={`bg-white shadow-2xl transition-all duration-300 relative origin-top ${
                device === 'desktop' ? 'w-full max-w-[1200px]' : 
                device === 'tablet' ? 'w-[768px]' : 'w-[375px]'
              }`}
              style={{ transform: `scale(${zoom / 100})`, minHeight: '1000px' }}
            >
              {/* Mockup Landing Page Content (Luxury Aesthetic) */}
              <div className="font-sans text-slate-800">
                {/* Navbar */}
                <nav className="flex justify-between items-center p-6 lg:px-12 bg-white/90 backdrop-blur sticky top-0 z-10 border-b border-slate-100">
                  <div className="font-black text-2xl tracking-tighter text-slate-900">MYZORA<span className="text-rose-600">.</span></div>
                  <div className="hidden md:flex gap-8 text-sm font-semibold text-slate-600">
                    <span className="text-slate-900 cursor-pointer">Concept</span>
                    <span className="cursor-pointer hover:text-slate-900 transition-colors">Facilities</span>
                    <span className="cursor-pointer hover:text-slate-900 transition-colors">Location</span>
                  </div>
                  <button className="bg-slate-900 text-white px-6 py-2.5 rounded-full text-sm font-bold shadow-lg hover:bg-slate-800 transition-colors">Get Pricelist</button>
                </nav>

                {/* Hero */}
                <div className="relative pt-24 pb-32 px-6 text-center">
                  <div className="absolute inset-0 bg-slate-50 z-0"></div>
                  <div className="relative z-10 max-w-4xl mx-auto">
                    <span className="inline-block py-1 px-3 rounded-full bg-rose-100 text-rose-700 font-bold text-[11px] uppercase tracking-widest mb-6">Metland Cikarang</span>
                    <h1 className="text-5xl md:text-7xl font-black text-slate-900 leading-tight mb-8">
                      Rumah Elite Budget Ngirit<br />
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-amber-500">Myzora Metland Cikarang</span>
                    </h1>
                    <p className="text-lg md:text-xl text-slate-500 mb-10 max-w-2xl mx-auto">
                      Uang habis buat bayar kontrakan tapi ga ada bekasnya? RUGI DONG 😆. Beralih ke Myzora, hunian mewah cicilan 5 jutaan.
                    </p>
                    
                    <div className="relative rounded-3xl overflow-hidden shadow-2xl mx-auto border-[8px] border-white max-w-4xl">
                      <img src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" alt="Myzora" className="w-full h-auto object-cover" />
                      {/* Play Button overlay mock */}
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                        <div className="w-20 h-20 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
                          <Play size={32} className="text-white fill-current ml-2" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Features */}
                <div className="py-24 px-6 max-w-6xl mx-auto">
                  <div className="grid md:grid-cols-3 gap-12">
                    {[
                      { icon: '🚆', title: '5 Menit ke Stasiun', desc: 'Akses komuter line langsung tanpa ribet macet.' },
                      { icon: '🏖️', title: 'Clubhouse Premium', desc: 'Fasilitas bintang 5 untuk akhir pekan keluarga Anda.' },
                      { icon: '🛡️', title: 'Keamanan 24 Jam', desc: 'One gate system dengan pengawasan CCTV & smart home.' }
                    ].map((feat, i) => (
                      <div key={i} className="text-center group">
                        <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-6 group-hover:-translate-y-2 transition-transform shadow-sm">
                          {feat.icon}
                        </div>
                        <h3 className="text-xl font-bold mb-3">{feat.title}</h3>
                        <p className="text-slate-500 leading-relaxed">{feat.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Editable Overlay Highlight Mockup */}
              {activeMode === 'builder' && (
                <div className="absolute top-[80px] left-0 right-0 h-[800px] border-2 border-amber-500 pointer-events-none z-20 shadow-[0_0_0_9999px_rgba(0,0,0,0.1)]">
                  <div className="absolute top-0 right-0 bg-amber-500 text-black text-[10px] font-bold px-3 py-1.5 shadow-lg flex items-center gap-2 pointer-events-auto cursor-pointer hover:bg-amber-400">
                    <MousePointer2 size={12} /> Sedang Mengedit Hero Section
                  </div>
                </div>
              )}
            </div>
            
            {/* SMI Intelligence Panel (Moved to bottom of canvas scroll area) */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[800px] max-w-[90%] bg-[#1a1a1c]/95 backdrop-blur-xl border border-white/10 p-5 rounded-2xl shadow-2xl flex gap-6 z-30">
              <div className="flex-1 border-r border-white/5 pr-6">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-0.5 flex items-center gap-1.5">
                      <BarChart3 size={14} /> Funnel Score
                    </h4>
                    <p className="text-[10px] text-slate-400">Prediksi Konversi AI</p>
                  </div>
                  <div className="w-10 h-10 rounded-full border-2 border-emerald-500 flex items-center justify-center bg-emerald-500/10">
                    <span className="text-sm font-black text-emerald-400">92</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <span className="text-[9px] px-2 py-1 bg-emerald-500/20 text-emerald-300 rounded font-bold">Headline: A+</span>
                  <span className="text-[9px] px-2 py-1 bg-amber-500/20 text-amber-300 rounded font-bold">Trust: B-</span>
                </div>
              </div>
              
              <div className="flex-[1.5]">
                <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <AlertTriangle size={14} /> AI Recommendation
                </h4>
                <div className="flex items-center justify-between bg-white/5 rounded-lg p-2 border border-white/5">
                  <div>
                    <p className="text-[11px] font-bold text-white mb-0.5">Scarcity Banner Belum Ada</p>
                    <p className="text-[9px] text-slate-400">Tambahkan banner "Sisa unit terbatas" untuk urgensi.</p>
                  </div>
                  <button className="px-3 py-1.5 bg-amber-500/20 hover:bg-amber-500/40 text-amber-400 text-[10px] font-bold rounded-md transition-colors">
                    Terapkan
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ========================================================
          3. PUBLISH MODAL (THE KILLER FEATURE)
          ======================================================== */}
      {showPublishModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-[#0a0a0a]/90 backdrop-blur-sm" onClick={() => publishProgress >= 4 && setShowPublishModal(false)}></div>
          
          <div className="bg-[#161618] border border-amber-500/30 rounded-3xl w-full max-w-2xl relative z-10 overflow-hidden shadow-[0_0_50px_rgba(245,158,11,0.15)]">
            <div className="bg-gradient-to-r from-[#1a1a1c] to-[#111111] p-6 border-b border-white/5 flex items-center gap-4 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 blur-[100px] rounded-full"></div>
              <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-rose-600 rounded-2xl flex items-center justify-center shadow-lg relative z-10 p-[1px]">
                <div className="w-full h-full bg-[#161618] rounded-[15px] flex items-center justify-center">
                  <Send className="text-amber-400" size={20} />
                </div>
              </div>
              <div className="relative z-10">
                <h3 className="text-xl font-bold text-white">Menerbitkan Funnel...</h3>
                <p className="text-xs text-slate-400">SMI Core sedang memproses integrasi ke Lead Center</p>
              </div>
            </div>

            <div className="p-8">
              <div className="space-y-5">
                {[
                  { title: 'Optimasi Kecepatan & SEO', icon: Globe },
                  { title: 'Setup WhatsApp & Meta Pixel', icon: Target },
                  { title: 'Koneksi SMMC Lead Center', icon: BrainCircuit },
                  { title: 'Funnel Online & Siap Menghasilkan Prospek', icon: CheckCircle2 },
                ].map((step, idx) => {
                  const isActive = publishProgress > idx;
                  const isCurrent = publishProgress === idx;
                  return (
                    <div key={idx} className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-all duration-500 ${isActive ? 'bg-amber-500 text-black border-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.4)]' : isCurrent ? 'bg-[#1a1a1c] text-amber-400 border-amber-500/50 animate-pulse' : 'bg-[#111111] text-slate-600 border-white/5'}`}>
                        {isActive ? <CheckCircle2 size={20} /> : <step.icon size={18} />}
                      </div>
                      <div className="flex-1">
                        <h4 className={`text-sm font-bold transition-colors ${isActive ? 'text-amber-400' : isCurrent ? 'text-white' : 'text-slate-500'}`}>{step.title}</h4>
                        <div className="h-1 w-full bg-[#111111] rounded-full mt-2 overflow-hidden">
                          <div className={`h-full bg-gradient-to-r from-amber-500 to-rose-500 transition-all duration-1000 ${isActive ? 'w-full' : isCurrent ? 'w-1/2 animate-pulse' : 'w-0'}`}></div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {publishProgress >= 4 && (
              <div className="bg-[#111111] p-6 border-t border-white/5 animate-in slide-in-from-bottom-4 duration-500 text-center relative z-10">
                <div className="bg-[#1a1a1c] border border-white/10 rounded-xl p-4 flex items-center justify-between mb-4">
                  <span className="text-xs text-slate-300 font-mono">https://page.smmc.id/myzora-merdeka</span>
                  <button className="text-amber-400 hover:text-amber-300 font-bold text-xs flex items-center gap-1 bg-amber-500/10 px-3 py-1.5 rounded-lg">
                    Salin Link <ArrowRight size={12} />
                  </button>
                </div>
                <button 
                  onClick={() => setShowPublishModal(false)}
                  className="w-full py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl text-xs font-bold transition-all border border-white/10"
                >
                  Kembali ke Builder
                </button>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
