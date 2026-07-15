"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Maximize2, MapPin } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import ImageLightbox from "../molecules/ImageLightbox";

function TiltCard({ imageSrc, title, type, delay, onClick }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className="relative w-full aspect-[4/5] md:aspect-[3/4] rounded-[2.5rem] cursor-pointer group"
    >
      {/* Glassmorphism Background layer */}
      <div 
        className="absolute inset-0 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl transition-all duration-300 group-hover:bg-white/10 group-hover:border-emerald-500/30 group-hover:shadow-[0_0_50px_rgba(16,185,129,0.2)]"
        style={{ transform: "translateZ(0px)" }}
      />
      
      {/* Floating Image layer */}
      <div 
        className="absolute inset-4 rounded-[2rem] overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.5)] bg-dark-bg"
        style={{ transform: "translateZ(60px)" }}
      >
        <Image 
          src={imageSrc} 
          alt={title} 
          fill
          className="object-cover transition-transform duration-1000 group-hover:scale-110 opacity-80 group-hover:opacity-100"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent pointer-events-none" />
      </div>

      {/* Floating Content layer */}
      <div 
        className="absolute bottom-10 left-8 right-8 flex flex-col items-start pointer-events-none"
        style={{ transform: "translateZ(100px)" }}
      >
        <motion.div 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-xl border border-white/20 flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.3)] mb-4 group-hover:shadow-[0_0_30px_rgba(16,185,129,0.6)] group-hover:bg-emerald-500/20 transition-all pointer-events-auto"
        >
          <Maximize2 className="text-white w-5 h-5 group-hover:text-emerald-400 transition-colors" />
        </motion.div>
        
        <h3 className="text-2xl text-white font-medium leading-tight mb-2 font-serif">{title}</h3>
        
        <div className="flex items-center gap-2 text-gray-400">
          <MapPin size={14} className="text-emerald-400" />
          <span className="text-xs font-semibold tracking-widest uppercase">{type}</span>
        </div>
      </div>
    </motion.div>
  );
}

export default function GalleryVirtualTour() {
  const [activeImage, setActiveImage] = useState(null);

const tours = [
    // Avesa Garden - Canary & Derora
    { id: 1, title: "Fasad Canary", type: "Avesa Garden", imageSrc: "/cluster avesa garden/CANARY/galeri_cluster4_68a28b1f778ed.jpg", delay: 0 },
    { id: 2, title: "Interior Canary", type: "Avesa Garden", imageSrc: "/cluster avesa garden/CANARY/galeri_cluster4_68a28b2e781bc.jpg", delay: 0.2 },
    { id: 3, title: "Tipe Canary Minimalis", type: "Avesa Garden", imageSrc: "/cluster avesa garden/CANARY/galeri_cluster4_68a28b4e39670.jpg", delay: 0.4 },
    { id: 4, title: "Fasad Utama Derora", type: "Avesa Garden", imageSrc: "/cluster avesa garden/DERORA/galeri_cluster2_68a174f24c287.jpg", delay: 0 },
    { id: 5, title: "Derora Tipe 59/84", type: "Avesa Garden", imageSrc: "/cluster avesa garden/DERORA/galeri_cluster2_68a1de03090b3.jpg", delay: 0.2 },
    { id: 6, title: "Fasad Modern Derora", type: "Avesa Garden", imageSrc: "/cluster avesa garden/DERORA/galeri_cluster2_68a1de1ad5125.jpg", delay: 0.4 },
    { id: 7, title: "Eksterior Tipe Premium", type: "Avesa Garden", imageSrc: "/cluster avesa garden/DERORA/galeri_cluster2_68a1de28211a8.jpg", delay: 0 },
    { id: 8, title: "Lingkungan Asri Derora", type: "Avesa Garden", imageSrc: "/cluster avesa garden/DERORA/galeri_cluster2_68a1de3b291f4.jpg", delay: 0.2 },
    
    // Brassia Garden (Myzora)
    { id: 9, title: "Fasad Myzora 77/98", type: "Brassia Garden", imageSrc: "/cluster brassia-garden-new/fasad myzora 77 98.jpg", delay: 0.4 },
    { id: 10, title: "Fasad Myzora 33/72", type: "Brassia Garden", imageSrc: "/cluster brassia-garden-new/Fasad Myzora 33 72.jpg", delay: 0 },
    { id: 11, title: "Koridor Brassia", type: "Brassia Garden", imageSrc: "/cluster brassia-garden-new/koridor dalam cluster 1.png", delay: 0.2 },
    { id: 12, title: "Clubhouse Brassia", type: "Brassia Garden", imageSrc: "/cluster brassia-garden-new/taman area clubhouse 1.png", delay: 0.4 },

    // Ruko Commercial
    { id: 13, title: "Ruko Easton Gateway", type: "Commercial Area", imageSrc: "/RUKO EASTON GATEWAY/galeri_cluster6_68a1db681c4c4 (1).jpg", delay: 0 },
    { id: 14, title: "Area Komersial Easton", type: "Commercial Area", imageSrc: "/RUKO EASTON GATEWAY/galeri_cluster6_68a1db8bb0ff7.jpg", delay: 0.2 },
    { id: 15, title: "Ruko Weston Gateway", type: "Commercial Area", imageSrc: "/RUKO WESTON GATEWAY/galeri_cluster7_693135f9dd540 (2).jpg", delay: 0.4 }
  ];

  return (
    <section className="py-32 px-6 relative bg-[#050505] overflow-hidden" style={{ perspective: "1500px" }}>
      
      <ImageLightbox 
        isOpen={!!activeImage}
        onClose={() => setActiveImage(null)}
        imageSrc={activeImage?.imageSrc}
        altText={activeImage?.title}
      />

      {/* Storybook Connector line from above */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-32 bg-gradient-to-b from-white/10 to-transparent" />

      {/* Background Ornaments */}
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[150px] -translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px] translate-x-1/3 pointer-events-none" />

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="text-center mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center justify-center mb-6"
          >
            <div className="w-12 h-[1px] bg-emerald-500/50 mr-4" />
            <span className="text-emerald-400 text-xs font-semibold tracking-[0.4em] uppercase">Interactive VR</span>
            <div className="w-12 h-[1px] bg-emerald-500/50 ml-4" />
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-5xl md:text-7xl font-light text-white mb-6"
          >
            Step Into <br className="md:hidden" />
            <span className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-primary font-serif italic">
              Virtual Reality
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto font-light"
          >
            Eksplorasi ruang dan desain arsitektur secara mendetail. Klik gambar untuk memperbesar area dan melihat karya kami lebih dekat.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12" style={{ perspective: "2000px" }}>
          {tours.map((tour, idx) => (
            <TiltCard 
              key={idx} 
              {...tour} 
              onClick={() => setActiveImage(tour)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
