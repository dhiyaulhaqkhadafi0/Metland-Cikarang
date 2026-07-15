"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Wallet, LineChart, ShieldAlert, ArrowRight, ArrowLeft, Loader2, Cpu } from "lucide-react";

export default function DeepAnalysis({ data, updateData, onNext, onPrev }) {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);

  const LOADING_MESSAGES = [
    "Menganalisis pola Cash Flow...",
    "Menghitung rasio hutang (Debt Service Ratio)...",
    "Memproyeksikan inflasi & suku bunga ke depan...",
    "Mencocokkan profil risiko dengan skema bank...",
    "Menyusun rekomendasi finansial strategis..."
  ];

  const handleAnalyze = () => {
    setIsAnalyzing(true);
  };

  useEffect(() => {
    if (isAnalyzing) {
      if (loadingStep < LOADING_MESSAGES.length) {
        const timer = setTimeout(() => {
          setLoadingStep(prev => prev + 1);
        }, 1200); // 1.2s per step
        return () => clearTimeout(timer);
      } else {
        const timer = setTimeout(() => {
          onNext();
        }, 500);
        return () => clearTimeout(timer);
      }
    }
  }, [isAnalyzing, loadingStep, onNext]);

  const handleCashflowChange = (field, value) => {
    updateData("cashflow", { ...data.cashflow, [field]: Number(value) });
  };

  if (isAnalyzing) {
    return (
      <div className="bg-[#0a0a0b] border border-emerald-500/30 rounded-3xl p-12 text-center min-h-[400px] flex flex-col items-center justify-center relative overflow-hidden shadow-[0_0_50px_rgba(16,185,129,0.1)]">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-20" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-emerald-500/20 rounded-full blur-[80px]" />
        
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="relative z-10 mb-8"
        >
          <div className="w-20 h-20 border-4 border-emerald-500/20 border-t-emerald-400 rounded-full" />
        </motion.div>

        <h2 className="text-2xl font-bold text-white mb-2 relative z-10">SMI Sedang Menganalisis</h2>
        
        <div className="h-8 relative z-10">
          <motion.p
            key={loadingStep}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-emerald-400 font-medium"
          >
            {LOADING_MESSAGES[Math.min(loadingStep, LOADING_MESSAGES.length - 1)]}
          </motion.p>
        </div>

        <div className="w-full max-w-md bg-white/5 rounded-full h-2 mt-8 overflow-hidden relative z-10">
          <motion.div 
            className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400"
            initial={{ width: "0%" }}
            animate={{ width: `${(loadingStep / LOADING_MESSAGES.length) * 100}%` }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          />
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12"
    >
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-white mb-4">Deep Financial Analysis</h2>
        <p className="text-gray-400">Untuk memberikan rekomendasi terakurat, AI kami butuh memahami detail arus kas dan preferensi risiko Anda.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        
        {/* Kolom Kiri: Cash Flow */}
        <div className="space-y-8">
          <div>
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Wallet className="w-5 h-5 text-emerald-400" /> Cash Flow Bulanan
            </h3>
            <div className="space-y-4">
              <InputRupiah label="Transportasi & Komunikasi" value={data.cashflow.transport} onChange={(v) => handleCashflowChange("transport", v)} />
              <InputRupiah label="Asuransi & Kesehatan" value={data.cashflow.insurance} onChange={(v) => handleCashflowChange("insurance", v)} />
              <InputRupiah label="Investasi & Tabungan Rutin" value={data.cashflow.investment} onChange={(v) => handleCashflowChange("investment", v)} />
              <InputRupiah label="Cicilan Aktif Lainnya (Mobil/CC/Pinjol)" value={data.cashflow.otherDebt} onChange={(v) => handleCashflowChange("otherDebt", v)} />
              {data.profile.children > 0 && (
                <InputRupiah label="Biaya Anak & Pendidikan" value={data.cashflow.kids} onChange={(v) => handleCashflowChange("kids", v)} />
              )}
            </div>
          </div>
        </div>

        {/* Kolom Kanan: Future Planning & Risk */}
        <div className="space-y-8">
          <div>
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <LineChart className="w-5 h-5 text-emerald-400" /> Future Planning
            </h3>
            <div className="space-y-4">
              <InputRupiah label="Dana Darurat Saat Ini" value={data.future.emergencyFund} onChange={(v) => updateData("future", { ...data.future, emergencyFund: Number(v) })} />
              <InputRupiah label="Tabungan Tunai" value={data.future.savings} onChange={(v) => updateData("future", { ...data.future, savings: Number(v) })} />
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-emerald-400" /> Risk Preference
            </h3>
            <div className="space-y-3">
              {[
                { id: "Aman", desc: "Prioritaskan cicilan kecil & aman untuk cash flow." },
                { id: "Cepat Lunas", desc: "Saya sanggup cicilan besar agar cepat lunas." },
                { id: "Investasi", desc: "Maksimalkan leverage bank untuk investasi lain." }
              ].map(risk => (
                <button
                  key={risk.id}
                  onClick={() => updateData("risk", risk.id)}
                  className={`w-full text-left px-5 py-4 rounded-xl border transition-all ${
                    data.risk === risk.id 
                      ? "bg-emerald-500/10 border-emerald-500 text-white" 
                      : "bg-black/50 border-white/10 text-gray-400 hover:border-white/30 hover:bg-white/5"
                  }`}
                >
                  <div className="font-bold mb-1 text-sm">{risk.id}</div>
                  <div className={`text-xs ${data.risk === risk.id ? 'text-emerald-300' : 'text-gray-500'}`}>{risk.desc}</div>
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>

      <div className="mt-16 flex items-center justify-between border-t border-white/10 pt-8">
        <button 
          onClick={onPrev}
          className="px-6 py-3 text-gray-400 font-medium hover:text-white transition-colors flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" /> Kembali
        </button>
        <button 
          onClick={handleAnalyze}
          className="px-8 py-3 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-bold rounded-full transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(16,185,129,0.3)]"
        >
          <Cpu className="w-4 h-4" /> Mulai Analisis AI
        </button>
      </div>

    </motion.div>
  );
}

// Helper Component for Input Rupiah
function InputRupiah({ label, value, onChange }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-400 mb-2">{label}</label>
      <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm font-medium">Rp</span>
        <input 
          type="number" 
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-black/50 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors"
        />
      </div>
    </div>
  );
}
