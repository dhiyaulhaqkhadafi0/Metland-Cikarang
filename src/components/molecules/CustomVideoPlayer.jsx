"use client";

import { useRef, useState, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX, Maximize, Settings2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function CustomVideoPlayer({ src, title }) {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [volume, setVolume] = useState(0); // 0 because muted initially
  const [showControls, setShowControls] = useState(true);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  let hideControlsTimeout = null;

  const togglePlay = (e) => {
    e.stopPropagation();
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleTimeUpdate = () => {
    const p = (videoRef.current.currentTime / videoRef.current.duration) * 100;
    setProgress(p);
  };

  const handleProgressClick = (e) => {
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    videoRef.current.currentTime = percentage * videoRef.current.duration;
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    if (isMuted) {
      videoRef.current.muted = false;
      videoRef.current.volume = 1;
      setVolume(1);
      setIsMuted(false);
    } else {
      videoRef.current.muted = true;
      videoRef.current.volume = 0;
      setVolume(0);
      setIsMuted(true);
    }
  };

  const handleVolumeChange = (e) => {
    e.stopPropagation();
    const val = parseFloat(e.target.value);
    videoRef.current.volume = val;
    setVolume(val);
    if (val === 0) {
      setIsMuted(true);
      videoRef.current.muted = true;
    } else {
      setIsMuted(false);
      videoRef.current.muted = false;
    }
  };

  const changeSpeed = (rate, e) => {
    e.stopPropagation();
    videoRef.current.playbackRate = rate;
    setPlaybackRate(rate);
    setShowSpeedMenu(false);
  };

  const toggleFullscreen = (e) => {
    e.stopPropagation();
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const handleMouseMove = () => {
    setShowControls(true);
    clearTimeout(hideControlsTimeout);
    if (isPlaying) {
      hideControlsTimeout = setTimeout(() => setShowControls(false), 2500);
    }
  };

  const handleMouseLeave = () => {
    if (isPlaying) setShowControls(false);
    setShowSpeedMenu(false);
  };

  return (
    <div 
      ref={containerRef}
      className={`relative w-full h-full bg-black group overflow-hidden ${isFullscreen ? 'flex items-center justify-center' : 'rounded-3xl'}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={togglePlay}
    >
      <video
        ref={videoRef}
        src={src}
        className={`w-full h-full ${isFullscreen ? 'object-contain' : 'object-cover'}`}
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => setIsPlaying(false)}
        playsInline
        muted={isMuted} // Muted by default to allow some browsers to autoplay or to prevent sudden loud noises
      />

      {/* Central Play/Pause Big Button */}
      <AnimatePresence>
        {!isPlaying && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            <div className="w-20 h-20 bg-black/40 backdrop-blur-md rounded-full border border-white/20 flex items-center justify-center text-white shadow-2xl">
              <Play size={40} className="ml-2" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Gradient Overlay for Controls */}
      <div className={`absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/90 to-transparent transition-opacity duration-300 pointer-events-none ${showControls ? 'opacity-100' : 'opacity-0'}`} />

      {/* Title (Only in Fullscreen) */}
      {isFullscreen && showControls && (
        <div className="absolute top-0 left-0 right-0 p-6 bg-gradient-to-b from-black/80 to-transparent">
          <h3 className="text-white font-medium text-lg truncate">{title}</h3>
        </div>
      )}

      {/* Controls Container */}
      <div 
        className={`absolute bottom-0 left-0 right-0 p-4 transition-transform duration-300 ${showControls ? 'translate-y-0' : 'translate-y-full'}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Progress Bar */}
        <div 
          className="w-full h-1.5 bg-white/20 rounded-full mb-4 cursor-pointer relative overflow-hidden group/progress"
          onClick={handleProgressClick}
        >
          <div 
            className="absolute top-0 left-0 h-full bg-emerald-500 rounded-full"
            style={{ width: `${progress}%` }}
          />
          {/* Hover effect on progress */}
          <div className="absolute top-0 left-0 h-full bg-white/30 rounded-full w-full opacity-0 group-hover/progress:opacity-100 transition-opacity" />
        </div>

        {/* Buttons Row */}
        <div className="flex items-center justify-between">
          
          {/* Left Controls */}
          <div className="flex items-center gap-4 text-white">
            <button onClick={togglePlay} className="hover:text-emerald-400 transition-colors">
              {isPlaying ? <Pause size={24} /> : <Play size={24} />}
            </button>
            
            <div className="flex items-center gap-2 group/vol">
              <button onClick={toggleMute} className="hover:text-emerald-400 transition-colors">
                {isMuted || volume === 0 ? <VolumeX size={20} /> : <Volume2 size={20} />}
              </button>
              <input 
                type="range" 
                min="0" max="1" step="0.05"
                value={volume}
                onChange={handleVolumeChange}
                className="w-0 opacity-0 group-hover/vol:w-20 group-hover/vol:opacity-100 transition-all duration-300 accent-emerald-500 cursor-pointer"
              />
            </div>
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-4 text-white relative">
            
            {/* Speed Control */}
            <div className="relative">
              <button 
                onClick={(e) => { e.stopPropagation(); setShowSpeedMenu(!showSpeedMenu); }}
                className="flex items-center gap-1 hover:text-emerald-400 transition-colors text-sm font-medium"
              >
                <Settings2 size={18} />
                <span>{playbackRate}x</span>
              </button>
              
              <AnimatePresence>
                {showSpeedMenu && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute bottom-full right-0 mb-2 bg-black/90 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden flex flex-col"
                  >
                    {[0.5, 0.75, 1, 1.25, 1.5, 2].map(rate => (
                      <button 
                        key={rate}
                        onClick={(e) => changeSpeed(rate, e)}
                        className={`px-6 py-2 text-sm text-left hover:bg-white/10 transition-colors ${playbackRate === rate ? 'text-emerald-400 bg-white/5' : 'text-gray-300'}`}
                      >
                        {rate}x {rate === 1 && '(Normal)'}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button onClick={toggleFullscreen} className="hover:text-emerald-400 transition-colors">
              <Maximize size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
