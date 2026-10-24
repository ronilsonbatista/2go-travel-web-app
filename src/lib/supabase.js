import { createClient } from '@supabase/supabase-js';

const supabaseUrl = (process.env.NEXT_PUBLIC_SUPABASE_URL || '').trim();
const supabaseAnonKey = (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '').trim();

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
    supabaseAnonKey &&
    !supabaseUrl.includes('placeholder.supabase.co') &&
    supabaseAnonKey !== 'placeholder-key'
);

if (!isSupabaseConfigured && typeof window !== 'undefined') {
  console.warn(
    'Supabase URL or Anon Key is missing. Newsletter/leads will show an error instead of fake success.'
  );
}

/** Null when env is missing — callers must not treat placeholder inserts as success. */
export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;
