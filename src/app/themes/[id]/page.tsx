'use client'

import ExamplesSwitcher from '@/components/examples'
import { ThemeDataProvider } from '@/components/providers/theme-data-provider'
import { PreviewModeToggle } from '@/components/preview-mode-toggle'
import { StarToggle } from '@/components/theme-editor/star-toggle'
import { ForkButton } from '@/components/theme-editor/fork-button'
import { useTheme } from '@/api/client/themes'
import { useAuth } from '@/hooks/use-auth'
import { use } from 'react'
import Link from 'next/link'
import { Loader2, Edit } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function ThemePublicViewPage({
	params
}: {
	params: Promise<{ id: string }>
}) {
	const { id } = use(params)
	const { data, isLoading, error } = useTheme(id)
	const { user } = useAuth()

	if (isLoading) {
		return (
			<div className="flex h-screen items-center justify-center">
				<Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
			</div>
		)
	}

	if (error || !data || !('theme' in data)) {
		return (
			<div className="flex h-screen items-center justify-center">
				<div className="text-center">
					<h1 className="text-2xl font-semibold mb-2">
						Theme not found
					</h1>
					<p className="text-muted-foreground">
						The theme you&apos;re looking for doesn&apos;t exist.
					</p>
				</div>
			</div>
		)
	}

	const theme = data.theme
	const isOwner = user && theme.user_id === user.id

	return (
		<ThemeDataProvider id={id}>
			<div className="container mx-auto px-8 py-8">
				<div className="mb-8 text-center">
					<h1 className="text-3xl font-bold mb-2">{theme.name}</h1>
					<p className="text-muted-foreground">
						A shadcn theme designed by{' '}
						<Link
							href={`/user/${theme.username}`}
							className="text-primary hover:underline font-medium"
						>
							@{theme.username}
						</Link>
					</p>
					<div className="mt-3 flex items-center justify-center gap-2">
						<StarToggle id={id} variant="outline" />
						<ForkButton id={id} />
						{isOwner && (
							<Button asChild variant="default" size="sm">
								<Link href={`/themes/${id}/edit`}>
									<Edit className="mr-1 size-4" />
									Edit Theme
								</Link>
							</Button>
						)}
					</div>
				</div>
				<div className="max-w-7xl mx-auto">
					<ExamplesSwitcher rightChildren={<PreviewModeToggle />} />
				</div>
			</div>
		</ThemeDataProvider>
	)
}
