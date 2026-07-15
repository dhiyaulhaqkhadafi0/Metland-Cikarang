'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import AuthLayout from '@/components/auth/AuthLayout'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { createClient } from '@/lib/supabase/client'

export default function LoginPage() {
  const router = useRouter()
  const supabase = createClient()
  
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      })

      if (error) throw error
      
      router.push('/dashboard')
    } catch (err) {
      setError('Email atau password salah. Silakan coba lagi.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`
        }
      })
      if (error) throw error
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <AuthLayout 
      title="Selamat Datang Kembali" 
      subtitle="Akses portal Anda untuk mengelola kinerja dan memantau pertumbuhan bisnis Metland Cikarang."
      imageSrc="/images/weston-hero.jpg"
      reversed={false} // Visual on the left side
    >
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white">Masuk ke Portal</h2>
        <p className="text-emerald-50 mt-2 opacity-90">Masukkan email dan password Anda.</p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm flex items-start gap-3">
          <svg className="w-5 h-5 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleLogin} className="space-y-5">
        <Input 
          label="Email" 
          name="email"
          type="email" 
          placeholder="budi@example.com" 
          required 
          value={formData.email}
          onChange={handleChange}
        />
        
        <div>
          <Input 
            label="Password" 
            name="password"
            type="password" 
            placeholder="••••••••" 
            required 
            value={formData.password}
            onChange={handleChange}
          />
          <div className="flex justify-end mt-1">
            <Link href="/forgot-password" className="text-xs font-medium text-emerald-400 hover:text-emerald-300">
              Lupa password?
            </Link>
          </div>
        </div>

        <Button type="submit" className="w-full mt-2" isLoading={isLoading}>
          Masuk
        </Button>
      </form>

      <div className="mt-8 mb-6 relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-white/20"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-transparent text-slate-300">Atau masuk dengan</span>
        </div>
      </div>

      <Button 
        type="button" 
        variant="outline" 
        className="w-full bg-white/10 hover:bg-white/20 border-white/20 text-white"
        onClick={handleGoogleSignIn}
      >
        <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
        </svg>
        Google
      </Button>

      <p className="mt-8 text-center text-sm text-slate-300">
        Belum punya akun?{' '}
        <Link href="/register" className="font-semibold text-emerald-400 hover:text-emerald-300 hover:underline">
          Daftar sekarang
        </Link>
      </p>
    </AuthLayout>
  )
}
