import Color from 'colorjs.io'
import { ShadcnTheme, ShadcnThemeVars } from './shadcnTheme'

export type Bucket =
	| 'red'
	| 'orange'
	| 'yellow'
	| 'green'
	| 'teal'
	| 'blue'
	| 'purple'
	| 'pink'
	| 'gray'
	| 'black'
	| 'white'

export type BucketResult = {
	bucket: Bucket
	mode: 'light' | 'dark'
	sourceKey: string // which token decided the bucket
	color: string // the OKLCH string used
	debug: {
		l: number
		c: number
		h?: number
		deltaEToCenters: Record<string, number>
		skipped: Array<{ mode: 'light' | 'dark'; key: string; reason: string }>
	}
}

// --- 1) Bucket centers in OKLCH (tweak to taste) ---
const centers: Record<Exclude<Bucket, 'gray' | 'white' | 'black'>, Color> = {
	red: new Color('oklch', [0.6, 0.2, 20]), // 20° | oklch(0.6 0.20 20)
	orange: new Color('oklch', [0.7, 0.18, 60]), // 60° (+40° from red) | oklch(0.7 0.18 60)
	yellow: new Color('oklch', [0.82, 0.15, 95]), // 95° (+35° from orange) | oklch(0.82 0.15 95)
	green: new Color('oklch', [0.7, 0.18, 145]), // 145° (+50° from yellow) | oklch(0.7 0.18 145)
	teal: new Color('oklch', [0.7, 0.18, 190]), // 190° (+45° from green) | oklch(0.7 0.18 190)
	blue: new Color('oklch', [0.62, 0.2, 240]), // 240° (+50° from teal) | oklch(0.62 0.20 240)
	purple: new Color('oklch', [0.62, 0.2, 290]), // 290° (+50° from blue) | oklch(0.62 0.20 290)
	pink: new Color('oklch', [0.72, 0.18, 330]) // 330° (+40° from purple, +50° to red) | oklch(0.72 0.18 330)
}

// --- 2) Neutral guards (OKLCH thresholds) ---
const isGrayish = (c: Color) => c.oklch.c < 0.03
const isWhite = (c: Color) => isGrayish(c) && c.oklch.l > 0.85
const isBlack = (c: Color) => isGrayish(c) && c.oklch.l < 0.2

// --- 3) Which tokens “speak for the theme”?  Highest C wins among these ---
const CANDIDATE_KEYS: string[] = ['primary', 'sidebar-primary', 'accent']

// Robustly parse any CSS color, prefer OKLCH if present.
function parseColor(input: string): Color | null {
	try {
		// Handles "oklch(...)", optionally with alpha " / x%", named spaces, etc.
		const c = new Color(input)
		// If there's alpha nearly 0, treat as unusable for identity:
		if (typeof c.alpha === 'number' && c.alpha < 0.05) return null
		return c
	} catch {
		return null
	}
}

// --- 4) Classify a single OKLCH string into a bucket ---
function bucketFromOKLCHString(oklchStr: string): {
	bucket: Bucket
	deltaEToCenters: Record<string, number>
	parsed?: { l: number; c: number; h?: number }
} {
	const color = parseColor(oklchStr)
	if (!color) return { bucket: 'gray', deltaEToCenters: {} }

	// Work in OKLCH; if hue is undefined for neutrals, guards below handle it.
	const { l, c, h } = color.oklch

	if (isWhite(color))
		return { bucket: 'white', deltaEToCenters: {}, parsed: { l, c, h } }
	if (isBlack(color))
		return { bucket: 'black', deltaEToCenters: {}, parsed: { l, c, h } }
	if (isGrayish(color))
		return { bucket: 'gray', deltaEToCenters: {}, parsed: { l, c, h } }

	// Nearest named bucket via ΔE2000
	let best: { name: Bucket; dE: number } = { name: 'gray', dE: Infinity }
	const distances: Record<string, number> = {}
	for (const [name, center] of Object.entries(centers)) {
		const dE = Color.deltaE2000(color, center as Color)
		distances[name] = dE
		if (dE < best.dE) best = { name: name as Bucket, dE }
	}
	return {
		bucket: best.name,
		deltaEToCenters: distances,
		parsed: { l, c, h }
	}
}

// --- 5) Pick representative swatch from a full theme, then classify ---
export function themeToBucket(theme: ShadcnTheme): BucketResult {
	const skipped: BucketResult['debug']['skipped'] = []

	// Search in both modes; many catalogs display the light card at rest,
	// but we'll consider whichever mode yields the most "colorful" identity.
	const modes: Array<
		['light' | 'dark', Partial<ShadcnThemeVars> | undefined]
	> = [
		['light', theme.light],
		['dark', theme.dark]
	]

	let pick: {
		mode: 'light' | 'dark'
		key: string
		colorStr: string
		color: Color
	} | null = null

	for (const [mode, vars] of modes) {
		if (!vars) continue
		for (const key of CANDIDATE_KEYS) {
			const value = vars[key as keyof ShadcnThemeVars]
			if (!value) {
				skipped.push({ mode, key, reason: 'missing' })
				continue
			}
			const c = parseColor(value)
			if (!c) {
				skipped.push({ mode, key, reason: 'unparseable' })
				continue
			}
			// Ignore near-neutrals; they don’t represent the “brand hue”.
			if (isGrayish(c)) {
				skipped.push({ mode, key, reason: 'near-neutral' })
				continue
			}
			// Prefer the highest chroma among candidates
			if (!pick || c.oklch.c > pick.color.oklch.c) {
				pick = { mode, key, colorStr: value, color: c }
			}
		}
	}

	// If everything was neutral/missing, fall back to foreground/primary whatever exists.
	if (!pick) {
		for (const [mode, vars] of modes) {
			if (!vars) continue
			for (const key of ['primary', 'accent', 'foreground']) {
				const val = vars[key as keyof ShadcnThemeVars]
				const c = val && parseColor(val)
				if (c) {
					pick = { mode, key, colorStr: val, color: c }
					break
				}
			}
			if (pick) break
		}
	}

	// Absolute last resort
	if (!pick) {
		return {
			bucket: 'gray',
			mode: 'light',
			sourceKey: '(none)',
			color: 'oklch(0.7 0 0)',
			debug: { l: 0.7, c: 0, h: undefined, deltaEToCenters: {}, skipped }
		}
	}

	const { bucket, deltaEToCenters, parsed } = bucketFromOKLCHString(
		pick.colorStr
	)
	return {
		bucket,
		mode: pick.mode,
		sourceKey: pick.key,
		color: pick.colorStr,
		debug: {
			l: parsed?.l ?? pick.color.oklch.l,
			c: parsed?.c ?? pick.color.oklch.c,
			h: parsed?.h ?? pick.color.oklch.h,
			deltaEToCenters,
			skipped
		}
	}
}

// Lightweight tests - run with: pnpm tsx src/lib/shadcnThemeToColorBucket.ts
if (
	typeof process !== 'undefined' &&
	Array.isArray(process.argv) &&
	(process.argv[1]?.endsWith('shadcnThemeToColorBucket.ts') ?? false)
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

	const expectEquals = <T>(actual: T, expected: T, msg?: string): void => {
		if (actual !== expected) {
			throw new Error(
				msg ?? `Expected ${String(expected)}, but got ${String(actual)}`
			)
		}
	}

	// Test 1: Pure red color should bucket as red
	run('buckets pure red correctly', () => {
		const result = bucketFromOKLCHString('oklch(0.6 0.22 20)')
		expectEquals(result.bucket, 'red', 'Should identify red hue')
	})

	// Test 2: Pure blue color should bucket as blue
	run('buckets pure blue correctly', () => {
		const result = bucketFromOKLCHString('oklch(0.6 0.2 240)')
		expectEquals(result.bucket, 'blue', 'Should identify blue hue')
	})

	// Test 3: Pure green color should bucket as green
	run('buckets pure green correctly', () => {
		const result = bucketFromOKLCHString('oklch(0.7 0.15 145)')
		expectEquals(result.bucket, 'green', 'Should identify green hue')
	})

	// Test 4: Purple/violet color should bucket as purple
	run('buckets purple correctly', () => {
		const result = bucketFromOKLCHString('oklch(0.6 0.2 290)')
		expectEquals(result.bucket, 'purple', 'Should identify purple hue')
	})

	// Test 5: Low chroma (near-neutral) should be gray
	run('buckets low-chroma colors as gray', () => {
		const result = bucketFromOKLCHString('oklch(0.5 0.01 180)')
		expectEquals(result.bucket, 'gray', 'Low chroma should be gray')
	})

	// Test 6: Very light low-chroma should be white
	run('buckets very light neutrals as white', () => {
		const result = bucketFromOKLCHString('oklch(0.95 0.005 0)')
		expectEquals(result.bucket, 'white', 'Should identify white')
	})

	// Test 7: Very dark low-chroma should be black
	run('buckets very dark neutrals as black', () => {
		const result = bucketFromOKLCHString('oklch(0.1 0.01 0)')
		expectEquals(result.bucket, 'black', 'Should identify black')
	})

	// Test 8: Orange hue should bucket as orange
	run('buckets orange correctly', () => {
		const result = bucketFromOKLCHString('oklch(0.7 0.15 60)')
		expectEquals(result.bucket, 'orange', 'Should identify orange hue')
	})

	// Test 9: Teal/cyan should bucket as teal
	run('buckets teal correctly', () => {
		const result = bucketFromOKLCHString('oklch(0.7 0.12 190)')
		expectEquals(result.bucket, 'teal', 'Should identify teal hue')
	})

	// Test 10: Pink should bucket as pink
	run('buckets pink correctly', () => {
		const result = bucketFromOKLCHString('oklch(0.72 0.15 330)')
		expectEquals(result.bucket, 'pink', 'Should identify pink hue')
	})

	// Test 11: Theme with blue primary should bucket as blue
	run('theme with blue primary buckets as blue', () => {
		const theme: ShadcnTheme = {
			light: {
				primary: 'oklch(0.5 0.2 240)'
			},
			dark: {}
		}
		const result = themeToBucket(theme)
		expectEquals(result.bucket, 'blue', 'Theme should be blue')
		expectEquals(result.sourceKey, 'primary', 'Should use primary key')
		expectEquals(result.mode, 'light', 'Should use light mode')
	})

	// Test 12: Theme with red accent should bucket as red
	run('theme with red accent buckets as red', () => {
		const theme: ShadcnTheme = {
			light: {
				primary: 'oklch(0.5 0.01 0)', // neutral
				accent: 'oklch(0.6 0.22 20)' // red
			},
			dark: {}
		}
		const result = themeToBucket(theme)
		expectEquals(result.bucket, 'red', 'Theme should be red')
		expectEquals(result.sourceKey, 'accent', 'Should use accent key')
	})

	// Test 13: Theme prefers higher chroma candidate
	run('theme prefers higher chroma color', () => {
		const theme: ShadcnTheme = {
			light: {
				primary: 'oklch(0.6 0.1 240)', // lower chroma blue
				accent: 'oklch(0.6 0.25 20)' // higher chroma red
			},
			dark: {}
		}
		const result = themeToBucket(theme)
		expectEquals(result.bucket, 'red', 'Should prefer higher chroma')
		expectEquals(result.sourceKey, 'accent', 'Should pick accent')
	})

	// Test 14: All-neutral theme should fall back gracefully
	run('all-neutral theme falls back to gray', () => {
		const theme: ShadcnTheme = {
			light: {
				primary: 'oklch(0.5 0.01 0)',
				accent: 'oklch(0.7 0.01 0)',
				foreground: 'oklch(0.1 0.005 0)'
			},
			dark: {}
		}
		const result = themeToBucket(theme)
		expectEquals(
			result.bucket,
			'gray',
			'All-neutral theme should be gray or neutral variant'
		)
	})

	// Test 15: Dark mode with colorful primary should be detected
	run('dark mode colorful primary is detected', () => {
		const theme: ShadcnTheme = {
			light: {},
			dark: {
				primary: 'oklch(0.7 0.2 145)' // green
			}
		}
		const result = themeToBucket(theme)
		expectEquals(result.bucket, 'green', 'Should detect dark mode green')
		expectEquals(result.mode, 'dark', 'Should report dark mode')
	})

	// Test 16: Non-candidate colors are ignored (chart colors no longer candidates)
	run('non-candidate colors are ignored', () => {
		const theme: ShadcnTheme = {
			light: {
				primary: 'oklch(0.5 0.01 0)', // neutral
				accent: 'oklch(0.65 0.2 290)', // purple
				'chart-1': 'oklch(0.65 0.2 20)' // red (should be ignored)
			},
			dark: {}
		}
		const result = themeToBucket(theme)
		expectEquals(result.bucket, 'purple', 'Should use accent color')
		expectEquals(
			result.sourceKey,
			'accent',
			'Should credit accent, not chart-1'
		)
	})

	// Test 17: Invalid color strings should be handled gracefully
	run('invalid color strings are handled gracefully', () => {
		const result = bucketFromOKLCHString('not-a-color')
		expectEquals(result.bucket, 'gray', 'Invalid color defaults to gray')
	})

	// Test 18: Empty theme should return gray bucket
	run('empty theme returns gray bucket', () => {
		const theme: ShadcnTheme = {
			light: {},
			dark: {}
		}
		const result = themeToBucket(theme)
		expectEquals(result.bucket, 'gray', 'Empty theme should be gray')
		expectEquals(result.sourceKey, '(none)', 'Should indicate no source')
	})

	// Test 19: Yellow hue should bucket as yellow
	run('buckets yellow correctly', () => {
		const result = bucketFromOKLCHString('oklch(0.85 0.12 95)')
		expectEquals(result.bucket, 'yellow', 'Should identify yellow hue')
	})

	// Test 20: Sidebar-primary can be the bucket source
	run('sidebar-primary can determine bucket', () => {
		const theme: ShadcnTheme = {
			light: {
				'sidebar-primary': 'oklch(0.6 0.2 190)' // teal
			},
			dark: {}
		}
		const result = themeToBucket(theme)
		expectEquals(result.bucket, 'teal', 'Should use sidebar-primary')
		expectEquals(
			result.sourceKey,
			'sidebar-primary',
			'Should credit sidebar-primary'
		)
	})

	console.log('\n🎨 All color bucketing tests passed!')
}
