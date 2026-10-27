import type { NextConfig } from 'next'

const imageDomains: string[] = []
if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
	try {
		const host = new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).hostname
		if (host) imageDomains.push(host)
	} catch {}
}

const nextConfig: NextConfig = {
	images: {
		domains: imageDomains
	},
	// Supabase Auth (GoTrue) runs as its own private service; supabase-js
	// reaches it at this origin's /auth/v1, as it would on hosted Supabase.
	async rewrites() {
		const authUpstream = process.env.SUPABASE_AUTH_UPSTREAM_URL
		if (!authUpstream) return []
		return [
			{
				source: '/auth/v1/:path*',
				destination: `${authUpstream}/:path*`
			}
		]
	}
}

export default nextConfig
