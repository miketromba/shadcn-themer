'use client'

import * as React from 'react'
import { StarToggle } from './theme-editor/star-toggle'
import { ThemeScreenshot } from './theme-screenshot'
import { useThemeData } from './providers/theme-data-provider'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

type ThemePreviewCardProps = {
	id: string
	name: string
	version?: number
	username: string | null
	starCount: number
	isStarred: boolean
}

export function ThemePreviewCard({
	id,
	name,
	version,
	username,
	starCount,
	isStarred
}: ThemePreviewCardProps) {
	const { previewMode } = useThemeData()
	const router = useRouter()

	const handleUsernameClick = (e: React.MouseEvent) => {
		e.stopPropagation()
		e.preventDefault()
		if (username) {
			router.push(`/user/${username}`)
		}
	}

	return (
		<Link key={id} href={`/themes/${id}`} className="block group">
			<div>
				<div className="w-full rounded-t-lg overflow-hidden border-t border-x">
					<ThemeScreenshot
						id={id}
						version={version}
						mode={previewMode}
						width={600}
						alt={name}
					/>
				</div>
				<div className="flex justify-between items-center gap-2 py-2 px-3 pr-1 border rounded-b-lg">
					<div>
						<div className="text-sm font-medium">{name}</div>
						{username && (
							<div className="text-xs text-muted-foreground">
								by{' '}
								<button
									onClick={handleUsernameClick}
									className="hover:text-primary transition-colors cursor-pointer hover:underline"
								>
									{username}
								</button>
							</div>
						)}
					</div>
					<StarToggle
						id={id}
						initialStarCount={starCount}
						initialIsStarred={isStarred}
						onClick={e => {
							e.stopPropagation()
							e.preventDefault()
						}}
					/>
				</div>
			</div>
		</Link>
	)
}
