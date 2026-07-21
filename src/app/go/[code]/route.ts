import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: Request, context: { params: Promise<{ code: string }> }) {
  const code = (await context.params).code;
  
  if (!code) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  const supabase = await createClient();

  // 1. Cari tautan kampanye di database berdasarkan kode unik
  const { data: campaign, error } = await supabase
    .from('campaign_links')
    .select('id, original_url, total_clicks')
    .eq('short_code', code)
    .single();

  // Jika tidak ditemukan, alihkan secara senyap ke halaman utama
  if (!campaign || error) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // 2. Tambahkan statistik jumlah klik (+1)
  await supabase
    .from('campaign_links')
    .update({ total_clicks: campaign.total_clicks + 1 })
    .eq('id', campaign.id);

  // 3. Bangun URL tujuan (dengan memasukkan parameter ref_code)
  let targetUrlStr = campaign.original_url || '/';
  
  // Memastikan format URL valid untuk NextResponse.redirect
  let finalUrl: URL;
  try {
    // Jika formatnya path relatif (seperti '/explore')
    finalUrl = new URL(targetUrlStr, request.url);
  } catch (e) {
    // Fallback jika string original_url rusak
    finalUrl = new URL('/', request.url);
  }

  // Menyuntikkan pelacak 'ref_code' ke URL
  finalUrl.searchParams.set('ref_code', code);

  // 4. Arahkan pengguna ke URL akhir seketika
  return NextResponse.redirect(finalUrl);
}
