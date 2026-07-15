css_append = """
/* --- ANTI-MAINSTREAM DYNAMIC AURORA & GLASSMORPHISM --- */

.aurora-bg {
  position: absolute;
  top: 0; left: 0; width: 100%; height: 100%;
  overflow: hidden;
  z-index: 1; /* Below the overlay but above the static bg */
  pointer-events: none;
}
.aurora-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(100px);
  opacity: 0.5;
  animation: float-orb 15s infinite alternate ease-in-out;
}
.orb-1 {
  width: 400px; height: 400px;
  background: radial-gradient(circle, rgba(16, 185, 129, 0.6) 0%, transparent 70%);
  top: -100px; left: -100px;
  animation-duration: 18s;
}
.orb-2 {
  width: 500px; height: 500px;
  background: radial-gradient(circle, rgba(197, 168, 128, 0.5) 0%, transparent 70%);
  bottom: -150px; right: -150px;
  animation-duration: 22s;
  animation-direction: alternate-reverse;
}
.orb-3 {
  width: 300px; height: 300px;
  background: radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%);
  top: 30%; left: 50%;
  transform: translateX(-50%);
  animation-duration: 25s;
}

@keyframes float-orb {
  0% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(50px, 30px) scale(1.1); }
  100% { transform: translate(-30px, 50px) scale(0.9); }
}

.glass-container-hero {
  position: relative;
  z-index: 3;
}

.glass-card-content {
  background: rgba(255, 255, 255, 0.02);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.3);
}

.glass-section {
  position: relative;
  background: rgba(3, 7, 18, 0.7) !important;
  backdrop-filter: blur(8px);
}

/* --- BANK INFINITE MARQUEE --- */
.bank-marquee-wrapper {
  overflow: hidden;
  width: 100%;
  padding: 40px 0;
  position: relative;
  /* Fading edges */
  mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
  -webkit-mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
}

.bank-marquee-track {
  display: flex;
  gap: 40px;
  width: max-content;
  animation: marquee-scroll 30s linear infinite;
}

.bank-marquee-track:hover {
  animation-play-state: paused;
}

@keyframes marquee-scroll {
  0% { transform: translateX(0); }
  100% { transform: translateX(calc(-50% - 20px)); } /* -50% because we duplicated the array + half the gap */
}

.bank-logo-glass {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(197, 168, 128, 0.3);
  padding: 15px 30px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 200px;
  height: 100px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2), inset 0 0 10px rgba(197, 168, 128, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.bank-logo-glass:hover {
  transform: translateY(-5px) scale(1.05);
  box-shadow: 0 8px 25px rgba(197, 168, 128, 0.3), inset 0 0 15px rgba(197, 168, 128, 0.2);
}

.bank-img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  /* Add a subtle drop shadow to the logo inside */
  filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));
}
"""

with open("e:/Metland/metland-app/src/app/globals.css", "a", encoding="utf-8") as f:
    f.write("\n" + css_append)

print("Globals.css append completed.")
