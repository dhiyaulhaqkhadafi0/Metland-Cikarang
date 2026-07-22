"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Lightbulb, TrendingUp, Activity, Magnet, FileText, 
  Newspaper, Hash, Search, BookOpen, Image as ImageIcon, 
  Wand2, Calendar, RefreshCw, BarChart2, Rocket, 
  Sparkles, Copy, CheckCircle2, Bot, StopCircle, ArrowRight, ChevronRight
} from 'lucide-react';

const CATEGORIES = [
  {
    id: 'ideation',
    title: 'Ideation',
    icon: Lightbulb,
    tools: [
      { id: 'content-ideas', name: 'AI Content Ideas', icon: Lightbulb, desc: 'Find content ideas based on goals & audience' },
      { id: 'trend-hunter', name: 'AI Trend Hunter', icon: TrendingUp, desc: 'Discover property trends & adaptations' },
      { id: 'viral-analyzer', name: 'AI Viral Analyzer', icon: Activity, desc: 'Analyze why content goes viral' },
    ]
  },
  {
    id: 'writing',
    title: 'Content Writing',
    icon: FileText,
    tools: [
      { id: 'hook-gen', name: 'AI Hook Generator', icon: Magnet, desc: 'Generate 50 ready-to-use hooks' },
      { id: 'script-gen', name: 'AI Script Generator', icon: FileText, desc: 'Generate video scripts (TikTok, Reels)' },
      { id: 'news-writer', name: 'AI Property News', icon: Newspaper, desc: 'Turn news into educational content' },
      { id: 'hashtag-gen', name: 'AI Hashtag Gen', icon: Hash, desc: 'Generate relevant hashtags' },
      { id: 'seo-meta', name: 'AI SEO Meta', icon: Search, desc: 'Generate SEO meta data for web' },
    ]
  },
  {
    id: 'design',
    title: 'Content Design',
    icon: ImageIcon,
    tools: [
      { id: 'carousel-gen', name: 'AI Carousel Gen', icon: BookOpen, desc: 'Generate IG carousel content' },
      { id: 'thumbnail-maker', name: 'AI Thumbnail Maker', icon: ImageIcon, desc: 'Generate thumbnail layouts & prompts' },
      { id: 'image-prompt', name: 'AI Image Prompt', icon: Wand2, desc: 'Generate prompts for Midjourney/Flux' },
    ]
  },
  {
    id: 'publishing',
    title: 'Publishing',
    icon: Calendar,
    tools: [
      { id: 'content-calendar', name: 'AI Content Calendar', icon: Calendar, desc: 'Generate 30-90 days posting schedule' },
      { id: 'repurposer', name: 'AI Content Repurposer', icon: RefreshCw, desc: 'Turn 1 content into many formats' },
    ]
  },
  {
    id: 'optimization',
    title: 'Optimization',
    icon: BarChart2,
    tools: [
      { id: 'evaluator', name: 'AI Content Evaluator', icon: BarChart2, desc: 'Score & evaluate your content quality' },
    ]
  },
  {
    id: 'campaign',
    title: 'Campaign',
    icon: Rocket,
    tools: [
      { id: 'campaign-builder', name: 'AI Campaign Builder', icon: Rocket, desc: 'Build full marketing campaigns' },
    ]
  }
];

export default function ContentStudioClient() {
  const [activeTool, setActiveTool] = useState('content-ideas');
  
  // Form State
  const [cluster, setCluster] = useState('Semua Cluster Metland Cikarang');
  const [context, setContext] = useState('');
  
  // AI State
  const [isGenerating, setIsGenerating] = useState(false);
  const [output, setOutput] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  
  const abortControllerRef = useRef<AbortController | null>(null);
  const outputEndRef = useRef<HTMLDivElement>(null);

  const activeCategory = CATEGORIES.find(c => c.tools.some(t => t.id === activeTool));
  const currentToolData = activeCategory?.tools.find(t => t.id === activeTool);

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
      case 'script-gen':
        return `${base}\n\nTUGAS UTAMA: Buatkan 1 naskah video TikTok/Reels lengkap (durasi 45-60 detik) untuk properti ini. Pisahkan dalam kolom/format jelas antara [VISUAL / KAMERA] (apa yang ditampilkan di layar) dan [AUDIO / VOICEOVER] (apa yang diucapkan).`;
      case 'carousel-gen':
        return `${base}\n\nTUGAS UTAMA: Buatkan konsep konten Carousel Instagram/LinkedIn (5-7 slide). Tuliskan teks/headline tebal untuk setiap slide dan deskripsi visual gambar yang harus didesain oleh tim grafis.`;
      default:
        return `${base}\n\nTUGAS UTAMA: Hasilkan output luar biasa kreatif dan marketing-oriented berdasarkan tool yang dipilih dan konteks di atas. Gunakan formatting Markdown yang rapi.`;
    }
  };

  const handleGenerate = async () => {
    if (!currentToolData) return;
    
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
          context: 'smi'
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
          
          // Parse the X-Vercel-AI-Data-Stream format which uses `0:"text"\n`
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

  return (
    <div className="relative flex h-[calc(100vh-6rem)] w-full rounded-[2.5rem] bg-[#030712] overflow-hidden backdrop-blur-3xl border border-white/5 shadow-[0_0_100px_rgba(0,0,0,0.5)] font-sans">
      
      {/* Dynamic Animated Background - Liquid Aurora */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-[0.15]">
        <motion.div 
          animate={{ 
            rotate: [0, 90, 180, 270, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[20%] -left-[10%] w-[70vw] h-[70vw] rounded-full bg-emerald-500/20 mix-blend-screen blur-[120px]"
        />
        <motion.div 
          animate={{ 
            rotate: [360, 270, 180, 90, 0],
            scale: [1, 1.5, 1],
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-[20%] -right-[10%] w-[60vw] h-[60vw] rounded-full bg-indigo-500/20 mix-blend-screen blur-[120px]"
        />
      </div>

      {/* Floating Sidebar Container */}
      <div className="w-80 h-full p-4 relative z-10 flex flex-col">
        <div className="h-full bg-white/5 backdrop-blur-3xl border border-white/5 rounded-3xl overflow-hidden flex flex-col shadow-2xl relative">
          
          {/* Glass Header */}
          <div className="p-6 sticky top-0 bg-black/10 backdrop-blur-xl border-b border-white/5 z-20">
            <div className="flex items-center gap-3">
              <motion.div 
                initial={{ rotate: -90, scale: 0 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className="p-2.5 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-600 text-white shadow-[0_0_20px_rgba(16,185,129,0.3)]"
              >
                <Sparkles size={20} className="drop-shadow-md" />
              </motion.div>
              <div>
                <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">Content Studio</h2>
                <p className="text-[10px] text-emerald-400 font-bold tracking-[0.2em] uppercase mt-0.5 opacity-80">Metland AI Engine</p>
              </div>
            </div>
          </div>

          {/* Tools List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-8 hidden-scrollbar pb-10">
            {CATEGORIES.map((category, catIdx) => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: catIdx * 0.1 }}
                key={category.id}
              >
                <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4 px-3 flex items-center gap-2">
                  <category.icon size={12} className="opacity-70" />
                  {category.title}
                </h3>
                <div className="space-y-1.5 relative">
                  {category.tools.map((tool) => {
                    const isActive = activeTool === tool.id;
                    return (
                      <button
                        key={tool.id}
                        onClick={() => {
                          if (isGenerating) return; 
                          setActiveTool(tool.id); 
                          setOutput(''); 
                        }}
                        className={`w-full text-left px-4 py-3.5 rounded-2xl transition-all duration-300 relative group outline-none ${
                          isGenerating && !isActive ? 'opacity-30 cursor-not-allowed' : ''
                        }`}
                      >
                        {isActive && (
                          <motion.div
                            layoutId="activeToolBg"
                            className="absolute inset-0 bg-white/10 border border-white/10 rounded-2xl shadow-[0_0_20px_rgba(255,255,255,0.03)]"
                            initial={false}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                          />
                        )}
                        
                        <div className="relative z-10 flex items-center gap-3">
                          <div className={`p-2 rounded-xl transition-all duration-300 ${isActive ? 'bg-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.5)] scale-110' : 'bg-white/5 text-slate-400 group-hover:bg-white/10 group-hover:text-slate-200 group-hover:scale-105'}`}>
                            <tool.icon size={16} />
                          </div>
                          <div className="flex-1 truncate">
                            <div className={`text-sm font-semibold transition-colors ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'}`}>
                              {tool.name}
                            </div>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Workspace */}
      <div className="flex-1 flex flex-col h-full relative z-10 py-4 pr-4 pl-0">
        
        {/* Top Floating Header */}
        <div className="h-16 mb-4 bg-white/5 backdrop-blur-2xl border border-white/5 rounded-[2rem] flex items-center px-8 shadow-xl">
          <div className="flex items-center gap-3 text-slate-400 text-sm">
            <span className="font-medium tracking-widest uppercase text-[10px] opacity-70">{activeCategory?.title}</span>
            <ChevronRight size={14} className="opacity-40" />
            <motion.div 
              key={activeTool} 
              initial={{ opacity: 0, x: -10 }} 
              animate={{ opacity: 1, x: 0 }} 
              className="text-white font-bold flex items-center gap-2 text-sm"
            >
              {currentToolData?.icon && <currentToolData.icon size={16} className="text-emerald-400" />}
              {currentToolData?.name}
            </motion.div>
          </div>
        </div>

        {/* Content Area - Split Pane */}
        <div className="flex-1 flex gap-4 h-[calc(100%-5rem)]">
          
          {/* Input Panel */}
          <div className="w-[45%] h-full bg-white/5 backdrop-blur-2xl border border-white/5 rounded-[2rem] p-8 flex flex-col shadow-2xl relative overflow-hidden group">
            {/* Ambient inner glow */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none"></div>
            
            <motion.div 
              key={activeTool + "-desc"}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 relative z-10"
            >
              <h3 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white via-slate-200 to-slate-500 mb-3 tracking-tight">
                {currentToolData?.name}
              </h3>
              <p className="text-slate-400 font-light leading-relaxed text-sm">{currentToolData?.desc}</p>
            </motion.div>

            <div className="space-y-6 flex-1 relative z-10">
              <div className="space-y-3">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)]"></div>
                  Cluster / Produk Metland
                </label>
                <div className="relative group/select">
                  <select 
                    value={cluster}
                    onChange={(e) => setCluster(e.target.value)}
                    className="w-full bg-black/20 border border-white/10 rounded-2xl px-5 py-4 text-sm text-white focus:outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 transition-all appearance-none cursor-pointer backdrop-blur-md group-hover/select:bg-white/5"
                  >
                    <option>Semua Cluster Metland Cikarang</option>
                    <option>Cluster Avesa Garden</option>
                    <option>Cluster Lisse</option>
                    <option>Ruko Plaza de Cikarang</option>
                  </select>
                  <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 group-hover/select:text-white transition-colors">
                    <ChevronRight size={16} className="rotate-90" />
                  </div>
                </div>
              </div>
              
              <div className="space-y-3 flex-1 flex flex-col h-1/2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.8)]"></div>
                  Konteks / Arahan Kreatif (Opsional)
                </label>
                <textarea 
                  value={context}
                  onChange={(e) => setContext(e.target.value)}
                  placeholder="Ceritakan apa yang ada di pikiran Anda. Contoh: Buatkan ide untuk ibu muda yang cari rumah 3 kamar dengan cicilan murah..."
                  className="w-full flex-1 bg-black/20 hover:bg-white/5 border border-white/10 rounded-2xl p-5 text-sm text-white focus:outline-none focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 transition-all resize-none placeholder:text-slate-600 backdrop-blur-md font-light leading-relaxed hidden-scrollbar"
                />
              </div>
            </div>

            <div className="mt-8 relative z-10">
              <AnimatePresence mode="wait">
                {!isGenerating ? (
                  <motion.button 
                    key="generate-btn"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    onClick={handleGenerate}
                    className="w-full bg-gradient-to-r from-emerald-400 to-teal-500 hover:from-emerald-300 hover:to-teal-400 text-slate-900 rounded-2xl px-4 py-4 text-sm font-black tracking-wide transition-all shadow-[0_0_30px_rgba(16,185,129,0.3)] hover:shadow-[0_0_40px_rgba(16,185,129,0.5)] flex items-center justify-center gap-3 relative overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <Sparkles size={20} className="relative z-10" />
                    <span className="relative z-10">Mulai Generate AI</span>
                  </motion.button>
                ) : (
                  <motion.button 
                    key="stop-btn"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    onClick={stopGeneration}
                    className="w-full bg-red-500/10 border border-red-500/30 hover:bg-red-500/20 hover:border-red-500/50 text-red-400 rounded-2xl px-4 py-4 text-sm font-black tracking-wide transition-all shadow-[0_0_20px_rgba(239,68,68,0.1)] flex items-center justify-center gap-3"
                  >
                    <StopCircle size={20} />
                    <span>Hentikan AI</span>
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Output Panel */}
          <div className="w-[55%] h-full bg-black/40 backdrop-blur-3xl border border-white/5 rounded-[2rem] flex flex-col shadow-2xl overflow-hidden relative">
            
            {/* Terminal Header */}
            <div className="h-16 border-b border-white/5 flex items-center justify-between px-6 bg-white/5 backdrop-blur-md z-20">
              <div className="flex items-center gap-4">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                </div>
                <div className="w-px h-5 bg-white/10"></div>
                <span className="text-[10px] font-bold tracking-[0.2em] text-slate-400 flex items-center gap-2">
                  <Bot size={14} className={isGenerating ? 'text-emerald-400 animate-pulse' : ''} />
                  {isGenerating ? 'AI SEDANG MENGETIK...' : 'OUTPUT STUDIO'}
                </span>
              </div>
              
              <AnimatePresence>
                {output && (
                  <motion.button 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    onClick={copyToClipboard}
                    className={`px-3 py-1.5 rounded-xl transition-all duration-300 flex items-center gap-2 text-xs font-bold ${
                      isCopied 
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                        : 'bg-white/5 text-slate-300 hover:bg-white/10 border border-transparent'
                    }`}
                  >
                    {isCopied ? <CheckCircle2 size={14} /> : <Copy size={14} />}
                    {isCopied ? 'Tersalin!' : 'Copy Text'}
                  </motion.button>
                )}
              </AnimatePresence>
            </div>

            {/* Output Display */}
            <div className="flex-1 overflow-y-auto p-8 relative z-10 custom-scrollbar scroll-smooth">
              {!output && !isGenerating ? (
                <div className="h-full flex flex-col items-center justify-center text-slate-500 opacity-60">
                  <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", delay: 0.2 }}
                    className="w-32 h-32 mb-6 rounded-full border border-white/5 flex items-center justify-center bg-white/5 shadow-[inset_0_0_50px_rgba(255,255,255,0.02)] relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent opacity-50"></div>
                    <currentToolData.icon size={48} strokeWidth={1} className="relative z-10 text-slate-400" />
                  </motion.div>
                  <p className="text-sm text-center max-w-sm font-light leading-relaxed tracking-wide">
                    Pilih parameter di sebelah kiri lalu klik tombol <strong className="font-bold text-white tracking-normal">Generate</strong> untuk melihat keajaiban dari objektivitas AI Metland.
                  </p>
                </div>
              ) : (
                <div className="relative font-mono md:font-sans">
                  {/* Prose formatting for markdown-like display */}
                  <div className="prose prose-invert max-w-none prose-p:leading-loose prose-headings:font-bold prose-headings:text-white prose-a:text-emerald-400 marker:text-emerald-500 prose-strong:text-emerald-300 prose-ul:my-4 prose-li:my-2 text-slate-300 font-light text-[15px] whitespace-pre-wrap tracking-wide">
                    {output}
                    {isGenerating && (
                      <motion.span 
                        animate={{ opacity: [1, 0, 1] }} 
                        transition={{ repeat: Infinity, duration: 0.8 }}
                        className="inline-block w-2.5 h-4 bg-emerald-400 ml-1 translate-y-1 rounded-sm shadow-[0_0_10px_rgba(16,185,129,0.8)]"
                      />
                    )}
                  </div>
                  <div ref={outputEndRef} className="h-8" />
                </div>
              )}
            </div>

            {/* Ambient Output Glow */}
            {isGenerating && (
              <div className="absolute bottom-0 left-0 right-0 h-[30%] bg-gradient-to-t from-emerald-500/5 to-transparent pointer-events-none mix-blend-screen z-0 animate-pulse"></div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
