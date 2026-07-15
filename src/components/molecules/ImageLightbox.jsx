"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn, ZoomOut, Maximize } from "lucide-react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export default function ImageLightbox({ isOpen, onClose, imageSrc, altText }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!mounted) return null;

  const lightboxContent = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[99999] flex items-center justify-center bg-[#050505]/95 backdrop-blur-2xl"
          onClick={onClose}
        >
          {/* Close Button */}
          <div className="absolute top-8 right-8 z-[999999]">
            <button 
              onClick={(e) => { e.stopPropagation(); onClose(); }}
              className="group flex items-center gap-3 px-6 py-3 rounded-full border border-white/20 bg-white/5 hover:bg-white/20 text-white transition-all backdrop-blur-xl shadow-2xl cursor-pointer"
            >
              <span className="text-sm font-semibold tracking-widest uppercase">Tutup</span>
              <X size={20} className="group-hover:rotate-90 transition-transform duration-300" />
            </button>
          </div>

          <div 
            className="w-full h-full p-4 md:p-12 flex items-center justify-center"
            onClick={(e) => e.stopPropagation()} 
          >
            <TransformWrapper
              initialScale={1}
              minScale={0.5}
              maxScale={10} // Allow extreme zoom up to 10x
              centerOnInit
              wheel={{ step: 0.1 }}
              doubleClick={{ mode: "zoomIn" }}
            >
              {({ zoomIn, zoomOut, resetTransform }) => (
                <div className="relative w-full h-full flex flex-col items-center justify-center group">
                  
                  {/* Floating Controls with Clear Text - Moved to Bottom Right Corner */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute bottom-8 right-8 z-[999999] flex flex-col md:flex-row items-center gap-2 md:gap-4 bg-dark-card/90 backdrop-blur-xl px-4 py-3 rounded-2xl md:rounded-full border border-white/20 shadow-[0_30px_60px_rgba(0,0,0,0.8)]"
                  >
                    <button onClick={() => zoomIn()} className="flex items-center gap-2 text-white hover:text-emerald-400 bg-white/5 hover:bg-white/10 px-4 py-2 rounded-full transition-all cursor-pointer">
                      <ZoomIn size={20} />
                      <span className="hidden md:inline text-xs font-semibold uppercase tracking-wider">Zoom In</span>
                    </button>
                    <div className="hidden md:block w-[1px] h-8 bg-white/20" />
                    <button onClick={() => zoomOut()} className="flex items-center gap-2 text-white hover:text-emerald-400 bg-white/5 hover:bg-white/10 px-4 py-2 rounded-full transition-all cursor-pointer">
                      <ZoomOut size={20} />
                      <span className="hidden md:inline text-xs font-semibold uppercase tracking-wider">Zoom Out</span>
                    </button>
                    <div className="hidden md:block w-[1px] h-8 bg-white/20" />
                    <button onClick={() => resetTransform()} className="flex items-center gap-2 text-white hover:text-primary bg-white/5 hover:bg-white/10 px-4 py-2 rounded-full transition-all cursor-pointer">
                      <Maximize size={20} />
                      <span className="hidden md:inline text-xs font-semibold uppercase tracking-wider">Reset</span>
                    </button>
                  </motion.div>
                  
                  {/* Image Component - Raw img for maximum resolution */}
                  <TransformComponent wrapperStyle={{ width: "100%", height: "100%" }} contentStyle={{ width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <img
                      src={imageSrc}
                      alt={altText}
                      className="max-w-full max-h-[85vh] object-contain cursor-grab active:cursor-grabbing drop-shadow-2xl rounded-xl"
                      draggable={false}
                    />
                  </TransformComponent>

                </div>
              )}
            </TransformWrapper>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return createPortal(lightboxContent, document.body);
}
