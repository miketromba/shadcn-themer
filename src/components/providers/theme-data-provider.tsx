'use client'

import * as React from 'react'
import type { ShadcnTheme, ShadcnThemeVars, ColorKey } from '@/lib/shadcnTheme'
import {
	getDefaultShadcnTheme,
	parseShadcnThemeFromJson
} from '@/lib/shadcnTheme'
import { useTheme as useThemeQuery, useUpdateTheme } from '@/api/client/themes'
import { EXAMPLE_IDS, type ExampleId } from '@/lib/colorExampleMapping'
import { getLocalTheme, setLocalTheme } from '@/lib/localTheme'

type FontType = 'font-sans' | 'font-serif' | 'font-mono'

type ThemeContextValue = {
	theme: ShadcnTheme | null
	id?: string
	updateVar: (
		key: ColorKey,
		value: string,
		options?: { mode?: 'light' | 'dark' }
	) => void
	updateVarDirect: (
		key: ColorKey,
		value: string,
		options?: { mode?: 'light' | 'dark' }
	) => void
	updateRadius: (value: string) => void
	updateFont: (fontType: FontType, value: string) => void
	previewMode: 'light' | 'dark'
	setPreviewMode: (mode: 'light' | 'dark') => void
	activeExample: ExampleId
	setActiveExample: (example: ExampleId) => void
	editingColorKey: ColorKey | null
	setEditingColorKey: (key: ColorKey | null) => void
	themedScopeRef: React.MutableRefObject<HTMLDivElement | null>
}

const ThemeDataContext = React.createContext<ThemeContextValue>({
	theme: getDefaultShadcnTheme(),
	id: undefined,
	updateVar: () => {},
	updateVarDirect: () => {},
	updateRadius: () => {},
	updateFont: () => {},
	previewMode: 'light',
	setPreviewMode: () => {},
	activeExample: EXAMPLE_IDS.CARDS,
	setActiveExample: () => {},
	editingColorKey: null,
	setEditingColorKey: () => {},
	themedScopeRef: { current: null }
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
	const isLocalMode = id === 'local'

	// Only query remote theme if not in local mode
	const { data } = useThemeQuery(isLocalMode ? undefined : id)
	const updateTheme = useUpdateTheme()

	const remoteThemeJson = data?.theme.json

	// Always initialize with null to avoid hydration mismatch
	// We'll load from localStorage in an effect after mount
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
			return 'dark'
		}
	)
	const [activeExample, setActiveExample] = React.useState<ExampleId>(
		EXAMPLE_IDS.CARDS
	)
	const [editingColorKey, setEditingColorKey] =
		React.useState<ColorKey | null>(null)
	const [needsUpdate, setNeedsUpdate] = React.useState<boolean>(false)
	const themedScopeRef = React.useRef<HTMLDivElement | null>(null)

	// Persist preview mode changes
	React.useEffect(() => {
		if (typeof window === 'undefined') return
		try {
			window.localStorage.setItem(PREVIEW_MODE_STORAGE_KEY, previewMode)
		} catch {}
	}, [previewMode])

	// Load local theme from localStorage on mount (client-only, after hydration)
	React.useEffect(() => {
		if (isLocalMode) {
			const localData = getLocalTheme()
			setTheme(localData?.theme || getDefaultShadcnTheme())
		}
	}, [isLocalMode])

	// Set initial theme on load for remote themes
	React.useEffect(() => {
		if (!isLocalMode && remoteThemeJson) {
			setTheme(remoteThemeJson)
		}
	}, [isLocalMode, remoteThemeJson])

	const updateVarDirect = React.useCallback(
		(
			key: ColorKey,
			value: string,
			_options?: { mode?: 'light' | 'dark' }
		) => {
			// Directly update CSS variable in the DOM without triggering React re-render
			if (themedScopeRef.current) {
				themedScopeRef.current.style.setProperty(`--${key}`, value)
			}
		},
		[]
	)

	const updateVar = React.useCallback(
		(
			key: ColorKey,
			value: string,
			options?: { mode?: 'light' | 'dark' }
		) => {
			setTheme(prev => {
				if (!prev) return null
				const mode = options?.mode || 'light'
				const next: ShadcnTheme = {
					...prev,
					[mode]: { ...prev[mode], [key]: value }
				}
				return next
			})
			setNeedsUpdate(true)
		},
		[]
	)

	const updateRadius = React.useCallback((value: string) => {
		setTheme(prev => {
			if (!prev) return null
			const next: ShadcnTheme = {
				...prev,
				theme: { ...prev.theme, radius: value }
			}
			return next
		})
		setNeedsUpdate(true)
	}, [])

	const updateFont = React.useCallback(
		(fontType: FontType, value: string) => {
			setTheme(prev => {
				if (!prev) return null
				const next: ShadcnTheme = {
					...prev,
					theme: { ...prev.theme, [fontType]: value }
				}
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
			updateVarDirect,
			updateRadius,
			updateFont,
			previewMode,
			setPreviewMode,
			activeExample,
			setActiveExample,
			editingColorKey,
			setEditingColorKey,
			themedScopeRef
		}),
		[
			theme,
			id,
			updateVar,
			updateVarDirect,
			updateRadius,
			updateFont,
			previewMode,
			activeExample,
			editingColorKey
		]
	)

	// Debounced auto-save when theme changes and id is present
	React.useEffect(() => {
		if (!id || !needsUpdate || !theme) return

		const handle = setTimeout(() => {
			if (isLocalMode) {
				// Save to localStorage for local themes
				const localData = getLocalTheme()
				setLocalTheme(theme, localData?.name)
			} else {
				// Save to server for remote themes
				updateTheme.mutate({ id, json: theme })
			}
			setNeedsUpdate(false)
		}, 500)
		return () => clearTimeout(handle)
	}, [id, needsUpdate, theme, updateTheme, isLocalMode])

	return (
		<ThemeDataContext.Provider value={ctx}>
			{children}
		</ThemeDataContext.Provider>
	)
}

export function useThemeData(): ThemeContextValue {
	return React.useContext(ThemeDataContext)
}

export type { FontType }
