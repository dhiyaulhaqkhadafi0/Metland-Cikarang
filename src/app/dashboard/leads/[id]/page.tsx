import { createClient } from '@/lib/supabase/server';
import LeadDetailClient from './components/LeadDetailClient';
import { notFound } from 'next/navigation';
import { getLeadActivities, getLeadNotes, getLeadReminders } from '@/app/actions/lead-management.actions';

export const dynamic = 'force-dynamic';

export default async function LeadDetailPage({ params }: { params: Promise<{ id: string }> }) {
  // Parsing parameter ID untuk App Router versi 15+ (Promise)
  const { id } = await params;
  const supabase = await createClient();

  // Tarik data utama prospek
  const { data: lead, error } = await supabase
    .from('leads')
    .select('*')
    .eq('id', id)
    .single();

  if (!lead || error) {
    return notFound();
  }

  const normalizedLead = {
    ...lead,
    name: lead.name || lead.full_name || 'Pengunjung Web (CTA WA)',
    phone: lead.phone || '-',
    interest_cluster: lead.interest_cluster || (lead.project === 'weston_gateway' ? 'Weston Gateway' : lead.project === 'brassia_garden' ? 'Brassia Garden' : lead.project) || 'Brassia Garden',
    budget: lead.budget || lead.budget_range || null,
    status: lead.status === 'baru' ? 'New' : lead.status === 'follow_up' ? 'Contacted' : lead.status === 'closing' ? 'Closing' : (lead.status || 'New'),
  };

  // Tarik data relasi (Rekam jejak, Catatan, Pengingat) menggunakan Server Actions yang sudah dibuat
  const { data: activities } = await getLeadActivities(id);
  const { data: notes } = await getLeadNotes(id);
  const { data: reminders } = await getLeadReminders(id);

  return (
    <LeadDetailClient 
      lead={normalizedLead} 
      activities={activities || []} 
      notes={notes || []} 
      reminders={reminders || []} 
    />
  );
}
