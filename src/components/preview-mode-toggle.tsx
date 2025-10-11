'use client'

import * as React from 'react'
import { Sun, Moon } from 'lucide-react'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { Skeleton } from '@/components/ui/skeleton'
import { useThemeData } from '@/components/providers/theme-data-provider'

interface PreviewModeToggleProps {
	size?: 'default' | 'sm' | 'lg'
}

export function PreviewModeToggle({
	size = 'default'
}: PreviewModeToggleProps) {
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
			variant="outline"
			size={size}
			className="shrink-0"
		>
			<ToggleGroupItem
				value="light"
				aria-label="Light mode preview"
				className="data-[state=on]:bg-accent/70 transition-colors"
			>
				<Sun className="size-4" />
			</ToggleGroupItem>
			<ToggleGroupItem
				value="dark"
				aria-label="Dark mode preview"
				className="data-[state=on]:bg-accent/70 transition-colors"
			>
				<Moon className="size-4" />
			</ToggleGroupItem>
		</ToggleGroup>
	)
}
