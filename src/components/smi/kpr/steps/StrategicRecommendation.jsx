"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, AlertTriangle, TrendingUp, Cpu, Landmark, Clock, Percent } from "lucide-react";

const formatRupiah = (num) => new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(num || 0);

export default function StrategicRecommendation({ data, onNext }) {
  // --- Simple Mock AI Calculation ---
  const income = data.income.main + data.income.joint + data.income.extra;
  const totalOutflow = data.cashflow.transport + data.cashflow.insurance + data.cashflow.kids + data.cashflow.investment + data.cashflow.otherDebt;
  const availableCashflow = income - totalOutflow;
  const dsr = (data.cashflow.otherDebt / income) * 100;
  
  // Recommendations
  let healthScore = 92;
  let status = "Sangat Sehat";
  if (dsr > 20) { healthScore = 80; status = "Cukup Sehat"; }
  if (dsr > 35) { healthScore = 60; status = "Beresiko"; }

  const maxInstallment = income * 0.4 - data.cashflow.otherDebt;
  const budgetAman = maxInstallment > 0 ? (maxInstallment * 120) / 0.9 : 0; // Kasar 120 bulan pokok

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-8"
    >
      {/* Executive Summary & AI Insight */}
      <div className="bg-gradient-to-br from-[#0a0a0b] to-[#121213] border border-emerald-500/30 rounded-3xl p-8 md:p-10 relative overflow-hidden shadow-[0_0_40px_rgba(16,185,129,0.1)]">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="flex items-start gap-4 mb-6">
          <div className="p-3 bg-emerald-500/20 rounded-2xl">
            <Cpu className="w-6 h-6 text-emerald-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white mb-1">SMI Executive Summary</h2>
            <p className="text-emerald-400 text-sm font-medium">Generated for {data.profile.maritalStatus} Profile ({data.profile.age} yo)</p>
          </div>
        </div>

        <p className="text-lg text-gray-300 leading-relaxed mb-8">
          Anda berada pada kondisi finansial yang <strong className={healthScore >= 80 ? "text-emerald-400" : "text-amber-400"}>{status.toLowerCase()}</strong> untuk membeli properti. 
          Berdasarkan perhitungan *Cash Flow* dan gaya hidup Anda, batas budget KPR yang paling aman untuk Anda adalah di kisaran <strong className="text-white">{formatRupiah(budgetAman * 0.8)} - {formatRupiah(budgetAman)}</strong>.
        </p>

        <div className="bg-black/40 border border-white/5 rounded-2xl p-6 relative">
          <div className="absolute -top-3 left-6 px-3 py-1 bg-emerald-500 text-black text-xs font-bold rounded-full uppercase tracking-wider">
            SMI AI Insight
          </div>
          <p className="text-gray-300 leading-relaxed mt-2 text-sm italic">
            "Mengingat preferensi risiko Anda yang memprioritaskan <strong>'{data.risk}'</strong>, saya menyarankan Anda mengambil unit <strong>{data.property.product}</strong> dengan meningkatkan DP menjadi <strong>20%</strong> dan tenor <strong>20 Tahun</strong>. Strategi ini akan menjaga rasio hutang Anda tetap di angka {dsr.toFixed(1)}% (Sangat Aman) sekaligus memberikan ruang nafas bagi biaya pendidikan anak dan tabungan masa depan Anda."
          </p>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <MetricCard label="Health Score" value={`${healthScore}/100`} sub={status} color="emerald" />
        <MetricCard label="Current Debt Ratio" value={`${dsr.toFixed(1)}%`} sub={dsr < 30 ? "Ideal" : "Warning"} color={dsr < 30 ? "emerald" : "amber"} />
        <MetricCard label="Rekomendasi DP" value="20%" sub="Menekan cicilan" color="blue" />
        <MetricCard label="Rekomendasi Tenor" value="20 Thn" sub="Sesuai profil" color="purple" />
      </div>

      {/* Bank & Risk */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Bank Recommendation */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 hover:border-blue-500/30 transition-colors">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Landmark className="w-5 h-5 text-blue-400" /> Rekomendasi Bank
            </h3>
            <span className="px-3 py-1 bg-blue-500/20 text-blue-400 text-xs font-bold rounded-full">Top Match</span>
          </div>
          <div className="mb-4">
            <div className="text-3xl font-bold text-white">Bank Mandiri</div>
            <div className="text-blue-400 font-semibold text-sm">Bunga 2.75% Fixed 1 Tahun</div>
          </div>
          <ul className="space-y-3 mt-6">
            <li className="flex items-start gap-2 text-sm text-gray-400"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" /> Approval sangat cepat untuk status {data.employment}.</li>
            <li className="flex items-start gap-2 text-sm text-gray-400"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" /> Mendukung skema Joint Income secara fleksibel.</li>
            <li className="flex items-start gap-2 text-sm text-gray-400"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" /> Tersedia promo bebas biaya provisi khusus bulan ini.</li>
          </ul>
        </div>

        <div className="space-y-4">
          {/* Risk Alert */}
          <div className="bg-red-500/5 border border-red-500/20 rounded-2xl p-6">
            <h3 className="text-white font-bold mb-2 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-red-400" /> Risk Alert
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Jika Anda memaksa mengambil tenor 30 tahun, total bunga yang Anda bayarkan akan melonjak hingga 180% dari harga pokok rumah. Karena usia Anda saat ini {data.profile.age} tahun, tenor 20 tahun adalah batas maksimal yang paling sehat sebelum masa pensiun.
            </p>
          </div>

          {/* Opportunity Insight */}
          <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-2xl p-6">
            <h3 className="text-white font-bold mb-2 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-400" /> Opportunity Cost
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Berdasarkan tren kenaikan harga properti di Timur Jakarta (Rata-rata 8% per tahun), jika Anda menunda pembelian selama 2 tahun, harga {data.property.product} diperkirakan naik sebesar {formatRupiah(data.property.price * 0.16)}. Membeli tahun ini adalah langkah yang sangat tepat.
            </p>
          </div>
        </div>

      </div>

      <div className="mt-12 flex justify-end">
        <button 
          onClick={onNext}
          className="px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-emerald-400 hover:text-white transition-all flex items-center gap-2 shadow-lg"
        >
          Lihat Digital Financial Profile <ArrowRight className="w-5 h-5" />
        </button>
      </div>

    </motion.div>
  );
}

function MetricCard({ label, value, sub, color }) {
  const colorMap = {
    emerald: "text-emerald-400",
    amber: "text-amber-400",
    blue: "text-blue-400",
    purple: "text-purple-400"
  };
  
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
      <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-2">{label}</p>
      <p className={`text-3xl font-bold mb-1 ${colorMap[color]}`}>{value}</p>
      <p className="text-white text-sm font-medium">{sub}</p>
    </div>
  );
}
