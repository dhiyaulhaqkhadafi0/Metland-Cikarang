"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/organisms/Navbar";
import Footer from "@/components/organisms/Footer";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Scale, ShieldCheck } from "lucide-react";

export default function LegalLayout({ children }) {
  const pathname = usePathname();

  const links = [
    {
      href: "/legal/terms",
      label: "Syarat & Ketentuan",
      icon: Scale,
      active: pathname === "/legal/terms"
    },
    {
      href: "/legal/privacy",
      label: "Kebijakan Privasi",
      icon: ShieldCheck,
      active: pathname === "/legal/privacy"
    }
  ];

  return (
    <div className="min-h-screen bg-[#020202] text-gray-200 selection:bg-emerald-500/30 font-sans flex flex-col">
      <Navbar />

      <main className="flex-grow relative pt-32 pb-20 md:pt-40 md:pb-32 px-4 sm:px-6 lg:px-8 container mx-auto max-w-6xl z-10">
        
        {/* Background Ambient */}
        <div className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] bg-emerald-500/5 rounded-full blur-[150px] pointer-events-none mix-blend-screen" />
        <div className="absolute bottom-1/4 right-1/4 w-[30vw] h-[30vw] bg-blue-500/5 rounded-full blur-[150px] pointer-events-none mix-blend-screen" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none" />

        <div className="text-center md:text-left mb-12 relative z-10">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-white mb-4">
              Pusat <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500">Legalitas</span>
            </h1>
            <p className="text-gray-400 font-light">
              Transparansi dan komitmen kami terhadap privasi serta hak Anda.
            </p>
          </motion.div>
        </div>

        <div className="flex flex-col md:flex-row gap-8 relative z-10">
          {/* Sidebar Navigation */}
          <aside className="w-full md:w-64 shrink-0">
            <nav className="flex md:flex-col gap-2 overflow-x-auto pb-4 md:pb-0 md:sticky md:top-32 scrollbar-hide">
              {links.map((link) => (
                <Link key={link.href} href={link.href}>
                  <div className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                    link.active 
                      ? "bg-white/10 text-white border border-white/20 shadow-md backdrop-blur-md" 
                      : "text-gray-500 hover:text-gray-300 hover:bg-white/5 border border-transparent"
                  }`}>
                    <link.icon className={`w-5 h-5 ${link.active ? "text-emerald-400" : ""}`} />
                    <span className="text-sm font-medium whitespace-nowrap">{link.label}</span>
                  </div>
                </Link>
              ))}
            </nav>
          </aside>

          {/* Main Content Area */}
          <div className="flex-grow">
            <motion.div
              key={pathname} // Re-animate on route change
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-[#0a0a0b]/80 backdrop-blur-xl border border-white/5 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-[80px] pointer-events-none" />
              {children}
            </motion.div>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
