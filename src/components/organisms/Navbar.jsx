"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Menu, X, User } from "lucide-react";
import Link from "next/link";
import SMMCLogo from "@/components/atoms/SMMCLogo";

const navLinks = [
  { name: "Discover", href: "/discover" },
  { name: "Explore", href: "/explore" },
  { name: "Gallery", href: "/gallery" },
  { name: "Investment", href: "/investment" },
  { name: "KPR", href: "/kpr" },
  { name: "SMI", href: "/smi" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const { scrollY } = useScroll();
  const navBackground = useTransform(
    scrollY,
    [0, 50],
    ["rgba(6, 9, 19, 0)", "rgba(6, 9, 19, 0.8)"]
  );
  
  const navBorder = useTransform(
    scrollY,
    [0, 50],
    ["rgba(197, 168, 128, 0)", "rgba(197, 168, 128, 0.1)"]
  );

  useEffect(() => {
    const updateScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", updateScroll);
    return () => window.removeEventListener("scroll", updateScroll);
  }, []);

  return (
    <motion.header
      style={{ backgroundColor: navBackground, borderBottomColor: navBorder, borderBottomWidth: 1 }}
      className="fixed top-0 left-0 w-full z-50 backdrop-blur-md transition-all duration-300"
    >
      {/* Scroll Progress Bar */}
      <motion.div 
        className="absolute top-0 left-0 h-[3px] bg-gradient-to-r from-primary to-emerald-300 z-50"
        style={{ width: "100%", scaleX: useScroll().scrollYProgress, transformOrigin: "0% 50%" }}
      />
      <div className="container mx-auto px-6 h-20 flex items-center justify-between relative">
        {/* Logo (Absolute to prevent expanding navbar height) */}
        <Link href="/" className="absolute top-1 left-6 z-50 flex items-center group">
          <SMMCLogo className="h-20 md:h-28 w-auto group-hover:scale-105 transition-transform duration-300 drop-shadow-2xl" />
        </Link>
        <div className="w-20 md:w-28" /> {/* Spacer for absolute logo */}

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-gray-text hover:text-secondary transition-colors relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-secondary transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        {/* CTA & User */}
        <div className="hidden md:flex items-center gap-4">
          <button className="flex items-center justify-center w-10 h-10 rounded-full border border-border hover:border-primary text-gray-text hover:text-primary transition-all hover:shadow-emerald-glow">
            <User size={18} />
          </button>
          <button className="px-6 py-2.5 rounded-full bg-gradient-to-r from-primary to-emerald-600 text-white font-medium text-sm shadow-emerald-glow hover:shadow-lg hover:scale-105 transition-all">
            Booking Visit
          </button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-light-text"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden absolute top-20 left-0 w-full bg-dark-card border-b border-border shadow-2xl p-6 flex flex-col gap-4"
        >
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-lg font-medium text-light-text"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <button className="mt-4 w-full px-6 py-3 rounded-xl bg-primary text-white font-medium text-center">
            Booking Visit
          </button>
        </motion.div>
      )}
    </motion.header>
  );
}
