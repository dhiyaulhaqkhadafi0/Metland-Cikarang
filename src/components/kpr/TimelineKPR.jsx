"use client";

import { motion } from "framer-motion";
import { CreditCard, FileCheck, Landmark, CheckCircle, PenTool, Home } from "lucide-react";

const STEPS = [
  {
    id: 1,
    title: "Booking Fee & Pilih Unit",
    desc: "Amankan unit impian Anda dengan membayar Booking Fee. Tim kami akan mendampingi Anda untuk melihat site plan, simulasi awal, dan mengecek ketersediaan unit idaman.",
    icon: CreditCard,
    color: "text-blue-400 bg-blue-500/10 border-blue-500/20"
  },
  {
    id: 2,
    title: "Pembayaran DP & Pemberkasan",
    desc: "Membayar Uang Muka (Hanya 2.5% di Metland Cikarang) sesuai kesepakatan dan melengkapi dokumen administratif seperti KTP, NPWP, slip gaji, dan rekening koran.",
    icon: FileCheck,
    color: "text-amber-400 bg-amber-500/10 border-amber-500/20"
  },
  {
    id: 3,
    title: "Pengajuan & Wawancara Bank",
    desc: "Berkas Anda akan kami submit ke bank pilihan. Proses ini meliputi verifikasi BI Checking (SLIK OJK), konfirmasi ke HRD tempat bekerja, serta wawancara singkat melalui telepon.",
    icon: Landmark,
    color: "text-purple-400 bg-purple-500/10 border-purple-500/20"
  },
  {
    id: 4,
    title: "Approval Bank & Terbit SPR",
    desc: "Bank menyetujui pengajuan KPR Anda dengan menerbitkan Surat Penegasan Persetujuan Penyediaan Kredit (SP3K). Developer juga akan menerbitkan Surat Pemesanan Rumah (SPR) yang sah.",
    icon: CheckCircle,
    color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20"
  },
  {
    id: 5,
    title: "Penandatanganan Akad Kredit",
    desc: "Langkah legal terakhir! Anda akan menandatangani Akta Jual Beli (AJB) dan Perjanjian Kredit bersama pihak Bank, Notaris, dan perwakilan Developer.",
    icon: PenTool,
    color: "text-red-400 bg-red-500/10 border-red-500/20"
  },
  {
    id: 6,
    title: "Serah Terima Kunci (BAST)",
    desc: "Selamat! Proses pembangunan selesai dan rumah idaman resmi diserahterimakan. Anda bebas mengecek fisik bangunan sebelum menandatangani Berita Acara Serah Terima.",
    icon: Home,
    color: "text-white bg-white/10 border-white/20"
  }
];

export default function TimelineKPR() {
  return (
    <section className="py-24 bg-[#020202] relative border-t border-white/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Timeline Pengajuan KPR</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Proses memiliki rumah melalui KPR sangat terstruktur dan transparan. Berikut adalah tahapan yang akan Anda lalui bersama tim kami.
          </p>
        </div>

        <div className="relative">
          {/* Vertical Line for Desktop */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-emerald-500/0 via-emerald-500/50 to-emerald-500/0 -translate-x-1/2" />
          
          <div className="space-y-8 md:space-y-0">
            {STEPS.map((step, idx) => {
              const isEven = idx % 2 !== 0;
              return (
                <div key={step.id} className={`relative flex flex-col md:flex-row items-center md:justify-between md:mb-12 group ${isEven ? 'md:flex-row-reverse' : ''}`}>
                  
                  {/* Timeline Dot (Desktop) */}
                  <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-[#020202] border-2 border-emerald-500/50 items-center justify-center z-10 shadow-[0_0_15px_rgba(16,185,129,0.3)] group-hover:scale-110 group-hover:border-emerald-400 transition-all">
                    <span className="text-emerald-400 font-bold text-sm">{step.id}</span>
                  </div>

                  {/* Content Box */}
                  <motion.div 
                    initial={{ opacity: 0, x: isEven ? 30 : -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="w-full md:w-[45%] flex"
                  >
                    <div className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors relative">
                      {/* Mobile Step Badge */}
                      <div className="md:hidden absolute -top-3 -right-3 w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg border-4 border-[#020202]">
                        {step.id}
                      </div>

                      <div className="flex items-start gap-4">
                        <div className={`p-3 rounded-xl border ${step.color} shrink-0`}>
                          <step.icon className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                          <p className="text-gray-400 text-sm leading-relaxed">{step.desc}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Empty space for the other side on Desktop */}
                  <div className="hidden md:block w-[45%]" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
