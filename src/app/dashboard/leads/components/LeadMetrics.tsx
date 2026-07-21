import React from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Users, Calendar, BarChart3, MessageCircle } from 'lucide-react';
import { Lead } from './LeadsClientPage';

export default function LeadMetrics({ leads }: { leads: Lead[] }) {
  const now = new Date();
  
  const leadsToday = leads.filter(l => new Date(l.created_at).toDateString() === now.toDateString()).length;
  const leadsThisWeek = leads.filter(l => new Date(l.created_at) >= new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)).length;
  const leadsThisMonth = leads.filter(l => new Date(l.created_at).getMonth() === now.getMonth() && new Date(l.created_at).getFullYear() === now.getFullYear()).length;
  const waClicks = leads.filter(l => l.whatsapp_clicked).length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <Card glow className="relative overflow-hidden group border-white/5 bg-white/[0.02]">
        <div className="absolute -right-6 -top-6 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl group-hover:bg-emerald-500/20 transition-all"></div>
        <CardContent className="p-5">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-emerald-500/10 rounded-xl border border-emerald-500/20 text-emerald-400">
              <Users size={24} />
            </div>
            <div>
              <p className="text-xs font-medium text-slate-400">Leads Hari Ini</p>
              <h3 className="text-2xl font-bold text-white mt-1">{leadsToday}</h3>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="relative overflow-hidden group border-white/5 bg-white/[0.02]">
        <div className="absolute -right-6 -top-6 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl group-hover:bg-blue-500/20 transition-all"></div>
        <CardContent className="p-5">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-500/10 rounded-xl border border-blue-500/20 text-blue-400">
              <Calendar size={24} />
            </div>
            <div>
              <p className="text-xs font-medium text-slate-400">Leads Minggu Ini</p>
              <h3 className="text-2xl font-bold text-white mt-1">{leadsThisWeek}</h3>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="relative overflow-hidden group border-white/5 bg-white/[0.02]">
        <div className="absolute -right-6 -top-6 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl group-hover:bg-purple-500/20 transition-all"></div>
        <CardContent className="p-5">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-500/10 rounded-xl border border-purple-500/20 text-purple-400">
              <BarChart3 size={24} />
            </div>
            <div>
              <p className="text-xs font-medium text-slate-400">Leads Bulan Ini</p>
              <h3 className="text-2xl font-bold text-white mt-1">{leadsThisMonth}</h3>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="relative overflow-hidden group border-white/5 bg-white/[0.02]">
        <div className="absolute -right-6 -top-6 w-32 h-32 bg-green-500/10 rounded-full blur-2xl group-hover:bg-green-500/20 transition-all"></div>
        <CardContent className="p-5">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-500/10 rounded-xl border border-green-500/20 text-green-400">
              <MessageCircle size={24} />
            </div>
            <div>
              <p className="text-xs font-medium text-slate-400">Total Klik WA</p>
              <h3 className="text-2xl font-bold text-white mt-1">{waClicks}</h3>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
