"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Calculator, BrainCircuit, GraduationCap } from "lucide-react";

export default function HeroKPR() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden bg-[#020202]">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] bg-emerald-500/10 rounded-full blur-[150px] pointer-events-none mix-blend-screen" />
        <div className="absolute bottom-1/4 right-1/4 w-[30vw] h-[30vw] bg-blue-500/10 rounded-full blur-[150px] pointer-events-none mix-blend-screen" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8"
        >
          <GraduationCap className="w-5 h-5 text-emerald-400" />
          <span className="text-sm font-medium text-gray-300">SMMC Financial Education Platform</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-5xl md:text-7xl font-title font-bold text-white mb-6 tracking-tight leading-[1.1]"
        >
          Semua Tentang <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-600">KPR.</span>
          <br className="hidden md:block" /> Tidak Harus Rumit.
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg md:text-xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed"
        >
          Pelajari simulasi cicilan, strategi DP, istilah perbankan, hingga rekomendasi AI dalam satu tempat terpadu. Kami memadukan kalkulator akurat dengan edukasi agar Anda dapat mengambil keputusan finansial yang tepat.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button 
            onClick={() => document.getElementById('quick-simulation')?.scrollIntoView({ behavior: 'smooth' })}
            className="w-full sm:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-bold rounded-full border border-white/10 transition-all flex items-center justify-center gap-2 group"
          >
            <Calculator className="w-5 h-5" />
            Hitung Simulasi
          </button>
          
          <Link 
            href="/smi/kpr-advisor" 
            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-bold rounded-full transition-all hover:scale-105 shadow-[0_0_20px_rgba(16,185,129,0.3)] flex items-center justify-center gap-2 group"
          >
            <BrainCircuit className="w-5 h-5 text-yellow-300" />
            Smart KPR Advisor <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>

      {/* Decorative Bottom Gradient */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#020202] to-transparent z-10" />
    </section>
  );
}
