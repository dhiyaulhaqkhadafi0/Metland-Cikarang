"use client";
import SectionReveal from "@/components/atoms/SectionReveal";
import { TreePine, Train, Users, Smartphone, ArrowRight } from "lucide-react";
import Link from "next/link";

const features = [
  {
    id: "forest",
    title: "Forest Serenity",
    desc: "Kawasan perumahan yang memadukan desain modern dengan ketenangan hutan kota yang asri.",
    image: "/gallery umum/peta_kawasan_utama_1755437190_METLAND URBAN FOREST_Bird Eye View 01_REV 02.jpg", 
  },
  {
    id: "transit",
    title: "Seamless Transit",
    desc: "Hanya selangkah menuju Stasiun KRL dan akses tol langsung untuk mobilitas harian.",
    image: "/gallery umum/stasiun metland telaga murni.jpg",
  },
  {
    id: "community",
    title: "Active Community",
    desc: "Fasilitas olahraga, taman, dan ruang publik untuk kehidupan sosial yang inklusif dan sehat.",
    image: "/gallery umum/active community.png", 
  },
  {
    id: "smart",
    title: "Smart Township",
    desc: "Kawasan komersial terintegrasi dan teknologi pintar untuk masa depan berkelanjutan.",
    image: "/gallery umum/area CBD & TOD Metland Cibitung.png",
  },
];

export default function DiscoverWhyChoose() {
  return (
    <section className="py-24 bg-dark-bg relative z-20 overflow-hidden">
      
      {/* Ambient Glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <SectionReveal>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Mengapa Memilih Metland Cikarang?
            </h2>
          </SectionReveal>
          <SectionReveal delay={0.2}>
            <p className="text-gray-400 text-lg md:text-xl leading-relaxed">
              Kami tidak sekadar membangun rumah, tetapi merancang ekosistem di mana Anda dan keluarga dapat tumbuh, berjejaring, dan merayakan kehidupan.
            </p>
          </SectionReveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-20">
          {features.map((feature, index) => (
            <SectionReveal key={feature.id} delay={0.2 + index * 0.1}>
              <div className="group relative h-[450px] rounded-[2.5rem] overflow-hidden cursor-pointer shadow-2xl">
                {/* Background Image */}
                <img 
                  src={feature.image} 
                  alt={feature.title} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110 opacity-70 group-hover:opacity-100 grayscale-[15%] group-hover:grayscale-0"
                />
                
                {/* Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-dark-bg/60 to-transparent opacity-90 group-hover:opacity-70 transition-opacity duration-700" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-700" />

                {/* Content */}
                <div className="absolute inset-0 p-10 flex flex-col justify-end pointer-events-none">
                  <div className="translate-y-12 group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.2,1,0.2,1)]">
                    <h3 className="text-3xl md:text-4xl font-extrabold text-white mb-4 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">{feature.title}</h3>
                    <p className="text-gray-200 text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100 max-w-md drop-shadow-md">
                      {feature.desc}
                    </p>
                    <div className="mt-6 w-12 h-1 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-all duration-700 delay-200 transform -translate-x-4 group-hover:translate-x-0" />
                  </div>
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>

        {/* Social Proof / Community */}
        <SectionReveal delay={0.6}>
          <div className="max-w-4xl mx-auto bg-dark-card border border-white/10 p-8 md:p-12 rounded-[2.5rem] flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)]">
            {/* Soft Glow */}
            <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-40 h-40 bg-primary/20 rounded-full blur-[80px]" />
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-[60px]" />
            
            <div className="flex-1 relative z-10 text-center md:text-left">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Bergabunglah Bersama Ekosistem Kami</h3>
              <p className="text-gray-300 text-lg leading-relaxed">
                Jadilah bagian dari komunitas dinamis yang terdiri dari para <strong className="text-emerald-400 font-semibold">pengusaha, pebisnis, profesional, dan keluarga muda</strong>. Bersama membangun kehidupan yang lebih berkualitas.
              </p>
            </div>
            
            <div className="flex items-center gap-6 relative z-10">
              <div className="w-20 h-20 rounded-2xl border border-white/20 bg-gradient-to-br from-primary to-emerald-700 text-white flex flex-col items-center justify-center font-extrabold text-xl shadow-[0_0_30px_rgba(52,211,153,0.3)]">
                <span className="text-2xl">500+</span>
                <span className="text-[10px] uppercase tracking-widest opacity-80 mt-1">Keluarga</span>
              </div>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
