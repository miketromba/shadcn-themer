'use client'

import * as React from 'react'
import {
	useThemeData,
	type FontType
} from '@/components/providers/theme-data-provider'
import { FontPicker } from '@/components/theme-editor/font-picker'
import { extractFontName } from '@/lib/loadGoogleFont'
import { FONT_EXAMPLE_MAP } from '@/lib/colorExampleMapping'

interface FontSectionProps {
	label: string
	fontType: FontType
	currentValue: string
	onUpdate: (fontType: FontType, value: string) => void
}

function FontSection({
	label,
	fontType,
	currentValue,
	onUpdate
}: FontSectionProps) {
	const { setActiveExample } = useThemeData()
	const currentFontName = extractFontName(currentValue) || 'System Default'

	const handleOpenChange = React.useCallback(
		(open: boolean) => {
			if (open && FONT_EXAMPLE_MAP[fontType]) {
				setActiveExample(FONT_EXAMPLE_MAP[fontType])
			}
		},
		[fontType, setActiveExample]
	)

	return (
		<div className="flex items-center justify-between py-2">
			<div className="min-w-0 flex-1">
				<div className="text-sm font-medium">{label}</div>
				<div
					className="text-xs text-muted-foreground truncate"
					title={currentFontName}
				>
					{currentFontName}
				</div>
			</div>
			<FontPicker
				currentValue={currentValue}
				onSelect={value => onUpdate(fontType, value)}
				triggerText="Change"
				fontType={fontType}
				onOpenChange={handleOpenChange}
			/>
		</div>
	)
}

export function FontEditor() {
	const { theme, updateFont } = useThemeData()

	if (!theme) {
		return null
	}

	return (
		<div className="space-y-3 pt-4">
			<div className="text-sm font-semibold">Fonts</div>

			<div className="rounded-lg border bg-muted/50 p-3 text-xs leading-relaxed">
				<p className="text-muted-foreground">
					To use custom fonts, embed them in your project.{' '}
					<a
						href="https://tailwindcss.com/docs/font-family"
						target="_blank"
						rel="noopener noreferrer"
						className="underline hover:text-foreground transition-colors"
					>
						See Tailwind docs
					</a>{' '}
					for details.
				</p>
			</div>

			<div className="space-y-1">
				<FontSection
					label="Sans-serif"
					fontType="font-sans"
					currentValue={theme.theme['font-sans']}
					onUpdate={updateFont}
				/>
				<FontSection
					label="Serif"
					fontType="font-serif"
					currentValue={theme.theme['font-serif']}
					onUpdate={updateFont}
				/>
				<FontSection
					label="Monospace"
					fontType="font-mono"
					currentValue={theme.theme['font-mono']}
					onUpdate={updateFont}
				/>
			</div>
		</div>
	)
}
