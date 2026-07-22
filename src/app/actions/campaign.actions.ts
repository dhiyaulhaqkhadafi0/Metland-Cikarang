"use server";

import { createClient } from "@/lib/supabase/server";

export async function generateCampaignLink(formData: FormData) {
  try {
    const supabase = await createClient();
    
    // Ambil data dari formulir
    const salesName = formData.get("sales_name") as string;
    const platform = formData.get("platform") as string;
    const campaignName = formData.get("campaign_name") as string;
    const cluster = formData.get("cluster") as string;
    const originalUrl = formData.get("original_url") as string || '/';
    const metaPixelId = formData.get("meta_pixel_id") as string || null;
    const tiktokPixelId = formData.get("tiktok_pixel_id") as string || null;
    const customShortCode = formData.get("custom_short_code") as string;

    // Tentukan shortcode
    let shortCode = '';
    if (customShortCode && customShortCode.trim() !== '') {
      // Format custom shortcode: hapus spasi, ubah ke lowercase, hanya alfanumerik dan strip
      shortCode = customShortCode.trim().toLowerCase().replace(/[^a-z0-9-]/g, '-');
      
      // Cek apakah custom shortcode sudah dipakai
      const { data: existing } = await supabase.from('campaign_links').select('id').eq('short_code', shortCode).single();
      if (existing) {
        return { success: false, error: 'Custom shortlink sudah digunakan, silakan pilih nama lain.' };
      }
    } else {
      // Generator kode acak (Shortcode 6 digit)
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      for (let i = 0; i < 6; i++) {
        shortCode += chars.charAt(Math.floor(Math.random() * chars.length));
      }
    }

    const payload: any = {
      short_code: shortCode,
      sales_name: salesName,
      platform: platform,
      campaign_name: campaignName,
      cluster: cluster,
      original_url: originalUrl,
      meta_pixel_id: metaPixelId,
      tiktok_pixel_id: tiktokPixelId,
      total_clicks: 0
    };

    const { data, error } = await supabase.from('campaign_links').insert([payload]).select();

    if (error) {
      console.error("Gagal membuat campaign link:", error);
      delete payload.meta_pixel_id;
      delete payload.tiktok_pixel_id;
      const fallback = await supabase.from('campaign_links').insert([payload]).select();
      if (fallback.error) return { success: false, error: fallback.error.message };
      return { success: true, data: fallback.data[0] };
    }

    return { success: true, data: data[0] };
  } catch (err: any) {
    console.error("Unknown error creating link:", err);
    return { success: false, error: err.message || 'Terjadi kesalahan sistem' };
  }
}
