'use client'

import * as React from 'react'
import { ThemePreviewCard } from '@/components/theme-preview-card'
import type { ShadcnTheme } from '@/lib/shadcnTheme'
import { useRouter } from 'next/navigation'

export type ThemeListItem = {
	id: string
	name: string
	json?: ShadcnTheme
	star_count?: number
}

export function ThemesList({ items }: { items: ThemeListItem[] }) {
	const router = useRouter()
	return (
		<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
			{items.map(item => (
				<div
					key={item.id}
					role="button"
					tabIndex={0}
					aria-label={`Open ${item.name}`}
					className="cursor-pointer focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-xl"
					onClick={() => router.push(`/app/themes/${item.id}`)}
					onKeyDown={e => {
						if (e.key === 'Enter' || e.key === ' ') {
							e.preventDefault()
							router.push(`/app/themes/${item.id}`)
						}
					}}
				>
					<ThemePreviewCard
						name={item.name}
						theme={item.json as ShadcnTheme}
						starCount={item.star_count ?? 0}
					/>
				</div>
			))}
		</div>
	)
}
