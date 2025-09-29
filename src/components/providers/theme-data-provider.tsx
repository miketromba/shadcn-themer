'use client'

import * as React from 'react'
import type { ShadcnTheme, ShadcnThemeVars, ColorKey } from '@/lib/shadcnTheme'
import {
	getDefaultShadcnTheme,
	parseShadcnThemeFromJson
} from '@/lib/shadcnTheme'
import { useTheme as useThemeQuery, useUpdateTheme } from '@/api/client/themes'

type ThemeContextValue = {
	theme: ShadcnTheme | null
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

const PREVIEW_MODE_STORAGE_KEY = 'shadcn-themer-previewMode'

export function ThemeDataProvider({
	children,
	id
}: {
	children: React.ReactNode
	id?: string
}) {
	const { data } = useThemeQuery(id)
	const updateTheme = useUpdateTheme()

	const remoteThemeJson = data?.theme.json

	const [theme, setTheme] = React.useState<ShadcnTheme | null>(null)
	const [previewMode, setPreviewMode] = React.useState<'light' | 'dark'>(
		'light'
	)
	const [needsUpdate, setNeedsUpdate] = React.useState<boolean>(false)

	// Hydrate preview mode from localStorage on mount; only write after hydration
	const hasHydratedPreviewRef = React.useRef(false)
	React.useEffect(() => {
		if (typeof window === 'undefined') return
		try {
			const saved = window.localStorage.getItem(PREVIEW_MODE_STORAGE_KEY)
			if (saved === 'light' || saved === 'dark') {
				setPreviewMode(saved)
			}
		} catch {
		} finally {
			hasHydratedPreviewRef.current = true
		}
	}, [])
	React.useEffect(() => {
		if (!hasHydratedPreviewRef.current) return
		try {
			window.localStorage.setItem(PREVIEW_MODE_STORAGE_KEY, previewMode)
		} catch {}
	}, [previewMode])

	// Set initial theme on load
	React.useEffect(() => {
		if (remoteThemeJson) setTheme(remoteThemeJson)
	}, [remoteThemeJson])

	const updateVar = React.useCallback(
		(
			key: ColorKey,
			value: string,
			options?: { mode?: 'light' | 'dark' }
		) => {
			setTheme(prev => {
				const mode = options?.mode || 'light'
				const next: ShadcnTheme = {
					light: { ...(prev?.light || {}) },
					dark: { ...(prev?.dark || {}) }
				}
				;(next[mode] as Partial<ShadcnThemeVars>)[key] = value
				return next
			})
			setNeedsUpdate(true)
		},
		[]
	)

	const ctx: ThemeContextValue = React.useMemo(
		() => ({ theme, updateVar, previewMode, setPreviewMode }),
		[theme, updateVar, previewMode]
	)

	// Debounced auto-save when theme changes and id is present
	React.useEffect(() => {
		if (!id || !needsUpdate || !theme) return
		const handle = setTimeout(() => {
			updateTheme.mutate({ id, json: theme })
			setNeedsUpdate(false)
		}, 500)
		return () => clearTimeout(handle)
	}, [id, needsUpdate, theme, updateTheme])

	return (
		<ThemeDataContext.Provider value={ctx}>
			{children}
		</ThemeDataContext.Provider>
	)
}

export function useThemeData(): ThemeContextValue {
	return React.useContext(ThemeDataContext)
}
