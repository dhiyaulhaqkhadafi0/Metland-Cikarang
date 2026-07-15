"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calculator, Wallet, Target, PiggyBank } from "lucide-react";

const formatRupiah = (num) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(num || 0);
};

export default function Calculators() {
  const [activeTab, setActiveTab] = useState("dp");

  // State for DP Ideal
  const [priceDP, setPriceDP] = useState(800000000);

  // State for Kemampuan Beli
  const [income, setIncome] = useState(15000000);
  const [otherDebt, setOtherDebt] = useState(2000000);

  const TABS = [
    { id: "dp", label: "DP Ideal", icon: PiggyBank },
    { id: "budget", label: "Kemampuan Beli", icon: Target },
    { id: "cicilan", label: "Cicilan Maksimal", icon: Wallet },
  ];

  return (
    <section className="py-24 bg-[#020202] relative border-t border-white/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Financial Tools</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Gunakan perangkat perhitungan sederhana ini untuk memproyeksikan target finansial dan kapabilitas keuangan Anda sebelum membeli rumah.
          </p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden backdrop-blur-md">
          {/* Tabs */}
          <div className="flex flex-col sm:flex-row border-b border-white/10">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center gap-2 py-5 px-4 text-sm font-semibold transition-all ${
                  activeTab === tab.id 
                    ? "bg-emerald-500/10 text-emerald-400 border-b-2 border-emerald-400" 
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Content Area */}
          <div className="p-8 sm:p-12 min-h-[400px] flex items-center">
            <AnimatePresence mode="wait">
              
              {/* DP Ideal */}
              {activeTab === "dp" && (
                <motion.div
                  key="dp"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="w-full max-w-3xl mx-auto"
                >
                  <h3 className="text-2xl font-bold text-white mb-2 text-center">Berapa DP Ideal Anda?</h3>
                  <p className="text-gray-400 text-center mb-10 text-sm">Menghitung skenario Uang Muka untuk meminimalisir cicilan bulanan.</p>
                  
                  <div className="mb-10">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
                      <label className="text-white font-medium">Harga Properti Incaran</label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">Rp</span>
                        <input 
                          type="number"
                          value={priceDP}
                          onChange={(e) => setPriceDP(Number(e.target.value))}
                          className="bg-black/50 border border-white/10 rounded-xl px-3 pl-10 py-1.5 text-emerald-400 font-bold w-40 focus:outline-none focus:border-emerald-500"
                        />
                      </div>
                    </div>
                    <input 
                      type="range" min={300000000} max={3000000000} step={50000000} value={priceDP} 
                      onChange={(e) => setPriceDP(Number(e.target.value))}
                      className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {[10, 20, 30, 40].map((percent) => (
                      <div key={percent} className="bg-black/50 border border-white/10 rounded-2xl p-4 text-center">
                        <div className="text-emerald-400 font-bold mb-1">{percent}%</div>
                        <div className="text-white font-semibold text-lg">{formatRupiah(priceDP * (percent/100))}</div>
                        <div className="text-gray-500 text-xs mt-2">Plafon: {formatRupiah(priceDP - (priceDP * (percent/100)))}</div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Kemampuan Beli */}
              {activeTab === "budget" && (
                <motion.div
                  key="budget"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="w-full max-w-3xl mx-auto"
                >
                  <h3 className="text-2xl font-bold text-white mb-2 text-center">Estimasi Kemampuan Beli</h3>
                  <p className="text-gray-400 text-center mb-10 text-sm">Menghitung budget maksimal harga rumah berdasarkan penghasilan (Asumsi DSR 30%).</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-8">
                      <div>
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
                          <label className="text-white font-medium">Gaji Bulanan (Nett)</label>
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">Rp</span>
                            <input 
                              type="number"
                              value={income}
                              onChange={(e) => setIncome(Number(e.target.value))}
                              className="bg-black/50 border border-white/10 rounded-xl px-3 pl-10 py-1.5 text-emerald-400 font-bold w-40 focus:outline-none focus:border-emerald-500"
                            />
                          </div>
                        </div>
                        <input 
                          type="range" min={5000000} max={50000000} step={1000000} value={income} 
                          onChange={(e) => setIncome(Number(e.target.value))}
                          className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                        />
                      </div>
                      <div>
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
                          <label className="text-white font-medium">Cicilan Aktif Lainnya</label>
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">Rp</span>
                            <input 
                              type="number"
                              value={otherDebt}
                              onChange={(e) => setOtherDebt(Number(e.target.value))}
                              className="bg-black/50 border border-white/10 rounded-xl px-3 pl-10 py-1.5 text-red-400 font-bold w-40 focus:outline-none focus:border-red-500"
                            />
                          </div>
                        </div>
                        <input 
                          type="range" min={0} max={20000000} step={500000} value={otherDebt} 
                          onChange={(e) => setOtherDebt(Number(e.target.value))}
                          className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-red-500"
                        />
                      </div>
                    </div>

                    <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-8 flex flex-col justify-center items-center text-center">
                      <p className="text-gray-400 text-sm mb-2">Estimasi Harga Rumah Maksimal</p>
                      {/* Sangat kasar: Kapasitas cicilan = (30% dari income) - otherDebt. Plafon = kapasitas cicilan * 100 (asumsi kasar bunga + tenor). Harga rumah = Plafon / 0.9 */}
                      {(() => {
                        const capacity = (income * 0.35) - otherDebt;
                        const estimatedPlafon = capacity > 0 ? capacity * 100 : 0;
                        const maxHousePrice = estimatedPlafon / 0.9; // 10% DP
                        return (
                          <>
                            <div className="text-4xl font-bold text-white mb-4">
                              {capacity > 0 ? formatRupiah(maxHousePrice) : "Rp 0"}
                            </div>
                            <p className="text-xs text-emerald-400 bg-emerald-500/20 px-3 py-1 rounded-full">
                              Kapasitas Cicilan: {capacity > 0 ? formatRupiah(capacity) : "Rp 0"}/bln
                            </p>
                          </>
                        );
                      })()}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Cicilan Maksimal */}
              {activeTab === "cicilan" && (
                <motion.div
                  key="cicilan"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="w-full max-w-3xl mx-auto"
                >
                  <h3 className="text-2xl font-bold text-white mb-2 text-center">Limit Cicilan Maksimal (DSR)</h3>
                  <p className="text-gray-400 text-center mb-10 text-sm">Menurut Bank Indonesia, Debt Service Ratio (DSR) atau rasio total cicilan yang sehat maksimal 30-40% dari Gaji.</p>
                  
                  <div className="mb-10">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
                      <label className="text-white font-medium">Total Penghasilan (Join Income)</label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">Rp</span>
                        <input 
                          type="number"
                          value={income}
                          onChange={(e) => setIncome(Number(e.target.value))}
                          className="bg-black/50 border border-white/10 rounded-xl px-3 pl-10 py-1.5 text-emerald-400 font-bold w-40 focus:outline-none focus:border-emerald-500"
                        />
                      </div>
                    </div>
                    <input 
                      type="range" min={5000000} max={100000000} step={1000000} value={income} 
                      onChange={(e) => setIncome(Number(e.target.value))}
                      className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-6 text-center">
                      <div className="text-emerald-400 font-bold text-xl mb-1">DSR 30%</div>
                      <div className="text-xs text-gray-400 mb-3">(Sangat Sehat)</div>
                      <div className="text-white font-bold text-2xl">{formatRupiah(income * 0.3)}</div>
                    </div>
                    <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-6 text-center">
                      <div className="text-amber-400 font-bold text-xl mb-1">DSR 40%</div>
                      <div className="text-xs text-gray-400 mb-3">(Batas Wajar)</div>
                      <div className="text-white font-bold text-2xl">{formatRupiah(income * 0.4)}</div>
                    </div>
                    <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6 text-center">
                      <div className="text-red-400 font-bold text-xl mb-1">DSR 50%</div>
                      <div className="text-xs text-gray-400 mb-3">(Berisiko Ditolak)</div>
                      <div className="text-white font-bold text-2xl">{formatRupiah(income * 0.5)}</div>
                    </div>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
