import React, { forwardRef, useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'

export const Input = forwardRef(({ className = '', label, error, type = 'text', ...props }, ref) => {
  const [showPassword, setShowPassword] = useState(false)
  const isPassword = type === 'password'
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type

  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label className="text-sm font-medium text-white/90">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          ref={ref}
          type={inputType}
          className={`
            flex h-11 w-full rounded-xl border border-white/20 bg-white/10 backdrop-blur-md px-3 py-2 text-sm text-white
            ring-offset-slate-900 file:border-0 file:bg-transparent file:text-sm file:font-medium 
            placeholder:text-slate-400 
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:border-emerald-500
            disabled:cursor-not-allowed disabled:opacity-50
            transition-all duration-200
            ${error ? 'border-red-500 focus-visible:ring-red-500' : ''}
            ${isPassword ? 'pr-10' : ''}
            ${className}
          `}
          suppressHydrationWarning
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors p-1"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
      {error && (
        <span className="text-xs text-red-500 mt-1">{error}</span>
      )}
    </div>
  )
})
Input.displayName = 'Input'
