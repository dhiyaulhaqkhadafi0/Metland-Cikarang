"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/organisms/Navbar";
import Footer from "@/components/organisms/Footer";
import { Sparkles, Bot, LineChart, Code } from "lucide-react";

const RELEASES = [
  {
    version: "v1.1",
    date: "15 Juli 2026",
    title: "Smart Legal Explainer & UI Premium",
    icon: Sparkles,
    color: "emerald",
    features: [
      "Penambahan fitur Smart Legal Explainer di SMI Hub.",
      "Kalkulator estimasi biaya BPHTB, AJB, dan Balik Nama otomatis.",
      "Timeline tahapan legal pembelian properti.",
      "Peningkatan UI/UX: Ambient glows, grid background, dan animasi breathing pada elemen SMI.",
      "Input chat ala Google AI Studio dengan ring gradien."
    ]
  },
  {
    version: "v1.0",
    date: "10 Juli 2026",
    title: "SMI Core & KPR Advisor",
    icon: Bot,
    color: "blue",
    features: [
      "Peluncuran Smart Metland Intelligence (SMI) Dashboard.",
      "Smart AI Consultant dengan persistensi chat (sessionStorage).",
      "Fitur Smart KPR Advisor untuk analisis finansial.",
      "Upload dokumen dan dukungan Google Drive."
    ]
  },
  {
    version: "v0.5",
    date: "01 Juli 2026",
    title: "Smart Comparison",
    icon: LineChart,
    color: "purple",
    features: [
      "Fitur komparasi multi-properti.",
      "Analisis ROI dan perbandingan skema cicilan.",
      "Visualisasi data radar chart untuk fasilitas."
    ]
  },
  {
    version: "v0.1",
    date: "15 Juni 2026",
    title: "Initial Alpha Release",
    icon: Code,
    color: "gray",
    features: [
      "Fondasi awal sistem Metland Cikarang App.",
      "Implementasi Next.js 16 dan Tailwind CSS.",
      "Setup komponen dasar UI dan arsitektur rute."
    ]
  }
];

export default function ChangelogPage() {
  return (
    <main className="min-h-screen bg-[#020202] text-gray-200 selection:bg-emerald-500/30 font-sans">
      <Navbar />

      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 px-4 sm:px-6 lg:px-8 container mx-auto max-w-4xl">
        <div className="absolute top-1/4 right-1/4 w-[40vw] h-[40vw] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
        <div className="absolute bottom-1/4 left-1/4 w-[30vw] h-[30vw] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />

        <div className="text-center mb-16 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
              Fitur <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500">Log</span>
            </h1>
            <p className="text-gray-400 font-light text-lg">
              Riwayat pembaruan dan rilis fitur terbaru di ekosistem Metland Cikarang.
            </p>
          </motion.div>
        </div>

        <div className="relative z-10">
          {/* Vertical Line */}
          <div className="absolute left-[27px] md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent transform md:-translate-x-1/2" />

          <div className="space-y-12">
            {RELEASES.map((release, idx) => (
              <motion.div 
                key={release.version}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className={`relative flex flex-col md:flex-row items-start ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
              >
                {/* Timeline Node */}
                <div className="absolute left-[27px] md:left-1/2 top-0 md:top-6 transform -translate-x-1/2 flex flex-col items-center z-20">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center bg-[#0a0a0b] border border-white/10 shadow-[0_0_20px_rgba(0,0,0,0.5)]`}>
                    <div className={`absolute inset-0 bg-${release.color}-500/20 rounded-2xl blur-md`} />
                    <release.icon className={`w-6 h-6 text-${release.color}-400 relative z-10`} />
                  </div>
                </div>

                {/* Content Card */}
                <div className={`ml-20 md:ml-0 md:w-1/2 ${idx % 2 === 0 ? 'md:pl-16' : 'md:pr-16'} pt-2 md:pt-4`}>
                  <div className="group bg-[#0a0a0b]/80 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8 hover:bg-[#111]/80 hover:border-white/10 transition-colors shadow-2xl relative overflow-hidden">
                    <div className={`absolute top-0 ${idx % 2 === 0 ? 'right-0' : 'left-0'} w-32 h-32 bg-${release.color}-500/10 rounded-full blur-[50px] pointer-events-none`} />
                    
                    <div className="flex items-center gap-3 mb-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold bg-${release.color}-500/10 text-${release.color}-400 border border-${release.color}-500/20`}>
                        {release.version}
                      </span>
                      <span className="text-sm text-gray-500 font-light">{release.date}</span>
                    </div>

                    <h3 className="text-2xl font-semibold text-white mb-6 tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-all">
                      {release.title}
                    </h3>

                    <ul className="space-y-3">
                      {release.features.map((feature, i) => (
                        <li key={i} className="flex items-start text-sm text-gray-400 font-light leading-relaxed">
                          <span className={`w-1.5 h-1.5 rounded-full bg-${release.color}-500 mt-2 mr-3 flex-shrink-0 shadow-[0_0_8px_rgba(16,185,129,0.5)]`} />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
