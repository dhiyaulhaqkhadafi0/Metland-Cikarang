"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Landmark, ChevronDown, CheckCircle2, Star } from "lucide-react";

const BANKS = [
  {
    id: "mandiri",
    name: "Bank Mandiri",
    rate: "2.55%",
    desc: "Fixed 1 Tahun",
    color: "from-blue-600 to-blue-400",
    recommended: true,
    benefits: [
      "Suku Bunga Terendah saat ini",
      "Proses persetujuan (approval) cepat",
      "Bebas biaya provisi & administrasi",
      "Dapat menggunakan sistem Joint Income"
    ]
  },
  {
    id: "bri",
    name: "Bank Rakyat Indonesia (BRI)",
    rate: "2.65%",
    desc: "Fixed 1 Tahun",
    color: "from-orange-600 to-orange-400",
    recommended: true,
    benefits: [
      "Bunga sangat kompetitif",
      "DP mulai dari 0%",
      "Jangkauan pembayaran terluas",
      "Program khusus ASN/BUMN/TNI/Polri"
    ]
  },
  {
    id: "bca",
    name: "Bank Central Asia (BCA)",
    rate: "2.75%",
    desc: "Fixed 1 Tahun",
    color: "from-blue-800 to-blue-500",
    recommended: true,
    benefits: [
      "Bunga sangat stabil untuk jangka menengah",
      "Diskon asuransi jiwa 10%",
      "Pengajuan full digital",
      "Pelunasan dipercepat tanpa penalti"
    ]
  },
  {
    id: "bni",
    name: "Bank Negara Indonesia (BNI)",
    rate: "2.75%",
    desc: "Fixed 1 Tahun",
    color: "from-teal-600 to-teal-400",
    recommended: false,
    benefits: [
      "Persetujuan instan (Instant Approval)",
      "Masa tenor hingga 25 tahun",
      "Promo khusus developer terkemuka",
      "Syarat dokumen lebih mudah"
    ]
  },
  {
    id: "btn",
    name: "Bank Tabungan Negara (BTN)",
    rate: "2.99%",
    desc: "Fixed 1 Tahun",
    color: "from-indigo-600 to-indigo-400",
    recommended: false,
    benefits: [
      "Bank spesialis KPR terpercaya",
      "Solusi untuk profesional dan wiraswasta",
      "Pengalaman KPR terbanyak di Indonesia",
      "Tenor bisa sangat panjang"
    ]
  },
  {
    id: "bsi",
    name: "Bank Syariah Indonesia (BSI)",
    rate: "Margin 3.3%",
    desc: "Equivalent Fixed 1 Thn",
    color: "from-emerald-600 to-emerald-400",
    recommended: false,
    benefits: [
      "Prinsip syariah (Akad Murabahah)",
      "Angsuran pasti hingga lunas",
      "Bebas biaya appraisal",
      "Tenor hingga 30 tahun (khusus milenial)"
    ]
  },
  {
    id: "nobu",
    name: "Nobu Bank",
    rate: "3.99%",
    desc: "Fixed 1 Tahun",
    color: "from-rose-600 to-rose-400",
    recommended: false,
    benefits: [
      "Bunga kompetitif dengan proses cepat",
      "Syarat sangat fleksibel",
      "Inovasi digital untuk kemudahan nasabah",
      "Program kolaborasi dengan Lippo Group & lainnya"
    ]
  }
];

export default function BankPartners() {
  const [expandedBank, setExpandedBank] = useState(null);

  return (
    <section className="py-24 bg-[#0a0a0b] relative border-t border-white/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-3 bg-white/5 rounded-2xl mb-6">
            <Landmark className="w-8 h-8 text-emerald-400" />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Partner Bank KPR</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Berbagai pilihan skema dan bunga dari bank terpercaya untuk menyesuaikan dengan kondisi finansial Anda.
          </p>
        </div>

        <div className="space-y-4">
          {BANKS.map((bank) => (
            <div 
              key={bank.id}
              className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden transition-colors hover:bg-white/10"
            >
              <button 
                onClick={() => setExpandedBank(expandedBank === bank.id ? null : bank.id)}
                className="w-full px-6 py-6 flex items-center justify-between text-left"
              >
                <div className="flex items-center gap-6">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${bank.color} flex items-center justify-center flex-shrink-0 shadow-lg`}>
                    <Landmark className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-xl font-bold text-white">{bank.name}</h3>
                      {bank.recommended && (
                        <span className="flex items-center gap-1 bg-yellow-500/20 text-yellow-400 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                          <Star className="w-3 h-3 fill-yellow-400" /> Best Rate
                        </span>
                      )}
                    </div>
                    <p className="text-emerald-400 font-semibold">{bank.rate} <span className="text-gray-500 font-normal text-sm ml-1">({bank.desc})</span></p>
                  </div>
                </div>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center bg-white/5 transition-transform duration-300 ${expandedBank === bank.id ? 'rotate-180' : ''}`}>
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                </div>
              </button>

              <AnimatePresence>
                {expandedBank === bank.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 pt-2 border-t border-white/10 ml-[4.5rem]">
                      <h4 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">Keunggulan Program:</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {bank.benefits.map((benefit, idx) => (
                          <div key={idx} className="flex items-start gap-3">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-400 text-sm">{benefit}</span>
                          </div>
                        ))}
                      </div>
                      <div className="mt-6">
                        <button className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white text-sm font-semibold rounded-full transition-colors">
                          Konsultasikan Bank Ini
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
