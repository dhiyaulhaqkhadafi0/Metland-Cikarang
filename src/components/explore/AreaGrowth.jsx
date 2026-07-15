"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TrendingUp, ArrowRight, Activity, Globe, MapPin, ZoomIn, X } from "lucide-react";
import Image from "next/image";
import { TransformWrapper, TransformComponent, useControls } from "react-zoom-pan-pinch";

const ZoomControls = () => {
  const { zoomIn, zoomOut, resetTransform } = useControls();
  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[110] flex items-center gap-3 bg-black/60 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full">
      <button onClick={() => zoomOut()} className="w-10 h-10 flex items-center justify-center text-white hover:bg-white/20 rounded-full font-bold text-xl transition-colors">-</button>
      <button onClick={() => resetTransform()} className="px-3 text-sm text-gray-300 font-medium hover:text-white transition-colors">Reset</button>
      <button onClick={() => zoomIn()} className="w-10 h-10 flex items-center justify-center text-white hover:bg-white/20 rounded-full font-bold text-xl transition-colors">+</button>
    </div>
  );
};

export default function AreaGrowth() {
  const [lightboxImage, setLightboxImage] = useState(null);

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row gap-8 items-end justify-between mb-12">
        <div className="max-w-2xl">
          <p className="text-emerald-400 font-bold uppercase tracking-widest text-sm mb-3 flex items-center gap-2">
            <TrendingUp size={16} /> Potensi Investasi
          </p>
          <h2 className="text-3xl sm:text-5xl font-bold text-white mb-4 tracking-tight">Ekosistem Terintegrasi Bekasi</h2>
          <p className="text-gray-400 text-lg">Metland Cikarang (Forest Serenity) dan Metland Cibitung (TOD) saling bersinergi membentuk raksasa ekonomi baru di koridor timur Jakarta.</p>
        </div>
        <button className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 font-bold transition-colors group shrink-0">
          Pelajari Insight Investasi <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
        
        {/* Bento Item 1: TOD & Infrastruktur (Span 2 columns) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative md:col-span-2 rounded-3xl overflow-hidden border border-white/10 group bg-[#111113] cursor-pointer"
          onClick={() => setLightboxImage("/gallery umum/area CBD & TOD Metland Cibitung.png")}
        >
          <Image 
            src="/gallery umum/area CBD & TOD Metland Cibitung.png"
            alt="TOD Infrastructure"
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-60 mix-blend-luminosity group-hover:mix-blend-normal"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0b] via-[#0a0a0b]/60 to-transparent" />
          
          <div className="absolute top-4 right-4 bg-black/50 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-md">
            <ZoomIn className="text-white w-5 h-5" />
          </div>

          <div className="absolute inset-0 p-8 flex flex-col justify-end">
            <div className="w-12 h-12 bg-emerald-500/20 text-emerald-400 rounded-2xl flex items-center justify-center mb-4 backdrop-blur-md">
              <Globe size={24} />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Transit-Oriented Development (TOD)</h3>
            <p className="text-gray-400 max-w-md line-clamp-2">Sinergi dengan Stasiun Telaga Murni (Hanya ±5 Menit setelah jembatan 2026 selesai) & Proyek MRT Cikarang-Balaraja.</p>
          </div>
        </motion.div>

        {/* Bento Item 2: Konektivitas Tol */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative rounded-3xl overflow-hidden border border-white/10 group bg-[#111113] cursor-pointer"
          onClick={() => setLightboxImage("/gallery umum/gerbang tol gabuss.jpg")}
        >
          <Image 
            src="/gallery umum/gerbang tol gabuss.jpg"
            alt="Toll Access"
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-60 mix-blend-luminosity group-hover:mix-blend-normal"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0b] via-[#0a0a0b]/60 to-transparent" />
          
          <div className="absolute top-4 right-4 bg-black/50 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-md">
            <ZoomIn className="text-white w-5 h-5" />
          </div>

          <div className="absolute inset-0 p-8 flex flex-col justify-end">
            <div className="w-12 h-12 bg-blue-500/20 text-blue-400 rounded-2xl flex items-center justify-center mb-4 backdrop-blur-md">
              <MapPin size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Akses Cepat Logistik</h3>
            <p className="text-gray-400 text-sm line-clamp-2">Akses kilat ke Tol Gabus (JORR 2) & Exit Tol Telaga Asih, menunjang konektivitas penuh ke Jababeka & MM2100.</p>
          </div>
        </motion.div>

        {/* Bento Item 3: Sentra Komersial */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative rounded-3xl overflow-hidden border border-white/10 group bg-[#111113] cursor-pointer"
          onClick={() => setLightboxImage("/gallery umum/Millenia City.jpg")}
        >
          <Image 
            src="/gallery umum/Millenia City.jpg"
            alt="Commercial Center"
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-50 mix-blend-luminosity group-hover:mix-blend-normal"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0b] via-[#0a0a0b]/80 to-[#0a0a0b]/40" />
          
          <div className="absolute top-4 right-4 bg-black/50 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-md">
            <ZoomIn className="text-white w-5 h-5" />
          </div>

          <div className="absolute inset-0 p-8 flex flex-col justify-end">
            <div className="w-12 h-12 bg-orange-500/20 text-orange-400 rounded-2xl flex items-center justify-center mb-4 backdrop-blur-md">
              <Activity size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Ekosistem Komersial (CBD)</h3>
            <p className="text-gray-400 text-sm">Kehadiran Ruko Easton/Weston serta Mall Millenia City menjadi magnet perputaran ekonomi baru.</p>
          </div>
        </motion.div>

        {/* Bento Item 4: Kualitas Hidup (Span 2 columns) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="relative md:col-span-2 rounded-3xl overflow-hidden border border-white/10 group bg-[#111113] p-8 flex flex-col md:flex-row items-center gap-8"
        >
          <div 
            className="w-full md:w-1/2 relative h-48 md:h-full rounded-2xl overflow-hidden shadow-2xl cursor-pointer group/img"
            onClick={() => setLightboxImage("/gallery umum/waterland metland cibitung.jpg")}
          >
            <Image 
              src="/gallery umum/waterland metland cibitung.jpg"
              alt="Quality of Life"
              fill
              className="object-cover transition-transform duration-700 group-hover/img:scale-105"
            />
            <div className="absolute top-4 right-4 bg-black/50 p-2 rounded-full opacity-0 group-hover/img:opacity-100 transition-opacity backdrop-blur-md">
              <ZoomIn className="text-white w-4 h-4" />
            </div>
          </div>
          <div className="w-full md:w-1/2 flex flex-col justify-center">
            <h3 className="text-2xl font-bold text-white mb-3">Kualitas Hidup & Keluarga</h3>
            <p className="text-gray-400 mb-6 line-clamp-3">Dengan fasilitas terintegrasi seperti RS Hermina, Sekolah Al-Azhar, dan Waterland, kehidupan masa depan keluarga terjamin kualitasnya.</p>
            <div className="flex gap-4">
               <div className="text-center px-4 py-2 bg-white/5 rounded-xl border border-white/10">
                 <p className="text-xl font-bold text-white">±5 Min</p>
                 <p className="text-[10px] text-gray-500 uppercase tracking-wider">Ke Stasiun (Via Jembatan)</p>
               </div>
               <div className="text-center px-4 py-2 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
                 <p className="text-xl font-bold text-emerald-400">MRT</p>
                 <p className="text-[10px] text-emerald-500/80 uppercase tracking-wider">Segera Hadir</p>
               </div>
            </div>
          </div>
        </motion.div>

      </div>

      {/* Lightbox / Zoom Modal */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 sm:p-8"
          >
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute top-6 right-6 z-[120] p-3 bg-red-500/80 hover:bg-red-500 text-white rounded-full transition-colors shadow-2xl"
            >
              <X size={24} />
            </button>
            <div className="w-full h-full max-w-6xl max-h-[90vh] bg-black rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/10 relative">
              <TransformWrapper initialScale={1} minScale={0.5} maxScale={4} centerOnInit>
                <ZoomControls />
                <TransformComponent wrapperClass="w-full h-full !flex items-center justify-center">
                  <img src={lightboxImage} alt="Enlarged" className="max-w-full max-h-[90vh] object-contain" />
                </TransformComponent>
              </TransformWrapper>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
