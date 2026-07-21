"use server";

import { createClient } from "@/lib/supabase/server";
import { TrackingData } from "@/lib/tracking/utmTracker";

export async function saveLeadAction(
  trackingData: Partial<TrackingData>, 
  formData?: { name?: string; phone?: string; interest_cluster?: string; budget?: string }
) {
  try {
    const supabase = await createClient();

    const payload = {
      name: formData?.name || null,
      phone: formData?.phone || null,
      interest_cluster: formData?.interest_cluster || null,
      budget: formData?.budget || null,
      
      utm_source: trackingData.utm_source || null,
      utm_medium: trackingData.utm_medium || null,
      utm_campaign: trackingData.utm_campaign || null,
      utm_content: trackingData.utm_content || null,
      utm_term: trackingData.utm_term || null,
      
      landing_page: trackingData.landing_page || null,
      full_url: trackingData.full_url || null,
      referrer: trackingData.referrer || null,
      
      device: trackingData.device || null,
      browser: trackingData.browser || null,
      operating_system: trackingData.operating_system || null,
      screen_resolution: trackingData.screen_resolution || null,
      language: trackingData.language || null,
      timezone: trackingData.timezone || null,
      
      status: 'New',
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
