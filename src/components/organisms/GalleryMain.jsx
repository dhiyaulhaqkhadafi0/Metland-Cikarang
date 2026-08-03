"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { Maximize2, Sparkles } from "lucide-react";
import ImageLightbox from "../molecules/ImageLightbox";

// Using Cloudflare R2 URL from environment
const R2_URL = process.env.NEXT_PUBLIC_R2_URL || "";

const galleryData = [
  {
    id: 1,
    title: "Community Center",
    desc: "Anak bisa puas bermain, sementara ibu bisa kumpul arisan.",
    filename: "Anak bisa puas bermain, sementara ibu bisa kumpul arisan di Community Center Myzora. Myzora ting.jpg",
    className: "md:col-span-2 md:row-span-2"
  },
  {
    id: 2,
    title: "Work From Home",
    desc: "Bekerja dari rumah terasa lebih nyaman didukung ruang terang dan sejuk.",
    filename: "Bekerja dari rumah terasa lebih nyaman saat didukung ruang yang terang, sejuk, dan terhubung den.jpg",
    className: "md:col-span-1 md:row-span-1"
  },
  {
    id: 3,
    title: "Kehangatan Keluarga",
    desc: "Berkumpul bersama menikmati suasana sore yang asri di area terbuka.",
    filename: "Berkumpul bersama keluarga di area terbuka Myzora, menikmati suasana sore yang hangat dan asri t.jpg",
    className: "md:col-span-1 md:row-span-1"
  },
  {
    id: 4,
    title: "Gaya Hidup Sehat",
    desc: "Waktu olahraga sangat berharga. Di Myzora, hidup sehat jadi lebih mudah.",
    filename: "Buat kamu yang jadwalnya padat, waktu olahraga itu sangat berharga.Di Myzora, sehat jadi lebih k.jpg",
    className: "md:col-span-1 md:row-span-2"
  },
  {
    id: 5,
    title: "Elyra Backyard",
    desc: "Lahan belakang luas bukan sekadar bonus, melainkan alasan utama untuk pulang.",
    filename: "Di Tipe 56 Elyra, lahan belakang yang luas bukan bonus. Itu alasan utama kamu pulang dengan sema.jpg",
    className: "md:col-span-2 md:row-span-1"
  },
  {
    id: 6,
    title: "Kenyamanan Brassia",
    desc: "Jangan berikan toleransi untuk kenyamanan keluarga di Tipe 77 Brassia Garden.",
    filename: "Jangan kasih toleransi buat kenyamanan keluarga. Di Tipe 77 Brassia Garden, semua kemauan lo bua.jpg",
    className: "md:col-span-1 md:row-span-1"
  },
  {
    id: 7,
    title: "Brassia Fitness Room",
    desc: "Gym tak harus bikin macet di jalan, karena fasilitas lengkap sudah menanti.",
    filename: "Gym nggak harus jadi agenda yang bikin macet di jalan. Karena di Brassia Garden, fitness room su.jpg",
    className: "md:col-span-1 md:row-span-1"
  },
  {
    id: 8,
    title: "Sistem Keamanan",
    desc: "Tinggalkan rumah tanpa cemas dengan sistem keamanan ganda yang siap menjaga.",
    filename: "Meninggalkan rumah tanpa rasa cemas karena sistem keamanan ganda siap menjaga yang paling berhar.jpg",
    className: "md:col-span-1 md:row-span-2"
  },
  {
    id: 9,
    title: "Kota yang Bernapas",
    desc: "Kota yang dirancang untuk bernapas. Pulang dengan tenang di Metland Cikarang.",
    filename: "Kota yang dirancang untuk bernapas.Pulang Dengan Tenang, Tenang Dalam Doa#MetlandCikarang  #Sere.jpg",
    className: "md:col-span-2 md:row-span-2"
  },
  {
    id: 10,
    title: "Taman Tengah",
    desc: "Bebas pengap! Taman tengah memberikan udara segar setiap saat untuk si kecil.",
    filename: "Nggak perlu khawatir sirkulasi pengap. Taman tengah ini ngasih udara segar tiap saat buat si kec.jpg",
    className: "md:col-span-1 md:row-span-1"
  },
  {
    id: 11,
    title: "Jogging Track",
    desc: "Awali hari dengan jogging di lingkungan asri, lalu lanjutkan rutinitas Anda.",
    filename: "Pernah membayangkan memulai hari dengan jogging di lingkungan yang asri, lalu langsung lanjut me.jpg",
    className: "md:col-span-1 md:row-span-1"
  },
  {
    id: 12,
    title: "Smart Home Connectivity",
    desc: "Koneksi WiFi super cepat yang menjangkau hingga ke halaman rumah Anda.",
    filename: "WiFi yang nyampe sampai halaman. Myzora tinggal sedikit - info lengkapnya di link bio..jpg",
    className: "md:col-span-2 md:row-span-1"
  }
];

export default function GalleryMain() {
  const [activeImage, setActiveImage] = useState(null);

  // Helper to generate full URL based on R2 preference
  const getImageUrl = (filename) => {
    // Assuming images are in 'metland-assets' bucket under 'gallery umum/' prefix in R2
    // or we just use local if they were pushed to github
    const r2Url = R2_URL ? `${R2_URL}/gallery umum/${encodeURIComponent(filename)}` : null;
    const localUrl = `/gallery umum/${encodeURIComponent(filename)}`;
    return r2Url || localUrl;
  };

  return (
    <section className="py-32 px-6 relative bg-[#0a0a0a] overflow-hidden">
      
      {/* Lightbox */}
      <ImageLightbox 
        isOpen={!!activeImage}
        onClose={() => setActiveImage(null)}
        imageSrc={activeImage ? getImageUrl(activeImage.filename) : ""}
        altText={activeImage?.title}
      />

      {/* Decorative Gradients */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[150px] mix-blend-screen pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[180px] mix-blend-screen pointer-events-none" />
      
      {/* Grain Overlay */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.15] mix-blend-overlay pointer-events-none" />

      <div className="container mx-auto max-w-7xl relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-20">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 backdrop-blur-md mb-8"
          >
            <Sparkles size={16} className="text-emerald-400" />
            <span className="text-emerald-400 text-xs font-semibold tracking-[0.2em] uppercase">
              The Immersive Vision
            </span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-light text-white leading-tight mb-6"
          >
            Galeri <span className="italic font-serif font-medium text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-primary">Utama</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 max-w-2xl font-light text-lg md:text-xl leading-relaxed"
          >
            Jelajahi setiap sudut kehidupan premium di Metland Cikarang. Sebuah harmoni antara gaya hidup modern, ruang terbuka hijau, dan kehangatan keluarga.
          </motion.p>
        </div>

        {/* Bento Grid Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-4 auto-rows-[250px] gap-4 md:gap-6">
          {galleryData.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1, type: "spring", stiffness: 100 }}
              className={`relative rounded-3xl overflow-hidden group cursor-pointer border border-white/10 bg-dark-card ${item.className}`}
              onClick={() => setActiveImage(item)}
            >
              {/* Image */}
              <Image 
                src={getImageUrl(item.filename)}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-1000 group-hover:scale-110"
              />

              {/* Glassmorphism Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6 md:p-8">
                
                {/* Expand Icon */}
                <div className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100">
                  <Maximize2 size={20} />
                </div>

                <div className="transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="text-2xl md:text-3xl font-serif text-white mb-2">{item.title}</h3>
                  <p className="text-gray-300 text-sm md:text-base font-light leading-relaxed max-w-sm border-l-2 border-emerald-500 pl-4 ml-1">
                    {item.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
