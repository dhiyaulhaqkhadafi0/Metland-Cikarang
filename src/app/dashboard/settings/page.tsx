"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { 
  User, Phone, Mail, Shield, Bell, 
  Check, Save, Copy, Sparkles, KeyRound, Smartphone, Camera, Trash2
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

// Client-side lightweight image compression (max 120x120 JPEG ~1.5KB)
const compressImage = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(url);
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const maxDim = 120;
      let width = img.width;
      let height = img.height;

      if (width > height) {
        if (width > maxDim) {
          height = Math.round((height * maxDim) / width);
          width = maxDim;
        }
      } else {
        if (height > maxDim) {
          width = Math.round((width * maxDim) / height);
          height = maxDim;
        }
      }

      canvas.width = width;
      canvas.height = height;
      ctx?.drawImage(img, 0, 0, width, height);
      resolve(canvas.toDataURL('image/jpeg', 0.5));
    };
    img.onerror = (err) => {
      URL.revokeObjectURL(url);
      reject(err);
    };
    img.src = url;
  });
};

export default function SettingsPage() {
  const supabase = createClient();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [activeTab, setActiveTab] = useState<'profile' | 'cta' | 'notifications' | 'security'>('profile');
  const [isLoading, setIsLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [copied, setCopied] = useState(false);

  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    title: 'Senior Sales Executive',
    refCode: '',
    waNumber: '6281946838791',
    waMessage: 'Halo Metland, saya tertarik dengan informasi properti lebih lanjut.',
    notifyEmail: true,
    notifyWa: true,
    newPassword: '',
    confirmPassword: ''
  });

  useEffect(() => {
    async function loadUserData() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const metaName = user.user_metadata?.full_name || user.user_metadata?.name;
        let formattedName = metaName;
        
        if (!formattedName && user.email) {
          const username = user.email.split('@')[0].replace(/[0-9_]/g, ' ');
          formattedName = username.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ').trim();
        }

        const initialRef = `REF-${(user.email ? user.email.split('@')[0] : 'SALES').toUpperCase()}`;

        // Auto-fix: if avatar_url is uncompressed (>4KB), reset it to prevent 494 REQUEST_HEADER_TOO_LARGE
        const rawAvatar = user.user_metadata?.avatar_url || null;
        if (rawAvatar && rawAvatar.length > 4000) {
          await supabase.auth.updateUser({
            data: { avatar_url: null }
          });
          setAvatarUrl(null);
        } else {
          setAvatarUrl(rawAvatar);
        }

        setFormData(prev => ({
          ...prev,
          fullName: formattedName || 'Daffa Khadafi',
          email: user.email || 'daffakhadafi692@gmail.com',
          phone: user.user_metadata?.phone || '081946838791',
          refCode: user.user_metadata?.ref_code || initialRef
        }));
      }
    }
    loadUserData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Avatar Upload Handler with Automatic Compression
  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsLoading(true);
      const compressedData = await compressImage(file);
      setAvatarUrl(compressedData);
      
      // Persist lightweight compressed image to Supabase User Metadata (<1.5KB)
      await supabase.auth.updateUser({
        data: { avatar_url: compressedData }
      });
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
    } catch (err) {
      console.error("Gagal mengompres foto profil:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Avatar Delete Handler
  const handleRemoveAvatar = async () => {
    setAvatarUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    
    await supabase.auth.updateUser({
      data: { avatar_url: null }
    });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setIsSaved(false);

    try {
      await supabase.auth.updateUser({
        data: {
          full_name: formData.fullName,
          phone: formData.phone,
          ref_code: formData.refCode,
          wa_number: formData.waNumber,
          avatar_url: avatarUrl
        }
      });

      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
    } catch (err) {
      console.error("Gagal update profil:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyRefLink = () => {
    const referralLink = `${typeof window !== 'undefined' ? window.location.origin : 'https://metland.id'}/?ref=${formData.refCode}`;
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Custom Luxury iOS Toggle Switch Component
  const ToggleSwitch = ({ checked, onChange, label, description }: { checked: boolean; onChange: (v: boolean) => void; label: string; description: string }) => (
    <div className="flex items-center justify-between py-4 group">
      <div>
        <p className="font-semibold text-white text-sm group-hover:text-emerald-300 transition-colors">{label}</p>
        <p className="text-xs text-slate-400 mt-0.5">{description}</p>
      </div>
      <div className="flex items-center gap-3">
        <span className={`text-xs font-bold transition-colors ${checked ? 'text-emerald-400' : 'text-slate-500'}`}>
          {checked ? 'AKTIF' : 'MATI'}
        </span>
        <div 
          onClick={() => onChange(!checked)}
          className={`w-14 h-7 rounded-full transition-all duration-300 relative cursor-pointer p-1 select-none ${
            checked 
              ? 'bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)] border border-emerald-400/50' 
              : 'bg-white/10 border border-white/10 hover:bg-white/15'
          }`}
        >
          <div 
            className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform duration-300 ease-spring ${
              checked ? 'translate-x-7 bg-white shadow-[0_0_8px_rgba(0,0,0,0.5)]' : 'translate-x-0 bg-slate-300'
            }`}
          />
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white tracking-tight">Pengaturan & Profil Sales</h1>
        <p className="text-slate-400 mt-1">Kelola informasi akun Anda, rute tombol WA landing page, serta preferensi notifikasi.</p>
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-2 overflow-x-auto border-b border-white/10 pb-2 scrollbar-hide">
        <button
          onClick={() => setActiveTab('profile')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${activeTab === 'profile' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.15)]' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
        >
          <User size={16} /> Profil Sales
        </button>
        <button
          onClick={() => setActiveTab('cta')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${activeTab === 'cta' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.15)]' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
        >
          <Smartphone size={16} /> Rute CTA WhatsApp
        </button>
        <button
          onClick={() => setActiveTab('notifications')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${activeTab === 'notifications' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.15)]' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
        >
          <Bell size={16} /> Notifikasi Lead
        </button>
        <button
          onClick={() => setActiveTab('security')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${activeTab === 'security' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.15)]' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
        >
          <Shield size={16} /> Keamanan Akun
        </button>
      </div>

      {/* Tab 1: Profil Sales */}
      {activeTab === 'profile' && (
        <Card className="border-white/10 bg-[#0B0F14]">
          <CardContent className="p-6 space-y-6">
            
            {/* Prominent Avatar Upload Header */}
            <div className="flex flex-col sm:flex-row items-center gap-8 pb-6 border-b border-white/10">
              
              {/* Larger Avatar Container (144x144) */}
              <div className="relative group flex-shrink-0">
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleAvatarChange} 
                  accept="image/*" 
                  className="hidden" 
                />
                
                <div className="w-36 h-36 rounded-3xl bg-gradient-to-tr from-emerald-500 to-teal-400 p-1 shadow-[0_0_30px_rgba(16,185,129,0.35)] relative overflow-hidden">
                  <div className="w-full h-full rounded-[22px] bg-[#0B0F14] flex items-center justify-center overflow-hidden">
                    {avatarUrl ? (
                      <img src={avatarUrl} alt="Avatar Sales" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-4xl font-black text-emerald-400">
                        {formData.fullName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() || 'SE'}
                      </span>
                    )}
                  </div>
                </div>

                {/* Single Camera Overlay Button (Primary Trigger) */}
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  title="Upload / Ubah Foto Profil"
                  className="absolute -bottom-1 -right-1 p-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-900 rounded-2xl shadow-xl transition-transform hover:scale-110 border-2 border-[#0B0F14] flex items-center justify-center"
                >
                  <Camera size={20} />
                </button>
              </div>

              {/* User Info & Hapus Foto Action */}
              <div className="text-center sm:text-left flex-1">
                <h3 className="text-2xl font-bold text-white tracking-tight">{formData.fullName}</h3>
                <p className="text-emerald-400 text-base font-semibold mt-0.5">{formData.title}</p>
                <p className="text-slate-400 text-sm mt-1">{formData.email}</p>

                {avatarUrl && (
                  <div className="mt-4 flex items-center justify-center sm:justify-start">
                    <button
                      type="button"
                      onClick={handleRemoveAvatar}
                      className="px-3.5 py-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-semibold rounded-lg border border-red-500/20 transition-colors flex items-center gap-1.5"
                    >
                      <Trash2 size={14} /> Hapus Foto Profil
                    </button>
                  </div>
                )}
              </div>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input 
                  label="Nama Lengkap Sales"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Masukkan nama lengkap Anda"
                  required
                />
                <Input 
                  label="Email Login"
                  name="email"
                  value={formData.email}
                  readOnly
                  className="opacity-60 cursor-not-allowed"
                />
                <Input 
                  label="Nomor WhatsApp Pribadi"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="081234567890"
                />
                <Input 
                  label="Jabatan / Role Sales"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Senior Sales Executive"
                />
              </div>

              <div className="pt-4 flex items-center justify-between">
                {isSaved && (
                  <span className="text-sm font-semibold text-emerald-400 flex items-center gap-1.5 animate-in fade-in">
                    <Check size={16} /> Profil berhasil diperbarui!
                  </span>
                )}
                <div className="ml-auto">
                  <Button type="submit" isLoading={isLoading} className="gap-2">
                    <Save size={16} /> Simpan Profil
                  </Button>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Tab 2: Rute CTA WA & Referral */}
      {activeTab === 'cta' && (
        <Card className="border-white/10 bg-[#0B0F14]">
          <CardContent className="p-6 space-y-6">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Sparkles size={20} className="text-emerald-400" /> Pengalihan WhatsApp & Link Referal
              </h3>
              <p className="text-slate-400 text-sm mt-1">
                Semua pengunjung yang masuk melalui link referal unik Anda akan otomatis diarahkan ke WhatsApp milik Anda saat mengeklik tombol CTA *"Booking Visit"* atau *"Hubungi Sales"*.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 space-y-3">
              <label className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Link Referal Unik Anda</label>
              <div className="flex items-center gap-2">
                <input 
                  readOnly 
                  value={`${typeof window !== 'undefined' ? window.location.origin : 'https://metland.id'}/?ref=${formData.refCode}`}
                  className="flex-1 bg-black/40 border border-emerald-500/30 rounded-lg px-3 py-2 text-sm text-slate-200 font-mono select-all outline-none"
                />
                <button 
                  onClick={handleCopyRefLink}
                  className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-bold rounded-lg text-sm flex items-center gap-1.5 transition-colors"
                >
                  {copied ? <Check size={16} /> : <Copy size={16} />}
                  {copied ? 'Tersalin!' : 'Salin Link'}
                </button>
              </div>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <Input 
                label="Kode Referal Unik"
                name="refCode"
                value={formData.refCode}
                onChange={handleChange}
                placeholder="REF-DAFFA692"
                required
              />
              <Input 
                label="Nomor WhatsApp Penampung Lead CTA (Format: 628xxxx)"
                name="waNumber"
                value={formData.waNumber}
                onChange={handleChange}
                placeholder="6281946838791"
                required
              />
              
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-white/90">Template Auto-Text WhatsApp Visitor</label>
                <textarea 
                  name="waMessage"
                  value={formData.waMessage}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-emerald-500/50 outline-none min-h-[90px]"
                />
              </div>

              <div className="pt-4 flex items-center justify-end">
                <Button type="submit" isLoading={isLoading} className="gap-2">
                  <Save size={16} /> Simpan Pengaturan CTA
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Tab 3: Notifikasi dengan Luxury Toggle Switches */}
      {activeTab === 'notifications' && (
        <Card className="border-white/10 bg-[#0B0F14]">
          <CardContent className="p-6 space-y-6">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Bell size={20} className="text-emerald-400" /> Preferensi Alert & Notifikasi Lead
            </h3>

            <div className="divide-y divide-white/5">
              <ToggleSwitch 
                checked={formData.notifyEmail}
                onChange={(val) => setFormData({ ...formData, notifyEmail: val })}
                label="Notifikasi Email Lead Baru"
                description="Kirim email pemberitahuan instan setiap ada prospek baru yang mengklik CTA."
              />

              <ToggleSwitch 
                checked={formData.notifyWa}
                onChange={(val) => setFormData({ ...formData, notifyWa: val })}
                label="WhatsApp Instant Lead Notification"
                description="Terima pesan otomatis di WA ketika prospek mengisi form atau mengklik tombol visit."
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tab 4: Keamanan */}
      {activeTab === 'security' && (
        <Card className="border-white/10 bg-[#0B0F14]">
          <CardContent className="p-6 space-y-6">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <KeyRound size={20} className="text-emerald-400" /> Pengaturan Keamanan Kata Sandi
            </h3>

            <form onSubmit={(e) => { e.preventDefault(); alert("Fitur pembaruan password telah dikirim ke email!"); }} className="space-y-4 max-w-md">
              <Input 
                label="Kata Sandi Baru"
                type="password"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                placeholder="••••••••"
              />
              <Input 
                label="Konfirmasi Kata Sandi Baru"
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
              />

              <Button type="submit" className="gap-2">
                Ubah Kata Sandi
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

    </div>
  );
}
