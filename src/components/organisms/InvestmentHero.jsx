"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { TrendingUp, Activity, Map, ArrowRight, ArrowLeft } from "lucide-react";

export default function InvestmentHero() {
  const stats = [
    { value: "12-15%", label: "Potensi Capital Gain/Thn", icon: TrendingUp },
    { value: "> 4000", label: "Pekerja Ekspatriat & Eksekutif", icon: Activity },
    { value: "5-10 Menit", label: "Dari Stasiun KRL Metland", icon: Map },
  ];

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#060913] pt-20">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#060913]/40 via-[#060913]/80 to-[#060913] z-10" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-30 mix-blend-luminosity scale-105" />
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] z-0" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-emerald-600/20 rounded-full blur-[100px] z-0" />
      </div>

      <div className="container mx-auto px-6 relative z-20">
        {/* Back to Home Button */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8 flex justify-end pt-4 md:pt-8"
        >
          <Link href="/" className="inline-flex items-center text-sm font-semibold text-emerald-400 hover:text-white transition-colors group px-5 py-2.5 bg-[#060913]/50 backdrop-blur-md border border-white/10 rounded-full hover:bg-white/10 hover:border-white/30 shadow-lg">
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Kembali ke Beranda
          </Link>
        </motion.div>

        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 mb-8 backdrop-blur-md"
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm font-medium text-primary tracking-widest uppercase">The Next Big Hub in East Jakarta</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl md:text-7xl font-title font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-emerald-100 to-primary mb-6 leading-tight"
          >
            Investasi Cerdas, <br />
            <span className="text-white">Masa Depan Emas.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-text mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            Metland Cikarang memadukan kawasan residensial mewah dengan pusat komersial yang terintegrasi. Raih keuntungan maksimal di episentrum pertumbuhan baru koridor Timur Jakarta.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          >
            {stats.map((stat, idx) => (
              <div key={idx} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:border-primary/50 transition-colors group">
                <stat.icon className="w-8 h-8 text-primary mb-4 mx-auto group-hover:scale-110 transition-transform" />
                <h3 className="text-3xl font-title font-bold text-white mb-2">{stat.value}</h3>
                <p className="text-sm text-gray-text">{stat.label}</p>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <button 
              onClick={() => {
                document.getElementById('calculators')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-8 py-4 bg-gradient-to-r from-primary to-emerald-600 text-white rounded-full font-bold inline-flex items-center hover:scale-105 transition-transform shadow-emerald-glow"
            >
              Simulasikan Investasi Anda
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
