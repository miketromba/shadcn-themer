import { getDefaultShadcnTheme, type ShadcnTheme } from '@/lib/shadcnTheme'

// Simple 1:1 mapping for VSCode to Shadcn conversion
export const vscodeToShadcnMapping: Record<string, string> = {
	// Core colors
	background: 'editor.background',
	foreground: 'editor.foreground',

	// Card colors - use sidebar background for subtle distinction
	card: 'sideBar.background',
	'card-foreground': 'sideBar.foreground',

	// Popover colors
	popover: 'editorHoverWidget.background',
	'popover-foreground': 'editorHoverWidget.foreground',

	// Primary action colors
	primary: 'button.background',
	'primary-foreground': 'button.foreground',

	// Secondary action colors
	secondary: 'button.secondaryBackground',
	'secondary-foreground': 'button.secondaryForeground',

	// Muted/subtle colors - use tab backgrounds for muted, and better contrast for text
	muted: 'editorGroupHeader.tabsBackground',
	'muted-foreground': 'editorSuggestWidget.foreground',

	// Accent colors
	accent: 'list.activeSelectionBackground',
	'accent-foreground': 'list.activeSelectionForeground',

	// Destructive/error colors
	destructive: 'editorError.foreground',

	// Border colors - use subtle indent guides instead of panel border
	border: 'editorIndentGuide.background',

	// Input colors - use actual input background
	input: 'input.background',

	// Focus ring
	ring: 'focusBorder',

	// Chart colors
	'chart-1': 'terminal.ansiBlue',
	'chart-2': 'terminal.ansiGreen',
	'chart-3': 'terminal.ansiYellow',
	'chart-4': 'terminal.ansiMagenta',
	'chart-5': 'terminal.ansiRed',

	// Sidebar specific
	sidebar: 'sideBar.background',
	'sidebar-foreground': 'sideBar.foreground',
	'sidebar-primary': 'activityBarBadge.background',
	'sidebar-primary-foreground': 'activityBarBadge.foreground',
	'sidebar-accent': 'list.hoverBackground',
	'sidebar-accent-foreground': 'list.hoverForeground',
	'sidebar-border': 'sideBar.border',
	'sidebar-ring': 'list.focusBackground'
}

/**
 * Convert hex color to OKLCH format
 * This is a simplified conversion - for production, consider using a library like culori
 */
function hexToOklch(hex: string): string {
	// Remove # if present
	const cleanHex = hex.replace('#', '')

	// Parse RGB values
	let r: number,
		g: number,
		b: number,
		a = 1

	if (cleanHex.length === 8) {
		// RGBA format
		r = parseInt(cleanHex.slice(0, 2), 16) / 255
		g = parseInt(cleanHex.slice(2, 4), 16) / 255
		b = parseInt(cleanHex.slice(4, 6), 16) / 255
		a = parseInt(cleanHex.slice(6, 8), 16) / 255
	} else if (cleanHex.length === 6) {
		// RGB format
		r = parseInt(cleanHex.slice(0, 2), 16) / 255
		g = parseInt(cleanHex.slice(2, 4), 16) / 255
		b = parseInt(cleanHex.slice(4, 6), 16) / 255
	} else if (cleanHex.length === 3) {
		// Short RGB format
		r = parseInt(cleanHex[0] + cleanHex[0], 16) / 255
		g = parseInt(cleanHex[1] + cleanHex[1], 16) / 255
		b = parseInt(cleanHex[2] + cleanHex[2], 16) / 255
	} else {
		console.warn(`Invalid hex color: ${hex}`)
		return 'oklch(0.5 0 0)'
	}

	// Convert RGB to Linear RGB
	const toLinear = (c: number): number => {
		return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
	}

	const rLinear = toLinear(r)
	const gLinear = toLinear(g)
	const bLinear = toLinear(b)

	// Convert Linear RGB to XYZ (D65 illuminant)
	const x = rLinear * 0.4124564 + gLinear * 0.3575761 + bLinear * 0.1804375
	const y = rLinear * 0.2126729 + gLinear * 0.7151522 + bLinear * 0.072175
	const z = rLinear * 0.0193339 + gLinear * 0.119192 + bLinear * 0.9503041

	// Convert XYZ to OKLab
	const l_ = Math.cbrt(0.8189330101 * x + 0.3618667424 * y - 0.1288597137 * z)
	const m_ = Math.cbrt(0.0329845436 * x + 0.9293118715 * y + 0.0361456387 * z)
	const s_ = Math.cbrt(0.0482003018 * x + 0.2643662691 * y + 0.633851707 * z)

	const l = 0.2104542553 * l_ + 0.793617785 * m_ - 0.0040720468 * s_
	const a_oklab = 1.9779984951 * l_ - 2.428592205 * m_ + 0.4505937099 * s_
	const b_oklab = 0.0259040371 * l_ + 0.7827717662 * m_ - 0.808675766 * s_

	// Convert OKLab to OKLCH
	const lightness = l
	const chroma = Math.sqrt(a_oklab * a_oklab + b_oklab * b_oklab)
	let hue = Math.atan2(b_oklab, a_oklab) * (180 / Math.PI)
	if (hue < 0) hue += 360

	// Format the output
	const L = Math.max(0, Math.min(1, lightness)).toFixed(3)
	const C = Math.max(0, chroma).toFixed(3)
	const H = hue.toFixed(3)

	if (a < 1) {
		return `oklch(${L} ${C} ${H} / ${(a * 100).toFixed(0)}%)`
	}

	return `oklch(${L} ${C} ${H})`
}

interface VscodeTheme {
	colors?: Record<string, string>
	name?: string
	[key: string]: unknown
}

/**
 * Convert a VSCode theme to a Shadcn theme
 * @param vscodeTheme - The VSCode theme object
 * @param type - Whether this is a 'light' or 'dark' theme
 */
export function vscodeThemeToShadcn(
	vscodeTheme: VscodeTheme,
	type: 'light' | 'dark'
): ShadcnTheme {
	const shadcnTheme = getDefaultShadcnTheme()
	const colors = vscodeTheme.colors || {}

	// Apply each mapping to the appropriate theme mode
	for (const [shadcnKey, vscodeKey] of Object.entries(
		vscodeToShadcnMapping
	)) {
		const vscodeColor = colors[vscodeKey]
		if (vscodeColor) {
			try {
				const oklchColor = hexToOklch(vscodeColor)
				// Apply to the specified theme mode
				if (type === 'light' && shadcnTheme.light) {
					;(shadcnTheme.light as Record<string, string>)[shadcnKey] =
						oklchColor
				} else if (type === 'dark' && shadcnTheme.dark) {
					;(shadcnTheme.dark as Record<string, string>)[shadcnKey] =
						oklchColor
				}
			} catch (error) {
				console.warn(
					`Failed to convert color ${vscodeKey}: ${vscodeColor}`,
					error
				)
			}
		}
	}

	return shadcnTheme
}
