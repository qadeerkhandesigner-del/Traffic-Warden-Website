import { createClient, type SupabaseClient } from '@supabase/supabase-js';

/**
 * Supabase client
 * ===============
 *
 * Configured through the environment so the same build works with or without a
 * backend:
 *
 *   VITE_SUPABASE_URL=https://<project-ref>.supabase.co
 *   VITE_SUPABASE_ANON_KEY=<anon / publishable key>
 *
 * Until both values exist the app falls back to browser localStorage
 * (`services/advisoryStore.ts`) and the local sign-in in `services/adminAuth.ts`,
 * so nothing breaks before the backend is ready.
 *
 * NOTE: the anon key is public by design — row level security (see
 * `supabase/schema.sql`) is what protects the data. Never paste the
 * `service_role` key here.
 */

const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isSupabaseConfigured: boolean = Boolean(url && anonKey);

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(url, anonKey)
  : null;
