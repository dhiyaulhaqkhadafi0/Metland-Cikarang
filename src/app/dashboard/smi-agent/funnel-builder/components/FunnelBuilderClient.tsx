"use client";

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, Monitor, Tablet, Smartphone, ZoomIn, ZoomOut, 
  PanelLeftClose, PanelLeftOpen, Save, Send, Layout, LayoutTemplate, 
  Settings, Type, Image as ImageIcon, LayoutGrid, Layers, BarChart3, 
  ChevronDown, CheckCircle2, Play, Wand2, Paintbrush, FileText, ChevronLeft,
  Search, Eye, Box, AlertTriangle, ArrowRight, MousePointer2, Plus, Trash2, RefreshCw, Upload,
  Globe, Target, BrainCircuit, Undo, RotateCcw,
  Video, List, MessageSquare, HelpCircle, GalleryHorizontal, 
  MousePointerClick, Code, PlaySquare, Navigation, Minus, FileCode2,
  Bold, Italic, Underline, Strikethrough, Link as LinkIcon, ListOrdered, 
  AlignLeft, AlignCenter, AlignRight, AlignJustify, Smile, Heading, Palette, Type as FontIcon, Baseline, RemoveFormatting, X, Sparkles
} from 'lucide-react';

type Mode = 'aigen' | 'builder' | 'template';
type BuilderTab = 'konten' | 'desain' | 'pengaturan';
type Device = 'desktop' | 'tablet' | 'mobile';

interface FAQItem {
  id: number;
  q: string;
  a: string;
}

interface TestimonialItem {
  id: number;
  name: string;
  role: string;
  text: string;
  avatar: string;
}

interface DevicePadding {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export default function FunnelBuilderClient() {
  const [activeMode, setActiveMode] = useState<Mode>('builder');
  const [builderTab, setBuilderTab] = useState<BuilderTab>('konten');
  const [device, setDevice] = useState<Device>('desktop');
  const [zoom, setZoom] = useState(100);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Sync & Selection States
  const [activeComponent, setActiveComponent] = useState<string | null>('Teks');
  const [activeElementId, setActiveElementId] = useState<string>('hero-headline');
  const [hoveredElementId, setHoveredElementId] = useState<string | null>(null);

  // Component Data States (Real-time Live Preview Data)
  const [brandName, setBrandName] = useState("MYZORA");
  const [heroBadge, setHeroBadge] = useState("METLAND CIKARANG");
  const [heroTitle, setHeroTitle] = useState("Rumah Elite Budget Ngirit");
  const [heroTitleGradient, setHeroTitleGradient] = useState("Myzora Metland Cikarang");
  const [heroSubtitle, setHeroSubtitle] = useState("Uang habis buat bayar kontrakan tapi ga ada bekasnya? RUGI DONG 😆. Nih mending cobain Myzora, Rumah bagus, cicilan 3 jutaan doank masa?");
  
  // Target Text Selection ('headline' | 'gradient' | 'subtitle' | 'badge')
  const [textTarget, setTextTarget] = useState<'headline' | 'gradient' | 'subtitle' | 'badge'>('headline');

  // Rich Text Formatting & Typography States
  const [isDarkEditorBg, setIsDarkEditorBg] = useState(true);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isStrikethrough, setIsStrikethrough] = useState(false);
  const [textAlign, setTextAlign] = useState<'left' | 'center' | 'right' | 'justify'>('center');
  const [headingType, setHeadingType] = useState<string>('Heading 1');
  const [fontSizePx, setFontSizePx] = useState<string>('56px');
  const [fontFamily, setFontFamily] = useState<string>('Inter');
  const [lineHeight, setLineHeight] = useState<string>('1.2');
  const [textColor, setTextColor] = useState<string>('#0f172a');
  const [textBgHighlight, setTextBgHighlight] = useState<string>('transparent');

  // Interactive Modals/Popovers inside Rich Text Editor
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
  const [textLinkUrl, setTextLinkUrl] = useState('');
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
  const [isNumberedList, setIsNumberedList] = useState(false);
  const [isBulletList, setIsBulletList] = useState(false);

  // Advance Desain Background (Solid Color / Background Image Upload) & Responsive Padding States
  const [bgColor, setBgColor] = useState('#ffffff');
  const [bgMode, setBgMode] = useState<'warna' | 'gambar'>('warna');
  const [sectionBgImage, setSectionBgImage] = useState<string>('');
  const [bgImageOverlay, setBgImageOverlay] = useState<number>(30); // 0% to 90% opacity
  const [paddingDevice, setPaddingDevice] = useState<Device>('desktop');
  const [paddingConfig, setPaddingConfig] = useState<Record<Device, DevicePadding>>({
    desktop: { top: 0, right: 0, bottom: 0, left: 0 },
    tablet: { top: 0, right: 0, bottom: 0, left: 0 },
    mobile: { top: 0, right: 0, bottom: 0, left: 0 },
  });

  // Image Component States (Advance Feature support: zoom, replace, delete, fit)
  const [heroImage, setHeroImage] = useState("https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80");
  const [heroImageZoom, setHeroImageZoom] = useState(100);
  const [heroImageFit, setHeroImageFit] = useState<'cover' | 'contain' | 'fill'>('cover');

  // Button Component States
  const [ctaText, setCtaText] = useState("Get Pricelist");
  const [ctaUrl, setCtaUrl] = useState("#form-section");
  const [ctaBg, setCtaBg] = useState("from-rose-600 to-amber-500");

  // Video Component States
  const [videoUrl, setVideoUrl] = useState("https://www.youtube.com/embed/dQw4w9WgXcQ");
  const [showVideo, setShowVideo] = useState(true);

  // Form Component States
  const [formTitle, setFormTitle] = useState("Daftar Visit & Dapatkan Promo Spesial");
  const [formBtnText, setFormBtnText] = useState("Kirim Jadwal Visit");

  // FAQ Component States
  const [faqs, setFaqs] = useState<FAQItem[]>([
    { id: 1, q: "Berapa cicilan per bulan di Myzora?", a: "Cicilan mulai dari 3 jutaan per bulan dengan promo bunga DP 0%." },
    { id: 2, q: "Berapa jarak ke stasiun KRL terdekat?", a: "Hanya 5 menit ke Stasiun KRL Cikarang dengan akses shuttle bus gratis." }
  ]);

  // Testimonial Component States
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>([
    { id: 1, name: "Budi & Sarah", role: "Pembeli Cluster Myzora", text: "Proses cepat, lokasi sangat strategis dan tim sales SMMC sangat membantu!", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" },
    { id: 2, name: "Reza Rahardian", role: "Investor Properti", text: "Capital gain sangat menjanjikan untuk investasi jangka panjang di Metland Cikarang.", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80" }
  ]);

  // Advance Panel Tab State
  const [isAdvanceOpen, setIsAdvanceOpen] = useState(true);

  // Publish Modal State
  const [showPublishModal, setShowPublishModal] = useState(false);
  const [publishProgress, setPublishProgress] = useState(0);

  const fileInputRef = useRef<HTMLInputElement>(null);

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

  // Execute native rich inline formatting on active selection (Word blocking format)
  const applyInlineFormat = (command: string, value: string | undefined = undefined) => {
    if (typeof window !== 'undefined') {
      document.execCommand(command, false, value);
    }
  };

  // Handle local image file upload for Latar Background
  const handleBgImageFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setSectionBgImage(event.target.result as string);
          setBgMode('gambar');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Helper to append emoji into target text
  const addEmoji = (emoji: string) => {
    if (textTarget === 'headline') setHeroTitle(prev => prev + ' ' + emoji);
    else if (textTarget === 'gradient') setHeroTitleGradient(prev => prev + ' ' + emoji);
    else if (textTarget === 'subtitle') setHeroSubtitle(prev => prev + ' ' + emoji);
    else setHeroBadge(prev => prev + ' ' + emoji);
    setIsEmojiPickerOpen(false);
  };

  const componentsList = [
    { id: 'Teks', icon: Type, elementId: 'hero-headline' },
    { id: 'Gambar', icon: ImageIcon, elementId: 'hero-image' },
    { id: 'Video', icon: Video, elementId: 'video-section' },
    { id: 'Form Pemesanan', icon: FileText, elementId: 'form-section' },
    { id: 'Daftar/List', icon: List, elementId: 'features-section' },
    { id: 'Testimoni', icon: MessageSquare, elementId: 'testimonial-section' },
    { id: 'FAQ', icon: HelpCircle, elementId: 'faq-section' },
    { id: 'Tombol', icon: MousePointerClick, elementId: 'cta-button' },
  ];

  // Helper to trigger select component & element sync
  const selectSection = (compId: string, elemId: string) => {
    setActiveComponent(compId);
    setActiveElementId(elemId);
    if (activeMode !== 'builder') setActiveMode('builder');
    if (builderTab !== 'konten') setBuilderTab('konten');
  };

  // Font list choices
  const fontFamilies = [
    { label: 'Page Font (Default)', value: 'Inter' },
    { label: 'Inter (Sans)', value: 'Inter' },
    { label: 'Plus Jakarta Sans', value: 'Plus Jakarta Sans' },
    { label: 'Poppins', value: 'Poppins' },
    { label: 'Montserrat', value: 'Montserrat' },
    { label: 'Outfit', value: 'Outfit' },
    { label: 'Roboto', value: 'Roboto' },
    { label: 'Playfair Display (Serif)', value: 'Playfair Display' },
    { label: 'Oswald (Display)', value: 'Oswald' },
    { label: 'Merriweather (Serif)', value: 'Merriweather' },
    { label: 'Courier Prime (Mono)', value: 'Courier New' },
  ];

  const popularEmojis = ['🔥', '🚀', '😆', '🏠', '💰', '✨', '⚡', '📌', '🔑', '💯', '🎁', '💎', '👍', '🌟', '📍', '📞', '⏳', '✅', '🏆', '🏷️'];

  // Current active text target value
  const getActiveTextValue = () => {
    if (textTarget === 'headline') return heroTitle;
    if (textTarget === 'gradient') return heroTitleGradient;
    if (textTarget === 'subtitle') return heroSubtitle;
    return heroBadge;
  };

  const updateActiveTextValue = (val: string) => {
    if (textTarget === 'headline') setHeroTitle(val);
    else if (textTarget === 'gradient') setHeroTitleGradient(val);
    else if (textTarget === 'subtitle') setHeroSubtitle(val);
    else setHeroBadge(val);
  };

  // Current active padding values
  const currentPadding = paddingConfig[device];

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
          <button 
            onClick={() => {
              setHeroTitle("Rumah Elite Budget Ngirit");
              setHeroTitleGradient("Myzora Metland Cikarang");
              setHeroSubtitle("Uang habis buat bayar kontrakan tapi ga ada bekasnya? RUGI DONG 😆. Nih mending cobain Myzora, Rumah bagus, cicilan 3 jutaan doank masa?");
              setHeroImage("https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80");
              setHeroImageZoom(100);
              setSectionBgImage('');
              setBgColor('#ffffff');
            }}
            className="p-2 hover:bg-white/5 text-slate-400 rounded-lg transition-colors tooltip mr-2" 
            title="Reset Default"
          >
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
          className={`${isSidebarOpen ? 'w-[420px]' : 'w-0'} bg-[#161618] border-r border-white/5 flex flex-col transition-all duration-300 shrink-0 z-40 relative`}
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
                          className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl p-4 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-amber-500/50 resize-none h-40 custom-scrollbar"
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
                        onClick={() => { setBuilderTab('konten'); }}
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
                                  onClick={() => selectSection(comp.id, comp.elementId)}
                                  onMouseEnter={() => setHoveredElementId(comp.elementId)}
                                  onMouseLeave={() => setHoveredElementId(null)}
                                  className={`bg-[#1a1a1c] border rounded-xl p-4 flex flex-col items-center justify-center gap-3 cursor-pointer transition-all group ${
                                    activeElementId === comp.elementId ? 'border-amber-500 bg-amber-500/10' : 'border-white/5 hover:border-amber-500/50 hover:bg-amber-500/5'
                                  }`}
                                >
                                  <comp.icon size={24} className={`${activeElementId === comp.elementId ? 'text-amber-400' : 'text-slate-400 group-hover:text-amber-400'} transition-colors`} />
                                  <span className={`text-xs font-semibold text-center ${activeElementId === comp.elementId ? 'text-amber-400' : 'text-slate-300 group-hover:text-white'}`}>{comp.id}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* ACTIVE COMPONENT EDITOR */}
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
                            
                            <div className="p-5 space-y-6 overflow-y-auto custom-scrollbar">
                              
                              {/* ---------------------------------------------------- */}
                              {/* 1. TEKS COMPONENT EDITOR (INLINE WORD SELECTION & FORMATTING) */}
                              {/* ---------------------------------------------------- */}
                              {activeComponent === 'Teks' && (
                                <>
                                  <div className="space-y-3">
                                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Target Teks yang Di-edit</label>
                                    <div className="grid grid-cols-2 gap-2">
                                      <button 
                                        onClick={() => { setTextTarget('headline'); setActiveElementId('hero-headline'); }}
                                        className={`py-2 px-3 rounded-lg text-xs font-bold border transition-colors ${textTarget === 'headline' ? 'bg-amber-500/20 text-amber-400 border-amber-500' : 'bg-[#0a0a0a] text-slate-400 border-white/10 hover:text-white'}`}
                                      >
                                        Headline Utama
                                      </button>
                                      <button 
                                        onClick={() => { setTextTarget('gradient'); setActiveElementId('hero-headline'); }}
                                        className={`py-2 px-3 rounded-lg text-xs font-bold border transition-colors ${textTarget === 'gradient' ? 'bg-amber-500/20 text-amber-400 border-amber-500' : 'bg-[#0a0a0a] text-slate-400 border-white/10 hover:text-white'}`}
                                      >
                                        Headline Gradient
                                      </button>
                                      <button 
                                        onClick={() => { setTextTarget('subtitle'); setActiveElementId('hero-headline'); }}
                                        className={`py-2 px-3 rounded-lg text-xs font-bold border transition-colors ${textTarget === 'subtitle' ? 'bg-amber-500/20 text-amber-400 border-amber-500' : 'bg-[#0a0a0a] text-slate-400 border-white/10 hover:text-white'}`}
                                      >
                                        Sub-Headline
                                      </button>
                                      <button 
                                        onClick={() => { setTextTarget('badge'); setActiveElementId('hero-badge'); }}
                                        className={`py-2 px-3 rounded-lg text-xs font-bold border transition-colors ${textTarget === 'badge' ? 'bg-amber-500/20 text-amber-400 border-amber-500' : 'bg-[#0a0a0a] text-slate-400 border-white/10 hover:text-white'}`}
                                      >
                                        Badge Top
                                      </button>
                                    </div>
                                  </div>

                                  <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                      <label className="text-xs font-bold text-slate-400">Isi Konten Teks Live</label>
                                      
                                      {/* Background Editor Gelap Toggle */}
                                      <div className="flex items-center gap-2 cursor-pointer" onClick={() => setIsDarkEditorBg(!isDarkEditorBg)}>
                                        <div className={`w-8 h-4 rounded-full transition-colors relative p-0.5 ${isDarkEditorBg ? 'bg-amber-500' : 'bg-slate-600'}`}>
                                          <div className={`w-3 h-3 bg-white rounded-full transition-transform ${isDarkEditorBg ? 'translate-x-4' : 'translate-x-0'}`}></div>
                                        </div>
                                        <span className="text-[11px] font-medium text-slate-300">Background Editor Gelap</span>
                                      </div>
                                    </div>
                                    
                                    {/* Scalev-like 3-Row Comprehensive Toolbar */}
                                    <div className="border border-white/15 rounded-xl overflow-hidden bg-[#161618] shadow-lg">
                                      
                                      {/* ROW 1: Basic Inline Formatting Controls (Supports selection-level formatting) */}
                                      <div className="bg-[#1a1a1c] border-b border-white/10 p-2 flex flex-wrap items-center gap-1.5 relative">
                                        <button onClick={() => { setIsBold(!isBold); applyInlineFormat('bold'); }} className={`w-8 h-8 flex items-center justify-center rounded font-bold transition-colors ${isBold ? 'bg-amber-500/30 text-amber-400 border border-amber-500/50' : 'hover:bg-white/10 text-slate-300'}`} title="Bold Kata Terblok (B)"><Bold size={16} /></button>
                                        <button onClick={() => { setIsItalic(!isItalic); applyInlineFormat('italic'); }} className={`w-8 h-8 flex items-center justify-center rounded transition-colors ${isItalic ? 'bg-amber-500/30 text-amber-400 border border-amber-500/50' : 'hover:bg-white/10 text-slate-300'}`} title="Italic Kata Terblok (I)"><Italic size={16} /></button>
                                        
                                        {/* Text Color Picker Swatch */}
                                        <div className="relative group flex items-center">
                                          <label className="w-8 h-8 flex flex-col items-center justify-center rounded hover:bg-white/10 cursor-pointer text-slate-300" title="Warna Teks Kata Terblok">
                                            <Baseline size={16} />
                                            <span className="w-4 h-1 rounded-full mt-0.5" style={{ backgroundColor: textColor }}></span>
                                            <input type="color" value={textColor} onChange={(e) => { setTextColor(e.target.value); applyInlineFormat('foreColor', e.target.value); }} className="opacity-0 w-0 h-0 absolute" />
                                          </label>
                                        </div>

                                        {/* Highlight Background Color Swatch */}
                                        <div className="relative group flex items-center">
                                          <label className="w-8 h-8 flex items-center justify-center rounded hover:bg-white/10 cursor-pointer text-slate-300" title="Warna Sorotan Kata Terblok">
                                            <Palette size={16} />
                                            <input type="color" value={textBgHighlight === 'transparent' ? '#ffffff' : textBgHighlight} onChange={(e) => { setTextBgHighlight(e.target.value); applyInlineFormat('hiliteColor', e.target.value); }} className="opacity-0 w-0 h-0 absolute" />
                                          </label>
                                        </div>

                                        <button onClick={() => { setIsUnderline(!isUnderline); applyInlineFormat('underline'); }} className={`w-8 h-8 flex items-center justify-center rounded transition-colors ${isUnderline ? 'bg-amber-500/30 text-amber-400 border border-amber-500/50' : 'hover:bg-white/10 text-slate-300'}`} title="Underline Kata Terblok (U)"><Underline size={16} /></button>
                                        
                                        {/* Huruf Dicoret / Strikethrough */}
                                        <button onClick={() => { setIsStrikethrough(!isStrikethrough); applyInlineFormat('strikeThrough'); }} className={`w-8 h-8 flex items-center justify-center rounded transition-colors ${isStrikethrough ? 'bg-amber-500/30 text-amber-400 border border-amber-500/50' : 'hover:bg-white/10 text-slate-300'}`} title="Huruf Dicoret (Strikethrough)"><Strikethrough size={16} /></button>

                                        <div className="w-px h-6 bg-white/10 mx-0.5"></div>

                                        {/* Link Tautan Modal Toggle */}
                                        <button onClick={() => setIsLinkModalOpen(!isLinkModalOpen)} className={`w-8 h-8 flex items-center justify-center rounded transition-colors ${isLinkModalOpen || textLinkUrl ? 'bg-amber-500/30 text-amber-400' : 'hover:bg-white/10 text-slate-300'}`} title="Tautan Link"><LinkIcon size={16} /></button>

                                        {/* Ordered List (123) */}
                                        <button onClick={() => { setIsNumberedList(!isNumberedList); setIsBulletList(false); }} className={`w-8 h-8 flex items-center justify-center rounded transition-colors ${isNumberedList ? 'bg-amber-500/30 text-amber-400' : 'hover:bg-white/10 text-slate-300'}`} title="List Nomor (123)"><ListOrdered size={16} /></button>

                                        {/* Unordered Bullet List */}
                                        <button onClick={() => { setIsBulletList(!isBulletList); setIsNumberedList(false); }} className={`w-8 h-8 flex items-center justify-center rounded transition-colors ${isBulletList ? 'bg-amber-500/30 text-amber-400' : 'hover:bg-white/10 text-slate-300'}`} title="List Peluru / Bullet"><List size={16} /></button>

                                        {/* Alignment Options */}
                                        <button onClick={() => setTextAlign('left')} className={`w-8 h-8 flex items-center justify-center rounded transition-colors ${textAlign === 'left' ? 'bg-amber-500/30 text-amber-400' : 'hover:bg-white/10 text-slate-300'}`}><AlignLeft size={16} /></button>
                                        <button onClick={() => setTextAlign('center')} className={`w-8 h-8 flex items-center justify-center rounded transition-colors ${textAlign === 'center' ? 'bg-amber-500/30 text-amber-400' : 'hover:bg-white/10 text-slate-300'}`}><AlignCenter size={16} /></button>
                                        <button onClick={() => setTextAlign('right')} className={`w-8 h-8 flex items-center justify-center rounded transition-colors ${textAlign === 'right' ? 'bg-amber-500/30 text-amber-400' : 'hover:bg-white/10 text-slate-300'}`}><AlignRight size={16} /></button>
                                      </div>

                                      {/* ROW 2: Headings & Font Sizes */}
                                      <div className="bg-[#1a1a1c] border-b border-white/10 p-2 flex items-center gap-2">
                                        <select 
                                          value={headingType} 
                                          onChange={(e) => {
                                            setHeadingType(e.target.value);
                                            if (e.target.value === 'Heading 1') setFontSizePx('56px');
                                            else if (e.target.value === 'Heading 2') setFontSizePx('40px');
                                            else if (e.target.value === 'Heading 3') setFontSizePx('32px');
                                            else setFontSizePx('18px');
                                          }}
                                          className="bg-[#0a0a0a] text-xs text-white border border-white/15 rounded-lg px-2.5 h-8 focus:outline-none focus:border-amber-500 flex-1 font-semibold"
                                        >
                                          <option value="Heading 1">Heading 1 (H1)</option>
                                          <option value="Heading 2">Heading 2 (H2)</option>
                                          <option value="Heading 3">Heading 3 (H3)</option>
                                          <option value="Sub Heading">Sub Heading</option>
                                          <option value="Paragraph">Paragraph</option>
                                        </select>

                                        <select 
                                          value={fontSizePx} 
                                          onChange={(e) => setFontSizePx(e.target.value)}
                                          className="bg-[#0a0a0a] text-xs text-amber-400 border border-white/15 rounded-lg px-2.5 h-8 focus:outline-none focus:border-amber-500 font-mono font-bold"
                                        >
                                          <option value="12px">12px</option>
                                          <option value="14px">14px</option>
                                          <option value="16px">16px</option>
                                          <option value="18px">18px</option>
                                          <option value="20px">20px</option>
                                          <option value="24px">24px</option>
                                          <option value="32px">32px</option>
                                          <option value="40px">40px</option>
                                          <option value="48px">48px</option>
                                          <option value="56px">56px</option>
                                          <option value="64px">64px</option>
                                        </select>
                                      </div>

                                      {/* ROW 3: Page Font, Line Height, Emoji, Clear Formatting */}
                                      <div className="bg-[#1a1a1c] border-b border-white/10 p-2 flex items-center gap-2 relative">
                                        <select 
                                          value={fontFamily} 
                                          onChange={(e) => setFontFamily(e.target.value)}
                                          className="bg-[#0a0a0a] text-xs text-slate-200 border border-white/15 rounded-lg px-2.5 h-8 focus:outline-none focus:border-amber-500 flex-1 font-medium"
                                        >
                                          {fontFamilies.map(f => (
                                            <option key={f.label} value={f.value}>{f.label}</option>
                                          ))}
                                        </select>

                                        <select 
                                          value={lineHeight} 
                                          onChange={(e) => setLineHeight(e.target.value)}
                                          className="bg-[#0a0a0a] text-xs text-slate-300 border border-white/15 rounded-lg px-2 h-8 focus:outline-none font-mono"
                                          title="Line Height (Jarak Baris)"
                                        >
                                          <option value="1.0">1.0</option>
                                          <option value="1.2">1.2</option>
                                          <option value="1.5">1.5</option>
                                          <option value="1.8">1.8</option>
                                          <option value="2.0">2.0</option>
                                        </select>

                                        <button 
                                          onClick={() => setIsEmojiPickerOpen(!isEmojiPickerOpen)}
                                          className={`w-8 h-8 flex items-center justify-center rounded transition-colors ${isEmojiPickerOpen ? 'bg-amber-500/30 text-amber-400' : 'hover:bg-white/10 text-slate-300'}`}
                                          title="Pilih Emoji"
                                        >
                                          <Smile size={16} />
                                        </button>

                                        <button 
                                          onClick={() => {
                                            setIsBold(false);
                                            setIsItalic(false);
                                            setIsUnderline(false);
                                            setIsStrikethrough(false);
                                            setTextBgHighlight('transparent');
                                            setTextColor('#0f172a');
                                            setTextLinkUrl('');
                                            applyInlineFormat('removeFormat');
                                          }}
                                          className="w-8 h-8 flex items-center justify-center hover:bg-white/10 rounded text-slate-400 hover:text-rose-400" 
                                          title="Hapus Formatting"
                                        >
                                          <RemoveFormatting size={16} />
                                        </button>

                                        {/* Interactive Emoji Picker Popover */}
                                        {isEmojiPickerOpen && (
                                          <div className="absolute top-12 right-2 bg-[#161618] border border-amber-500/40 rounded-xl p-3 shadow-2xl z-50 w-64 animate-in fade-in">
                                            <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-2">
                                              <span className="text-xs font-bold text-amber-400 flex items-center gap-1">
                                                <Smile size={14} /> Sisipkan Emoji
                                              </span>
                                              <button onClick={() => setIsEmojiPickerOpen(false)} className="text-slate-400 hover:text-white">
                                                <X size={14} />
                                              </button>
                                            </div>
                                            <div className="grid grid-cols-5 gap-1.5 max-h-36 overflow-y-auto custom-scrollbar">
                                              {popularEmojis.map((emoji, idx) => (
                                                <button 
                                                  key={idx}
                                                  onClick={() => addEmoji(emoji)}
                                                  className="h-8 flex items-center justify-center text-lg hover:bg-white/10 rounded transition-transform hover:scale-125"
                                                >
                                                  {emoji}
                                                </button>
                                              ))}
                                            </div>
                                          </div>
                                        )}
                                      </div>

                                      {/* Link URL Modal inside Editor */}
                                      {isLinkModalOpen && (
                                        <div className="p-3 bg-[#0a0a0a] border-b border-white/10 flex items-center gap-2 animate-in fade-in">
                                          <LinkIcon size={14} className="text-amber-400 shrink-0" />
                                          <input 
                                            type="text" 
                                            value={textLinkUrl} 
                                            onChange={(e) => setTextLinkUrl(e.target.value)}
                                            placeholder="Masukkan URL tautan (https://...)" 
                                            className="flex-1 bg-[#161618] border border-white/10 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-amber-500 font-mono"
                                          />
                                          <button 
                                            onClick={() => {
                                              setIsLinkModalOpen(false);
                                              if (textLinkUrl) applyInlineFormat('createLink', textLinkUrl);
                                            }} 
                                            className="px-3 py-1.5 bg-amber-500 text-black text-xs font-bold rounded-lg hover:bg-amber-400"
                                          >
                                            Simpan Tautan
                                          </button>
                                        </div>
                                      )}

                                      {/* Dynamic Textarea Editor */}
                                      <textarea 
                                        className={`w-full p-4 text-sm focus:outline-none resize-y min-h-[150px] transition-colors custom-scrollbar ${
                                          isDarkEditorBg ? 'bg-[#0a0a0a] text-white' : 'bg-white text-slate-900 font-semibold'
                                        }`}
                                        style={{ fontFamily: fontFamily }}
                                        value={getActiveTextValue()}
                                        onChange={(e) => updateActiveTextValue(e.target.value)}
                                      ></textarea>
                                    </div>
                                  </div>

                                  {/* Advance Dropdown (Background Swatches + Image Upload Feature) */}
                                  <div className="border border-white/10 rounded-xl overflow-hidden">
                                    <button 
                                      onClick={() => setIsAdvanceOpen(!isAdvanceOpen)}
                                      className="w-full bg-[#1a1a1c] p-4 flex items-center justify-between hover:bg-white/5 transition-colors"
                                    >
                                      <span className="text-sm font-bold text-white flex items-center gap-2">
                                        <Sparkles size={16} className="text-amber-400" /> Advance
                                      </span>
                                      <ChevronDown size={18} className={`text-slate-400 transition-transform ${isAdvanceOpen ? 'rotate-180' : ''}`} />
                                    </button>
                                    
                                    {isAdvanceOpen && (
                                      <div className="p-5 bg-[#0a0a0a] border-t border-white/10 space-y-6">
                                        
                                        {/* Desain: Latar (Background) */}
                                        <div className="space-y-3">
                                          <h4 className="text-xs font-bold text-slate-300">Desain</h4>
                                          <p className="text-[11px] text-slate-500">Latar (Background)</p>
                                          
                                          <div className="flex gap-2">
                                            <button 
                                              onClick={() => { setBgColor('#ffffff'); setSectionBgImage(''); }}
                                              className="w-10 h-10 border border-white/20 rounded-xl flex items-center justify-center hover:bg-white/5 text-slate-400 hover:text-white"
                                              title="Hapus Latar Gambar & Warna"
                                            >
                                              <X size={18} />
                                            </button>
                                            <button 
                                              onClick={() => setBgMode('warna')}
                                              className={`flex-1 h-10 rounded-xl border font-bold text-xs transition-colors ${bgMode === 'warna' ? 'bg-amber-500/20 text-amber-400 border-amber-500' : 'border-white/10 text-slate-300 hover:bg-white/5'}`}
                                            >
                                              Warna
                                            </button>
                                            <button 
                                              onClick={() => setBgMode('gambar')}
                                              className={`flex-1 h-10 rounded-xl border font-bold text-xs transition-colors ${bgMode === 'gambar' ? 'bg-amber-500/20 text-amber-400 border-amber-500' : 'border-white/10 text-slate-300 hover:bg-white/5'}`}
                                            >
                                              Gambar
                                            </button>
                                          </div>
                                          
                                          {/* Swatches (Color Mode) */}
                                          {bgMode === 'warna' && (
                                            <div className="flex items-center gap-2.5 pt-2">
                                              {[
                                                { label: 'White', color: '#ffffff' },
                                                { label: 'Dark', color: '#1c1c1e' },
                                                { label: 'Ice Blue', color: '#f0f9ff' },
                                                { label: 'Mint', color: '#ecfdf5' },
                                                { label: 'Cream', color: '#fffbeb' },
                                                { label: 'Pink', color: '#fff1f2' },
                                              ].map((swatch, idx) => (
                                                <div 
                                                  key={idx}
                                                  onClick={() => setBgColor(swatch.color)}
                                                  className={`w-8 h-8 rounded-full border-2 cursor-pointer transition-transform hover:scale-110 ${bgColor === swatch.color ? 'border-amber-400 scale-110 shadow-lg' : 'border-white/20'}`}
                                                  style={{ backgroundColor: swatch.color }}
                                                  title={swatch.label}
                                                ></div>
                                              ))}

                                              <label className="w-8 h-8 rounded-full bg-gradient-to-tr from-rose-500 via-amber-400 to-indigo-500 border-2 border-white/40 cursor-pointer flex items-center justify-center shadow-md hover:scale-110 transition-transform">
                                                <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="opacity-0 w-0 h-0" />
                                              </label>
                                            </div>
                                          )}

                                          {/* Interactive Upload Gambar Latar Feature */}
                                          {bgMode === 'gambar' && (
                                            <div className="space-y-4 pt-2 animate-in fade-in">
                                              <input 
                                                type="file" 
                                                ref={fileInputRef} 
                                                onChange={handleBgImageFileUpload} 
                                                accept="image/*" 
                                                className="hidden" 
                                              />
                                              
                                              <div 
                                                onClick={() => fileInputRef.current?.click()}
                                                className="p-6 border-2 border-dashed border-white/20 hover:border-amber-500/60 rounded-xl flex flex-col items-center justify-center text-center cursor-pointer hover:bg-amber-500/5 transition-all group"
                                              >
                                                <Upload size={24} className="text-amber-400 mb-2 group-hover:scale-110 transition-transform" />
                                                <h5 className="text-xs font-bold text-white">Klik untuk Upload Gambar Latar</h5>
                                                <p className="text-[10px] text-slate-500 mt-1">File .jpg, .png, .webp (Maks 5MB)</p>
                                              </div>

                                              {/* Background URL input fallback */}
                                              <div className="space-y-1.5">
                                                <label className="text-[11px] text-slate-400 block">Atau Tempel URL Gambar Latar</label>
                                                <input 
                                                  type="text" 
                                                  value={sectionBgImage} 
                                                  onChange={(e) => setSectionBgImage(e.target.value)}
                                                  placeholder="https://images.unsplash.com/..."
                                                  className="w-full bg-[#161618] border border-white/10 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-amber-500 font-mono"
                                                />
                                              </div>

                                              {/* Background Image Preview & Overlay Opacity slider */}
                                              {sectionBgImage && (
                                                <div className="space-y-3 p-3 bg-[#161618] rounded-xl border border-white/10">
                                                  <div className="flex items-center justify-between">
                                                    <span className="text-[11px] font-bold text-amber-400">Dark Tint Overlay: {bgImageOverlay}%</span>
                                                    <button onClick={() => setSectionBgImage('')} className="text-[11px] text-rose-400 hover:underline">Hapus Latar</button>
                                                  </div>
                                                  <input 
                                                    type="range" 
                                                    min="0" 
                                                    max="90" 
                                                    value={bgImageOverlay} 
                                                    onChange={(e) => setBgImageOverlay(Number(e.target.value))}
                                                    className="w-full accent-amber-500 cursor-pointer"
                                                  />
                                                </div>
                                              )}
                                            </div>
                                          )}
                                        </div>

                                        <div className="w-full h-px bg-white/10"></div>

                                        {/* Padding Responsive Controls */}
                                        <div className="space-y-4">
                                          <label className="text-xs font-bold text-slate-300 block">Padding</label>
                                          
                                          <div className="grid grid-cols-3 gap-2">
                                            {(['desktop', 'tablet', 'mobile'] as const).map(d => (
                                              <button 
                                                key={d}
                                                onClick={() => setPaddingDevice(d)}
                                                className={`py-2.5 rounded-xl text-xs font-bold capitalize border transition-all ${paddingDevice === d ? 'bg-amber-500/20 text-amber-400 border-amber-500 shadow-sm' : 'border-white/10 text-slate-400 hover:text-white bg-[#161618]'}`}
                                              >
                                                {d}
                                              </button>
                                            ))}
                                          </div>

                                          <div className="grid grid-cols-2 gap-3">
                                            <div>
                                              <label className="text-[11px] text-slate-400 block mb-1">Padding Atas</label>
                                              <div className="flex bg-[#161618] border border-white/10 rounded-xl overflow-hidden focus-within:border-amber-500">
                                                <input 
                                                  type="number" 
                                                  value={paddingConfig[paddingDevice].top}
                                                  onChange={(e) => setPaddingConfig({
                                                    ...paddingConfig,
                                                    [paddingDevice]: { ...paddingConfig[paddingDevice], top: Number(e.target.value) }
                                                  })}
                                                  className="w-full bg-transparent p-2.5 text-xs text-white focus:outline-none font-mono"
                                                />
                                                <span className="bg-white/5 text-slate-400 text-xs px-3 flex items-center font-mono">px</span>
                                              </div>
                                            </div>

                                            <div>
                                              <label className="text-[11px] text-slate-400 block mb-1">Padding Kanan</label>
                                              <div className="flex bg-[#161618] border border-white/10 rounded-xl overflow-hidden focus-within:border-amber-500">
                                                <input 
                                                  type="number" 
                                                  value={paddingConfig[paddingDevice].right}
                                                  onChange={(e) => setPaddingConfig({
                                                    ...paddingConfig,
                                                    [paddingDevice]: { ...paddingConfig[paddingDevice], right: Number(e.target.value) }
                                                  })}
                                                  className="w-full bg-transparent p-2.5 text-xs text-white focus:outline-none font-mono"
                                                />
                                                <span className="bg-white/5 text-slate-400 text-xs px-3 flex items-center font-mono">px</span>
                                              </div>
                                            </div>

                                            <div>
                                              <label className="text-[11px] text-slate-400 block mb-1">Padding Bawah</label>
                                              <div className="flex bg-[#161618] border border-white/10 rounded-xl overflow-hidden focus-within:border-amber-500">
                                                <input 
                                                  type="number" 
                                                  value={paddingConfig[paddingDevice].bottom}
                                                  onChange={(e) => setPaddingConfig({
                                                    ...paddingConfig,
                                                    [paddingDevice]: { ...paddingConfig[paddingDevice], bottom: Number(e.target.value) }
                                                  })}
                                                  className="w-full bg-transparent p-2.5 text-xs text-white focus:outline-none font-mono"
                                                />
                                                <span className="bg-white/5 text-slate-400 text-xs px-3 flex items-center font-mono">px</span>
                                              </div>
                                            </div>

                                            <div>
                                              <label className="text-[11px] text-slate-400 block mb-1">Padding Kiri</label>
                                              <div className="flex bg-[#161618] border border-white/10 rounded-xl overflow-hidden focus-within:border-amber-500">
                                                <input 
                                                  type="number" 
                                                  value={paddingConfig[paddingDevice].left}
                                                  onChange={(e) => setPaddingConfig({
                                                    ...paddingConfig,
                                                    [paddingDevice]: { ...paddingConfig[paddingDevice], left: Number(e.target.value) }
                                                  })}
                                                  className="w-full bg-transparent p-2.5 text-xs text-white focus:outline-none font-mono"
                                                />
                                                <span className="bg-white/5 text-slate-400 text-xs px-3 flex items-center font-mono">px</span>
                                              </div>
                                            </div>
                                          </div>

                                        </div>
                                      </div>
                                    )}
                                  </div>
                                </>
                              )}

                              {/* ---------------------------------------------------- */}
                              {/* 2. GAMBAR COMPONENT EDITOR */}
                              {/* ---------------------------------------------------- */}
                              {activeComponent === 'Gambar' && (
                                <div className="space-y-6 animate-in fade-in">
                                  <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                      <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">Preview & Kontrol Gambar</label>
                                      <span className="text-xs font-mono text-amber-400 font-bold">{heroImageZoom}% Scale</span>
                                    </div>

                                    <div className="relative rounded-xl border border-white/10 overflow-hidden bg-[#0a0a0a] h-48 flex items-center justify-center group">
                                      {heroImage ? (
                                        <img 
                                          src={heroImage} 
                                          alt="Preview" 
                                          className="w-full h-full transition-transform duration-300" 
                                          style={{ transform: `scale(${heroImageZoom / 100})`, objectFit: heroImageFit }}
                                        />
                                      ) : (
                                        <div className="text-center p-6 text-slate-500">
                                          <ImageIcon size={36} className="mx-auto mb-2 opacity-50" />
                                          <p className="text-xs">Gambar Dihapus / Kosong</p>
                                        </div>
                                      )}

                                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 backdrop-blur-xs">
                                        <button 
                                          onClick={() => setHeroImageZoom(prev => Math.min(prev + 15, 200))}
                                          className="p-2.5 bg-white/20 hover:bg-amber-500 text-white hover:text-black rounded-xl transition-all"
                                          title="Zoom In"
                                        >
                                          <ZoomIn size={18} />
                                        </button>
                                        <button 
                                          onClick={() => setHeroImageZoom(prev => Math.max(prev - 15, 50))}
                                          className="p-2.5 bg-white/20 hover:bg-amber-500 text-white hover:text-black rounded-xl transition-all"
                                          title="Zoom Out"
                                        >
                                          <ZoomOut size={18} />
                                        </button>
                                        <button 
                                          onClick={() => setHeroImageZoom(100)}
                                          className="p-2.5 bg-white/20 hover:bg-amber-500 text-white hover:text-black rounded-xl transition-all"
                                          title="Reset Scale"
                                        >
                                          <RefreshCw size={18} />
                                        </button>
                                        {heroImage && (
                                          <button 
                                            onClick={() => setHeroImage('')}
                                            className="p-2.5 bg-rose-600/80 hover:bg-rose-600 text-white rounded-xl transition-all"
                                            title="Hapus Gambar"
                                          >
                                            <Trash2 size={18} />
                                          </button>
                                        )}
                                      </div>
                                    </div>
                                  </div>

                                  <div className="space-y-4 bg-[#161618] p-4 rounded-xl border border-white/10">
                                    <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                                      <Settings size={14} className="text-amber-400" /> Fitur Advance Gambar
                                    </h4>

                                    <div className="space-y-2">
                                      <label className="text-xs text-slate-400 block">URL Gambar / Ganti Link</label>
                                      <input 
                                        type="text" 
                                        value={heroImage} 
                                        onChange={(e) => setHeroImage(e.target.value)}
                                        placeholder="https://images.unsplash.com/..."
                                        className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-amber-500 font-mono"
                                      />
                                    </div>

                                    <div className="space-y-2">
                                      <label className="text-xs text-slate-400 block">Mode Lay-out (Object Fit)</label>
                                      <div className="flex gap-2">
                                        {(['cover', 'contain', 'fill'] as const).map(fit => (
                                          <button 
                                            key={fit}
                                            onClick={() => setHeroImageFit(fit)}
                                            className={`flex-1 py-2 rounded-lg text-xs font-bold capitalize border ${heroImageFit === fit ? 'bg-amber-500/20 text-amber-400 border-amber-500' : 'bg-[#0a0a0a] text-slate-400 border-white/10 hover:text-white'}`}
                                          >
                                            {fit}
                                          </button>
                                        ))}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}

                              {/* ---------------------------------------------------- */}
                              {/* 3. TOMBOL COMPONENT EDITOR */}
                              {/* ---------------------------------------------------- */}
                              {activeComponent === 'Tombol' && (
                                <div className="space-y-5 animate-in fade-in">
                                  <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-400 block">Teks Tombol (CTA)</label>
                                    <input 
                                      type="text" 
                                      value={ctaText} 
                                      onChange={(e) => setCtaText(e.target.value)}
                                      className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-amber-500"
                                    />
                                  </div>

                                  <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-400 block">Target Link / Anchor ID</label>
                                    <input 
                                      type="text" 
                                      value={ctaUrl} 
                                      onChange={(e) => setCtaUrl(e.target.value)}
                                      className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-amber-500 font-mono"
                                    />
                                  </div>

                                  <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-400 block">Gaya Warna Tombol</label>
                                    <div className="grid grid-cols-2 gap-2">
                                      {[
                                        { name: 'Amber Glow', bg: 'from-rose-600 to-amber-500' },
                                        { name: 'Emerald Luxe', bg: 'from-emerald-600 to-teal-500' },
                                        { name: 'Dark Premium', bg: 'from-slate-900 to-slate-800' },
                                        { name: 'Indigo Accent', bg: 'from-indigo-600 to-violet-600' },
                                      ].map((style, idx) => (
                                        <button 
                                          key={idx}
                                          onClick={() => setCtaBg(style.bg)}
                                          className={`py-2.5 px-3 rounded-lg text-xs font-bold text-white bg-gradient-to-r ${style.bg} border transition-all ${ctaBg === style.bg ? 'border-white scale-105 shadow-md' : 'border-transparent opacity-80 hover:opacity-100'}`}
                                        >
                                          {style.name}
                                        </button>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              )}

                              {/* ---------------------------------------------------- */}
                              {/* 4. VIDEO COMPONENT EDITOR */}
                              {/* ---------------------------------------------------- */}
                              {activeComponent === 'Video' && (
                                <div className="space-y-5 animate-in fade-in">
                                  <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-400 block">URL Embed Video YouTube</label>
                                    <input 
                                      type="text" 
                                      value={videoUrl} 
                                      onChange={(e) => setVideoUrl(e.target.value)}
                                      className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-amber-500 font-mono"
                                    />
                                  </div>

                                  <div className="flex items-center justify-between p-4 bg-[#161618] rounded-xl border border-white/10">
                                    <span className="text-xs font-bold text-white">Tampilkan Section Video</span>
                                    <button 
                                      onClick={() => setShowVideo(!showVideo)}
                                      className={`w-12 h-6 rounded-full transition-colors relative p-1 ${showVideo ? 'bg-amber-500' : 'bg-slate-700'}`}
                                    >
                                      <div className={`w-4 h-4 bg-white rounded-full transition-transform ${showVideo ? 'translate-x-6' : 'translate-x-0'}`}></div>
                                    </button>
                                  </div>
                                </div>
                              )}

                              {/* ---------------------------------------------------- */}
                              {/* 5. FORM PEMESANAN COMPONENT EDITOR */}
                              {/* ---------------------------------------------------- */}
                              {activeComponent === 'Form Pemesanan' && (
                                <div className="space-y-5 animate-in fade-in">
                                  <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-400 block">Judul Form</label>
                                    <input 
                                      type="text" 
                                      value={formTitle} 
                                      onChange={(e) => setFormTitle(e.target.value)}
                                      className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-amber-500"
                                    />
                                  </div>

                                  <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-400 block">Teks Tombol Submit</label>
                                    <input 
                                      type="text" 
                                      value={formBtnText} 
                                      onChange={(e) => setFormBtnText(e.target.value)}
                                      className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-amber-500"
                                    />
                                  </div>
                                </div>
                              )}

                              {/* ---------------------------------------------------- */}
                              {/* 6. FAQ COMPONENT EDITOR */}
                              {/* ---------------------------------------------------- */}
                              {activeComponent === 'FAQ' && (
                                <div className="space-y-5 animate-in fade-in">
                                  <div className="flex justify-between items-center">
                                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Daftar Tanya Jawab</label>
                                    <button 
                                      onClick={() => setFaqs([...faqs, { id: Date.now(), q: "Pertanyaan Baru?", a: "Jawaban pertanyaan." }])}
                                      className="text-xs text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1"
                                    >
                                      <Plus size={14} /> Tambah FAQ
                                    </button>
                                  </div>

                                  {faqs.map((faq, idx) => (
                                    <div key={faq.id} className="p-4 bg-[#161618] rounded-xl border border-white/10 space-y-3 relative group">
                                      <div className="flex items-center justify-between">
                                        <span className="text-xs font-bold text-amber-400">FAQ #{idx + 1}</span>
                                        <button 
                                          onClick={() => setFaqs(faqs.filter(f => f.id !== faq.id))}
                                          className="text-slate-500 hover:text-rose-400"
                                        >
                                          <Trash2 size={14} />
                                        </button>
                                      </div>
                                      <input 
                                        type="text" 
                                        value={faq.q} 
                                        onChange={(e) => {
                                          const updated = [...faqs];
                                          updated[idx].q = e.target.value;
                                          setFaqs(updated);
                                        }}
                                        className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                                      />
                                      <textarea 
                                        value={faq.a} 
                                        onChange={(e) => {
                                          const updated = [...faqs];
                                          updated[idx].a = e.target.value;
                                          setFaqs(updated);
                                        }}
                                        className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg p-2.5 text-xs text-slate-300 focus:outline-none focus:border-amber-500 h-16 custom-scrollbar"
                                      ></textarea>
                                    </div>
                                  ))}
                                </div>
                              )}

                              {/* ---------------------------------------------------- */}
                              {/* 7. TESTIMONI COMPONENT EDITOR */}
                              {/* ---------------------------------------------------- */}
                              {activeComponent === 'Testimoni' && (
                                <div className="space-y-5 animate-in fade-in">
                                  <div className="flex justify-between items-center">
                                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Daftar Testimoni</label>
                                    <button 
                                      onClick={() => setTestimonials([...testimonials, { id: Date.now(), name: "Nama Pembeli", role: "Cluster Myzora", text: "Ulasan testimoni menarik...", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" }])}
                                      className="text-xs text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1"
                                    >
                                      <Plus size={14} /> Tambah Testimoni
                                    </button>
                                  </div>

                                  {testimonials.map((item, idx) => (
                                    <div key={item.id} className="p-4 bg-[#161618] rounded-xl border border-white/10 space-y-3">
                                      <div className="flex items-center justify-between">
                                        <span className="text-xs font-bold text-amber-400">Testimoni #{idx + 1}</span>
                                        <button 
                                          onClick={() => setTestimonials(testimonials.filter(t => t.id !== item.id))}
                                          className="text-slate-500 hover:text-rose-400"
                                        >
                                          <Trash2 size={14} />
                                        </button>
                                      </div>
                                      <input 
                                        type="text" 
                                        value={item.name} 
                                        onChange={(e) => {
                                          const updated = [...testimonials];
                                          updated[idx].name = e.target.value;
                                          setTestimonials(updated);
                                        }}
                                        className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg p-2 text-xs text-white"
                                        placeholder="Nama"
                                      />
                                      <input 
                                        type="text" 
                                        value={item.role} 
                                        onChange={(e) => {
                                          const updated = [...testimonials];
                                          updated[idx].role = e.target.value;
                                          setTestimonials(updated);
                                        }}
                                        className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg p-2 text-xs text-slate-400"
                                        placeholder="Role / Profesi"
                                      />
                                      <textarea 
                                        value={item.text} 
                                        onChange={(e) => {
                                          const updated = [...testimonials];
                                          updated[idx].text = e.target.value;
                                          setTestimonials(updated);
                                        }}
                                        className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg p-2 text-xs text-white h-16 custom-scrollbar"
                                        placeholder="Quote Testimoni"
                                      ></textarea>
                                    </div>
                                  ))}
                                </div>
                              )}

                            </div>
                          </div>
                        )}
                      </div>
                    )}
                    
                    {/* Desain & Pengaturan Tabs */}
                    {builderTab !== 'konten' && (
                      <div className="p-8 text-center opacity-70 flex flex-col items-center justify-center h-64">
                        <Paintbrush size={40} className="mb-4 text-amber-400" />
                        <h3 className="text-base font-bold text-white mb-2">Tab {builderTab}</h3>
                        <p className="text-sm text-slate-400">Konfigurasi global {builderTab} landing page.</p>
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

          {/* Toggle Sidebar Collapse Button */}
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
                <button onClick={() => setDevice('desktop')} className={`p-2 rounded-lg transition-colors ${device === 'desktop' ? 'bg-white shadow text-slate-800' : 'text-slate-500 hover:text-slate-700'}`} title="Desktop View"><Monitor size={16} /></button>
                <button onClick={() => setDevice('tablet')} className={`p-2 rounded-lg transition-colors ${device === 'tablet' ? 'bg-white shadow text-slate-800' : 'text-slate-500 hover:text-slate-700'}`} title="Tablet View"><Tablet size={16} /></button>
                <button onClick={() => setDevice('mobile')} className={`p-2 rounded-lg transition-colors ${device === 'mobile' ? 'bg-white shadow text-slate-800' : 'text-slate-500 hover:text-slate-700'}`} title="Mobile View"><Smartphone size={16} /></button>
              </div>
              <div className="flex items-center gap-2 pl-1 pr-2">
                <button onClick={handleZoomOut} className="p-1.5 hover:bg-slate-200 rounded-lg text-slate-500 hover:text-slate-800 transition-colors"><ZoomOut size={16} /></button>
                <span className="text-xs font-mono font-bold text-slate-700 w-12 text-center">{zoom}%</span>
                <button onClick={handleZoomIn} className="p-1.5 hover:bg-slate-200 rounded-lg text-slate-500 hover:text-slate-800 transition-colors"><ZoomIn size={16} /></button>
              </div>
            </div>
          </div>

          {/* Canvas Area (Scrollable with explicit custom-scrollbar) */}
          <div className="flex-1 overflow-auto custom-scrollbar bg-slate-100 p-8 flex items-start justify-center relative bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]">
            
            {/* The "Paper" / Mockup Container (Clean Canvas - Default Navbar Removed as requested) */}
            <div 
              className={`shadow-2xl transition-all duration-300 relative origin-top overflow-hidden border border-slate-200 ${
                device === 'desktop' ? 'w-full max-w-[1200px] rounded-xl' : 
                device === 'tablet' ? 'w-[768px] rounded-[2rem]' : 'w-[375px] rounded-[3rem]'
              }`}
              style={{ 
                backgroundColor: bgColor,
                backgroundImage: sectionBgImage ? `url(${sectionBgImage})` : undefined,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                transform: `scale(${zoom / 100})`, 
                minHeight: '1000px',
                paddingTop: `${currentPadding.top}px`,
                paddingRight: `${currentPadding.right}px`,
                paddingBottom: `${currentPadding.bottom}px`,
                paddingLeft: `${currentPadding.left}px`,
              }}
            >
              {/* Optional Dark Tint Overlay when background image is present */}
              {sectionBgImage && (
                <div 
                  className="absolute inset-0 z-0 pointer-events-none transition-opacity" 
                  style={{ backgroundColor: `rgba(0,0,0, ${bgImageOverlay / 100})` }}
                ></div>
              )}

              {/* Mockup Landing Page Content */}
              <div className="font-sans text-slate-800 relative z-10 w-full h-full pb-20 pt-10">

                {/* Hero Section */}
                <div className="relative pt-8 pb-20 px-6 text-center">
                  <div className="relative z-10 max-w-4xl mx-auto space-y-6">
                    
                    {/* Badge Hero (Interactive Sync + contentEditable) */}
                    <div 
                      onClick={() => { selectSection('Teks', 'hero-badge'); setTextTarget('badge'); }}
                      onMouseEnter={() => setHoveredElementId('hero-badge')}
                      onMouseLeave={() => setHoveredElementId(null)}
                      className={`inline-block relative cursor-pointer p-1 rounded-full transition-all ${
                        activeElementId === 'hero-badge' ? 'ring-2 ring-amber-500 ring-offset-4' : 
                        hoveredElementId === 'hero-badge' ? 'ring-2 ring-amber-400/60' : ''
                      }`}
                    >
                      <span 
                        contentEditable={true}
                        suppressContentEditableWarning={true}
                        onBlur={(e) => setHeroBadge(e.currentTarget.innerText)}
                        className="inline-block py-1.5 px-4 rounded-full bg-rose-100 text-rose-700 font-bold text-xs uppercase tracking-widest outline-none focus:ring-2 focus:ring-rose-500"
                      >
                        {heroBadge}
                      </span>

                      {(activeElementId === 'hero-badge' || hoveredElementId === 'hero-badge') && (
                        <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-amber-500 text-black text-[10px] font-bold px-2 py-0.5 rounded shadow whitespace-nowrap z-30 pointer-events-none">
                          {activeElementId === 'hero-badge' ? '⚡ Mengedit Badge' : '👁️ Hover Badge'}
                        </div>
                      )}
                    </div>

                    {/* Headline Hero (Direct contentEditable - User can highlight/block specific words live!) */}
                    <div 
                      onClick={() => { selectSection('Teks', 'hero-headline'); setTextTarget('headline'); }}
                      onMouseEnter={() => setHoveredElementId('hero-headline')}
                      onMouseLeave={() => setHoveredElementId(null)}
                      className={`relative cursor-pointer p-3 rounded-2xl transition-all ${
                        activeElementId === 'hero-headline' ? 'ring-2 ring-amber-500 ring-offset-4 bg-amber-500/5' : 
                        hoveredElementId === 'hero-headline' ? 'ring-2 ring-amber-400/50' : ''
                      }`}
                    >
                      <h1 
                        contentEditable={true}
                        suppressContentEditableWarning={true}
                        onBlur={(e) => setHeroTitle(e.currentTarget.innerText)}
                        className={`font-black text-slate-900 leading-tight outline-none focus:ring-1 focus:ring-amber-500/50 rounded-lg ${isBold ? 'font-bold' : 'font-normal'} ${isItalic ? 'italic' : ''}`}
                        style={{ 
                          fontFamily: fontFamily,
                          fontSize: headingType === 'Heading 1' ? '56px' : headingType === 'Heading 2' ? '40px' : headingType === 'Heading 3' ? '32px' : fontSizePx,
                          lineHeight: lineHeight,
                          textAlign: textAlign as any, 
                          color: sectionBgImage ? '#ffffff' : textColor,
                          backgroundColor: textBgHighlight,
                          textDecoration: isUnderline && isStrikethrough ? 'underline line-through' : isUnderline ? 'underline' : isStrikethrough ? 'line-through' : 'none'
                        }}
                      >
                        {heroTitle}<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-amber-500">
                          {heroTitleGradient}
                        </span>
                      </h1>

                      {(activeElementId === 'hero-headline' || hoveredElementId === 'hero-headline') && (
                        <div className="absolute -top-4 right-4 bg-amber-500 text-black text-[11px] font-bold px-3 py-1 shadow-lg flex items-center gap-1 rounded-full z-30 animate-pulse pointer-events-none">
                          <Type size={12} /> {activeElementId === 'hero-headline' ? 'Mengedit Headline (Bisa Blok Kata)' : 'Hover Headline'}
                        </div>
                      )}
                    </div>

                    {/* Subtitle Hero (Direct contentEditable - User can highlight/block specific words live!) */}
                    <div 
                      onClick={() => { selectSection('Teks', 'hero-headline'); setTextTarget('subtitle'); }}
                      className="cursor-pointer hover:opacity-90 transition-opacity max-w-2xl mx-auto"
                    >
                      <p 
                        contentEditable={true}
                        suppressContentEditableWarning={true}
                        onBlur={(e) => setHeroSubtitle(e.currentTarget.innerText)}
                        className={`text-base md:text-xl text-slate-600 mb-10 outline-none focus:ring-1 focus:ring-amber-500/50 rounded-lg p-2 ${isItalic ? 'italic' : ''} ${sectionBgImage ? 'text-slate-200' : ''}`}
                        style={{ 
                          fontFamily: fontFamily,
                          lineHeight: lineHeight,
                          textAlign: textAlign as any,
                          textDecoration: isUnderline && isStrikethrough ? 'underline line-through' : isUnderline ? 'underline' : isStrikethrough ? 'line-through' : 'none'
                        }}
                      >
                        {isNumberedList ? '1. ' : isBulletList ? '• ' : ''}
                        {heroSubtitle}
                      </p>
                    </div>
                    
                    {/* Hero Image Container */}
                    <div 
                      onClick={() => selectSection('Gambar', 'hero-image')}
                      onMouseEnter={() => setHoveredElementId('hero-image')}
                      onMouseLeave={() => setHoveredElementId(null)}
                      className={`relative rounded-3xl overflow-hidden shadow-2xl mx-auto border-[8px] border-white max-w-4xl cursor-pointer transition-all ${
                        activeElementId === 'hero-image' ? 'ring-4 ring-amber-500 shadow-[0_0_30px_rgba(245,158,11,0.4)]' : 
                        hoveredElementId === 'hero-image' ? 'ring-2 ring-amber-400/70' : ''
                      }`}
                    >
                      {heroImage ? (
                        <div className="overflow-hidden bg-slate-900">
                          <img 
                            src={heroImage} 
                            alt="Myzora" 
                            className="w-full h-auto object-cover transition-transform duration-300" 
                            style={{ transform: `scale(${heroImageZoom / 100})`, objectFit: heroImageFit }}
                          />
                        </div>
                      ) : (
                        <div className="py-24 bg-slate-200 text-slate-500 text-center">
                          <ImageIcon size={48} className="mx-auto mb-2 opacity-50" />
                          <p className="font-bold">Gambar Kosong / Hapus Mode</p>
                        </div>
                      )}

                      <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                        <div className="w-20 h-20 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
                          <Play size={32} className="text-white fill-current ml-2" />
                        </div>
                      </div>

                      {(activeElementId === 'hero-image' || hoveredElementId === 'hero-image') && (
                        <div className="absolute top-4 right-4 bg-amber-500 text-black text-[11px] font-bold px-3 py-1 shadow-lg flex items-center gap-1 rounded-full z-30 pointer-events-none">
                          <ImageIcon size={12} /> {activeElementId === 'hero-image' ? 'Mengedit Gambar Hero' : 'Hover Gambar'}
                        </div>
                      )}
                    </div>

                  </div>
                </div>

                {/* Features Section */}
                <div 
                  id="features-section"
                  onClick={() => selectSection('Daftar/List', 'features-section')}
                  onMouseEnter={() => setHoveredElementId('features-section')}
                  onMouseLeave={() => setHoveredElementId(null)}
                  className={`py-16 px-6 max-w-6xl mx-auto rounded-3xl cursor-pointer transition-all relative ${
                    activeElementId === 'features-section' ? 'ring-2 ring-amber-500 bg-amber-500/5' : 
                    hoveredElementId === 'features-section' ? 'ring-2 ring-amber-400/40' : ''
                  }`}
                >
                  <div className="grid md:grid-cols-3 gap-12">
                    {[
                      { icon: '🚆', title: '5 Menit ke Stasiun KRL', desc: 'Akses komuter line langsung tanpa ribet macet.' },
                      { icon: '🏖️', title: 'Clubhouse Premium', desc: 'Fasilitas bintang 5 untuk akhir pekan keluarga Anda.' },
                      { icon: '🛡️', title: 'Keamanan Smart System', desc: 'One gate system dengan pengawasan CCTV & smart home.' }
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

                  {(activeElementId === 'features-section' || hoveredElementId === 'features-section') && (
                    <div className="absolute top-2 right-2 bg-amber-500 text-black text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow pointer-events-none">
                      Mengedit Features Section
                    </div>
                  )}
                </div>

                {/* Video Section (If Enabled) */}
                {showVideo && (
                  <div 
                    onClick={() => selectSection('Video', 'video-section')}
                    onMouseEnter={() => setHoveredElementId('video-section')}
                    onMouseLeave={() => setHoveredElementId(null)}
                    className={`py-12 px-6 max-w-4xl mx-auto rounded-3xl transition-all relative cursor-pointer ${
                      activeElementId === 'video-section' ? 'ring-2 ring-amber-500 bg-amber-500/5' : ''
                    }`}
                  >
                    <div className="aspect-video bg-black rounded-2xl overflow-hidden shadow-xl border-4 border-white">
                      <iframe 
                        src={videoUrl} 
                        title="Promo Video"
                        className="w-full h-full"
                        allow="autoplay; encrypted-media"
                      ></iframe>
                    </div>

                    {activeElementId === 'video-section' && (
                      <div className="absolute top-4 right-4 bg-amber-500 text-black text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow pointer-events-none">
                        Mengedit Section Video
                      </div>
                    )}
                  </div>
                )}

                {/* Form Section */}
                <div 
                  id="form-section"
                  onClick={() => selectSection('Form Pemesanan', 'form-section')}
                  onMouseEnter={() => setHoveredElementId('form-section')}
                  onMouseLeave={() => setHoveredElementId(null)}
                  className={`py-16 px-6 max-w-2xl mx-auto my-12 bg-white border border-slate-200 rounded-3xl shadow-xl transition-all relative cursor-pointer ${
                    activeElementId === 'form-section' ? 'ring-4 ring-amber-500 shadow-[0_0_30px_rgba(245,158,11,0.3)]' : ''
                  }`}
                >
                  <h3 className="text-2xl font-bold text-slate-900 text-center mb-6">{formTitle}</h3>
                  <div className="space-y-4">
                    <input type="text" placeholder="Nama Lengkap" className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-sm text-slate-800 focus:outline-none focus:border-amber-500" readOnly />
                    <input type="text" placeholder="Nomor WhatsApp" className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-sm text-slate-800 focus:outline-none focus:border-amber-500" readOnly />
                    <button className="w-full py-4 bg-gradient-to-r from-amber-500 to-rose-600 text-white font-bold rounded-xl text-base shadow-lg hover:opacity-95 transition-opacity">
                      {formBtnText}
                    </button>
                  </div>

                  {activeElementId === 'form-section' && (
                    <div className="absolute top-4 right-4 bg-amber-500 text-black text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow pointer-events-none">
                      Mengedit Form Pemesanan
                    </div>
                  )}
                </div>

                {/* Testimonial Section */}
                <div 
                  onClick={() => selectSection('Testimoni', 'testimonial-section')}
                  className={`py-12 px-6 max-w-4xl mx-auto rounded-3xl transition-all relative cursor-pointer ${
                    activeElementId === 'testimonial-section' ? 'ring-2 ring-amber-500 bg-amber-500/5' : ''
                  }`}
                >
                  <h3 className="text-xl font-bold text-center text-slate-800 mb-8">Apa Kata Penghuni Myzora?</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    {testimonials.map((t) => (
                      <div key={t.id} className="p-6 bg-slate-50 rounded-2xl border border-slate-100 shadow-sm">
                        <p className="text-sm text-slate-600 italic mb-4">"{t.text}"</p>
                        <div className="flex items-center gap-3">
                          <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
                          <div>
                            <h5 className="text-xs font-bold text-slate-900">{t.name}</h5>
                            <p className="text-[11px] text-slate-500">{t.role}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {activeElementId === 'testimonial-section' && (
                    <div className="absolute top-2 right-2 bg-amber-500 text-black text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow pointer-events-none">
                      Mengedit Testimoni
                    </div>
                  )}
                </div>

                {/* FAQ Section */}
                <div 
                  onClick={() => selectSection('FAQ', 'faq-section')}
                  className={`py-12 px-6 max-w-3xl mx-auto rounded-3xl transition-all relative cursor-pointer ${
                    activeElementId === 'faq-section' ? 'ring-2 ring-amber-500 bg-amber-500/5' : ''
                  }`}
                >
                  <h3 className="text-xl font-bold text-center text-slate-800 mb-6">Pertanyaan Populer (FAQ)</h3>
                  <div className="space-y-4">
                    {faqs.map((faq) => (
                      <div key={faq.id} className="p-5 bg-white border border-slate-200 rounded-2xl shadow-xs">
                        <h4 className="text-sm font-bold text-slate-900 mb-2">{faq.q}</h4>
                        <p className="text-xs text-slate-500 leading-relaxed">{faq.a}</p>
                      </div>
                    ))}
                  </div>

                  {activeElementId === 'faq-section' && (
                    <div className="absolute top-2 right-2 bg-amber-500 text-black text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow pointer-events-none">
                      Mengedit FAQ
                    </div>
                  )}
                </div>

              </div>

            </div>

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
