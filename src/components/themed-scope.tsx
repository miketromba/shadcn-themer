'use client'

import * as React from 'react'
import { useTheme } from 'next-themes'
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
	const { theme: ctxTheme } = useThemeData()
	const effectiveTheme = theme ?? ctxTheme
	const { resolvedTheme } = useTheme()

	const [mounted, setMounted] = React.useState(false)
	React.useEffect(() => setMounted(true), [])

	const isDark = resolvedTheme === 'dark'
	const applied = mounted
		? isDark
			? effectiveTheme?.dark
			: effectiveTheme?.light
		: effectiveTheme?.light
	const style = React.useMemo(() => varsToInlineStyle(applied), [applied])

	return <div style={style}>{children}</div>
}
