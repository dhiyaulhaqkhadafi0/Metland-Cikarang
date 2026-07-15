"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Tag } from "lucide-react";

const PROMOS = [
  { id: 1, title: "DP Hanya 2.5%", desc: "Berlaku khusus untuk semua varian unit rumah di Metland Cikarang." },
  { id: 2, title: "DP Ruko 27 Juta", desc: "Kesempatan emas memiliki ruko komersial dengan DP sangat ringan." },
  { id: 3, title: "Free Biaya Surat-Surat", desc: "Sudah termasuk gratis biaya AJB, Balik Nama (BN), dan BPHTB." },
  { id: 4, title: "Subsidi Biaya KPR", desc: "Biaya akad KPR disubsidi oleh developer sehingga sangat menghemat pengeluaran awal." },
  { id: 5, title: "Free Membership Waterland", desc: "Gratis keanggotaan Waterland 1 Tahun penuh untuk 4 orang." },
  { id: 6, title: "Free Internet 1 Tahun", desc: "Nikmati koneksi internet rumah gratis selama 1 tahun pertama." }
];

export default function PromoKPR() {
  return (
    <section className="py-20 bg-[#020202] relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          
          <div className="w-full md:w-1/3">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-emerald-500/10 border border-emerald-500/20 rounded-3xl p-8"
            >
              <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center mb-6">
                <Tag className="w-6 h-6 text-emerald-400" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">Promo KPR Bulan Ini</h2>
              <p className="text-gray-400 text-sm leading-relaxed mb-8">
                Metland Cikarang bekerjasama dengan berbagai bank ternama untuk memberikan kemudahan dan keringanan ekstra bagi Anda. Jangan lewatkan kesempatan ini.
              </p>
              <button className="text-emerald-400 font-semibold text-sm hover:text-emerald-300 transition-colors">
                Lihat Syarat & Ketentuan →
              </button>
            </motion.div>
          </div>

          <div className="w-full md:w-2/3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {PROMOS.map((promo, idx) => (
                <motion.div
                  key={promo.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div className="mt-1">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div>
                      <h3 className="text-white font-bold mb-2">{promo.title}</h3>
                      <p className="text-gray-400 text-sm">{promo.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
