"use server";

import { createClient } from "@/lib/supabase/server";

export async function generateCampaignLink(formData: FormData) {
  try {
    const supabase = await createClient();
    
    // Generator kode acak (Shortcode 6 digit)
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let shortCode = '';
    for (let i = 0; i < 6; i++) {
      shortCode += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    
    // Ambil data dari formulir
    const salesName = formData.get("sales_name") as string;
    const platform = formData.get("platform") as string;
    const campaignName = formData.get("campaign_name") as string;
    const cluster = formData.get("cluster") as string;
    const originalUrl = formData.get("original_url") as string || '/';

    const payload = {
      short_code: shortCode,
      sales_name: salesName,
      platform: platform,
      campaign_name: campaignName,
      cluster: cluster,
      original_url: originalUrl,
      total_clicks: 0
    };

    const { data, error } = await supabase.from('campaign_links').insert([payload]).select();

    if (error) {
      console.error("Gagal membuat campaign link:", error);
      return { success: false, error: error.message };
    }

    return { success: true, data: data[0] };
  } catch (err: any) {
    console.error("Unknown error creating link:", err);
    return { success: false, error: err.message || 'Terjadi kesalahan sistem' };
  }
}
