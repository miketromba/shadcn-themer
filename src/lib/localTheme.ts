import { ShadcnTheme, getDefaultShadcnTheme } from './shadcnTheme'

const LOCAL_THEME_KEY = 'shadcn-themer-local-theme'
const LOCAL_THEME_NAME_KEY = 'shadcn-themer-local-theme-name'

export interface LocalThemeData {
	theme: ShadcnTheme
	name: string
	updatedAt: string
}

/**
 * Check if a local theme exists in localStorage
 */
export function hasLocalTheme(): boolean {
	if (typeof window === 'undefined') return false
	try {
		const stored = window.localStorage.getItem(LOCAL_THEME_KEY)
		return stored !== null
	} catch (error) {
		console.error('Error checking for local theme:', error)
		return false
	}
}

/**
 * Get the local theme from localStorage
 * Returns null if no theme exists or if there's an error
 */
export function getLocalTheme(): LocalThemeData | null {
	if (typeof window === 'undefined') return null
	try {
		const stored = window.localStorage.getItem(LOCAL_THEME_KEY)
		const storedName = window.localStorage.getItem(LOCAL_THEME_NAME_KEY)

		if (!stored) return null

		const parsed = JSON.parse(stored) as LocalThemeData

		// Ensure backwards compatibility if name was stored separately
		if (!parsed.name && storedName) {
			parsed.name = storedName
		}

		// Validate that we have a theme object
		if (!parsed.theme) {
			console.error('Invalid local theme data')
			return null
		}

		return parsed
	} catch (error) {
		console.error('Error retrieving local theme:', error)
		return null
	}
}

/**
 * Save a theme to localStorage
 */
export function setLocalTheme(theme: ShadcnTheme, name?: string): boolean {
	if (typeof window === 'undefined') return false
	try {
		const data: LocalThemeData = {
			theme,
			name: name || 'Untitled Theme',
			updatedAt: new Date().toISOString()
		}

		window.localStorage.setItem(LOCAL_THEME_KEY, JSON.stringify(data))

		return true
	} catch (error) {
		// Handle quota exceeded or other localStorage errors
		if (error instanceof Error && error.name === 'QuotaExceededError') {
			console.error('localStorage quota exceeded')
		} else {
			console.error('Error saving local theme:', error)
		}
		return false
	}
}

/**
 * Update just the name of the local theme
 */
export function setLocalThemeName(name: string): boolean {
	if (typeof window === 'undefined') return false
	try {
		const current = getLocalTheme()
		if (!current) return false

		return setLocalTheme(current.theme, name)
	} catch (error) {
		console.error('Error updating local theme name:', error)
		return false
	}
}

/**
 * Clear the local theme from localStorage
 */
export function clearLocalTheme(): boolean {
	if (typeof window === 'undefined') return false
	try {
		window.localStorage.removeItem(LOCAL_THEME_KEY)
		window.localStorage.removeItem(LOCAL_THEME_NAME_KEY) // Clean up old storage
		return true
	} catch (error) {
		console.error('Error clearing local theme:', error)
		return false
	}
}

/**
 * Initialize a new local theme with default values
 */
export function initializeLocalTheme(
	baseTheme?: ShadcnTheme,
	name?: string
): boolean {
	const theme = baseTheme || getDefaultShadcnTheme()
	return setLocalTheme(theme, name || 'Untitled Theme')
}
