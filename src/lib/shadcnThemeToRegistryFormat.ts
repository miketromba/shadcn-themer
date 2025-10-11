import { z } from 'zod'
import type { ShadcnTheme } from './shadcnTheme'

// Zod schema for shadcn registry format
export const zShadcnRegistryItem = z.object({
	$schema: z.literal('https://ui.shadcn.com/schema/registry-item.json'),
	name: z.string(),
	type: z.literal('registry:style'),
	cssVars: z.object({
		theme: z.record(z.string(), z.string()),
		light: z.record(z.string(), z.string()),
		dark: z.record(z.string(), z.string())
	})
})

export type ShadcnRegistryItem = z.infer<typeof zShadcnRegistryItem>

/**
 * Converts a ShadcnTheme to the shadcn registry format
 */
export function shadcnThemeToRegistryFormat(
	themeData: ShadcnTheme,
	name: string
): ShadcnRegistryItem {
	const { theme, light, dark } = themeData

	// Build theme-level variables (shared between light and dark)
	const themeVars: Record<string, string> = {
		'font-sans': theme['font-sans'],
		'font-mono': theme['font-mono'],
		'font-serif': theme['font-serif'],
		radius: theme.radius
	}

	// Build light mode variables (all color + utility vars)
	const lightVars: Record<string, string> = {
		// Color variables
		background: light.background || '',
		foreground: light.foreground || '',
		card: light.card || '',
		'card-foreground': light['card-foreground'] || '',
		popover: light.popover || '',
		'popover-foreground': light['popover-foreground'] || '',
		primary: light.primary || '',
		'primary-foreground': light['primary-foreground'] || '',
		secondary: light.secondary || '',
		'secondary-foreground': light['secondary-foreground'] || '',
		muted: light.muted || '',
		'muted-foreground': light['muted-foreground'] || '',
		accent: light.accent || '',
		'accent-foreground': light['accent-foreground'] || '',
		destructive: light.destructive || '',
		border: light.border || '',
		input: light.input || '',
		ring: light.ring || '',
		'chart-1': light['chart-1'] || '',
		'chart-2': light['chart-2'] || '',
		'chart-3': light['chart-3'] || '',
		'chart-4': light['chart-4'] || '',
		'chart-5': light['chart-5'] || '',
		sidebar: light.sidebar || '',
		'sidebar-foreground': light['sidebar-foreground'] || '',
		'sidebar-primary': light['sidebar-primary'] || '',
		'sidebar-primary-foreground': light['sidebar-primary-foreground'] || '',
		'sidebar-accent': light['sidebar-accent'] || '',
		'sidebar-accent-foreground': light['sidebar-accent-foreground'] || '',
		'sidebar-border': light['sidebar-border'] || '',
		'sidebar-ring': light['sidebar-ring'] || '',
		// Utility variables
		radius: theme.radius,
		'font-sans': theme['font-sans'],
		'font-serif': theme['font-serif'],
		'font-mono': theme['font-mono']
	}

	// Build dark mode variables
	const darkVars: Record<string, string> = {
		// Color variables
		background: dark.background || '',
		foreground: dark.foreground || '',
		card: dark.card || '',
		'card-foreground': dark['card-foreground'] || '',
		popover: dark.popover || '',
		'popover-foreground': dark['popover-foreground'] || '',
		primary: dark.primary || '',
		'primary-foreground': dark['primary-foreground'] || '',
		secondary: dark.secondary || '',
		'secondary-foreground': dark['secondary-foreground'] || '',
		muted: dark.muted || '',
		'muted-foreground': dark['muted-foreground'] || '',
		accent: dark.accent || '',
		'accent-foreground': dark['accent-foreground'] || '',
		destructive: dark.destructive || '',
		border: dark.border || '',
		input: dark.input || '',
		ring: dark.ring || '',
		'chart-1': dark['chart-1'] || '',
		'chart-2': dark['chart-2'] || '',
		'chart-3': dark['chart-3'] || '',
		'chart-4': dark['chart-4'] || '',
		'chart-5': dark['chart-5'] || '',
		sidebar: dark.sidebar || '',
		'sidebar-foreground': dark['sidebar-foreground'] || '',
		'sidebar-primary': dark['sidebar-primary'] || '',
		'sidebar-primary-foreground': dark['sidebar-primary-foreground'] || '',
		'sidebar-accent': dark['sidebar-accent'] || '',
		'sidebar-accent-foreground': dark['sidebar-accent-foreground'] || '',
		'sidebar-border': dark['sidebar-border'] || '',
		'sidebar-ring': dark['sidebar-ring'] || '',
		// Utility variables
		radius: theme.radius,
		'font-sans': theme['font-sans'],
		'font-serif': theme['font-serif'],
		'font-mono': theme['font-mono']
	}

	// Remove empty values
	Object.keys(lightVars).forEach(
		key => lightVars[key] === '' && delete lightVars[key]
	)
	Object.keys(darkVars).forEach(
		key => darkVars[key] === '' && delete darkVars[key]
	)

	return {
		$schema: 'https://ui.shadcn.com/schema/registry-item.json',
		name,
		type: 'registry:style',
		cssVars: {
			theme: themeVars,
			light: lightVars,
			dark: darkVars
		}
	}
}
