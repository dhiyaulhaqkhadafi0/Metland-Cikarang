"use client";

import Navbar from "@/components/organisms/Navbar";
import Footer from "@/components/organisms/Footer";
import HeroKPR from "@/components/kpr/HeroKPR";
import QuickSimulation from "@/components/kpr/QuickSimulation";
import PromoKPR from "@/components/kpr/PromoKPR";
import BankPartners from "@/components/kpr/BankPartners";
import GuideFAQ from "@/components/kpr/GuideFAQ";
import TimelineKPR from "@/components/kpr/TimelineKPR";
import Calculators from "@/components/kpr/Calculators";
import PaymentMethods from "@/components/kpr/PaymentMethods";

export default function KPRPage() {
  return (
    <main className="min-h-screen bg-[#020202] text-gray-200 flex flex-col font-sans selection:bg-emerald-500/30 selection:text-emerald-200 overflow-x-hidden">
      <Navbar />
      
      {/* Hero Section */}
      <HeroKPR />

      {/* Quick Simulation (Non-AI) */}
      <QuickSimulation />

      {/* Mini Calculators */}
      <Calculators />

      {/* Payment Methods */}
      <PaymentMethods />

      {/* Promos */}
      <PromoKPR />

      {/* Partner Banks */}
      <BankPartners />

      {/* Process Timeline */}
      <TimelineKPR />

      {/* KPR Academy & FAQ */}
      <GuideFAQ />

      <Footer />
    </main>
  );
}
