"use client";

import { motion } from "framer-motion";
import { Banknote, CalendarDays, Landmark } from "lucide-react";

const METHODS = [
  {
    id: "cash",
    title: "Cash Keras (Tunai)",
    icon: Banknote,
    desc: "Pembayaran lunas dalam waktu 1 bulan. Dapatkan harga spesial dan proses kepemilikan tercepat tanpa bunga.",
    features: ["Diskon Harga Maksimal", "Proses Cepat 1 Bulan", "Tanpa Bunga"]
  },
  {
    id: "installment",
    title: "Cash Bertahap (12 Bulan)",
    icon: CalendarDays,
    desc: "Cicilan langsung ke developer selama 12 bulan tanpa bunga. Solusi fleksibel untuk cash flow jangka pendek Anda.",
    features: ["Tanpa Bunga (0%)", "Tanpa BI Checking", "Flat 12 Bulan"]
  },
  {
    id: "kpr",
    title: "KPR (Kredit Bank)",
    icon: Landmark,
    desc: "Skema cicilan ringan hingga 30 tahun bekerjasama dengan bank ternama. Sangat meringankan beban finansial awal.",
    features: ["DP Ringan 2.5%", "Tenor hingga 30 Tahun", "Subsidi Biaya KPR"]
  }
];

export default function PaymentMethods() {
  return (
    <section className="py-24 bg-[#0a0a0b] relative border-t border-white/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Pilihan Metode Pembayaran</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Metland Cikarang menawarkan 3 metode pembayaran yang sangat fleksibel untuk menyesuaikan dengan kondisi keuangan Anda.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {METHODS.map((method, idx) => (
            <motion.div
              key={method.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white/5 border border-white/10 rounded-3xl p-8 hover:bg-white/10 hover:-translate-y-2 transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-6">
                <method.icon className="w-7 h-7 text-emerald-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">{method.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-8">
                {method.desc}
              </p>
              
              <ul className="space-y-3 mt-auto">
                {method.features.map((feat, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-gray-300 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    {feat}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
