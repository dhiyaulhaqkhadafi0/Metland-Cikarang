"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { Play, Image as ImageIcon, Maximize, Calendar } from "lucide-react";
import CustomVideoPlayer from "../molecules/CustomVideoPlayer";
import ImageLightbox from "../molecules/ImageLightbox";

// Using Cloudflare R2 URL from environment
const R2_URL = process.env.NEXT_PUBLIC_R2_URL || "";

// Extracted all 23 photos directly from the directory with accurate month tagging
const eventPhotos = [
  // JUNE 2026 - AFA Drag Race
  { id: 1, month: "Juni 2026", title: "AFA Drag Race Pushbike", image: "/gallery umum/Event & Komunitas/AFA Drag Race Pushbike/Bukan hanya tentang siapa yang tercepat, tetapi tentang keberanian untuk terus melaju. 🚴✨Hari k (1).jpg", desc: "Keberanian melaju cepat di lintasan." },
  { id: 2, month: "Juni 2026", title: "AFA Drag Race Pushbike", image: "/gallery umum/Event & Komunitas/AFA Drag Race Pushbike/Bukan hanya tentang siapa yang tercepat, tetapi tentang keberanian untuk terus melaju. 🚴✨Hari k (2).jpg", desc: "Momen seru kompetisi anak-anak." },
  { id: 3, month: "Juni 2026", title: "AFA Drag Race Pushbike", image: "/gallery umum/Event & Komunitas/AFA Drag Race Pushbike/Bukan hanya tentang siapa yang tercepat, tetapi tentang keberanian untuk terus melaju. 🚴✨Hari k (3).jpg", desc: "Fokus menuju garis finish." },
  { id: 4, month: "Juni 2026", title: "AFA Drag Race Pushbike", image: "/gallery umum/Event & Komunitas/AFA Drag Race Pushbike/Bukan hanya tentang siapa yang tercepat, tetapi tentang keberanian untuk terus melaju. 🚴✨Hari k (4).jpg", desc: "Persaingan yang sportif sejak dini." },
  { id: 5, month: "Juni 2026", title: "AFA Drag Race Pushbike", image: "/gallery umum/Event & Komunitas/AFA Drag Race Pushbike/Bukan hanya tentang siapa yang tercepat, tetapi tentang keberanian untuk terus melaju. 🚴✨Hari k (5).jpg", desc: "Dukungan penuh orang tua." },
  { id: 6, month: "Juni 2026", title: "AFA Drag Race Pushbike", image: "/gallery umum/Event & Komunitas/AFA Drag Race Pushbike/Bukan hanya tentang siapa yang tercepat, tetapi tentang keberanian untuk terus melaju. 🚴✨Hari k.jpg", desc: "Suasana riuh di pinggir lintasan." },
  { id: 7, month: "Juni 2026", title: "AFA Drag Race Pushbike", image: "/gallery umum/Event & Komunitas/AFA Drag Race Pushbike/Komunitas, semangat, dan kebersamaan bertemu di satu lintasan! ✨Hari pertama AFA Drag Race Pushb (1).jpg", desc: "Hari pertama yang penuh energi." },
  { id: 8, month: "Juni 2026", title: "AFA Drag Race Pushbike", image: "/gallery umum/Event & Komunitas/AFA Drag Race Pushbike/Komunitas, semangat, dan kebersamaan bertemu di satu lintasan! ✨Hari pertama AFA Drag Race Pushb (2).jpg", desc: "Kebersamaan komunitas pushbike." },
  { id: 9, month: "Juni 2026", title: "AFA Drag Race Pushbike", image: "/gallery umum/Event & Komunitas/AFA Drag Race Pushbike/Komunitas, semangat, dan kebersamaan bertemu di satu lintasan! ✨Hari pertama AFA Drag Race Pushb (3).jpg", desc: "Semangat pantang menyerah." },
  { id: 10, month: "Juni 2026", title: "AFA Drag Race Pushbike", image: "/gallery umum/Event & Komunitas/AFA Drag Race Pushbike/Komunitas, semangat, dan kebersamaan bertemu di satu lintasan! ✨Hari pertama AFA Drag Race Pushb.jpg", desc: "Kesempatan emas mencetak prestasi." },
  { id: 11, month: "Juni 2026", title: "AFA Drag Race Pushbike", image: "/gallery umum/Event & Komunitas/AFA Drag Race Pushbike/Terima Kasih, Metland Cikarang! 🤝✨Kami selaku panitia dan seluruh keluarga besar AFA Pushbike m.jpg", desc: "Penyerahan hadiah secara simbolis." },

  // JULY 2026 - Kids Holiday Weekend & MURI
  { id: 12, month: "Juli 2026", title: "Kids Holiday Weekend", image: "/gallery umum/Event & Komunitas/Kids Holiday Weekend/Senyum si kecil adalah momen terbaik di akhir pekan ini. 🎨✨Terima kasih telah menjadi bagian da (1).jpg", desc: "Keceriaan libur akhir pekan." },
  { id: 13, month: "Juli 2026", title: "Kids Holiday Weekend", image: "/gallery umum/Event & Komunitas/Kids Holiday Weekend/Senyum si kecil adalah momen terbaik di akhir pekan ini. 🎨✨Terima kasih telah menjadi bagian da (2).jpg", desc: "Warna-warni dunia anak-anak." },
  { id: 14, month: "Juli 2026", title: "Kids Holiday Weekend", image: "/gallery umum/Event & Komunitas/Kids Holiday Weekend/Senyum si kecil adalah momen terbaik di akhir pekan ini. 🎨✨Terima kasih telah menjadi bagian da (3).jpg", desc: "Aktivitas kreatif tanpa batas." },
  { id: 15, month: "Juli 2026", title: "Kids Holiday Weekend", image: "/gallery umum/Event & Komunitas/Kids Holiday Weekend/Senyum si kecil adalah momen terbaik di akhir pekan ini. 🎨✨Terima kasih telah menjadi bagian da (4).jpg", desc: "Bermain sambil belajar di Metland." },
  { id: 16, month: "Juli 2026", title: "Kids Holiday Weekend", image: "/gallery umum/Event & Komunitas/Kids Holiday Weekend/Senyum si kecil adalah momen terbaik di akhir pekan ini. 🎨✨Terima kasih telah menjadi bagian da (5).jpg", desc: "Momen berharga si buah hati." },
  { id: 17, month: "Juli 2026", title: "Kids Holiday Weekend", image: "/gallery umum/Event & Komunitas/Kids Holiday Weekend/Senyum si kecil adalah momen terbaik di akhir pekan ini. 🎨✨Terima kasih telah menjadi bagian da.jpg", desc: "Eksplorasi yang menyenangkan." },
  { id: 18, month: "Juli 2026", title: "Rekor MURI", image: "/gallery umum/Event & Komunitas/Kids Holiday Weekend/Metland Cikarang kembali meraih penghargaan dari Museum Rekor Dunia Indonesia (MURI) yang kedua  (1).jpg", desc: "Penerimaan penghargaan rekor MURI." },
  { id: 19, month: "Juli 2026", title: "Rekor MURI", image: "/gallery umum/Event & Komunitas/Kids Holiday Weekend/Metland Cikarang kembali meraih penghargaan dari Museum Rekor Dunia Indonesia (MURI) yang kedua  (2).jpg", desc: "Sertifikasi resmi MURI." },
  { id: 20, month: "Juli 2026", title: "Rekor MURI", image: "/gallery umum/Event & Komunitas/Kids Holiday Weekend/Metland Cikarang kembali meraih penghargaan dari Museum Rekor Dunia Indonesia (MURI) yang kedua  (3).jpg", desc: "Momen membanggakan Metland Cikarang." },
  { id: 21, month: "Juli 2026", title: "Rekor MURI", image: "/gallery umum/Event & Komunitas/Kids Holiday Weekend/Metland Cikarang kembali meraih penghargaan dari Museum Rekor Dunia Indonesia (MURI) yang kedua  (4).jpg", desc: "Selebrasi bersama seluruh tim." },
  { id: 22, month: "Juli 2026", title: "Rekor MURI", image: "/gallery umum/Event & Komunitas/Kids Holiday Weekend/Metland Cikarang kembali meraih penghargaan dari Museum Rekor Dunia Indonesia (MURI) yang kedua  (5).jpg", desc: "Sejarah baru terukir di Cikarang." },
  { id: 23, month: "Juli 2026", title: "Rekor MURI", image: "/gallery umum/Event & Komunitas/Kids Holiday Weekend/Metland Cikarang kembali meraih penghargaan dari Museum Rekor Dunia Indonesia (MURI) yang kedua .jpg", desc: "Bukti komitmen tak terbatas." },
];

const eventVideos = [
  {
    id: 1,
    title: "Rekor MURI Drag Race Pushbike",
    filename: "Siap jadi saksi pemecahan Rekor Muri selanjutnya Jangan lewatkan  Pemecahan rekor muri Dragrace .mp4",
    desc: "Siap jadi saksi pemecahan Rekor MURI selanjutnya? Jangan lewatkan kemeriahannya."
  },
  {
    id: 2,
    title: "Akad Jual Beli Massal",
    filename: "Akad Jual Beli Massal - Langkah penting untuk legalitas hunianmu.Bagi konsumen yang kami undang,.mp4",
    desc: "Langkah penting untuk legalitas hunianmu. Momen bahagia konsumen Metland Cikarang."
  }
];

export default function GalleryEvents() {
  const [activeTab, setActiveTab] = useState("Foto");
  const [activeImage, setActiveImage] = useState(null);
  
  // Archival Filters
  const [selectedMonth, setSelectedMonth] = useState("Semua");
  const filters = ["Semua", "Juni 2026", "Juli 2026"];

  const filteredPhotos = eventPhotos.filter(p => selectedMonth === "Semua" || p.month === selectedMonth);

  return (
    <section className="py-24 px-6 relative bg-[#050505] overflow-hidden">
      
      {/* Lightbox for Photos (Now completely safe and unblocked via React Portal) */}
      <ImageLightbox 
        isOpen={!!activeImage}
        onClose={() => setActiveImage(null)}
        imageSrc={activeImage?.image}
        altText={activeImage?.title}
      />

      {/* Background Storybook Connector line from above */}
      <div className="absolute top-0 right-[30%] w-[1px] h-32 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />

      {/* Background Elements */}
      <div className="absolute top-1/4 right-0 w-[40vw] h-[40vw] bg-emerald-500/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-[30vw] h-[30vw] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto max-w-7xl relative z-10">
        
        {/* Header & Tabs */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-8">
          <div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-6"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-white text-xs font-semibold tracking-[0.2em] uppercase">Connect</span>
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-light text-white mb-4"
            >
              Events & <span className="italic font-medium text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-primary">Komunitas</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-gray-400 max-w-lg font-light"
            >
              Keseruan, harmoni, dan kebanggaan menjadi satu. Lihat seluruh rekam jejak momen berharga bersama komunitas Metland Cikarang.
            </motion.p>
          </div>

          {/* Media Type Toggle */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex p-1.5 bg-white/5 border border-white/10 rounded-full backdrop-blur-md"
          >
            <button 
              onClick={() => setActiveTab("Foto")}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold tracking-wider uppercase transition-all duration-300 ${activeTab === "Foto" ? 'bg-emerald-500 text-dark-bg shadow-[0_0_20px_rgba(16,185,129,0.3)]' : 'text-gray-400 hover:text-white'}`}
            >
              <ImageIcon size={16} />
              Foto
            </button>
            <button 
              onClick={() => setActiveTab("Video")}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold tracking-wider uppercase transition-all duration-300 ${activeTab === "Video" ? 'bg-emerald-500 text-dark-bg shadow-[0_0_20px_rgba(16,185,129,0.3)]' : 'text-gray-400 hover:text-white'}`}
            >
              <Play size={16} />
              Video
            </button>
          </motion.div>
        </div>

        {/* Content Area */}
        <div className="min-h-[500px]">
          <AnimatePresence mode="wait">
            
            {/* PHOTO TAB - Dynamic Masonry */}
            {activeTab === "Foto" && (
              <motion.div 
                key="foto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                
                {/* Month Filters (Archive) */}
                <div className="flex flex-wrap items-center gap-3 mb-10 pb-6 border-b border-white/5">
                  <div className="flex items-center gap-2 mr-4 text-emerald-400">
                    <Calendar size={18} />
                    <span className="text-xs uppercase tracking-widest font-semibold">Arsip</span>
                  </div>
                  {filters.map(f => (
                    <button
                      key={f}
                      onClick={() => setSelectedMonth(f)}
                      className={`px-5 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 ${
                        selectedMonth === f 
                        ? 'bg-white/10 text-white border border-white/20' 
                        : 'bg-transparent text-gray-500 hover:text-white border border-transparent hover:border-white/10'
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>

                {/* CSS Columns for smooth uncropped Masonry layout */}
                <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
                  {filteredPhotos.map((photo, index) => (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: (index % 10) * 0.1 }} // subtle staggered entrance
                      key={photo.id}
                      className="break-inside-avoid relative rounded-3xl overflow-hidden group cursor-zoom-in border border-white/5 bg-dark-card hover:border-emerald-500/30 transition-colors shadow-lg"
                      onClick={() => setActiveImage(photo)}
                    >
                      <Image 
                        src={photo.image}
                        alt={photo.title}
                        width={600}
                        height={800}
                        className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      
                      {/* Interactive Hover Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                        <span className="self-start text-xs font-semibold tracking-wider uppercase bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full border border-emerald-500/30 mb-2">
                          {photo.month}
                        </span>
                        <h4 className="text-white font-medium text-lg leading-tight mb-1">{photo.title}</h4>
                        <p className="text-gray-300 text-sm font-light leading-relaxed">{photo.desc}</p>
                        
                        {/* Zoom Hint */}
                        <div className="absolute top-4 right-4 w-10 h-10 bg-black/40 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white scale-75 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300">
                          <Maximize size={16} />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {filteredPhotos.length === 0 && (
                  <div className="text-center py-24 text-gray-500 border border-white/5 rounded-3xl border-dashed">
                    Tidak ada foto untuk arsip bulan ini.
                  </div>
                )}
              </motion.div>
            )}

            {/* VIDEO TAB - Grid Layout */}
            {activeTab === "Video" && (
              <motion.div 
                key="video"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6"
              >
                {eventVideos.map((video) => (
                  <div key={video.id} className="flex flex-col gap-6 group">
                    <div className="relative w-full aspect-video rounded-3xl overflow-hidden bg-dark-card border border-white/5 shadow-xl hover:shadow-[0_0_40px_rgba(16,185,129,0.15)] transition-shadow">
                      <CustomVideoPlayer 
                        src={`/gallery umum/Event & Komunitas/video/${video.filename}`} 
                        title={video.title} 
                      />
                    </div>
                    <div>
                      <h3 className="text-2xl font-medium text-white mb-2 font-serif group-hover:text-emerald-300 transition-colors">{video.title}</h3>
                      <p className="text-gray-400 text-sm leading-relaxed">{video.desc}</p>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}

          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
