'use client'

import * as React from 'react'
import type { ShadcnTheme } from '@/lib/shadcnTheme'
import { useThemeData } from '@/components/providers/theme-data-provider'
import { cn } from '@/lib/utils'

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

// Context for providing portal container to child components
const PortalContainerContext = React.createContext<HTMLElement | null>(null)

export function usePortalContainer() {
	return React.useContext(PortalContainerContext)
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
	const portalContainerRef = React.useRef<HTMLDivElement>(null)

	// Avoid SSR mismatch: default previewMode is light on first render
	const applied =
		previewMode === 'dark' ? effectiveTheme?.dark : effectiveTheme?.light
	const colorStyle = React.useMemo(
		() => varsToInlineStyle(applied),
		[applied]
	)

	// Add shared theme properties like radius, fonts
	const style = React.useMemo(() => {
		const sharedStyle: React.CSSProperties = {
			...colorStyle
		}
		if (effectiveTheme?.theme?.radius) {
			;(sharedStyle as unknown as Record<string, string>)['--radius'] =
				effectiveTheme.theme.radius
		}
		return sharedStyle
	}, [colorStyle, effectiveTheme?.theme?.radius])

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
			<PortalContainerContext.Provider value={portalContainerRef.current}>
				{children}
				{/* Portal container for Radix UI portals - inherits theme variables */}
				<div
					ref={portalContainerRef}
					className={cn(
						wrapperClass,
						'bg-background text-foreground'
					)}
					style={style}
					suppressHydrationWarning
				/>
			</PortalContainerContext.Provider>
		</div>
	)
}
