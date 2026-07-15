"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Home, Calendar, Wallet, Building2 } from "lucide-react";

import PropertyWizard from "./comparison/PropertyWizard";
import TimingWizard from "./comparison/TimingWizard";
import PaymentWizard from "./comparison/PaymentWizard";
import TypeWizard from "./comparison/TypeWizard";

export default function SmartComparisonCapability({ onBack }) {
  const [selectedMode, setSelectedMode] = useState(null);

  const renderMode = () => {
    switch(selectedMode) {
      case "property": return <PropertyWizard onBack={() => setSelectedMode(null)} onSwitchToConsultant={onBack} />;
      case "timing": return <TimingWizard onBack={() => setSelectedMode(null)} />;
      case "payment": return <PaymentWizard onBack={() => setSelectedMode(null)} />;
      case "type": return <TypeWizard onBack={() => setSelectedMode(null)} />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0b] flex flex-col items-center justify-center p-6 sm:p-12 font-sans relative overflow-hidden">
      
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Header */}
      {!selectedMode && (
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-5xl mb-12 flex items-center justify-between z-10">
          <button onClick={onBack} className="flex items-center text-gray-400 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Kembali ke Hub
          </button>
          <div className="text-right">
            <h1 className="text-2xl font-bold text-white tracking-tight">Decision Lab</h1>
            <p className="text-gray-500 text-sm">Smart Comparison Engine V2</p>
          </div>
        </motion.div>
      )}

      {/* Mode Selection */}
      <AnimatePresence mode="wait">
        {!selectedMode ? (
          <motion.div 
            key="selection"
            initial={{ opacity: 0, scale: 0.95 }} 
            animate={{ opacity: 1, scale: 1 }} 
            exit={{ opacity: 0, y: -20 }}
            className="w-full max-w-5xl z-10"
          >
            <div className="text-center mb-12">
              <h2 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-500 mb-6">Pilih Skenario Anda</h2>
              <p className="text-lg text-gray-400 max-w-2xl mx-auto">SMI akan menyesuaikan alur analisis, kalkulasi finansial, dan proyeksi berdasarkan situasi spesifik Anda.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <button onClick={() => setSelectedMode("property")} className="group bg-[#111113] hover:bg-blue-900/20 border border-white/5 hover:border-blue-500/50 p-8 rounded-3xl text-left transition-all hover:-translate-y-1">
                <div className="w-14 h-14 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Home className="w-7 h-7 text-blue-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Antar Cluster</h3>
                <p className="text-gray-500 line-clamp-2">Bandingkan 2 unit antar cluster secara Head-to-Head. Hasil: Trade-off & Tabel Spesifikasi.</p>
              </button>

              <button onClick={() => setSelectedMode("timing")} className="group bg-[#111113] hover:bg-emerald-900/20 border border-white/5 hover:border-emerald-500/50 p-8 rounded-3xl text-left transition-all hover:-translate-y-1">
                <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Calendar className="w-7 h-7 text-emerald-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Waktu Pembelian</h3>
                <p className="text-gray-500 line-clamp-2">Beli sekarang vs tunda beberapa tahun. Hasil: Cost of Delay & Simulasi Kenaikan Harga.</p>
              </button>

              <button onClick={() => setSelectedMode("payment")} className="group bg-[#111113] hover:bg-purple-900/20 border border-white/5 hover:border-purple-500/50 p-8 rounded-3xl text-left transition-all hover:-translate-y-1">
                <div className="w-14 h-14 bg-purple-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Wallet className="w-7 h-7 text-purple-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Skema Pembayaran</h3>
                <p className="text-gray-500 line-clamp-2">Bandingkan Cash Keras vs KPR. Hasil: Selisih pembayaran & simulasi bunga.</p>
              </button>

              <button onClick={() => setSelectedMode("type")} className="group bg-[#111113] hover:bg-orange-900/20 border border-white/5 hover:border-orange-500/50 p-8 rounded-3xl text-left transition-all hover:-translate-y-1">
                <div className="w-14 h-14 bg-orange-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Building2 className="w-7 h-7 text-orange-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Tipe Properti</h3>
                <p className="text-gray-500 line-clamp-2">Pilih antara Rumah Residensial atau Ruko Komersial. Hasil: Legalitas & Bisnis.</p>
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="wizard"
            initial={{ opacity: 0, scale: 0.95 }} 
            animate={{ opacity: 1, scale: 1 }} 
            className="w-full z-10"
          >
            {renderMode()}
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
