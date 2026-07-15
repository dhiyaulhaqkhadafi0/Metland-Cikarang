import { cn } from "@/lib/utils";

export default function GlassCard({ children, className = "", hoverEffect = true }) {
  return (
    <div
      className={cn(
        "relative rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md p-8 overflow-hidden",
        hoverEffect && "transition-all duration-500 hover:bg-white/10 hover:border-white/20 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/20",
        className
      )}
    >
      {/* Glossy top edge highlight */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent" />
      {children}
    </div>
  );
}
