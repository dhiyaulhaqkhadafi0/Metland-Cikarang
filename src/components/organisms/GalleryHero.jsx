"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ImageLightbox from "../molecules/ImageLightbox";

// Using more interesting images for the photobook
const photobookImages = [
  { src: "/gallery umum/area CBD & TOD Metland Cibitung.png", title: "Area CBD & TOD", w: "w-64 md:w-[350px]", h: "aspect-[4/3]", top: "5%", left: "10%", rotation: -12, delay: 0.8 },
  { src: "/gallery umum/Myzora 2 lantai.png", title: "Cluster Myzora", w: "w-56 md:w-[300px]", h: "aspect-[3/4]", top: "15%", left: "65%", rotation: 8, delay: 1.0 },
  { src: "/gallery umum/waterland metland cibitung.jpg", title: "Waterland Metland", w: "w-72 md:w-[450px]", h: "aspect-video", top: "55%", left: "5%", rotation: -5, delay: 1.2 },
  { src: "/gallery umum/stasiun metland telaga murni.jpg", title: "Stasiun Telaga Murni", w: "w-48 md:w-[280px]", h: "aspect-square", top: "60%", left: "70%", rotation: 15, delay: 1.4 },
  { src: "/gallery umum/One Foresta District.png", title: "One Foresta District", w: "w-60 md:w-[380px]", h: "aspect-[4/5]", top: "40%", left: "35%", rotation: 2, delay: 1.6 },
];

export default function GalleryHero() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const [activeImage, setActiveImage] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Parallax effects
  const yParallax = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacityFade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={containerRef} className="relative h-[120vh] w-full bg-[#050505] overflow-hidden">
      
      {/* Lightbox Component */}
      <ImageLightbox 
        isOpen={!!activeImage}
        onClose={() => setActiveImage(null)}
        imageSrc={activeImage?.src}
        altText={activeImage?.title}
      />

      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden perspective-[2000px]">
        
        {/* Navigation - Back to Home */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 2.5 }}
          className="absolute top-8 left-8 z-[60]"
        >
          <Link 
            href="/"
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 backdrop-blur-md text-white text-sm font-medium transition-all group cursor-pointer"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Kembali ke Beranda
          </Link>
        </motion.div>

        {/* Photobook Background Texture & Lighting */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay z-0 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#1a1f1c] via-[#050505] to-[#050505] z-0 pointer-events-none" />

        {/* Animated Dust Particles */}
        {mounted && (
          <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ 
                  opacity: 0, 
                  x: Math.random() * window.innerWidth, 
                  y: Math.random() * window.innerHeight 
                }}
                animate={{ 
                  opacity: [0, Math.random() * 0.5 + 0.2, 0], 
                  y: [null, Math.random() * -200 - 100] 
                }}
                transition={{ 
                  duration: Math.random() * 10 + 10, 
                  repeat: Infinity, 
                  ease: "linear",
                  delay: Math.random() * 5
                }}
                className="absolute w-1 h-1 bg-white rounded-full blur-[1px]"
              />
            ))}
          </div>
        )}

        {/* Photobook Pages (Images) */}
        <motion.div style={{ y: yParallax, opacity: opacityFade }} className="absolute inset-0 w-full h-full pointer-events-none z-20">
          {photobookImages.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.5, y: 150, rotateX: 60, rotateZ: img.rotation * 3 }}
              animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0, rotateZ: img.rotation }}
              transition={{ duration: 1.8, delay: img.delay, ease: [0.19, 1, 0.22, 1] }}
              style={{ top: img.top, left: img.left }}
              className={`absolute ${img.w} ${img.h} p-2 md:p-3 bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl shadow-[0_30px_60px_rgba(0,0,0,0.9)] pointer-events-auto cursor-zoom-in group hover:z-50 transition-all duration-500 hover:scale-110 hover:-translate-y-4`}
              onClick={() => setActiveImage(img)}
            >
              <div className="relative w-full h-full rounded-xl overflow-hidden border border-white/5">
                <Image 
                  src={img.src} 
                  alt={img.title}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-110 filter grayscale-[20%] group-hover:grayscale-0"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                
                {/* Zoom Hint */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-12 h-12 bg-black/60 backdrop-blur-md rounded-full border border-white/20 shadow-2xl flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Hero Central Content */}
        <motion.div 
          style={{ opacity: opacityFade }}
          className="relative z-30 text-center px-6 max-w-5xl mx-auto flex flex-col items-center pointer-events-none"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="inline-block px-8 py-3 rounded-full border border-emerald-500/30 bg-emerald-500/5 backdrop-blur-2xl mb-8 shadow-[0_0_30px_rgba(16,185,129,0.1)]"
          >
            <span className="text-emerald-400 text-[10px] font-bold tracking-[0.4em] uppercase">Visual Experience</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 50, filter: "blur(20px)", scale: 0.9 }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
            transition={{ duration: 2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-6xl md:text-8xl lg:text-[10rem] font-light tracking-tighter text-white mb-6 leading-[0.85] drop-shadow-2xl mix-blend-exclusion"
          >
            Symphony <br />
            <motion.span 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 2, delay: 1, ease: [0.16, 1, 0.3, 1] }}
              className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-white to-emerald-200 font-serif italic pr-4"
            >
              of Living
            </motion.span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 1.5, ease: "easeOut" }}
            className="text-base md:text-xl text-gray-300 max-w-2xl font-light leading-relaxed mt-6 bg-black/40 p-5 rounded-2xl backdrop-blur-md border border-white/10 shadow-2xl"
          >
            Buka lembaran kisah kehidupan baru. Klik foto-foto di atas untuk melihat detail mahakarya Metland Cikarang.
          </motion.p>
        </motion.div>

        {/* Scroll Connector Ornament */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3, duration: 1.5 }}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center"
        >
          <span className="text-[10px] text-gray-500 uppercase tracking-widest mb-4">Discover the story</span>
          <div className="w-[1px] h-32 bg-white/10 relative overflow-hidden">
            <motion.div
              animate={{ y: ["-100%", "100%"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-transparent via-emerald-400 to-transparent"
            />
          </div>
        </motion.div>

      </div>
    </section>
  );
}
