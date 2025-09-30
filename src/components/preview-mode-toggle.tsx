'use client'

import * as React from 'react'
import { Sun, Moon } from 'lucide-react'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { Skeleton } from '@/components/ui/skeleton'
import { useThemeData } from '@/components/providers/theme-data-provider'

export function PreviewModeToggle() {
	const { previewMode, setPreviewMode } = useThemeData()
	const [mounted, setMounted] = React.useState(false)
	React.useEffect(() => setMounted(true), [])

	if (!mounted) {
		return <Skeleton className="h-9 w-16" />
	}

	return (
		<ToggleGroup
			type="single"
			value={previewMode}
			onValueChange={v => {
				if (v === 'light' || v === 'dark') setPreviewMode(v)
			}}
			className="shrink-0"
		>
			<ToggleGroupItem value="light" aria-label="Light mode preview">
				<Sun className="size-4" />
			</ToggleGroupItem>
			<ToggleGroupItem value="dark" aria-label="Dark mode preview">
				<Moon className="size-4" />
			</ToggleGroupItem>
		</ToggleGroup>
	)
}
