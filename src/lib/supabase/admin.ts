import { createClient } from '@supabase/supabase-js'

// Server-only Supabase client using the service role key.
// Never import this in client-side code.
export function createServiceClient() {
	const url = process.env.NEXT_PUBLIC_SUPABASE_URL!
	const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
	return createClient(url, serviceKey)
}
