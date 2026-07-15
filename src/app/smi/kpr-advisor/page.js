"use client";

import Navbar from "@/components/organisms/Navbar";
import Footer from "@/components/organisms/Footer";
import SmartKPRAdvisor from "@/components/smi/kpr/SmartKPRAdvisor";

export default function SmartKPRAdvisorPage() {
  return (
    <main className="min-h-screen bg-[#020202] text-gray-200 flex flex-col font-sans selection:bg-emerald-500/30 selection:text-emerald-200 overflow-x-hidden">
      <Navbar />
      <div className="flex-1 pt-24 pb-20">
        <SmartKPRAdvisor />
      </div>
      <Footer />
    </main>
  );
}
