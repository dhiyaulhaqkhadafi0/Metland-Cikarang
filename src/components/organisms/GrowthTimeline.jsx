"use client";

import { motion } from "framer-motion";
import { Milestone, CheckCircle2, CircleDashed } from "lucide-react";

export default function GrowthTimeline() {
  const timelineData = [
    {
      year: "2023",
      title: "Pengembangan Avesa Garden",
      desc: "Peluncuran sub-cluster perdana Myna & Mavis di Avesa Garden yang mendapatkan respon luar biasa dari para investor dan end-user.",
      status: "completed"
    },
    {
      year: "2024",
      title: "Ekspansi Avesa & Komersial",
      desc: "Peluncuran sub-cluster Canary & Derora, serta hadirnya pusat komersial unggulan Ruko Easton & Weston Gateway.",
      status: "completed"
    },
    {
      year: "2025",
      title: "Awal Pengembangan Brassia",
      desc: "Ekspansi kawasan berlanjut dengan peluncuran sub-cluster Ellyra di cluster premium terbaru, Brassia.",
      status: "completed"
    },
    {
      year: "2026 & Future",
      title: "Peluncuran Myzora & Integrasi",
      desc: "Peluncuran eksklusif sub-cluster Myzora (Brassia) dan peningkatan masif fasilitas kawasan menuju konsep kota mandiri terpadu.",
      status: "progress"
    }
  ];

  return (
    <section className="py-24 bg-[#060913] relative overflow-hidden">
      {/* Abstract bg */}
      <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent z-0 hidden md:block" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-2 text-primary font-semibold tracking-wider uppercase mb-4"
          >
            <Milestone className="w-5 h-5" />
            <span>Growth Timeline</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-title font-bold text-light-text mb-6"
          >
            Jejak Rekam & Visi Masa Depan
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-text max-w-2xl mx-auto text-lg"
          >
            Sebagai pengembang terpercaya, Metland berkomitmen membangun kawasan secara progresif. Investasi Anda akan tumbuh seiring berjalannya waktu.
          </motion.p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Vertical line for mobile */}
          <div className="absolute left-[27px] top-0 bottom-0 w-[2px] bg-white/10 md:hidden" />
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-4 relative">
            {timelineData.map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + idx * 0.1 }}
                className="relative flex md:flex-col items-start md:items-center text-left md:text-center group p-6 rounded-2xl transition-all duration-300 hover:bg-white/5 hover:shadow-2xl hover:scale-105 border border-transparent hover:border-white/10"
              >
                {/* Connector Line (Desktop) - adjusted for padding */}
                {idx !== timelineData.length - 1 && (
                  <div className="hidden md:block absolute top-[51px] left-[50%] w-[120%] h-[2px] bg-gradient-to-r from-primary/50 to-white/10 z-0" />
                )}

                {/* Node */}
                <div className="relative z-10 shrink-0 mr-6 md:mr-0 md:mb-6">
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center border-4 border-[#060913] transition-transform duration-500 group-hover:scale-125
                    ${item.status === 'completed' ? 'bg-primary text-white shadow-emerald-glow group-hover:shadow-[0_0_30px_rgba(16,185,129,0.5)]' : 
                      item.status === 'progress' ? 'bg-emerald-600/20 text-emerald-400 border-emerald-500/30 group-hover:bg-emerald-500/30' : 
                      'bg-white/5 text-gray-text border-white/10 group-hover:bg-white/10 group-hover:text-white'}`}
                  >
                    {item.status === 'completed' ? <CheckCircle2 className="w-6 h-6" /> : <CircleDashed className="w-6 h-6 animate-spin-slow" />}
                  </div>
                </div>

                {/* Content */}
                <div>
                  <div className={`text-xl font-bold font-title mb-1 transition-colors ${item.status === 'completed' ? 'text-primary' : 'text-white'}`}>
                    {item.year}
                  </div>
                  <h4 className="text-lg font-bold text-light-text mb-3 group-hover:text-white transition-colors">{item.title}</h4>
                  <p className="text-sm text-gray-text leading-relaxed group-hover:text-gray-300 transition-colors">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
