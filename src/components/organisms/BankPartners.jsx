"use client";

import { motion } from "framer-motion";

const banks = [
  { name: "BCA", logo: "/bank-partner/bca-bank-logo-png_seeklogo-232742 (1).png", scale: "scale-150" },
  { name: "BRI", logo: "/bank-partner/bank bri.png", scale: "scale-100" },
  { name: "Mandiri", logo: "/bank-partner/bank mandiri.png", scale: "scale-100" },
  { name: "BSI", logo: "/bank-partner/bank bsi.png", scale: "scale-150" },
  { name: "NOBU", logo: "/bank-partner/bank nobu.png", scale: "scale-100" },
  { name: "BNI", logo: "/bank-partner/bank bni.png", scale: "scale-100" },
  { name: "BTN", logo: "/bank-partner/bank btn.png", scale: "scale-125" },
];

export default function BankPartners() {
  return (
    <section className="py-12 bg-dark-bg border-y border-border overflow-hidden">
      <div className="container mx-auto px-6 mb-6">
        <p className="text-center text-sm font-medium text-gray-text uppercase tracking-widest">
          Telah Dipercaya Oleh :
        </p>
      </div>

      <div className="relative flex w-full flex-col">
        {/* Left/Right Fade Gradients */}
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-dark-bg to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-dark-bg to-transparent z-10 pointer-events-none" />

        {/* Marquee Track */}
        <div className="flex w-fit animate-marquee space-x-20 px-10">
          {/* Double the list to create infinite loop effect */}
          {[...banks, ...banks].map((bank, index) => (
            <div 
              key={index} 
              className="flex items-center justify-center hover:scale-110 transition-transform duration-300 min-w-[160px] h-16"
            >
              <img 
                src={bank.logo} 
                alt={`${bank.name} Logo`} 
                className={`max-h-full max-w-full object-contain filter brightness-0 invert opacity-80 hover:opacity-100 transition-opacity drop-shadow-md ${bank.scale}`}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
