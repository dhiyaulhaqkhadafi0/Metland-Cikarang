"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function DiscoverEmotionalHook() {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Fade backgrounds sequentially
  const bgOpacity1 = useTransform(scrollYProgress, [0, 0.25, 0.35], [1, 1, 0]);
  const bgOpacity2 = useTransform(scrollYProgress, [0.25, 0.35, 0.5, 0.6], [0, 1, 1, 0]);
  const bgOpacity3 = useTransform(scrollYProgress, [0.5, 0.6, 0.75, 0.85], [0, 1, 1, 0]);
  const bgOpacity4 = useTransform(scrollYProgress, [0.75, 0.85, 1, 1], [0, 1, 1, 1]);

  // Texts
  const opacity1 = useTransform(scrollYProgress, [0, 0.1, 0.2, 0.3], [0, 1, 1, 0]);
  const y1 = useTransform(scrollYProgress, [0, 0.3], [50, -50]);

  const opacity2 = useTransform(scrollYProgress, [0.25, 0.35, 0.45, 0.55], [0, 1, 1, 0]);
  const y2 = useTransform(scrollYProgress, [0.25, 0.55], [50, -50]);

  const opacity3 = useTransform(scrollYProgress, [0.5, 0.6, 0.7, 0.8], [0, 1, 1, 0]);
  const y3 = useTransform(scrollYProgress, [0.5, 0.8], [50, -50]);

  const opacity4 = useTransform(scrollYProgress, [0.75, 0.85, 0.95, 1], [0, 1, 1, 1]);
  const y4 = useTransform(scrollYProgress, [0.75, 1], [50, 0]);

  return (
    <section ref={containerRef} className="h-[400vh] relative bg-black">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        
        {/* Dynamic Backgrounds */}
        <motion.div style={{ opacity: bgOpacity1 }} className="absolute inset-0">
          <img src="/gallery umum/stasiun metland telaga murni.jpg" alt="Pagi" className="w-full h-full object-cover opacity-60 grayscale-[30%] mix-blend-screen" />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-dark-bg/80 to-transparent" />
        </motion.div>

        <motion.div style={{ opacity: bgOpacity2 }} className="absolute inset-0">
          <img src="/gallery umum/sekolah al azhar cibitung.jpeg" alt="Sekolah" className="w-full h-full object-cover opacity-60 grayscale-[30%] mix-blend-screen" />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-dark-bg/80 to-transparent" />
        </motion.div>

        <motion.div style={{ opacity: bgOpacity3 }} className="absolute inset-0">
          <img src="/gallery umum/waterland metland cibitung.jpg" alt="Sore" className="w-full h-full object-cover opacity-60 grayscale-[30%] mix-blend-screen" />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-dark-bg/80 to-transparent" />
        </motion.div>

        <motion.div style={{ opacity: bgOpacity4 }} className="absolute inset-0">
          <img src="/gallery umum/area CBD & TOD Metland Cibitung.png" alt="Masa Depan" className="w-full h-full object-cover opacity-60 grayscale-[30%] mix-blend-screen" />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-dark-bg/50 to-transparent" />
        </motion.div>

        <div className="relative z-10 w-full h-full flex items-center justify-center px-6">
          
          <motion.div style={{ opacity: opacity1, y: y1 }} className="absolute inset-0 flex items-center justify-center pointer-events-none text-center">
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
              Bayangkan... <br/> <span className="text-gray-400 font-normal mt-4 block text-3xl md:text-5xl">5 tahun dari sekarang.</span>
            </h2>
          </motion.div>

          <motion.div style={{ opacity: opacity2, y: y2 }} className="absolute inset-0 flex items-center justify-center pointer-events-none text-center">
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
              Anak Anda berjalan kaki ke sekolah <br/> <span className="text-primary mt-4 block text-3xl md:text-5xl">dengan aman dan tenang.</span>
            </h2>
          </motion.div>

          <motion.div style={{ opacity: opacity3, y: y3 }} className="absolute inset-0 flex items-center justify-center pointer-events-none text-center">
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
              Setiap sore keluarga menikmati <br/> <span className="text-emerald-400 mt-4 block text-3xl md:text-5xl">wahana air yang seru di Waterland.</span>
            </h2>
          </motion.div>

          <motion.div style={{ opacity: opacity4, y: y4 }} className="absolute inset-0 flex items-center justify-center pointer-events-none text-center">
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight drop-shadow-2xl">
              Dan investasi Anda <br/> <span className="text-white mt-4 block text-3xl md:text-5xl">terus bertumbuh eksponensial.</span>
            </h2>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
