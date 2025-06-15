// src/lib/supabaseClient.ts

import { createBrowserClient } from '@supabase/ssr'

// Define a function to create a Supabase client for client-side operations
export const createClient = () =>
  createBrowserClient(
    // Pass Supabase URL and anonymous key from environment variables
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )