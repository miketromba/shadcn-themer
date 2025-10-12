'use client'

import * as React from 'react'
import { ThemePreviewCard } from '@/components/theme-preview-card'

export type ThemeListItem = {
	id: string
	name: string
	version?: number
	username: string | null
	star_count: number
	is_starred: boolean
}

export function ThemesList({ items }: { items: ThemeListItem[] }) {
	return (
		<div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
			{items.map(item => (
				<ThemePreviewCard
					key={item.id}
					id={item.id}
					name={item.name}
					version={item.version}
					username={item.username}
					starCount={item.star_count}
					isStarred={item.is_starred}
				/>
			))}
		</div>
	)
}
