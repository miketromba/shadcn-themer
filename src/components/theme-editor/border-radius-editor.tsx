'use client'

import * as React from 'react'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { useThemeData } from '@/components/providers/theme-data-provider'

const RADIUS_PRESETS = [
	{ value: '0rem', label: 'None' },
	{ value: '0.375rem', label: 'SM' },
	{ value: '0.625rem', label: 'MD' },
	{ value: '1rem', label: 'LG' },
	{ value: '1.5rem', label: 'XL' }
] as const

export function BorderRadiusEditor() {
	const { theme, updateRadius } = useThemeData()

	if (!theme) {
		return null
	}

	const currentRadius = theme.theme.radius

	return (
		<div className="space-y-2">
			<div className="text-sm font-semibold">Border Radius</div>
			<ToggleGroup
				type="single"
				value={currentRadius}
				onValueChange={v => {
					if (v) updateRadius(v)
				}}
				variant="outline"
				size="sm"
				className="w-full"
			>
				{RADIUS_PRESETS.map(preset => (
					<ToggleGroupItem
						key={preset.value}
						value={preset.value}
						aria-label={`Border radius ${preset.label}`}
						className="data-[state=on]:bg-accent/70 data-[state=off]:text-accent-foreground/75 transition-colors flex-1"
					>
						{preset.label}
					</ToggleGroupItem>
				))}
			</ToggleGroup>
		</div>
	)
}
