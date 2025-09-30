'use client'

import * as React from 'react'
import type { ShadcnTheme } from '@/lib/shadcnTheme'
import { useThemeData } from '@/components/providers/theme-data-provider'

type ThemeVars = NonNullable<ShadcnTheme['light']>

const varsToInlineStyle = (
	vars?: Partial<ThemeVars>
): React.CSSProperties | undefined => {
	if (!vars) return undefined
	const style: React.CSSProperties = {}
	for (const [key, value] of Object.entries(vars)) {
		if (typeof value !== 'string' || value.trim().length === 0) continue
		;(style as unknown as Record<string, string>)[`--${key}`] = value
	}
	return style
}

export function ThemedScope({
	children,
	theme
}: {
	children: React.ReactNode
	theme?: ShadcnTheme
}) {
	const { theme: ctxTheme, previewMode } = useThemeData()
	const effectiveTheme = theme ?? ctxTheme

	// Avoid SSR mismatch: default previewMode is light on first render
	const applied =
		previewMode === 'dark' ? effectiveTheme?.dark : effectiveTheme?.light
	const style = React.useMemo(() => varsToInlineStyle(applied), [applied])
	const wrapperClass = previewMode === 'dark' ? 'dark' : undefined

	// Mark when theme is ready for screenshot service
	const isThemeReady = effectiveTheme !== null && applied !== undefined

	return (
		<div
			className={wrapperClass}
			style={style}
			data-theme-ready={isThemeReady ? 'true' : 'false'}
			suppressHydrationWarning
		>
			{children}
		</div>
	)
}
