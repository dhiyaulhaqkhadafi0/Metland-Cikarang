"use client";

import React, { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Lightbulb, TrendingUp, Activity, Magnet, FileText, 
  Newspaper, Hash, Search, BookOpen, Image as ImageIcon, 
  Wand2, Calendar, RefreshCw, BarChart2, Rocket, 
  Sparkles, Copy, CheckCircle2, Bot, StopCircle, ArrowLeft, ChevronDown
} from 'lucide-react';

const CATEGORIES = [
  {
    id: 'ideation',
    title: 'Ideation',
    icon: Lightbulb,
    tools: [
      { id: 'content-ideas', name: 'AI Content Ideas', icon: Lightbulb, desc: 'Temukan ratusan ide konten brilian berdasarkan audiens Metland', color: 'from-emerald-400 to-teal-500' },
      { id: 'trend-hunter', name: 'AI Trend Hunter', icon: TrendingUp, desc: 'Analisis tren viral TikTok & Reels untuk diadopsi ke properti', color: 'from-blue-400 to-indigo-500' },
      { id: 'viral-analyzer', name: 'AI Viral Analyzer', icon: Activity, desc: 'Bedah anatomi konten kompetitor yang viral dan replikasi', color: 'from-violet-400 to-fuchsia-500' },
    ]
  },
  {
    id: 'writing',
    title: 'Content Writing',
    icon: FileText,
    tools: [
      { id: 'hook-gen', name: 'AI Hook Generator', icon: Magnet, desc: 'Ciptakan kalimat pembuka psikologis yang mustahil di-skip', color: 'from-rose-400 to-orange-500' },
      { id: 'script-gen', name: 'AI Script Generator', icon: FileText, desc: 'Naskah video lengkap dengan arahan visual dan voiceover', color: 'from-amber-400 to-orange-500' },
      { id: 'news-writer', name: 'AI Property News', icon: Newspaper, desc: 'Ubah berita properti membosankan jadi konten edukasi seru', color: 'from-cyan-400 to-blue-500' },
      { id: 'hashtag-gen', name: 'AI Hashtag Gen', icon: Hash, desc: 'Formulasi hashtag SEO dengan kombinasi volume pencarian optimal', color: 'from-emerald-400 to-green-500' },
      { id: 'seo-meta', name: 'AI SEO Meta', icon: Search, desc: 'Hasilkan meta title & description untuk optimasi website Metland', color: 'from-blue-400 to-sky-500' },
    ]
  },
  {
    id: 'design',
    title: 'Content Design',
    icon: ImageIcon,
    tools: [
      { id: 'carousel-gen', name: 'AI Carousel Gen', icon: BookOpen, desc: 'Konsep carousel edukatif multi-slide untuk Instagram/LinkedIn', color: 'from-fuchsia-400 to-pink-500' },
      { id: 'thumbnail-maker', name: 'AI Thumbnail Maker', icon: ImageIcon, desc: 'Ide tata letak dan copywriting memikat untuk thumbnail YouTube/Video', color: 'from-red-400 to-rose-500' },
      { id: 'image-prompt', name: 'AI Image Prompt', icon: Wand2, desc: 'Prompt sakti Midjourney/Flux untuk merender visual properti estetik', color: 'from-purple-400 to-indigo-500' },
    ]
  },
  {
    id: 'publishing',
    title: 'Publishing',
    icon: Calendar,
    tools: [
      { id: 'content-calendar', name: 'AI Content Calendar', icon: Calendar, desc: 'Jadwal tayang 30 hari komprehensif lengkap dengan pilar konten', color: 'from-teal-400 to-emerald-500' },
      { id: 'repurposer', name: 'AI Content Repurposer', icon: RefreshCw, desc: 'Sulap 1 video panjang menjadi 10 format konten berbeda secara instan', color: 'from-indigo-400 to-cyan-500' },
    ]
  },
  {
    id: 'optimization',
    title: 'Optimization',
    icon: BarChart2,
    tools: [
      { id: 'evaluator', name: 'AI Content Evaluator', icon: BarChart2, desc: 'Skoring kualitas konten Anda sebelum di-publish beserta revisinya', color: 'from-orange-400 to-red-500' },
    ]
  },
  {
    id: 'campaign',
    title: 'Campaign',
    icon: Rocket,
    tools: [
      { id: 'campaign-builder', name: 'AI Campaign Builder', icon: Rocket, desc: 'Arsitektur end-to-end marketing campaign untuk peluncuran cluster baru', color: 'from-yellow-400 to-amber-500' },
    ]
  }
];

export default function ContentStudioClient() {
  // Navigation State
  const [activeTool, setActiveTool] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Form State (for specific tools)
  const [cluster, setCluster] = useState('Semua Cluster Metland Cikarang');
  const [context, setContext] = useState('');
  
  // AI State
  const [isGenerating, setIsGenerating] = useState(false);
  const [output, setOutput] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  
  const abortControllerRef = useRef<AbortController | null>(null);
  const outputEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll output to bottom while streaming
  useEffect(() => {
    if (isGenerating && outputEndRef.current) {
      outputEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [output, isGenerating]);

  // Clean up streaming on unmount
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  const getSystemPrompt = () => {
    const base = `Kamu adalah AI Creative Director & Copywriter kelas dunia untuk developer properti Metland Cikarang. Jawab dengan bahasa Indonesia yang sangat natural, kreatif, profesional, out-of-the-box, dan persuasif. JANGAN terdengar seperti robot atau asisten virtual kaku. Hindari intro basa-basi ("Tentu, ini ide-idenya..."), langsung berikan output yang menakjubkan dan berstruktur rapi.
Produk yang dipasarkan: ${cluster}.
Konteks / Arahan spesifik dari user: ${context || 'Tidak ada spesifik, berikan ide paling inovatif.'}`;

    switch (activeTool) {
      case 'content-ideas':
        return `${base}\n\nTUGAS UTAMA: Berikan 15 ide konten (Video pendek, Carousel, dan Story) yang sangat unik, memancing interaksi (engagement), dan berpotensi viral untuk properti ini. Gunakan format Markdown rapi dengan peluru (bullet points). Berikan judul (Headline) yang super 'hooking' untuk setiap ide.`;
      case 'trend-hunter':
        return `${base}\n\nTUGAS UTAMA: Analisis tren TikTok/Reels/Instagram saat ini dan jabarkan bagaimana tren tersebut bisa diadopsi (riding the wave) untuk menjual properti Metland. Berikan 5 ide eksekusi tren spesifik beserta saran lagu/soundtrack yang relevan.`;
      case 'hook-gen':
        return `${base}\n\nTUGAS UTAMA: Buatkan 20 kalimat HOOK (untuk detik ke 1-3 video pendek) yang sangat memancing rasa penasaran audiens secara psikologis ekstrem agar mereka tidak men-scroll (scroll-stopping). Jangan gunakan gaya bahasa kaku, buat seakan-akan konten kreator top yang berbicara.`;
      default:
        return `${base}\n\nTUGAS UTAMA: Hasilkan output luar biasa kreatif dan marketing-oriented berdasarkan tool yang dipilih dan konteks di atas. Gunakan formatting Markdown yang rapi.`;
    }
  };

  const handleGenerate = async () => {
    if (!activeTool) return;
    
    // Reset state
    setOutput('');
    setIsGenerating(true);
    
    // Create new abort controller for this stream
    abortControllerRef.current = new AbortController();

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [{ role: 'user', content: getSystemPrompt() }],
          context: 'content-studio' // Using the newly configured context that bypasses SMI default
        }),
        signal: abortControllerRef.current.signal
      });

      if (!response.ok) {
        throw new Error('Gagal menghubungi AI Server');
      }

      if (!response.body) throw new Error('No body returned from API');

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let done = false;

      while (!done) {
        const { value, done: readerDone } = await reader.read();
        done = readerDone;
        
        if (value) {
          const chunk = decoder.decode(value, { stream: true });
          
          const lines = chunk.split('\n');
          for (const line of lines) {
            if (line.startsWith('0:')) {
              try {
                const textStr = line.substring(2);
                const parsedStr = JSON.parse(textStr);
                setOutput(prev => prev + parsedStr);
              } catch (e) {
                // Ignore parse errors for incomplete chunks
              }
            }
          }
        }
      }
    } catch (err: any) {
      if (err.name !== 'AbortError') {
        console.error(err);
        setOutput(prev => prev + '\n\n[ERROR] Terjadi kesalahan saat menghubungi server AI. Pastikan API Key valid.');
      }
    } finally {
      setIsGenerating(false);
      abortControllerRef.current = null;
    }
  };

  const stopGeneration = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      setIsGenerating(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) return CATEGORIES;
    const query = searchQuery.toLowerCase();
    
    return CATEGORIES.map(cat => ({
      ...cat,
      tools: cat.tools.filter(t => 
        t.name.toLowerCase().includes(query) || 
        t.desc.toLowerCase().includes(query)
      )
    })).filter(cat => cat.tools.length > 0);
  }, [searchQuery]);

  // Dashboard View Component (Landing Page)
  const renderDashboard = () => (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full h-full flex flex-col pt-8 pb-24 px-8 md:px-16 overflow-y-auto custom-scrollbar"
    >
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center text-center mb-16 relative z-10">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="mb-6 p-4 rounded-3xl bg-gradient-to-br from-emerald-500/20 to-teal-900/40 backdrop-blur-xl border border-emerald-500/30 shadow-[0_0_50px_rgba(16,185,129,0.2)]"
        >
          <Sparkles size={40} className="text-emerald-400 drop-shadow-[0_0_15px_rgba(52,211,153,0.8)]" />
        </motion.div>
        <h1 className="text-5xl md:text-6xl font-black mb-6 tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-white via-slate-200 to-slate-500 drop-shadow-lg">
          AI Content <span className="text-emerald-400">Studio</span>
        </h1>
        <p className="text-slate-400 text-lg md:text-xl font-light max-w-2xl leading-relaxed mb-10">
          Supercharge strategi digital marketing Anda. Pilih AI Copilot Anda untuk meriset, merancang, dan memproduksi konten kelas dunia dalam hitungan detik.
        </p>
        
        {/* Search Bar */}
        <div className="w-full max-w-xl relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 via-teal-500/20 to-emerald-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
          <div className="relative bg-black/40 backdrop-blur-2xl border border-white/10 rounded-3xl flex items-center p-2 shadow-2xl transition-all duration-300 focus-within:border-emerald-500/50 focus-within:shadow-[0_0_30px_rgba(16,185,129,0.15)]">
            <Search className="text-slate-400 ml-4 mr-3" size={24} />
            <input 
              type="text" 
              placeholder="Cari AI tools (Cth: Hook Generator, Ide Konten, SEO...)" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent text-white placeholder:text-slate-500 py-3 px-2 outline-none text-lg font-light tracking-wide"
            />
          </div>
        </div>
      </div>

      {/* Grid Categories */}
      <div className="space-y-16 relative z-10 max-w-7xl mx-auto w-full">
        {filteredCategories.length === 0 ? (
          <div className="text-center text-slate-500 py-20 flex flex-col items-center">
            <Bot size={48} className="mb-4 opacity-50" />
            <p className="text-lg">Tidak ada AI Tool yang cocok dengan pencarian Anda.</p>
          </div>
        ) : (
          filteredCategories.map((category, idx) => (
            <motion.div 
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-white/5 border border-white/10 text-slate-300 backdrop-blur-sm">
                  <category.icon size={20} />
                </div>
                <h2 className="text-2xl font-bold text-white tracking-tight">{category.title}</h2>
                <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent ml-4" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.tools.map((tool) => (
                  <div
                    key={tool.id}
                    onClick={() => {
                      setActiveTool(tool.id);
                      setOutput('');
                    }}
                    className="group cursor-pointer bg-[#1A1C23]/60 backdrop-blur-xl rounded-[2rem] p-6 border border-white/5 hover:border-white/15 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] relative overflow-hidden flex flex-col h-full"
                  >
                    {/* Glassmorphism gradient effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    
                    {/* Glowing orb in corner */}
                    <div className={`absolute -top-16 -right-16 w-32 h-32 rounded-full bg-gradient-to-br ${tool.color} blur-[60px] opacity-20 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none`} />

                    <div className="relative z-10 flex flex-col h-full">
                      <div className="flex items-start justify-between mb-4">
                        <div className={`p-4 rounded-2xl bg-black/40 border border-white/5 shadow-inner group-hover:scale-110 transition-transform duration-500 ease-out`}>
                          <tool.icon size={28} className={`text-transparent bg-clip-text bg-gradient-to-br ${tool.color}`} />
                        </div>
                      </div>
                      
                      <h3 className="text-xl font-bold text-white mb-3 tracking-tight group-hover:text-emerald-400 transition-colors duration-300">{tool.name}</h3>
                      <p className="text-slate-400 text-sm leading-relaxed font-light flex-1">
                        {tool.desc}
                      </p>
                      
                      <div className="mt-6 flex items-center text-[11px] font-bold tracking-[0.2em] text-slate-500 uppercase group-hover:text-emerald-400 transition-colors">
                        Launch Tool <ArrowLeft className="ml-2 rotate-180" size={14} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))
        )}
      </div>
    </motion.div>
  );

  // Content Ideas Tool View (Spacious Layout)
  const renderContentIdeasTool = () => {
    const currentToolData = CATEGORIES.flatMap(c => c.tools).find(t => t.id === 'content-ideas');
    
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="w-full h-full flex flex-col relative"
      >
        {/* Tool Header */}
        <div className="h-20 shrink-0 border-b border-white/5 bg-black/20 backdrop-blur-2xl flex items-center px-8 justify-between z-20">
          <div className="flex items-center gap-6">
            <button 
              onClick={() => setActiveTool(null)}
              className="p-3 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-all group"
            >
              <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            </button>
            <div className="w-px h-8 bg-white/10" />
            <div className="flex items-center gap-4">
              <div className="p-2.5 rounded-xl bg-gradient-to-br from-emerald-400/20 to-teal-500/20 border border-emerald-500/30">
                <Lightbulb size={24} className="text-emerald-400" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">{currentToolData?.name}</h2>
                <p className="text-xs text-emerald-400 font-bold tracking-wider uppercase">{currentToolData?.desc}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Workspace - Very Spacious Split View */}
        <div className="flex-1 flex overflow-hidden">
          {/* LEFT: Config Panel */}
          <div className="w-[40%] min-w-[400px] border-r border-white/5 bg-black/10 backdrop-blur-xl p-8 lg:p-12 flex flex-col overflow-y-auto custom-scrollbar relative">
            <div className="max-w-md mx-auto w-full space-y-10">
              <div className="space-y-2">
                <h3 className="text-3xl font-black text-white tracking-tight">Setup Ideation</h3>
                <p className="text-slate-400 text-sm leading-relaxed font-light">Tentukan target perumahan dan berikan arahan spesifik agar AI dapat meracik konten yang tepat sasaran.</p>
              </div>

              <div className="space-y-4">
                <label className="text-[11px] font-bold text-emerald-400 uppercase tracking-[0.2em] flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)]"></div>
                  Target Produk / Cluster
                </label>
                <div className="relative group/select">
                  <select 
                    value={cluster}
                    onChange={(e) => setCluster(e.target.value)}
                    className="w-full bg-[#1A1C23]/80 border border-white/10 hover:border-emerald-500/30 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/10 transition-all appearance-none cursor-pointer backdrop-blur-xl"
                  >
                    <option>Semua Cluster Metland Cikarang</option>
                    <option>Cluster Avesa Garden</option>
                    <option>Cluster Lisse</option>
                    <option>Ruko Plaza de Cikarang</option>
                  </select>
                  <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 group-hover/select:text-emerald-400 transition-colors">
                    <ChevronDown size={20} />
                  </div>
                </div>
              </div>
              
              <div className="space-y-4 flex-1">
                <label className="text-[11px] font-bold text-indigo-400 uppercase tracking-[0.2em] flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.8)]"></div>
                  Konteks Kreatif Spesifik
                </label>
                <textarea 
                  value={context}
                  onChange={(e) => setContext(e.target.value)}
                  placeholder="Contoh: Fokuskan pada keluarga muda yang mulai start dari cicilan 3 jutaan. Buat gayanya santai dan sedikit humoris."
                  className="w-full h-48 bg-[#1A1C23]/80 hover:bg-[#1f222b]/80 border border-white/10 hover:border-indigo-500/30 rounded-2xl p-5 text-white focus:outline-none focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 transition-all resize-none placeholder:text-slate-600 backdrop-blur-xl font-light leading-relaxed custom-scrollbar"
                />
              </div>

              <div className="pt-4">
                <AnimatePresence mode="wait">
                  {!isGenerating ? (
                    <motion.button 
                      key="generate-btn"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      onClick={handleGenerate}
                      className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-900 rounded-2xl px-6 py-5 text-base font-black tracking-wide transition-all shadow-[0_0_30px_rgba(16,185,129,0.3)] hover:shadow-[0_0_50px_rgba(16,185,129,0.5)] flex items-center justify-center gap-3 relative group"
                    >
                      <Sparkles size={24} className="relative z-10" />
                      <span className="relative z-10">Generate Ide Konten</span>
                    </motion.button>
                  ) : (
                    <motion.button 
                      key="stop-btn"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      onClick={stopGeneration}
                      className="w-full bg-red-500/10 border border-red-500/30 hover:bg-red-500/20 text-red-400 rounded-2xl px-6 py-5 text-base font-black tracking-wide transition-all flex items-center justify-center gap-3"
                    >
                      <StopCircle size={24} />
                      <span>Hentikan AI</span>
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>
            </div>
            
            {/* Ambient Background for Sidebar */}
            <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* RIGHT: Output Panel */}
          <div className="flex-1 bg-black/40 backdrop-blur-3xl flex flex-col relative overflow-hidden">
            {/* Output Header */}
            <div className="h-16 shrink-0 border-b border-white/5 flex items-center justify-between px-8 bg-black/20 z-20">
              <div className="flex items-center gap-3">
                <Bot size={18} className={isGenerating ? 'text-emerald-400 animate-pulse' : 'text-slate-500'} />
                <span className="text-xs font-bold tracking-[0.2em] text-slate-400">
                  {isGenerating ? 'AI SEDANG MENYUSUN IDE...' : 'AI OUTPUT WORKSPACE'}
                </span>
              </div>
              
              <AnimatePresence>
                {output && (
                  <motion.button 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    onClick={copyToClipboard}
                    className={`px-4 py-2 rounded-xl transition-all duration-300 flex items-center gap-2 text-xs font-bold ${
                      isCopied 
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.2)]' 
                        : 'bg-white/5 text-slate-300 hover:bg-white/10 border border-white/10'
                    }`}
                  >
                    {isCopied ? <CheckCircle2 size={16} /> : <Copy size={16} />}
                    {isCopied ? 'Tersalin ke Clipboard!' : 'Copy Semua'}
                  </motion.button>
                )}
              </AnimatePresence>
            </div>

            {/* Editor Content Area */}
            <div className="flex-1 overflow-y-auto p-10 lg:p-16 relative z-10 custom-scrollbar scroll-smooth bg-[#0D0F14]">
              {!output && !isGenerating ? (
                <div className="h-full flex flex-col items-center justify-center text-slate-500">
                  <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", delay: 0.2 }}
                    className="w-40 h-40 mb-8 rounded-[3rem] border border-white/5 flex items-center justify-center bg-white/5 shadow-[inset_0_0_50px_rgba(255,255,255,0.02)] relative overflow-hidden"
                  >
                    <Lightbulb size={64} strokeWidth={1} className="relative z-10 text-slate-400" />
                  </motion.div>
                  <h3 className="text-2xl font-light text-white mb-3">Kanvas Masih Kosong</h3>
                  <p className="text-base text-center max-w-md font-light leading-relaxed opacity-60">
                    Atur preferensi audiens Anda di panel sebelah kiri dan mulailah proses *brainstorming* magis.
                  </p>
                </div>
              ) : (
                <div className="max-w-4xl mx-auto font-sans">
                  <div className="prose prose-invert max-w-none prose-p:leading-loose prose-p:text-slate-300 prose-headings:font-bold prose-headings:text-white prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-a:text-emerald-400 marker:text-emerald-500 prose-strong:text-emerald-300 prose-ul:my-6 prose-li:my-3 prose-li:leading-relaxed text-slate-300 font-light text-base lg:text-lg whitespace-pre-wrap tracking-wide">
                    {output}
                    {isGenerating && (
                      <motion.span 
                        animate={{ opacity: [1, 0, 1] }} 
                        transition={{ repeat: Infinity, duration: 0.8 }}
                        className="inline-block w-3 h-5 bg-emerald-400 ml-2 translate-y-1 rounded-sm shadow-[0_0_10px_rgba(16,185,129,0.8)]"
                      />
                    )}
                  </div>
                  <div ref={outputEndRef} className="h-16" />
                </div>
              )}
            </div>
            
            {/* Ambient Output Glow (Bottom) */}
            {isGenerating && (
              <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-emerald-500/10 to-transparent pointer-events-none mix-blend-screen z-0 animate-pulse" />
            )}
          </div>
        </div>
      </motion.div>
    );
  };

  // Generic Placeholder Tool View
  const renderPlaceholderTool = () => {
    const currentToolData = CATEGORIES.flatMap(c => c.tools).find(t => t.id === activeTool);
    if (!currentToolData) return null;

    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="w-full h-full flex flex-col relative items-center justify-center p-8 text-center"
      >
        <button 
          onClick={() => setActiveTool(null)}
          className="absolute top-8 left-8 p-3 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 transition-all group flex items-center gap-3 backdrop-blur-xl border border-white/10"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-bold tracking-wide">Kembali ke Studio</span>
        </button>

        <div className={`p-8 rounded-[3rem] bg-gradient-to-br ${currentToolData.color} bg-opacity-10 backdrop-blur-3xl border border-white/10 shadow-2xl mb-8 group-hover:scale-105 transition-transform`}>
          <currentToolData.icon size={80} className="text-white drop-shadow-lg" />
        </div>
        
        <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">{currentToolData.name}</h2>
        <p className="text-xl text-slate-400 font-light max-w-2xl leading-relaxed mb-12">
          Fitur ini sedang dalam tahap *brainstorming* dan pengembangan. Kami merancang arsitektur AI khusus agar sesuai dengan kebutuhan Metland Cikarang. Nantikan segera!
        </p>

        <div className="px-6 py-3 rounded-full border border-white/10 bg-white/5 text-sm font-bold tracking-[0.2em] text-slate-500 uppercase">
          Coming Soon
        </div>
      </motion.div>
    );
  };

  return (
    <div className="relative flex h-[calc(100vh-6rem)] w-full rounded-[2.5rem] bg-[#030508] overflow-hidden backdrop-blur-3xl border border-white/5 shadow-[0_0_100px_rgba(0,0,0,0.5)] font-sans">
      
      {/* Background Ambience applied globally */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-20">
        <motion.div 
          animate={{ 
            rotate: [0, 90, 180, 270, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[20%] -left-[10%] w-[70vw] h-[70vw] rounded-full bg-emerald-500/10 mix-blend-screen blur-[120px]"
        />
        <motion.div 
          animate={{ 
            rotate: [360, 270, 180, 90, 0],
            scale: [1, 1.5, 1],
          }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-[20%] -right-[10%] w-[60vw] h-[60vw] rounded-full bg-indigo-500/10 mix-blend-screen blur-[120px]"
        />
      </div>

      <AnimatePresence mode="wait">
        {activeTool === null 
          ? <motion.div key="dashboard" className="w-full h-full relative z-10">{renderDashboard()}</motion.div> 
          : activeTool === 'content-ideas'
            ? <motion.div key="tool-ideas" className="w-full h-full relative z-10">{renderContentIdeasTool()}</motion.div>
            : <motion.div key="tool-placeholder" className="w-full h-full relative z-10">{renderPlaceholderTool()}</motion.div>
        }
      </AnimatePresence>
    </div>
  );
}
