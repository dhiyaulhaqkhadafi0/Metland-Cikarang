"use client";
import SectionReveal from "@/components/atoms/SectionReveal";
import { useState } from "react";
import { Map, TreePine, Store, Building2, Plus, Minus, Info, X, ArrowRight, MapPin, Train, Hospital } from "lucide-react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { motion, AnimatePresence } from "framer-motion";

const points = [
  { id: "one-foresta", name: "One Foresta District", top: "40%", left: "45%", desc: "Kawasan superblok hijau yang memadukan area komersial, residensial, dan rekreasi alam.", icon: TreePine, color: "#10b981", image: "/gallery umum/One Foresta District.png", status: "Premium Area" },
  { id: "stasiun", name: "Stasiun KRL Telaga Murni", top: "85%", left: "85%", desc: "Akses komuter line langsung menuju Jakarta dan sekitarnya. Terintegrasi langsung dengan kawasan.", icon: Train, color: "#ef4444", image: "/gallery umum/stasiun metland telaga murni.jpg", status: "Operational (0 km)" },
  { id: "rs-hermina", name: "RS Hermina Metland", top: "50%", left: "25%", desc: "Fasilitas kesehatan lengkap standar nasional beroperasi 24 jam dengan fasilitas ICU dan IGD.", icon: Hospital, color: "#3b82f6", image: "/gallery umum/rumah sakit hermina.jpg", status: "Operational" },
  { id: "cbd-tod", name: "Area CBD & TOD", top: "58%", left: "78%", desc: "Sentra bisnis modern dengan traffic pengunjung tinggi yang terintegrasi dengan hunian dan stasiun.", icon: Building2, color: "#8b5cf6", image: "/gallery umum/area CBD & TOD Metland Cibitung.png", status: "Business Hub" },
  { id: "waterland", name: "Waterland Metland Cibitung", top: "34%", left: "70%", desc: "Wahana rekreasi air keluarga terbesar di kawasan, cocok untuk liburan akhir pekan bersama keluarga.", icon: MapPin, color: "#0ea5e9", image: "/gallery umum/waterland metland cibitung.jpg", status: "Recreation" },
  { id: "millenia", name: "Millenia City", top: "28%", left: "62%", desc: "Kawasan komersial premium yang terintegrasi, menawarkan pengalaman belanja dan rekreasi modern.", icon: Store, color: "#f59e0b", image: "/gallery umum/Millenia City.jpg", status: "Urban Center" },
  { id: "myzora", name: "Cluster Myzora", top: "37%", left: "83%", desc: "Cluster perumahan 2 lantai yang elegan dengan sirkulasi udara optimal dan desain modern tropis.", icon: Building2, color: "#10b981", image: "/gallery umum/Myzora 2 lantai.png", status: "Available" },
  { id: "alfamidi", name: "Alfamidi Super", top: "62%", left: "48%", desc: "Pusat komersial gaya hidup, kafe, dan supermarket untuk kebutuhan harian Anda.", icon: Store, color: "#f59e0b", image: "/gallery umum/alfamidi super.png", status: "Operational" },
];

export default function DiscoverMasterplan() {
  const [activePoint, setActivePoint] = useState(null);

  return (
    <section className="py-24 bg-dark-bg border-y border-white/5 relative overflow-hidden">
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-primary/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row gap-12 items-center mb-12">
          <div className="flex-1">
            <SectionReveal>
              <div className="flex items-center gap-3 mb-4 text-primary">
                <Map size={24} />
                <span className="font-semibold tracking-wider uppercase text-sm">Interactive Masterplan</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                Jelajahi Visi <br />
                <span className="text-gray-500">Masa Depan.</span>
              </h2>
            </SectionReveal>
          </div>
          <div className="flex-1">
            <SectionReveal delay={0.2}>
              <p className="text-gray-400 text-xl leading-relaxed">
                Navigasikan peta di bawah ini. <strong className="text-white">Klik pada titik lokasi</strong> (Pin) untuk mengungkap wujud nyata dan detail pengembangannya.
              </p>
            </SectionReveal>
          </div>
        </div>

        <SectionReveal delay={0.4}>
          <div className="relative w-full aspect-[4/3] md:aspect-[21/9] rounded-[2.5rem] overflow-hidden bg-black border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.6)]">
            
            <TransformWrapper
              initialScale={1}
              minScale={0.5}
              maxScale={4}
              centerOnInit={true}
              wheel={{ step: 0.1 }}
            >
              {({ zoomIn, zoomOut, resetTransform }) => (
                <>
                  {/* Zoom Controls */}
                  <div className="absolute top-8 right-8 z-30 flex flex-col gap-3 bg-black/60 p-3 rounded-2xl backdrop-blur-md border border-white/10">
                    <button onClick={() => zoomIn()} className="p-3 bg-white/5 rounded-xl hover:bg-white/20 text-white flex justify-center transition-colors shadow-sm"><Plus size={24} /></button>
                    <button onClick={() => zoomOut()} className="p-3 bg-white/5 rounded-xl hover:bg-white/20 text-white flex justify-center transition-colors shadow-sm"><Minus size={24} /></button>
                    <button onClick={() => resetTransform()} className="p-3 bg-white/5 rounded-xl hover:bg-white/20 text-white text-[11px] font-bold uppercase tracking-wider transition-colors">Reset</button>
                  </div>

                  <TransformComponent wrapperClass="!w-full !h-full" contentClass="!w-full !h-full">
                    <div className="relative w-[1200px] h-[800px] md:w-full md:h-full transition-all duration-1000 origin-center mx-auto">
                      
                      {/* Using the real drone masterplan image */}
                      <img 
                        src="/gallery umum/peta_kawasan_utama_1755437190_METLAND URBAN FOREST_Bird Eye View 01_REV 02.jpg" 
                        alt="Masterplan Map" 
                        className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${activePoint ? 'opacity-40 grayscale-[50%] blur-[2px]' : 'opacity-100'}`}
                        style={{ pointerEvents: 'none' }}
                      />
                      
                      {/* Interactive Pin Markers */}
                      <div className="absolute inset-0 z-20">
                        {points.map((point) => {
                          const isActive = activePoint?.id === point.id;
                          // If there is an active point, dim the others
                          const opacity = activePoint ? (isActive ? 1 : 0.3) : 1;

                          return (
                            <button
                              key={point.id}
                              onClick={() => setActivePoint(point)}
                              className="absolute transform -translate-x-1/2 -translate-y-1/2 group transition-all duration-500"
                              style={{ top: point.top, left: point.left, opacity }}
                            >
                              <div className="relative flex items-center justify-center">
                                {/* Ping Animation */}
                                {!activePoint && (
                                  <span className="absolute w-10 h-10 rounded-full opacity-60 animate-ping" style={{ backgroundColor: point.color }} />
                                )}
                                
                                {/* Pin Body */}
                                <div 
                                  className={`relative w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 shadow-xl border-2 ${isActive ? 'scale-125 z-30' : 'group-hover:scale-110 z-20 hover:z-30'}`}
                                  style={{ backgroundColor: point.color, borderColor: 'rgba(255,255,255,0.8)' }}
                                >
                                  <point.icon size={20} className="text-white" />
                                </div>
                                
                                {/* Label Bubble */}
                                <div className={`absolute top-full mt-3 left-1/2 -translate-x-1/2 px-4 py-2 rounded-xl bg-black/80 backdrop-blur-md border border-white/20 whitespace-nowrap transition-all duration-300 shadow-2xl ${
                                  isActive ? 'opacity-100 transform translate-y-0 scale-100' : 'opacity-0 transform -translate-y-2 scale-95 group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100'
                                }`}>
                                  <span className="text-white font-bold text-sm tracking-wide">{point.name}</span>
                                </div>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </TransformComponent>
                </>
              )}
            </TransformWrapper>

            {/* Hint overlay */}
            <div className={`absolute bottom-10 left-1/2 -translate-x-1/2 px-8 py-4 rounded-full bg-black/80 backdrop-blur-lg border border-white/20 text-sm text-gray-200 flex items-center gap-3 transition-opacity duration-300 z-30 shadow-2xl ${activePoint ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
              <Info size={20} className="text-primary animate-bounce" />
              Klik pada ikon lokasi untuk melihat foto asli area
            </div>

            {/* Side Panel Details (When Clicked) */}
            <AnimatePresence>
              {activePoint && (
                <motion.div 
                  initial={{ x: "100%", opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: "100%", opacity: 0 }}
                  transition={{ type: "spring", damping: 30, stiffness: 200 }}
                  className="absolute top-0 right-0 bottom-0 w-full md:w-[480px] bg-dark-card/95 backdrop-blur-2xl border-l border-white/10 z-40 flex flex-col shadow-[-30px_0_60px_rgba(0,0,0,0.8)]"
                >
                  <div className="h-[300px] relative shrink-0">
                    <img src={activePoint.image} alt={activePoint.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-card via-transparent to-transparent" />
                    <button onClick={() => setActivePoint(null)} className="absolute top-6 left-6 w-12 h-12 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-white hover:text-black backdrop-blur-md transition-colors border border-white/20 shadow-lg">
                      <X size={24} />
                    </button>
                  </div>

                  <div className="p-10 flex-1 overflow-y-auto">
                    <div className="flex items-center gap-5 mb-8">
                      <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-lg" style={{ backgroundColor: activePoint.color }}>
                        <activePoint.icon size={32} />
                      </div>
                      <div>
                        <h3 className="text-3xl font-bold text-white leading-tight mb-1">{activePoint.name}</h3>
                        <p className="text-sm font-bold uppercase tracking-wider" style={{ color: activePoint.color }}>{activePoint.status}</p>
                      </div>
                    </div>
                    
                    <p className="text-gray-300 text-lg leading-relaxed mb-10">{activePoint.desc}</p>
                    
                    <button className="w-full py-5 rounded-2xl font-bold text-white text-lg transition-all flex items-center justify-center gap-3 hover:opacity-90 shadow-[0_0_20px_rgba(0,0,0,0.5)] hover:scale-[1.02]" style={{ backgroundColor: activePoint.color }}>
                      Eksplorasi Area Ini <ArrowRight size={24} />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
