'use client'

import * as React from 'react'
import { StarToggle } from './theme-editor/star-toggle'
import { useRouter } from 'next/navigation'
import { ThemeScreenshot } from './theme-screenshot'
import Link from 'next/link'

type ThemePreviewCardProps = {
	id: string
	name: string
	version?: number
	username: string | null
}

export function ThemePreviewCard({
	id,
	name,
	version,
	username
}: ThemePreviewCardProps) {
	const router = useRouter()
	return (
		<div
			key={id}
			role="button"
			tabIndex={0}
			aria-label={`Open ${name}`}
			className="cursor-pointer"
			onClick={() => router.push(`/themes/${id}`)}
			onKeyDown={e => {
				if (e.key === 'Enter' || e.key === ' ') {
					e.preventDefault()
					router.push(`/themes/${id}`)
				}
			}}
		>
			<div>
				<div className="w-full rounded-t-lg overflow-hidden border-t border-x">
					<ThemeScreenshot
						id={id}
						version={version}
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
								<Link
									href={`/user/${username}`}
									onClick={e => e.stopPropagation()}
									className="hover:text-primary transition-colors hover:underline"
								>
									{username}
								</Link>
							</div>
						)}
					</div>
					<StarToggle
						id={id}
						onClick={e => {
							e.stopPropagation()
						}}
					/>
				</div>
			</div>
		</div>
	)
}
