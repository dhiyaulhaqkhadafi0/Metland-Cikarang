"use client";

import React, { useState } from 'react';
import { 
  Lightbulb, TrendingUp, Activity, Magnet, FileText, 
  Newspaper, Hash, Search, BookOpen, Image as ImageIcon, 
  Wand2, Calendar, RefreshCw, BarChart2, Rocket, 
  ChevronRight, Sparkles, Send, Copy, CheckCircle2
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
  const [isGenerating, setIsGenerating] = useState(false);
  const [output, setOutput] = useState<string | null>(null);

  const activeCategory = CATEGORIES.find(c => c.tools.some(t => t.id === activeTool));
  const currentToolData = activeCategory?.tools.find(t => t.id === activeTool);

  const handleGenerate = () => {
    setIsGenerating(true);
    // Simulate AI generation with AI Knowledge Layer
    setTimeout(() => {
      setIsGenerating(false);
      setOutput(`[Simulated Output for ${currentToolData?.name}]\n\nBerhasil menggunakan Metland AI Knowledge Layer.\nMenghasilkan konten yang disesuaikan dengan USP, promo, dan target audiens Metland Cikarang...`);
    }, 2000);
  };

  return (
    <div className="flex h-[calc(100vh-6rem)] bg-[#070A0E] rounded-[2rem] border border-white/5 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-500">
      
      {/* Sidebar */}
      <div className="w-80 bg-[#0B0F14] border-r border-white/5 flex flex-col h-full overflow-y-auto hidden-scrollbar relative z-10">
        <div className="p-6 sticky top-0 bg-[#0B0F14]/90 backdrop-blur-md z-20 border-b border-white/5">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Sparkles size={20} />
            </div>
            <h2 className="text-xl font-bold text-white">Content Studio</h2>
          </div>
          <p className="text-xs text-slate-400">One Workspace to Plan, Create & Optimize</p>
        </div>

        <div className="p-4 space-y-6">
          {CATEGORIES.map((category) => (
            <div key={category.id}>
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 px-2 flex items-center gap-2">
                <category.icon size={14} />
                {category.title}
              </h3>
              <div className="space-y-1">
                {category.tools.map((tool) => {
                  const isActive = activeTool === tool.id;
                  return (
                    <button
                      key={tool.id}
                      onClick={() => { setActiveTool(tool.id); setOutput(null); }}
                      className={`w-full text-left px-3 py-2.5 rounded-xl transition-all duration-300 flex items-center gap-3 ${
                        isActive 
                          ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400 border shadow-[0_0_15px_rgba(16,185,129,0.1)]' 
                          : 'text-slate-400 hover:bg-white/5 hover:text-slate-200 border border-transparent'
                      }`}
                    >
                      <tool.icon size={16} className={isActive ? 'text-emerald-400' : 'text-slate-500'} />
                      <div className="flex-1 truncate">
                        <div className={`text-sm font-medium ${isActive ? 'text-emerald-300' : 'text-slate-300'}`}>
                          {tool.name}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Workspace */}
      <div className="flex-1 flex flex-col h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-slate-900/40 via-[#070A0E] to-[#070A0E] relative overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none"></div>

        {/* Header */}
        <div className="h-20 border-b border-white/5 flex items-center px-8 bg-white/5 backdrop-blur-sm relative z-10">
          <div className="flex items-center gap-3 text-slate-400 text-sm">
            <span>{activeCategory?.title}</span>
            <ChevronRight size={14} />
            <span className="text-emerald-400 font-semibold flex items-center gap-2">
              {currentToolData?.icon && <currentToolData.icon size={16} />}
              {currentToolData?.name}
            </span>
          </div>
        </div>

        {/* Workspace Area */}
        <div className="flex-1 overflow-y-auto p-8 relative z-10 flex gap-8">
          
          {/* Input Panel */}
          <div className="w-1/2 flex flex-col gap-6">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-white mb-2">{currentToolData?.name}</h3>
                <p className="text-slate-400 text-sm">{currentToolData?.desc}</p>
              </div>

              {/* Dynamic Form Placeholder based on activeTool */}
              <div className="space-y-5">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Cluster / Produk Metland</label>
                  <select className="w-full bg-[#0B0F14] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all appearance-none">
                    <option>Semua Cluster Metland Cikarang</option>
                    <option>Cluster Avesa Garden</option>
                    <option>Cluster Lisse</option>
                    <option>Ruko Plaza de Cikarang</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Konteks Tambahan (Opsional)</label>
                  <textarea 
                    rows={4}
                    placeholder="Contoh: Fokuskan pada keluarga muda yang cari rumah pertama dengan cicilan 3 jutaan..."
                    className="w-full bg-[#0B0F14] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all resize-none placeholder:text-slate-600"
                  />
                </div>

                <div className="pt-2">
                  <button 
                    onClick={handleGenerate}
                    disabled={isGenerating}
                    className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white rounded-xl px-4 py-3.5 text-sm font-bold transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isGenerating ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <Sparkles size={18} />
                        Generate with AI
                      </>
                    )}
                  </button>
                  <p className="text-center text-[10px] text-slate-500 mt-3">Dilengkapi oleh Metland AI Knowledge Layer</p>
                </div>
              </div>
            </div>
          </div>

          {/* Output Panel */}
          <div className="w-1/2 flex flex-col h-full">
            <div className="bg-[#0B0F14] border border-white/10 rounded-2xl flex-1 flex flex-col overflow-hidden relative">
              {/* Output Header */}
              <div className="h-14 border-b border-white/5 flex items-center justify-between px-5 bg-white/5">
                <span className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                  <Activity size={16} className="text-emerald-400" />
                  AI Output
                </span>
                <button className="p-2 hover:bg-white/10 rounded-lg text-slate-400 hover:text-white transition-colors" title="Copy Result">
                  <Copy size={16} />
                </button>
              </div>

              {/* Output Content */}
              <div className="flex-1 p-6 overflow-y-auto">
                {!output && !isGenerating && (
                  <div className="h-full flex flex-col items-center justify-center text-slate-500 space-y-4 opacity-50">
                    <currentToolData.icon size={48} strokeWidth={1} />
                    <p className="text-sm text-center max-w-xs">Isi form di samping dan klik Generate untuk melihat hasil ajaib dari AI Content Studio.</p>
                  </div>
                )}

                {isGenerating && (
                  <div className="h-full flex flex-col items-center justify-center text-emerald-400 space-y-4">
                    <div className="w-10 h-10 border-2 border-emerald-500/30 border-t-emerald-400 rounded-full animate-spin" />
                    <p className="text-sm animate-pulse">Menghubungkan ke Metland Knowledge Layer...</p>
                  </div>
                )}

                {output && !isGenerating && (
                  <div className="text-slate-300 text-sm whitespace-pre-wrap leading-relaxed animate-in fade-in slide-in-from-bottom-2">
                    {output}
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
