'use client'

import { ThemesFeed } from '@/components/themes-feed'
import { CreateThemeButton } from '@/components/create-theme-button'
import { ImportThemeButton } from '@/components/import-theme-button'
import { PreviewModeToggle } from '@/components/preview-mode-toggle'
import { use } from 'react'

interface PageProps {
	params: Promise<{
		username: string
	}>
}

export default function UserThemesPage({ params }: PageProps) {
	const { username } = use(params)

	return (
		<div className="container mx-auto px-8 py-6">
			<div className="mb-6 flex items-center justify-between">
				<div>
					<h1 className="text-2xl font-semibold">
						{username}&apos;s Themes
					</h1>
					<p className="text-sm text-muted-foreground mt-1">
						Browse themes created by @{username}
					</p>
				</div>
				<div className="flex items-center gap-3">
					<PreviewModeToggle />
					<ImportThemeButton />
					<CreateThemeButton />
				</div>
			</div>
			<ThemesFeed sortBy="new" username={username} />
		</div>
	)
}
