"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Clock, CalendarClock, Building, MapPin, Store, Home, Link as LinkIcon, Train, ZoomIn, X } from "lucide-react";
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

const TIMELINE = [
  {
    year: "2023",
    title: "Cluster Avesa Garden",
    status: "Selesai",
    statusColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    icon: Home,
    desc: "Peluncuran klaster perdana yang meletakkan pondasi gaya hidup Eco-Living di Metland Cikarang.",
    image: "/cluster avesa garden/CANARY/Gerbang Cluster Avesa Garden.jpg"
  },
  {
    year: "2024",
    title: "Cluster Canary & Derora",
    status: "Selesai",
    statusColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    icon: Home,
    desc: "Penambahan sub-klaster American Farmhouse yang sukses besar menyerap pasar milenial.",
    image: "/cluster avesa garden/DERORA/fasad derora 59 84.jpg"
  },
  {
    year: "2025",
    title: "Easton & Weston Gateway",
    status: "On Progress",
    statusColor: "text-blue-400 bg-blue-500/10 border-blue-500/20",
    icon: Store,
    desc: "Pusat ruko komersial 3 lantai bergaya Western yang menjadi cikal bakal CBD Cikarang.",
    image: "/RUKO EASTON GATEWAY/galeri_cluster6_68a1db681c4c4 (1).jpg"
  },
  {
    year: "Awal 2026",
    title: "Cluster Brassia (Myzora & Ellyra)",
    status: "Coming Soon",
    statusColor: "text-orange-400 bg-orange-500/10 border-orange-500/20",
    icon: Home,
    desc: "Ekspansi kawasan premium terbaru dengan fitur Double Security & Smart Home mutakhir.",
    image: "/brassia-garden-new.jpeg"
  },
  {
    year: "Akhir 2026",
    title: "Jembatan Penghubung Cibitung-Cikarang",
    status: "Planning",
    statusColor: "text-gray-400 bg-white/5 border-white/10",
    icon: LinkIcon,
    desc: "Infrastruktur vital yang akan menyatukan Metland Cikarang langsung ke Stasiun & Mall Cibitung.",
    image: "/gallery umum/area CBD & TOD Metland Cibitung.png"
  },
  {
    year: "2027+",
    title: "Proyek MRT Metland",
    status: "Planning",
    statusColor: "text-gray-400 bg-white/5 border-white/10",
    icon: Train,
    desc: "Rencana strategis pembangunan jalur MRT Cikarang-Balaraja yang melintasi kawasan.",
    image: "/gallery umum/stasiun MRT.jpg"
  }
];

export default function DevelopmentTimeline() {
  const [lightboxImage, setLightboxImage] = useState(null);

  return (
    <div className="w-full">
      <div className="text-center mb-16 max-w-2xl mx-auto">
        <h2 className="text-3xl sm:text-5xl font-bold text-white mb-6 tracking-tight">Cikarang Timeline</h2>
        <p className="text-gray-400 text-lg">Melihat langsung komitmen pengembang dalam membangun Metland Cikarang dari sekadar konsep menjadi kota mandiri eksklusif.</p>
      </div>

      <div className="relative max-w-4xl mx-auto">
        {/* Vertical Line */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent -translate-x-1/2" />

        <div className="space-y-12">
          {TIMELINE.map((item, idx) => {
            const isEven = idx % 2 === 0;
            const isDone = item.status === "Selesai";
            const isInProgress = item.status === "On Progress";

            return (
              <motion.div 
                key={item.year}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className={`relative flex flex-col md:flex-row items-center gap-8 ${isEven ? "md:flex-row" : "md:flex-row-reverse"}`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-[#0a0a0b] border-[4px] border-emerald-500 -translate-x-1/2 z-10 shadow-[0_0_15px_rgba(16,185,129,0.5)]" />

                {/* Content Card */}
                <div className="w-full md:w-1/2 pl-12 md:pl-0">
                  <div className={`flex flex-col ${isEven ? "md:items-end md:text-right" : "md:items-start md:text-left"} md:px-8`}>
                    
                    <div className="flex items-center gap-3 mb-3">
                      {isEven && <span className={`px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full border backdrop-blur-md ${item.statusColor} hidden md:inline-block`}>{item.status}</span>}
                      <span className="text-3xl sm:text-4xl font-bold text-white tracking-tighter">{item.year}</span>
                      {!isEven && <span className={`px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full border backdrop-blur-md ${item.statusColor} hidden md:inline-block`}>{item.status}</span>}
                      
                      {/* Mobile Status */}
                      <span className={`px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full border backdrop-blur-md ${item.statusColor} md:hidden`}>{item.status}</span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold text-gray-200 mb-3 flex items-center gap-2">
                      {!isEven && <item.icon className="w-5 h-5 text-gray-500 hidden md:block" />}
                      {item.title}
                      {isEven && <item.icon className="w-5 h-5 text-gray-500 hidden md:block" />}
                    </h3>
                    
                    <p className="text-gray-400 leading-relaxed mb-6 max-w-sm">{item.desc}</p>

                    <div 
                      className="relative w-full max-w-sm aspect-video rounded-2xl overflow-hidden border border-white/10 group shadow-xl bg-black cursor-pointer"
                      onClick={() => setLightboxImage(item.image)}
                    >
                      <Image 
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                      
                      <div className="absolute top-3 right-3 bg-black/50 p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-md">
                        <ZoomIn className="text-white w-4 h-4" />
                      </div>

                      <div className="absolute bottom-3 right-3">
                        {isDone ? <CheckCircle2 className="text-emerald-400 w-6 h-6 drop-shadow-md" /> : isInProgress ? <Clock className="text-blue-400 w-6 h-6 drop-shadow-md" /> : <CalendarClock className="text-gray-400 w-6 h-6 drop-shadow-md" />}
                      </div>
                    </div>

                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
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
