"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp, Home } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/organisms/Navbar";
import Footer from "@/components/organisms/Footer";
import InteractiveMasterplan from "@/components/explore/InteractiveMasterplan";
import DevelopmentTimeline from "@/components/explore/DevelopmentTimeline";
import AreaGrowth from "@/components/explore/AreaGrowth";
import HistorySection from "@/components/explore/HistorySection";

export default function ExplorePage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <main className="min-h-screen bg-[#020202] text-gray-200 flex flex-col font-sans selection:bg-emerald-500/30 selection:text-emerald-200 overflow-x-hidden">
      <Navbar />

      {/* History & Concept Narrative */}
      <HistorySection />

      {/* Hero Section: Masterplan + Lifestyle Explorer */}
      <section className="relative py-12 sm:py-20 min-h-screen flex items-center">
        <div className="absolute top-1/4 right-1/4 w-[40vw] h-[40vw] bg-emerald-500/10 rounded-full blur-[150px] pointer-events-none mix-blend-screen" />
        <div className="absolute bottom-1/4 left-1/4 w-[30vw] h-[30vw] bg-blue-500/10 rounded-full blur-[150px] pointer-events-none mix-blend-screen" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <InteractiveMasterplan />
        </div>
      </section>

      {/* Timeline Section */}
      <section className="relative py-24 bg-gradient-to-b from-[#020202] via-[#0a0a0b] to-[#020202]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <DevelopmentTimeline />
        </div>
      </section>

      {/* Area Growth / Investment Potential */}
      <section className="relative py-20 bg-[#0a0a0b] border-t border-white/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <AreaGrowth />
        </div>
      </section>

      {/* Conclusion & Soft Selling CTA */}
      <section className="relative py-24 overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0b] to-[#020202] z-0" />
        <div className="absolute left-1/2 bottom-0 -translate-x-1/2 w-full max-w-4xl h-[500px] bg-emerald-500/10 blur-[150px] pointer-events-none rounded-full" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center max-w-4xl">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 tracking-tight">
            Masa Depan Anda <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-600">Dimulai Hari Ini</span>
          </h2>
          <p className="text-gray-300 text-lg md:text-xl leading-relaxed mb-10">
            Metland Cikarang bukanlah sekadar tempat tinggal; ini adalah ekosistem yang terus bertumbuh. Dengan deretan infrastruktur masif yang akan rampung dalam beberapa tahun ke depan, nilai investasi properti Anda diproyeksikan akan terus melesat naik.
            <br className="hidden md:block" />
            <br className="hidden md:block" />
            <i>Jangan tunggu infrastruktur jadi untuk membeli, tapi belilah sebelum infrastruktur tersebut jadi.</i>
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/#best-cluster" className="px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-full transition-all hover:scale-105 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
              Amankan Unit Sekarang
            </Link>
            <Link href="https://wa.me/6281946838791" target="_blank" className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-bold rounded-full border border-white/10 transition-all">
              Hubungi Konsultan Kami
            </Link>
          </div>
        </div>
      </section>

      <Footer />

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="p-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full shadow-[0_0_15px_rgba(16,185,129,0.5)] transition-all hover:scale-110 group flex items-center justify-center"
          title="Ke Atas"
        >
          <ArrowUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
        </button>
      </div>

      {/* Back to Home Button (Top Right) */}
      <Link 
        href="/" 
        className="absolute top-24 right-4 sm:right-8 md:right-12 z-40 px-4 py-2 bg-black/50 backdrop-blur-md border border-white/10 hover:border-emerald-500/50 text-white text-sm font-bold rounded-full transition-all flex items-center gap-2"
      >
        <Home className="w-4 h-4" /> <span className="hidden sm:inline">Kembali ke Beranda</span>
      </Link>
    </main>
  );
}
