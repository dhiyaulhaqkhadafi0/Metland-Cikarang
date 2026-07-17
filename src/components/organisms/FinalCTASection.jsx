"use client";

import { motion } from "framer-motion";
import { ArrowRight, CalendarDays, PhoneCall } from "lucide-react";

export default function FinalCTASection() {
  return (
    <section className="py-24 relative overflow-hidden bg-dark-bg border-t border-border">
      <div className="absolute inset-0 w-full h-full bg-[linear-gradient(to_right,#10b98115_1px,transparent_1px),linear-gradient(to_bottom,#10b98115_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_20%,transparent_100%)] pointer-events-none opacity-50" />
      
      <div className="container mx-auto px-6 max-w-5xl relative z-10 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-dark-card border border-border p-12 md:p-20 rounded-[3rem] shadow-emerald-glow relative overflow-hidden"
        >
          {/* Abstract blobs */}
          <div className="absolute top-[-50%] left-[-20%] w-[70%] h-[70%] rounded-full bg-primary/10 blur-[100px]" />
          <div className="absolute bottom-[-50%] right-[-20%] w-[70%] h-[70%] rounded-full bg-secondary/10 blur-[100px]" />

          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-title font-bold text-light-text mb-6">
              Mulai Perjalanan Anda. <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-300">
                Jadwalkan Kunjungan Hari Ini.
              </span>
            </h2>
            <p className="text-gray-text text-lg md:text-xl mb-12 max-w-2xl mx-auto">
              Jangan hanya membayangkannya. Rasakan langsung kualitas mahakarya properti kami. Tim expert kami siap menyambut dan mendampingi Anda di lokasi.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <button 
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-primary to-emerald-600 text-white font-semibold text-lg shadow-emerald-glow hover:scale-105 transition-transform flex items-center justify-center"
                suppressHydrationWarning
              >
                <CalendarDays className="w-5 h-5 mr-3" /> Booking Visit
              </button>
              <button 
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-transparent border border-border text-light-text hover:border-primary hover:text-primary transition-colors font-semibold text-lg flex items-center justify-center"
                suppressHydrationWarning
              >
                <PhoneCall className="w-5 h-5 mr-3" /> Hubungi Sales
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
