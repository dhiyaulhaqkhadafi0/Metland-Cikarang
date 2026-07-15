import GalleryHero from "@/components/organisms/GalleryHero";
import GalleryPromo from "@/components/organisms/GalleryPromo";
import GalleryVirtualTour from "@/components/organisms/GalleryVirtualTour";
import GalleryProgress from "@/components/organisms/GalleryProgress";
import GalleryEvents from "@/components/organisms/GalleryEvents";
import GalleryStories from "@/components/organisms/GalleryStories";
import FinalCTASection from "@/components/organisms/FinalCTASection";

export const metadata = {
  title: "Gallery & Experience Center | Metland Cikarang",
  description: "Rasakan pengalaman visual yang imersif melalui gallery, virtual tour, promo eksklusif, dan cerita inspiratif dari penghuni Metland Cikarang.",
};

export default function GalleryPage() {
  return (
    <main className="bg-dark-bg min-h-screen">
      <GalleryHero />
      <GalleryVirtualTour />
      <GalleryPromo />
      <GalleryProgress />
      <GalleryEvents />
      <GalleryStories />
      <FinalCTASection />
    </main>
  );
}
