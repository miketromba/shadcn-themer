import type { ShadcnTheme } from './shadcnTheme'

// Ordered list of color variables to include
const COLOR_VAR_ORDER = [
	'background',
	'foreground',
	'card',
	'card-foreground',
	'popover',
	'popover-foreground',
	'primary',
	'primary-foreground',
	'secondary',
	'secondary-foreground',
	'muted',
	'muted-foreground',
	'accent',
	'accent-foreground',
	'destructive',
	'border',
	'input',
	'ring',
	'chart-1',
	'chart-2',
	'chart-3',
	'chart-4',
	'chart-5',
	'sidebar',
	'sidebar-foreground',
	'sidebar-primary',
	'sidebar-primary-foreground',
	'sidebar-accent',
	'sidebar-accent-foreground',
	'sidebar-border',
	'sidebar-ring'
] as const

/**
 * Generates a complete CSS export from a ShadcnTheme
 */
export function generateThemeCSS(themeData: ShadcnTheme): string {
	const { theme, light, dark } = themeData

	// Generate color variables in order for :root
	const rootColorVars = COLOR_VAR_ORDER.map(key => {
		const value = light[key as keyof typeof light]
		return value ? `  --${key}: ${value};` : null
	}).filter(Boolean)

	// Generate :root block
	const rootVars = [
		...rootColorVars,
		`  --font-sans: ${theme['font-sans']};`,
		`  --font-serif: ${theme['font-serif']};`,
		`  --font-mono: ${theme['font-mono']};`,
		`  --radius: ${theme.radius};`
	]

	// Generate color variables in order for .dark
	const darkColorVars = COLOR_VAR_ORDER.map(key => {
		const value = dark[key as keyof typeof dark]
		return value ? `  --${key}: ${value};` : null
	}).filter(Boolean)

	// Generate .dark block
	const darkVars = [
		...darkColorVars,
		`  --font-sans: ${theme['font-sans']};`,
		`  --font-serif: ${theme['font-serif']};`,
		`  --font-mono: ${theme['font-mono']};`,
		`  --radius: ${theme.radius};`
	]

	// Generate @theme inline block
	const themeInlineVars = [
		'  --color-background: var(--background);',
		'  --color-foreground: var(--foreground);',
		'  --color-card: var(--card);',
		'  --color-card-foreground: var(--card-foreground);',
		'  --color-popover: var(--popover);',
		'  --color-popover-foreground: var(--popover-foreground);',
		'  --color-primary: var(--primary);',
		'  --color-primary-foreground: var(--primary-foreground);',
		'  --color-secondary: var(--secondary);',
		'  --color-secondary-foreground: var(--secondary-foreground);',
		'  --color-muted: var(--muted);',
		'  --color-muted-foreground: var(--muted-foreground);',
		'  --color-accent: var(--accent);',
		'  --color-accent-foreground: var(--accent-foreground);',
		'  --color-destructive: var(--destructive);',
		'  --color-border: var(--border);',
		'  --color-input: var(--input);',
		'  --color-ring: var(--ring);',
		'  --color-chart-1: var(--chart-1);',
		'  --color-chart-2: var(--chart-2);',
		'  --color-chart-3: var(--chart-3);',
		'  --color-chart-4: var(--chart-4);',
		'  --color-chart-5: var(--chart-5);',
		'  --color-sidebar: var(--sidebar);',
		'  --color-sidebar-foreground: var(--sidebar-foreground);',
		'  --color-sidebar-primary: var(--sidebar-primary);',
		'  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);',
		'  --color-sidebar-accent: var(--sidebar-accent);',
		'  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);',
		'  --color-sidebar-border: var(--sidebar-border);',
		'  --color-sidebar-ring: var(--sidebar-ring);',
		'',
		'  --font-sans: var(--font-sans);',
		'  --font-mono: var(--font-mono);',
		'  --font-serif: var(--font-serif);',
		'',
		'  --radius-sm: calc(var(--radius) - 4px);',
		'  --radius-md: calc(var(--radius) - 2px);',
		'  --radius-lg: var(--radius);',
		'  --radius-xl: calc(var(--radius) + 4px);'
	]

	// Combine all blocks
	return `:root {
${rootVars.join('\n')}
}

.dark {
${darkVars.join('\n')}
}

@theme inline {
${themeInlineVars.join('\n')}
}`
}
