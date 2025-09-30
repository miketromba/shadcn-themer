'use client'

import * as React from 'react'
import { ThemesFeed } from '@/components/themes-feed'
import { CreateThemeButton } from '@/components/create-theme-button'
import { ColorBucketFilter } from '@/components/color-bucket-filter'
import { PreviewModeToggle } from '@/components/preview-mode-toggle'

export default function Home() {
	const [selectedBuckets, setSelectedBuckets] = React.useState<string[]>([])

	return (
		<div className="container mx-auto px-8 py-6">
			<div className="mb-6 flex items-center justify-between">
				<div>
					<h1 className="text-2xl font-semibold">ShadCN Themes</h1>
					<p className="text-sm text-muted-foreground mt-1">
						Discover and create beautiful themes for shadcn/ui
					</p>
				</div>
				<CreateThemeButton />
			</div>

			<div className="mb-6 flex items-end justify-between gap-4">
				<ColorBucketFilter
					selectedBuckets={selectedBuckets}
					onBucketsChange={setSelectedBuckets}
				/>
				<PreviewModeToggle />
			</div>

			<ThemesFeed
				sortBy="popular"
				colorBuckets={
					selectedBuckets.length > 0 ? selectedBuckets : undefined
				}
			/>
		</div>
	)
}
