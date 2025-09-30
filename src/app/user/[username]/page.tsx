'use client'

import { ThemesFeed } from '@/components/themes-feed'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import { useCreateTheme } from '@/api/client/themes'
import { PreviewModeToggle } from '@/components/preview-mode-toggle'
import { use } from 'react'

interface PageProps {
	params: Promise<{
		username: string
	}>
}

export default function UserThemesPage({ params }: PageProps) {
	const { username } = use(params)
	const { mutate: createTheme, isPending: isCreating } = useCreateTheme()

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
					<Button
						onClick={() => createTheme({})}
						disabled={isCreating}
					>
						{isCreating ? (
							<>
								<Loader2 className="mr-2 h-4 w-4 animate-spin" />
								Creating...
							</>
						) : (
							'New Theme'
						)}
					</Button>
				</div>
			</div>
			<ThemesFeed sortBy="new" username={username} />
		</div>
	)
}
