"use client";

import { motion } from "framer-motion";
import { MapPin, Train, ShoppingBag, Hospital, GraduationCap, Briefcase } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const mapPoints = [
  { id: 1, name: "Stasiun KRL Cikarang", category: "transport", distance: "5 Menit", icon: Train, top: "20%", left: "30%" },
  { id: 2, name: "Exit Tol Telaga Asih", category: "transport", distance: "10 Menit", icon: MapPin, top: "40%", left: "70%" },
  { id: 3, name: "SGC Mall", category: "lifestyle", distance: "7 Menit", icon: ShoppingBag, top: "60%", left: "40%" },
  { id: 4, name: "RS Sentra Medika", category: "health", distance: "12 Menit", icon: Hospital, top: "30%", left: "60%" },
  { id: 5, name: "President University", category: "education", distance: "15 Menit", icon: GraduationCap, top: "75%", left: "65%" },
  { id: 6, name: "Kawasan Industri MM2100", category: "business", distance: "20 Menit", icon: Briefcase, top: "50%", left: "20%" },
];

export default function InteractiveAreaMap() {
  const [activePoint, setActivePoint] = useState(null);

  return (
    <section className="py-24 bg-dark-card relative overflow-hidden border-t border-border" id="area-map">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-title font-bold text-light-text mb-4"
          >
            Pusat Segala Akses.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-text text-lg max-w-2xl mx-auto"
          >
            Metland Cikarang dikelilingi oleh infrastruktur premium yang terus berkembang, menjadikan nilai investasi Anda terus meroket.
          </motion.p>
        </div>

        {/* Interactive Map Area */}
        <div className="relative w-full aspect-square md:aspect-video bg-dark-bg rounded-3xl border border-border overflow-hidden shadow-card group">
          
          {/* Abstract Map Background */}
          <div className="absolute inset-0 opacity-20 pointer-events-none">
             <div className="w-full h-full bg-[linear-gradient(to_right,#10b98110_1px,transparent_1px),linear-gradient(to_bottom,#10b98110_1px,transparent_1px)] bg-[size:2rem_2rem]" />
             {/* Simulated topo lines or abstract blobs */}
             <div className="absolute top-[20%] left-[30%] w-[40%] h-[40%] rounded-[40%_60%_70%_30%] border border-primary/30" />
             <div className="absolute top-[25%] left-[32%] w-[36%] h-[36%] rounded-[50%_50%_60%_40%] border border-primary/20" />
          </div>
          
          {/* Central Point (Metland Cikarang) */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-10 pointer-events-none">
            <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center animate-pulse shadow-emerald-glow">
              <div className="w-2 h-2 rounded-full bg-white" />
            </div>
            <span className="mt-2 font-title font-bold text-white bg-dark-bg/80 px-3 py-1 rounded-full border border-primary/50 text-sm backdrop-blur-md">
              Metland Cikarang
            </span>
          </div>

          {/* Map Points */}
          {mapPoints.map((point) => (
            <motion.div
              key={point.id}
              className="absolute z-20 flex flex-col items-center group/point cursor-pointer"
              style={{ top: point.top, left: point.left }}
              onMouseEnter={() => setActivePoint(point.id)}
              onMouseLeave={() => setActivePoint(null)}
              whileHover={{ scale: 1.1 }}
            >
              <div className={cn(
                "w-10 h-10 rounded-full border border-border flex items-center justify-center bg-dark-card/90 backdrop-blur-md transition-all duration-300",
                activePoint === point.id ? "border-secondary text-secondary shadow-gold-glow bg-dark-bg" : "text-gray-text hover:text-white"
              )}>
                <point.icon className="w-5 h-5" />
              </div>
              
              <div className={cn(
                "absolute top-12 whitespace-nowrap px-4 py-2 bg-dark-card border border-border rounded-xl shadow-lg transition-all duration-300 pointer-events-none",
                activePoint === point.id ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
              )}>
                <p className="font-title font-semibold text-light-text text-sm">{point.name}</p>
                <p className="text-xs text-primary font-medium mt-0.5">{point.distance}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
