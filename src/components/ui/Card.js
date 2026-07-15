import React from 'react'

export function Card({ children, className = '', glow = false }) {
  return (
    <div className={`
      bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden
      ${glow ? 'shadow-[0_0_30px_-5px_rgba(16,185,129,0.15)]' : 'shadow-xl shadow-black/20'}
      ${className}
    `}>
      {children}
    </div>
  )
}

export function CardHeader({ children, className = '' }) {
  return (
    <div className={`px-6 py-5 border-b border-white/5 ${className}`}>
      {children}
    </div>
  )
}

export function CardContent({ children, className = '', noPadding = false }) {
  return (
    <div className={`${noPadding ? '' : 'p-6'} ${className}`}>
      {children}
    </div>
  )
}
