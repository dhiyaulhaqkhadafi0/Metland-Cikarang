"use server";

import { createClient } from "@/lib/supabase/server";

// ==========================================
// 1. TIMELINE & ACTIVITIES
// ==========================================
export async function addLeadActivity(leadId: string, activityType: string, description: string) {
  try {
    const supabase = await createClient();
    const payload = {
      lead_id: leadId,
      activity_type: activityType,
      description: description
    };
    
    const { data, error } = await supabase.from('lead_activities').insert([payload]).select();
    if (error) throw new Error(error.message);
    
    return { success: true, data: data[0] };
  } catch (err: any) {
    console.error("Error adding activity:", err);
    return { success: false, error: err.message };
  }
}

// ==========================================
// 2. STATUS & PIPELINE MANAGEMENT
// ==========================================
export async function updateLeadStatus(leadId: string, newStatus: string) {
  try {
    const supabase = await createClient();
    
    // Map UI status name to valid DB enum ('baru', 'follow_up', 'closing')
    const lower = (newStatus || '').toLowerCase();
    let dbStatus = 'follow_up';
    if (lower === 'new' || lower === 'baru' || lower === 'baru masuk') {
      dbStatus = 'baru';
    } else if (lower === 'closing' || lower === 'sukses closing') {
      dbStatus = 'closing';
    }

    // Ambil status sebelumnya untuk log
    const { data: lead } = await supabase.from('leads').select('status').eq('id', leadId).single();
    const oldStatus = lead?.status || 'Unknown';

    // Update status di tabel leads
    const { data, error } = await supabase
      .from('leads')
      .update({ status: dbStatus })
      .eq('id', leadId)
      .select();

    if (error) throw new Error(error.message);

    // Otomatis catat di Timeline jika status benar-benar berubah
    if (oldStatus !== dbStatus) {
      await addLeadActivity(
        leadId, 
        'Status Change', 
        `Pindah status dari [${oldStatus}] menjadi [${newStatus}]`
      );
    }

    return { success: true, data: data[0] };
  } catch (err: any) {
    console.error("Error updating status:", err);
    return { success: false, error: err.message };
  }
}

// ==========================================
// 3. NOTES MANAGEMENT
// ==========================================
export async function addLeadNote(leadId: string, noteText: string, author: string = "Sales Team") {
  try {
    const supabase = await createClient();
    const payload = {
      lead_id: leadId,
      note_text: noteText,
      created_by: author
    };
    
    const { data, error } = await supabase.from('lead_notes').insert([payload]).select();
    if (error) throw new Error(error.message);

    // Catat ke timeline
    await addLeadActivity(leadId, 'Note Added', `Menambahkan catatan baru: "${noteText.substring(0, 30)}..."`);
    
    return { success: true, data: data[0] };
  } catch (err: any) {
    console.error("Error adding note:", err);
    return { success: false, error: err.message };
  }
}

export async function getLeadNotes(leadId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('lead_notes')
    .select('*')
    .eq('lead_id', leadId)
    .order('created_at', { ascending: false });
    
  return { data: data || [], error };
}

// ==========================================
// 4. REMINDER MANAGEMENT
// ==========================================
export async function createReminder(leadId: string, reminderDate: string, description: string) {
  try {
    const supabase = await createClient();
    const payload = {
      lead_id: leadId,
      reminder_date: reminderDate, // format ISO
      description: description,
      is_completed: false
    };
    
    const { data, error } = await supabase.from('lead_reminders').insert([payload]).select();
    if (error) throw new Error(error.message);

    // Catat ke timeline
    const dateStr = new Date(reminderDate).toLocaleDateString('id-ID');
    await addLeadActivity(leadId, 'Reminder Created', `Menjadwalkan follow-up untuk tanggal ${dateStr}`);
    
    return { success: true, data: data[0] };
  } catch (err: any) {
    console.error("Error creating reminder:", err);
    return { success: false, error: err.message };
  }
}

export async function toggleReminderStatus(reminderId: string, isCompleted: boolean) {
  try {
    const supabase = await createClient();
    
    const { data, error } = await supabase
      .from('lead_reminders')
      .update({ is_completed: isCompleted })
      .eq('id', reminderId)
      .select();

    if (error) throw new Error(error.message);

    return { success: true, data: data[0] };
  } catch (err: any) {
    console.error("Error toggling reminder:", err);
    return { success: false, error: err.message };
  }
}

export async function getLeadReminders(leadId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('lead_reminders')
    .select('*')
    .eq('lead_id', leadId)
    .order('reminder_date', { ascending: true });
    
  return { data: data || [], error };
}

export async function getLeadActivities(leadId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('lead_activities')
    .select('*')
    .eq('lead_id', leadId)
    .order('created_at', { ascending: false });
    
  return { data: data || [], error };
}

// ==========================================
// 5. LEAD DELETION
// ==========================================
export async function deleteLead(leadId: string) {
  try {
    const supabase = await createClient();
    // Hapus data relasi terlebih dahulu agar tidak constraint error
    await supabase.from('lead_activities').delete().eq('lead_id', leadId);
    await supabase.from('lead_notes').delete().eq('lead_id', leadId);
    await supabase.from('lead_reminders').delete().eq('lead_id', leadId);

    const { error } = await supabase.from('leads').delete().eq('id', leadId);
    if (error) throw new Error(error.message);

    return { success: true };
  } catch (err: any) {
    console.error("Error deleting lead:", err);
    return { success: false, error: err.message };
  }
}
