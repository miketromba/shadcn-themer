'use client'

import { UserMenu } from '@/components/user-menu'
import { usePathname } from 'next/navigation'
import { SiteLogo } from '@/components/site-logo'
import { Button } from '@/components/ui/button'
import { useCurrentUserProfile } from '@/api/client/users'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import { LayoutGrid, User } from 'lucide-react'

export function SiteHeader() {
	const pathname = usePathname()
	const [user, setUser] = useState<{ id: string } | null>(null)
	const { data: profileResponse } = useCurrentUserProfile(Boolean(user))

	useEffect(() => {
		const supabase = createClient()
		let ignore = false

		const load = async () => {
			const { data } = await supabase.auth.getUser()
			if (!ignore) setUser(data.user ?? null)
		}

		load()

		const { data: sub } = supabase.auth.onAuthStateChange(() => {
			load()
		})

		return () => {
			ignore = true
			sub?.subscription.unsubscribe()
		}
	}, [])

	const username = profileResponse?.profile?.username

	if (pathname?.startsWith('/themes/') || pathname?.startsWith('/preview/')) {
		return null
	}

	return (
		<div className="border-b">
			<nav className="container mx-auto h-16 flex items-center px-4 sm:px-8 text-sm">
				<div className="flex-1">
					<SiteLogo />
				</div>
				<div className="flex items-center gap-1 sm:gap-2">
					<Button
						variant={pathname === '/' ? 'secondary' : 'ghost'}
						size="sm"
						asChild
					>
						<Link href="/" className="gap-1">
							<LayoutGrid className="size-4" />
							<span className="hidden sm:inline">All Themes</span>
						</Link>
					</Button>
					{user && username && (
						<Button
							variant={
								pathname === `/user/${username}`
									? 'secondary'
									: 'ghost'
							}
							size="sm"
							asChild
						>
							<Link href={`/user/${username}`} className="gap-1">
								<User className="size-4" />
								<span className="hidden sm:inline">
									My Themes
								</span>
							</Link>
						</Button>
					)}
				</div>
				<div className="flex-1 flex justify-end">
					<UserMenu />
				</div>
			</nav>
		</div>
	)
}
