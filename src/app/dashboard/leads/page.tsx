import { createClient } from '@/lib/supabase/server';
import LeadsClientPage from './components/LeadsClientPage';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function LeadsInbox() {
  const supabase = await createClient();

  // Fetch semua leads dari database, diurutkan dari yang terbaru
  const { data: leads, error } = await supabase
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error("Gagal mengambil data leads dari Supabase:", error);
  }

  return (
    <LeadsClientPage initialLeads={leads || []} />
  );
}
