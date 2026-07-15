import { createClient } from "@supabase/supabase-js";

// We will use environment variables for Supabase connection.
// For now, these can be empty or placeholders until the user provides the real ones.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder-project.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-anon-key";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
