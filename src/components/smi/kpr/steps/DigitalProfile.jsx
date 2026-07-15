"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Download, RefreshCw, CalendarCheck, ShieldCheck, CheckCircle2, Snail, Rocket, Star, ShieldAlert, Loader2 } from "lucide-react";
import jsPDF from "jspdf";
import domtoimage from "dom-to-image-more";

export default function DigitalProfile({ data, onRestart }) {
  const printRef = useRef();
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadPdf = async () => {
    setIsDownloading(true);
    
    // Simpan referensi console.error asli untuk membungkam overlay error bawaan Next.js di mode dev
    const originalConsoleError = console.error;
    
    try {
      // Override console.error sementara (karena dom-to-image me-log error CORS yang sebenarnya tidak fatal)
      console.error = (...args) => {
        if (args[0] && args[0].toString().includes("cssRules")) return;
        originalConsoleError(...args);
      };

      const element = printRef.current;
      const elWidth = element.offsetWidth;
      const elHeight = element.offsetHeight;

      const dataUrl = await domtoimage.toPng(element, {
        bgcolor: "#020202",
        scale: 2
      });
      
      const pdf = new jsPDF({
        orientation: "p",
        unit: "px",
        format: [elWidth, elHeight]
      });
      
      pdf.addImage(dataUrl, "PNG", 0, 0, elWidth, elHeight);
      pdf.save("SMI-Digital-Financial-Profile.pdf");
    } catch (error) {
      // Gunakan console.warn agar tidak memicu layar error merah di Next.js
      console.warn("PDF Generation info:", error);
    } finally {
      // Kembalikan console.error ke fungsi aslinya
      console.error = originalConsoleError;
      setIsDownloading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="space-y-8"
    >
      {/* Container to be captured for PDF */}
      <div 
        ref={printRef} 
        className="bg-[#020202] border border-emerald-500/30 rounded-3xl p-8 md:p-12 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-emerald-600 via-emerald-400 to-emerald-600" />
        
        {/* PDF Header */}
        <div className="flex justify-between items-start mb-12 border-b border-white/10 pb-8 relative z-10">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2 uppercase tracking-widest">Digital Financial Profile</h2>
            <p className="text-emerald-400 font-mono text-sm">Powered by SMI (Smart Metland Intelligence)</p>
          </div>
          <div className="text-right">
            <p className="text-gray-400 text-sm">Generated on</p>
            <p className="text-white font-bold">{new Date().toLocaleString('id-ID', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
          </div>
        </div>

        {/* Profile Info */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 relative z-10">
          <InfoItem label="Profil" value={data.profile.name ? `${data.profile.name} (${data.profile.age}th)` : `${data.profile.maritalStatus} (${data.profile.age}th)`} />
          <div className="hidden md:block">
            <InfoItem label="Pekerjaan" value={data.employment} />
          </div>
          <InfoItem label="Properti" value={data.property.product} />
          <InfoItem label="Target Harga" value={`${(data.property.price / 1000000).toLocaleString('id-ID')} Juta`} />
        </div>

        {/* Core Scores */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 relative z-10">
          <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
            <h3 className="text-gray-400 text-sm uppercase tracking-wider mb-6">Financial Ratings</h3>
            <div className="space-y-6">
              <RatingRow label="Buying Capacity" stars={4} />
              <RatingRow label="KPR Health" stars={5} />
              <RatingRow label="Investment Potential" stars={4} />
            </div>
          </div>

          <div className="bg-emerald-500/10 rounded-2xl p-6 border border-emerald-500/20 flex flex-col justify-center items-center text-center">
            <ShieldAlert className="w-10 h-10 text-emerald-400 mb-4" />
            <h3 className="text-gray-400 text-sm uppercase tracking-wider mb-2">Tingkat Risiko</h3>
            <div className="text-4xl font-bold text-white">Rendah</div>
            <p className="text-emerald-400 text-sm mt-2">Cash flow sangat aman</p>
          </div>
        </div>

        {/* Recommended Strategy */}
        <div className="bg-[#121213]/80 backdrop-blur-sm rounded-2xl p-8 border border-white/5 mb-8 relative z-10 overflow-hidden">
          
          {/* Watermark / Stamp Image in Strategy Section */}
          <div className="absolute top-4 right-4 md:top-8 md:right-8 pointer-events-none opacity-50 transform rotate-[-15deg] z-0">
            <img 
              src="/gallery umum/smi stempel.png" 
              alt="SMI Stamp" 
              className="w-24 h-24 md:w-36 md:h-36 object-contain"
            />
          </div>

          <h3 className="text-xl font-bold text-white mb-6 relative z-10">🎯 Recommended Strategy</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <StrategyItem title="Beli Tahun Ini" desc="Menghindari inflasi harga 8% tahun depan" icon={<Rocket className="w-5 h-5" />} />
            <StrategyItem title={`DP ${data.property.dp}%`} desc="Ideal untuk menekan angsuran" icon={<ShieldCheck className="w-5 h-5" />} />
            <StrategyItem title="Tenor 20 Tahun" desc="Batas aman sebelum masa pensiun" icon={<CalendarCheck className="w-5 h-5" />} />
            <StrategyItem title="Bank Mandiri" desc="Promo terbaik untuk profil Anda saat ini" icon={<Star className="w-5 h-5" />} />
          </div>
          
          <div className="mt-8 p-4 bg-white/5 rounded-xl border border-white/5">
            <p className="text-sm text-gray-300 italic leading-relaxed">
              "Berdasarkan kondisi finansial Anda saat ini, membeli rumah dalam 6 bulan ke depan merupakan pilihan yang paling optimal. Dengan menaikkan DP menjadi {data.property.dp}%, Anda dapat menghemat total bunga dalam jumlah yang signifikan sekaligus menjaga rasio cicilan tetap sehat."
            </p>
          </div>
        </div>

        <div className="text-center text-xs text-gray-600 mt-8">
          Dokumen ini di-*generate* secara otomatis oleh SMI Engine. Bukan merupakan persetujuan kredit final dari bank.
        </div>
      </div>

      {/* Action Buttons (Not included in PDF) */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-8">
        <button 
          onClick={handleDownloadPdf}
          disabled={isDownloading}
          className="w-full sm:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-bold rounded-full border border-white/10 transition-all flex items-center justify-center gap-2"
        >
          {isDownloading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Download className="w-5 h-5" />}
          {isDownloading ? "Mengekspor PDF..." : "Download Report (PDF)"}
        </button>
        
        <a 
          href="https://wa.me/6281946838791?text=Halo%20Metland%20Cikarang,%20saya%20ingin%20booking%20visit%20setelah%20melihat%20rekomendasi%20KPR%20dari%20SMI."
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-bold rounded-full transition-all hover:scale-105 shadow-[0_0_20px_rgba(16,185,129,0.3)] flex items-center justify-center gap-2"
        >
          <CalendarCheck className="w-5 h-5 text-yellow-300" />
          Booking Visit Sekarang
        </a>

        <button 
          onClick={onRestart}
          className="w-full sm:w-auto px-8 py-4 text-gray-400 hover:text-white font-medium transition-colors flex items-center justify-center gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          Ulangi Analisis
        </button>
      </div>
    </motion.div>
  );
}

function InfoItem({ label, value }) {
  return (
    <div>
      <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-1">{label}</p>
      <p className="text-white font-bold">{value}</p>
    </div>
  );
}

function RatingRow({ label, stars }) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-white font-medium">{label}</span>
      <div className="flex gap-1">
        {[1,2,3,4,5].map(i => (
          <Star key={i} className={`w-4 h-4 ${i <= stars ? "fill-emerald-400 text-emerald-400" : "text-gray-600"}`} />
        ))}
      </div>
    </div>
  );
}

function StrategyItem({ title, desc, icon }) {
  return (
    <div className="flex items-start gap-3 p-3 bg-black/40 rounded-xl border border-white/5">
      <div className="text-emerald-400 mt-1">{icon}</div>
      <div>
        <h4 className="text-white font-bold text-sm">{title}</h4>
        <p className="text-gray-400 text-xs mt-1">{desc}</p>
      </div>
    </div>
  );
}
