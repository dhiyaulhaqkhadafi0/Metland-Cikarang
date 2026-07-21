import { createClient } from '@/lib/supabase/server';
import CampaignsClientPage from './components/CampaignsClientPage';

export const dynamic = 'force-dynamic';

export default async function CampaignsPage() {
  const supabase = await createClient();
  
  // Ambil semua data tautan kampanye, diurutkan dari yang terbaru
  const { data: campaigns, error } = await supabase
    .from('campaign_links')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error("Gagal mengambil data kampanye:", error);
  }

  return <CampaignsClientPage campaigns={campaigns || []} />;
}
