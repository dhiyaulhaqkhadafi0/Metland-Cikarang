"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, Monitor, Tablet, Smartphone, ZoomIn, ZoomOut, 
  PanelLeftClose, PanelLeftOpen, Save, Send, Layout, LayoutTemplate, 
  Settings, Type, Image as ImageIcon, LayoutGrid, Layers, BarChart3, 
  ChevronDown, CheckCircle2, Play, Wand2, Paintbrush, FileText, ChevronLeft,
  Search, Eye, Box, AlertTriangle, ArrowRight, MousePointer2, Plus,
  Globe, Target, BrainCircuit, Undo, RotateCcw,
  Video, List, MessageSquare, HelpCircle, GalleryHorizontal, 
  MousePointerClick, Code, PlaySquare, Navigation, Minus, FileCode2,
  Bold, Italic, Underline, Strikethrough, Link as LinkIcon, ListOrdered, 
  AlignLeft, AlignCenter, AlignRight, Smile, Heading, Palette, Type as FontIcon, Baseline, RemoveFormatting, X
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

  const [activeComponent, setActiveComponent] = useState<string | null>(null);
  const [isAdvanceOpen, setIsAdvanceOpen] = useState(false);
  const [advanceTab, setAdvanceTab] = useState<'warna' | 'gambar'>('warna');

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

  const componentsList = [
    { id: 'Teks', icon: Type },
    { id: 'Gambar', icon: ImageIcon },
    { id: 'Video', icon: Video },
    { id: 'Form Pemesanan', icon: FileText },
    { id: 'Daftar/List', icon: List },
    { id: 'Testimoni', icon: MessageSquare },
    { id: 'FAQ', icon: HelpCircle },
    { id: 'Carousel', icon: GalleryHorizontal },
    { id: 'Tombol', icon: MousePointerClick },
    { id: 'Embed', icon: Code },
    { id: 'YouTube', icon: PlaySquare },
    { id: 'Scroll Target', icon: Navigation },
    { id: 'Divider', icon: Minus },
    { id: 'Section', icon: Layers },
    { id: 'Html', icon: FileCode2 },
  ];

  return (
    <div className="min-h-screen bg-[#111111] text-slate-200 font-sans flex flex-col overflow-hidden h-screen">
      
      {/* ========================================================
          1. TOP HEADER (BRAND & MAIN ACTIONS)
          ======================================================== */}
      <header className="h-16 bg-[#0a0a0a] border-b border-white/5 flex items-center justify-between px-4 shrink-0 z-50 shadow-md">
        <div className="flex items-center gap-4">
          <Link 
            href="/dashboard/smi-agent" 
            className="p-2.5 hover:bg-white/5 rounded-xl transition-colors text-slate-400 hover:text-white bg-white/5"
          >
            <ArrowLeft size={18} />
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500/20 to-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
              <Layout size={20} className="text-emerald-400" />
            </div>
            <div>
              <h1 className="text-base font-bold text-white tracking-wide">AI Funnel Studio</h1>
              <p className="text-xs text-slate-400 font-medium">Metland Myzora - Campaign Launch</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2 mr-4 px-3 py-1.5 rounded-full bg-white/5 border border-white/5 text-xs text-emerald-400 font-mono">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            SMI Engine Active
          </div>
          <button className="p-2 hover:bg-white/5 text-slate-400 rounded-lg transition-colors tooltip" title="Undo">
            <Undo size={18} />
          </button>
          <button className="p-2 hover:bg-white/5 text-slate-400 rounded-lg transition-colors tooltip mr-2" title="Reset Default">
            <RotateCcw size={18} />
          </button>
          <button className="px-4 py-2.5 bg-white/5 hover:bg-white/10 text-white rounded-lg text-sm font-bold transition-all border border-white/10 flex items-center gap-2">
            <Save size={16} /> Simpan Draft
          </button>
          <button 
            onClick={handlePublish}
            className="px-4 py-2.5 bg-gradient-to-r from-amber-600 to-rose-600 hover:from-amber-500 hover:to-rose-500 text-white rounded-lg text-sm font-bold transition-all shadow-[0_0_15px_rgba(245,158,11,0.3)] flex items-center gap-2"
          >
            <Send size={16} /> Simpan & Terbitkan
          </button>
        </div>
      </header>

      {/* ========================================================
          2. WORKSPACE AREA (SIDEBAR + CANVAS)
          ======================================================== */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* --- LEFT SIDEBAR --- */}
        <aside 
          className={`${isSidebarOpen ? 'w-[360px]' : 'w-0'} bg-[#161618] border-r border-white/5 flex flex-col transition-all duration-300 shrink-0 z-40 relative`}
        >
          {isSidebarOpen && (
            <>
              {/* Main Modes Selector (AI Gen | Builder | Template) */}
              <div className="p-4 border-b border-white/5 bg-[#1a1a1c]">
                <div className="flex bg-[#0a0a0a] rounded-xl p-1 border border-white/5">
                  <button 
                    onClick={() => setActiveMode('aigen')}
                    className={`flex-1 py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${activeMode === 'aigen' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30 shadow-sm' : 'text-slate-400 hover:text-white'}`}
                  >
                    <Wand2 size={14} /> AI Gen
                  </button>
                  <button 
                    onClick={() => setActiveMode('builder')}
                    className={`flex-1 py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${activeMode === 'builder' ? 'bg-white/10 text-white border border-white/20 shadow-sm' : 'text-slate-400 hover:text-white'}`}
                  >
                    <Paintbrush size={14} /> Builder
                  </button>
                  <button 
                    onClick={() => setActiveMode('template')}
                    className={`flex-1 py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${activeMode === 'template' ? 'bg-white/10 text-white border border-white/20 shadow-sm' : 'text-slate-400 hover:text-white'}`}
                  >
                    <LayoutTemplate size={14} /> Template
                  </button>
                </div>
              </div>

              {/* Sidebar Content Based on Mode */}
              <div className="flex-1 overflow-y-auto custom-scrollbar">
                
                {/* MODE: AI GENERATE */}
                {activeMode === 'aigen' && (
                  <div className="p-6 animate-in fade-in duration-300">
                    <div className="mb-6 text-center">
                      <div className="w-14 h-14 bg-amber-500/10 border border-amber-500/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <Wand2 size={28} className="text-amber-400" />
                      </div>
                      <h3 className="text-base font-bold text-white mb-2">Generate via Prompt</h3>
                      <p className="text-xs text-slate-400 leading-relaxed">Deskripsikan landing page yang Anda inginkan, AI akan merancang semuanya secara instan.</p>
                    </div>

                    <div className="space-y-5">
                      <div>
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Prompt AI</label>
                        <textarea 
                          className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl p-4 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-amber-500/50 resize-none h-40"
                          placeholder="Buatkan landing page untuk promo kemerdekaan Myzora, target audiens keluarga muda, tonjolkan cicilan 5 jutaan dan akses stasiun KRL..."
                        ></textarea>
                      </div>

                      <div className="space-y-3">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Tone / Style Visual</label>
                        <div className="flex flex-wrap gap-2">
                          {['Premium Luxury', 'Minimalist', 'Colorful Promo', 'Corporate'].map(tone => (
                            <button key={tone} className="px-4 py-2 bg-[#0a0a0a] border border-white/5 hover:border-white/20 rounded-lg text-xs font-medium text-slate-300 transition-colors">
                              {tone}
                            </button>
                          ))}
                        </div>
                      </div>

                      <button className="w-full py-3.5 mt-6 bg-gradient-to-r from-amber-600 to-rose-600 hover:from-amber-500 hover:to-rose-500 text-white rounded-xl text-sm font-bold transition-all shadow-[0_0_15px_rgba(245,158,11,0.2)] flex items-center justify-center gap-2">
                        <Wand2 size={18} /> Generate Landing Page
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
                        onClick={() => { setBuilderTab('konten'); setActiveComponent(null); }}
                        className={`flex-1 py-4 text-sm font-bold border-b-2 transition-all ${builderTab === 'konten' ? 'border-amber-500 text-amber-400' : 'border-transparent text-slate-400 hover:text-white'}`}
                      >
                        Konten
                      </button>
                      <button 
                        onClick={() => setBuilderTab('desain')}
                        className={`flex-1 py-4 text-sm font-bold border-b-2 transition-all ${builderTab === 'desain' ? 'border-amber-500 text-amber-400' : 'border-transparent text-slate-400 hover:text-white'}`}
                      >
                        Desain
                      </button>
                      <button 
                        onClick={() => setBuilderTab('pengaturan')}
                        className={`flex-1 py-4 text-sm font-bold border-b-2 transition-all ${builderTab === 'pengaturan' ? 'border-amber-500 text-amber-400' : 'border-transparent text-slate-400 hover:text-white'}`}
                      >
                        Pengaturan
                      </button>
                    </div>

                    {/* Konten Tab */}
                    {builderTab === 'konten' && (
                      <div className="flex-1 flex flex-col">
                        
                        {/* LIST OF COMPONENTS VIEW */}
                        {!activeComponent && (
                          <div className="p-5 space-y-5 animate-in slide-in-from-left-4 duration-300">
                            <div className="flex justify-between items-center mb-4">
                              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Komponen Halaman</h4>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-3">
                              {componentsList.map((comp) => (
                                <div 
                                  key={comp.id}
                                  onClick={() => setActiveComponent(comp.id)}
                                  className="bg-[#1a1a1c] border border-white/5 hover:border-amber-500/50 hover:bg-amber-500/5 rounded-xl p-4 flex flex-col items-center justify-center gap-3 cursor-pointer transition-all group"
                                >
                                  <comp.icon size={24} className="text-slate-400 group-hover:text-amber-400 transition-colors" />
                                  <span className="text-xs font-semibold text-slate-300 group-hover:text-white text-center">{comp.id}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* ACTIVE COMPONENT EDITOR (e.g. TEXT) */}
                        {activeComponent && (
                          <div className="flex-1 flex flex-col animate-in slide-in-from-right-4 duration-300">
                            <div className="p-4 border-b border-white/5 bg-[#1a1a1c] flex items-center justify-between sticky top-0 z-10">
                              <div className="flex items-center gap-3">
                                <button 
                                  onClick={() => setActiveComponent(null)}
                                  className="p-1.5 hover:bg-white/10 rounded-lg text-slate-400 hover:text-white transition-colors"
                                >
                                  <ChevronLeft size={20} />
                                </button>
                                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                                  {React.createElement(componentsList.find(c => c.id === activeComponent)?.icon || Type, { size: 16, className: 'text-amber-400' })}
                                  Pengaturan {activeComponent}
                                </h3>
                              </div>
                            </div>
                            
                            <div className="p-5 space-y-6 overflow-y-auto">
                              
                              {/* If Teks is selected, show rich text editor */}
                              {activeComponent === 'Teks' ? (
                                <>
                                  <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-400">Konten Teks</label>
                                    
                                    {/* Rich Text Toolbar Mockup */}
                                    <div className="border border-white/10 rounded-xl overflow-hidden bg-[#161618]">
                                      <div className="bg-[#1a1a1c] border-b border-white/10 p-2 flex flex-wrap gap-1">
                                        {/* Basic Formatting */}
                                        <button className="w-8 h-8 flex items-center justify-center hover:bg-white/10 rounded text-slate-300"><Bold size={16} /></button>
                                        <button className="w-8 h-8 flex items-center justify-center hover:bg-white/10 rounded text-slate-300"><Italic size={16} /></button>
                                        <button className="w-8 h-8 flex items-center justify-center hover:bg-white/10 rounded text-slate-300"><Underline size={16} /></button>
                                        <button className="w-8 h-8 flex items-center justify-center hover:bg-white/10 rounded text-slate-300"><Strikethrough size={16} /></button>
                                        
                                        <div className="w-px h-6 bg-white/10 mx-1 my-auto"></div>
                                        
                                        {/* Typography */}
                                        <button className="w-8 h-8 flex items-center justify-center hover:bg-white/10 rounded text-slate-300"><Baseline size={16} /></button>
                                        <button className="w-8 h-8 flex items-center justify-center hover:bg-white/10 rounded text-slate-300"><Palette size={16} /></button>
                                        <div className="h-8 flex items-center px-2 hover:bg-white/10 rounded text-slate-300 text-xs font-medium gap-1 cursor-pointer">
                                          14px <ChevronDown size={14} />
                                        </div>
                                        <div className="h-8 flex items-center px-2 hover:bg-white/10 rounded text-slate-300 text-xs font-medium gap-1 cursor-pointer font-serif">
                                          Inter <ChevronDown size={14} />
                                        </div>
                                        
                                        <div className="w-px h-6 bg-white/10 mx-1 my-auto"></div>

                                        {/* Alignment & Lists */}
                                        <button className="w-8 h-8 flex items-center justify-center hover:bg-white/10 rounded text-slate-300"><AlignLeft size={16} /></button>
                                        <button className="w-8 h-8 flex items-center justify-center hover:bg-white/10 rounded text-slate-300"><AlignCenter size={16} /></button>
                                        <button className="w-8 h-8 flex items-center justify-center hover:bg-white/10 rounded text-slate-300"><AlignRight size={16} /></button>
                                        <button className="w-8 h-8 flex items-center justify-center hover:bg-white/10 rounded text-slate-300"><ListOrdered size={16} /></button>
                                        <button className="w-8 h-8 flex items-center justify-center hover:bg-white/10 rounded text-slate-300"><List size={16} /></button>

                                        <div className="w-px h-6 bg-white/10 mx-1 my-auto"></div>

                                        {/* Insertions */}
                                        <button className="w-8 h-8 flex items-center justify-center hover:bg-white/10 rounded text-slate-300"><LinkIcon size={16} /></button>
                                        <button className="w-8 h-8 flex items-center justify-center hover:bg-white/10 rounded text-slate-300"><ImageIcon size={16} /></button>
                                        <button className="w-8 h-8 flex items-center justify-center hover:bg-white/10 rounded text-slate-300"><Smile size={16} /></button>
                                        
                                        <div className="flex-1"></div>
                                        <button className="w-8 h-8 flex items-center justify-center hover:bg-white/10 rounded text-slate-400 hover:text-rose-400" title="Remove Formatting"><RemoveFormatting size={16} /></button>
                                      </div>
                                      <textarea 
                                        className="w-full bg-[#0a0a0a] p-4 text-sm text-white focus:outline-none resize-y min-h-[150px] font-sans"
                                        defaultValue="Rumah Elite Budget Ngirit Myzora Metland Cikarang"
                                      ></textarea>
                                    </div>
                                  </div>

                                  {/* Advance Dropdown */}
                                  <div className="border border-white/10 rounded-xl overflow-hidden">
                                    <button 
                                      onClick={() => setIsAdvanceOpen(!isAdvanceOpen)}
                                      className="w-full bg-[#1a1a1c] p-4 flex items-center justify-between hover:bg-white/5 transition-colors"
                                    >
                                      <span className="text-sm font-bold text-white">Advance</span>
                                      <ChevronDown size={18} className={`text-slate-400 transition-transform ${isAdvanceOpen ? 'rotate-180' : ''}`} />
                                    </button>
                                    
                                    {isAdvanceOpen && (
                                      <div className="p-5 bg-[#0a0a0a] border-t border-white/10 space-y-5">
                                        <div className="space-y-3">
                                          <label className="text-xs font-bold text-slate-300 block">Desain</label>
                                          <p className="text-[11px] text-slate-500 mb-2">Latar (Background)</p>
                                          
                                          <div className="flex gap-2">
                                            <button className="w-10 h-10 border border-white/20 rounded-lg flex items-center justify-center hover:bg-white/5">
                                              <X size={16} className="text-slate-400" />
                                            </button>
                                            <button 
                                              onClick={() => setAdvanceTab('warna')}
                                              className={`flex-1 h-10 rounded-lg border font-bold text-xs transition-colors ${advanceTab === 'warna' ? 'bg-amber-500/20 text-amber-400 border-amber-500/50' : 'border-white/10 text-slate-300 hover:bg-white/5'}`}
                                            >
                                              Warna
                                            </button>
                                            <button 
                                              onClick={() => setAdvanceTab('gambar')}
                                              className={`flex-1 h-10 rounded-lg border font-bold text-xs transition-colors ${advanceTab === 'gambar' ? 'bg-amber-500/20 text-amber-400 border-amber-500/50' : 'border-white/10 text-slate-300 hover:bg-white/5'}`}
                                            >
                                              Gambar
                                            </button>
                                          </div>
                                          
                                          {advanceTab === 'warna' && (
                                            <div className="mt-4 animate-in fade-in">
                                              <div className="flex gap-2 mb-3">
                                                <div className="w-8 h-8 rounded-full bg-white border border-white/20 cursor-pointer"></div>
                                                <div className="w-8 h-8 rounded-full bg-[#111111] border border-white/20 cursor-pointer"></div>
                                                <div className="w-8 h-8 rounded-full bg-rose-600 border border-white/20 cursor-pointer ring-2 ring-amber-500 ring-offset-2 ring-offset-[#0a0a0a]"></div>
                                                <div className="w-8 h-8 rounded-full bg-emerald-600 border border-white/20 cursor-pointer"></div>
                                                <div className="w-8 h-8 rounded-full bg-blue-600 border border-white/20 cursor-pointer"></div>
                                              </div>
                                              <div className="relative">
                                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-mono text-xs">#</span>
                                                <input type="text" defaultValue="e11d48" className="w-full bg-[#161618] border border-white/10 rounded-lg py-2 pl-7 pr-3 text-sm font-mono text-white" />
                                              </div>
                                            </div>
                                          )}
                                          
                                          {advanceTab === 'gambar' && (
                                            <div className="mt-4 p-6 border-2 border-dashed border-white/20 rounded-xl flex flex-col items-center justify-center text-center cursor-pointer hover:border-amber-500/50 hover:bg-amber-500/5 transition-all animate-in fade-in">
                                              <ImageIcon size={24} className="text-amber-400 mb-3" />
                                              <h5 className="text-sm font-bold text-white mb-1">Upload Gambar</h5>
                                              <p className="text-xs text-slate-500">.jpg, .jpeg, .png, .webp</p>
                                            </div>
                                          )}
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                </>
                              ) : (
                                <div className="py-12 flex flex-col items-center justify-center text-center opacity-60">
                                  <Settings size={40} className="text-slate-500 mb-4" />
                                  <h4 className="text-sm font-bold text-white mb-1">Konfigurasi {activeComponent}</h4>
                                  <p className="text-xs text-slate-400">Pengaturan spesifik untuk komponen ini akan tersedia di pembaruan berikutnya.</p>
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                    
                    {/* Desain & Pengaturan Dummies */}
                    {builderTab !== 'konten' && (
                      <div className="p-8 text-center opacity-50 flex flex-col items-center justify-center h-64">
                        <Paintbrush size={40} className="mb-4 text-slate-400" />
                        <h3 className="text-base font-bold text-white mb-2">Tab {builderTab}</h3>
                        <p className="text-sm text-slate-400">Konfigurasi global untuk {builderTab} website.</p>
                      </div>
                    )}
                  </div>
                )}

                {/* MODE: TEMPLATES */}
                {activeMode === 'template' && (
                  <div className="p-5 animate-in fade-in duration-300 space-y-5">
                    <div className="relative">
                      <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                      <input 
                        type="text" 
                        placeholder="Cari template..." 
                        className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-amber-500/50"
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 gap-5">
                      {[
                        { title: 'Promo Launching (High CVR)', type: 'Lead Gen', img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' },
                        { title: 'Open House Registration', type: 'Event', img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' },
                        { title: 'Sales Personal Branding', type: 'Branding', img: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' },
                      ].map((tpl, i) => (
                        <div key={i} className="group cursor-pointer rounded-xl overflow-hidden border border-white/10 hover:border-amber-500/70 transition-all shadow-lg bg-[#1a1a1c]">
                          <div className="h-32 bg-slate-800 relative overflow-hidden">
                            <div className="absolute inset-0 bg-cover bg-center opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" style={{ backgroundImage: `url(${tpl.img})` }}></div>
                            <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
                              <span className="bg-amber-500 text-black text-xs font-bold px-4 py-2 rounded-lg shadow-xl">Gunakan Template</span>
                            </div>
                          </div>
                          <div className="p-4">
                            <p className="text-[11px] text-amber-400 font-bold mb-1.5 uppercase tracking-wider">{tpl.type}</p>
                            <h4 className="text-sm font-bold text-white leading-tight">{tpl.title}</h4>
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
            className="absolute -right-4 top-1/2 -translate-y-1/2 w-8 h-16 bg-[#161618] border border-white/10 border-l-0 rounded-r-xl flex items-center justify-center text-slate-400 hover:text-white hover:bg-[#1a1a1c] z-50 shadow-md"
          >
            {isSidebarOpen ? <PanelLeftClose size={16} /> : <PanelLeftOpen size={16} />}
          </button>
        </aside>

        {/* --- RIGHT CANVAS (LIVE PREVIEW) --- */}
        <div className="flex-1 bg-[#f1f5f9] flex flex-col relative overflow-hidden">
          
          {/* Canvas Toolbar */}
          <div className="h-14 border-b border-slate-200/50 flex items-center justify-between px-5 shrink-0 bg-white/80 backdrop-blur-md shadow-sm z-10">
            <div className="flex items-center gap-2">
              <div className="px-3 py-1.5 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-700 flex items-center gap-1.5 font-bold shadow-sm">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                Only you are editing this page
              </div>
            </div>

            {/* Device & Zoom Controls */}
            <div className="flex items-center gap-5 bg-slate-50 rounded-xl p-1.5 border border-slate-200 shadow-sm">
              <div className="flex items-center gap-1 border-r border-slate-200 pr-3">
                <button onClick={() => setDevice('desktop')} className={`p-2 rounded-lg transition-colors ${device === 'desktop' ? 'bg-white shadow text-slate-800' : 'text-slate-500 hover:text-slate-700'}`}><Monitor size={16} /></button>
                <button onClick={() => setDevice('tablet')} className={`p-2 rounded-lg transition-colors ${device === 'tablet' ? 'bg-white shadow text-slate-800' : 'text-slate-500 hover:text-slate-700'}`}><Tablet size={16} /></button>
                <button onClick={() => setDevice('mobile')} className={`p-2 rounded-lg transition-colors ${device === 'mobile' ? 'bg-white shadow text-slate-800' : 'text-slate-500 hover:text-slate-700'}`}><Smartphone size={16} /></button>
              </div>
              <div className="flex items-center gap-2 pl-1 pr-2">
                <button onClick={handleZoomOut} className="p-1.5 hover:bg-slate-200 rounded-lg text-slate-500 hover:text-slate-800 transition-colors"><ZoomOut size={16} /></button>
                <span className="text-xs font-mono font-bold text-slate-700 w-12 text-center">{zoom}%</span>
                <button onClick={handleZoomIn} className="p-1.5 hover:bg-slate-200 rounded-lg text-slate-500 hover:text-slate-800 transition-colors"><ZoomIn size={16} /></button>
              </div>
            </div>
          </div>

          {/* Canvas Area (Scrollable) */}
          <div className="flex-1 overflow-auto bg-slate-100 p-8 flex items-start justify-center relative bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]">
            
            {/* The "Paper" / Mockup Container */}
            <div 
              className={`bg-white shadow-2xl transition-all duration-300 relative origin-top overflow-hidden border border-slate-200 ${
                device === 'desktop' ? 'w-full max-w-[1200px] rounded-xl' : 
                device === 'tablet' ? 'w-[768px] rounded-[2rem]' : 'w-[375px] rounded-[3rem]'
              }`}
              style={{ transform: `scale(${zoom / 100})`, minHeight: '1000px' }}
            >
              {/* Mockup Landing Page Content */}
              <div className="font-sans text-slate-800 relative w-full h-full">
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
                    <span className="inline-block py-1.5 px-4 rounded-full bg-rose-100 text-rose-700 font-bold text-xs uppercase tracking-widest mb-6">Metland Cikarang</span>
                    <h1 className="text-4xl md:text-7xl font-black text-slate-900 leading-tight mb-8">
                      Rumah Elite Budget Ngirit<br />
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-amber-500">Myzora Metland Cikarang</span>
                    </h1>
                    <p className="text-base md:text-xl text-slate-500 mb-10 max-w-2xl mx-auto">
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
                        <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-6 group-hover:-translate-y-2 transition-transform shadow-sm border border-slate-100">
                          {feat.icon}
                        </div>
                        <h3 className="text-xl font-bold mb-3 text-slate-800">{feat.title}</h3>
                        <p className="text-slate-500 leading-relaxed text-sm md:text-base">{feat.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Editable Overlay Highlight Mockup */}
              {activeMode === 'builder' && activeComponent === 'Teks' && (
                <div className="absolute top-[180px] left-[5%] right-[5%] md:left-[15%] md:right-[15%] h-[200px] border-[3px] border-amber-500 pointer-events-none z-20 shadow-[0_0_0_9999px_rgba(241,245,249,0.7)] rounded-xl">
                  <div className="absolute -top-4 right-4 bg-amber-500 text-black text-[10px] font-bold px-3 py-1 shadow-lg flex items-center gap-1 rounded-full">
                    <Type size={10} /> Mengedit Teks Hero
                  </div>
                </div>
              )}
            </div>
            
            {/* Note: SMI Intelligence Panel has been removed to free up workspace as requested */}

          </div>
        </div>
      </div>

      {/* ========================================================
          3. PUBLISH MODAL
          ======================================================== */}
      {showPublishModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-[#0a0a0a]/90 backdrop-blur-sm" onClick={() => publishProgress >= 4 && setShowPublishModal(false)}></div>
          
          <div className="bg-[#161618] border border-amber-500/30 rounded-3xl w-full max-w-2xl relative z-10 overflow-hidden shadow-[0_0_50px_rgba(245,158,11,0.15)]">
            <div className="bg-gradient-to-r from-[#1a1a1c] to-[#111111] p-6 border-b border-white/5 flex items-center gap-4 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 blur-[100px] rounded-full"></div>
              <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-rose-600 rounded-2xl flex items-center justify-center shadow-lg relative z-10 p-[1px]">
                <div className="w-full h-full bg-[#161618] rounded-[15px] flex items-center justify-center">
                  <Send className="text-amber-400" size={24} />
                </div>
              </div>
              <div className="relative z-10">
                <h3 className="text-xl font-bold text-white mb-1">Menerbitkan Funnel...</h3>
                <p className="text-sm text-slate-400">SMI Core sedang memproses integrasi ke Lead Center</p>
              </div>
            </div>

            <div className="p-8">
              <div className="space-y-6">
                {[
                  { title: 'Optimasi Kecepatan & SEO', icon: Globe },
                  { title: 'Setup WhatsApp & Meta Pixel', icon: Target },
                  { title: 'Koneksi SMMC Lead Center', icon: BrainCircuit },
                  { title: 'Funnel Online & Siap Menghasilkan Prospek', icon: CheckCircle2 },
                ].map((step, idx) => {
                  const isActive = publishProgress > idx;
                  const isCurrent = publishProgress === idx;
                  return (
                    <div key={idx} className="flex items-center gap-5">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border-2 transition-all duration-500 ${isActive ? 'bg-amber-500 text-black border-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.4)]' : isCurrent ? 'bg-[#1a1a1c] text-amber-400 border-amber-500/50 animate-pulse' : 'bg-[#111111] text-slate-600 border-white/5'}`}>
                        {isActive ? <CheckCircle2 size={24} /> : <step.icon size={20} />}
                      </div>
                      <div className="flex-1">
                        <h4 className={`text-base font-bold transition-colors mb-1.5 ${isActive ? 'text-amber-400' : isCurrent ? 'text-white' : 'text-slate-500'}`}>{step.title}</h4>
                        <div className="h-1.5 w-full bg-[#111111] rounded-full overflow-hidden">
                          <div className={`h-full bg-gradient-to-r from-amber-500 to-rose-500 transition-all duration-1000 ${isActive ? 'w-full' : isCurrent ? 'w-1/2 animate-pulse' : 'w-0'}`}></div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {publishProgress >= 4 && (
              <div className="bg-[#111111] p-8 border-t border-white/5 animate-in slide-in-from-bottom-4 duration-500 text-center relative z-10">
                <div className="bg-[#1a1a1c] border border-white/10 rounded-xl p-4 flex items-center justify-between mb-6">
                  <span className="text-sm text-slate-300 font-mono">https://page.smmc.id/myzora-merdeka</span>
                  <button className="text-amber-400 hover:text-amber-300 font-bold text-sm flex items-center gap-1 bg-amber-500/10 hover:bg-amber-500/20 px-4 py-2 rounded-lg transition-colors">
                    Salin Link <ArrowRight size={16} />
                  </button>
                </div>
                <button 
                  onClick={() => setShowPublishModal(false)}
                  className="w-full py-3.5 bg-white/5 hover:bg-white/10 text-white rounded-xl text-sm font-bold transition-all border border-white/10"
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
