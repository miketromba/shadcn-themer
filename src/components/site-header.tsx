'use client'

import { UserMenu } from '@/components/user-menu'
import { usePathname } from 'next/navigation'
import { SiteLogo } from '@/components/site-logo'

export function SiteHeader() {
	const pathname = usePathname()
	if (pathname?.startsWith('/app/themes/')) {
		return null
	}
	return (
		<nav className="w-full border-b h-16 flex items-center justify-between px-5 text-sm">
			<SiteLogo />
			<UserMenu />
		</nav>
	)
}
