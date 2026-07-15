"use client";
import SectionReveal from "@/components/atoms/SectionReveal";
import { ChevronDown, X, Map } from "lucide-react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const timeline = [
  { year: "2023", title: "Cluster Avesa Garden", desc: "Peresmian Cluster Avesa Garden yang menjadi pionir standar hunian modern tropis di kawasan, mendapat sambutan luar biasa dari masyarakat.", active: false },
  { year: "2024", title: "Pengembangan Infrastruktur", desc: "Penyelesaian akses langsung tol dan operasional Stasiun Telaga Murni. Memudahkan mobilitas tanpa batas menuju Jakarta.", active: true },
  { year: "2025", title: "CBD & Komersial Area", desc: "Pembukaan sentra bisnis Ruko Easton & Weston yang akan menjadi jantung ekonomi baru di Cikarang.", active: false },
  { year: "2026", title: "Fasilitas Edukasi & Kesehatan", desc: "Ekspansi RS Hermina dengan fasilitas berstandar internasional dan peresmian gedung Sekolah Al-Azhar yang baru.", active: false },
  { year: "2030", title: "Smart Eco-City Terpadu", desc: "Integrasi teknologi pintar dan ekosistem alam sebagai standar hidup baru. Kawasan yang mandiri dan berkelanjutan.", active: false }
];

export default function DiscoverFutureGrowth() {
  const containerRef = useRef(null);
  const [activeItem, setActiveItem] = useState(null);
  
  // Height is 250vh to allow plenty of scrolling space.
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const xTransform = useTransform(scrollYProgress, [0, 1], ["0%", "-65%"]);

  // Lock body scroll when modal is active
  useEffect(() => {
    if (activeItem) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [activeItem]);

  return (
    <section ref={containerRef} className="h-[250vh] bg-gradient-to-b from-dark-bg to-black relative">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.02] pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-emerald-900/10 blur-[150px] rounded-full pointer-events-none" />
      
      {/* 
        Sticky container.
        Added pt-32 to give ample space for the title so it's never cut off on any screen size.
      */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden pt-32 pb-16">
        
        <div className="container mx-auto px-6 mb-16 shrink-0 z-10">
          <SectionReveal>
            <div className="flex items-center gap-3 mb-4 text-emerald-400">
              <Map size={24} />
              <span className="font-semibold tracking-wider uppercase text-sm">Roadmap Kawasan</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight pb-2">
              Berkembang Bersama <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-emerald-200 to-emerald-500">Masa Depan Anda</span>
            </h2>
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl">
              Nilai investasi yang tidak pernah berhenti bertumbuh. Klik pada tiap fase tahun untuk melihat detail perjalanan pengembangan visi kami.
            </p>
          </SectionReveal>
        </div>

        <div className="pl-6 md:pl-[max(1.5rem,calc((100vw-1200px)/2))] relative z-10">
          <motion.div style={{ x: xTransform }} className="flex items-center gap-12 w-max pr-12 pb-8 relative">
            
            {/* The Connecting Glowing Line */}
            <div className="absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-emerald-900 via-primary to-emerald-900 -translate-y-1/2 rounded-full opacity-50 shadow-[0_0_15px_rgba(52,211,153,0.8)]" />

            {timeline.map((item, index) => {
              return (
                <motion.div 
                  key={index}
                  layoutId={`card-${index}`}
                  onClick={() => setActiveItem(item)}
                  className="w-[280px] md:w-[320px] shrink-0 p-8 rounded-3xl bg-dark-card border border-white/10 hover:border-primary/50 transition-colors cursor-pointer relative z-10 hover:shadow-[0_0_30px_rgba(52,211,153,0.3)] group"
                >
                  <div className="text-5xl font-black mb-4 text-gray-700 group-hover:text-primary transition-colors">
                    {item.year}
                  </div>
                  <h3 className="text-xl font-bold text-gray-300 group-hover:text-white transition-colors">
                    {item.title}
                  </h3>
                  <div className="mt-6 flex items-center text-primary text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                    Lihat Detail <ChevronDown size={16} className="ml-2 -rotate-90" />
                  </div>
                </motion.div>
              );
            })}

            {/* End of Timeline CTA */}
            <div className="shrink-0 flex items-center justify-center p-8 w-[250px] md:w-[350px]">
              <div className="flex flex-col items-center justify-center text-center">
                <ChevronDown size={48} className="text-primary animate-bounce mb-6 border border-primary/50 rounded-full p-2 bg-primary/10" />
                <p className="text-white text-xl md:text-2xl font-bold leading-relaxed">
                  Ini kan yang Anda inginkan? <br/>
                  <span className="text-emerald-400">Naik Kelas.</span>
                </p>
              </div>
            </div>

          </motion.div>
        </div>
      </div>

      {/* Centered Modal using AnimatePresence */}
      <AnimatePresence>
        {activeItem && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveItem(null)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100]"
            />
            <div className="fixed inset-0 flex items-center justify-center z-[110] p-6 pointer-events-none">
              <motion.div 
                layoutId={`card-${timeline.findIndex(t => t.year === activeItem.year)}`}
                className="w-full max-w-2xl bg-gradient-to-br from-dark-card to-black p-10 md:p-16 rounded-[3rem] border border-white/20 shadow-[0_0_100px_rgba(0,0,0,0.8)] pointer-events-auto relative overflow-hidden"
              >
                {/* Modal Glow */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[100px] rounded-full pointer-events-none" />

                <button 
                  onClick={() => setActiveItem(null)}
                  className="absolute top-8 right-8 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors border border-white/10"
                >
                  <X size={24} />
                </button>

                <div className="text-7xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-br from-emerald-300 to-primary drop-shadow-2xl mb-6">
                  {activeItem.year}
                </div>
                <h3 className="text-3xl md:text-5xl font-bold text-white mb-8 leading-tight">
                  {activeItem.title}
                </h3>
                <div className="w-20 h-1 bg-primary mb-8 rounded-full" />
                <p className="text-xl md:text-2xl text-gray-300 leading-relaxed max-w-xl">
                  {activeItem.desc}
                </p>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>

    </section>
  );
}
