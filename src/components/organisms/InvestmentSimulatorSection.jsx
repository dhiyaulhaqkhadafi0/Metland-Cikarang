"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Calculator, TrendingUp } from "lucide-react";

export default function InvestmentSimulatorSection() {
  const [propertyPrice, setPropertyPrice] = useState(800000000); // full number
  const [downPayment, setDownPayment] = useState(20); // percentage
  const [tenure, setTenure] = useState(15); // years
  const [isCalculated, setIsCalculated] = useState(false);

  const handlePriceChange = (e) => {
    // Remove all non-digits
    const val = e.target.value.replace(/\D/g, '');
    setPropertyPrice(val === '' ? '' : Number(val));
    setIsCalculated(false);
  };

  const handleDpChange = (e) => {
    setDownPayment(e.target.value === '' ? '' : Number(e.target.value));
    setIsCalculated(false);
  };

  const handleTenureChange = (e) => {
    setTenure(e.target.value === '' ? '' : Number(e.target.value));
    setIsCalculated(false);
  };

  const formatRupiah = (num) => {
    if (num === '' || num === 0) return '';
    return new Intl.NumberFormat('id-ID').format(num);
  };

  const calculateKPR = () => {
    const pPrice = Number(propertyPrice) || 0;
    const dpPercent = Number(downPayment) || 0;
    const t = Number(tenure) || 0;

    if (pPrice === 0 || t === 0) return "Rp 0";

    const principal = pPrice * (1 - dpPercent / 100);
    const annualInterestRate = 0.05; // 5% p.a.
    const r = annualInterestRate / 12; // Bunga per bulan
    const n = t * 12; // Total bulan pinjaman
    
    let monthlyPayment = 0;
    if (r > 0 && n > 0) {
      monthlyPayment = principal * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    } else if (n > 0) {
      monthlyPayment = principal / n;
    }
    
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(monthlyPayment);
  };

  return (
    <section className="py-24 bg-[#0a0f1a] relative overflow-hidden border-t border-border">
      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Text Content */}
          <div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center space-x-2 text-primary font-semibold tracking-wider uppercase mb-4"
            >
              <TrendingUp className="w-5 h-5" />
              <span>Investment Center</span>
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-title font-bold text-light-text mb-6"
            >
              Rencanakan Masa Depan Anda Sekarang.
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-gray-text text-lg mb-8"
            >
              Simulasikan estimasi cicilan perumahan Anda dengan kalkulator KPR akurat (sistem anuitas standar bank). Dapatkan penawaran bunga spesial khusus untuk pembelian melalui platform ini.
            </motion.p>
            
            <motion.button 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="px-8 py-4 rounded-full bg-dark-card border border-primary text-primary hover:bg-primary hover:text-white transition-all font-semibold inline-flex items-center shadow-emerald-glow"
              suppressHydrationWarning
            >
              Konsultasi KPR Gratis
            </motion.button>
          </div>

          {/* Calculator Card */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-dark-card border border-border p-8 md:p-10 rounded-[2rem] shadow-card relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
              <Calculator className="w-32 h-32 text-primary" />
            </div>

            <div className="relative z-10 space-y-8">
              
              <div className="text-center mb-8">
                <p className="text-emerald-400 font-medium tracking-wide uppercase text-sm flex items-center justify-center">
                  <span className="w-8 h-px bg-emerald-400/50 mr-3"></span>
                  Yuk, hitung dulu cicilanmu!
                  <span className="w-8 h-px bg-emerald-400/50 ml-3"></span>
                </p>
              </div>

              {/* Range Slider 1 */}
              <div>
                <div className="flex justify-between items-center text-light-text font-medium mb-4">
                  <span>Harga Properti</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-text text-sm">Rp</span>
                    <input 
                      type="text"
                      value={formatRupiah(propertyPrice)}
                      onChange={handlePriceChange}
                      className="w-36 bg-dark-bg border border-border rounded px-3 py-1 text-primary font-semibold focus:outline-none focus:border-primary text-right"
                      suppressHydrationWarning
                    />
                  </div>
                </div>
                <input 
                  type="range" 
                  min="500000000" max="3000000000" step="10000000"
                  value={propertyPrice || 0}
                  onChange={(e) => {
                    setPropertyPrice(Number(e.target.value));
                    setIsCalculated(false);
                  }}
                  className="w-full h-2 bg-dark-bg rounded-lg appearance-none cursor-pointer accent-primary"
                  suppressHydrationWarning
                />
              </div>

              {/* Range Slider 2 */}
              <div>
                <div className="flex justify-between items-center text-light-text font-medium mb-4">
                  <span>Uang Muka (DP)</span>
                  <div className="flex items-center space-x-2">
                    <input 
                      type="number"
                      value={downPayment}
                      step="any"
                      onChange={handleDpChange}
                      className="w-20 bg-dark-bg border border-border rounded px-2 py-1 text-primary font-semibold focus:outline-none focus:border-primary text-right"
                      suppressHydrationWarning
                    />
                    <span className="text-gray-text text-sm">%</span>
                  </div>
                </div>
                <input 
                  type="range" 
                  min="0" max="50" step="0.5"
                  value={downPayment || 0}
                  onChange={(e) => {
                    setDownPayment(Number(e.target.value));
                    setIsCalculated(false);
                  }}
                  className="w-full h-2 bg-dark-bg rounded-lg appearance-none cursor-pointer accent-primary"
                  suppressHydrationWarning
                />
              </div>

              {/* Range Slider 3 */}
              <div>
                <div className="flex justify-between items-center text-light-text font-medium mb-4">
                  <span>Tenor (Lama Pinjaman)</span>
                  <div className="flex items-center space-x-2">
                    <input 
                      type="number"
                      value={tenure}
                      step="any"
                      onChange={handleTenureChange}
                      className="w-20 bg-dark-bg border border-border rounded px-2 py-1 text-primary font-semibold focus:outline-none focus:border-primary text-right"
                      suppressHydrationWarning
                    />
                    <span className="text-gray-text text-sm">Tahun</span>
                  </div>
                </div>
                <input 
                  type="range" 
                  min="5" max="25" step="1"
                  value={tenure || 0}
                  onChange={(e) => {
                    setTenure(Number(e.target.value));
                    setIsCalculated(false);
                  }}
                  className="w-full h-2 bg-dark-bg rounded-lg appearance-none cursor-pointer accent-primary"
                  suppressHydrationWarning
                />
              </div>

              {/* Action Button */}
              <button 
                onClick={() => setIsCalculated(true)}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-primary to-emerald-600 text-white font-bold tracking-wide hover:scale-[1.02] transition-transform shadow-emerald-glow"
                suppressHydrationWarning
              >
                Hitung Cicilan Sekarang
              </button>

              {/* Result Area */}
              <div className={`mt-8 p-6 bg-dark-bg border border-primary/30 rounded-2xl text-center transition-all duration-500 overflow-hidden ${isCalculated ? 'opacity-100 max-h-96' : 'opacity-0 max-h-0 !p-0 !mt-0 border-0'}`}>
                <p className="text-gray-text text-sm mb-2">Estimasi Cicilan per Bulan</p>
                <p className="text-3xl md:text-4xl font-title font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-300">
                  {calculateKPR()}
                </p>
                <p className="text-xs text-gray-text mt-3">*Bunga Anuitas 5% p.a (Estimasi kalkulasi bank)</p>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
