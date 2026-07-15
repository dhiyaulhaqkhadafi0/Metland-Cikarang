import SmoothScroll from "@/components/atoms/SmoothScroll";
import SchemaMarkup from "@/components/atoms/SchemaMarkup";
import Navbar from "@/components/organisms/Navbar";
import Footer from "@/components/organisms/Footer";
import { Outfit, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["400", "500", "600", "700", "800"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "SMMC Property",
  description: "Official Website SMMC Property - Discover Your Dream Home",
  keywords: ["metland cikarang", "properti cikarang", "ruko cikarang", "rumah bekasi", "kpr dp 0%"],
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" className={`${outfit.variable} ${plusJakartaSans.variable}`} suppressHydrationWarning>
      <head>
        {/* FontAwesome Link */}
        <link 
          rel="stylesheet" 
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" 
          precedence="default"
        />
      </head>
      <body>
        <SchemaMarkup />
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
