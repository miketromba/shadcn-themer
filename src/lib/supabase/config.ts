// Auth is Supabase's own server (GoTrue), run beside the app and reached at
// this app's origin under /auth/v1 (see the rewrite in next.config.ts).

// The session cookie keeps the name the hosted Supabase project gave it, so
// people signed in before the move stay signed in.
export const authCookieOptions = {
	name: 'sb-vldsihxanlzynauryxfp-auth-token'
}

// Server code reaches auth through this server's own address rather than the
// public internet; the browser uses the public URL.
export function serverSupabaseUrl(): string {
	return (
		process.env.SUPABASE_INTERNAL_URL || process.env.NEXT_PUBLIC_SUPABASE_URL!
	)
}
