"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, LineChart, TrendingUp, AlertTriangle } from "lucide-react";
import { useRouter } from "next/navigation";

const subClusters = [
  { id: "myzora-33", name: "Myzora 33/72", cluster: "Brassia Garden", type: "Rumah", slug: "brassia", price: "Rp 647 Juta", priceNum: 647000000, specs: { lt: "72m²", lb: "33m²", bed: 2, bath: 1, carport: 1, listrik: "2200W" } },
  { id: "myzora-45", name: "Myzora 45/72", cluster: "Brassia Garden", type: "Rumah", slug: "brassia", price: "Rp 750 Juta", priceNum: 750000000, specs: { lt: "72m²", lb: "45m²", bed: 3, bath: 1, carport: 1, listrik: "2200W" } },
  { id: "myzora-56", name: "Myzora 56/84", cluster: "Brassia Garden", type: "Rumah", slug: "brassia", price: "Rp 992 Juta", priceNum: 992000000, specs: { lt: "84m²", lb: "56m²", bed: 3, bath: 2, carport: 1, listrik: "2200W" } },
  { id: "myzora-77", name: "Myzora 77/98", cluster: "Brassia Garden", type: "Rumah", slug: "brassia", price: "Rp 1.2 Miliar", priceNum: 1200000000, specs: { lt: "98m²", lb: "77m²", bed: 4, bath: 2, carport: 2, listrik: "2200W" } },
  { id: "ellyra-45", name: "Ellyra 45/72", cluster: "Brassia Garden", type: "Rumah", slug: "brassia", price: "Rp 850 Juta", priceNum: 850000000, specs: { lt: "72m²", lb: "45m²", bed: 2, bath: 1, carport: 1, listrik: "2200W" } },
  { id: "ellyra-56-84", name: "Ellyra 56/84", cluster: "Brassia Garden", type: "Rumah", slug: "brassia", price: "Rp 1.1 Miliar", priceNum: 1100000000, specs: { lt: "84m²", lb: "56m²", bed: 2, bath: 2, carport: 1, listrik: "2200W" } },
  { id: "ellyra-56-98", name: "Ellyra 56/98", cluster: "Brassia Garden", type: "Rumah", slug: "brassia", price: "Rp 1.15 Miliar", priceNum: 1150000000, specs: { lt: "98m²", lb: "56m²", bed: 2, bath: 2, carport: 1, listrik: "2200W" } },
  { id: "canary-22", name: "Canary 22/72", cluster: "Avesa Garden", type: "Rumah", slug: "avesa-garden", price: "Rp 518 Juta", priceNum: 518000000, specs: { lt: "72m²", lb: "22m²", bed: 1, bath: 1, carport: 1, listrik: "1300W" } },
  { id: "canary-30", name: "Canary 30/72", cluster: "Avesa Garden", type: "Rumah", slug: "avesa-garden", price: "Rp 578 Juta", priceNum: 578000000, specs: { lt: "72m²", lb: "30m²", bed: 2, bath: 1, carport: 1, listrik: "1300W" } },
  { id: "derora-33", name: "Derora 33/72", cluster: "Avesa Garden", type: "Rumah", slug: "derora", price: "Rp 695 Juta", priceNum: 695000000, specs: { lt: "72m²", lb: "33m²", bed: 3, bath: 2, carport: 1, listrik: "2200W" } },
  { id: "derora-59", name: "Derora 59/84", cluster: "Avesa Garden", type: "Rumah", slug: "derora", price: "Rp 1.05 Miliar", priceNum: 1050000000, specs: { lt: "84m²", lb: "59m²", bed: 3, bath: 2, carport: 1, listrik: "2200W" } },
  { id: "easton-90", name: "Easton 90/54", cluster: "Easton Gateway", type: "Ruko", slug: "easton-gateway", price: "Rp 1.2 Miliar", priceNum: 1200000000, specs: { lt: "90m²", lb: "54m²", bed: 0, bath: 2, carport: 2, listrik: "2200W" } },
  { id: "easton-100", name: "Easton 100/60", cluster: "Easton Gateway", type: "Ruko", slug: "easton-gateway", price: "Rp 1.4 Miliar", priceNum: 1400000000, specs: { lt: "100m²", lb: "60m²", bed: 0, bath: 2, carport: 2, listrik: "2200W" } }
];

const timings = [
  { val: 0, label: "Hari Ini" },
  { val: 1, label: "1 Tahun Lagi" },
  { val: 3, label: "3 Tahun Lagi" },
  { val: 5, label: "5 Tahun Lagi" }
];

const goals = ["Dihuni Sendiri", "Investasi (Disewakan/Jual)", "Lainnya"];
const incomeGrowths = ["Tetap", "Naik ~10% per Tahun", "Naik ~20% per Tahun", "Belum Tahu", "Lainnya"];

export default function TimingWizard({ onBack }) {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [product, setProduct] = useState("");
  const [delayYears, setDelayYears] = useState(null);
  const [goal, setGoal] = useState("");
  const [incomeGrowth, setIncomeGrowth] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const [showCustomGoal, setShowCustomGoal] = useState(false);
  const [showCustomIncomeGrowth, setShowCustomIncomeGrowth] = useState(false);

  const handleNext = () => setStep(prev => prev + 1);
  const handlePrev = () => {
    if (step === 1) onBack();
    else if (step === 2) setStep(1);
    else if (step === 3) {
      if (showCustomGoal) setShowCustomGoal(false);
      else setStep(2);
    } else if (step === 4) {
      if (showCustomIncomeGrowth) setShowCustomIncomeGrowth(false);
      else setStep(3);
    }
  };

  const runAnalysis = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowResult(true);
    }, 3500);
  };

  const formatIDR = (num) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(num);

  const getResults = () => {
    const p = subClusters.find(c => c.id === product);
    const basePrice = p.priceNum;
    const dpPercent = p.type === "Ruko" ? 0 : 0.025; 
    const rukoDp = 27000000;
    
    const dpNow = p.type === "Ruko" ? rukoDp : basePrice * dpPercent;
    
    const futurePrice = basePrice * Math.pow(1.08, delayYears);
    const futureDp = p.type === "Ruko" ? rukoDp * 1.5 : futurePrice * 0.05; 
    
    const capitalGain = futurePrice - basePrice;
    
    const pinjamanNow = basePrice - dpNow;
    const cicilanNow = (pinjamanNow * 1.05) / (15 * 12); 
    
    const pinjamanFuture = futurePrice - futureDp;
    const cicilanFuture = (pinjamanFuture * 1.07) / (15 * 12); 
    
    return {
      p, basePrice, futurePrice, capitalGain, dpNow, futureDp, cicilanNow, cicilanFuture
    };
  };

  return (
    <div className="w-full relative z-10">
      
      {!isAnalyzing && !showResult && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="max-w-3xl mx-auto">
          <div className="mb-8 text-center">
            <p className="text-emerald-400 font-semibold tracking-wider text-xs mb-2 uppercase">Mode 2: Waktu Pembelian</p>
            <h2 className="text-3xl font-bold text-white mb-2">
              {step === 1 ? "Pilih Produk Incaran Anda" : 
               step === 2 ? "Kapan Rencana Realisasi Anda?" : 
               step === 3 ? "Tujuan Pembelian" : "Estimasi Kenaikan Pendapatan Anda"}
            </h2>
          </div>

          {step === 1 && (
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                {subClusters.map(c => (
                  <button key={c.id} onClick={() => { setProduct(c.id); handleNext(); }} className="p-5 bg-[#111113] border border-white/10 rounded-2xl text-left hover:border-emerald-500/50 hover:bg-emerald-500/10 transition-all">
                    <h4 className="font-bold text-white text-lg">{c.name}</h4>
                    <p className="text-emerald-400 font-medium text-sm">{c.price}</p>
                  </button>
                ))}
              </div>
              <div className="flex justify-start">
                <button onClick={handlePrev} className="text-gray-500 hover:text-white">Kembali</button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {timings.map(t => (
                <button key={t.val} onClick={() => { setDelayYears(t.val); handleNext(); }} className="p-6 bg-[#111113] border border-white/10 rounded-2xl text-left hover:border-emerald-500/50 hover:bg-emerald-500/10 transition-all text-white font-medium text-lg">
                  {t.label}
                </button>
              ))}
              <div className="col-span-1 sm:col-span-2 mt-4"><button onClick={handlePrev} className="text-gray-500 hover:text-white">Kembali</button></div>
            </div>
          )}

          {step === 3 && !showCustomGoal && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {goals.map(g => (
                <button key={g} onClick={() => { 
                  if (g === "Lainnya") setShowCustomGoal(true);
                  else { setGoal(g); handleNext(); }
                }} className="p-6 bg-[#111113] border border-white/10 rounded-2xl text-left hover:border-emerald-500/50 hover:bg-emerald-500/10 transition-all text-white font-medium text-lg">
                  {g}
                </button>
              ))}
              <div className="col-span-1 sm:col-span-2 mt-4"><button onClick={handlePrev} className="text-gray-500 hover:text-white">Kembali</button></div>
            </div>
          )}
          {step === 3 && showCustomGoal && (
            <div className="space-y-4">
              <input autoFocus type="text" value={goal} onChange={e => setGoal(e.target.value)} placeholder="Tuliskan tujuan spesifik Anda..." className="w-full bg-[#111113] border border-white/20 p-6 rounded-2xl text-white outline-none focus:border-emerald-500 font-medium text-lg" />
              <div className="flex justify-between items-center mt-4">
                <button onClick={handlePrev} className="text-gray-500 hover:text-white">Kembali</button>
                <button onClick={handleNext} disabled={!goal} className="px-8 py-3 bg-white text-black rounded-xl font-bold disabled:opacity-50">Lanjut</button>
              </div>
            </div>
          )}

          {step === 4 && !showCustomIncomeGrowth && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {incomeGrowths.map(i => (
                <button key={i} onClick={() => { 
                  if (i === "Lainnya") setShowCustomIncomeGrowth(true);
                  else { setIncomeGrowth(i); runAnalysis(); }
                }} className="p-6 bg-[#111113] border border-white/10 rounded-2xl text-left hover:border-emerald-500/50 hover:bg-emerald-500/10 transition-all text-white font-medium text-lg">
                  {i}
                </button>
              ))}
              <div className="col-span-1 sm:col-span-2 mt-4"><button onClick={handlePrev} className="text-gray-500 hover:text-white">Kembali</button></div>
            </div>
          )}
          {step === 4 && showCustomIncomeGrowth && (
            <div className="space-y-4">
              <input autoFocus type="text" value={incomeGrowth} onChange={e => setIncomeGrowth(e.target.value)} placeholder="Tuliskan persentase spesifik Anda..." className="w-full bg-[#111113] border border-white/20 p-6 rounded-2xl text-white outline-none focus:border-emerald-500 font-medium text-lg" />
              <div className="flex justify-between items-center mt-4">
                <button onClick={handlePrev} className="text-gray-500 hover:text-white">Kembali</button>
                <button onClick={() => { runAnalysis(); }} disabled={!incomeGrowth} className="px-8 py-3 bg-white text-black rounded-xl font-bold disabled:opacity-50">Analisis Sekarang</button>
              </div>
            </div>
          )}

        </motion.div>
      )}

      {isAnalyzing && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center py-20 text-center">
          <LineChart className="w-20 h-20 text-emerald-400 mb-6 animate-pulse" />
          <h3 className="text-xl text-white font-bold mb-2">SMI Mengkalkulasi Cost of Delay...</h3>
          <p className="text-gray-400 text-sm">Menghitung proyeksi harga, inflasi, dan risiko suku bunga di masa depan.</p>
        </motion.div>
      )}

      {showResult && delayYears === 0 && (() => {
         const p = subClusters.find(c => c.id === product);
         return (
          <div className="text-center py-20">
            <h3 className="text-3xl font-bold text-white mb-4">Keputusan yang Tepat!</h3>
            <p className="text-gray-400 mb-8 max-w-lg mx-auto">Membeli hari ini akan mengunci harga terendah dan menyelamatkan Anda dari inflasi properti yang agresif.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
               <button onClick={() => router.push(`/clusters/${p.slug}`)} className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white rounded-xl font-bold transition-all shadow-lg shadow-emerald-500/20">
                 Kunci Harga {p.name} Sekarang
               </button>
               <button onClick={onBack} className="px-8 py-4 bg-transparent border border-white/20 hover:bg-white/10 text-white rounded-xl font-bold transition-colors">Eksplorasi Skenario Lain</button>
            </div>
          </div>
         );
      })()}

      {showResult && delayYears > 0 && (() => {
        const r = getResults();
        return (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto w-full">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-white mb-4">Simulasi Penundaan {delayYears} Tahun</h2>
              <p className="text-gray-400 text-lg">Jika Anda memutuskan menunda pembelian {r.p.name}...</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-[#111113] border border-emerald-500/30 rounded-3xl p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-emerald-500 text-black px-4 py-1 text-xs font-bold rounded-bl-xl">HARI INI</div>
                <p className="text-gray-500 text-sm mb-2 uppercase">Harga</p>
                <h3 className="text-3xl font-bold text-emerald-400 mb-6">{formatIDR(r.basePrice)}</h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-gray-400">DP (Saat ini promo 2.5%)</span>
                    <span className="text-white font-medium">{formatIDR(r.dpNow)}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-gray-400">Estimasi Cicilan</span>
                    <span className="text-white font-medium">{formatIDR(r.cicilanNow)}/bln</span>
                  </div>
                </div>
              </div>

              <div className="bg-[#111113] border border-orange-500/30 rounded-3xl p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-orange-500 text-white px-4 py-1 text-xs font-bold rounded-bl-xl">{delayYears} TAHUN LAGI</div>
                <p className="text-gray-500 text-sm mb-2 uppercase">Estimasi Harga (+8% / thn)</p>
                <h3 className="text-3xl font-bold text-orange-400 mb-6">{formatIDR(r.futurePrice)}</h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-gray-400">DP (Promo hilang &rarr; 5%)</span>
                    <span className="text-white font-medium">{formatIDR(r.futureDp)}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-gray-400">Estimasi Cicilan Naik</span>
                    <span className="text-white font-medium">{formatIDR(r.cicilanFuture)}/bln</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-red-500/10 border border-red-500/20 rounded-3xl p-8 flex flex-col md:flex-row items-center gap-6 mb-12">
              <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-8 h-8 text-red-500" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-white mb-2">Cost of Delay (Kerugian Penundaan)</h4>
                <p className="text-gray-300">Menunda {delayYears} tahun berarti Anda akan membayar lebih mahal <strong className="text-red-400">{formatIDR(r.capitalGain)}</strong>. DP yang harus Anda kumpulkan juga membengkak {formatIDR(r.futureDp - r.dpNow)} karena promo Free DP dihapus di masa depan.</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
               <button onClick={() => router.push(`/clusters/${r.p.slug}`)} className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white rounded-xl font-bold transition-all shadow-lg shadow-emerald-500/20">
                 Kunci Harga {r.p.name} Sekarang
               </button>
               <button onClick={onBack} className="px-8 py-4 bg-transparent border border-white/20 hover:bg-white/10 text-white rounded-xl font-bold transition-colors">Eksplorasi Skenario Lain</button>
            </div>
          </motion.div>
        );
      })()}
    </div>
  );
}
