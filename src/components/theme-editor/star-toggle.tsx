'use client'

import * as React from 'react'
import { Button } from '@/components/ui/button'
import { Star } from 'lucide-react'
import { useTheme } from '@/api/client/themes'
import { useStarTheme, useUnstarTheme } from '@/api/client/themes'

export function StarToggle({
	id,
	onClick
}: {
	id: string
	onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
}) {
	const { data } = useTheme(id)
	const star = useStarTheme()
	const unstar = useUnstarTheme()

	const starCount =
		typeof data?.theme?.star_count === 'number'
			? (data.theme.star_count as number)
			: 0
	const isStarred = Boolean(data?.theme?.is_starred)

	const isPending = star.isPending || unstar.isPending

	function toggle() {
		if (isPending) return
		if (isStarred) {
			unstar.mutate({ id })
		} else {
			star.mutate({ id })
		}
	}

	return (
		<div className="flex items-center gap-2">
			<Button
				type="button"
				variant="ghost"
				aria-label={isStarred ? 'Unstar' : 'Star'}
				onClick={e => {
					toggle()
					onClick?.(e)
				}}
				size="sm"
				className={
					isStarred
						? 'text-yellow-500 hover:text-yellow-500'
						: 'text-muted-foreground hover:text-foreground'
				}
				title={isStarred ? 'Unstar this theme' : 'Star this theme'}
			>
				<Star
					className={isStarred ? 'size-4 fill-yellow-500' : 'size-4'}
				/>
				<div
					className="text-sm tabular-nums text-muted-foreground"
					aria-live="polite"
				>
					{starCount}
				</div>
			</Button>
		</div>
	)
}
