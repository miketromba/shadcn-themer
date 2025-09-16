'use client'

import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'

import { createClient } from '@/lib/supabase/client'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

type SupabaseUser = {
	email?: string | null
	user_metadata?: Record<string, unknown> | null
}

export function UserMenu() {
	const router = useRouter()

	const [isMounted, setIsMounted] = useState(false)
	const [user, setUser] = useState<SupabaseUser | null>(null)

	useEffect(() => {
		setIsMounted(true)
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

	const displayName = useMemo(() => {
		const email = user?.email ?? ''
		const meta = (user?.user_metadata ?? {}) as {
			full_name?: string
			name?: string
		}
		return meta.full_name || meta.name || email || 'User'
	}, [user])

	const initials = useMemo(() => {
		if (!displayName) return 'U'
		const parts = displayName.split(' ')
		const first = parts[0]?.[0] ?? 'U'
		const second = parts.length > 1 ? parts[1]?.[0] ?? '' : ''
		return (first + second).toUpperCase()
	}, [displayName])

	const signOut = async () => {
		const supabase = createClient()
		await supabase.auth.signOut()
		router.push('/auth/login')
	}

	if (!isMounted) return null

	if (!user) {
		return (
			<div className="flex gap-2">
				<Button asChild size="sm" variant={'outline'}>
					<a href="/auth/login">Sign in</a>
				</Button>
				<Button asChild size="sm" variant={'default'}>
					<a href="/auth/sign-up">Sign up</a>
				</Button>
			</div>
		)
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<button
					className={cn(
						'flex items-center gap-2 rounded-md p-1.5 transition-colors hover:bg-muted',
						'focus-visible:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 group'
					)}
					aria-label="Open user menu"
				>
					<Avatar className="size-7">
						<AvatarImage alt={displayName} />
						<AvatarFallback className="text-[10px] group-hover:bg-accent transition-colors">
							{initials}
						</AvatarFallback>
					</Avatar>
					<span className="hidden sm:inline-block max-w-[140px] truncate text-sm">
						{displayName}
					</span>
				</button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" sideOffset={8}>
				<DropdownMenuLabel className="max-w-[220px] truncate">
					{user?.email || 'Signed in'}
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem variant="destructive" onClick={signOut}>
					Sign out
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
