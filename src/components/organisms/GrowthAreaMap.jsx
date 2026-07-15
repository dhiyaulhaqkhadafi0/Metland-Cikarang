"use client";

import { useState } from "react";
import { MapPin, Navigation, Train, Building, GraduationCap, Hospital, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const investmentLocations = [
  {
    id: "mm2100",
    name: "Kawasan Industri MM2100 & Jababeka",
    distance: "15 Menit berkendara",
    desc: "Kawasan industri terbesar yang menjadi captive market penyewaan hunian & ruko.",
    icon: Building,
    image: "/gallery umum/area CBD & TOD Metland Cibitung.png",
    position: { top: "20%", left: "70%" },
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Kawasan+Industri+MM2100"
  },
  {
    id: "stasiun",
    name: "Stasiun KRL Telaga Murni",
    distance: "5-10 Menit",
    desc: "Akses komuter line langsung menuju Jakarta. Nilai tambah yang sangat tinggi untuk properti.",
    icon: Train,
    image: "/gallery umum/stasiun metland telaga murni.jpg",
    position: { top: "45%", left: "30%" },
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Stasiun+KRL+Metland+Telaga+Murni"
  },
  {
    id: "rs",
    name: "RS Hermina",
    distance: "5-10 Menit",
    desc: "Fasilitas kesehatan premium yang meningkatkan kualitas hidup penghuni.",
    icon: Hospital,
    image: "/gallery umum/rumah sakit hermina.jpg",
    position: { top: "60%", left: "45%" },
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=RS+Hermina+Metland+Cibitung"
  },
  {
    id: "sekolah",
    name: "Area Edukasi Terpadu",
    distance: "Di dalam kawasan",
    desc: "Fasilitas pendidikan unggulan (Al-Azhar) yang menarik profil keluarga muda mapan.",
    icon: GraduationCap,
    image: "/gallery umum/sekolah al azhar cibitung.jpeg",
    position: { top: "35%", left: "55%" },
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Sekolah+Al-Azhar+Metland+Cibitung"
  },
  {
    id: "cbd",
    name: "Pusat Perbelanjaan & CBD",
    distance: "Terkoneksi",
    desc: "Area komersial pendukung yang akan mendongkrak capital gain secara signifikan.",
    icon: Navigation,
    image: "/gallery umum/Millenia City.jpg",
    position: { top: "70%", left: "70%" },
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Millenia+Hub"
  }
];

export default function GrowthAreaMap() {
  const [activeLocation, setActiveLocation] = useState(investmentLocations[0]);
  const [isHovering, setIsHovering] = useState(false);

  return (
    <section className="py-24 bg-[#0a0f1a] relative border-t border-border overflow-hidden">
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/10 blur-[150px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Text Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center space-x-2 text-primary font-semibold tracking-wider uppercase mb-4"
            >
              <MapPin className="w-5 h-5" />
              <span>Growth Area</span>
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-5xl font-title font-bold text-light-text mb-6"
            >
              Kawasan Strategis,<br/>Akses Tanpa Batas
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-gray-text text-lg mb-8"
            >
              Investasi di Metland Cikarang berarti Anda berinvestasi di pusat pertumbuhan infrastruktur. Dikelilingi fasilitas kelas satu dan kemudahan akses ke seluruh penjuru kota.
            </motion.p>

            {/* POI List */}
            <div className="space-y-4">
              {investmentLocations.map((loc, idx) => (
                <motion.div
                  key={loc.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + idx * 0.1 }}
                  onMouseEnter={() => {
                    setActiveLocation(loc);
                    setIsHovering(true);
                  }}
                  onMouseLeave={() => setIsHovering(false)}
                  onClick={() => setActiveLocation(loc)}
                  className={`flex items-start p-4 rounded-xl cursor-pointer transition-all border group ${activeLocation.id === loc.id ? 'bg-primary/10 border-primary shadow-emerald-glow scale-[1.02]' : 'bg-dark-card border-border hover:border-white/20 hover:bg-white/5'}`}
                >
                  <div className={`p-3 rounded-lg mr-4 shrink-0 transition-colors ${activeLocation.id === loc.id ? 'bg-primary text-white' : 'bg-white/5 text-gray-text group-hover:text-primary'}`}>
                    <loc.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <h4 className={`font-bold text-lg transition-colors ${activeLocation.id === loc.id ? 'text-primary' : 'text-light-text group-hover:text-white'}`}>{loc.name}</h4>
                      <span className="text-xs font-semibold px-2 py-1 bg-white/10 rounded-full text-white">{loc.distance}</span>
                    </div>
                    <p className="text-sm text-gray-text leading-relaxed">{loc.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Interactive Map Block */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="relative aspect-square lg:aspect-auto lg:h-[650px] rounded-[2.5rem] overflow-hidden bg-dark-card border border-white/5 shadow-2xl group"
          >
            {/* Map Base Image */}
            <div className="absolute inset-0 bg-[#060913] z-0" />
            
            <AnimatePresence mode="wait">
              <motion.img 
                key={activeLocation.id}
                src={activeLocation.image}
                alt={activeLocation.name}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 0.4, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 w-full h-full object-cover mix-blend-luminosity z-10 transition-transform duration-700 group-hover:scale-105"
              />
            </AnimatePresence>
            
            {/* Grid Overlay */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10 z-20 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-dark-bg/50 to-transparent z-20 pointer-events-none" />

            {/* Location Markers */}
            <div className="absolute inset-0 z-30 p-8">
              {investmentLocations.map((loc) => (
                <div
                  key={`marker-${loc.id}`}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                  style={loc.position}
                  onMouseEnter={() => {
                    setActiveLocation(loc);
                    setIsHovering(true);
                  }}
                  onMouseLeave={() => setIsHovering(false)}
                >
                  <div className="relative group/marker">
                    {activeLocation.id === loc.id && (
                      <motion.div 
                        layoutId="activeMapPulse"
                        className="absolute inset-0 bg-primary/40 rounded-full animate-ping"
                        style={{ width: '3rem', height: '3rem', top: '-0.5rem', left: '-0.5rem' }}
                      />
                    )}
                    <div className={`relative w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-300 shadow-lg ${activeLocation.id === loc.id ? 'bg-primary border-white scale-125 z-10' : 'bg-dark-card border-primary/50 text-primary hover:bg-primary/20 hover:scale-110'}`}>
                      <loc.icon size={14} className={activeLocation.id === loc.id ? 'text-white' : 'text-primary'} />
                    </div>
                    
                    {/* Tooltip */}
                    <div className={`absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-1.5 bg-white text-dark-bg text-xs font-bold rounded-lg shadow-xl whitespace-nowrap transition-all duration-300 ${activeLocation.id === loc.id ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'}`}>
                      {loc.name}
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-b-white" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Info Panel Overlay */}
            <AnimatePresence>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute bottom-6 left-6 right-6 z-40 bg-dark-card/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl"
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                      <activeLocation.icon size={20} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">{activeLocation.name}</h3>
                      <div className="flex items-center text-sm text-emerald-400 mt-1 font-medium">
                        <Navigation size={14} className="mr-1" /> {activeLocation.distance}
                      </div>
                    </div>
                  </div>
                  <a 
                    href={activeLocation.mapsUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-primary/20 text-white rounded-xl transition-all text-sm font-medium border border-white/10 hover:border-primary/30 group/btn"
                  >
                    Buka Map <ArrowUpRight size={16} className="group-hover/btn:rotate-45 transition-transform" />
                  </a>
                </div>
                <p className="text-gray-400 text-sm mt-4 leading-relaxed line-clamp-2">
                  {activeLocation.desc}
                </p>
              </motion.div>
            </AnimatePresence>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
