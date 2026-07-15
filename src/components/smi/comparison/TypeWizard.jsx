"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Building2, Store, Search, Home } from "lucide-react";
import { useRouter } from "next/navigation";

const businessTypes = ["F&B / Cafe", "Kantor / Jasa", "Retail / Toko", "Gudang / Online Shop", "Lainnya"];
const employeeCounts = ["1 - 5 Orang", "5 - 10 Orang", "> 10 Orang", "Lainnya"];

export default function TypeWizard({ onBack }) {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [bType, setBType] = useState("");
  const [empCount, setEmpCount] = useState("");
  const [needPark, setNeedPark] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const [showCustomBType, setShowCustomBType] = useState(false);
  const [showCustomEmpCount, setShowCustomEmpCount] = useState(false);

  const handleNext = () => setStep(prev => prev + 1);
  const handlePrev = () => {
    if (step === 1) onBack();
    else if (step === 2) {
      if (showCustomBType) setShowCustomBType(false);
      else setStep(1);
    } else if (step === 3) {
      if (showCustomEmpCount) setShowCustomEmpCount(false);
      else setStep(2);
    }
  };

  const runAnalysis = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowResult(true);
    }, 3500);
  };

  const getResults = () => {
    let scoreRumah = 0;
    let scoreRuko = 0;

    if (bType.includes("F&B") || bType.includes("Cafe") || bType.includes("Retail")) scoreRuko += 50;
    else scoreRumah += 20;

    if (empCount.includes("> 10")) scoreRuko += 30;
    else scoreRumah += 10;

    if (needPark) scoreRuko += 20;
    else scoreRumah += 20;

    let winner = scoreRuko > scoreRumah ? "RUKO KOMERSIAL" : "RUMAH RESIDENSIAL";
    let pctRuko = scoreRuko > scoreRumah ? "94%" : "40%";
    let pctRumah = scoreRuko > scoreRumah ? "30%" : "88%";

    const rukoReason = `Karena target Anda adalah ${bType} dengan skala tim ${empCount} dan membutuhkan area parkir, Ruko menjamin fungsi legalitas operasional dan lahan parkir yang tidak mengganggu warga residensial. Selain itu, Ruko berada di jalan utama yang memancing traffic organik pengunjung.`;
    const rumahReason = `Untuk usaha ${bType} dengan skala tim ${empCount}, Anda masih bisa menggunakan opsi Rumah Residensial tipe sudut untuk menekan biaya awal. Legalitas bisa disesuaikan asalkan tidak mengganggu ketertiban klaster.`;

    const recProduct = scoreRuko > scoreRumah ? "Weston Gateway" : "Brassia Garden";
    const recDesc = scoreRuko > scoreRumah ? "Unit Premium Jalan Utama (Sisa 4 Unit Terakhir!)" : "Kawasan Residensial Premium (Tipe Sudut / Hook)";
    const recUrl = scoreRuko > scoreRumah ? "/clusters/weston-gateway" : "/clusters/brassia";

    return {
      winner, pctRuko, pctRumah, recProduct, recDesc, recUrl,
      verdict: scoreRuko > scoreRumah ? rukoReason : rumahReason
    };
  };

  return (
    <div className="w-full relative z-10">
      
      {!isAnalyzing && !showResult && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="max-w-2xl mx-auto">
          <div className="mb-8 text-center">
            <p className="text-blue-400 font-semibold tracking-wider text-xs mb-2 uppercase">Mode 4: Tipe Properti</p>
            <h2 className="text-3xl font-bold text-white mb-2">
              {step === 1 ? "Jenis Usaha Apa yang Anda Rencanakan?" : 
               step === 2 ? "Estimasi Jumlah Karyawan / Tim?" : 
               "Apakah Usaha Membutuhkan Akses Parkir Publik?"}
            </h2>
          </div>

          {step === 1 && !showCustomBType && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {businessTypes.map(b => (
                <button key={b} onClick={() => { 
                  if (b === "Lainnya") setShowCustomBType(true);
                  else { setBType(b); handleNext(); }
                }} className="p-6 bg-[#111113] border border-white/10 rounded-2xl text-left hover:border-blue-500/50 hover:bg-blue-500/10 transition-all text-white font-medium text-lg">
                  {b}
                </button>
              ))}
              <div className="col-span-1 sm:col-span-2 mt-4"><button onClick={handlePrev} className="text-gray-500 hover:text-white">Kembali</button></div>
            </div>
          )}
          {step === 1 && showCustomBType && (
            <div className="space-y-4">
              <input autoFocus type="text" value={bType} onChange={e => setBType(e.target.value)} placeholder="Tuliskan jenis usaha spesifik Anda..." className="w-full bg-[#111113] border border-white/20 p-6 rounded-2xl text-white outline-none focus:border-blue-500 font-medium text-lg" />
              <div className="flex justify-between items-center mt-4">
                <button onClick={handlePrev} className="text-gray-500 hover:text-white">Kembali</button>
                <button onClick={handleNext} disabled={!bType} className="px-8 py-3 bg-white text-black rounded-xl font-bold disabled:opacity-50">Lanjut</button>
              </div>
            </div>
          )}

          {step === 2 && !showCustomEmpCount && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {employeeCounts.map(e => (
                <button key={e} onClick={() => { 
                  if (e === "Lainnya") setShowCustomEmpCount(true);
                  else { setEmpCount(e); handleNext(); }
                }} className="p-6 bg-[#111113] border border-white/10 rounded-2xl text-center hover:border-blue-500/50 hover:bg-blue-500/10 transition-all text-white font-medium text-lg">
                  {e}
                </button>
              ))}
              <div className="col-span-1 sm:col-span-2 mt-4"><button onClick={handlePrev} className="text-gray-500 hover:text-white">Kembali</button></div>
            </div>
          )}
          {step === 2 && showCustomEmpCount && (
            <div className="space-y-4">
              <input autoFocus type="text" value={empCount} onChange={e => setEmpCount(e.target.value)} placeholder="Tuliskan jumlah tim/karyawan Anda..." className="w-full bg-[#111113] border border-white/20 p-6 rounded-2xl text-white outline-none focus:border-blue-500 font-medium text-lg" />
              <div className="flex justify-between items-center mt-4">
                <button onClick={handlePrev} className="text-gray-500 hover:text-white">Kembali</button>
                <button onClick={handleNext} disabled={!empCount} className="px-8 py-3 bg-white text-black rounded-xl font-bold disabled:opacity-50">Lanjut</button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button onClick={() => { setNeedPark(true); runAnalysis(); }} className="p-6 bg-[#111113] border border-white/10 rounded-2xl text-center hover:border-blue-500/50 hover:bg-blue-500/10 transition-all text-white font-medium text-lg">
                Ya, Wajib Ada
              </button>
              <button onClick={() => { setNeedPark(false); runAnalysis(); }} className="p-6 bg-[#111113] border border-white/10 rounded-2xl text-center hover:border-blue-500/50 hover:bg-blue-500/10 transition-all text-white font-medium text-lg">
                Tidak Terlalu (Online / Gudang)
              </button>
              <div className="col-span-1 sm:col-span-2 mt-4"><button onClick={handlePrev} className="text-gray-500 hover:text-white">Kembali</button></div>
            </div>
          )}
        </motion.div>
      )}

      {isAnalyzing && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center py-20 text-center">
          <Search className="w-20 h-20 text-blue-400 mb-6 animate-pulse" />
          <h3 className="text-xl text-white font-bold mb-2">Memeriksa Legalitas & Zonasi...</h3>
          <p className="text-gray-400 text-sm">Menyelaraskan model bisnis dengan tata ruang kawasan.</p>
        </motion.div>
      )}

      {showResult && (() => {
        const r = getResults();
        return (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto w-full">
            <div className="bg-gradient-to-r from-blue-900/40 to-transparent p-8 rounded-3xl border border-blue-500/30 mb-8">
              <h2 className="text-sm text-blue-300 font-bold uppercase tracking-widest mb-2">🧠 Keputusan Bisnis</h2>
              <p className="text-xl text-white font-light mb-6">{r.verdict}</p>
              
              <div className="bg-[#111113] border border-blue-500/30 p-6 rounded-2xl relative overflow-hidden">
                {r.recProduct.includes("Weston") && <div className="absolute top-0 right-0 bg-red-500 text-white font-bold text-xs px-3 py-1 rounded-bl-lg animate-pulse">SISA 4 UNIT</div>}
                <p className="text-blue-400 text-sm font-bold uppercase tracking-widest mb-1">💡 Rekomendasi Ideal SMI</p>
                <h3 className="text-2xl font-bold text-white mb-1">{r.recProduct}</h3>
                <p className="text-gray-400 text-sm">{r.recDesc}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className={`p-8 rounded-3xl border transition-all ${r.winner === "RUMAH RESIDENSIAL" ? "bg-[#111113] border-emerald-500/50" : "bg-[#0a0a0b] border-white/5"}`}>
                <Home className={`w-10 h-10 mb-4 ${r.winner === "RUMAH RESIDENSIAL" ? "text-emerald-400" : "text-gray-600"}`} />
                <h3 className="text-2xl font-bold text-white mb-2">Rumah Residensial</h3>
                <p className="text-3xl font-light text-gray-400">{r.pctRumah} <span className="text-sm font-normal uppercase tracking-widest">Kecocokan</span></p>
              </div>

              <div className={`p-8 rounded-3xl border transition-all ${r.winner === "RUKO KOMERSIAL" ? "bg-[#111113] border-emerald-500/50" : "bg-[#0a0a0b] border-white/5"}`}>
                <Store className={`w-10 h-10 mb-4 ${r.winner === "RUKO KOMERSIAL" ? "text-emerald-400" : "text-gray-600"}`} />
                <h3 className="text-2xl font-bold text-white mb-2">Ruko Komersial</h3>
                <p className="text-3xl font-light text-gray-400">{r.pctRuko} <span className="text-sm font-normal uppercase tracking-widest">Kecocokan</span></p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
               <button onClick={() => router.push(r.recUrl)} className="px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl font-bold transition-all shadow-lg shadow-blue-500/20">
                 Lihat Detail {r.recProduct}
               </button>
               <button onClick={onBack} className="px-8 py-4 bg-transparent border border-white/20 hover:bg-white/10 text-white rounded-xl font-bold transition-colors">Eksplorasi Skenario Lain</button>
            </div>
          </motion.div>
        );
      })()}

    </div>
  );
}
