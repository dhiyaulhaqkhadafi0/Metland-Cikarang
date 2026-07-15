import HeroSection from "@/components/organisms/HeroSection";
import SmartPropertyFinder from "@/components/organisms/SmartPropertyFinder";
import ClusterShowcaseCarousel from "@/components/organisms/ClusterShowcaseCarousel";
import InvestmentSimulatorSection from "@/components/organisms/InvestmentSimulatorSection";
import BankPartners from "@/components/organisms/BankPartners";
import FinalCTASection from "@/components/organisms/FinalCTASection";

export const metadata = {
  title: "SMMC Property - Hunian & Investasi Premium",
  description: "Temukan rumah dan peluang investasi terbaik di SMMC Property. Smart Property Platform dengan data terlengkap dan simulasi KPR interaktif.",
};

import Navbar from "@/components/organisms/Navbar";
import Footer from "@/components/organisms/Footer";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-dark-bg">
      <Navbar />
      <HeroSection />
      <SmartPropertyFinder />
      <ClusterShowcaseCarousel />
      <InvestmentSimulatorSection />
      <BankPartners />
      <FinalCTASection />
      <Footer />
    </main>
  );
}
