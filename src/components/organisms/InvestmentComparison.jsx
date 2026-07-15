"use client";

import { motion } from "framer-motion";
import { Scale, CheckCircle2, Minus, XCircle } from "lucide-react";

export default function InvestmentComparison() {
  const comparisonData = [
    {
      factor: "Potensi Capital Gain",
      metland: { value: "Tinggi (12-15%)", desc: "Didorong infrastruktur masif", icon: CheckCircle2, color: "text-emerald-400" },
      kompetitor: { value: "Sedang (5-8%)", desc: "Area sudah mature/stagnan", icon: Minus, color: "text-gray-400" },
      deposito: { value: "Rendah (3-5%)", desc: "Dipengaruhi suku bunga", icon: Minus, color: "text-gray-400" },
      saham: { value: "Sangat Tinggi", desc: "Sangat fluktuatif", icon: CheckCircle2, color: "text-emerald-400" }
    },
    {
      factor: "Integrasi Transportasi",
      metland: { value: "Stasiun KRL di Dalam", desc: "Akses komuter 0 menit", icon: CheckCircle2, color: "text-emerald-400" },
      kompetitor: { value: "Berjarak 5-15km", desc: "Harus transit/kendaraan", icon: Minus, color: "text-gray-400" },
      deposito: { value: "-", desc: "Tidak Relevan", icon: Minus, color: "text-gray-400" },
      saham: { value: "-", desc: "Tidak Relevan", icon: Minus, color: "text-gray-400" }
    },
    {
      factor: "Harga Per Meter",
      metland: { value: "Sangat Rasional", desc: "Ruang tumbuh masih besar", icon: CheckCircle2, color: "text-emerald-400" },
      kompetitor: { value: "Sudah Overpriced", desc: "Margin gain kecil", icon: XCircle, color: "text-red-400" },
      deposito: { value: "-", desc: "Tidak Relevan", icon: Minus, color: "text-gray-400" },
      saham: { value: "-", desc: "Tidak Relevan", icon: Minus, color: "text-gray-400" }
    },
    {
      factor: "Tingkat Risiko",
      metland: { value: "Rendah", desc: "Aset nyata (Real Estate)", icon: CheckCircle2, color: "text-emerald-400" },
      kompetitor: { value: "Rendah", desc: "Aset nyata", icon: CheckCircle2, color: "text-emerald-400" },
      deposito: { value: "Sangat Rendah", desc: "Dijamin LPS", icon: CheckCircle2, color: "text-emerald-400" },
      saham: { value: "Sangat Tinggi", desc: "Risiko capital loss", icon: XCircle, color: "text-red-400" }
    },
    {
      factor: "Passive Income (Sewa)",
      metland: { value: "Sangat Menjanjikan", desc: "Dekat MM2100 & Stasiun", icon: CheckCircle2, color: "text-emerald-400" },
      kompetitor: { value: "Sedang", desc: "Persaingan sangat padat", icon: Minus, color: "text-gray-400" },
      deposito: { value: "Ya (Bunga)", desc: "Tergerus inflasi", icon: Minus, color: "text-gray-400" },
      saham: { value: "Ya (Dividen)", desc: "Tidak pasti tiap tahun", icon: Minus, color: "text-gray-400" }
    }
  ];

  return (
    <section className="py-24 bg-[#0a0f1a] relative border-t border-border">
      <div className="container mx-auto px-6 relative z-10 max-w-[1200px]">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-2 text-primary font-semibold tracking-wider uppercase mb-4"
          >
            <Scale className="w-5 h-5" />
            <span>Perbandingan Investasi</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-title font-bold text-light-text mb-6"
          >
            Kenapa Metland Cikarang Lebih Ideal?
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-text max-w-3xl mx-auto text-lg"
          >
            Kami membuktikan bahwa memiliki properti di kawasan yang sedang bertumbuh (*sunrise property*) jauh lebih menguntungkan dibandingkan berinvestasi di kawasan yang sudah stagnan atau menggunakan instrumen konvensional.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="overflow-x-auto pb-4"
        >
          <div className="min-w-[1000px] bg-dark-card border border-border rounded-2xl overflow-hidden shadow-2xl">
            {/* Table Header */}
            <div className="grid grid-cols-5 bg-[#060913] border-b border-border p-6 text-sm md:text-base font-bold text-light-text text-center">
              <div className="text-left text-gray-text uppercase tracking-wider">Indikator</div>
              <div className="text-primary text-lg">Metland Cikarang</div>
              <div>Kompetitor Sekitar</div>
              <div>Deposito</div>
              <div>Saham</div>
            </div>
            
            {/* Table Body */}
            <div className="divide-y divide-white/5">
              {comparisonData.map((row, idx) => (
                <div key={idx} className="grid grid-cols-5 p-4 md:p-6 items-center text-center hover:bg-white/5 transition-colors group">
                  <div className="text-left font-bold text-light-text">{row.factor}</div>
                  
                  {/* Metland Column (Highlighted) */}
                  <div className="flex flex-col items-center justify-center p-4 bg-primary/10 rounded-xl border border-primary/20 group-hover:scale-105 transition-transform">
                    <row.metland.icon className={`w-6 h-6 mb-2 ${row.metland.color}`} />
                    <span className={`text-sm font-bold ${row.metland.color}`}>{row.metland.value}</span>
                    <span className="text-xs text-emerald-400/70 mt-1">{row.metland.desc}</span>
                  </div>

                  {/* Kompetitor Column */}
                  <div className="flex flex-col items-center justify-center p-4 group-hover:bg-white/5 rounded-xl transition-colors">
                    <row.kompetitor.icon className={`w-5 h-5 mb-2 ${row.kompetitor.color}`} />
                    <span className="text-sm text-gray-text font-semibold">{row.kompetitor.value}</span>
                    <span className="text-xs text-gray-500 mt-1">{row.kompetitor.desc}</span>
                  </div>

                  {/* Deposito Column */}
                  <div className="flex flex-col items-center justify-center p-4 group-hover:bg-white/5 rounded-xl transition-colors">
                    <row.deposito.icon className={`w-5 h-5 mb-2 ${row.deposito.color}`} />
                    <span className="text-sm text-gray-text">{row.deposito.value}</span>
                    <span className="text-xs text-gray-500 mt-1">{row.deposito.desc}</span>
                  </div>

                  {/* Saham Column */}
                  <div className="flex flex-col items-center justify-center p-4 group-hover:bg-white/5 rounded-xl transition-colors">
                    <row.saham.icon className={`w-5 h-5 mb-2 ${row.saham.color}`} />
                    <span className="text-sm text-gray-text">{row.saham.value}</span>
                    <span className="text-xs text-gray-500 mt-1">{row.saham.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
