"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/organisms/Navbar";
import Footer from "@/components/organisms/Footer";
import { Leaf, Shield, Zap, Target } from "lucide-react";

const VALUES = [
  {
    icon: Leaf,
    title: "Eco-Smart Living",
    description: "Kawasan hunian yang memadukan teknologi cerdas dengan keberlanjutan alam."
  },
  {
    icon: Shield,
    title: "Premium Security",
    description: "Infrastruktur keamanan berlapis dan sistem pengawasan pintar 24/7."
  },
  {
    icon: Zap,
    title: "Integrated Ecosystem",
    description: "Akses instan ke fasilitas komersial, stasiun KRL, dan pusat hiburan keluarga."
  },
  {
    icon: Target,
    title: "Future Proof",
    description: "Dirancang untuk investasi jangka panjang dengan capital gain yang menjanjikan."
  }
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#020202] text-gray-200 selection:bg-emerald-500/30 font-sans overflow-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 px-4 sm:px-6 lg:px-8 container mx-auto">
        <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-emerald-500/10 rounded-full blur-[150px] pointer-events-none mix-blend-screen" />
        <div className="absolute top-1/2 left-0 w-[40vw] h-[40vw] bg-blue-500/10 rounded-full blur-[150px] pointer-events-none mix-blend-screen" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-white via-gray-200 to-gray-600 mb-6">
              Membangun Masa Depan, <br className="hidden md:block" />
              <span className="text-emerald-400">Menghubungkan Kehidupan.</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-400 font-light leading-relaxed max-w-2xl mx-auto">
              Metland Cikarang adalah perwujudan dari visi <span className="text-white font-medium">Smart Eco-City</span> yang revolusioner. Kami tidak hanya membangun rumah, tapi merancang ekosistem kehidupan yang terintegrasi.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Vision & Values Section */}
      <section className="py-20 relative z-10 border-t border-white/5 bg-[#0a0a0b]/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
          >
            <div>
              <h2 className="text-3xl md:text-4xl font-semibold text-white mb-6 tracking-tight">
                Standar Baru <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500">Hunian Premium Koridor Timur</span>
              </h2>
              <p className="text-gray-400 font-light leading-relaxed mb-8 text-lg">
                Sebagai pengembang terpercaya (Metropolitan Land Tbk), kami memahami bahwa generasi modern membutuhkan lebih dari sekadar atap. Mereka membutuhkan efisiensi, aksesibilitas, dan lingkungan yang mendukung produktivitas.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {VALUES.map((val, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1, duration: 0.5 }}
                    className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                  >
                    <val.icon className="w-8 h-8 text-emerald-400 mb-4" />
                    <h3 className="text-white font-medium mb-2">{val.title}</h3>
                    <p className="text-sm text-gray-500 font-light">{val.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="relative">
              {/* Abstract Glass Shape replacing image */}
              <div className="aspect-[4/5] rounded-[3rem] overflow-hidden relative bg-gradient-to-br from-[#111] to-[#0a0a0b] border border-white/10 shadow-2xl p-8 flex flex-col justify-end">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
                <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-emerald-500/30 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-700" />
                
                <div className="relative z-10 backdrop-blur-xl bg-black/40 border border-white/10 p-6 rounded-2xl">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center">
                      <Shield className="w-6 h-6 text-emerald-400" />
                    </div>
                    <div>
                      <h4 className="text-white font-medium">Dedikasi Kualitas</h4>
                      <p className="text-xs text-gray-400">Sejak 1994</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-300 font-light italic">
                    "Komitmen kami adalah menghadirkan ruang hidup yang menginspirasi setiap generasi untuk berkembang secara berkelanjutan."
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative z-10 text-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto bg-gradient-to-br from-emerald-900/40 to-blue-900/20 border border-white/10 rounded-[3rem] p-12 backdrop-blur-sm"
        >
          <h2 className="text-3xl font-semibold text-white mb-4">Jadilah Bagian dari Komunitas Cerdas</h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">
            Temukan hunian yang memahami gaya hidup Anda. Eksplorasi Metland Cikarang melalui sistem pintar kami hari ini.
          </p>
          <a href="/smi" className="inline-flex items-center justify-center px-8 py-4 text-sm font-semibold text-black bg-white rounded-full hover:bg-gray-200 transition-transform hover:scale-105 shadow-lg">
            Mulai Eksplorasi di SMI
          </a>
        </motion.div>
      </section>

      <Footer />
    </main>
  );
}
