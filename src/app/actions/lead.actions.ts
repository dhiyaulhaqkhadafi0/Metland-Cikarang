"use server";

import { createClient } from "@/lib/supabase/server";
import { TrackingData } from "@/lib/tracking/utmTracker";

export async function saveLeadAction(
  trackingData: Partial<TrackingData>, 
  formData?: { name?: string; phone?: string; interest_cluster?: string; budget?: string }
) {
  try {
    const supabase = await createClient();
    
    // Ambil ID user jika ada user login, fallback ke system default sales UUID
    const { data: { user } } = await supabase.auth.getUser().catch(() => ({ data: { user: null } }));
    const salesId = user?.id || '00000000-0000-0000-0000-000000000000';

    // Tentukan valid enum value untuk project_type
    let projectValue = 'brassia_garden';
    const clusterStr = (formData?.interest_cluster || '').toLowerCase();
    if (clusterStr.includes('weston')) {
      projectValue = 'weston_gateway';
    }

    function mapSource(rawSource?: string) {
      const s = (rawSource || '').toLowerCase();
      if (s.includes('insta')) return 'instagram';
      if (s.includes('tiktok')) return 'tiktok';
      if (s.includes('fb') || s.includes('facebook')) return 'facebook_ads';
      if (s.includes('walk')) return 'walk_in';
      if (s.includes('referral')) return 'referral';
      if (s.includes('organic') || !s) return 'organic';
      return 'other';
    }

    const payload = {
      sales_id: salesId,
      full_name: formData?.name || 'Pengunjung Web (CTA WA)',
      phone: formData?.phone || 'Pending (Klik WA)',
      project: projectValue,
      budget_range: formData?.budget || null,
      source: mapSource(trackingData?.utm_source),
      status: 'baru',
      
      utm_source: trackingData?.utm_source || null,
      utm_medium: trackingData?.utm_medium || null,
      utm_campaign: trackingData?.utm_campaign || null,
      utm_content: trackingData?.utm_content || null,
      utm_term: trackingData?.utm_term || null,
      campaign_code: trackingData?.ref_code || null,
      
      landing_page: trackingData?.landing_page || null,
      full_url: trackingData?.full_url || null,
      referrer: trackingData?.referrer || null,
      
      device: trackingData?.device || null,
      browser: trackingData?.browser || null,
      operating_system: trackingData?.operating_system || null,
      screen_resolution: trackingData?.screen_resolution || null,
      language: trackingData?.language || null,
      timezone: trackingData?.timezone || null,
      
      whatsapp_clicked: true,
      whatsapp_clicked_at: new Date().toISOString()
    };

    const { data, error } = await supabase.from('leads').insert([payload]).select();

    if (error) {
      console.error("Supabase Error saving lead:", error);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (error: any) {
    console.error("Unexpected error saving lead:", error);
    return { success: false, error: error.message || "Unknown error" };
  }
}
