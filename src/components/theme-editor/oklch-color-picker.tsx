'use client'

import * as React from 'react'
import { HexColorPicker, HexColorInput } from 'react-colorful'
import Color from 'colorjs.io'

type Oklch = { l: number; c: number; h: number }

export type OklchColorPickerProps = {
	value: Oklch
	onChange?: (value: Oklch) => void
	onChangeCommitted?: (value: Oklch) => void
	className?: string
	debounceMs?: number
	withInput?: boolean
	initialColor?: string
}

const clamp01 = (n: number) => Math.min(1, Math.max(0, n))
const toFinite = (n: number, fallback = 0) =>
	Number.isFinite(n) ? n : fallback
const round3 = (n: number) => Math.round(toFinite(n, 0) * 1000) / 1000
const format3 = (n: number) => round3(n).toString()

const normalizeHex = (hex: string): string => {
	const h = hex.startsWith('#') ? hex.slice(1) : hex
	if (h.length === 3) {
		const r = h[0]
		const g = h[1]
		const b = h[2]
		return `#${r}${r}${g}${g}${b}${b}`.toLowerCase()
	}
	if (h.length === 4) {
		// #rgba -> drop alpha and expand rgb
		const r = h[0]
		const g = h[1]
		const b = h[2]
		return `#${r}${r}${g}${g}${b}${b}`.toLowerCase()
	}
	if (h.length === 6) return `#${h.toLowerCase()}`
	if (h.length === 8) return `#${h.slice(0, 6).toLowerCase()}` // drop alpha
	return '#000000'
}

// Robust OKLCH parsing: supports CSS oklch() (with optional alpha) and hex; falls back to regex
export const parseOKLCH = (s: string): Oklch => {
	try {
		if (typeof s === 'string' && s.trim().startsWith('#')) {
			const col = new Color(s).to('oklch')
			const [l0, c0, h0] = col.coords as [number, number, number]
			return {
				l: clamp01(toFinite(l0, 0)),
				c: Math.max(0, toFinite(c0, 0)),
				h: ((toFinite(h0, 0) % 360) + 360) % 360
			}
		}
		const col = new Color(s).to('oklch')
		const [l0, c0, h0] = col.coords as [number, number, number]
		return {
			l: clamp01(toFinite(l0, 0)),
			c: Math.max(0, toFinite(c0, 0)),
			h: ((toFinite(h0, 0) % 360) + 360) % 360
		}
	} catch {}
	// Regex fallback: oklch(L C H / A?)
	const m = s.match(
		/oklch\(\s*([^\s,/]+)\s+([^\s,/]+)\s+([^\s,/\)]+)(?:\s*\/[^\)]*)?\)/i
	)
	if (m) {
		const l = clamp01(parseFloat(m[1] || '0') || 0)
		const c = Math.max(0, parseFloat(m[2] || '0') || 0)
		const h = (((parseFloat(m[3] || '0') || 0) % 360) + 360) % 360
		return { l, c, h }
	}
	return { l: 0, c: 0, h: 0 }
}

export const toOKLCHString = (l: number, c: number, h: number): string => {
	const lN = clamp01(toFinite(l, 0))
	const cN = Math.max(0, toFinite(c, 0))
	const hN = ((toFinite(h, 0) % 360) + 360) % 360
	let cR = round3(cN)
	if (cR === 0 && cN > 0) cR = 0.001
	// Manually format without passing back through Color to avoid internal adjustments
	return `oklch(${format3(lN)} ${format3(cR)} ${format3(hN)}` + `)`
}

const toHexFromOKLCH = (oklch: Oklch): string => {
	// sanitize incoming values to avoid NaN during conversion
	const l = clamp01(toFinite(oklch.l, 0))
	const c = Math.max(0, toFinite(oklch.c, 0))
	const hRaw = toFinite(oklch.h, 0)
	const h = ((hRaw % 360) + 360) % 360
	const color = new Color('oklch', [l, c, h])
	const hex = color.to('srgb').toString({ format: 'hex' })
	return normalizeHex(hex)
}

const toHexFromString = (s: string): string => {
	try {
		if (!s) return '#000000'
		if (s.startsWith('#')) return normalizeHex(s)
		const col = new Color(s).to('srgb').toString({ format: 'hex' })
		return normalizeHex(col)
	} catch {
		return '#000000'
	}
}

const toOKLCHFromHex = (hex: string): Oklch => {
	try {
		const color = new Color(hex).to('oklch')
		const [l0, c0, h0] = color.coords as [number, number, number]
		const l = clamp01(toFinite(l0, 0))
		const c = Math.max(0, toFinite(c0, 0))
		// When chroma is 0, hue may be undefined; default to 0
		const hWrapped = ((toFinite(h0, 0) % 360) + 360) % 360
		return { l, c, h: hWrapped }
	} catch {
		return { l: 0, c: 0, h: 0 }
	}
}

export function OklchColorPicker({
	value,
	onChange,
	onChangeCommitted,
	className,
	debounceMs = 150,
	withInput = true,
	initialColor
}: OklchColorPickerProps) {
	const externalHex = React.useMemo(
		() => toHexFromOKLCH(value),
		[value.l, value.c, value.h]
	)
	const initialHex = React.useMemo(() => {
		if (value.l === 0 && value.c === 0 && value.h === 0 && initialColor) {
			return toHexFromString(initialColor)
		}
		return externalHex
	}, [value.l, value.c, value.h, initialColor, externalHex])
	const [hex, setHex] = React.useState<string>(initialHex)
	const lastLocalChangeRef = React.useRef<number>(0)
	const rafRef = React.useRef<number | null>(null)
	const commitTimeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(
		null
	)
	const interactionHoldMs = 250

	// keep internal hex in sync when external oklch changes, unless there was a recent local change
	React.useEffect(() => {
		const sinceLocal = Date.now() - lastLocalChangeRef.current
		if (sinceLocal > interactionHoldMs) {
			const next =
				value.l === 0 && value.c === 0 && value.h === 0 && initialColor
					? toHexFromString(initialColor)
					: externalHex
			if (hex.toLowerCase() !== next.toLowerCase()) setHex(next)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [externalHex, initialColor])

	React.useEffect(
		() => () => {
			if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
			if (commitTimeoutRef.current !== null)
				clearTimeout(commitTimeoutRef.current)
		},
		[]
	)

	const handleHexChange = React.useCallback(
		(next: string) => {
			lastLocalChangeRef.current = Date.now()
			const normalized = normalizeHex(next)
			setHex(normalized)

			if (normalized.toLowerCase() === externalHex.toLowerCase()) return

			const o = toOKLCHFromHex(normalized)

			// Call onChange immediately for real-time updates (no React state updates)
			if (onChange) {
				if (rafRef.current !== null)
					cancelAnimationFrame(rafRef.current)
				rafRef.current = requestAnimationFrame(() => {
					onChange(o)
				})
			}

			// Schedule onChangeCommitted after user stops changing
			if (onChangeCommitted) {
				if (commitTimeoutRef.current !== null) {
					clearTimeout(commitTimeoutRef.current)
				}
				commitTimeoutRef.current = setTimeout(() => {
					onChangeCommitted(o)
				}, debounceMs)
			}
		},
		[externalHex, onChange, onChangeCommitted, debounceMs]
	)

	return (
		<div className={className}>
			<HexColorPicker
				className="!w-full"
				color={hex}
				onChange={handleHexChange}
			/>
			{withInput ? (
				<div className="mt-2">
					<HexColorInput
						color={hex}
						onChange={handleHexChange}
						prefixed
						className="w-full rounded-md border bg-background px-2 py-1 text-sm"
					/>
				</div>
			) : null}
		</div>
	)
}

export default OklchColorPicker
