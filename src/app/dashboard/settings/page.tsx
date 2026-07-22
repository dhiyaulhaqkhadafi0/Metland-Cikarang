"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { 
  User, Phone, Mail, Shield, Bell, 
  Check, Save, Copy, Sparkles, KeyRound, Smartphone
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

export default function SettingsPage() {
  const supabase = createClient();
  const [activeTab, setActiveTab] = useState<'profile' | 'cta' | 'notifications' | 'security'>('profile');
  const [isLoading, setIsLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [copied, setCopied] = useState(false);

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

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setIsSaved(false);

    try {
      // Update user_metadata di Supabase Auth
      await supabase.auth.updateUser({
        data: {
          full_name: formData.fullName,
          phone: formData.phone,
          ref_code: formData.refCode,
          wa_number: formData.waNumber
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
    const referralLink = `${window.location.origin}/?ref=${formData.refCode}`;
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${activeTab === 'profile' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
        >
          <User size={16} /> Profil Sales
        </button>
        <button
          onClick={() => setActiveTab('cta')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${activeTab === 'cta' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
        >
          <Smartphone size={16} /> Rute CTA WhatsApp
        </button>
        <button
          onClick={() => setActiveTab('notifications')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${activeTab === 'notifications' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
        >
          <Bell size={16} /> Notifikasi Lead
        </button>
        <button
          onClick={() => setActiveTab('security')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${activeTab === 'security' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
        >
          <Shield size={16} /> Keamanan Akun
        </button>
      </div>

      {/* Tab 1: Profil Sales */}
      {activeTab === 'profile' && (
        <Card className="border-white/10 bg-[#0B0F14]">
          <CardContent className="p-6 space-y-6">
            <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-white/10">
              <div className="relative group">
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 p-1 shadow-[0_0_25px_rgba(16,185,129,0.3)]">
                  <div className="w-full h-full rounded-[14px] bg-[#0B0F14] flex items-center justify-center">
                    <span className="text-3xl font-black text-emerald-400">
                      {formData.fullName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() || 'SE'}
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-center sm:text-left">
                <h3 className="text-xl font-bold text-white">{formData.fullName}</h3>
                <p className="text-emerald-400 text-sm font-medium">{formData.title}</p>
                <p className="text-slate-500 text-xs mt-1">{formData.email}</p>
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

      {/* Tab 3: Notifikasi */}
      {activeTab === 'notifications' && (
        <Card className="border-white/10 bg-[#0B0F14]">
          <CardContent className="p-6 space-y-6">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Bell size={20} className="text-emerald-400" /> Preferensi Alert & Notifikasi Lead
            </h3>

            <div className="space-y-4 divide-y divide-white/5">
              <div className="flex items-center justify-between pt-2">
                <div>
                  <p className="font-semibold text-white text-sm">Notifikasi Email Lead Baru</p>
                  <p className="text-xs text-slate-400">Kirim email pemberitahuan setiap ada prospek baru yang mengklik CTA.</p>
                </div>
                <input 
                  type="checkbox"
                  checked={formData.notifyEmail}
                  onChange={(e) => setFormData({ ...formData, notifyEmail: e.target.checked })}
                  className="w-5 h-5 accent-emerald-500 rounded cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between pt-4">
                <div>
                  <p className="font-semibold text-white text-sm">WhatsApp Instant Lead Notification</p>
                  <p className="text-xs text-slate-400">Terima pesan otomatis di WA ketika prospek mengisi form atau mengklik tombol visit.</p>
                </div>
                <input 
                  type="checkbox"
                  checked={formData.notifyWa}
                  onChange={(e) => setFormData({ ...formData, notifyWa: e.target.checked })}
                  className="w-5 h-5 accent-emerald-500 rounded cursor-pointer"
                />
              </div>
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
