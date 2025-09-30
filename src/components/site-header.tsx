'use client'

import { UserMenu } from '@/components/user-menu'
import { usePathname } from 'next/navigation'
import { SiteLogo } from '@/components/site-logo'

export function SiteHeader() {
	const pathname = usePathname()
	if (
		pathname?.startsWith('/app/themes/') ||
		pathname?.startsWith('/preview/')
	) {
		return null
	}
	return (
		<div className="border-b">
			<nav className="container mx-auto h-16 flex items-center justify-between px-8 text-sm">
				<SiteLogo />
				<UserMenu />
			</nav>
		</div>
	)
}
