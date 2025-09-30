'use client'

import * as React from 'react'
import { Skeleton } from '@/components/ui/skeleton'

type ThemeScreenshotProps = {
	id: string
	demo?: string
	mode?: 'light' | 'dark'
	version?: number
	width?: number
	alt?: string
	className?: string
}

function ScreenshotSkeleton() {
	return (
		<div className="absolute inset-0 bg-muted/50">
			<div className="flex h-full">
				{/* Sidebar */}
				<div className="w-1/5 border-r border-border/50 p-3 flex flex-col gap-2">
					<Skeleton className="h-2 w-full rounded" />
					<Skeleton className="h-1 w-3/4 rounded" />
					<Skeleton className="h-1 w-full rounded" />
					<Skeleton className="h-1 w-2/3 rounded" />
					<Skeleton className="h-1 w-3/4 rounded" />
					<Skeleton className="h-1 w-full rounded" />
					<Skeleton className="h-1 w-2/3 rounded" />
					<div className="flex-1" />
					<Skeleton className="h-2 w-full rounded" />
				</div>

				{/* Main content */}
				<div className="flex-1 flex flex-col">
					{/* Header */}
					<div className="h-14 border-b border-border/50 px-4 flex items-center gap-2.5">
						<Skeleton className="h-8 flex-1 rounded" />
						<Skeleton className="h-8 w-24 rounded" />
					</div>

					{/* Content area */}
					<div className="flex-1 p-4 grid grid-cols-3 gap-2.5">
						<Skeleton className="rounded" />
						<Skeleton className="rounded" />
						<Skeleton className="rounded" />
						<Skeleton className="rounded col-span-2" />
						<Skeleton className="rounded" />
					</div>
				</div>
			</div>
		</div>
	)
}

export function ThemeScreenshot({
	id,
	demo,
	mode,
	version,
	width,
	alt = 'Theme preview',
	className
}: ThemeScreenshotProps) {
	const [isLoading, setIsLoading] = React.useState(true)

	const params = new URLSearchParams()
	if (demo) params.set('demo', demo)
	if (mode) params.set('mode', mode)
	if (version !== undefined) params.set('v', version.toString())
	if (width) params.set('width', width.toString())

	const query = params.toString()
	const src = `/api/screenshots/${id}${query ? `?${query}` : ''}`

	return (
		<div
			className={`relative w-full ${className || ''}`}
			style={{ aspectRatio: '16 / 10' }}
		>
			{isLoading && <ScreenshotSkeleton />}
			<img
				src={src}
				alt={alt}
				className="w-full h-full object-cover"
				onLoad={() => setIsLoading(false)}
				onError={() => setIsLoading(false)}
				style={{ opacity: isLoading ? 0 : 1 }}
			/>
		</div>
	)
}
