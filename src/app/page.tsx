'use client'

import { ThemesFeed } from '@/components/themes-feed'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import { useCreateTheme } from '@/api/client/themes'

export default function Home() {
	const { mutate: createTheme, isPending: isCreating } = useCreateTheme()

	return (
		<div className="container mx-auto px-8 py-6">
			<div className="mb-6 flex items-center justify-between">
				<h1 className="text-2xl font-semibold">ShadCN Themes</h1>
				<Button onClick={() => createTheme({})} disabled={isCreating}>
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
			<ThemesFeed sortBy="popular" />
		</div>
	)
}
