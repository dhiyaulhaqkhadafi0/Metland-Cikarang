import Navbar from "@/components/organisms/Navbar";
import Footer from "@/components/organisms/Footer";
import InvestmentHero from "@/components/organisms/InvestmentHero";
import MarketAnalysis from "@/components/organisms/MarketAnalysis";
import GrowthTimeline from "@/components/organisms/GrowthTimeline";
import GrowthAreaMap from "@/components/organisms/GrowthAreaMap";
import AdvancedCalculators from "@/components/organisms/AdvancedCalculators";
import InvestmentComparison from "@/components/organisms/InvestmentComparison";

export const metadata = {
  title: "Investment Hub | Metland Cikarang",
  description: "Pusat informasi investasi properti di Metland Cikarang. Hitung potensi ROI, Capital Gain, dan temukan alasan mengapa Timur Jakarta adalah masa depan investasi Anda.",
};

export default function InvestmentPage() {
  return (
    <main className="min-h-screen bg-[#060913]">
      <Navbar />
      
      {/* 1. Hero & Makro Analisis */}
      <InvestmentHero />
      
      {/* 2. Analisis Pasar Khusus Cikarang */}
      <MarketAnalysis />
      
      {/* 3. Timeline Perkembangan */}
      <GrowthTimeline />
      
      {/* 4. Peta Interaktif Kawasan Pertumbuhan */}
      <GrowthAreaMap />
      
      {/* 5. Kalkulator Lanjutan (ROI, Capital Gain, Rental Yield) */}
      <AdvancedCalculators />
      
      {/* 6. Perbandingan Investasi */}
      <InvestmentComparison />

      {/* 7. CTA Kembali ke Beranda */}
      <div className="flex justify-center py-16 bg-[#0a0f1a] border-t border-border">
        <a 
          href="/" 
          className="px-8 py-4 rounded-full border border-primary/30 text-emerald-400 hover:bg-primary hover:text-white transition-all font-semibold flex items-center group shadow-[0_0_15px_rgba(16,185,129,0.1)] hover:shadow-emerald-glow"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-3 group-hover:-translate-x-2 transition-transform"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
          Kembali ke Beranda
        </a>
      </div>

      <Footer />
    </main>
  );
}
