'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { ArrowLeft, Save } from 'lucide-react'

export default function NewLeadPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    project: 'brassia_garden',
    source: 'other',
    budgetRange: '',
    notes: ''
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Nanti disini insert ke database Supabase
    setTimeout(() => {
      setIsSubmitting(false)
      router.push('/dashboard/leads')
    }, 1000)
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Back Button & Header */}
      <div className="flex items-center gap-4">
        <button onClick={() => router.back()} className="p-2 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 text-slate-300 transition-colors">
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-white">Tambah Lead Baru</h1>
          <p className="text-slate-400 text-sm mt-0.5">Masukkan data prospek yang didapat ke dalam sistem.</p>
        </div>
      </div>

      <Card>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            
            {/* Section 1: Info Kontak */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs border border-emerald-500/20">1</span>
                Informasi Kontak
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input 
                  label="Nama Lengkap *"
                  name="fullName"
                  placeholder="Contoh: Budi Santoso"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
                <Input 
                  label="Nomor WhatsApp *"
                  name="phone"
                  placeholder="Contoh: 081234567890"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
                <div className="md:col-span-2">
                  <Input 
                    label="Email (Opsional)"
                    name="email"
                    type="email"
                    placeholder="Contoh: budi@email.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <div className="w-full h-px bg-white/5 my-2"></div>

            {/* Section 2: Info Project */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs border border-emerald-500/20">2</span>
                Informasi Prospek
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5 w-full">
                  <label className="text-sm font-medium text-white/90">Project Diminati *</label>
                  <select 
                    name="project"
                    value={formData.project}
                    onChange={handleChange}
                    className="flex h-11 w-full rounded-xl border border-white/20 bg-white/10 backdrop-blur-md px-3 py-2 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:border-emerald-500 transition-all appearance-none"
                    required
                  >
                    <option value="brassia_garden" className="bg-[#0B0F14]">Brassia Garden (Residensial)</option>
                    <option value="weston_gateway" className="bg-[#0B0F14]">Weston Gateway (Komersial)</option>
                  </select>
                </div>
                <div className="space-y-1.5 w-full">
                  <label className="text-sm font-medium text-white/90">Sumber Lead *</label>
                  <select 
                    name="source"
                    value={formData.source}
                    onChange={handleChange}
                    className="flex h-11 w-full rounded-xl border border-white/20 bg-white/10 backdrop-blur-md px-3 py-2 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:border-emerald-500 transition-all appearance-none"
                    required
                  >
                    <option value="organic" className="bg-[#0B0F14]">Organik (Website)</option>
                    <option value="instagram" className="bg-[#0B0F14]">Instagram Ads</option>
                    <option value="tiktok" className="bg-[#0B0F14]">TikTok</option>
                    <option value="facebook_ads" className="bg-[#0B0F14]">Facebook Ads</option>
                    <option value="walk_in" className="bg-[#0B0F14]">Walk-In / Kunjungan</option>
                    <option value="referral" className="bg-[#0B0F14]">Referral / Referensi</option>
                    <option value="other" className="bg-[#0B0F14]">Lainnya</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <Input 
                    label="Estimasi Budget (Opsional)"
                    name="budgetRange"
                    placeholder="Contoh: 800 Juta - 1 Miliar"
                    value={formData.budgetRange}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <div className="w-full h-px bg-white/5 my-2"></div>

            {/* Section 3: Catatan */}
            <div>
              <div className="space-y-1.5 w-full">
                <label className="text-sm font-medium text-white/90">Catatan Awal (Opsional)</label>
                <textarea 
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="Tambahkan catatan khusus mengenai prospek ini..."
                  className="flex min-h-[100px] w-full rounded-xl border border-white/20 bg-white/10 backdrop-blur-md px-3 py-3 text-sm text-white placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:border-emerald-500 transition-all resize-y"
                />
              </div>
            </div>

          </CardContent>
          
          <div className="px-6 py-4 border-t border-white/5 bg-white/[0.02] flex justify-end gap-3 rounded-b-2xl">
            <button 
              type="button"
              onClick={() => router.back()}
              className="px-5 py-2.5 rounded-xl text-sm font-medium text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
            >
              Batal
            </button>
            <button 
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-900 shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <span className="w-5 h-5 border-2 border-slate-900/30 border-t-slate-900 rounded-full animate-spin"></span>
              ) : (
                <>
                  <Save size={18} />
                  Simpan Lead
                </>
              )}
            </button>
          </div>
        </form>
      </Card>
    </div>
  )
}
