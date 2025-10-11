'use client'

import * as React from 'react'
import type { ShadcnTheme, ShadcnThemeVars, ColorKey } from '@/lib/shadcnTheme'
import {
	getDefaultShadcnTheme,
	parseShadcnThemeFromJson
} from '@/lib/shadcnTheme'
import { useTheme as useThemeQuery, useUpdateTheme } from '@/api/client/themes'
import { EXAMPLE_IDS, type ExampleId } from '@/lib/colorExampleMapping'

type ThemeContextValue = {
	theme: ShadcnTheme | null
	id?: string
	updateVar: (
		key: ColorKey,
		value: string,
		options?: { mode?: 'light' | 'dark' }
	) => void
	previewMode: 'light' | 'dark'
	setPreviewMode: (mode: 'light' | 'dark') => void
	activeExample: ExampleId
	setActiveExample: (example: ExampleId) => void
	editingColorKey: ColorKey | null
	setEditingColorKey: (key: ColorKey | null) => void
}

const ThemeDataContext = React.createContext<ThemeContextValue>({
	theme: getDefaultShadcnTheme(),
	id: undefined,
	updateVar: () => {},
	previewMode: 'light',
	setPreviewMode: () => {},
	activeExample: EXAMPLE_IDS.CARDS,
	setActiveExample: () => {},
	editingColorKey: null,
	setEditingColorKey: () => {}
})

const PREVIEW_MODE_STORAGE_KEY = 'shadcn-themer-previewMode'

export function ThemeDataProvider({
	children,
	id,
	initialPreviewMode
}: {
	children: React.ReactNode
	id?: string
	initialPreviewMode?: 'light' | 'dark'
}) {
	const { data } = useThemeQuery(id)
	const updateTheme = useUpdateTheme()

	const remoteThemeJson = data?.theme.json

	const [theme, setTheme] = React.useState<ShadcnTheme | null>(null)
	const [previewMode, setPreviewMode] = React.useState<'light' | 'dark'>(
		() => {
			// Prefer explicitly provided initial mode if valid
			if (
				initialPreviewMode === 'light' ||
				initialPreviewMode === 'dark'
			) {
				return initialPreviewMode
			}
			if (typeof window !== 'undefined') {
				try {
					const saved = window.localStorage.getItem(
						PREVIEW_MODE_STORAGE_KEY
					)
					if (saved === 'light' || saved === 'dark') return saved
				} catch {}
			}
			return 'light'
		}
	)
	const [activeExample, setActiveExample] = React.useState<ExampleId>(
		EXAMPLE_IDS.CARDS
	)
	const [editingColorKey, setEditingColorKey] =
		React.useState<ColorKey | null>(null)
	const [needsUpdate, setNeedsUpdate] = React.useState<boolean>(false)

	// Persist preview mode changes
	React.useEffect(() => {
		if (typeof window === 'undefined') return
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
		() => ({
			theme,
			id,
			updateVar,
			previewMode,
			setPreviewMode,
			activeExample,
			setActiveExample,
			editingColorKey,
			setEditingColorKey
		}),
		[theme, id, updateVar, previewMode, activeExample, editingColorKey]
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
