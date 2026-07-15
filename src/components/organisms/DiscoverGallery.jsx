"use client";
import SectionReveal from "@/components/atoms/SectionReveal";
import { useState } from "react";
import { Camera, Maximize2 } from "lucide-react";

const photos = [
  { id: 1, src: "/gallery umum/area CBD & TOD Metland Cibitung.png", alt: "CBD Area", isMain: true },
  { id: 2, src: "/gallery umum/One Foresta District.png", alt: "One Foresta District" },
  { id: 3, src: "/gallery umum/bioskop platinum cineplex.jpeg", alt: "Bioskop Cineplex Platinum" },
  { id: 4, src: "/gallery umum/sekolah al azhar cibitung.jpeg", alt: "Edukasi Al-Azhar" },
  { id: 5, src: "/cluster brassia-garden-new/New Myzora.jpeg", alt: "Cluster Myzora" },
];

export default function DiscoverGallery() {
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <section className="bg-black py-32 relative overflow-hidden">
      {/* Background Ornaments */}
      <div className="absolute top-1/4 -right-32 w-[500px] h-[500px] bg-primary/15 blur-[200px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 -left-32 w-[500px] h-[500px] bg-emerald-700/10 blur-[200px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 mb-16 text-center relative z-10">
        <SectionReveal>
          <div className="flex items-center justify-center gap-3 mb-4 text-emerald-400">
            <Camera size={24} />
            <span className="font-semibold tracking-wider uppercase text-sm">Living Experience</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Gaya Hidup <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-200">Tanpa Batas</span>
          </h2>
          <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto">
            Kami tidak hanya membangun rumah, tapi merancang ruang di mana setiap momen keluarga menjadi memori berharga yang tak terlupakan.
          </p>
        </SectionReveal>
      </div>

      <SectionReveal delay={0.3} className="w-full relative z-10">
        {/* Immersive Mosaic Container */}
        <div className="w-full h-[500px] md:h-[700px] flex flex-col md:flex-row px-2 md:px-6 gap-2 md:gap-3">
          {photos.map((photo) => {
            // Logic for flex basis to create the Immersive Mosaic effect
            // If hovered, it expands massively, others shrink
            let flexBasis = photo.isMain ? "flex-[4]" : "flex-[1]";
            if (hoveredId !== null) {
              flexBasis = hoveredId === photo.id ? "flex-[8]" : "flex-[0.5]";
            }

            return (
              <div 
                key={photo.id}
                onMouseEnter={() => setHoveredId(photo.id)}
                onMouseLeave={() => setHoveredId(null)}
                className={`relative ${flexBasis} w-full md:w-auto h-full transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.25,1)] overflow-hidden rounded-[1.5rem] md:rounded-[2.5rem] group cursor-pointer border border-white/5`}
              >
                <img 
                  src={photo.src} 
                  alt={photo.alt} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1500ms] ease-out group-hover:scale-110 opacity-60 group-hover:opacity-100" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 group-hover:opacity-30 transition-opacity duration-700" />
                
                {/* Text Content */}
                <div className="absolute inset-0 p-6 md:p-10 flex flex-col justify-end pointer-events-none">
                  <div className="opacity-0 group-hover:opacity-100 translate-y-12 group-hover:translate-y-0 transition-all duration-700 delay-100 ease-out flex items-end justify-between">
                    <div>
                      <h3 className="text-2xl md:text-4xl font-bold text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] max-w-sm leading-tight">{photo.alt}</h3>
                      <div className="w-12 h-1 bg-primary mt-4 rounded-full" />
                    </div>
                    <button className="w-12 h-12 md:w-16 md:h-16 shrink-0 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white transition-colors border border-white/30 shadow-lg">
                      <Maximize2 size={24} />
                    </button>
                  </div>
                </div>

                {/* Vertical Text when shrunk (Desktop only) */}
                <div className="absolute inset-0 flex items-center justify-center opacity-100 group-hover:opacity-0 transition-opacity duration-300 hidden md:flex">
                  {(hoveredId !== null && hoveredId !== photo.id) && (
                    <span className="text-white font-bold tracking-widest uppercase text-sm -rotate-90 whitespace-nowrap opacity-50">
                      Lihat Foto
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </SectionReveal>
    </section>
  );
}
