"use client";

import React from 'react';
import { Card } from '@/components/ui/Card';
import { 
  Bot, Sparkles, PenTool, LayoutTemplate, MessageSquare, 
  Presentation, Image as ImageIcon, Magnet, Target, 
  BrainCircuit, TrendingUp, UserCheck, Scale, ArrowRight, Zap
} from 'lucide-react';
import Link from 'next/link';

const aiFeatures = [
  {
    id: 'copywriter',
    title: 'AI Copywriter',
    description: 'Hasilkan teks promosi, broadcast WA, dan caption sosmed yang terbukti meningkatkan konversi penjualan.',
    icon: PenTool,
    color: 'from-emerald-400 to-teal-500',
    shadow: 'shadow-[0_0_15px_rgba(16,185,129,0.2)]'
  },
  {
    id: 'landing-page',
    title: 'AI Landing Page Builder',
    description: 'Buat landing page properti dengan struktur storytelling dan copywriting pemikat secara otomatis.',
    icon: LayoutTemplate,
    color: 'from-violet-400 to-indigo-500',
    shadow: 'shadow-[0_0_15px_rgba(139,92,246,0.2)]'
  },
  {
    id: 'follow-up',
    title: 'AI Follow Up',
    description: 'Asisten cerdas untuk membalas chat lead yang dingin menjadi hangat dengan pendekatan psikologis.',
    icon: MessageSquare,
    color: 'from-blue-400 to-cyan-500',
    shadow: 'shadow-[0_0_15px_rgba(59,130,246,0.2)]'
  },
  {
    id: 'sales-coach',
    title: 'AI Sales Coach',
    description: 'Pelatih virtual untuk meningkatkan teknik closing, menangani keberatan (objection), dan negosiasi.',
    icon: Presentation,
    color: 'from-amber-400 to-orange-500',
    shadow: 'shadow-[0_0_15px_rgba(245,158,11,0.2)]'
  },
  {
    id: 'content',
    title: 'AI Content Creation',
    description: 'Hasilkan ide video TikTok/Reels, naskah presentasi, dan konsep visual unit yang viral.',
    icon: ImageIcon,
    color: 'from-pink-400 to-rose-500',
    shadow: 'shadow-[0_0_15px_rgba(236,72,153,0.2)]'
  },
  {
    id: 'lead-magnet',
    title: 'AI Lead Magnet',
    description: 'Ciptakan brosur digital cerdas, kalkulator KPR, dan panduan beli rumah untuk memancing lead.',
    icon: Magnet,
    color: 'from-fuchsia-400 to-purple-500',
    shadow: 'shadow-[0_0_15px_rgba(217,70,239,0.2)]'
  },
  {
    id: 'ads-creative',
    title: 'AI Ads Creative',
    description: 'Rancang angle iklan Facebook, Instagram, dan TikTok yang memiliki CTR dan konversi tertinggi.',
    icon: Target,
    color: 'from-red-400 to-rose-600',
    shadow: 'shadow-[0_0_15px_rgba(244,63,94,0.2)]'
  },
  {
    id: 'consultant',
    title: 'AI Consultant Advisor',
    description: 'Dapatkan saran ahli terkait perhitungan pajak, legalitas, dan strategi investasi untuk klien Anda.',
    icon: BrainCircuit,
    color: 'from-teal-400 to-emerald-600',
    shadow: 'shadow-[0_0_15px_rgba(45,212,191,0.2)]'
  },
  {
    id: 'trend-insight',
    title: 'AI Trend Insight',
    description: 'Analisis tren pasar properti Cikarang, harga pesaing, dan minat pembeli secara real-time.',
    icon: TrendingUp,
    color: 'from-yellow-400 to-amber-600',
    shadow: 'shadow-[0_0_15px_rgba(250,204,21,0.2)]'
  },
  {
    id: 'icp',
    title: 'AI ICP',
    description: 'Bedah profil pembeli ideal (Ideal Customer Persona) berdasarkan cluster dan tipe unit spesifik.',
    icon: UserCheck,
    color: 'from-indigo-400 to-blue-600',
    shadow: 'shadow-[0_0_15px_rgba(129,140,248,0.2)]'
  },
  {
    id: 'legal',
    title: 'AI Legal Management',
    description: 'Asisten pintar untuk membuat draft SPPR, memahami klausul KPR, dan administrasi notaris.',
    icon: Scale,
    color: 'from-slate-300 to-slate-500',
    shadow: 'shadow-[0_0_15px_rgba(203,213,225,0.2)]'
  }
];

export default function SmiAgentClient() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-12">
      {/* Header Section */}
      <div className="relative overflow-hidden rounded-3xl p-8 lg:p-12 border border-white/10 bg-[#0B0F14] shadow-2xl">
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-96 h-96 bg-emerald-500/20 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-96 h-96 bg-indigo-500/20 rounded-full blur-[100px] pointer-events-none"></div>
        
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-emerald-400 text-sm font-semibold mb-6 shadow-lg shadow-emerald-500/10">
            <Sparkles size={16} className="animate-pulse" />
            <span className="tracking-wide uppercase">Metland AI Hub</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white via-slate-200 to-slate-500 tracking-tight mb-4">
            SMI Agent
          </h1>
          <p className="text-lg md:text-xl text-slate-300 font-medium mb-2">
            Sales Metland Intelligence
          </p>
          <p className="text-slate-400 leading-relaxed max-w-2xl">
            SMI Agent adalah asisten kecerdasan buatan super canggih yang dirancang eksklusif untuk Sales Metland Cikarang. Tingkatkan konversi penjualan, percepat workflow, dan tutup target Anda lebih cepat dengan dukungan 11 kapabilitas AI tingkat lanjut.
          </p>
        </div>
      </div>

      {/* Feature Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {aiFeatures.map((feature, index) => (
          <Link href={`/dashboard/smi-agent/${feature.id}`} key={feature.id} className="group h-full">
            <Card className="h-full p-6 border border-white/5 bg-[#0F141A]/80 backdrop-blur-sm hover:bg-[#131922] transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:border-white/10 relative overflow-hidden">
              
              {/* Hover gradient effect */}
              <div className={`absolute -inset-px bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500 rounded-xl`}></div>
              
              <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-start justify-between mb-5">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${feature.color} bg-opacity-10 backdrop-blur-md border border-white/10 ${feature.shadow} group-hover:scale-110 transition-transform duration-500`}>
                    <feature.icon className="text-white drop-shadow-md" size={24} />
                  </div>
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 -translate-x-2 group-hover:translate-x-0">
                    <ArrowRight size={16} className="text-slate-300" />
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-slate-100 mb-2 tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-400 transition-all">
                  {feature.title}
                </h3>
                
                <p className="text-sm text-slate-400 leading-relaxed flex-grow">
                  {feature.description}
                </p>

                <div className="mt-6 flex items-center gap-2 text-xs font-semibold text-emerald-500/70 group-hover:text-emerald-400 transition-colors">
                  <Zap size={14} />
                  <span>Powered by Metland AI</span>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
