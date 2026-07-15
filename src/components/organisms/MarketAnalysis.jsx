"use client";

import { motion } from "framer-motion";
import { PieChart, BarChart3, TrendingUp, Building2, Users } from "lucide-react";

export default function MarketAnalysis() {
  const analysisData = [
    {
      title: "Kenaikan Nilai Properti",
      value: "8-12%",
      desc: "Rata-rata pertumbuhan nilai properti (Capital Gain) per tahun di koridor Timur Jakarta.",
      icon: TrendingUp,
      color: "text-emerald-400",
      bg: "bg-emerald-400/10"
    },
    {
      title: "Rental Yield Ruko",
      value: "6-9%",
      desc: "Potensi pendapatan sewa tahunan yang tinggi didorong oleh ribuan pekerja di kawasan industri.",
      icon: BarChart3,
      color: "text-blue-400",
      bg: "bg-blue-400/10"
    },
    {
      title: "Populasi Pekerja",
      value: "4000+",
      desc: "Ekspatriat dan eksekutif perusahaan multinasional yang membutuhkan hunian premium.",
      icon: Users,
      color: "text-purple-400",
      bg: "bg-purple-400/10"
    }
  ];

  return (
    <section className="py-24 bg-[#0a0f1a] relative border-t border-white/5">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-2 text-primary font-semibold tracking-wider uppercase mb-4"
          >
            <PieChart className="w-5 h-5" />
            <span>Market Analysis</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-title font-bold text-light-text mb-6"
          >
            Mengapa Metland Cikarang?
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-text max-w-2xl mx-auto text-lg"
          >
            Didukung oleh data makroekonomi dan pembangunan infrastruktur masif, Timur Jakarta kini menjadi primadona baru investasi properti dengan ROI tertinggi.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {analysisData.map((data, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + idx * 0.1 }}
              className="bg-dark-card border border-border p-8 rounded-2xl hover:border-primary/50 transition-all hover:-translate-y-2 group"
            >
              <div className={`w-14 h-14 rounded-xl ${data.bg} flex items-center justify-center mb-6`}>
                <data.icon className={`w-7 h-7 ${data.color}`} />
              </div>
              <h3 className={`text-4xl font-bold ${data.color} mb-3 font-title`}>{data.value}</h3>
              <h4 className="text-xl font-bold text-light-text mb-3">{data.title}</h4>
              <p className="text-gray-text text-sm leading-relaxed">{data.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Insight Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-emerald-900/40 to-[#0a0f1a] border border-emerald-500/20 rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between shadow-emerald-glow"
        >
          <div className="mb-6 md:mb-0 md:mr-8 flex-1">
            <h3 className="text-2xl font-bold text-white mb-3 flex items-center">
              <Building2 className="w-6 h-6 text-emerald-400 mr-3" />
              Potensi Sewa yang Terus Tumbuh
            </h3>
            <p className="text-gray-text leading-relaxed">
              Kawasan industri Cikarang merupakan yang terbesar di Asia Tenggara. Kehadiran ribuan pabrik multinasional menciptakan *captive market* (pasar pasti) untuk penyewaan Ruko maupun Rumah Tinggal bagi para pekerjanya.
            </p>
          </div>
          <div className="shrink-0">
            <div className="px-6 py-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 font-semibold group-hover:bg-emerald-500/20 group-hover:scale-105 transition-all cursor-default">
              Kawasan Industri MM2100, Jababeka & Sekitarnya
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
