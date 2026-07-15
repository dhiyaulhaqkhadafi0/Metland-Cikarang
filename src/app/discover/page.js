import DiscoverHero from "@/components/organisms/DiscoverHero";
import DiscoverEmotionalHook from "@/components/organisms/DiscoverEmotionalHook";
import DiscoverWhyChoose from "@/components/organisms/DiscoverWhyChoose";
import DiscoverMasterplan from "@/components/organisms/DiscoverMasterplan";
import DiscoverAreaMap from "@/components/organisms/DiscoverAreaMap";
import DiscoverFutureGrowth from "@/components/organisms/DiscoverFutureGrowth";
import DiscoverGallery from "@/components/organisms/DiscoverGallery";
import Accordion from "@/components/atoms/Accordion";
import SectionReveal from "@/components/atoms/SectionReveal";
import ScrollToTop from "@/components/atoms/ScrollToTop";
import Link from "next/link";
import { ArrowRight, Home, Briefcase, ChevronLeft } from "lucide-react";

export const metadata = {
  title: 'Discover Metland Cikarang | Ekosistem Masa Depan',
  description: 'Temukan alasan mengapa Metland Cikarang adalah pilihan terbaik untuk hunian dan investasi di koridor timur Jakarta. Jelajahi masterplan, fasilitas, dan potensi masa depan kami.',
  openGraph: {
    title: 'Discover Metland Cikarang | Ekosistem Masa Depan',
    description: 'Temukan alasan mengapa Metland Cikarang adalah pilihan terbaik untuk hunian dan investasi.',
    images: ['/images/og-discover.jpg'],
  },
};

const faqs = [
  {
    question: "Apa konsep utama dari Metland Cikarang?",
    answer: "Metland Cikarang mengusung konsep 'Forest Serenity in Urban City', yang menggabungkan kenyamanan fasilitas perkotaan dengan lingkungan hijau yang asri dan berkelanjutan."
  },
  {
    question: "Bagaimana akses transportasi menuju kawasan?",
    answer: "Kawasan ini sangat strategis, hanya berjarak 5 menit dari Stasiun KRL Metland Telaga Murni dan memiliki akses dekat ke Pintu Tol Telaga Asih, memudahkan mobilitas Anda ke Jakarta maupun area lainnya."
  },
  {
    question: "Apakah sistem pembayarannya fleksibel?",
    answer: "Sangat fleksibel dan terjangkau! Hanya dengan cicilan 3 jutaan per bulan, Anda sudah bisa mendapatkan unit rumah yang nyaman di kawasan berkembang dengan fasilitas lengkap. DP juga bisa dicicil agar semakin meringankan langkah Anda."
  },
  {
    question: "Apakah ini cocok untuk investasi?",
    answer: "Sangat cocok. Terletak di koridor timur Jakarta yang sedang berkembang pesat dengan berbagai pembangunan infrastruktur makro, nilai properti di kawasan ini diproyeksikan akan terus mengalami kenaikan yang signifikan."
  }
];

export default function DiscoverPage() {
  return (
    <main className="min-h-screen bg-dark-bg text-light-text selection:bg-primary/30 selection:text-white pb-20 relative">
      
      {/* Back Button */}
      <Link href="/" className="fixed top-6 left-6 sm:top-8 sm:left-8 z-50 flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 bg-black/40 hover:bg-white hover:text-black text-white backdrop-blur-md border border-white/10 hover:border-white rounded-full transition-all duration-300 shadow-2xl group">
        <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
        <span className="font-bold text-sm tracking-wide hidden md:block">Kembali ke Beranda</span>
      </Link>

      {/* 1. Hero Storytelling */}
      <DiscoverHero />

      {/* 1.5 Emotional Hook */}
      <DiscoverEmotionalHook />

      {/* 2. Why Choose Metland */}
      <DiscoverWhyChoose />

      {/* 3. Interactive Masterplan */}
      <DiscoverMasterplan />

      {/* 4. Area Map */}
      <DiscoverAreaMap />

      {/* 5. Future Growth */}
      <DiscoverFutureGrowth />

      {/* 6. Lifestyle Gallery */}
      <DiscoverGallery />

      {/* 7. FAQ */}
      <section className="py-24 bg-dark-bg relative">
        <div className="container mx-auto px-6 max-w-3xl">
          <SectionReveal>
            <h2 className="text-3xl md:text-5xl font-bold text-center text-white mb-12">Pertanyaan Umum</h2>
          </SectionReveal>
          <SectionReveal delay={0.2}>
            <Accordion items={faqs} />
          </SectionReveal>
        </div>
      </section>

      {/* 8. Intent-Based CTA */}
      <section className="py-24 bg-dark-card border-t border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
        <div className="container mx-auto px-6 relative z-10 text-center">
          <SectionReveal>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">Masa Depan Anda <br/> Dimulai di Sini.</h2>
            <p className="text-gray-400 text-lg mb-12 max-w-2xl mx-auto">
              Mari temukan ruang yang paling tepat untuk Anda. Apa tujuan utama Anda menjelajahi Metland Cikarang hari ini?
            </p>
          </SectionReveal>

          <div className="flex flex-col md:flex-row gap-6 justify-center max-w-4xl mx-auto">
            <SectionReveal delay={0.2} className="flex-1">
              <Link href="/explore?intent=residential" className="group block p-10 rounded-[2rem] bg-white/5 border border-white/10 hover:bg-primary/10 hover:border-primary/50 transition-all duration-300">
                <div className="w-20 h-20 rounded-full bg-primary/20 text-primary flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg">
                  <Home size={36} />
                </div>
                <h3 className="text-3xl font-bold text-white mb-3">Temukan Rumah Ideal Anda</h3>
                <p className="text-gray-400 mb-8 text-base">Cari cluster yang sesuai budget dan kebutuhan keluarga Anda.</p>
                <div className="inline-flex items-center gap-2 text-primary font-bold group-hover:gap-4 transition-all">
                  Lihat Residensial <ArrowRight size={20} />
                </div>
              </Link>
            </SectionReveal>

            <SectionReveal delay={0.3} className="flex-1">
              <Link href="/explore?intent=commercial" className="group block p-10 rounded-[2rem] bg-white/5 border border-white/10 hover:bg-emerald-500/10 hover:border-emerald-500/50 transition-all duration-300">
                <div className="w-20 h-20 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg">
                  <Briefcase size={36} />
                </div>
                <h3 className="text-3xl font-bold text-white mb-3">Cari Peluang Investasi</h3>
                <p className="text-gray-400 mb-8 text-base">Temukan kawasan dengan potensi pertumbuhan terbaik.</p>
                <div className="inline-flex items-center gap-2 text-emerald-400 font-bold group-hover:gap-4 transition-all">
                  Lihat Komersial <ArrowRight size={20} />
                </div>
              </Link>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* Floating Action Button */}
      <ScrollToTop />
    </main>
  );
}
