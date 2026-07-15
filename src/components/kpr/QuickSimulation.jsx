"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calculator, DollarSign, Percent, Calendar } from "lucide-react";

export default function QuickSimulation() {
  const [price, setPrice] = useState(800000000);
  const [dpPercent, setDpPercent] = useState(2.5);
  const [tenor, setTenor] = useState(15);
  const [interest, setInterest] = useState(3.75); // fixed rate assumption
  
  const [monthlyInstallment, setMonthlyInstallment] = useState(0);
  const [dpAmount, setDpAmount] = useState(0);

  useEffect(() => {
    const calculatedDp = price * (dpPercent / 100);
    const principal = price - calculatedDp;
    const monthlyRate = (interest / 100) / 12;
    const totalMonths = tenor * 12;
    
    let installment = 0;
    if (monthlyRate === 0) {
      installment = principal / totalMonths;
    } else {
      installment = (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -totalMonths));
    }
    
    setDpAmount(calculatedDp);
    setMonthlyInstallment(installment);
  }, [price, dpPercent, tenor, interest]);

  const formatRupiah = (num) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(num);
  };

  return (
    <section id="quick-simulation" className="py-24 bg-[#0a0a0b] relative z-20 border-t border-white/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Simulasi KPR Cepat</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Hitung estimasi cicilan bulanan Anda. Gunakan simulasi ini sebagai gambaran awal sebelum Anda melangkah ke proses pengajuan sesungguhnya.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Controls */}
          <div className="lg:col-span-7 bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-md">
            
            <div className="space-y-8">
              {/* Harga Properti */}
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
                  <label className="text-white font-medium flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-emerald-400" /> Harga Properti
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">Rp</span>
                    <input 
                      type="number"
                      value={price}
                      onChange={(e) => setPrice(Number(e.target.value))}
                      className="bg-black/50 border border-white/10 rounded-xl px-3 pl-10 py-1.5 text-emerald-400 font-bold w-40 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>
                <input 
                  type="range" 
                  min={500000000} 
                  max={3000000000} 
                  step={50000000} 
                  value={price} 
                  onChange={(e) => setPrice(Number(e.target.value))}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>500 Jt</span>
                  <span>3 Milyar</span>
                </div>
              </div>

              {/* Uang Muka (DP) */}
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
                  <label className="text-white font-medium flex items-center gap-2">
                    <Percent className="w-5 h-5 text-emerald-400" /> Uang Muka (DP)
                  </label>
                  <div className="flex items-center gap-3">
                    <div className="relative w-20">
                      <input 
                        type="number"
                        value={dpPercent}
                        onChange={(e) => setDpPercent(Number(e.target.value))}
                        step="0.5"
                        className="bg-black/50 border border-white/10 rounded-xl px-3 pr-8 py-1.5 text-emerald-400 font-bold w-full focus:outline-none focus:border-emerald-500"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">%</span>
                    </div>
                    <span className="text-sm font-medium text-gray-400 hidden sm:inline-block">({formatRupiah(dpAmount)})</span>
                  </div>
                </div>
                <input 
                  type="range" 
                  min={0} 
                  max={50} 
                  step={0.5} 
                  value={dpPercent} 
                  onChange={(e) => setDpPercent(Number(e.target.value))}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>0%</span>
                  <span>50%</span>
                </div>
              </div>

              {/* Tenor */}
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
                  <label className="text-white font-medium flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-emerald-400" /> Lama Pinjaman (Tenor)
                  </label>
                  <div className="relative w-24">
                    <input 
                      type="number"
                      value={tenor}
                      onChange={(e) => setTenor(Number(e.target.value))}
                      className="bg-black/50 border border-white/10 rounded-xl px-3 pr-10 py-1.5 text-emerald-400 font-bold w-full focus:outline-none focus:border-emerald-500"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">Thn</span>
                  </div>
                </div>
                <input 
                  type="range" 
                  min={5} 
                  max={30} 
                  step={1} 
                  value={tenor} 
                  onChange={(e) => setTenor(Number(e.target.value))}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>5 Tahun</span>
                  <span>30 Tahun</span>
                </div>
              </div>

              {/* Bunga Manual */}
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
                  <label className="text-white font-medium flex items-center gap-2">
                    <Percent className="w-5 h-5 text-emerald-400" /> Estimasi Bunga (Fixed)
                  </label>
                  <div className="relative w-24">
                    <input 
                      type="number"
                      value={interest}
                      onChange={(e) => setInterest(Number(e.target.value))}
                      step="0.01"
                      className="bg-black/50 border border-white/10 rounded-xl px-3 pr-8 py-1.5 text-emerald-400 font-bold w-full focus:outline-none focus:border-emerald-500"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">%</span>
                  </div>
                </div>
                <input 
                  type="range" 
                  min={1} 
                  max={15} 
                  step={0.05} 
                  value={interest} 
                  onChange={(e) => setInterest(Number(e.target.value))}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>1%</span>
                  <span>15%</span>
                </div>
              </div>

            </div>
          </div>

          {/* Results Box */}
          <div className="lg:col-span-5">
            <div className="bg-gradient-to-br from-emerald-900/40 to-[#020202] border border-emerald-500/20 rounded-3xl p-8 h-full flex flex-col justify-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-500/10 rounded-full blur-[80px]" />
              
              <div className="relative z-10 text-center">
                <Calculator className="w-12 h-12 text-emerald-400 mx-auto mb-6 opacity-80" />
                <h3 className="text-gray-400 text-lg mb-2">Estimasi Cicilan per Bulan</h3>
                <div className="text-4xl sm:text-5xl font-bold text-white mb-6 tracking-tight">
                  {formatRupiah(monthlyInstallment)}
                </div>
                
                <div className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-white/10">
                  <div className="text-left">
                    <p className="text-gray-500 text-sm mb-1">Plafon Pinjaman</p>
                    <p className="text-white font-semibold">{formatRupiah(price - dpAmount)}</p>
                  </div>
                  <div className="text-left">
                    <p className="text-gray-500 text-sm mb-1">Asumsi Bunga</p>
                    <p className="text-white font-semibold">{interest}% (Sesuai Input)</p>
                  </div>
                </div>

                <div className="mt-8 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl">
                  <p className="text-xs text-gray-400">
                    *Nilai ini hanyalah estimasi awal dan tidak mengikat. Untuk kalkulasi akurat berdasarkan profil risiko dan promo bank riil, gunakan fitur Smart KPR Advisor kami.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
