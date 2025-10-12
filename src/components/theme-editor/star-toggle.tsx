'use client'

import * as React from 'react'
import { Button } from '@/components/ui/button'
import { Star } from 'lucide-react'
import { useTheme } from '@/api/client/themes'
import { useStarTheme, useUnstarTheme } from '@/api/client/themes'
import { useAuthModal } from '@/components/providers/auth-modal-provider'
import { useAuth } from '@/hooks/use-auth'

export function StarToggle({
	id,
	onClick,
	variant = 'ghost',
	showCount = true,
	initialStarCount,
	initialIsStarred
}: {
	id: string
	onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
	variant?: 'ghost' | 'outline'
	showCount?: boolean
	initialStarCount?: number
	initialIsStarred?: boolean
}) {
	// Only fetch theme data if initial values are not provided
	const { data } = useTheme(
		initialStarCount === undefined || initialIsStarred === undefined
			? id
			: undefined
	)
	const star = useStarTheme()
	const unstar = useUnstarTheme()
	const { openAuthModal } = useAuthModal()
	const { user } = useAuth()

	// Use initial values if provided, otherwise fall back to fetched data
	const starCount =
		initialStarCount !== undefined
			? initialStarCount
			: typeof data?.theme?.star_count === 'number'
			? (data.theme.star_count as number)
			: 0
	const isStarred =
		initialIsStarred !== undefined
			? initialIsStarred
			: Boolean(data?.theme?.is_starred)

	const isPending = star.isPending || unstar.isPending

	function toggle() {
		if (!user) {
			openAuthModal('login')
			return
		}
		if (isPending) return
		if (isStarred) {
			unstar.mutate({ id })
		} else {
			star.mutate({ id })
		}
	}

	return (
		<Button
			type="button"
			variant={variant}
			aria-label={isStarred ? 'Unstar' : 'Star'}
			onClick={e => {
				toggle()
				onClick?.(e)
			}}
			size="sm"
			className={
				showCount
					? isStarred
						? 'text-yellow-500 hover:text-yellow-500'
						: 'text-muted-foreground hover:text-foreground'
					: isStarred
					? 'px-2'
					: 'px-2'
			}
			title={isStarred ? 'Unstar this theme' : 'Star this theme'}
		>
			<Star
				className={
					isStarred
						? 'size-4 fill-yellow-500 text-yellow-500'
						: 'size-4'
				}
			/>
			{showCount && (
				<div
					className="text-sm tabular-nums text-muted-foreground ml-0.5"
					aria-live="polite"
				>
					{starCount}
				</div>
			)}
		</Button>
	)
}
