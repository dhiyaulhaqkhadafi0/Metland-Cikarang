"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calculator, TrendingUp, Key, ShieldAlert } from "lucide-react";

export default function AdvancedCalculators() {
  const [activeTab, setActiveTab] = useState("roi");
  
  // State for ROI
  const [purchasePrice, setPurchasePrice] = useState(1200000000);
  const [holdingPeriod, setHoldingPeriod] = useState(5);
  const [annualAppreciation, setAnnualAppreciation] = useState(10);
  
  // State for Capital Gain
  const [cgPurchasePrice, setCgPurchasePrice] = useState(1200000000);
  const [cgHoldingPeriod, setCgHoldingPeriod] = useState(10);
  const [growthScenario, setGrowthScenario] = useState(10); // 12% (Agresif), 10% (Moderat), 6% (Konservatif)
  
  // State for Rental Yield
  const [monthlyRent, setMonthlyRent] = useState(60000000);
  const [ryPurchasePrice, setRyPurchasePrice] = useState(1200000000);
  
  const formatRupiah = (num) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(num);
  };

  const handlePriceChange = (e, setter) => {
    const val = e.target.value.replace(/\D/g, '');
    setter(val === '' ? 0 : Number(val));
  };

  // Calculations ROI
  const roiFutureValue = purchasePrice * Math.pow(1 + (annualAppreciation / 100), holdingPeriod);
  const roiCapitalGain = roiFutureValue - purchasePrice;
  const totalROI = (roiCapitalGain / purchasePrice) * 100;
  
  // Calculations Capital Gain
  const cgFutureValue = cgPurchasePrice * Math.pow(1 + (growthScenario / 100), cgHoldingPeriod);
  const cgProfit = cgFutureValue - cgPurchasePrice;

  // Calculations Rental Yield
  const rentalYield = (monthlyRent / ryPurchasePrice) * 100;

  return (
    <section id="calculators" className="py-24 bg-[#060913] relative border-t border-white/5">
      <div className="container mx-auto px-6 relative z-10 max-w-5xl">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-2 text-primary font-semibold tracking-wider uppercase mb-4"
          >
            <Calculator className="w-5 h-5" />
            <span>Investment Calculators</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-title font-bold text-light-text mb-6"
          >
            Simulasikan Potensi Keuntungan Anda
          </motion.h2>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button 
            onClick={() => setActiveTab("roi")}
            className={`px-6 py-3 rounded-full font-bold transition-all flex items-center ${activeTab === "roi" ? "bg-primary text-white shadow-emerald-glow scale-105" : "bg-dark-card border border-border text-gray-text hover:text-white hover:bg-white/5"}`}
          >
            <Calculator className="w-4 h-4 mr-2" /> Kalkulator ROI
          </button>
          <button 
            onClick={() => setActiveTab("capital")}
            className={`px-6 py-3 rounded-full font-bold transition-all flex items-center ${activeTab === "capital" ? "bg-primary text-white shadow-emerald-glow scale-105" : "bg-dark-card border border-border text-gray-text hover:text-white hover:bg-white/5"}`}
          >
            <TrendingUp className="w-4 h-4 mr-2" /> Proyeksi Capital Gain
          </button>
          <button 
            onClick={() => setActiveTab("rental")}
            className={`px-6 py-3 rounded-full font-bold transition-all flex items-center ${activeTab === "rental" ? "bg-primary text-white shadow-emerald-glow scale-105" : "bg-dark-card border border-border text-gray-text hover:text-white hover:bg-white/5"}`}
          >
            <Key className="w-4 h-4 mr-2" /> Rental Yield
          </button>
        </div>

        {/* Calculator Body */}
        <div className="bg-dark-card border border-border rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden mb-12">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-emerald-300" />
          
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-12"
            >
              {/* Input Section */}
              <div className="space-y-6">
                
                {/* ROI INPUTS */}
                {activeTab === "roi" && (
                  <>
                    <div>
                      <label className="block text-sm font-semibold text-gray-text mb-2 uppercase tracking-wider">Harga Beli Properti (Rp)</label>
                      <input 
                        type="text" 
                        value={formatRupiah(purchasePrice)} 
                        onChange={(e) => handlePriceChange(e, setPurchasePrice)}
                        className="w-full bg-[#0a0f1a] border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-xl font-bold hover:border-white/30"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-text mb-2 uppercase tracking-wider flex justify-between">
                        <span>Lama Tahan (Tahun)</span>
                        <span className="text-primary font-bold">{holdingPeriod} Tahun</span>
                      </label>
                      <input 
                        type="range" 
                        min="1" max="20" step="1"
                        value={holdingPeriod} 
                        onChange={(e) => setHoldingPeriod(Number(e.target.value))}
                        className="w-full accent-primary cursor-pointer"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-text mb-2 uppercase tracking-wider flex justify-between">
                        <span>Estimasi Kenaikan per Tahun (%)</span>
                        <span className="text-primary font-bold">{annualAppreciation}%</span>
                      </label>
                      <input 
                        type="range" 
                        min="2" max="25" step="1"
                        value={annualAppreciation} 
                        onChange={(e) => setAnnualAppreciation(Number(e.target.value))}
                        className="w-full accent-primary cursor-pointer"
                      />
                      <p className="text-xs text-gray-text mt-2">*Metland Cikarang mencatat rata-rata historis 8-12% per tahun.</p>
                    </div>
                  </>
                )}

                {/* CAPITAL GAIN INPUTS */}
                {activeTab === "capital" && (
                  <>
                    <div>
                      <label className="block text-sm font-semibold text-gray-text mb-2 uppercase tracking-wider">Nilai Aset Saat Ini (Rp)</label>
                      <input 
                        type="text" 
                        value={formatRupiah(cgPurchasePrice)} 
                        onChange={(e) => handlePriceChange(e, setCgPurchasePrice)}
                        className="w-full bg-[#0a0f1a] border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-xl font-bold hover:border-white/30"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-text mb-2 uppercase tracking-wider flex justify-between">
                        <span>Proyeksi Waktu (Tahun)</span>
                        <span className="text-primary font-bold">{cgHoldingPeriod} Tahun</span>
                      </label>
                      <input 
                        type="range" 
                        min="1" max="30" step="1"
                        value={cgHoldingPeriod} 
                        onChange={(e) => setCgHoldingPeriod(Number(e.target.value))}
                        className="w-full accent-primary cursor-pointer"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-text mb-2 uppercase tracking-wider">Skenario Pertumbuhan Kawasan</label>
                      <div className="grid grid-cols-3 gap-3">
                        <button onClick={() => setGrowthScenario(6)} className={`py-3 rounded-lg border text-sm font-bold transition-all ${growthScenario === 6 ? 'bg-primary/20 border-primary text-primary' : 'bg-transparent border-white/10 text-gray-text hover:border-white/30'}`}>Konservatif (6%)</button>
                        <button onClick={() => setGrowthScenario(10)} className={`py-3 rounded-lg border text-sm font-bold transition-all ${growthScenario === 10 ? 'bg-primary/20 border-primary text-primary' : 'bg-transparent border-white/10 text-gray-text hover:border-white/30'}`}>Moderat (10%)</button>
                        <button onClick={() => setGrowthScenario(14)} className={`py-3 rounded-lg border text-sm font-bold transition-all ${growthScenario === 14 ? 'bg-primary/20 border-primary text-primary' : 'bg-transparent border-white/10 text-gray-text hover:border-white/30'}`}>Agresif (14%)</button>
                      </div>
                      <p className="text-xs text-gray-text mt-3">*Pilih skenario berdasarkan keyakinan Anda terhadap pembangunan infrastruktur di sekitar.</p>
                    </div>
                  </>
                )}

                {/* RENTAL YIELD INPUTS */}
                {activeTab === "rental" && (
                  <>
                    <div>
                      <label className="block text-sm font-semibold text-gray-text mb-2 uppercase tracking-wider">Harga Properti (Rp)</label>
                      <input 
                        type="text" 
                        value={formatRupiah(ryPurchasePrice)} 
                        onChange={(e) => handlePriceChange(e, setRyPurchasePrice)}
                        className="w-full bg-[#0a0f1a] border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-xl font-bold hover:border-white/30"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-text mb-2 uppercase tracking-wider">Estimasi Harga Sewa Per Tahun (Rp)</label>
                      <input 
                        type="text" 
                        value={formatRupiah(monthlyRent)} 
                        onChange={(e) => handlePriceChange(e, setMonthlyRent)}
                        className="w-full bg-[#0a0f1a] border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-xl font-bold hover:border-white/30"
                      />
                      <p className="text-xs text-gray-text mt-2">*Rata-rata sewa ruko komersial Metland Cikarang berpotensi mencapai Rp 50-80 Juta/tahun didorong oleh pangsa pasar MM2100.</p>
                    </div>
                  </>
                )}
              </div>

              {/* Result Section */}
              <div className="flex flex-col justify-center">
                <div className="bg-gradient-to-br from-[#0a0f1a] to-[#060913] border border-primary/30 p-8 rounded-2xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl group-hover:bg-primary/20 transition-all duration-500" />
                  
                  {activeTab === "roi" && (
                    <>
                      <h4 className="text-gray-text text-sm font-bold uppercase tracking-wider mb-2">Total Keuntungan (ROI)</h4>
                      <p className="text-3xl md:text-4xl font-bold text-primary font-title mb-6 truncate" title={`${totalROI.toFixed(1)}%`}>
                        {totalROI.toFixed(1)}%
                      </p>
                      <div className="space-y-4 pt-6 border-t border-white/10">
                        <div className="flex justify-between">
                          <span className="text-gray-text">Total Keuntungan Bersih</span>
                          <span className="text-emerald-400 font-bold">{formatRupiah(roiCapitalGain)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-text">Estimasi Nilai Jual</span>
                          <span className="text-white font-bold">{formatRupiah(roiFutureValue)}</span>
                        </div>
                      </div>
                    </>
                  )}

                  {activeTab === "capital" && (
                    <>
                      <h4 className="text-gray-text text-sm font-bold uppercase tracking-wider mb-2">Nilai Properti di Tahun ke-{cgHoldingPeriod}</h4>
                      <p className="text-3xl md:text-4xl font-bold text-primary font-title mb-6 truncate" title={formatRupiah(cgFutureValue)}>
                        {formatRupiah(cgFutureValue)}
                      </p>
                      <div className="space-y-4 pt-6 border-t border-white/10">
                        <div className="flex justify-between">
                          <span className="text-gray-text">Kenaikan (Capital Gain)</span>
                          <span className="text-emerald-400 font-bold">+{formatRupiah(cgProfit)}</span>
                        </div>
                      </div>
                    </>
                  )}

                  {activeTab === "rental" && (
                    <>
                      <h4 className="text-gray-text text-sm font-bold uppercase tracking-wider mb-2">Rental Yield (Gross)</h4>
                      <p className="text-3xl md:text-4xl font-bold text-primary font-title mb-6 truncate" title={`${rentalYield.toFixed(2)}% / tahun`}>
                        {rentalYield.toFixed(2)}% <span className="text-lg text-gray-text font-normal">/ tahun</span>
                      </p>
                      <div className="space-y-4 pt-6 border-t border-white/10">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-text text-sm">Investasi Properti ini berpotensi memberikan passive income (cashflow) yang jauh melebihi bunga deposito bulanan Anda.</span>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Risk Management Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-emerald-900/10 border border-emerald-500/20 rounded-2xl p-6 md:p-8 hover:bg-emerald-900/20 transition-colors group cursor-default"
        >
          <div className="flex items-start">
            <div className="bg-emerald-500/20 p-3 rounded-xl mr-5 shrink-0 group-hover:scale-110 transition-transform">
              <ShieldAlert className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <h4 className="text-xl font-bold text-white mb-2">Manajemen Risiko & Strategi Keluar (Exit Strategy)</h4>
              <p className="text-gray-text text-sm leading-relaxed mb-4">
                Investasi properti memiliki karakter <em>low-liquidity</em>. Untuk memitigasi risiko, Metland Cikarang berlokasi strategis di dekat Stasiun KRL & MM2100. Strategi terbaik adalah:
              </p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-300">
                <li className="flex items-center"><div className="w-1.5 h-1.5 rounded-full bg-primary mr-2" /> <strong>Buy & Hold:</strong> Sewakan unit sambil menunggu Capital Gain matang (3-5 tahun).</li>
                <li className="flex items-center"><div className="w-1.5 h-1.5 rounded-full bg-primary mr-2" /> <strong>Flipping:</strong> Jual saat infrastruktur baru (seperti tol/fasilitas) diresmikan.</li>
              </ul>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
