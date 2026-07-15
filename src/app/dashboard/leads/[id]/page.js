'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { ArrowLeft, MessageCircle, PhoneCall, CalendarCheck, FileText, CheckCircle2, History } from 'lucide-react'

// Dummy Data
const leadData = {
  id: '1',
  name: 'Bapak Ahmad',
  phone: '6281234567890', // Format 62
  email: 'ahmad.properti@gmail.com',
  project: 'brassia_garden',
  projectName: 'Brassia Garden',
  source: 'Instagram Ads',
  status: 'follow_up',
  budgetRange: '800 Juta - 1 Miliar',
  notes: 'Sedang mencari rumah untuk keluarga kecil, sangat tertarik dengan desain facade Brassia. Ingin view taman.',
  createdAt: '2026-07-12T09:30:00Z',
}

const timelineData = [
  { id: 1, type: 'status_change', title: 'Status diubah ke Follow-up', desc: 'Budi Pratama mengubah status lead dari Kontak ke Follow-up', date: 'Kemarin, 14:20' },
  { id: 2, type: 'whatsapp', title: 'Kirim Brosur via WA', desc: 'Mengirimkan e-brosur Brassia Garden dan pricelist terbaru.', date: 'Kemarin, 10:15' },
  { id: 3, type: 'call', title: 'Telepon Perkenalan', desc: 'Menelepon Bapak Ahmad, beliau sangat tertarik namun masih butuh diskusi dengan istri.', date: '12 Jul 2026, 16:30' },
  { id: 4, type: 'status_change', title: 'Status diubah ke Kontak', desc: 'Budi Pratama mengubah status lead dari Baru ke Kontak', date: '12 Jul 2026, 16:30' },
  { id: 5, type: 'note', title: 'Lead Masuk', desc: 'Prospek masuk dari kampanye Instagram Ads.', date: '12 Jul 2026, 09:30' },
]

export default function LeadDetailPage({ params }) {
  const router = useRouter()
  const [currentStatus, setCurrentStatus] = useState(leadData.status)
  
  // State untuk form tambah aktivitas
  const [activityType, setActivityType] = useState('whatsapp')
  const [activityNote, setActivityNote] = useState('')

  // Generate WhatsApp Link pintar
  const generateWALink = () => {
    let message = ''
    if (leadData.project === 'brassia_garden') {
      message = `Halo Bapak/Ibu ${leadData.name}, perkenalkan saya Budi dari Metland Cikarang. Terima kasih atas ketertarikan Anda pada klaster *Brassia Garden*. Apakah ada waktu luang hari ini untuk berdiskusi terkait promo terbarunya?`
    } else {
      message = `Halo Bapak/Ibu ${leadData.name}, saya Budi dari Metland Cikarang. Terkait ketertarikan Anda pada kawasan komersial *Weston Gateway*, saya ingin menginformasikan promo investasi menarik. Kapan sekiranya saya bisa menelepon Anda?`
    }
    const encodedMessage = encodeURIComponent(message)
    return `https://wa.me/${leadData.phone}?text=${encodedMessage}`
  }

  const handleSaveActivity = (e) => {
    e.preventDefault()
    // Logic save ke database nanti disini
    setActivityNote('')
    alert('Aktivitas berhasil dicatat!')
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header */}
      <div className="flex items-center gap-4">
        <button onClick={() => router.back()} className="p-2 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 text-slate-300 transition-colors">
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            {leadData.name}
            <Badge variant={currentStatus}>{currentStatus.replace('_', ' ').toUpperCase()}</Badge>
          </h1>
          <p className="text-slate-400 text-sm mt-0.5">Lead masuk pada 12 Juli 2026</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Panel Kiri: Info Lead */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <h2 className="text-lg font-bold text-white">Informasi Prospek</h2>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Project</p>
                <p className="text-sm font-medium text-white mt-1">{leadData.projectName}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Sumber</p>
                  <p className="text-sm font-medium text-white mt-1">{leadData.source}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Budget</p>
                  <p className="text-sm font-medium text-emerald-400 mt-1">{leadData.budgetRange}</p>
                </div>
              </div>
              <div className="w-full h-px bg-white/5 my-2"></div>
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Kontak Utama</p>
                <a 
                  href={generateWALink()}
                  target="_blank" 
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 border border-emerald-500/20 transition-all font-semibold text-sm mb-3 group"
                >
                  <MessageCircle size={18} className="group-hover:scale-110 transition-transform" />
                  Chat via WhatsApp
                </a>
                <div className="space-y-2">
                  <div className="flex justify-between items-center bg-white/5 p-2 rounded-lg">
                    <span className="text-xs text-slate-400">Telepon</span>
                    <span className="text-sm text-white font-medium">+{leadData.phone}</span>
                  </div>
                  <div className="flex justify-between items-center bg-white/5 p-2 rounded-lg">
                    <span className="text-xs text-slate-400">Email</span>
                    <span className="text-sm text-white font-medium">{leadData.email}</span>
                  </div>
                </div>
              </div>
              <div className="w-full h-px bg-white/5 my-2"></div>
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Catatan Awal</p>
                <p className="text-sm text-slate-300 leading-relaxed italic bg-white/[0.02] p-3 rounded-xl border border-white/5">
                  "{leadData.notes}"
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Panel Kanan: Command Area & Timeline */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Status Updater */}
          <Card glow>
            <div className="p-1.5 flex items-center gap-2">
              <div className="flex-1 bg-white/5 rounded-xl p-3 flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-slate-400 mb-1">Status Prospek Saat Ini</p>
                  <div className="flex items-center gap-2">
                    <Badge variant={currentStatus}>{currentStatus.replace('_', ' ').toUpperCase()}</Badge>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-slate-500 hidden sm:block">Ubah ke:</span>
                  <select 
                    value={currentStatus}
                    onChange={(e) => setCurrentStatus(e.target.value)}
                    className="bg-[#0B0F14] border border-white/20 rounded-lg px-4 py-2 text-sm font-semibold text-white focus:outline-none focus:border-emerald-500/50 transition-all appearance-none pr-8 cursor-pointer shadow-lg"
                  >
                    <option value="baru">Baru</option>
                    <option value="kontak">Kontak</option>
                    <option value="follow_up">Follow-up</option>
                    <option value="nego">Nego</option>
                    <option value="closing">Closing (Won!)</option>
                    <option value="hilang">Hilang</option>
                  </select>
                </div>
              </div>
            </div>
          </Card>

          {/* Activity Entry Form */}
          <Card>
            <CardHeader>
              <h2 className="text-lg font-bold text-white">Catat Aktivitas Baru</h2>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSaveActivity} className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <label className={`cursor-pointer px-4 py-2 rounded-lg border text-sm font-medium flex items-center gap-2 transition-all ${activityType === 'whatsapp' ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400' : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'}`}>
                    <input type="radio" name="type" className="hidden" checked={activityType === 'whatsapp'} onChange={() => setActivityType('whatsapp')} />
                    <MessageCircle size={16} /> WhatsApp
                  </label>
                  <label className={`cursor-pointer px-4 py-2 rounded-lg border text-sm font-medium flex items-center gap-2 transition-all ${activityType === 'call' ? 'bg-blue-500/20 border-blue-500/50 text-blue-400' : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'}`}>
                    <input type="radio" name="type" className="hidden" checked={activityType === 'call'} onChange={() => setActivityType('call')} />
                    <PhoneCall size={16} /> Telepon
                  </label>
                  <label className={`cursor-pointer px-4 py-2 rounded-lg border text-sm font-medium flex items-center gap-2 transition-all ${activityType === 'survey' ? 'bg-orange-500/20 border-orange-500/50 text-orange-400' : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'}`}>
                    <input type="radio" name="type" className="hidden" checked={activityType === 'survey'} onChange={() => setActivityType('survey')} />
                    <CalendarCheck size={16} /> Survei Lokasi
                  </label>
                  <label className={`cursor-pointer px-4 py-2 rounded-lg border text-sm font-medium flex items-center gap-2 transition-all ${activityType === 'note' ? 'bg-slate-500/20 border-slate-500/50 text-slate-300' : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'}`}>
                    <input type="radio" name="type" className="hidden" checked={activityType === 'note'} onChange={() => setActivityType('note')} />
                    <FileText size={16} /> Catatan
                  </label>
                </div>
                
                <textarea 
                  value={activityNote}
                  onChange={(e) => setActivityNote(e.target.value)}
                  placeholder="Deskripsikan hasil interaksi Anda..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500/50 min-h-[100px] resize-y"
                  required
                />
                
                <div className="flex justify-end">
                  <button type="submit" className="px-5 py-2.5 bg-white hover:bg-slate-200 text-slate-900 rounded-xl text-sm font-bold shadow-lg transition-colors">
                    Simpan Aktivitas
                  </button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Timeline */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between border-b border-white/5 pb-4">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <History size={18} className="text-emerald-500" />
                Riwayat Interaksi
              </h2>
            </CardHeader>
            <CardContent>
              <div className="relative border-l border-white/10 ml-3 md:ml-4 space-y-8 pb-4">
                {timelineData.map((item, index) => {
                  let Icon = FileText
                  let iconColor = 'text-slate-400'
                  let iconBg = 'bg-slate-800'
                  
                  if (item.type === 'whatsapp') { Icon = MessageCircle; iconColor = 'text-emerald-400'; iconBg = 'bg-emerald-900' }
                  if (item.type === 'call') { Icon = PhoneCall; iconColor = 'text-blue-400'; iconBg = 'bg-blue-900' }
                  if (item.type === 'status_change') { Icon = CheckCircle2; iconColor = 'text-orange-400'; iconBg = 'bg-orange-900' }

                  return (
                    <div key={item.id} className="relative pl-8">
                      {/* Timeline Node */}
                      <span className={`absolute -left-[18px] top-1 w-9 h-9 rounded-full ${iconBg} border border-white/10 flex items-center justify-center shadow-lg`}>
                        <Icon size={16} className={iconColor} />
                      </span>
                      
                      {/* Content */}
                      <div className="bg-white/5 rounded-xl border border-white/5 p-4 hover:border-white/10 transition-colors">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 mb-2">
                          <h4 className="text-sm font-bold text-white">{item.title}</h4>
                          <span className="text-xs text-slate-500 font-medium">{item.date}</span>
                        </div>
                        <p className="text-sm text-slate-400 leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  )
}
