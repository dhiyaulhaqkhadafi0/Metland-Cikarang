"use client";

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { 
  User, Phone, MapPin, Building2, Calendar, 
  Clock, DollarSign, Activity, FileText, Bell, MessageCircle, Send, CheckCircle2, Circle, Trash2
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { updateLeadStatus, addLeadNote, createReminder, toggleReminderStatus, deleteLead } from '@/app/actions/lead-management.actions';

const STAGES = ['New', 'Contacted', 'Survey', 'Negotiation', 'Booked', 'Closing', 'Lost'];

const STAGE_LABELS: Record<string, string> = {
  'New': 'Baru',
  'Contacted': 'Dihubungi',
  'Survey': 'Survei',
  'Negotiation': 'Negosiasi',
  'Booked': 'Booking',
  'Closing': 'Closing',
  'Lost': 'Gagal'
};

export default function LeadDetailClient({ 
  lead, 
  activities, 
  notes, 
  reminders 
}: { 
  lead: any;
  activities: any[];
  notes: any[];
  reminders: any[];
}) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('timeline');
  const [currentStatus, setCurrentStatus] = useState(lead.status || 'New');
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [noteText, setNoteText] = useState('');
  const [reminderDate, setReminderDate] = useState('');
  const [reminderDesc, setReminderDesc] = useState('');

  const handleDeleteLead = async () => {
    if (!confirm(`Apakah Anda yakin ingin menghapus data lead "${lead.name || 'Prospek'}" secara permanen?`)) return;
    setIsDeleting(true);
    const res = await deleteLead(lead.id);
    if (res.success) {
      router.push('/dashboard/leads');
    } else {
      alert("Gagal menghapus lead: " + res.error);
      setIsDeleting(false);
    }
  };

  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteText.trim()) return;
    await addLeadNote(lead.id, noteText);
    setNoteText('');
    window.location.reload();
  };

  const handleAddReminder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reminderDate || !reminderDesc.trim()) return;
    await createReminder(lead.id, new Date(reminderDate).toISOString(), reminderDesc);
    setReminderDate('');
    setReminderDesc('');
    window.location.reload();
  };

  const handleToggleReminder = async (remId: string, currentVal: boolean) => {
    await toggleReminderStatus(remId, !currentVal);
    window.location.reload();
  };

  const handleStatusChange = async (newStatus: string) => {
    setIsUpdatingStatus(true);
    const result = await updateLeadStatus(lead.id, newStatus);
    if (result.success) {
      setCurrentStatus(newStatus);
      window.location.reload(); // Refresh to get new timeline data
    } else {
      alert("Gagal memperbarui status: " + result.error);
    }
    setIsUpdatingStatus(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-6xl mx-auto pb-20">
      
      {/* Header Profile Card */}
      <Card className="p-6 bg-[#0B0F14] border-white/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl"></div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
              <User size={32} className="text-emerald-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white mb-1">{lead.name || 'Prospek Tanpa Nama'}</h1>
              <div className="flex items-center gap-4 text-sm text-slate-400">
                <span className="flex items-center gap-1.5"><Phone size={14} /> {lead.phone || 'Nomor tidak tersedia'}</span>
                <span className="flex items-center gap-1.5"><Calendar size={14} /> {new Date(lead.created_at).toLocaleDateString('id-ID')}</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <a 
              href={`https://wa.me/${lead.phone}`}
              target="_blank"
              className="px-4 py-2 bg-[#25D366]/20 text-[#25D366] hover:bg-[#25D366]/30 font-semibold rounded-lg flex items-center gap-2 transition-colors border border-[#25D366]/30"
            >
              <MessageCircle size={18} /> WhatsApp
            </a>
            <button 
              onClick={handleDeleteLead}
              disabled={isDeleting}
              className="px-4 py-2 bg-red-500/10 text-red-400 hover:bg-red-500/20 font-semibold rounded-lg flex items-center gap-2 transition-colors border border-red-500/20 disabled:opacity-50"
            >
              <Trash2 size={18} /> Hapus Lead
            </button>
          </div>
        </div>

        {/* Pipeline Progress Bar */}
        <div className="mt-8 pt-6 border-t border-white/10">
          <p className="text-sm font-semibold text-slate-400 mb-4">Pipeline Status</p>
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {STAGES.map((stage, index) => {
              const isActive = stage === currentStatus;
              const currentIndex = STAGES.indexOf(currentStatus);
              const isPast = index < currentIndex;
              
              return (
                <button
                  key={stage}
                  disabled={isUpdatingStatus}
                  onClick={() => handleStatusChange(stage)}
                  className={`
                    relative px-4 py-2 rounded-lg text-sm font-bold transition-all whitespace-nowrap
                    ${isActive ? 'bg-emerald-500 text-slate-900 shadow-[0_0_15px_rgba(16,185,129,0.3)]' : ''}
                    ${isPast ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : ''}
                    ${!isActive && !isPast ? 'bg-white/5 text-slate-400 hover:bg-white/10 border border-white/5' : ''}
                  `}
                >
                  {STAGE_LABELS[stage] || stage}
                </button>
              );
            })}
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Panel Kiri: Informasi Kebutuhan & Sumber */}
        <div className="space-y-6">
          <Card className="p-5 border-white/10 bg-[#0B0F14]">
            <h3 className="font-bold text-white mb-4 flex items-center gap-2">
              <Building2 size={18} className="text-emerald-400" /> Kebutuhan Properti
            </h3>
            <div className="space-y-4">
              <div>
                <div className="text-xs text-slate-500 mb-1">Cluster Diminati</div>
                <div className="font-medium text-slate-200">{lead.interest_cluster || '-'}</div>
              </div>
              <div>
                <div className="text-xs text-slate-500 mb-1">Estimasi Budget</div>
                <div className="font-medium text-slate-200">{lead.budget ? `Rp ${lead.budget}` : '-'}</div>
              </div>
            </div>
          </Card>

          <Card className="p-5 border-white/10 bg-[#0B0F14]">
            <h3 className="font-bold text-white mb-4 flex items-center gap-2">
              <MapPin size={18} className="text-emerald-400" /> Sumber Lead
            </h3>
            <div className="space-y-4">
              <div>
                <div className="text-xs text-slate-500 mb-1">Campaign Link Code</div>
                <div className="font-mono text-emerald-400 font-bold bg-emerald-500/10 inline-block px-2 py-0.5 rounded border border-emerald-500/20">
                  {lead.campaign_code || 'Organik'}
                </div>
              </div>
              <div>
                <div className="text-xs text-slate-500 mb-1">UTM Source / Medium</div>
                <div className="font-medium text-slate-300">
                  {lead.utm_source || '-'} / {lead.utm_medium || '-'}
                </div>
              </div>
              <div>
                <div className="text-xs text-slate-500 mb-1">Landing Page Asal</div>
                <div className="text-sm text-slate-400 truncate" title={lead.landing_page}>
                  {lead.landing_page || '-'}
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Panel Kanan: Workspace (Tab Timeline/Notes/Reminders) */}
        <div className="lg:col-span-2">
          <Card className="h-full min-h-[500px] border-white/10 bg-[#0B0F14] flex flex-col">
            
            {/* Tabs Header */}
            <div className="flex items-center gap-6 px-6 pt-6 border-b border-white/10">
              <button 
                onClick={() => setActiveTab('timeline')}
                className={`pb-4 text-sm font-bold flex items-center gap-2 border-b-2 transition-colors ${activeTab === 'timeline' ? 'border-emerald-500 text-emerald-400' : 'border-transparent text-slate-400 hover:text-slate-300'}`}
              >
                <Activity size={16} /> Riwayat (Timeline)
              </button>
              <button 
                onClick={() => setActiveTab('notes')}
                className={`pb-4 text-sm font-bold flex items-center gap-2 border-b-2 transition-colors ${activeTab === 'notes' ? 'border-emerald-500 text-emerald-400' : 'border-transparent text-slate-400 hover:text-slate-300'}`}
              >
                <FileText size={16} /> Catatan ({notes.length})
              </button>
              <button 
                onClick={() => setActiveTab('reminders')}
                className={`pb-4 text-sm font-bold flex items-center gap-2 border-b-2 transition-colors ${activeTab === 'reminders' ? 'border-emerald-500 text-emerald-400' : 'border-transparent text-slate-400 hover:text-slate-300'}`}
              >
                <Bell size={16} /> Pengingat ({reminders.filter(r => !r.is_completed).length})
              </button>
            </div>

            {/* Tab Contents */}
            <div className="p-6 flex-1 overflow-y-auto">
              
              {activeTab === 'timeline' && (
                <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
                  {activities.length > 0 ? activities.map((act) => (
                    <div key={act.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-[#141b25] text-emerald-400 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow">
                        <Clock size={16} />
                      </div>
                      <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-bold text-white text-sm">{act.activity_type}</span>
                          <span className="text-xs text-slate-500">{new Date(act.created_at).toLocaleString('id-ID', { hour: '2-digit', minute: '2-digit', day: 'numeric', month: 'short' })}</span>
                        </div>
                        <p className="text-sm text-slate-400">{act.description}</p>
                      </div>
                    </div>
                  )) : (
                    <div className="text-center text-slate-500 py-10 italic">Belum ada riwayat aktivitas.</div>
                  )}
                </div>
              )}

              {activeTab === 'notes' && (
                <div className="space-y-6">
                  <form onSubmit={handleAddNote} className="flex gap-2">
                    <input 
                      value={noteText}
                      onChange={(e) => setNoteText(e.target.value)}
                      placeholder="Tambahkan catatan khusus tentang prospek ini..." 
                      className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-emerald-500/50 outline-none"
                    />
                    <button type="submit" className="px-5 py-3 bg-emerald-500 hover:bg-emerald-600 text-slate-900 rounded-xl font-bold transition-colors">
                      <Send size={18} />
                    </button>
                  </form>
                  <div className="space-y-4">
                    {notes.length > 0 ? notes.map(n => (
                      <div key={n.id} className="p-4 rounded-xl border border-white/5 bg-white/[0.02]">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-bold text-emerald-400 text-sm">{n.created_by}</span>
                          <span className="text-xs text-slate-500">{new Date(n.created_at).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' })}</span>
                        </div>
                        <p className="text-sm text-slate-300">{n.note_text}</p>
                      </div>
                    )) : (
                      <div className="text-center text-slate-500 py-10 italic">Belum ada catatan.</div>
                    )}
                  </div>
                </div>
              )}

              {activeTab === 'reminders' && (
                <div className="space-y-6">
                  <form onSubmit={handleAddReminder} className="p-4 rounded-xl border border-white/10 bg-white/5 space-y-4">
                    <h4 className="font-bold text-white text-sm">Buat Pengingat Follow-up</h4>
                    <div className="flex flex-col md:flex-row gap-3">
                      <input 
                        type="datetime-local" 
                        required
                        value={reminderDate}
                        onChange={(e) => setReminderDate(e.target.value)}
                        className="bg-[#0B0F14] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-emerald-500/50 outline-none w-full md:w-auto"
                      />
                      <input 
                        placeholder="Deskripsi follow-up..." 
                        required
                        value={reminderDesc}
                        onChange={(e) => setReminderDesc(e.target.value)}
                        className="flex-1 bg-[#0B0F14] border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:border-emerald-500/50 outline-none"
                      />
                      <button type="submit" className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-slate-900 rounded-lg font-bold transition-colors text-sm">
                        Simpan
                      </button>
                    </div>
                  </form>
                  <div className="space-y-3">
                    {reminders.length > 0 ? reminders.map(r => (
                      <div key={r.id} className={`flex items-start gap-4 p-4 rounded-xl border transition-colors ${r.is_completed ? 'border-white/5 bg-white/[0.01] opacity-50' : 'border-emerald-500/20 bg-emerald-500/5'}`}>
                        <button onClick={() => handleToggleReminder(r.id, r.is_completed)} className={`mt-0.5 ${r.is_completed ? 'text-emerald-500' : 'text-slate-400 hover:text-emerald-400'}`}>
                          {r.is_completed ? <CheckCircle2 size={20} /> : <Circle size={20} />}
                        </button>
                        <div>
                          <p className={`text-sm font-medium ${r.is_completed ? 'text-slate-400 line-through' : 'text-slate-200'}`}>{r.description}</p>
                          <div className="flex items-center gap-2 mt-1.5 text-xs text-slate-500">
                            <Calendar size={12} />
                            <span className={!r.is_completed && new Date(r.reminder_date) < new Date() ? 'text-red-400 font-bold' : ''}>
                              {new Date(r.reminder_date).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' })}
                            </span>
                          </div>
                        </div>
                      </div>
                    )) : (
                      <div className="text-center text-slate-500 py-10 italic">Belum ada pengingat terjadwal.</div>
                    )}
                  </div>
                </div>
              )}

            </div>
          </Card>
        </div>

      </div>
    </div>
  );
}
