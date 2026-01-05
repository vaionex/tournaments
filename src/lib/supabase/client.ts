/**
 * Supabase Client Configuration
 *
 * This module provides the Supabase client for database operations.
 * Configure your Supabase credentials in .env file:
 *   VITE_SUPABASE_URL=https://your-project.supabase.co
 *   VITE_SUPABASE_ANON_KEY=your-anon-key
 */

import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

// Environment variables - set these in .env file
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Validate environment variables
if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
	console.warn(
		'⚠️ Supabase credentials not configured. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file.'
	);
}

// Create Supabase client
export const supabase = createClient<Database>(
	SUPABASE_URL || 'https://placeholder.supabase.co',
	SUPABASE_ANON_KEY || 'placeholder-key',
	{
		auth: {
			persistSession: true,
			autoRefreshToken: true,
			detectSessionInUrl: true
		}
	}
);

export type { Database };
export { SUPABASE_URL };
