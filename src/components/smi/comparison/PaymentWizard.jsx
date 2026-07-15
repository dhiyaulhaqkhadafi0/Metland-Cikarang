"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Wallet, Scale, DollarSign, BrainCircuit, Landmark, Star } from "lucide-react";
import { useRouter } from "next/navigation";

const subClusters = [
  { id: "myzora-33", name: "Myzora 33/72", cluster: "Brassia Garden", type: "Rumah", slug: "brassia", price: "Rp 647 Juta", priceNum: 647000000, floors: 1 },
  { id: "myzora-45", name: "Myzora 45/72", cluster: "Brassia Garden", type: "Rumah", slug: "brassia", price: "Rp 750 Juta", priceNum: 750000000, floors: 2 },
  { id: "myzora-56", name: "Myzora 56/84", cluster: "Brassia Garden", type: "Rumah", slug: "brassia", price: "Rp 992 Juta", priceNum: 992000000, floors: 2 },
  { id: "myzora-77", name: "Myzora 77/98", cluster: "Brassia Garden", type: "Rumah", slug: "brassia", price: "Rp 1.2 Miliar", priceNum: 1200000000, floors: 2 },
  { id: "ellyra-45", name: "Ellyra 45/72", cluster: "Brassia Garden", type: "Rumah", slug: "brassia", price: "Rp 850 Juta", priceNum: 850000000, floors: 2 },
  { id: "ellyra-56-84", name: "Ellyra 56/84", cluster: "Brassia Garden", type: "Rumah", slug: "brassia", price: "Rp 1.1 Miliar", priceNum: 1100000000, floors: 2 },
  { id: "ellyra-56-98", name: "Ellyra 56/98", cluster: "Brassia Garden", type: "Rumah", slug: "brassia", price: "Rp 1.15 Miliar", priceNum: 1150000000, floors: 2 },
  { id: "canary-22", name: "Canary 22/72", cluster: "Avesa Garden", type: "Rumah", slug: "avesa-garden", price: "Rp 518 Juta", priceNum: 518000000, floors: 1 },
  { id: "canary-30", name: "Canary 30/72", cluster: "Avesa Garden", type: "Rumah", slug: "avesa-garden", price: "Rp 578 Juta", priceNum: 578000000, floors: 1 },
  { id: "derora-33", name: "Derora 33/72", cluster: "Avesa Garden", type: "Rumah", slug: "derora", price: "Rp 695 Juta", priceNum: 695000000, floors: 1 },
  { id: "derora-59", name: "Derora 59/84", cluster: "Avesa Garden", type: "Rumah", slug: "derora", price: "Rp 1.05 Miliar", priceNum: 1050000000, floors: 2 },
  { id: "easton-90", name: "Easton 90/54", cluster: "Easton Gateway", type: "Ruko", slug: "easton-gateway", price: "Rp 1.2 Miliar", priceNum: 1200000000, floors: 2 },
  { id: "easton-100", name: "Easton 100/60", cluster: "Easton Gateway", type: "Ruko", slug: "easton-gateway", price: "Rp 1.4 Miliar", priceNum: 1400000000, floors: 2 }
];

const paymentMethods = [
  { id: "cash", label: "Cash Keras", desc: "Pelunasan tunai 1x, dapat potongan khusus 2%." },
  { id: "bertahap", label: "Cash Bertahap (12x)", desc: "Cicilan ke developer selama 12 bulan, tanpa bunga." },
  { id: "kpr", label: "KPR / KPA", desc: "Melalui Bank rekanan dengan ragam promo bunga." }
];

const banks = [
  { id: "mandiri", name: "Mandiri", rate: 0.0260, label: "Promo 2.60% (1 Thn)", recommended: true },
  { id: "bca", name: "BCA", rate: 0.0275, label: "Promo 2.75% (1 Thn)" },
  { id: "bni", name: "BNI", rate: 0.0275, label: "Promo 2.75% (1 Thn)" },
  { id: "btn", name: "BTN", rate: 0.0290, label: "Promo 2.90% (1 Thn)" },
  { id: "bri", name: "BRI", rate: 0.0300, label: "Promo 3.00% (1 Thn)" },
  { id: "bsi", name: "BSI", rate: 0.0310, label: "Promo 3.10% (1 Thn)" },
  { id: "nobu", name: "Nobu", rate: 0.0350, label: "Promo 3.50% (1 Thn)" }
];

const incomes = ["< 15 Juta", "15 - 25 Juta", "25 - 50 Juta", "> 50 Juta", "Lainnya"];
const tenors = [5, 10, 15, 20];

export default function PaymentWizard({ onBack }) {
  const router = useRouter();
  const [step, setStep] = useState(1);
  
  const [product, setProduct] = useState("");
  const [method, setMethod] = useState("");
  const [bank, setBank] = useState(null);
  const [income, setIncome] = useState("");
  const [tenor, setTenor] = useState(null);
  
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const [showCustomIncome, setShowCustomIncome] = useState(false);

  const handleNext = (nextMethod) => {
    const currentMethod = nextMethod || method;
    if (step === 2 && currentMethod !== "kpr") {
      setStep(4); // Skip bank selection if not KPR
    } else if (step === 3 && currentMethod !== "kpr") {
      setStep(4); // Failsafe
    } else {
      setStep(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (step === 1) onBack();
    else if (step === 4 && method !== "kpr") setStep(2);
    else if (step === 4 && showCustomIncome) setShowCustomIncome(false);
    else setStep(prev => prev - 1);
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
    const prop = subClusters.find(p => p.id === product);
    const basePrice = prop.priceNum;
    
    // Booking Fee Logic
    const bookingFee = prop.type === "Ruko" ? 15000000 : (prop.floors === 1 ? 10000000 : 15000000);
    
    // DP Logic
    const dpTotal = prop.type === "Ruko" ? 27000000 : basePrice * 0.025;
    const sisaDp = Math.max(0, dpTotal - bookingFee); // Just in case Booking > DP
    
    let cashDiskon = 0;
    let totalBayar = 0;
    let cicilanPerBulan = 0;
    let totalBunga = 0;

    let title = "";
    let verdict = "";

    if (method === "cash") {
      cashDiskon = basePrice * 0.02; // Diskon 2%
      totalBayar = basePrice - cashDiskon;
      title = "Analisis Cash Keras";
      verdict = `Anda mendapatkan potongan spesial sebesar 2% (${formatIDR(cashDiskon)}). Skema pembayaran ini sangat cocok untuk meminimalisir liabilitas dan mendapatkan harga terbaik untuk unit ${prop.name}.`;
    } else if (method === "bertahap") {
      totalBayar = basePrice;
      cicilanPerBulan = (basePrice - bookingFee) / 12; // Assuming booking fee is paid first
      title = "Analisis Cash Bertahap (12 Bulan)";
      verdict = `Dengan cicilan ${formatIDR(cicilanPerBulan)} per bulan selama setahun tanpa bunga (setelah Booking Fee ${formatIDR(bookingFee)}), skema ini ideal jika Anda sedang menunggu pencairan dana besar tanpa terikat bunga bank.`;
    } else if (method === "kpr") {
      const selectedBank = banks.find(b => b.id === bank);
      const plafond = basePrice - dpTotal; // Bank finances Price - DP
      const t = tenor || 15;
      const b = selectedBank ? selectedBank.rate : 0.0260;
      
      // Simple flat KPR formula for illustration
      cicilanPerBulan = (plafond * (1 + (b * t))) / (t * 12);
      totalBayar = dpTotal + (cicilanPerBulan * t * 12);
      totalBunga = totalBayar - basePrice;

      title = `Analisis KPR (${selectedBank?.name} - Promo ${selectedBank?.rate * 100}%)`;
      verdict = `Dengan skema KPR Bank ${selectedBank?.name}, Anda cukup menyiapkan Booking Fee ${formatIDR(bookingFee)} dan Sisa DP ${formatIDR(sisaDp)}. Estimasi cicilan Anda adalah ${formatIDR(cicilanPerBulan)} selama ${t} tahun.`;
    }

    return {
      prop, basePrice, bookingFee, dpTotal, sisaDp, cashDiskon, totalBayar, cicilanPerBulan, totalBunga, title, verdict, plafond: basePrice - dpTotal
    };
  };

  return (
    <div className="w-full relative z-10">
      
      {!isAnalyzing && !showResult && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="max-w-3xl mx-auto">
          <div className="mb-8 text-center">
            <p className="text-blue-400 font-semibold tracking-wider text-xs mb-2 uppercase">Mode 3: Skema Pembayaran</p>
            <h2 className="text-3xl font-bold text-white mb-2">
              {step === 1 ? "Pilih Unit Spesifik yang Ingin Dihitung" : 
               step === 2 ? "Skema Pembayaran Apa yang Diinginkan?" : 
               step === 3 ? "Pilih Bank KPR (Estimasi Promo Saat Ini)" :
               step === 4 ? "Estimasi Pendapatan Bulanan?" :
               "Berapa Lama Tenor yang Diinginkan?"}
            </h2>
          </div>

          {step === 1 && (
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                {subClusters.map(p => (
                  <button key={p.id} onClick={() => { setProduct(p.id); handleNext(); }} className="p-5 bg-[#111113] border border-white/10 rounded-2xl text-left hover:border-blue-500/50 hover:bg-blue-500/10 transition-all text-white font-medium">
                    <h4 className="font-bold text-white text-lg">{p.name}</h4>
                    <p className="text-blue-400 font-medium text-sm">{p.price}</p>
                    <p className="text-gray-500 text-xs mt-1">DP: {p.type === "Ruko" ? "Rp 27 Juta" : "2.5%"} | {p.type}</p>
                  </button>
                ))}
              </div>
              <div className="flex justify-start">
                <button onClick={handlePrev} className="text-gray-500 hover:text-white">Kembali</button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="grid grid-cols-1 gap-4">
              {paymentMethods.map(m => (
                <button key={m.id} onClick={() => { setMethod(m.id); handleNext(m.id); }} className="p-6 bg-[#111113] border border-white/10 rounded-2xl text-left hover:border-blue-500/50 hover:bg-blue-500/10 transition-all text-white font-medium text-lg flex flex-col">
                  <span>{m.label}</span>
                  <span className="text-sm text-gray-400 mt-2 font-normal">{m.desc}</span>
                </button>
              ))}
              <div className="mt-4"><button onClick={handlePrev} className="text-gray-500 hover:text-white">Kembali</button></div>
            </div>
          )}

          {step === 3 && method === "kpr" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {banks.map(b => (
                <button key={b.id} onClick={() => { setBank(b.id); handleNext(); }} className={`p-5 bg-[#111113] border ${b.recommended ? "border-emerald-500/50 shadow-lg shadow-emerald-500/10" : "border-white/10"} rounded-2xl text-left hover:border-blue-500/50 hover:bg-blue-500/10 transition-all text-white`}>
                  {b.recommended && <div className="text-[10px] font-bold bg-emerald-500 text-black px-2 py-1 rounded-full inline-block mb-2 flex items-center gap-1 w-fit"><Star className="w-3 h-3"/> REKOMENDASI</div>}
                  <div className="flex items-center gap-3 mb-1">
                    <Landmark className={`w-5 h-5 ${b.recommended ? "text-emerald-400" : "text-blue-400"}`} />
                    <span className="font-bold text-lg">{b.name}</span>
                  </div>
                  <span className={`text-sm font-bold ${b.recommended ? "text-emerald-400" : "text-gray-400"}`}>{b.label}</span>
                </button>
              ))}
              <div className="col-span-1 sm:col-span-2 lg:col-span-3 mt-4"><button onClick={handlePrev} className="text-gray-500 hover:text-white">Kembali</button></div>
            </div>
          )}

          {step === 4 && !showCustomIncome && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {incomes.map(i => (
                <button key={i} onClick={() => { 
                  if (i === "Lainnya") setShowCustomIncome(true);
                  else {
                    setIncome(i); 
                    if (method !== "kpr") runAnalysis();
                    else handleNext(); 
                  }
                }} className="p-6 bg-[#111113] border border-white/10 rounded-2xl text-left hover:border-blue-500/50 hover:bg-blue-500/10 transition-all text-white font-medium text-lg">
                  {i}
                </button>
              ))}
              <div className="col-span-1 sm:col-span-2 mt-4"><button onClick={handlePrev} className="text-gray-500 hover:text-white">Kembali</button></div>
            </div>
          )}
          {step === 4 && showCustomIncome && (
            <div className="space-y-4">
              <input autoFocus type="text" value={income} onChange={e => setIncome(e.target.value)} placeholder="Tuliskan estimasi pendapatan spesifik Anda..." className="w-full bg-[#111113] border border-white/20 p-6 rounded-2xl text-white outline-none focus:border-blue-500 font-medium text-lg" />
              <div className="flex justify-between items-center mt-4">
                <button onClick={handlePrev} className="text-gray-500 hover:text-white">Kembali</button>
                <button onClick={() => { 
                  if (method !== "kpr") runAnalysis();
                  else handleNext(); 
                }} disabled={!income} className="px-8 py-3 bg-white text-black rounded-xl font-bold disabled:opacity-50">{method !== "kpr" ? "Analisis Sekarang" : "Lanjut"}</button>
              </div>
            </div>
          )}

          {step === 5 && method === "kpr" && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {tenors.map(t => (
                <button key={t} onClick={() => { setTenor(t); runAnalysis(); }} className="p-6 bg-[#111113] border border-white/10 rounded-2xl text-center hover:border-blue-500/50 hover:bg-blue-500/10 transition-all text-white font-medium text-lg">
                  {t} Tahun
                </button>
              ))}
              <div className="col-span-2 sm:col-span-4 mt-4"><button onClick={handlePrev} className="text-gray-500 hover:text-white">Kembali</button></div>
            </div>
          )}

        </motion.div>
      )}

      {isAnalyzing && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center py-20 text-center">
          <Scale className="w-20 h-20 text-blue-400 mb-6 animate-pulse" />
          <h3 className="text-xl text-white font-bold mb-2">Simulasi Keuangan Berjalan...</h3>
          <p className="text-gray-400 text-sm">Menghitung skema potongan, booking fee, dan bunga riil sesuai kebijakan saat ini.</p>
        </motion.div>
      )}

      {showResult && (() => {
        const r = getResults();
        return (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto w-full">
            <div className="bg-gradient-to-r from-blue-900/40 to-transparent p-8 rounded-3xl border border-blue-500/30 mb-8 flex gap-6">
              <BrainCircuit className="w-12 h-12 text-blue-400 shrink-0" />
              <div>
                <h2 className="text-sm text-blue-300 font-bold uppercase tracking-widest mb-2">🧠 SMI Verdict: {r.title}</h2>
                <p className="text-lg text-white font-light">{r.verdict}</p>
              </div>
            </div>

            <div className="bg-[#111113] border border-white/10 rounded-3xl overflow-hidden mb-8">
              <div className="p-8">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <Wallet className="text-emerald-400" /> Rincian Finansial: {r.prop.name}
                </h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between border-b border-white/5 pb-4">
                    <span className="text-gray-400">Harga Properti Estimasi</span>
                    <span className="text-white font-bold">{formatIDR(r.basePrice)}</span>
                  </div>

                  {method === "cash" && (
                    <div className="flex justify-between border-b border-white/5 pb-4">
                      <span className="text-emerald-400">Diskon Pembayaran Cash (2%)</span>
                      <span className="text-emerald-400 font-bold">- {formatIDR(r.cashDiskon)}</span>
                    </div>
                  )}

                  {(method === "kpr" || method === "bertahap") && (
                    <div className="flex justify-between border-b border-emerald-500/20 bg-emerald-500/5 p-4 rounded-xl pb-4">
                      <span className="text-emerald-400 font-medium">Uang Tanda Jadi (Booking Fee)</span>
                      <span className="text-emerald-400 font-bold">{formatIDR(r.bookingFee)}</span>
                    </div>
                  )}

                  {method === "kpr" && (
                    <>
                      <div className="flex justify-between border-b border-white/5 pb-4">
                        <span className="text-gray-400">Total DP ({r.prop.type === "Ruko" ? "Rp 27 Juta" : "2.5%"})</span>
                        <span className="text-gray-300 font-bold">{formatIDR(r.dpTotal)}</span>
                      </div>
                      <div className="flex justify-between border-b border-white/5 pb-4">
                        <span className="text-gray-400">Sisa DP Setelah Booking</span>
                        <span className="text-white font-bold">{formatIDR(r.sisaDp)}</span>
                      </div>
                      <div className="flex justify-between border-b border-white/5 pb-4">
                        <span className="text-gray-400">Plafon Pinjaman Bank</span>
                        <span className="text-white font-bold">{formatIDR(r.plafond)}</span>
                      </div>
                      <div className="flex justify-between border-b border-white/5 pb-4">
                        <span className="text-gray-400">Estimasi Cicilan ({tenor} Tahun)</span>
                        <span className="text-blue-400 font-bold text-xl">{formatIDR(r.cicilanPerBulan)} / bln</span>
                      </div>
                      <div className="flex justify-between border-b border-white/5 pb-4">
                        <span className="text-gray-400">Total Bunga ({tenor} Tahun)</span>
                        <span className="text-orange-400 font-bold">{formatIDR(r.totalBunga)}</span>
                      </div>
                    </>
                  )}

                  {method === "bertahap" && (
                    <div className="flex justify-between border-b border-white/5 pb-4">
                      <span className="text-gray-400">Sisa Pelunasan (Setelah Booking)</span>
                      <span className="text-white font-bold">{formatIDR(r.basePrice - r.bookingFee)}</span>
                    </div>
                  )}
                  {method === "bertahap" && (
                    <div className="flex justify-between border-b border-white/5 pb-4">
                      <span className="text-gray-400">Cicilan Developer (12x)</span>
                      <span className="text-blue-400 font-bold text-xl">{formatIDR(r.cicilanPerBulan)} / bln</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="bg-[#0a0a0b] p-8 border-t border-white/10">
                <p className="text-sm text-gray-500 uppercase tracking-widest mb-2">Total Seluruh Pembayaran</p>
                <p className="text-4xl font-bold text-white">{formatIDR(r.totalBayar)}</p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
               <button onClick={() => router.push(`/clusters/${r.prop.slug}`)} className="px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl font-bold transition-all shadow-lg shadow-blue-500/20">
                 Eksplor Detail {r.prop.name}
               </button>
               <button onClick={onBack} className="px-8 py-4 bg-transparent border border-white/20 hover:bg-white/10 text-white rounded-xl font-bold transition-colors">Bandingkan Skema Lain</button>
            </div>

          </motion.div>
        );
      })()}

    </div>
  );
}
