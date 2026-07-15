"use client";

import { motion } from "framer-motion";
import SmartFinderCapability from "@/components/smi/SmartFinderCapability";

export default function SmartPropertyFinder() {
  return (
    <section className="py-24 bg-dark-bg relative overflow-hidden" id="smart-finder">
      <div className="absolute top-[10%] right-[10%] w-[30%] h-[40%] rounded-full bg-secondary/10 blur-[120px] pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10 w-full max-w-4xl">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-title font-bold text-light-text mb-4"
          >
            Smart Property Finder
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-text text-lg"
          >
            SMI Intelligence Engine: Temukan unit yang paling sempurna untuk Anda hanya dalam beberapa langkah.
          </motion.p>
        </div>

        <SmartFinderCapability isFullScreen={false} />

      </div>
    </section>
  );
}
