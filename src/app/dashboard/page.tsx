import React from 'react'
import { createClient } from '@/lib/supabase/server'
import HomeDashboardClient from './components/HomeDashboardClient'

export const dynamic = 'force-dynamic';

export default async function DashboardHome() {
  const supabase = await createClient()
  
  // Fetch real data from Supabase
  const { data: rawLeads } = await supabase
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false });
  
  const allLeads = (rawLeads || []).map((l: any) => ({
    ...l,
    name: l.name || l.full_name || 'Pengunjung Web (CTA WA)',
    phone: l.phone || '-',
    interest_cluster: l.interest_cluster || (l.project === 'weston_gateway' ? 'Weston Gateway' : l.project === 'brassia_garden' ? 'Brassia Garden' : l.project) || 'Brassia Garden',
    budget: l.budget || l.budget_range || null,
    status: l.status === 'baru' ? 'New' : l.status === 'follow_up' ? 'Contacted' : l.status === 'closing' ? 'Closing' : (l.status || 'New'),
  }));

  return (
    <HomeDashboardClient initialLeads={allLeads} />
  )
}
