"use client";
import { useState, useRef, useEffect } from "react";
import { GripVertical } from "lucide-react";

export default function BeforeAfterSlider({ beforeImage, afterImage, beforeLabel = "Desain", afterLabel = "Realita" }) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const handleMove = (clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    const handleMouseMove = (e) => {
      if(isDragging) handleMove(e.clientX);
    };
    
    if (isDragging) {
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("mousemove", handleMouseMove);
    }
    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isDragging]);

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-full overflow-hidden select-none cursor-ew-resize group"
      onMouseDown={(e) => { setIsDragging(true); handleMove(e.clientX); }}
    >
      <img src={afterImage} alt="After" className="absolute inset-0 w-full h-full object-cover pointer-events-none" />
      <div className="absolute top-6 right-6 px-4 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-white text-sm font-semibold border border-white/20">
        {afterLabel}
      </div>

      <img 
        src={beforeImage} 
        alt="Before" 
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      />
      <div className="absolute top-6 left-6 px-4 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-white text-sm font-semibold border border-white/20 z-10" style={{ opacity: sliderPosition > 10 ? 1 : 0 }}>
        {beforeLabel}
      </div>

      <div 
        className="absolute top-0 bottom-0 z-20 w-1 bg-white shadow-[0_0_15px_rgba(0,0,0,0.8)]"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-2xl text-dark-bg transition-transform group-hover:scale-110">
          <GripVertical size={24} />
        </div>
      </div>
    </div>
  );
}
