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
	// Transpile the screenshot service package (ships raw TypeScript)
	transpilePackages: ['@miketromba/screenshot-service']
}

export default nextConfig
