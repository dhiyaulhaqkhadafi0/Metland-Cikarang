"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import SectionReveal from "@/components/atoms/SectionReveal";

export default function DiscoverHero() {
  const containerRef = useRef(null);
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "80%"]);

  return (
    <section 
      ref={containerRef}
      className="relative h-screen min-h-[800px] flex items-center justify-center overflow-hidden bg-black"
    >
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes pan-image {
          0% { transform: scale(1.1) translate(0, 0); }
          50% { transform: scale(1.15) translate(-2%, 2%); }
          100% { transform: scale(1.1) translate(0, 0); }
        }
        @keyframes fog-drift {
          0% { transform: translateX(0) scale(2); opacity: 0.2; }
          50% { transform: translateX(-10%) scale(2); opacity: 0.4; }
          100% { transform: translateX(0) scale(2); opacity: 0.2; }
        }
      `}} />

      {/* Background Image with Cinematic Pan & Zoom */}
      <motion.div 
        style={{ y, opacity }}
        className="absolute inset-0 z-0 origin-center"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-dark-bg z-10 pointer-events-none" />
        
        {/* Fog Overlay Bottom */}
        <div className="absolute bottom-0 left-0 w-full h-2/3 bg-gradient-to-t from-dark-bg via-dark-bg/80 to-transparent z-20 pointer-events-none" />

        {/* Dynamic Fog Animation (CSS) */}
        <div className="absolute inset-0 z-[15] mix-blend-screen bg-repeat pointer-events-none"
             style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/stardust.png")', animation: 'fog-drift 40s ease-in-out infinite' }} />

        {/* Use the local drone image for high quality context */}
        <img 
          src="/galllery umum/peta_kawasan_utama_1755437190_METLAND URBAN FOREST_Bird Eye View 01_REV 02.jpg" 
          alt="Metland Cikarang"
          className="w-full h-full object-cover opacity-60"
          style={{ animation: 'pan-image 40s ease-in-out infinite' }}
        />
      </motion.div>

      {/* Floating Particles (Rendered only on client to avoid hydration mismatch) */}
      {mounted && (
        <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              initial={{
                y: "100vh",
                x: `${Math.random() * 100}vw`,
                opacity: 0,
                scale: Math.random() * 0.5 + 0.5
              }}
              animate={{
                y: "-10vh",
                opacity: [0, 0.8, 0],
                x: `${Math.random() * 100}vw`
              }}
              transition={{
                duration: Math.random() * 15 + 20,
                repeat: Infinity,
                ease: "linear",
                delay: Math.random() * 15
              }}
              className="absolute w-1.5 h-1.5 rounded-full bg-emerald-400/50 shadow-[0_0_10px_rgba(52,211,153,0.5)] blur-[1px]"
            />
          ))}
        </div>
      )}

      {/* Content */}
      <motion.div 
        style={{ y: textY }}
        className="relative z-30 container mx-auto px-6 flex flex-col items-center text-center mt-20"
      >
        <SectionReveal delay={0.2}>
          <div className="inline-block px-6 py-2.5 rounded-full border border-white/20 bg-black/40 text-gray-300 font-semibold text-xs md:text-sm tracking-[0.3em] mb-8 backdrop-blur-md">
            METLAND CIKARANG
          </div>
        </SectionReveal>
        
        <SectionReveal delay={0.6}>
          {/* Added pb-4 to prevent clipping of descenders like 'p' in 'Masa Depan' */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-white mb-6 tracking-tight leading-[1.1] max-w-5xl pb-4" style={{ textShadow: "0 10px 40px rgba(0,0,0,0.8)" }}>
            Lebih dari Sekadar Hunian. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-100 via-primary to-emerald-400">
              Sebuah Ekosistem Masa Depan.
            </span>
          </h1>
        </SectionReveal>

        <SectionReveal delay={1}>
          <p className="text-lg md:text-2xl text-gray-300 max-w-3xl mx-auto font-light leading-relaxed drop-shadow-lg">
            Harmoni sempurna antara kehidupan urban dinamis dan ketenangan alam.
          </p>
        </SectionReveal>
      </motion.div>

      {/* Animated Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-3"
      >
        <span className="text-[10px] text-gray-400 tracking-[0.3em] uppercase font-semibold">Mulai Perjalanan</span>
        <div className="w-[1px] h-16 bg-white/20 relative overflow-hidden">
          <motion.div 
            animate={{ y: [-64, 64] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            className="w-full h-1/2 bg-gradient-to-b from-transparent via-primary to-transparent"
          />
        </div>
      </motion.div>
    </section>
  );
}
