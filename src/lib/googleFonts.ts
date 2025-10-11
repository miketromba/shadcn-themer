export type FontCategory = 'sans-serif' | 'serif' | 'monospace'

export interface GoogleFont {
	name: string
	category: FontCategory
	variants: string[]
	fallback: string
}

export const GOOGLE_FONTS: GoogleFont[] = [
	// Sans-serif fonts (~25 fonts)
	{
		name: 'Inter',
		category: 'sans-serif',
		variants: ['400', '500', '600', '700'],
		fallback: 'sans-serif'
	},
	{
		name: 'Roboto',
		category: 'sans-serif',
		variants: ['400', '500', '700'],
		fallback: 'sans-serif'
	},
	{
		name: 'Open Sans',
		category: 'sans-serif',
		variants: ['400', '600', '700'],
		fallback: 'sans-serif'
	},
	{
		name: 'Lato',
		category: 'sans-serif',
		variants: ['400', '700'],
		fallback: 'sans-serif'
	},
	{
		name: 'Poppins',
		category: 'sans-serif',
		variants: ['400', '500', '600', '700'],
		fallback: 'sans-serif'
	},
	{
		name: 'Montserrat',
		category: 'sans-serif',
		variants: ['400', '500', '600', '700'],
		fallback: 'sans-serif'
	},
	{
		name: 'Nunito',
		category: 'sans-serif',
		variants: ['400', '600', '700'],
		fallback: 'sans-serif'
	},
	{
		name: 'Raleway',
		category: 'sans-serif',
		variants: ['400', '500', '600', '700'],
		fallback: 'sans-serif'
	},
	{
		name: 'Work Sans',
		category: 'sans-serif',
		variants: ['400', '500', '600', '700'],
		fallback: 'sans-serif'
	},
	{
		name: 'Rubik',
		category: 'sans-serif',
		variants: ['400', '500', '600', '700'],
		fallback: 'sans-serif'
	},
	{
		name: 'DM Sans',
		category: 'sans-serif',
		variants: ['400', '500', '700'],
		fallback: 'sans-serif'
	},
	{
		name: 'Manrope',
		category: 'sans-serif',
		variants: ['400', '500', '600', '700'],
		fallback: 'sans-serif'
	},
	{
		name: 'Space Grotesk',
		category: 'sans-serif',
		variants: ['400', '500', '600', '700'],
		fallback: 'sans-serif'
	},
	{
		name: 'Plus Jakarta Sans',
		category: 'sans-serif',
		variants: ['400', '500', '600', '700'],
		fallback: 'sans-serif'
	},
	{
		name: 'Outfit',
		category: 'sans-serif',
		variants: ['400', '500', '600', '700'],
		fallback: 'sans-serif'
	},
	{
		name: 'Lexend',
		category: 'sans-serif',
		variants: ['400', '500', '600', '700'],
		fallback: 'sans-serif'
	},
	{
		name: 'Figtree',
		category: 'sans-serif',
		variants: ['400', '500', '600', '700'],
		fallback: 'sans-serif'
	},
	{
		name: 'Karla',
		category: 'sans-serif',
		variants: ['400', '500', '600', '700'],
		fallback: 'sans-serif'
	},
	{
		name: 'Sora',
		category: 'sans-serif',
		variants: ['400', '500', '600', '700'],
		fallback: 'sans-serif'
	},
	{
		name: 'Public Sans',
		category: 'sans-serif',
		variants: ['400', '500', '600', '700'],
		fallback: 'sans-serif'
	},

	// Serif fonts (~15 fonts)
	{
		name: 'Playfair Display',
		category: 'serif',
		variants: ['400', '500', '600', '700'],
		fallback: 'serif'
	},
	{
		name: 'Merriweather',
		category: 'serif',
		variants: ['400', '700'],
		fallback: 'serif'
	},
	{
		name: 'Lora',
		category: 'serif',
		variants: ['400', '500', '600', '700'],
		fallback: 'serif'
	},
	{
		name: 'Crimson Text',
		category: 'serif',
		variants: ['400', '600', '700'],
		fallback: 'serif'
	},
	{
		name: 'Source Serif 4',
		category: 'serif',
		variants: ['400', '500', '600', '700'],
		fallback: 'serif'
	},
	{
		name: 'Libre Baskerville',
		category: 'serif',
		variants: ['400', '700'],
		fallback: 'serif'
	},
	{
		name: 'EB Garamond',
		category: 'serif',
		variants: ['400', '500', '600', '700'],
		fallback: 'serif'
	},
	{
		name: 'Cormorant Garamond',
		category: 'serif',
		variants: ['400', '500', '600', '700'],
		fallback: 'serif'
	},
	{
		name: 'Spectral',
		category: 'serif',
		variants: ['400', '500', '600', '700'],
		fallback: 'serif'
	},
	{
		name: 'Bitter',
		category: 'serif',
		variants: ['400', '500', '600', '700'],
		fallback: 'serif'
	},
	{
		name: 'Cardo',
		category: 'serif',
		variants: ['400', '700'],
		fallback: 'serif'
	},
	{
		name: 'Literata',
		category: 'serif',
		variants: ['400', '500', '600', '700'],
		fallback: 'serif'
	},
	{
		name: 'Newsreader',
		category: 'serif',
		variants: ['400', '500', '600', '700'],
		fallback: 'serif'
	},
	{
		name: 'Fraunces',
		category: 'serif',
		variants: ['400', '500', '600', '700'],
		fallback: 'serif'
	},
	{
		name: 'Crimson Pro',
		category: 'serif',
		variants: ['400', '500', '600', '700'],
		fallback: 'serif'
	},

	// Monospace fonts (~12 fonts)
	{
		name: 'JetBrains Mono',
		category: 'monospace',
		variants: ['400', '500', '600', '700'],
		fallback: 'monospace'
	},
	{
		name: 'Fira Code',
		category: 'monospace',
		variants: ['400', '500', '600', '700'],
		fallback: 'monospace'
	},
	{
		name: 'Source Code Pro',
		category: 'monospace',
		variants: ['400', '500', '600', '700'],
		fallback: 'monospace'
	},
	{
		name: 'IBM Plex Mono',
		category: 'monospace',
		variants: ['400', '500', '600', '700'],
		fallback: 'monospace'
	},
	{
		name: 'Roboto Mono',
		category: 'monospace',
		variants: ['400', '500', '600', '700'],
		fallback: 'monospace'
	},
	{
		name: 'Space Mono',
		category: 'monospace',
		variants: ['400', '700'],
		fallback: 'monospace'
	},
	{
		name: 'Inconsolata',
		category: 'monospace',
		variants: ['400', '500', '600', '700'],
		fallback: 'monospace'
	},
	{
		name: 'Ubuntu Mono',
		category: 'monospace',
		variants: ['400', '700'],
		fallback: 'monospace'
	},
	{
		name: 'Courier Prime',
		category: 'monospace',
		variants: ['400', '700'],
		fallback: 'monospace'
	},
	{
		name: 'Red Hat Mono',
		category: 'monospace',
		variants: ['400', '500', '600', '700'],
		fallback: 'monospace'
	},
	{
		name: 'Anonymous Pro',
		category: 'monospace',
		variants: ['400', '700'],
		fallback: 'monospace'
	},
	{
		name: 'Azeret Mono',
		category: 'monospace',
		variants: ['400', '500', '600', '700'],
		fallback: 'monospace'
	}
]

// Helper function to get fonts by category
export function getFontsByCategory(category: FontCategory): GoogleFont[] {
	return GOOGLE_FONTS.filter(font => font.category === category)
}

// Helper function to find font by name
export function getFontByName(name: string): GoogleFont | undefined {
	return GOOGLE_FONTS.find(font => font.name === name)
}

// Helper function to build font-family CSS value
export function buildFontFamily(fontName: string): string {
	const font = getFontByName(fontName)
	if (!font) return fontName

	// Build appropriate fallback stack based on category
	let fallbackStack = ''
	if (font.category === 'sans-serif') {
		fallbackStack = 'system-ui, -apple-system, sans-serif'
	} else if (font.category === 'serif') {
		fallbackStack = 'Georgia, serif'
	} else {
		fallbackStack = 'ui-monospace, monospace'
	}

	return `'${fontName}', ${fallbackStack}`
}
