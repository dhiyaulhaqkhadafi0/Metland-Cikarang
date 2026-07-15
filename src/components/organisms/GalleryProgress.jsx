"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import CustomVideoPlayer from "../molecules/CustomVideoPlayer";

// Using Cloudflare R2 URL from environment
const R2_URL = process.env.NEXT_PUBLIC_R2_URL || "";

// Mapping filenames to beautiful short titles and keeping descriptions intact
const videoArchive = [
  {
    id: 1,
    month: "Juni 2026",
    filename: "Akses baru, mobilitas makin mudah. Bayangkan perjalanan yang lebih praktis dengan hadirnya jemba.mp4",
    title: "Akses Baru Mobilitas Mudah",
    desc: "Bayangkan perjalanan yang lebih praktis dengan hadirnya akses baru."
  },
  {
    id: 2,
    month: "Juni 2026",
    filename: "Brassia Garden sedang dalam proses pembangunan. Ikuti perkembangannya dan temukan detailnya di l.mp4",
    title: "Progress Brassia Garden",
    desc: "Ikuti perkembangannya dan temukan detail eksklusifnya."
  },
  {
    id: 3,
    month: "Juni 2026",
    filename: "Dari akses kawasan yang mudah, area olahraga, tempat WFA, hingga playground untuk si kecil, semu.mp4",
    title: "Fasilitas Kawasan Terpadu",
    desc: "Dari area olahraga, tempat WFA, hingga playground untuk si kecil."
  },
  {
    id: 4,
    month: "Juni 2026",
    filename: "Kesempatan terakhir untuk memiliki hunian impian di Myzora! Tipe 56 dan Tipe 45 sudah SOLD OUT, .mp4",
    title: "Hunian Impian Myzora",
    desc: "Kesempatan terakhir! Tipe 56 dan 45 SOLD OUT. Segera miliki unit Anda."
  },
  {
    id: 5,
    month: "Juni 2026",
    filename: "Myzora bentar lagi jadi! Show unit Tipe 77 segera hadir untuk kamu rasakan langsung di 2026. Pan.mp4",
    title: "Show Unit Myzora Tipe 77",
    desc: "Segera hadir untuk Anda rasakan langsung pengalaman ruangannya."
  },
  {
    id: 6,
    month: "Juni 2026",
    filename: "Pembangunan Jembatan Metland Cikarang terus berjalan dengan progres yang semakin nyata. Nantinya.mp4",
    title: "Pembangunan Jembatan",
    desc: "Terus berjalan dengan progres yang semakin nyata di lapangan."
  },
  {
    id: 7,
    month: "Juni 2026",
    filename: "Rumah impianmu semakin dekat jadi kenyataan!Progress pembangunan Myzora Tipe 45 terus berjalan d.mp4",
    title: "Progress Myzora Tipe 45",
    desc: "Rumah impian Anda semakin dekat menjadi kenyataan."
  },
  {
    id: 8,
    month: "Juni 2026",
    filename: "Semakin dekat, semakin terhubung. 🌉Update progress jembatan penghubung Metland Cikarang – Metla.mp4",
    title: "Jembatan Penghubung Metland",
    desc: "Semakin dekat, semakin terhubung menuju kemudahan akses."
  },
  {
    id: 9,
    month: "Juni 2026",
    filename: "Setiap dinding yang berdiri hari ini akan menjadi saksi cerita keluarga di masa depan. 🤍Myzora .mp4",
    title: "Cerita Keluarga Myzora",
    desc: "Setiap dinding yang berdiri hari ini akan menjadi saksi cerita esok hari."
  }
];

function VideoCard({ item, index }) {
  // Smart Fallback Logic handled inside CustomVideoPlayer wrapper if needed, 
  // but here we just pass the most reliable URL first.
  const r2VideoUrl = R2_URL ? `${R2_URL}/${encodeURIComponent(item.filename)}` : null;
  const localVideoUrl = `/gallery umum/video update progress/JUNI 2026/${item.filename}`;
  
  // Custom video player will fallback automatically if implemented, or we just rely on local for absolute guarantee during dev.
  const src = localVideoUrl; // Using local to guarantee it works flawlessly since R2 setup might still be propagating.

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay: (index % 3) * 0.2 }}
      className="flex flex-col gap-4 group"
    >
      <div className="relative w-full aspect-[9/16] rounded-3xl overflow-hidden bg-dark-card border border-white/5 shadow-2xl hover:shadow-[0_0_40px_rgba(16,185,129,0.15)] transition-shadow duration-500">
        <CustomVideoPlayer src={src} title={item.title} />
      </div>

      <div className="px-2">
        <span className="inline-block text-emerald-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-2">
          {item.month}
        </span>
        <h3 className="text-xl md:text-2xl font-medium text-white mb-2 font-serif group-hover:text-emerald-300 transition-colors">{item.title}</h3>
        <p className="text-gray-400 text-sm leading-relaxed font-light line-clamp-2">{item.desc}</p>
      </div>
    </motion.div>
  );
}

export default function GalleryProgress() {
  const [activeFilter, setActiveFilter] = useState("Semua");
  const filters = ["Semua", "Juni 2026"];

  const filteredVideos = activeFilter === "Semua" 
    ? videoArchive 
    : videoArchive.filter(v => v.month.toUpperCase() === activeFilter.toUpperCase());

  return (
    <section className="py-32 px-6 relative bg-dark-bg overflow-hidden">
      
      {/* Background Storybook Connector line from above */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-32 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />

      {/* Subtle Grid Background */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none" />
      
      <div className="container mx-auto max-w-7xl relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block px-5 py-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 backdrop-blur-md mb-6"
            >
              <span className="text-emerald-400 text-xs font-semibold tracking-[0.3em] uppercase">Arsip Pembangunan</span>
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-5xl md:text-7xl font-light text-white leading-tight"
            >
              Update <br />
              <span className="italic font-medium text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-primary font-serif pr-4">
                Progress
              </span>
            </motion.h2>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-end gap-6"
          >
            {/* Filter Tabs */}
            <div className="flex items-center gap-2 bg-white/5 p-1.5 rounded-full border border-white/10 backdrop-blur-md">
              {filters.map(filter => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-6 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 ${activeFilter === filter ? 'bg-emerald-500 text-dark-bg shadow-[0_0_20px_rgba(16,185,129,0.4)]' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                >
                  {filter}
                </button>
              ))}
            </div>

            <p className="text-gray-500 text-xs tracking-widest uppercase">
              Menampilkan {filteredVideos.length} Video
            </p>
          </motion.div>
        </div>

        {/* Vertical Videos Grid (Optimized for Mobile/Reels ratio) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {filteredVideos.map((item, idx) => (
            <VideoCard key={item.id} item={item} index={idx} />
          ))}
        </div>

      </div>
    </section>
  );
}
