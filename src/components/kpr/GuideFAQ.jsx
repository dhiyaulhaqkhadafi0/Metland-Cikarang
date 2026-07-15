"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle, Info, ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";

const GUIDES = [
  {
    title: "Apa itu KPR?",
    desc: "Kredit Pemilikan Rumah (KPR) adalah fasilitas kredit yang diberikan oleh perbankan untuk nasabah yang ingin membeli atau memperbaiki rumah. Jaminan untuk pinjaman ini adalah rumah yang dibeli itu sendiri."
  },
  {
    title: "Apa itu BI Checking / SLIK?",
    desc: "Sistem Informasi Debitur yang dikelola OJK untuk melihat rekam jejak kredit Anda. Riwayat kredit yang buruk (seperti sering telat bayar pinjaman online) bisa membuat pengajuan KPR Anda ditolak."
  },
  {
    title: "Fixed Rate vs Floating Rate?",
    desc: "Fixed rate adalah suku bunga tetap yang tidak berubah selama periode tertentu. Setelah periode fixed habis, bunga berubah menjadi floating rate yang mengikuti pergerakan suku bunga pasar."
  },
  {
    title: "Berapa DP Minimal?",
    desc: "Berdasarkan aturan BI, DP minimal saat ini bisa 0% untuk rumah pertama. Namun secara praktek, perbankan seringkali mensyaratkan 5-20% tergantung kebijakan promo developer."
  },
  {
    title: "Apa itu Joint Income?",
    desc: "Penggabungan pendapatan suami dan istri untuk memenuhi syarat rasio cicilan. Ini sangat berguna jika cicilan yang dituju cukup besar, sehingga bank menganggap kemampuan bayar gabungan lebih aman."
  },
  {
    title: "Biaya Ekstra KPR?",
    desc: "Di luar DP, bersiaplah untuk Biaya Provisi, Administrasi, Asuransi Jiwa & Kebakaran, Biaya Notaris, AJB, dan BPHTB. Kabar baiknya, di Metland Cikarang sebagian besar biaya ini seringkali digratiskan lewat promo!"
  },
  {
    title: "Apa itu Appraisal?",
    desc: "Proses penilaian harga pasar rumah yang dilakukan oleh pihak independen dari bank untuk menentukan nilai aset dan plafon kredit maksimal yang dapat diberikan."
  },
  {
    title: "Apa itu DSR (Debt Service Ratio)?",
    desc: "Perbandingan antara total cicilan utang bulanan Anda dengan total pendapatan kotor. Bank biasanya memberikan batas maksimal DSR sekitar 30% - 40% agar keuangan tetap sehat."
  },
  {
    title: "Suku Bunga Anuitas vs Flat?",
    desc: "KPR umumnya menggunakan perhitungan bunga anuitas, di mana porsi pembayaran bunga lebih besar di awal cicilan dan akan menurun seiring waktu, sementara porsi pokok utang semakin besar."
  },
  {
    title: "Persyaratan Umum KPR?",
    desc: "Syarat dasarnya adalah WNI, usia minimal 21 tahun (atau sudah menikah), berpenghasilan tetap, dan dokumen valid seperti KTP, KK, NPWP, Slip Gaji 3 bulan terakhir, serta Rekening Koran."
  },
  {
    title: "Suku Bunga Promo vs Counter?",
    desc: "Bunga Promo adalah bunga rendah (misal 2.55% p.a) yang dikunci (fixed) pada beberapa tahun pertama. Bunga Counter adalah suku bunga normal bank yang berlaku saat memasuki periode floating."
  },
  {
    title: "Kenapa Wajib Asuransi?",
    desc: "Asuransi Jiwa akan melunasi sisa KPR jika debitur meninggal dunia, sehingga tidak membebani keluarga. Asuransi Kebakaran melindungi fisik bangunan yang menjadi jaminan dari risiko musibah."
  }
];

const FAQS = [
  {
    question: "Apakah karyawan kontrak bisa mengajukan KPR?",
    answer: "Bisa, namun ada syarat khusus seperti masa kerja minimal (biasanya 1-2 tahun di perusahaan yang sama) dan kebijakan tiap bank bisa berbeda."
  },
  {
    question: "Bagaimana jika BI Checking saya ada riwayat telat bayar?",
    answer: "Tergantung status kol (kolektibilitas). Kol 1 lancar, Kol 2 telat 1-90 hari (masih bisa dipertimbangkan jika dilunasi), Kol 3-5 sangat sulit. Sebaiknya lunasi tunggakan dan minta Surat Keterangan Lunas dari kreditur sebelumnya."
  },
  {
    question: "Bisakah KPR ditolak walaupun penghasilan saya besar?",
    answer: "Bisa. Penolakan KPR bukan hanya karena penghasilan, tapi bisa karena riwayat kredit buruk (BI Checking), dokumen tidak valid, status pekerjaan berisiko menurut bank, atau DSR (total cicilan lain) sudah terlalu besar."
  },
  {
    question: "Berapa lama proses pengajuan KPR hingga akad kredit?",
    answer: "Umumnya memakan waktu 14 hingga 30 hari kerja setelah seluruh dokumen diserahkan secara lengkap ke pihak bank."
  }
];

export default function GuideFAQ() {
  const [currentPage, setCurrentPage] = useState(1);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  
  const itemsPerPage = 6;
  const totalPages = Math.ceil(GUIDES.length / itemsPerPage);
  
  const currentGuides = GUIDES.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <section className="py-24 bg-[#020202] relative border-t border-white/5">
      <div className="absolute top-0 right-0 w-1/2 h-[500px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl relative z-10">
        
        {/* Guides Section */}
        <div className="mb-24">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center p-3 bg-white/5 rounded-2xl mb-6">
              <HelpCircle className="w-8 h-8 text-emerald-400" />
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Panduan & Istilah KPR</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Memahami berbagai istilah perbankan seringkali membingungkan. Kami merangkum hal-hal krusial yang wajib Anda ketahui sebelum mengajukan KPR.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10 min-h-[400px]">
            <AnimatePresence mode="wait">
              {currentGuides.map((guide, idx) => (
                <motion.div
                  key={guide.title}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:border-emerald-500/30 transition-all group h-fit"
                >
                  <h3 className="text-xl font-bold text-white mb-4 group-hover:text-emerald-400 transition-colors flex items-start gap-2">
                    <Info className="w-5 h-5 text-emerald-500 shrink-0 mt-1" />
                    {guide.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed text-sm">
                    {guide.desc}
                  </p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-4">
              <button 
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-full border border-white/10 text-white disabled:opacity-30 hover:bg-white/10 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div className="text-gray-400 text-sm font-medium">
                Halaman {currentPage} dari {totalPages}
              </div>
              <button 
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-full border border-white/10 text-white disabled:opacity-30 hover:bg-white/10 transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-white mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-400 text-sm">
              Pertanyaan yang paling sering ditanyakan seputar pengajuan KPR.
            </p>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, idx) => (
              <div 
                key={idx} 
                className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden transition-colors hover:bg-white/10"
              >
                <button 
                  onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left"
                >
                  <span className="text-white font-semibold pr-8">{faq.question}</span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center bg-white/5 shrink-0 transition-transform duration-300 ${openFaqIndex === idx ? 'rotate-180 bg-emerald-500/20 text-emerald-400' : 'text-gray-400'}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>
                <AnimatePresence>
                  {openFaqIndex === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 text-gray-400 text-sm leading-relaxed border-t border-white/5 pt-4">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
