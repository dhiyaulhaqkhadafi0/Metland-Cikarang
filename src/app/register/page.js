'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import AuthLayout from '@/components/auth/AuthLayout'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { createClient } from '@/lib/supabase/client'
import { motion } from 'framer-motion'

export default function RegisterPage() {
  const router = useRouter()
  const supabase = createClient()
  
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    role: 'sales'
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.fullName,
            role: formData.role
          }
        }
      })

      if (error) throw error
      
      setSuccess(true)
      // Usually need to verify email if Supabase email confirmation is on
      // router.push('/dashboard') 
    } catch (err) {
      setError(err.message)
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

  if (success) {
    return (
      <AuthLayout 
        title="Bergabung bersama Tim Pemenang" 
        subtitle="Akses ribuan lead eksklusif dan mulai closing hari ini juga."
        imageSrc="/images/brassia-hero.jpg"
      >
        <div className="text-center">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Pendaftaran Berhasil!</h2>
          <p className="text-slate-600 mb-8">
            Silakan periksa email Anda ({formData.email}) untuk melakukan verifikasi akun sebelum masuk ke dashboard.
          </p>
          <Link href="/login">
            <Button className="w-full">Kembali ke Halaman Login</Button>
          </Link>
        </div>
      </AuthLayout>
    )
  }

  return (
    <AuthLayout 
      title="Bersama Membangun Masa Depan" 
      subtitle="Bergabunglah bersama kami dan bertumbuh bersama Metland Cikarang untuk mencapai kesuksesan bersama."
      imageSrc="/images/brassia-hero.jpg"
      reversed={true} // Visual on the right side for variety
    >
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white">Daftar Akun Baru</h2>
        <p className="text-emerald-50 mt-2 opacity-90">Mulai kelola prospek Metland Cikarang Anda.</p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleRegister} className="space-y-5">
        <Input 
          label="Nama Lengkap" 
          name="fullName"
          placeholder="Cth: Budi Santoso" 
          required 
          value={formData.fullName}
          onChange={handleChange}
        />
        
        <Input 
          label="Email" 
          name="email"
          type="email" 
          placeholder="budi@example.com" 
          required 
          value={formData.email}
          onChange={handleChange}
        />

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-white/90">Pilih Peran (Role)</label>
          <div className="grid grid-cols-2 gap-4 mt-1">
            <label className={`
              flex items-center justify-center p-3 border rounded-xl cursor-pointer transition-all
              ${formData.role === 'sales' ? 'border-emerald-500 bg-emerald-500/20 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.2)]' : 'border-white/20 bg-white/5 hover:bg-white/10 text-slate-300'}
            `}>
              <input 
                type="radio" 
                name="role" 
                value="sales" 
                className="hidden"
                checked={formData.role === 'sales'}
                onChange={handleChange}
              />
              <span className="font-semibold">Sales</span>
            </label>
            <label className={`
              flex items-center justify-center p-3 border rounded-xl cursor-pointer transition-all
              ${formData.role === 'management' ? 'border-emerald-500 bg-emerald-500/20 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.2)]' : 'border-white/20 bg-white/5 hover:bg-white/10 text-slate-300'}
            `}>
              <input 
                type="radio" 
                name="role" 
                value="management" 
                className="hidden"
                checked={formData.role === 'management'}
                onChange={handleChange}
              />
              <span className="font-semibold">Management</span>
            </label>
          </div>
        </div>
        
        <Input 
          label="Password" 
          name="password"
          type="password" 
          placeholder="Minimal 6 karakter" 
          required 
          minLength={6}
          value={formData.password}
          onChange={handleChange}
        />

        <Button type="submit" className="w-full" isLoading={isLoading}>
          Buat Akun
        </Button>
      </form>

      <div className="mt-8 mb-6 relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-white/20"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-transparent text-slate-300">Atau daftar dengan</span>
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
        Sudah punya akun?{' '}
        <Link href="/login" className="font-semibold text-emerald-400 hover:text-emerald-300 hover:underline">
          Masuk di sini
        </Link>
      </p>
    </AuthLayout>
  )
}
