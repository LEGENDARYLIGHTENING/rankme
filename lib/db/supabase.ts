import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'http://localhost:54321';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-anon-key';
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder-service-role-key';

/**
 * Standard Supabase client using anon key (respects RLS policies).
 */
export function getSupabaseClient() {
  return createClient(supabaseUrl, supabaseAnonKey);
}

/**
 * Service role Supabase client bypassing RLS policies.
 * STRICTLY FOR SERVER-SIDE BACKGROUND JOBS AND WEBHOOKS.
 */
export function getServiceRoleClient() {
  return createClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
