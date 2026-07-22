import { createClient } from '@/lib/supabase/server';
import LeadsClientPage from './components/LeadsClientPage';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function LeadsInbox() {
  const supabase = await createClient();

  // Fetch semua leads dari database, diurutkan dari yang terbaru
  const { data: rawLeads, error } = await supabase
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error("Gagal mengambil data leads dari Supabase:", error);
  }

  const normalizedLeads = (rawLeads || []).map((lead: any) => ({
    ...lead,
    name: lead.name || lead.full_name || 'Pengunjung Web (CTA WA)',
    phone: lead.phone || '-',
    interest_cluster: lead.interest_cluster || (lead.project === 'weston_gateway' ? 'Weston Gateway' : lead.project === 'brassia_garden' ? 'Brassia Garden' : lead.project) || 'Brassia Garden',
    budget: lead.budget || lead.budget_range || null,
    status: lead.status === 'baru' ? 'New' : lead.status === 'follow_up' ? 'Contacted' : lead.status === 'closing' ? 'Closing' : (lead.status || 'New'),
  }));

  return (
    <LeadsClientPage initialLeads={normalizedLeads} />
  );
}
