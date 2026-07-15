'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function AuthLayout({ children, title, subtitle, imageSrc, imageAlt }) {
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])

  const finalImage = imageSrc === "/images/brassia-hero.jpg" || imageSrc === "/images/weston-hero.jpg" 
    ? "/brassia-garden-new.jpeg" 
    : imageSrc

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden font-sans bg-slate-900">
      
      {/* Full-screen Background Image with Parallax & Gradients */}
      <motion.div 
        className="absolute inset-0 z-0"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 20, ease: "easeOut" }}
      >
        <Image
          src={finalImage} 
          alt={imageAlt || "Metland Cikarang"}
          fill
          className="object-cover"
          priority
        />
        {/* Stronger overlay for contrast */}
        <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px] z-10" />
        <div className="absolute inset-0 bg-gradient-to-tr from-emerald-900/40 via-slate-900/50 to-slate-900/80 z-10" />
      </motion.div>

      {/* Animated Particles (Client Side Only to prevent hydration error) */}
      {mounted && (
        <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
          {[...Array(25)].map((_, i) => {
            // Deterministic random-like values based on index to prevent layout shifts
            const size = (i % 3) + 1.5;
            return (
              <motion.div
                key={i}
                className="absolute bg-white rounded-full"
                style={{ width: size, height: size }}
                initial={{
                  x: Math.random() * window.innerWidth,
                  y: Math.random() * window.innerHeight,
                  opacity: Math.random() * 0.4 + 0.1,
                }}
                animate={{
                  y: [null, Math.random() * -300 - 100],
                  x: [null, (Math.random() - 0.5) * 100],
                  opacity: [null, 0],
                }}
                transition={{
                  duration: Math.random() * 8 + 7,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            )
          })}
        </div>
      )}

      {/* Center Content Container */}
      <div className="relative z-20 flex flex-col items-center justify-center w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Giant Logo & Typography */}
        <motion.div 
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.8, type: "spring" }}
          className="mb-10 text-center"
        >
          <Link href="/" className="inline-block group">
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-emerald-400 to-teal-200 drop-shadow-[0_0_25px_rgba(52,211,153,0.3)] hover:scale-105 transition-transform duration-500">
              Metland.
            </h1>
          </Link>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-6 flex flex-wrap justify-center items-center gap-4 md:gap-8 text-sm md:text-base font-medium text-emerald-50 bg-white/5 backdrop-blur-md rounded-full px-6 py-2 border border-white/10 shadow-2xl"
          >
            <span className="flex items-center gap-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 border border-white/50"></span>
              </span>
              Live System
            </span>
            <div className="w-1.5 h-1.5 rounded-full bg-white/30 hidden md:block"></div>
            <span className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.8)] border border-white/50"></div>
              Centralized
            </span>
          </motion.div>
        </motion.div>

        <div className="flex flex-col lg:flex-row items-stretch justify-center w-full gap-8 lg:gap-16 mt-4">
          
          {/* Welcome Text Section (Left on Desktop) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="flex-1 max-w-xl text-center lg:text-left flex flex-col justify-center"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight tracking-tight drop-shadow-lg">
              {title}
            </h2>
            <p className="text-lg md:text-xl text-slate-200 leading-relaxed font-light opacity-90 drop-shadow-md">
              {subtitle}
            </p>
          </motion.div>

          {/* Form Card (Right on Desktop) */}
          <motion.div 
            className="w-full max-w-md mx-auto"
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4, type: "spring", stiffness: 90 }}
          >
            {/* Glassmorphism Card */}
            <div className="bg-slate-900/60 backdrop-blur-2xl rounded-[2.5rem] p-8 sm:p-10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] border border-white/20 relative overflow-hidden group hover:shadow-[0_20px_60px_-15px_rgba(16,185,129,0.3)] transition-all duration-500">
              
              {/* Subtle top glare effect */}
              <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/10 to-transparent pointer-events-none rounded-t-[2.5rem]"></div>
              
              <div className="relative z-10" suppressHydrationWarning>
                {children}
              </div>
            </div>
          </motion.div>

        </div>
      </div>
      
    </div>
  )
}
