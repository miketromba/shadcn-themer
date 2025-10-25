'use client'

import { UserMenu } from '@/components/user-menu'
import { CreateThemeButton } from '@/components/create-theme-button'
import { usePathname } from 'next/navigation'
import { SiteLogo } from '@/components/site-logo'
import { Button } from '@/components/ui/button'
import { useCurrentUserProfile } from '@/api/client/users'
import { useAuth } from '@/hooks/use-auth'
import Link from 'next/link'
import { LayoutGrid, User } from 'lucide-react'
import { GitHubButton } from '@/components/github-button'

export function SiteHeader() {
	const pathname = usePathname()
	const { user } = useAuth()
	const { data: profileResponse } = useCurrentUserProfile(Boolean(user))

	const username = profileResponse?.profile?.username

	if (pathname?.endsWith('/edit') || pathname?.startsWith('/preview/')) {
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
				<div className="flex-1 flex justify-end items-center gap-2">
					<GitHubButton
						owner="miketromba"
						repo="shadcn-themer"
						variant="outline"
						size="sm"
						compact
						className="hidden sm:flex"
						showStars={false}
					/>
					{user &&
						pathname !== '/' &&
						!pathname?.startsWith('/user/') && (
							<CreateThemeButton size="sm" hideTextOnMobile />
						)}
					<UserMenu />
				</div>
			</nav>
		</div>
	)
}
