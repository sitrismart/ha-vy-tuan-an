import { createClient } from '@supabase/supabase-js';

// Cast avoids depending on a vite-env.d.ts ambient declaration for import.meta.env.
const env = (import.meta as unknown as { env: Record<string, string | undefined> }).env;

const supabaseUrl = env.VITE_SUPABASE_URL ?? '';
const supabasePublishableKey = env.VITE_SUPABASE_PUBLISHABLE_KEY ?? '';

export const supabase = createClient(supabaseUrl, supabasePublishableKey);
