'use client'

import * as React from 'react'
import { useThemesList } from '@/api/client/themes'
import { ThemesList } from '@/components/themes-list'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'

export function ThemesFeed() {
	const {
		data,
		isLoading,
		isError,
		error,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage
	} = useThemesList()

	const items = React.useMemo(() => {
		return (data?.pages.flatMap(p => p.items ?? [])?.filter(Boolean) ??
			[]) as any[]
	}, [data])

	// Intersection Observer for infinite scroll
	const loadMoreRef = React.useRef<HTMLDivElement | null>(null)
	React.useEffect(() => {
		if (!hasNextPage || isFetchingNextPage) return
		const el = loadMoreRef.current
		if (!el) return
		const observer = new IntersectionObserver(entries => {
			if (entries[0]?.isIntersecting) {
				fetchNextPage()
			}
		})
		observer.observe(el)
		return () => observer.disconnect()
	}, [hasNextPage, isFetchingNextPage, fetchNextPage])

	if (isLoading) {
		return (
			<div className="flex justify-center p-6 text-muted-foreground">
				<Loader2 className="mr-2 h-4 w-4 animate-spin" /> Loading
				themes...
			</div>
		)
	}

	if (isError) {
		return (
			<div className="flex justify-center p-6 text-destructive">
				{(error as Error)?.message || 'Failed to load themes'}
			</div>
		)
	}

	return (
		<div className="space-y-4">
			<ThemesList items={items as any} />
			<div className="flex justify-center">
				{hasNextPage ? (
					<div ref={loadMoreRef}>
						<Button
							variant="outline"
							onClick={() => fetchNextPage()}
							disabled={isFetchingNextPage}
						>
							{isFetchingNextPage ? (
								<>
									<Loader2 className="mr-2 h-4 w-4 animate-spin" />
									Loading more
								</>
							) : (
								'See more'
							)}
						</Button>
					</div>
				) : null}
			</div>
		</div>
	)
}
