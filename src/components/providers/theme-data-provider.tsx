'use client'

import * as React from 'react'
import type { ShadcnTheme, ShadcnThemeVars, ColorKey } from '@/lib/shadcnTheme'
import { getDefaultShadcnTheme } from '@/lib/shadcnTheme'
import { useTheme as useThemeQuery } from '@/api/client/themes'

type ThemeContextValue = {
	theme: ShadcnTheme
	updateVar: (
		key: ColorKey,
		value: string,
		options?: { mode?: 'light' | 'dark' }
	) => void
	previewMode: 'light' | 'dark'
	setPreviewMode: (mode: 'light' | 'dark') => void
}

const ThemeDataContext = React.createContext<ThemeContextValue>({
	theme: getDefaultShadcnTheme(),
	updateVar: () => {},
	previewMode: 'light',
	setPreviewMode: () => {}
})

export function ThemeDataProvider({
	children,
	id
}: {
	children: React.ReactNode
	id?: string
}) {
	const { data } = useThemeQuery(id)

	const [theme, setTheme] = React.useState<ShadcnTheme>(
		getDefaultShadcnTheme()
	)
	const [previewMode, setPreviewMode] = React.useState<'light' | 'dark'>(
		'light'
	)

	React.useEffect(() => {
		const apiTheme = (data as any)?.json as ShadcnTheme | undefined
		if (apiTheme) setTheme(apiTheme)
	}, [data])

	const updateVar = React.useCallback(
		(
			key: ColorKey,
			value: string,
			options?: { mode?: 'light' | 'dark' }
		) => {
			setTheme(prev => {
				const mode = options?.mode || 'light'
				const next: ShadcnTheme = {
					light: { ...(prev.light || {}) },
					dark: { ...(prev.dark || {}) }
				}
				;(next[mode] as Partial<ShadcnThemeVars>)[key] = value
				return next
			})
		},
		[]
	)

	const ctx: ThemeContextValue = React.useMemo(
		() => ({ theme, updateVar, previewMode, setPreviewMode }),
		[theme, updateVar, previewMode]
	)

	return (
		<ThemeDataContext.Provider value={ctx}>
			{children}
		</ThemeDataContext.Provider>
	)
}

export function useThemeData(): ThemeContextValue {
	return React.useContext(ThemeDataContext)
}
