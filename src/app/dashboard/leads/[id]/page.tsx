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

  // Tarik data relasi (Rekam jejak, Catatan, Pengingat) menggunakan Server Actions yang sudah dibuat
  const { data: activities } = await getLeadActivities(id);
  const { data: notes } = await getLeadNotes(id);
  const { data: reminders } = await getLeadReminders(id);

  return (
    <LeadDetailClient 
      lead={lead} 
      activities={activities} 
      notes={notes} 
      reminders={reminders} 
    />
  );
}
