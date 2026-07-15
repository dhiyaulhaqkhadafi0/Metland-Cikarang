"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Gift, ArrowRight } from "lucide-react";
import { useRef, useState } from "react";
import Image from "next/image";
import ImageLightbox from "../molecules/ImageLightbox";

const promos = [
  {
    id: 1,
    title: "Subsidi DP 10%",
    desc: "Miliki rumah impian tanpa beban DP berat di awal. Langkah pertama Anda menjadi lebih ringan.",
    image: "/gallery umum/Myzora 2 lantai.png",
    tag: "Limited Time",
    artist: "Metland Cikarang"
  },
  {
    id: 2,
    title: "Free Biaya KPR & BPHTB",
    desc: "Bebas semua biaya surat-surat, langsung serah terima tanpa ada biaya tersembunyi.",
    image: "/gallery umum/area CBD & TOD Metland Cibitung.png",
    tag: "Exclusive",
    artist: "Promo Spesial"
  },
  {
    id: 3,
    title: "Smart Home System",
    desc: "Bonus instalasi smart home untuk setiap pembelian unit cluster baru. Masa depan di tangan Anda.",
    image: "/gallery umum/One Foresta District.png",
    tag: "Bonus",
    artist: "Modern Living"
  }
];

export default function GalleryPromo() {
  const [activeImage, setActiveImage] = useState(null);

  return (
    <section className="relative h-screen bg-[#050505] overflow-hidden flex items-center">
      
      <ImageLightbox 
        isOpen={!!activeImage}
        onClose={() => setActiveImage(null)}
        imageSrc={activeImage?.image}
        altText={activeImage?.title}
      />

      {/* Background Storybook Connector line from above */}
      <div className="absolute top-0 right-[20%] w-[1px] h-48 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />

      {/* Background Texture/Lighting */}
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none" />

      {/* Horizontal Scroll Container (Native CSS) */}
      <div className="w-full h-full flex items-center overflow-x-auto snap-x snap-mandatory scrollbar-hide">
        <div className="flex gap-16 md:gap-32 pl-[10vw] pr-[10vw] items-center w-max min-h-full py-16">
          
          {/* Header */}
          <div className="relative w-[85vw] md:w-[40vw] flex-shrink-0 flex flex-col justify-center snap-center">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 text-emerald-400 mb-4"
            >
              <Gift size={24} />
              <span className="text-sm uppercase tracking-[0.4em] font-semibold">Promo & Bonus</span>
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl lg:text-8xl font-light text-white leading-[1.1]"
            >
              Peluang <br />
              <span className="italic font-medium text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-primary font-serif pr-4">
                Terbaik
              </span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-gray-400 mt-6 max-w-sm font-light leading-relaxed border-l border-white/10 pl-6"
            >
              Jelajahi penawaran eksklusif kami layaknya mahakarya seni di sebuah pameran. Geser ke kanan untuk melihat karya selanjutnya. Klik pada karya untuk melihat detail.
            </motion.p>
          </div>

          {/* Exhibition Canvas */}
          {promos.map((promo) => (
            <div key={promo.id} className="relative w-[85vw] md:w-[60vw] lg:w-[45vw] h-[65vh] flex-shrink-0 flex flex-col justify-center group snap-center">
              
              {/* Spotlight Effect on Hover */}
              <div className="absolute -top-[20%] left-1/2 -translate-x-1/2 w-32 h-64 bg-white/10 blur-[60px] rounded-full pointer-events-none transition-opacity duration-1000 opacity-0 group-hover:opacity-100" />
              
              {/* Painting Canvas */}
              <div 
                className="relative w-full h-[75%] bg-dark-card border border-white/5 p-4 shadow-[0_30px_60px_-15px_rgba(0,0,0,1)] transition-all duration-700 group-hover:shadow-[0_0_80px_rgba(16,185,129,0.15)] group-hover:border-white/10 cursor-zoom-in"
                onClick={() => setActiveImage(promo)}
              >
                <div className="relative w-full h-full overflow-hidden group/img">
                  <Image 
                    src={promo.image} 
                    alt={promo.title}
                    fill
                    className="object-cover transition-transform duration-[3000ms] ease-out group-hover/img:scale-110 grayscale-[30%] group-hover/img:grayscale-0"
                  />
                  {/* Glass Tag */}
                  <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-xl px-5 py-2 border border-white/10 rounded-full text-[10px] uppercase tracking-[0.2em] font-medium text-emerald-400">
                    {promo.tag}
                  </div>
                  
                  {/* Zoom Hint */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity duration-500">
                    <span className="px-6 py-3 bg-black/70 backdrop-blur-md rounded-full border border-white/20 text-white text-xs tracking-[0.2em] uppercase font-semibold">
                      Perbesar
                    </span>
                  </div>
                </div>
              </div>

              {/* Museum Placard */}
              <div className="mt-8 flex flex-col md:flex-row justify-between items-start gap-6 px-4">
                <div className="max-w-md">
                  <h3 className="text-2xl md:text-3xl font-medium text-white mb-2 font-serif">{promo.title}</h3>
                  <div className="w-12 h-[1px] bg-primary mb-4" />
                  <p className="text-sm text-gray-500 italic mb-2 tracking-wide">{promo.artist}</p>
                  <p className="text-sm text-gray-400 leading-relaxed font-light">{promo.desc}</p>
                </div>
                
                <button className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] font-semibold text-primary hover:text-white transition-colors group/btn shrink-0 mt-2 md:mt-0">
                  <span>Klaim Promo</span>
                  <div className="w-10 h-10 rounded-full border border-primary flex items-center justify-center group-hover/btn:bg-primary transition-colors">
                    <ArrowRight size={16} className="group-hover/btn:text-dark-bg transition-colors" />
                  </div>
                </button>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
