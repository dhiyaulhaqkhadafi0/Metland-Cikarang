"use server";

import { createClient } from "@/lib/supabase/server";

export async function submitLead(formData: FormData) {
  try {
    const supabase = await createClient();
    
    const name = formData.get("name") as string;
    const phone = formData.get("phone") as string;

    if (!name || !phone) {
      return { success: false, error: "Name and phone are required" };
    }

    const payload = {
      name,
      phone,
      status: "baru",
      utm_source: "website_form",
    };
    
    const { data, error } = await supabase.from('leads').insert([payload]).select();
    
    if (error) {
      throw new Error(error.message);
    }
    
    return { success: true, data: data[0] };
  } catch (err: any) {
    console.error("Error submitting lead:", err);
    return { success: false, error: err.message };
  }
}
