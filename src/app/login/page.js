'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Script from 'next/script'
import AuthLayout from '@/components/auth/AuthLayout'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { createClient } from '@/lib/supabase/client'

export default function LoginPage() {
  const router = useRouter()
  const supabase = createClient()
  const nonceRef = useRef('')
  
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const handleGoogleCredentialResponse = async (response) => {
    setIsLoading(true)
    setError(null)
    try {
      const { error } = await supabase.auth.signInWithIdToken({
        provider: 'google',
        token: response.credential,
        nonce: nonceRef.current,
      })
      if (error) throw error
      router.push('/dashboard')
    } catch (err) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    // Generate a secure random nonce for Google OIDC
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let generatedNonce = '';
    for (let i = 0; i < 32; i++) {
      generatedNonce += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    nonceRef.current = generatedNonce;

    const initializeGoogle = () => {
      if (window.google) {
        window.google.accounts.id.initialize({
          client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
          callback: handleGoogleCredentialResponse,
          nonce: nonceRef.current,
          ux_mode: 'popup',
        });
        
        window.google.accounts.id.renderButton(
          document.getElementById('google-signin-btn'),
          {
            theme: 'filled_black',
            size: 'large',
            width: '100%',
            text: 'signin_with',
            shape: 'pill',
          }
        );

        // Memicu Google One Tap (popup di kanan atas layar jika sudah pernah login)
        window.google.accounts.id.prompt();
      }
    }

    if (window.google) {
      initializeGoogle();
    } else {
      window.addEventListener('google-gsi-loaded', initializeGoogle);
    }

    return () => {
      window.removeEventListener('google-gsi-loaded', initializeGoogle);
    };
  }, []);

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

  return (
    <AuthLayout 
      title="Selamat Datang Kembali" 
      subtitle="Akses portal Anda untuk mengelola kinerja dan memantau pertumbuhan bisnis Metland Cikarang."
      imageSrc="/images/weston-hero.jpg"
      reversed={false}
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

      <Script 
        src="https://accounts.google.com/gsi/client" 
        strategy="afterInteractive"
        onLoad={() => {
          if (typeof window !== 'undefined' && window.google) {
            const event = new Event('google-gsi-loaded');
            window.dispatchEvent(event);
          }
        }}
      />

      <div className="w-full flex justify-center">
        <div id="google-signin-btn" className="w-full" style={{ minHeight: '44px' }}></div>
      </div>

      <p className="mt-8 text-center text-sm text-slate-300">
        Belum punya akun?{' '}
        <Link href="/register" className="font-semibold text-emerald-400 hover:text-emerald-300 hover:underline">
          Daftar sekarang
        </Link>
      </p>
    </AuthLayout>
  )
}
