"use client";
import SectionReveal from "@/components/atoms/SectionReveal";
import { useState } from "react";
import { Train, Hospital, GraduationCap, ShoppingBag, MapPin, Navigation, Star, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const locations = [
  { 
    id: "station", 
    type: "transport", 
    name: "Stasiun KRL Telaga Murni", 
    distance: "0 km (Di dalam kawasan)", 
    time: "3 Menit berjalan kaki", 
    icon: Train, 
    rating: "4.8", 
    reviews: "120+", 
    desc: "Akses komuter line langsung menuju Jakarta dan sekitarnya. Terintegrasi langsung dengan kawasan.", 
    image: "/gallery umum/stasiun metland telaga murni.jpg", 
    position: { top: "45%", left: "30%" },
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Stasiun+KRL+Metland+Telaga+Murni"
  },
  { 
    id: "hospital", 
    type: "health", 
    name: "RS Hermina Metland Cibitung", 
    distance: "0 km (Di dalam kawasan)", 
    time: "2 Menit", 
    icon: Hospital, 
    rating: "4.9", 
    reviews: "340+", 
    desc: "Fasilitas kesehatan lengkap standar nasional beroperasi 24 jam dengan fasilitas ICU dan IGD.", 
    image: "/gallery umum/rumah sakit hermina.jpg", 
    position: { top: "60%", left: "45%" },
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=RS+Hermina+Metland+Cibitung"
  },
  { 
    id: "school", 
    type: "education", 
    name: "Sekolah Al-Azhar Cibitung", 
    distance: "0 km (Di dalam kawasan)", 
    time: "5 Menit berjalan kaki", 
    icon: GraduationCap, 
    rating: "4.7", 
    reviews: "85+", 
    desc: "Pusat pendidikan berkualitas dari tingkat dasar hingga menengah untuk putra-putri Anda.", 
    image: "/gallery umum/sekolah al azhar cibitung.jpeg", 
    position: { top: "35%", left: "55%" },
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Sekolah+Al-Azhar+Metland+Cibitung"
  },
  { 
    id: "mall", 
    type: "lifestyle", 
    name: "Area CBD & Alfamidi", 
    distance: "1 km", 
    time: "4 Menit berkendara", 
    icon: ShoppingBag, 
    rating: "4.6", 
    reviews: "210+", 
    desc: "Pusat komersial gaya hidup, kafe, dan supermarket untuk kebutuhan harian.", 
    image: "/gallery umum/alfamidi super.png", 
    position: { top: "70%", left: "70%" },
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Alfamidi+Super+Metland+Cibitung"
  },
  { 
    id: "hub", 
    type: "lifestyle", 
    name: "Millenia Hub", 
    distance: "1.5 km", 
    time: "5 Menit berkendara", 
    icon: ShoppingBag, 
    rating: "4.8", 
    reviews: "150+", 
    desc: "Kawasan komersial premium yang terintegrasi, menawarkan pengalaman belanja dan rekreasi modern.", 
    image: "/gallery umum/Millenia City.jpg", 
    position: { top: "80%", left: "55%" },
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Millenia+Hub"
  },
  { 
    id: "stasiun_cikarang", 
    type: "transport", 
    name: "Stasiun KRL Cikarang", 
    distance: "4.5 km", 
    time: "12 Menit berkendara", 
    icon: Train, 
    rating: "4.5", 
    reviews: "1000+", 
    desc: "Stasiun KRL utama Cikarang yang menghubungkan komuter langsung ke pusat Jakarta.", 
    image: "/gallery umum/stasiun cikarang.jpg", 
    position: { top: "30%", left: "20%" },
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Stasiun+KRL+Cikarang"
  },
  { 
    id: "waterland", 
    type: "recreation", 
    name: "Waterland Metland Cibitung", 
    distance: "0 km (Di dalam kawasan)", 
    time: "3 Menit", 
    icon: MapPin, 
    rating: "4.6", 
    reviews: "450+", 
    desc: "Wahana rekreasi air keluarga terbesar di kawasan, cocok untuk liburan akhir pekan.", 
    image: "/gallery umum/waterland metland cibitung.jpg", 
    position: { top: "50%", left: "65%" },
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Waterland+Metland+Cibitung"
  },
  { 
    id: "tol_gabus", 
    type: "transport", 
    name: "Gerbang Tol Gabus", 
    distance: "3.5 km", 
    time: "10 Menit berkendara", 
    icon: Navigation, 
    rating: "4.7", 
    reviews: "80+", 
    desc: "Akses gerbang tol terdekat yang terhubung langsung dengan Tol JORR 2 (Cibitung-Cilincing).", 
    image: "/gallery umum/gerbang tol gabuss.jpg", 
    position: { top: "15%", left: "45%" },
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Gerbang+Tol+Gabus"
  }
];

export default function DiscoverAreaMap() {
  const [activeLocation, setActiveLocation] = useState(locations[0]);
  const [isHovering, setIsHovering] = useState(false);

  return (
    <section className="py-24 bg-dark-bg relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/10 blur-[150px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <SectionReveal>
            <div className="flex items-center justify-center gap-3 mb-4 text-emerald-400">
              <Navigation size={24} />
              <span className="font-semibold tracking-wider uppercase text-sm">Konektivitas Maksimal</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Hidup Lebih Dekat dengan <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-200">Segalanya</span>
            </h2>
          </SectionReveal>
          <SectionReveal delay={0.2}>
            <p className="text-gray-400 text-lg leading-relaxed">
              Tak perlu menghabiskan waktu di jalan. Fasilitas pendidikan, kesehatan, hingga transportasi publik kelas satu berada di dalam lingkungan Anda.
            </p>
          </SectionReveal>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Interactive Map Area */}
          <SectionReveal delay={0.4} className="flex-[2] relative aspect-square lg:aspect-auto lg:h-[650px] rounded-[2.5rem] overflow-hidden bg-dark-card border border-white/5 shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80" 
              alt="Peta Area" 
              className="absolute inset-0 w-full h-full object-cover opacity-20 grayscale brightness-50"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-transparent to-transparent" />
            
            {/* Markers */}
            {locations.map((loc) => (
              <button
                key={loc.id}
                onClick={() => setActiveLocation(loc)}
                onMouseEnter={() => { setActiveLocation(loc); setIsHovering(true); }}
                onMouseLeave={() => setIsHovering(false)}
                className="absolute z-20 group transform -translate-x-1/2 -translate-y-1/2"
                style={{ top: loc.position.top, left: loc.position.left }}
              >
                <div className={`relative flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full transition-all duration-300 ${
                  activeLocation.id === loc.id 
                  ? 'bg-primary text-dark-bg scale-110 shadow-[0_0_30px_rgba(52,211,153,0.6)]' 
                  : 'bg-dark-card border-2 border-white/20 text-white hover:border-primary hover:text-primary backdrop-blur-sm'
                }`}>
                  <loc.icon size={24} className="md:w-7 md:h-7" />
                  
                  {/* Ping Animation for Active */}
                  {activeLocation.id === loc.id && (
                    <span className="absolute w-full h-full rounded-full bg-primary opacity-50 animate-ping" />
                  )}
                </div>
                <div className={`absolute top-full mt-3 left-1/2 -translate-x-1/2 px-4 py-2 rounded-xl bg-black/80 backdrop-blur-md border border-white/10 whitespace-nowrap transition-all duration-300 ${
                  activeLocation.id === loc.id ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform -translate-y-4 pointer-events-none'
                }`}>
                  <span className="text-white font-semibold text-sm">{loc.name}</span>
                </div>
              </button>
            ))}
          </SectionReveal>

          {/* Real Photo Detail Card */}
          <SectionReveal delay={0.6} className="flex-[1] flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeLocation.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="bg-gradient-to-br from-dark-card to-black p-1 rounded-[2.5rem] border border-white/5 shadow-2xl overflow-hidden relative group"
              >
                {/* Glow effect inside card */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                <div className="relative h-[250px] md:h-[280px] rounded-[2rem] overflow-hidden m-2">
                  <img src={activeLocation.image} alt={activeLocation.name} className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                  
                  <div className="absolute top-4 right-4 px-3 py-1.5 bg-black/60 backdrop-blur-md rounded-full border border-white/10 flex items-center gap-2">
                    <Star size={14} className="text-yellow-400 fill-yellow-400" />
                    <span className="text-white font-bold text-sm">{activeLocation.rating}</span>
                  </div>
                </div>

                <div className="p-8 relative z-10">
                  <div className="flex items-center gap-3 text-primary mb-3 text-sm font-bold uppercase tracking-wider">
                    <activeLocation.icon size={18} />
                    <span>{activeLocation.type}</span>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-2 leading-tight">{activeLocation.name}</h3>
                  <p className="text-gray-400 text-sm mb-6 leading-relaxed min-h-[60px]">{activeLocation.desc}</p>
                  
                  <div className="space-y-4 bg-white/5 p-5 rounded-2xl border border-white/5">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400 text-sm">Jarak Tempuh</span>
                      <span className="text-white font-semibold">{activeLocation.distance}</span>
                    </div>
                    <div className="w-full h-px bg-white/10" />
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400 text-sm">Waktu Estimasi</span>
                      <span className="text-emerald-400 font-bold">{activeLocation.time}</span>
                    </div>
                  </div>

                  <a 
                    href={activeLocation.mapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full mt-6 py-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white hover:text-black text-white font-bold transition-all duration-300 flex items-center justify-center gap-2 group/btn relative overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      Buka di Google Maps <ArrowUpRight size={18} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                    </span>
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}
