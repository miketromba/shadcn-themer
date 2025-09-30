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
	mode = 'light',
	version,
	width,
	alt = 'Theme preview',
	className
}: ThemeScreenshotProps) {
	const [lightLoaded, setLightLoaded] = React.useState(false)
	const [darkLoaded, setDarkLoaded] = React.useState(false)
	// Track which modes have been requested for loading
	const [shouldLoadLight, setShouldLoadLight] = React.useState(
		mode === 'light'
	)
	const [shouldLoadDark, setShouldLoadDark] = React.useState(mode === 'dark')

	// When mode changes, trigger loading of the new mode's image
	React.useEffect(() => {
		if (mode === 'light' && !shouldLoadLight) {
			setShouldLoadLight(true)
		} else if (mode === 'dark' && !shouldLoadDark) {
			setShouldLoadDark(true)
		}
	}, [mode, shouldLoadLight, shouldLoadDark])

	// Generate URLs for both light and dark versions
	const createUrl = (themeMode: 'light' | 'dark') => {
		const params = new URLSearchParams()
		if (demo) params.set('demo', demo)
		params.set('mode', themeMode)
		if (version !== undefined) params.set('v', version.toString())
		if (width) params.set('width', width.toString())
		const query = params.toString()
		return `/api/screenshots/${id}${query ? `?${query}` : ''}`
	}

	const lightSrc = createUrl('light')
	const darkSrc = createUrl('dark')

	// Only show loading skeleton if the currently selected mode isn't loaded yet
	const isLoading =
		(mode === 'light' && !lightLoaded) || (mode === 'dark' && !darkLoaded)

	return (
		<div
			className={`relative w-full ${className || ''}`}
			style={{ aspectRatio: '16 / 10' }}
		>
			{isLoading && <ScreenshotSkeleton />}
			{/* Light mode screenshot - only render if we should load it */}
			{shouldLoadLight && (
				<img
					src={lightSrc}
					alt={`${alt} (light mode)`}
					className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
					onLoad={() => setLightLoaded(true)}
					onError={() => setLightLoaded(true)}
					style={{ opacity: mode === 'light' ? 1 : 0 }}
				/>
			)}
			{/* Dark mode screenshot - only render if we should load it */}
			{shouldLoadDark && (
				<img
					src={darkSrc}
					alt={`${alt} (dark mode)`}
					className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
					onLoad={() => setDarkLoaded(true)}
					onError={() => setDarkLoaded(true)}
					style={{ opacity: mode === 'dark' ? 1 : 0 }}
				/>
			)}
		</div>
	)
}
