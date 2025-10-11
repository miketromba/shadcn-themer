// Track loaded fonts to avoid duplicate loads
const loadedFonts = new Set<string>()
const loadingFonts = new Map<string, Promise<void>>()

export interface LoadFontOptions {
	preload?: boolean
	weights?: string[]
}

/**
 * Dynamically load a Google Font
 * @param fontName - The name of the Google Font to load
 * @param options - Loading options
 * @returns Promise that resolves when the font is loaded
 */
export function loadGoogleFont(
	fontName: string,
	options: LoadFontOptions = {}
): Promise<void> {
	// Only run on client-side
	if (typeof window === 'undefined') {
		return Promise.resolve()
	}

	const { weights = ['400', '500', '600', '700'] } = options

	// Check if already loaded
	if (loadedFonts.has(fontName)) {
		return Promise.resolve()
	}

	// Check if currently loading
	if (loadingFonts.has(fontName)) {
		return loadingFonts.get(fontName)!
	}

	// Create load promise
	const loadPromise = new Promise<void>((resolve, reject) => {
		// Dynamically import webfontloader only on client side
		import('webfontloader')
			.then(WebFont => {
				try {
					// Build font family string with weights
					const fontFamily = `${fontName}:${weights.join(',')}`

					WebFont.default.load({
						google: {
							families: [fontFamily]
						},
						active: () => {
							loadedFonts.add(fontName)
							loadingFonts.delete(fontName)
							resolve()
						},
						inactive: () => {
							loadingFonts.delete(fontName)
							reject(
								new Error(`Failed to load font: ${fontName}`)
							)
						},
						timeout: 5000 // 5 second timeout
					})
				} catch (error) {
					loadingFonts.delete(fontName)
					reject(error)
				}
			})
			.catch(error => {
				loadingFonts.delete(fontName)
				reject(error)
			})
	})

	loadingFonts.set(fontName, loadPromise)
	return loadPromise
}

/**
 * Extract the primary font name from a font-family CSS value
 * @param fontFamily - CSS font-family value (e.g., "'Inter', system-ui, sans-serif")
 * @returns The primary font name or null
 */
export function extractFontName(fontFamily: string): string | null {
	if (!fontFamily) return null

	// Match quoted font name or first unquoted name
	const match = fontFamily.match(/['"]([^'"]+)['"]|^([^,]+)/)
	if (match) {
		return (match[1] || match[2]).trim()
	}

	return null
}

/**
 * Check if a font is a Google Font (not a system font)
 * @param fontName - The font name to check
 * @returns true if it appears to be a custom Google Font
 */
export function isCustomFont(fontName: string): boolean {
	const systemFonts = [
		'system-ui',
		'ui-sans-serif',
		'ui-serif',
		'ui-monospace',
		'-apple-system',
		'BlinkMacSystemFont',
		'Segoe UI',
		'Roboto',
		'Helvetica Neue',
		'Arial',
		'Noto Sans',
		'sans-serif',
		'Apple Color Emoji',
		'Segoe UI Emoji',
		'Segoe UI Symbol',
		'Noto Color Emoji',
		'Georgia',
		'Cambria',
		'Times New Roman',
		'Times',
		'serif',
		'SFMono-Regular',
		'Menlo',
		'Monaco',
		'Consolas',
		'Liberation Mono',
		'Courier New',
		'monospace'
	]

	return !systemFonts.some(
		sys => sys.toLowerCase() === fontName.toLowerCase()
	)
}

/**
 * Load all custom fonts from a theme's font configuration
 * @param fontSans - The sans-serif font-family value
 * @param fontSerif - The serif font-family value
 * @param fontMono - The monospace font-family value
 */
export async function loadThemeFonts(
	fontSans?: string,
	fontSerif?: string,
	fontMono?: string
): Promise<void> {
	const fonts = [fontSans, fontSerif, fontMono].filter(Boolean) as string[]

	const loadPromises = fonts
		.map(extractFontName)
		.filter((name): name is string => name !== null && isCustomFont(name))
		.map(name => loadGoogleFont(name).catch(err => console.warn(err)))

	await Promise.all(loadPromises)
}
