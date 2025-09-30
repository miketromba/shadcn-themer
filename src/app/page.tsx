'use client'

import * as React from 'react'
import { ThemesFeed } from '@/components/themes-feed'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import { useCreateTheme } from '@/api/client/themes'
import { ColorBucketFilter } from '@/components/color-bucket-filter'
import { PreviewModeToggle } from '@/components/preview-mode-toggle'

export default function Home() {
	const { mutate: createTheme, isPending: isCreating } = useCreateTheme()
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

			<div className="mb-6">
				<ColorBucketFilter
					selectedBuckets={selectedBuckets}
					onBucketsChange={setSelectedBuckets}
				/>
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
