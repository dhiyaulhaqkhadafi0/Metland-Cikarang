"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, CheckCircle2, ChevronRight, Check, Minus, Plus, Star, BrainCircuit, Info, MapPin } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const purposes = ["Rumah Pertama", "Investasi", "Keluarga", "Bisnis", "Lainnya"];
const budgetRanges = ["< 700 Juta", "700 Juta - 1 Miliar", "1 Miliar - 1.5 Miliar", "> 1.5 Miliar", "Lainnya"];
const priorities = ["Dekat Stasiun", "3 Kamar Tidur", "Balkon Besar", "Potensi Investasi Tinggi", "Dekat Sekolah", "One Gate System", "Hook / Sudut", "Carport 2 Mobil"];
const timelines = ["Bulan Ini", "3 Bulan Kedepan", "6 Bulan Kedepan", "Masih Survey / Belum Pasti", "Lainnya"];

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
  { id: "derora-59", name: "Derora 59/84", cluster: "Avesa Garden", type: "Rumah", slug: "derora", price: "Rp 1.05 Miliar", priceNum: 1050000000, specs: { lt: "84m²", lb: "59m²", bed: 3, bath: 2, carport: 1, listrik: "2200W" } }
];

export default function PropertyWizard({ onBack, onSwitchToConsultant }) {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [purpose, setPurpose] = useState("");
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [budget, setBudget] = useState("");
  const [selectedPriorities, setSelectedPriorities] = useState([]);
  const [timeline, setTimeline] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const [showCustomPurpose, setShowCustomPurpose] = useState(false);
  const [showCustomBudget, setShowCustomBudget] = useState(false);
  const [showCustomTimeline, setShowCustomTimeline] = useState(false);

  const toggleProduct = (id) => {
    if (selectedProducts.includes(id)) {
      setSelectedProducts(prev => prev.filter(pId => pId !== id));
    } else if (selectedProducts.length < 2) {
      setSelectedProducts(prev => [...prev, id]);
    }
  };

  const togglePriority = (pri) => {
    if (selectedPriorities.includes(pri)) {
      setSelectedPriorities(prev => prev.filter(p => p !== pri));
    } else if (selectedPriorities.length < 3) {
      setSelectedPriorities(prev => [...prev, pri]);
    }
  };

  const handleNext = () => setStep(prev => prev + 1);
  const handlePrev = () => {
    if (step === 1) {
      if (showCustomPurpose) setShowCustomPurpose(false);
      else onBack();
    } else if (step === 2) {
      setStep(1);
    } else if (step === 3) {
      if (showCustomBudget) setShowCustomBudget(false);
      else setStep(2);
    } else if (step === 4) {
      setStep(3);
    } else if (step === 5) {
      if (showCustomTimeline) setShowCustomTimeline(false);
      else setStep(4);
    }
  };

  const runAnalysis = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowResult(true);
    }, 3500);
  };

  const getComparisonResult = () => {
    const prodA = subClusters.find(p => p.id === selectedProducts[0]);
    const prodB = subClusters.find(p => p.id === selectedProducts[1]);

    let winner = prodA;
    let loser = prodB;
    let scoreW = "96%";
    let scoreL = "85%";

    if (purpose.includes("Investasi") || (prodB.priceNum > prodA.priceNum && !purpose.includes("Rumah Pertama"))) {
      winner = prodB;
      loser = prodA;
    }

    return {
      winner,
      loser,
      scoreW,
      scoreL,
      verdict: `Berdasarkan tujuan Anda untuk ${purpose || "kebutuhan spesifik"} dengan prioritas [${selectedPriorities.join(', ')}], saya merekomendasikan ${winner.name}. ${winner.name} memiliki kecocokan tinggi secara spesifikasi dan kesiapan budget yang Anda sebutkan (${budget || "sesuai estimasi"}).`,
      reasons: [
        `Spesifikasi ruang (${winner.specs.lb} bangunan) memenuhi kriteria utama Anda.`,
        "Potensi nilai selaras dengan target waktu realisasi Anda.",
        "Komposisi DP 2.5% sangat efisien untuk cashflow Anda saat ini."
      ],
      tradeOffW: {
        get: ["Kesesuaian fungsi maksimal", "Fasilitas sesuai prioritas", "Lingkungan terbentuk"],
        lose: ["Cicilan bulanan perlu disiplin", "Ketersediaan unit terbatas"]
      },
      tradeOffL: {
        get: ["Harga mungkin lebih rendah / fleksibel", "Pilihan posisi masih banyak"],
        lose: ["Beberapa prioritas utama Anda tidak terpenuhi", "Perlu renovasi tambahan"]
      }
    };
  };

  return (
    <div className="w-full relative z-10">
      {!isAnalyzing && !showResult && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="max-w-3xl mx-auto">
          <div className="mb-8 text-center">
            <p className="text-blue-400 font-semibold tracking-wider text-xs mb-2 uppercase">Mode 1: Antar Cluster</p>
            <h2 className="text-3xl font-bold text-white mb-2">
              {step === 1 ? "Apa Tujuan Utama Anda?" : 
               step === 2 ? "Pilih 2 Tipe Properti" : 
               step === 3 ? "Berapa Range Budget Anda?" : 
               step === 4 ? "Pilih 3 Prioritas Utama" : "Kapan Rencana Membeli?"}
            </h2>
          </div>

          {step === 1 && !showCustomPurpose && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {purposes.map(p => (
                <button key={p} onClick={() => { 
                  if (p === "Lainnya") setShowCustomPurpose(true);
                  else { setPurpose(p); handleNext(); }
                }} className="p-6 bg-[#111113] border border-white/10 rounded-2xl text-left hover:border-blue-500/50 hover:bg-blue-500/10 transition-all text-white font-medium text-lg">
                  {p}
                </button>
              ))}
              <div className="col-span-1 sm:col-span-2 mt-4 flex justify-start">
                <button onClick={handlePrev} className="text-gray-500 hover:text-white text-sm">Kembali</button>
              </div>
            </div>
          )}
          {step === 1 && showCustomPurpose && (
            <div className="space-y-4">
              <input autoFocus type="text" value={purpose} onChange={e => setPurpose(e.target.value)} placeholder="Tuliskan tujuan spesifik Anda..." className="w-full bg-[#111113] border border-white/20 p-6 rounded-2xl text-white outline-none focus:border-blue-500 font-medium text-lg" />
              <div className="flex justify-between items-center mt-4">
                <button onClick={handlePrev} className="text-gray-500 hover:text-white">Kembali</button>
                <button onClick={handleNext} disabled={!purpose} className="px-8 py-3 bg-white text-black rounded-xl font-bold disabled:opacity-50">Lanjut</button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                {subClusters.map(p => {
                  const isSelected = selectedProducts.includes(p.id);
                  const disabled = selectedProducts.length === 2 && !isSelected;
                  return (
                    <button key={p.id} onClick={() => toggleProduct(p.id)} disabled={disabled} className={`p-4 rounded-2xl border text-left transition-all ${isSelected ? "bg-blue-500/20 border-blue-500/50 text-white" : disabled ? "opacity-30 border-white/5 bg-black" : "bg-[#111113] border-white/10 text-gray-400 hover:text-white"}`}>
                      <h4 className="font-bold text-lg">{p.name}</h4>
                      <p className="text-xs opacity-70">{p.cluster} • {p.price}</p>
                    </button>
                  );
                })}
              </div>
              <div className="flex justify-between items-center">
                <button onClick={handlePrev} className="text-gray-500 hover:text-white">Kembali</button>
                <button onClick={handleNext} disabled={selectedProducts.length !== 2} className="px-8 py-3 bg-white text-black rounded-xl font-bold disabled:opacity-50">Lanjut</button>
              </div>
            </div>
          )}

          {step === 3 && !showCustomBudget && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {budgetRanges.map(b => (
                <button key={b} onClick={() => { 
                  if (b === "Lainnya") setShowCustomBudget(true);
                  else { setBudget(b); handleNext(); }
                }} className="p-6 bg-[#111113] border border-white/10 rounded-2xl text-left hover:border-blue-500/50 hover:bg-blue-500/10 transition-all text-white font-medium">
                  {b}
                </button>
              ))}
              <div className="col-span-1 sm:col-span-2 mt-4 flex justify-start">
                <button onClick={handlePrev} className="text-gray-500 hover:text-white text-sm">Kembali</button>
              </div>
            </div>
          )}
          {step === 3 && showCustomBudget && (
            <div className="space-y-4">
              <input autoFocus type="text" value={budget} onChange={e => setBudget(e.target.value)} placeholder="Tuliskan nominal budget spesifik Anda..." className="w-full bg-[#111113] border border-white/20 p-6 rounded-2xl text-white outline-none focus:border-blue-500 font-medium text-lg" />
              <div className="flex justify-between items-center mt-4">
                <button onClick={handlePrev} className="text-gray-500 hover:text-white">Kembali</button>
                <button onClick={handleNext} disabled={!budget} className="px-8 py-3 bg-white text-black rounded-xl font-bold disabled:opacity-50">Lanjut</button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
                {priorities.map(pri => {
                  const isSelected = selectedPriorities.includes(pri);
                  const disabled = selectedPriorities.length === 3 && !isSelected;
                  return (
                    <button key={pri} onClick={() => togglePriority(pri)} disabled={disabled} className={`p-3 rounded-xl border text-sm text-center transition-all ${isSelected ? "bg-blue-500/20 border-blue-500/50 text-white" : disabled ? "opacity-30 border-white/5" : "bg-[#111113] border-white/10 text-gray-400"}`}>
                      {pri}
                    </button>
                  );
                })}
              </div>
              <div className="flex justify-between items-center">
                <button onClick={handlePrev} className="text-gray-500 hover:text-white">Kembali</button>
                <button onClick={handleNext} disabled={selectedPriorities.length === 0} className="px-8 py-3 bg-white text-black rounded-xl font-bold disabled:opacity-50">Lanjut</button>
              </div>
            </div>
          )}

          {step === 5 && !showCustomTimeline && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {timelines.map(t => (
                <button key={t} onClick={() => { 
                  if (t === "Lainnya") setShowCustomTimeline(true);
                  else { setTimeline(t); runAnalysis(); }
                }} className="p-6 bg-[#111113] border border-white/10 rounded-2xl text-left hover:border-blue-500/50 hover:bg-blue-500/10 transition-all text-white font-medium">
                  {t}
                </button>
              ))}
              <div className="col-span-1 sm:col-span-2 mt-4 flex justify-start">
                <button onClick={handlePrev} className="text-gray-500 hover:text-white text-sm">Kembali</button>
              </div>
            </div>
          )}
          {step === 5 && showCustomTimeline && (
            <div className="space-y-4">
              <input autoFocus type="text" value={timeline} onChange={e => setTimeline(e.target.value)} placeholder="Tuliskan estimasi rencana waktu Anda..." className="w-full bg-[#111113] border border-white/20 p-6 rounded-2xl text-white outline-none focus:border-blue-500 font-medium text-lg" />
              <div className="flex justify-between items-center mt-4">
                <button onClick={handlePrev} className="text-gray-500 hover:text-white">Kembali</button>
                <button onClick={() => { runAnalysis(); }} disabled={!timeline} className="px-8 py-3 bg-white text-black rounded-xl font-bold disabled:opacity-50">Analisis Sekarang</button>
              </div>
            </div>
          )}
        </motion.div>
      )}

      {isAnalyzing && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center py-20">
          <div className="w-24 h-24 mb-6 rounded-full border-4 border-blue-500/30 border-t-blue-400 animate-spin" />
          <h3 className="text-xl text-white font-bold mb-2">Membedah Profil Anda...</h3>
          <p className="text-gray-400 text-sm">Mencocokkan {selectedProducts.length} properti dengan preferensi spesifik.</p>
        </motion.div>
      )}

      {showResult && (() => {
        const res = getComparisonResult();
        return (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl mx-auto w-full">
            
            <div className="bg-gradient-to-r from-blue-900/40 to-transparent p-8 rounded-3xl border border-blue-500/30 mb-8 relative overflow-hidden">
              <BrainCircuit className="absolute -right-10 -bottom-10 w-64 h-64 text-blue-500/10 pointer-events-none" />
              <h2 className="text-sm text-blue-300 font-bold uppercase tracking-widest mb-4">🧠 SMI Verdict</h2>
              <p className="text-xl text-white font-light leading-relaxed max-w-3xl relative z-10">{res.verdict}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="bg-[#111113] border-2 border-emerald-500/50 rounded-3xl p-6 relative">
                <span className="absolute -top-3 right-6 bg-emerald-500 text-black text-xs font-bold px-3 py-1 rounded-full">🥇 PEMENANG</span>
                <h3 className="text-3xl font-bold text-white mb-2">{res.winner.name}</h3>
                <p className="text-emerald-400 font-light text-xl mb-6">{res.scoreW} Kecocokan</p>
                <div className="space-y-2 mb-6">
                  {res.reasons.map((r, i) => <p key={i} className="text-sm text-gray-300 flex"><Check className="w-4 h-4 mr-2 text-emerald-500 shrink-0" /> {r}</p>)}
                </div>
                <div className="bg-black/50 p-4 rounded-xl">
                  <h4 className="text-xs font-bold text-gray-500 mb-2 uppercase">Yang Anda Dapat</h4>
                  {res.tradeOffW.get.map((t, i) => <p key={i} className="text-xs text-gray-400 mb-1 flex"><Plus className="w-3 h-3 mr-2 text-emerald-500" /> {t}</p>)}
                </div>
              </div>

              <div className="bg-[#0a0a0b] border border-white/10 rounded-3xl p-6 relative">
                <span className="absolute -top-3 right-6 bg-gray-800 text-white border border-white/20 text-xs font-bold px-3 py-1 rounded-full">🥈 ALTERNATIF</span>
                <h3 className="text-2xl font-bold text-white mb-2">{res.loser.name}</h3>
                <p className="text-gray-400 font-light text-lg mb-6">{res.scoreL} Kecocokan</p>
                <div className="bg-black/50 p-4 rounded-xl mt-auto">
                  <h4 className="text-xs font-bold text-gray-500 mb-2 uppercase">Yang Dikorbankan</h4>
                  {res.tradeOffL.lose.map((t, i) => <p key={i} className="text-xs text-gray-400 mb-1 flex"><Minus className="w-3 h-3 mr-2 text-orange-500" /> {t}</p>)}
                </div>
              </div>
            </div>

            <div className="bg-[#111113] border border-white/10 rounded-3xl overflow-hidden mb-12">
              <div className="p-6 border-b border-white/10 bg-white/5">
                <h3 className="text-lg font-bold text-white">📋 Detail Spesifikasi Komparatif</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-gray-300">
                  <thead className="bg-[#0a0a0b] text-gray-500 uppercase text-xs">
                    <tr>
                      <th className="px-6 py-4 font-medium w-1/3">Spesifikasi</th>
                      <th className="px-6 py-4 font-bold text-white">{res.winner.name}</th>
                      <th className="px-6 py-4 font-medium">{res.loser.name}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {[
                      { label: "Harga Mulai", k: "price" },
                      { label: "Luas Tanah", k: "lt", obj: "specs" },
                      { label: "Luas Bangunan", k: "lb", obj: "specs" },
                      { label: "Kamar Tidur", k: "bed", obj: "specs" },
                      { label: "Kamar Mandi", k: "bath", obj: "specs" },
                      { label: "Carport", k: "carport", obj: "specs" },
                      { label: "Listrik", k: "listrik", obj: "specs" },
                      { label: "DP (Residensial)", k: "dp", val: "2.5% All-in" },
                      { label: "Free BPHTB & AJB", k: "promo", val: "Tersedia" }
                    ].map((row, idx) => {
                      const vW = row.val ? row.val : row.obj ? res.winner[row.obj][row.k] : res.winner[row.k];
                      const vL = row.val ? row.val : row.obj ? res.loser[row.obj][row.k] : res.loser[row.k];
                      let wIsBetter = false;
                      if (typeof vW === 'number' && typeof vL === 'number') wIsBetter = vW > vL;

                      return (
                        <tr key={idx} className="hover:bg-white/5 transition-colors">
                          <td className="px-6 py-4 font-medium text-gray-400">{row.label}</td>
                          <td className={`px-6 py-4 ${wIsBetter ? 'text-emerald-400 font-bold' : 'text-white'}`}>{vW}</td>
                          <td className="px-6 py-4 text-gray-500">{vL}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
               <button onClick={() => router.push(`/clusters/${res.winner.slug}`)} className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white rounded-xl font-bold transition-all shadow-lg shadow-emerald-500/20">
                 Lihat Detail {res.winner.name}
               </button>
               <button onClick={onBack} className="px-8 py-4 bg-transparent border border-white/20 hover:bg-white/10 text-white rounded-xl font-bold transition-colors">Eksplorasi Ulang</button>
            </div>
          </motion.div>
        );
      })()}
    </div>
  );
}
