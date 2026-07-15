"use client";

import Link from "next/link";
import SMMCLogo from "@/components/atoms/SMMCLogo";
import { MapPin, Mail, Phone } from "lucide-react";

const TiktokIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path>
  </svg>
);

const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const YoutubeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path>
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
  </svg>
);

export default function Footer() {
  return (
    <footer className="bg-[#03050a] border-t border-border pt-20 pb-10">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand & Intro */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center space-x-2 mb-6 cursor-pointer">
              <SMMCLogo className="w-48 h-auto" />
            </Link>
            <p className="text-gray-text text-sm leading-relaxed mb-6">
              New Urban City Hub di koridor timur Jakarta. Menggabungkan konsep hunian asri dengan pusat komersial premium yang strategis.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/khdfii9/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-dark-card border border-border flex items-center justify-center text-gray-text hover:text-primary hover:border-primary transition-colors">
                <InstagramIcon />
              </a>
              <a href="https://www.tiktok.com/@khdfii9" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-dark-card border border-border flex items-center justify-center text-gray-text hover:text-primary hover:border-primary transition-colors">
                <TiktokIcon />
              </a>
              <a href="https://www.youtube.com/@khdfii9" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-dark-card border border-border flex items-center justify-center text-gray-text hover:text-primary hover:border-primary transition-colors">
                <YoutubeIcon />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-title font-semibold mb-6">Eksplorasi</h4>
            <ul className="space-y-4">
              <li><Link href="#" className="text-sm text-gray-text hover:text-primary transition-colors">Smart Property Finder</Link></li>
              <li><Link href="#" className="text-sm text-gray-text hover:text-primary transition-colors">Cluster Avesa Garden</Link></li>
              <li><Link href="#" className="text-sm text-gray-text hover:text-primary transition-colors">Cluster Brassia Garden</Link></li>
              <li><Link href="#" className="text-sm text-gray-text hover:text-primary transition-colors">Ruko Easton Gateway</Link></li>
              <li><Link href="#" className="text-sm text-gray-text hover:text-primary transition-colors">Ruko Weston Gateway</Link></li>
            </ul>
          </div>

          {/* Investment */}
          <div>
            <h4 className="text-white font-title font-semibold mb-6">Investasi & Bantuan</h4>
            <ul className="space-y-4">
              <li><Link href="#" className="text-sm text-gray-text hover:text-primary transition-colors">Simulasi KPR</Link></li>
              <li><Link href="#" className="text-sm text-gray-text hover:text-primary transition-colors">Pusat Edukasi (Blog)</Link></li>
              <li><Link href="#" className="text-sm text-gray-text hover:text-primary transition-colors">FAQ</Link></li>
              <li><Link href="#" className="text-sm text-gray-text hover:text-primary transition-colors">Hubungi Sales</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-title font-semibold mb-6">Kantor Pemasaran</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 text-primary mr-3 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-text">Metland Cikarang Boulevard, Sukajaya, Kec. Cibitung, Kab. Bekasi</span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                <span className="text-sm text-gray-text">0819-4683-8791</span>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                <span className="text-sm text-gray-text">sales@metlandcikarang.co.id</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-xs text-gray-text mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Metland Cikarang. Hak Cipta Dilindungi.
          </p>
          <div className="flex space-x-6">
            <Link href="#" className="text-xs text-gray-text hover:text-white transition-colors">Syarat & Ketentuan</Link>
            <Link href="#" className="text-xs text-gray-text hover:text-white transition-colors">Kebijakan Privasi</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
