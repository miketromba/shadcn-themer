import { z } from 'zod'

export const zShadcnThemeVars = z
	.object({
		background: z.string(),
		foreground: z.string(),
		card: z.string(),
		'card-foreground': z.string(),
		popover: z.string(),
		'popover-foreground': z.string(),
		primary: z.string(),
		'primary-foreground': z.string(),
		secondary: z.string(),
		'secondary-foreground': z.string(),
		muted: z.string(),
		'muted-foreground': z.string(),
		accent: z.string(),
		'accent-foreground': z.string(),
		destructive: z.string(),
		border: z.string(),
		input: z.string(),
		ring: z.string(),
		'chart-1': z.string(),
		'chart-2': z.string(),
		'chart-3': z.string(),
		'chart-4': z.string(),
		'chart-5': z.string(),
		sidebar: z.string(),
		'sidebar-foreground': z.string(),
		'sidebar-primary': z.string(),
		'sidebar-primary-foreground': z.string(),
		'sidebar-accent': z.string(),
		'sidebar-accent-foreground': z.string(),
		'sidebar-border': z.string(),
		'sidebar-ring': z.string()
	})
	.strict()

export const zShadcnThemeShared = z
	.object({
		'font-sans': z.string(),
		'font-serif': z.string(),
		'font-mono': z.string(),
		radius: z.string()
	})
	.strict()

export const zShadcnTheme = z
	.object({
		theme: zShadcnThemeShared,
		light: zShadcnThemeVars.partial(),
		dark: zShadcnThemeVars.partial()
	})
	.strict()

export type ShadcnTheme = z.infer<typeof zShadcnTheme>
export type ShadcnThemeVars = z.infer<typeof zShadcnThemeVars>
export type ShadcnThemeShared = z.infer<typeof zShadcnThemeShared>
export type ColorKey = keyof ShadcnThemeVars

export const getDefaultShadcnTheme = (): ShadcnTheme => ({
	theme: {
		'font-sans':
			"ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'",
		'font-serif':
			'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
		'font-mono':
			'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
		radius: '0.625rem'
	},
	light: {
		background: 'oklch(1 0 0)',
		foreground: 'oklch(0.145 0 0)',
		card: 'oklch(1 0 0)',
		'card-foreground': 'oklch(0.145 0 0)',
		popover: 'oklch(1 0 0)',
		'popover-foreground': 'oklch(0.145 0 0)',
		primary: 'oklch(0.205 0 0)',
		'primary-foreground': 'oklch(0.985 0 0)',
		secondary: 'oklch(0.97 0 0)',
		'secondary-foreground': 'oklch(0.205 0 0)',
		muted: 'oklch(0.97 0 0)',
		'muted-foreground': 'oklch(0.556 0 0)',
		accent: 'oklch(0.97 0 0)',
		'accent-foreground': 'oklch(0.205 0 0)',
		destructive: 'oklch(0.577 0.245 27.325)',
		border: 'oklch(0.922 0 0)',
		input: 'oklch(0.922 0 0)',
		ring: 'oklch(0.708 0 0)',
		'chart-1': 'oklch(0.646 0.222 41.116)',
		'chart-2': 'oklch(0.6 0.118 184.704)',
		'chart-3': 'oklch(0.398 0.07 227.392)',
		'chart-4': 'oklch(0.828 0.189 84.429)',
		'chart-5': 'oklch(0.769 0.188 70.08)',
		sidebar: 'oklch(0.985 0 0)',
		'sidebar-foreground': 'oklch(0.145 0 0)',
		'sidebar-primary': 'oklch(0.205 0 0)',
		'sidebar-primary-foreground': 'oklch(0.985 0 0)',
		'sidebar-accent': 'oklch(0.97 0 0)',
		'sidebar-accent-foreground': 'oklch(0.205 0 0)',
		'sidebar-border': 'oklch(0.922 0 0)',
		'sidebar-ring': 'oklch(0.708 0 0)'
	},
	dark: {
		background: 'oklch(0.145 0 0)',
		foreground: 'oklch(0.985 0 0)',
		card: 'oklch(0.205 0 0)',
		'card-foreground': 'oklch(0.985 0 0)',
		popover: 'oklch(0.269 0 0)',
		'popover-foreground': 'oklch(0.985 0 0)',
		primary: 'oklch(0.922 0 0)',
		'primary-foreground': 'oklch(0.205 0 0)',
		secondary: 'oklch(0.269 0 0)',
		'secondary-foreground': 'oklch(0.985 0 0)',
		muted: 'oklch(0.269 0 0)',
		'muted-foreground': 'oklch(0.708 0 0)',
		accent: 'oklch(0.371 0 0)',
		'accent-foreground': 'oklch(0.985 0 0)',
		destructive: 'oklch(0.704 0.191 22.216)',
		border: 'oklch(1 0 0 / 10%)',
		input: 'oklch(1 0 0 / 15%)',
		ring: 'oklch(0.556 0 0)',
		'chart-1': 'oklch(0.488 0.243 264.376)',
		'chart-2': 'oklch(0.696 0.17 162.48)',
		'chart-3': 'oklch(0.769 0.188 70.08)',
		'chart-4': 'oklch(0.627 0.265 303.9)',
		'chart-5': 'oklch(0.645 0.246 16.439)',
		sidebar: 'oklch(0.205 0 0)',
		'sidebar-foreground': 'oklch(0.985 0 0)',
		'sidebar-primary': 'oklch(0.488 0.243 264.376)',
		'sidebar-primary-foreground': 'oklch(0.985 0 0)',
		'sidebar-accent': 'oklch(0.269 0 0)',
		'sidebar-accent-foreground': 'oklch(0.985 0 0)',
		'sidebar-border': 'oklch(1 0 0 / 10%)',
		'sidebar-ring': 'oklch(0.439 0 0)'
	}
})

type ThemeVars = z.infer<typeof zShadcnThemeVars>

const escapeRegExp = (input: string): string =>
	input.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

const replaceVarsInBlock = (
	css: string,
	selector: string,
	varsPartial: Partial<ThemeVars> | undefined
): string => {
	if (!varsPartial) return css

	const selectorPattern = new RegExp(
		`(${escapeRegExp(selector)}\\s*\\{)([\\s\\S]*?)(\\})`,
		'm'
	)
	const match = css.match(selectorPattern)
	if (!match) return css

	const before = match[1] ?? ''
	let blockContent: string = match[2] ?? ''
	const after = match[3] ?? ''

	for (const [key, value] of Object.entries(varsPartial)) {
		if (typeof value !== 'string' || value.trim().length === 0) continue
		const newValue = value
		const varPattern = new RegExp(
			`(\\s*--${escapeRegExp(key)}\\s*:\\s*)([^;]*)(;)`
		)
		if (varPattern.test(blockContent)) {
			blockContent = blockContent.replace(varPattern, `$1${newValue}$3`)
		}
	}

	return css.replace(selectorPattern, `${before}${blockContent}${after}`)
}

export const applyShadcnTheme = (css: string, theme: ShadcnTheme): string => {
	let updated = css
	updated = replaceVarsInBlock(updated, ':root', theme.light)
	updated = replaceVarsInBlock(updated, '.dark', theme.dark)
	return updated
}

// No deep clone needed; use a fresh default via getDefaultShadcnTheme()

const getBlockMatch = (
	css: string,
	selector: string
): RegExpMatchArray | null => {
	const selectorPattern = new RegExp(
		`(${escapeRegExp(selector)}\\s*\\{)([\\s\\S]*?)(\\})`,
		'm'
	)
	return css.match(selectorPattern)
}

const THEME_VAR_KEYS = Object.keys(getDefaultShadcnTheme().light) as Array<
	keyof ThemeVars
>

export const extractVarsFromBlock = (
	blockContent: string
): Partial<ThemeVars> => {
	const result: Partial<ThemeVars> = {}
	for (const key of THEME_VAR_KEYS) {
		const varPattern = new RegExp(
			`\\s*--${escapeRegExp(String(key))}\\s*:\\s*([^;]*)`
		) // capture until semicolon
		const m = blockContent.match(varPattern)
		if (m && typeof m[1] === 'string' && m[1].trim().length > 0) {
			;(result as Record<string, string>)[key as string] = m[1].trim()
		}
	}
	return result
}

const overrideExistingObjectVars = (
	into: Record<string, unknown>,
	from: Record<string, unknown>
): Record<string, unknown> => {
	if (!from) return into
	const out = { ...into }
	for (const key in into) {
		if (key in from && typeof from[key] === typeof into[key]) {
			out[key] = from[key]
		}
	}
	return out
}

export const parseShadcnThemeFromCss = (css: string): ShadcnTheme => {
	const theme = getDefaultShadcnTheme()

	const rootMatch = getBlockMatch(css, ':root')
	if (rootMatch) {
		const rootContent: string = rootMatch[2] ?? ''
		const extracted = extractVarsFromBlock(rootContent)
		theme.light = overrideExistingObjectVars(theme.light, extracted)
	}

	const darkMatch = getBlockMatch(css, '.dark')
	if (darkMatch) {
		const darkContent: string = darkMatch[2] ?? ''
		const extracted = extractVarsFromBlock(darkContent)
		theme.dark = overrideExistingObjectVars(theme.dark, extracted)
	}

	return theme
}

// type Primitive = string | number | boolean | null
// function isPrimitive(val: unknown): val is Primitive {
// 	return (
// 		typeof val === 'string' ||
// 		typeof val === 'number' ||
// 		typeof val === 'boolean' ||
// 		val === null
// 	)
// }
// function safeExtractPrimitive<T extends Primitive>(
// 	obj: unknown,
// 	prop: string,
// 	defaultValue: T
// ): T {
// 	if (typeof obj === 'object' && obj !== null && prop in obj)
// 		return obj[prop as keyof typeof obj] as T
// 	return defaultValue
// }

export const parseShadcnThemeFromJson = (json: unknown): ShadcnTheme => {
	const input: Record<string, unknown> =
		typeof json === 'string' ? JSON.parse(json) : json
	const out = getDefaultShadcnTheme()
	try {
		if (typeof input !== 'object' || typeof input === null) {
			console.error('Parsed json is not an object')
			return out
		}
		if (typeof input.theme === 'object' && input.theme !== null) {
			out.theme = overrideExistingObjectVars(
				out.theme,
				input.theme as Record<string, unknown>
			) as ShadcnThemeShared
		}
		if (typeof input.light === 'object' && input.light !== null) {
			out.light = overrideExistingObjectVars(
				out.light,
				input.light as Record<string, unknown>
			)
		}
		if (typeof input.dark === 'object' && input.dark !== null) {
			out.dark = overrideExistingObjectVars(
				out.dark,
				input.dark as Record<string, unknown>
			)
		}
		return out
	} catch (e) {
		console.error(e)
		return out
	}
}

// Lightweight tests - run with: pnpm tsx packages/common-utils/src/applyShadCnTheme.ts
if (
	typeof process !== 'undefined' &&
	Array.isArray(process.argv) &&
	(process.argv[1]?.endsWith('shadcnTheme.ts') ?? false)
) {
	const run = (name: string, fn: () => void): void => {
		try {
			fn()
			console.log(`✓ ${name}`)
		} catch (err) {
			console.error(`✗ ${name}`)
			console.error(err)
		}
	}

	const expectContains = (s: string, sub: string, msg?: string): void => {
		if (!s.includes(sub)) {
			throw new Error(msg ?? `Expected output to contain: ${sub}`)
		}
	}

	const expectNotContains = (s: string, sub: string, msg?: string): void => {
		if (s.includes(sub)) {
			throw new Error(msg ?? `Expected output NOT to contain: ${sub}`)
		}
	}

	const defaultTheme = getDefaultShadcnTheme().theme

	// Test 1: Replaces in both :root and .dark blocks
	run('replaces existing vars in :root and .dark', () => {
		const css = `:root {\n  --primary: oklch(0.2 0 0);\n}\n.dark {\n  --primary: oklch(0.9 0 0);\n}`
		const themed = applyShadcnTheme(css, {
			theme: defaultTheme,
			light: { primary: 'oklch(0.1 0 0)' },
			dark: { primary: 'oklch(0.8 0 0)' }
		})
		expectContains(themed, '--primary: oklch(0.1 0 0);')
		expectContains(themed, '.dark {\n  --primary: oklch(0.8 0 0);')
	})

	// Test 2: Missing .dark block - should no-op for dark
	run('no-ops when .dark block is missing', () => {
		const css = `:root {\n  --primary: oklch(0.2 0 0);\n}`
		const themed = applyShadcnTheme(css, {
			theme: defaultTheme,
			light: { primary: 'oklch(0.15 0 0)' },
			dark: { primary: 'oklch(0.85 0 0)' }
		})
		expectContains(themed, '--primary: oklch(0.15 0 0);')
		expectNotContains(themed, 'oklch(0.85 0 0)')
	})

	// Test 3: Var absent in block - should skip
	run('skips vars not present in the block', () => {
		const css = `:root {\n  --ring: oklch(0.7 0 0);\n}`
		const themed = applyShadcnTheme(css, {
			theme: defaultTheme,
			light: { primary: 'oklch(0.12 0 0)' },
			dark: {}
		})
		expectContains(themed, '--ring: oklch(0.7 0 0);')
		expectNotContains(themed, '--primary: oklch(0.12 0 0);')
	})

	// Test 4: Empty arrays / undefined values - should skip
	run('skips empty arrays and undefined values', () => {
		const css = `:root {\n  --primary: oklch(0.2 0 0);\n}`
		const themed = applyShadcnTheme(css, {
			theme: defaultTheme,
			light: { primary: '' },
			dark: undefined as unknown as ThemeVars // ensure type narrow allows undefined handling
		})
		expectContains(themed, '--primary: oklch(0.2 0 0);')
	})

	// Test 5: parseShadcnThemeFromCss extracts vars gracefully
	run('parseShadcnThemeFromCss extracts vars from :root and .dark', () => {
		const css = `:root {\n  --primary: oklch(0.1 0 0);\n  --ring: oklch(0.7 0 0);\n}\n.dark {\n  --primary: oklch(0.9 0 0);\n}`
		const theme = parseShadcnThemeFromCss(css)
		if (theme.light?.primary !== 'oklch(0.1 0 0)')
			throw new Error('light primary not parsed')
		if (theme.dark?.primary !== 'oklch(0.9 0 0)')
			throw new Error('dark primary not parsed')
		if (theme.light?.ring !== 'oklch(0.7 0 0)')
			throw new Error('light ring not parsed')
	})

	// Test 6: parseShadcnThemeFromJson accepts partials and malformed values
	run(
		'parseShadcnThemeFromJson accepts partials/malformed json gracefully',
		() => {
			const json = JSON.stringify({
				light: { primary: 'oklch(0.2 0 0)', ring: ['oklch(0.6 0 0)'] },
				dark: { primary: 42 },
				// top-level override also applied to light
				'card-foreground': 'oklch(0.3 0 0)',
				ignored: { notATheme: true }
			})
			const theme = parseShadcnThemeFromJson(json)
			if (theme.light?.primary !== 'oklch(0.2 0 0)')
				throw new Error('json light primary not applied')
			// ring provided as an array -> malformed, should keep default
			if (theme.light?.ring !== 'oklch(0.708 0 0)')
				throw new Error('malformed ring should not override default')
			// dark.primary provided as number -> type mismatch, keep default
			if (theme.dark?.primary !== 'oklch(0.922 0 0)')
				throw new Error('mismatched type should not override default')
			// top-level keys should not override light unless explicitly supported
			if (theme.light?.['card-foreground'] !== 'oklch(0.145 0 0)')
				throw new Error(
					'top-level key should not override light by default'
				)
		}
	)

	// Test 7: parseShadcnThemeFromJson returns fresh object instances per call
	run('parseShadcnThemeFromJson returns fresh object instances', () => {
		const a = parseShadcnThemeFromJson('{}')
		const b = parseShadcnThemeFromJson('{}')
		if (a === b)
			throw new Error(
				'expected different top-level instances between calls'
			)
		if (a.light === b.light)
			throw new Error('expected different light instances between calls')
		if (a.dark === b.dark)
			throw new Error('expected different dark instances between calls')
	})
}
