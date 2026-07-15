"use client";
import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button when page is scrolled down 500px
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 z-[90] p-4 rounded-full bg-primary text-dark-bg hover:bg-emerald-400 hover:scale-110 transition-all duration-300 shadow-[0_0_30px_rgba(52,211,153,0.5)] group"
      aria-label="Scroll to top"
    >
      <ArrowUp size={24} className="group-hover:-translate-y-1 transition-transform" />
    </button>
  );
}
