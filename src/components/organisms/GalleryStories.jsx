"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

// Dummy testimonials with convincing copywriting and no photos
const testimonialsRow1 = [
  {
    id: 1,
    name: "Ibu Rina",
    role: "Ibu Rumah Tangga",
    cluster: "Cluster Myzora",
    quote: "Desain fasadnya benar-benar modern. Fasilitas di dalam Myzora bikin anak-anak betah main di luar tanpa rasa khawatir."
  },
  {
    id: 2,
    name: "Bpk. Aditya Pratama",
    role: "Karyawan Swasta",
    cluster: "Cluster Ellyra",
    quote: "Setelah sekian lama mencari, Ellyra memberikan balance antara aksesibilitas ke pusat kota dan ketenangan lingkungan."
  },
  {
    id: 3,
    name: "dr. Andini",
    role: "Dokter Spesialis",
    cluster: "Cluster Canary",
    quote: "Dekat dengan rumah sakit dan stasiun KRL. Untuk mobilitas profesi saya, ini adalah investasi terbaik yang pernah saya buat."
  },
  {
    id: 4,
    name: "Keluarga Gunawan",
    role: "Wirausaha",
    cluster: "Cluster Derora",
    quote: "Konsep eco-living di Derora sangat terasa. Sirkulasi udara di dalam rumah sangat bagus, jadi jarang menyalakan AC."
  }
];

const testimonialsRow2 = [
  {
    id: 5,
    name: "Bpk. Hendra",
    role: "Manager IT",
    cluster: "Cluster Mavis",
    quote: "Smart home system-nya sangat responsif. Saya bisa memantau keamanan rumah hanya lewat smartphone dari kantor."
  },
  {
    id: 6,
    name: "Ibu Maya",
    role: "Desainer Interior",
    cluster: "Cluster Myna",
    quote: "Layout ruangannya sangat efisien dan flow-nya enak. Jarang ada developer yang sangat memikirkan detail layout seperti Myna."
  },
  {
    id: 7,
    name: "Keluarga Setiawan",
    role: "Pegawai Negeri",
    cluster: "Cluster Myzora",
    quote: "Kami sekeluarga sangat menyukai area tamannya. Suasananya seperti sedang liburan setiap kali pulang ke rumah."
  },
  {
    id: 8,
    name: "Bpk. Farhan",
    role: "Pekerja Lepas (Freelancer)",
    cluster: "Cluster Ellyra",
    quote: "Suasana yang tenang sangat mendukung pekerjaan saya dari rumah. Ditambah internet yang stabil di seluruh kawasan."
  }
];

function TestimonialCard({ item }) {
  return (
    <div className="flex-shrink-0 w-[350px] md:w-[450px] bg-dark-card border border-white/5 rounded-3xl p-8 shadow-2xl relative overflow-hidden group hover:border-emerald-500/30 transition-colors duration-500 mx-4">
      <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
        <Quote size={80} className="text-emerald-400 rotate-180" />
      </div>
      
      <div className="relative z-10 flex flex-col h-full justify-between gap-8">
        <p className="text-gray-300 text-lg md:text-xl font-light leading-relaxed">
          "{item.quote}"
        </p>
        
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h4 className="text-white font-medium text-lg">{item.name}</h4>
            <span className="w-1 h-1 rounded-full bg-emerald-400" />
            <span className="text-emerald-400 text-xs font-semibold tracking-widest uppercase">{item.cluster}</span>
          </div>
          <p className="text-gray-500 text-sm">{item.role}</p>
        </div>
      </div>
    </div>
  );
}

export default function GalleryStories() {
  return (
    <section className="py-32 px-0 relative bg-[#050505] overflow-hidden">
      
      {/* Background Storybook Connector line from above */}
      <div className="absolute top-0 right-[25%] w-[1px] h-32 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />

      {/* Header */}
      <div className="container mx-auto px-6 mb-20 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-md mb-6"
        >
          <span className="text-primary text-xs font-semibold tracking-[0.3em] uppercase">Testimonial</span>
        </motion.div>
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-light text-white mb-6"
        >
          Cerita <span className="italic font-medium text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-primary">Mereka</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-gray-400 max-w-xl mx-auto font-light"
        >
          Apa kata mereka yang telah menemukan harmoni dan kebahagiaan di Metland Cikarang.
        </motion.p>
      </div>

      {/* Infinite Marquee Rows */}
      <div className="relative w-full flex flex-col gap-8 pb-10">
        
        {/* Left Gradients for Smooth Edges */}
        <div className="absolute top-0 bottom-0 left-0 w-[10vw] bg-gradient-to-r from-[#050505] to-transparent z-20 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-[10vw] bg-gradient-to-l from-[#050505] to-transparent z-20 pointer-events-none" />

        {/* Row 1 - Moves Right to Left */}
        <div className="flex w-max relative overflow-hidden group">
          <motion.div 
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 40, ease: "linear", repeat: Infinity }}
            className="flex"
          >
            {/* Render array twice to create seamless loop */}
            {[...testimonialsRow1, ...testimonialsRow1].map((item, idx) => (
              <TestimonialCard key={`row1-${idx}`} item={item} />
            ))}
          </motion.div>
        </div>

        {/* Row 2 - Moves Left to Right */}
        <div className="flex w-max relative overflow-hidden group mt-4">
          <motion.div 
            animate={{ x: ["-50%", "0%"] }}
            transition={{ duration: 50, ease: "linear", repeat: Infinity }}
            className="flex"
          >
            {/* Render array twice to create seamless loop */}
            {[...testimonialsRow2, ...testimonialsRow2].map((item, idx) => (
              <TestimonialCard key={`row2-${idx}`} item={item} />
            ))}
          </motion.div>
        </div>
        
      </div>
    </section>
  );
}
