"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Home, TrendingUp, Users, Briefcase, Play, MessageSquareText } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const journeys = [
  { id: "first-home", icon: Home, title: "Rumah Pertama", desc: "Temukan rumah ideal untuk memulai kehidupan baru Anda." },
  { id: "investment", icon: TrendingUp, title: "Investasi", desc: "Pilih properti terbaik untuk masa depan dan keuntungan Anda." },
  { id: "family", icon: Users, title: "Untuk Keluarga", desc: "Wujudkan lingkungan ideal bagi keluarga tercinta." },
  { id: "business", icon: Briefcase, title: "Buka Usaha", desc: "Temukan lokasi strategis untuk bisnis dan pertumbuhan Anda." },
];

export default function HeroSection() {
  const [wordIndex, setWordIndex] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const words = ["Hunian.", "Investasi.", "Masa Depan.", "Aset.", "Kebanggaan."];

  useEffect(() => {
    setIsMounted(true);
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-start overflow-hidden pt-20">
      
      {/* Background Image */}
      <div className="absolute inset-0 z-0 bg-dark-bg">
        <img 
          src="/gallery umum/peta_kawasan_utama_1755437190_METLAND URBAN FOREST_Bird Eye View 01_REV 02.jpg"
          alt="Metland Urban Forest Drone View"
          className="w-full h-full object-cover object-center opacity-70"
        />
        {/* Gradient overlays to ensure text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-dark-bg via-dark-bg/80 to-transparent w-full md:w-[70%]" />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-transparent to-transparent opacity-80" />
      </div>

      {/* Elegant Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
        {isMounted && [...Array(40)].map((_, i) => {
          const isEmerald = i % 2 === 0;
          return (
            <motion.div
              key={`particle-${i}`}
              className={cn(
                "absolute rounded-full blur-[1px]",
                isEmerald ? "bg-emerald-400/80 shadow-[0_0_15px_rgba(52,211,118,0.8)]" : "bg-amber-400/80 shadow-[0_0_15px_rgba(251,191,36,0.8)]"
              )}
              style={{
                width: Math.random() * 6 + 3 + "px",
                height: Math.random() * 6 + 3 + "px",
                top: Math.random() * 100 + "%",
                left: Math.random() * 100 + "%",
              }}
              animate={{
                y: [0, Math.random() * -100 - 50, 0],
                x: [0, Math.random() * 60 - 30, 0],
                opacity: [0, 1, 0],
                scale: [0.8, 1.8, 0.8],
              }}
              transition={{
                duration: Math.random() * 8 + 7,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 5,
              }}
            />
          );
        })}
      </div>

      <div className="container relative z-10 px-6 md:px-12 w-full pt-12 md:pt-24 pb-20">
        <div className="max-w-4xl relative z-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mb-8 inline-flex items-center gap-2 rounded-full bg-black/40 border border-white/10 px-4 py-2 backdrop-blur-md shadow-lg"
          >
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-sm font-medium tracking-wide text-gray-200">Tahap 2 Kini Dibuka</span>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.1, delayChildren: 0.1 }
              }
            }}
            className="mb-8"
          >
            <h1 className="font-title text-[3.5rem] md:text-7xl lg:text-[6rem] font-bold tracking-tight text-white leading-[1.05]">
              <motion.span 
                className="block text-white"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
                }}
              >
                Lebih Dari Sekadar
              </motion.span>
              <div className="h-[1.1em] relative overflow-hidden my-2">
                <AnimatePresence mode="popLayout">
                  <motion.span
                    key={wordIndex}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -40 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0 text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-amber-500 font-extrabold"
                  >
                    {words[wordIndex]}
                  </motion.span>
                </AnimatePresence>
              </div>
              <motion.span 
                className="block text-[#00E599]"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 } }
                }}
              >
                Ini Adalah Visi Anda.
              </motion.span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="text-base md:text-lg text-gray-300 mb-12 max-w-2xl leading-relaxed"
          >
            Pilih tujuan Anda dan biarkan sistem cerdas kami menyusun perjalanan properti yang paling relevan untuk hidup dan investasi Anda.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center gap-6 mb-24"
          >
            <Link href="/discover" className="bg-[#00E599] hover:bg-emerald-500 text-dark-bg px-8 py-4 rounded-full font-bold flex items-center gap-2 transition-all hover:scale-105 shadow-[0_0_20px_rgba(0,229,153,0.3)]">
              Mulai Jelajahi <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/smi" className="bg-dark-card border border-[#00E599] text-[#00E599] hover:bg-[#00E599]/10 px-8 py-4 rounded-full font-bold flex items-center gap-2 transition-all hover:scale-105 shadow-emerald-glow">
              Konsultasi Yuk <MessageSquareText className="w-5 h-5" />
            </Link>
          </motion.div>

          {/* Journeys (Bottom Horizontal List) */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 relative z-20"
          >
            {journeys.map((journey) => (
              <div 
                key={journey.id} 
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-black/30 p-5 backdrop-blur-md transition-all duration-500 hover:-translate-y-2 hover:bg-white/10 hover:border-amber-400/50 hover:shadow-[0_8px_30px_rgb(245,158,11,0.2)] cursor-pointer"
              >
                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-amber-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                
                <journey.icon className="w-8 h-8 text-amber-400 mb-4 transform transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6" />
                <h3 className="text-white font-bold text-base md:text-lg mb-2 relative z-10">{journey.title}</h3>
                <p className="text-gray-400 text-xs md:text-sm line-clamp-2 pr-2 group-hover:text-gray-300 transition-colors relative z-10">{journey.desc}</p>
                
                {/* Arrow that slides in on hover */}
                <div className="absolute bottom-5 right-5 opacity-0 transform translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 z-10">
                  <ArrowRight className="w-5 h-5 text-amber-400" />
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Seamless Transition Gradient to next section */}
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-dark-bg via-dark-bg/80 to-transparent z-10 pointer-events-none" />
    </section>
  );
}
