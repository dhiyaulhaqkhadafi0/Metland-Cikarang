"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Train, ShoppingBag, Hospital, GraduationCap, Waves, Building2, User, Search, ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const POIS = [
  { id: "station", label: "Stasiun Metland Telaga Murni", icon: Train, x: 20, y: 70, type: "transport", radius: "5 menit jalan kaki", url: "https://www.google.com/maps/search/?api=1&query=Stasiun+Metland+Telaga+Murni" },
  { id: "cbd", label: "CBD & Millenia City", icon: Building2, x: 45, y: 50, type: "commercial", radius: "Pusat gaya hidup", url: "https://www.google.com/maps/search/?api=1&query=Millenia+City+Cibitung" },
  { id: "hospital", label: "RS Hermina", icon: Hospital, x: 60, y: 65, type: "health", radius: "Fasilitas kesehatan premium", url: "https://www.google.com/maps/search/?api=1&query=RS+Hermina+Metland+Cibitung" },
  { id: "school", label: "Sekolah Al-Azhar", icon: GraduationCap, x: 50, y: 30, type: "education", radius: "Pendidikan terbaik", url: "https://www.google.com/maps/search/?api=1&query=Al-Azhar+Metland+Cibitung" },
  { id: "waterland", label: "Waterland", icon: Waves, x: 75, y: 40, type: "recreation", radius: "Rekreasi keluarga", url: "https://www.google.com/maps/search/?api=1&query=Waterland+Metland+Cibitung" },
  { id: "cluster", label: "Cluster Premium", icon: MapPin, x: 30, y: 35, type: "residential", radius: "Myzora, Derora, dll", url: "/clusters/brassia" },
];

const PERSONAS = [
  { 
    id: "family", 
    label: "Keluarga Baru", 
    icon: User, 
    desc: "Butuh fasilitas lengkap untuk masa depan anak.", 
    benefit: "Hemat waktu antar-jemput anak. Dekat RS Hermina untuk kondisi darurat, Sekolah Al-Azhar di dalam kawasan, dan Waterland untuk liburan hemat.",
    highlights: ["school", "hospital", "waterland", "cluster"] 
  },
  { 
    id: "worker", 
    label: "Pekerja Jakarta", 
    icon: Train, 
    desc: "Mobilitas tinggi ke pusat kota tiap hari.", 
    benefit: "Anti macet ke kantor! Terintegrasi TOD Stasiun Metland Telaga Murni & Stasiun Cikarang. Jembatan baru (2026) pangkas waktu tempuh drastis.",
    highlights: ["station", "cbd", "cluster"] 
  },
  { 
    id: "investor", 
    label: "Investor & Pebisnis", 
    icon: Building2, 
    desc: "Fokus pada capital gain dan nilai komersial.", 
    benefit: "Sinergi Metland Cibitung & Cikarang menghidupkan CBD (Ruko Easton & Weston). Kenaikan aset konstan seiring progres Millenia City Mall.",
    highlights: ["cbd", "station", "cluster"] 
  },
];

export default function InteractiveMasterplan() {
  const [activePersona, setActivePersona] = useState(null);
  const [customPersona, setCustomPersona] = useState("");
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [hoveredPOI, setHoveredPOI] = useState(null);

  const activeHighlights = activePersona === "custom" 
    ? ["station", "school", "cbd", "hospital", "cluster"] 
    : (PERSONAS.find(p => p.id === activePersona)?.highlights || []);

  const handlePersonaClick = (id) => {
    if (id === "custom") {
      setShowCustomInput(true);
      setActivePersona(null);
    } else {
      setShowCustomInput(false);
      setActivePersona(id);
    }
  };

  const handleCustomSubmit = (e) => {
    e.preventDefault();
    if (customPersona) {
      setActivePersona("custom");
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start w-full">
      
      {/* Left Panel: Lifestyle Explorer */}
      <div className="w-full lg:w-1/3 flex flex-col gap-6">
        <div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2 tracking-tight">Township Masterplan</h2>
          <p className="text-gray-400">Pilih profil Anda untuk melihat fasilitas mana yang paling relevan dengan gaya hidup Anda.</p>
        </div>

        <div className="flex flex-col gap-3">
          {PERSONAS.map(p => {
            const isActive = activePersona === p.id;
            return (
              <button 
                key={p.id}
                onClick={() => handlePersonaClick(p.id)}
                className={`p-5 rounded-2xl border text-left transition-all duration-300 flex flex-col gap-3 ${
                  isActive 
                    ? "bg-emerald-500/10 border-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.15)]" 
                    : "bg-[#111113] border-white/5 hover:border-white/20"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`p-2 rounded-lg ${isActive ? "bg-emerald-500/20 text-emerald-400" : "bg-white/5 text-gray-400"}`}>
                    <p.icon size={20} />
                  </div>
                  <div>
                    <h4 className={`font-bold ${isActive ? "text-white" : "text-gray-300"}`}>{p.label}</h4>
                    <p className="text-xs text-gray-500 mt-1 leading-relaxed">{p.desc}</p>
                  </div>
                </div>
                
                {/* Expand Benefit */}
                {isActive && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }} 
                    animate={{ opacity: 1, height: "auto" }} 
                    className="pt-3 border-t border-emerald-500/20"
                  >
                    <p className="text-sm text-emerald-100/90 leading-relaxed font-light">{p.benefit}</p>
                  </motion.div>
                )}
              </button>
            );
          })}

          {/* Custom Persona */}
          {!showCustomInput ? (
            <button 
              onClick={() => handlePersonaClick("custom")}
              className="p-5 rounded-2xl border border-white/5 bg-[#111113] hover:border-white/20 text-left transition-all duration-300 flex items-center gap-4"
            >
              <div className="p-2 rounded-lg bg-white/5 text-gray-400">
                <Search size={20} />
              </div>
              <div>
                <h4 className="font-bold text-gray-300">Lainnya...</h4>
                <p className="text-xs text-gray-500 mt-1">Cari berdasarkan preferensi spesifik Anda.</p>
              </div>
            </button>
          ) : (
            <form onSubmit={handleCustomSubmit} className="p-5 rounded-2xl border border-emerald-500/50 bg-[#111113] flex flex-col gap-3 animate-fade-in shadow-[0_0_20px_rgba(16,185,129,0.1)]">
              <label className="text-sm font-bold text-white">Profil Anda</label>
              <input 
                autoFocus
                type="text" 
                value={customPersona}
                onChange={e => setCustomPersona(e.target.value)}
                placeholder="Misal: Saya suka kuliner..." 
                className="bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors"
              />
              <div className="flex justify-end gap-2 mt-2">
                <button type="button" onClick={() => setShowCustomInput(false)} className="px-4 py-2 text-xs font-bold text-gray-500 hover:text-white transition-colors">Batal</button>
                <button type="submit" disabled={!customPersona} className="px-5 py-2 text-xs font-bold bg-white text-black rounded-lg disabled:opacity-50">Terapkan</button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* Right Panel: Interactive Map */}
      <div className="w-full lg:w-2/3 relative rounded-3xl overflow-hidden border border-white/10 bg-[#111113] group shadow-2xl">
        <div className="relative w-full aspect-[4/3] sm:aspect-video">
          <Image 
            src="/gallery umum/peta_kawasan_utama_1755437190_METLAND URBAN FOREST_Bird Eye View 01_REV 02.jpg"
            alt="Masterplan Metland Cikarang"
            fill
            className="object-cover transition-transform duration-[10s] group-hover:scale-105 opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0b] via-transparent to-transparent opacity-60 pointer-events-none" />

          {/* POI Pins */}
          {POIS.map(poi => {
            const isHighlighted = activeHighlights.length === 0 || activeHighlights.includes(poi.id);
            const isHovered = hoveredPOI === poi.id;

            return (
              <div 
                key={poi.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20"
                style={{ left: `${poi.x}%`, top: `${poi.y}%` }}
                onMouseEnter={() => setHoveredPOI(poi.id)}
                onMouseLeave={() => setHoveredPOI(null)}
              >
                {/* Pulse ring when highlighted */}
                {isHighlighted && activeHighlights.length > 0 && (
                  <div className="absolute inset-0 m-auto w-12 h-12 bg-emerald-500/20 rounded-full animate-ping pointer-events-none" />
                )}
                
                {/* Pin Icon wrapped in Link */}
                <Link 
                  href={poi.url}
                  target={poi.url.startsWith("http") ? "_blank" : "_self"}
                  className={`relative flex items-center justify-center w-10 h-10 rounded-full cursor-pointer transition-all duration-300 shadow-xl backdrop-blur-md border ${
                    isHighlighted 
                      ? "bg-emerald-500/90 text-white border-emerald-300 hover:scale-110 shadow-[0_0_15px_rgba(16,185,129,0.5)]" 
                      : "bg-black/50 text-gray-400 border-white/20 hover:bg-white/10"
                  }`}
                >
                  <poi.icon size={18} />
                </Link>

                {/* Tooltip */}
                <AnimatePresence>
                  {(isHovered || (isHighlighted && activeHighlights.length > 0)) && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="absolute left-1/2 -translate-x-1/2 mt-3 w-56 bg-black/90 backdrop-blur-xl border border-white/10 rounded-xl p-3 pointer-events-none shadow-2xl z-50 flex items-center justify-between gap-3"
                    >
                      <div>
                        <h5 className="text-white font-bold text-sm mb-1">{poi.label}</h5>
                        <p className="text-emerald-400 text-xs font-medium">{poi.radius}</p>
                      </div>
                      <ExternalLink className="text-gray-500 w-4 h-4 shrink-0" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
