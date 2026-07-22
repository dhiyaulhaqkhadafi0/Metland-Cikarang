"use client";

import React from 'react';
import { 
  Cpu, PenTool, LayoutTemplate, MessageSquare, 
  Presentation, Image as ImageIcon, Magnet, Target, 
  BrainCircuit, TrendingUp, UserCheck, Scale, ArrowRight, Network
} from 'lucide-react';
import Link from 'next/link';

const aiFeatures = [
  {
    id: 'copywriter',
    title: 'AI Copywriter',
    description: 'Hasilkan teks promosi, broadcast WA, dan caption sosmed yang terbukti meningkatkan konversi penjualan.',
    icon: PenTool,
    color: 'from-emerald-400 via-teal-400 to-cyan-500',
    shadow: 'shadow-[0_0_20px_rgba(16,185,129,0.3)]'
  },
  {
    id: 'funnel-builder',
    title: 'AI Funnel Builder',
    description: 'Bukan sekadar Landing Page. Rancang funnel otomatis dari Meta Ads hingga Closing dengan struktur konversi tinggi.',
    icon: LayoutTemplate,
    color: 'from-violet-400 via-purple-400 to-fuchsia-500',
    shadow: 'shadow-[0_0_20px_rgba(139,92,246,0.3)]'
  },
  {
    id: 'follow-up',
    title: 'AI Follow Up',
    description: 'Asisten cerdas untuk membalas chat lead yang dingin menjadi hangat dengan pendekatan psikologis.',
    icon: MessageSquare,
    color: 'from-blue-400 via-sky-400 to-cyan-500',
    shadow: 'shadow-[0_0_20px_rgba(59,130,246,0.3)]'
  },
  {
    id: 'sales-coach',
    title: 'AI Sales Coach',
    description: 'Pelatih virtual untuk meningkatkan teknik closing, menangani keberatan (objection), dan negosiasi.',
    icon: Presentation,
    color: 'from-amber-400 via-orange-400 to-rose-400',
    shadow: 'shadow-[0_0_20px_rgba(245,158,11,0.3)]'
  },
  {
    id: 'content',
    title: 'AI Content Creation',
    description: 'Hasilkan ide video TikTok/Reels, naskah presentasi, dan konsep visual unit yang viral.',
    icon: ImageIcon,
    color: 'from-pink-400 via-rose-400 to-red-500',
    shadow: 'shadow-[0_0_20px_rgba(236,72,153,0.3)]'
  },
  {
    id: 'lead-magnet',
    title: 'AI Lead Magnet',
    description: 'Ciptakan brosur digital cerdas, kalkulator KPR, dan panduan beli rumah untuk memancing lead.',
    icon: Magnet,
    color: 'from-fuchsia-400 via-pink-400 to-rose-400',
    shadow: 'shadow-[0_0_20px_rgba(217,70,239,0.3)]'
  },
  {
    id: 'ads-creative',
    title: 'AI Ads Creative',
    description: 'Rancang angle iklan Facebook, Instagram, dan TikTok yang memiliki CTR dan konversi tertinggi.',
    icon: Target,
    color: 'from-red-400 via-rose-500 to-orange-500',
    shadow: 'shadow-[0_0_20px_rgba(244,63,94,0.3)]'
  },
  {
    id: 'consultant',
    title: 'AI Consultant Advisor',
    description: 'Dapatkan saran ahli terkait perhitungan pajak, legalitas, dan strategi investasi untuk klien Anda.',
    icon: BrainCircuit,
    color: 'from-teal-400 via-emerald-400 to-green-500',
    shadow: 'shadow-[0_0_20px_rgba(45,212,191,0.3)]'
  },
  {
    id: 'trend-insight',
    title: 'AI Trend Insight',
    description: 'Analisis tren pasar properti Cikarang, harga pesaing, dan minat pembeli secara real-time.',
    icon: TrendingUp,
    color: 'from-yellow-400 via-amber-400 to-orange-500',
    shadow: 'shadow-[0_0_20px_rgba(250,204,21,0.3)]'
  },
  {
    id: 'icp',
    title: 'AI ICP',
    description: 'Bedah profil pembeli ideal (Ideal Customer Persona) berdasarkan cluster dan tipe unit spesifik.',
    icon: UserCheck,
    color: 'from-indigo-400 via-blue-500 to-sky-400',
    shadow: 'shadow-[0_0_20px_rgba(99,102,241,0.3)]'
  },
  {
    id: 'legal',
    title: 'AI Legal Management',
    description: 'Asisten pintar untuk membuat draft SPPR, memahami klausul KPR, dan administrasi notaris.',
    icon: Scale,
    color: 'from-slate-300 via-slate-400 to-zinc-500',
    shadow: 'shadow-[0_0_20px_rgba(148,163,184,0.3)]'
  }
];

export default function SmiAgentClient() {
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-16 relative">
      {/* Dynamic Background Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none -z-20"></div>

      {/* Hero Section */}
      <div className="relative rounded-[2.5rem] p-10 lg:p-16 bg-[#070A0E] border border-white/5 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] overflow-hidden group">
        {/* Core Glowing Orbs */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[120px] mix-blend-screen -translate-y-1/2 translate-x-1/3 group-hover:bg-emerald-500/20 transition-colors duration-1000 ease-out pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-indigo-500/10 rounded-full blur-[150px] mix-blend-screen translate-y-1/3 -translate-x-1/4 group-hover:bg-indigo-500/20 transition-colors duration-1000 ease-out pointer-events-none"></div>
        
        {/* Neural Network Abstract Art (CSS based) */}
        <div className="absolute right-10 top-1/2 -translate-y-1/2 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-1000 pointer-events-none hidden lg:block">
          <Network size={400} className="text-emerald-500 drop-shadow-[0_0_30px_rgba(16,185,129,0.8)]" strokeWidth={0.5} />
        </div>

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8 shadow-[0_0_20px_rgba(16,185,129,0.05)] hover:shadow-[0_0_30px_rgba(16,185,129,0.2)] hover:border-emerald-500/30 transition-all duration-500 cursor-default">
            <Cpu size={18} className="text-emerald-400" />
            <span className="text-emerald-300 text-xs font-bold tracking-widest uppercase">Powered by Metland AI Engine</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white via-slate-100 to-slate-500 tracking-tighter mb-6 leading-tight drop-shadow-sm">
            SMI Agent
          </h1>
          <p className="text-xl md:text-2xl text-emerald-400 font-semibold mb-4 tracking-wide">
            Sales Metland Intelligence
          </p>
          <p className="text-slate-400 text-lg md:text-xl leading-relaxed max-w-2xl font-light">
            Platform kecerdasan buatan super canggih yang dirancang eksklusif untuk <strong className="text-slate-200 font-semibold">Sales Metland Cikarang</strong>. Otomatisasi workflow, tingkatkan interaksi lead, dan tutup target penjualan Anda lebih cepat.
          </p>
        </div>
      </div>

      {/* Feature Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 relative z-10">
        {aiFeatures.map((feature, index) => (
          <Link href={`/dashboard/smi-agent/${feature.id}`} key={feature.id} className="group h-full outline-none">
            {/* Outer Wrapper for Gradient Border Effect */}
            <div className="relative h-full rounded-[2rem] p-[1px] bg-gradient-to-br from-white/10 via-white/5 to-white/0 hover:from-white/20 hover:via-white/10 hover:to-white/5 transition-all duration-700 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)]">
              
              {/* Massive Ambient Glow on Hover */}
              <div className={`absolute -inset-4 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-15 blur-2xl transition-opacity duration-700 rounded-[3rem] -z-10`}></div>
              
              {/* Inner Card Content */}
              <div className="h-full rounded-[31px] p-8 lg:p-10 bg-gradient-to-br from-[#0B0F14] to-[#0D1219] backdrop-blur-xl border-0 relative overflow-hidden flex flex-col">
                
                {/* Top Right Artistic Sweep */}
                <div className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl ${feature.color} opacity-[0.03] group-hover:opacity-10 rounded-bl-full transition-all duration-700 group-hover:scale-110 origin-top-right pointer-events-none`}></div>

                <div className="flex items-start justify-between mb-8 relative z-10">
                  <div className={`p-4 rounded-2xl bg-gradient-to-br ${feature.color} bg-opacity-10 backdrop-blur-md border border-white/10 ${feature.shadow} group-hover:scale-110 group-hover:rotate-[3deg] transition-all duration-500 ease-out`}>
                    <feature.icon className="text-white drop-shadow-md" size={32} />
                  </div>
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-6 group-hover:translate-x-0 border border-white/10 group-hover:border-white/20 group-hover:bg-white/10">
                    <ArrowRight size={20} className="text-white" />
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-slate-100 mb-4 tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-300 transition-all relative z-10">
                  {feature.title}
                </h3>
                
                <p className="text-slate-400 text-[15px] leading-relaxed flex-grow font-light relative z-10 group-hover:text-slate-300 transition-colors">
                  {feature.description}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
