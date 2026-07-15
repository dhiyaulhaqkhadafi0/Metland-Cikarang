"use client";

import { motion } from "framer-motion";
import { TreePine, Building2, Link as LinkIcon, MapPin, Map } from "lucide-react";
import Image from "next/image";

export default function HistorySection() {
  return (
    <section className="relative pt-24 pb-12 sm:pt-32 sm:pb-20 z-10 border-b border-white/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* Left Text Content */}
          <div className="w-full lg:w-1/2">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-widest mb-6">
                <Map size={14} /> The Origin Story
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight leading-tight">
                Bagian dari Visi <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-600">500+ Hektar</span>
              </h1>
              
              <p className="text-gray-400 text-lg leading-relaxed mb-6">
                Awalnya, area ini dirancang sebagai satu kesatuan megaproyek Metland Cibitung seluas 500+ hektar. Namun, demi <strong className="text-white">mempercepat akselerasi pembangunan</strong>, area seluas 180+ hektar di Desa Sukajaya, Kecamatan Cibitung, dimekarkan secara mandiri menjadi <strong>Metland Cikarang</strong>.
              </p>

              <div className="bg-[#111113] border border-white/5 rounded-2xl p-6 mb-8 relative overflow-hidden group hover:border-emerald-500/30 transition-colors">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-[50px] -translate-y-1/2 translate-x-1/2" />
                <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                  <TreePine className="text-emerald-400" /> Forest Serenity in Urban City
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Jika Cibitung difokuskan pada hiruk-pikuk gaya hidup Transit-Oriented Development (TOD), Cikarang hadir dengan keseimbangan alam—menawarkan <i>eco-living</i> premium yang tenang, namun tetap menempel kuat pada fasilitas kota.
                </p>
              </div>

            </motion.div>
          </div>

          {/* Right Visual Content */}
          <div className="w-full lg:w-1/2">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="grid grid-cols-2 gap-4">
                
                {/* Visual Card 1: Value */}
                <div className="bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-3xl p-6 shadow-2xl flex flex-col justify-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
                    <Building2 size={24} />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white mb-1">Fasilitas Sama,<br/>Harga Terjangkau</h4>
                    <p className="text-xs text-gray-400 leading-relaxed">
                      Nikmati seluruh kemewahan ekosistem Cibitung (Stasiun, Mall, RS) dengan harga properti yang jauh lebih ramah di Metland Cikarang.
                    </p>
                  </div>
                </div>

                {/* Visual Card 2: Bridge connection */}
                <div className="bg-gradient-to-bl from-emerald-900/40 to-black border border-emerald-500/20 rounded-3xl p-6 shadow-2xl flex flex-col justify-center gap-4 relative overflow-hidden">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center relative z-10">
                    <LinkIcon size={24} />
                  </div>
                  <div className="relative z-10">
                    <h4 className="text-lg font-bold text-white mb-1">Jembatan<br/>Penghubung</h4>
                    <p className="text-xs text-gray-400 leading-relaxed mb-3">
                      Mengintegrasikan langsung Cibitung & Cikarang. Akses instan tanpa harus memutar.
                    </p>
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-500/20 border border-emerald-500/30 text-[10px] font-bold text-emerald-300">
                      Selesai Akhir 2026
                    </div>
                  </div>
                  {/* Decorative background element */}
                  <div className="absolute -bottom-10 -right-10 text-emerald-500/10 rotate-12 pointer-events-none">
                    <LinkIcon size={150} />
                  </div>
                </div>

                {/* Visual Card 3: Mobility */}
                <div className="col-span-2 bg-[#111113] border border-white/5 rounded-3xl p-6 shadow-2xl flex flex-col sm:flex-row items-center gap-6">
                  <div className="w-16 h-16 shrink-0 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                    <MapPin size={24} className="text-gray-300" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white mb-2">Konektivitas Tanpa Batas</h4>
                    <p className="text-sm text-gray-400 leading-relaxed">
                      Terintegrasi penuh dengan <strong>Stasiun KRL Cikarang & Telaga Murni</strong>, serta akses cepat ke <strong>Tol Gabus & Exit Tol Telaga Asih</strong>. Posisi strategis di episentrum pertumbuhan Bekasi.
                    </p>
                  </div>
                </div>
                
              </div>
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
}
