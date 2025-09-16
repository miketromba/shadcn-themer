'use client'

import * as React from 'react'
import type { ShadcnTheme } from '@/lib/shadcnTheme'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import * as htmlToImage from 'html-to-image'

type ThemePreviewCardProps = {
	name: string
	starCount?: number
	theme: ShadcnTheme
}

export function ThemePreviewCard({
	name,
	starCount = 0,
	theme
}: ThemePreviewCardProps) {
	const [mode, setMode] = React.useState<'light' | 'dark'>('light')
	const [imgUrl, setImgUrl] = React.useState<string | null>(null)
	const stageRef = React.useRef<HTMLDivElement | null>(null)

	const vars = ((mode === 'dark' ? theme?.dark : theme?.light) ??
		{}) as Record<string, string | undefined>
	const c = (key: string, fallback = 'transparent') => {
		const v = vars?.[key]
		return typeof v === 'string' && v.trim().length ? v : fallback
	}
	const mix = (a: string, aPct: number, b: string) =>
		`color-mix(in oklab, ${a} ${aPct}%, ${b})`

	const frame: React.CSSProperties = {
		background: c('card'),
		color: c('card-foreground', c('foreground', '#111')),
		border: `1px solid ${c('border', 'rgba(0,0,0,0.1)')}`,
		borderRadius: c('radius', '0.5rem')
	}

	const row = (nameTxt: string, status: string, amt: string) => (
		<div
			className="grid"
			style={{
				gridTemplateColumns: '1fr auto auto',
				gap: '0.5rem',
				padding: '0.25rem 0.5rem',
				borderTop: `1px solid ${c('border')}`
			}}
		>
			<div className="truncate" style={{ color: c('foreground') }}>
				{nameTxt}
			</div>
			<div
				className="flex items-center justify-center gap-1 text-[11px]"
				style={{ color: c('muted-foreground') }}
			>
				<span
					className="inline-block h-2 w-2 rounded-full"
					style={{ background: c('primary') }}
				/>
				{status}
			</div>
			<div
				className="text-right text-xs"
				style={{ color: c('foreground') }}
			>
				{amt}
			</div>
		</div>
	)

	const StageBody = () => (
		<div
			className="rounded-lg overflow-hidden"
			style={{ ...frame, height: '100%' }}
		>
			<div
				className="grid"
				style={{ gridTemplateColumns: '84px 1fr', height: '100%' }}
			>
				{/* Sidebar */}
				<div
					className="flex flex-col gap-2 p-2"
					style={{
						background: c('sidebar', c('muted')),
						color: c('sidebar-foreground', c('muted-foreground')),
						borderRight: `1px solid ${c('border')}`
					}}
				>
					<div
						className="h-7 rounded"
						style={{
							background: mix(
								c('sidebar-accent', c('muted')),
								95,
								c('sidebar', c('muted'))
							)
						}}
					/>
					<div
						className="h-5 rounded"
						style={{
							background: mix(
								c('sidebar-accent', c('muted')),
								80,
								c('sidebar', c('muted'))
							)
						}}
					/>
					<div
						className="h-5 rounded"
						style={{
							background: mix(
								c('sidebar-accent', c('muted')),
								60,
								c('sidebar', c('muted'))
							)
						}}
					/>
					<div
						className="h-5 rounded"
						style={{
							background: mix(
								c('sidebar-accent', c('muted')),
								40,
								c('sidebar', c('muted'))
							)
						}}
					/>
					<div
						className="mt-auto h-8 rounded"
						style={{
							background: c('sidebar-primary', c('primary')),
							color: c(
								'sidebar-primary-foreground',
								c('primary-foreground')
							)
						}}
					/>
				</div>
				{/* Main */}
				<div
					style={{
						background: c('background'),
						color: c('foreground'),
						display: 'grid',
						gridTemplateRows: 'auto 1fr',
						height: '100%'
					}}
				>
					<div
						className="flex items-center justify-between px-3 py-2"
						style={{ borderBottom: `1px solid ${c('border')}` }}
					>
						<div
							className="text-sm"
							style={{ color: c('muted-foreground') }}
						>
							Overview
						</div>
						<div className="flex items-center gap-2">
							<span
								className="inline-flex items-center rounded px-2 py-0.5 text-xs"
								style={{
									background: c('primary'),
									color: c('primary-foreground'),
									border: `1px solid ${c('border')}`
								}}
							>
								Badge
							</span>
							<span
								className="inline-flex items-center rounded px-2 py-0.5 text-xs"
								style={{
									background: c('muted'),
									color: c('muted-foreground'),
									border: `1px solid ${c('border')}`
								}}
							>
								Muted
							</span>
						</div>
					</div>
					<div
						className="grid gap-3 p-3"
						style={{
							gridTemplateColumns: '1fr 1fr',
							height: '100%'
						}}
					>
						{/* Stats */}
						<div
							className="grid"
							style={{
								gridTemplateColumns: '1fr 1fr 1fr',
								gap: '0.75rem'
							}}
						>
							<div
								className="rounded p-2"
								style={{
									background: c('card'),
									border: `1px solid ${c('border')}`
								}}
							>
								<div
									className="text-[10px]"
									style={{ color: c('muted-foreground') }}
								>
									Stat 1
								</div>
								<div
									className="text-sm font-medium"
									style={{ color: c('foreground') }}
								>
									1234
								</div>
								<div
									className="mt-2 h-1.5 w-full rounded"
									style={{
										background: mix(
											c('primary'),
											20,
											'transparent'
										)
									}}
								>
									<div
										className="h-1.5 rounded"
										style={{
											background: c('primary'),
											width: '45%'
										}}
									/>
								</div>
							</div>
							<div
								className="rounded p-2"
								style={{
									background: c('card'),
									border: `1px solid ${c('border')}`
								}}
							>
								<div
									className="text-[10px]"
									style={{ color: c('muted-foreground') }}
								>
									Stat 2
								</div>
								<div
									className="text-sm font-medium"
									style={{ color: c('foreground') }}
								>
									2480
								</div>
								<div
									className="mt-2 h-1.5 w-full rounded"
									style={{
										background: mix(
											c('primary'),
											20,
											'transparent'
										)
									}}
								>
									<div
										className="h-1.5 rounded"
										style={{
											background: c('primary'),
											width: '62%'
										}}
									/>
								</div>
							</div>
							<div
								className="rounded p-2"
								style={{
									background: c('card'),
									border: `1px solid ${c('border')}`
								}}
							>
								<div
									className="text-[10px]"
									style={{ color: c('muted-foreground') }}
								>
									Stat 3
								</div>
								<div
									className="text-sm font-medium"
									style={{ color: c('foreground') }}
								>
									3700
								</div>
								<div
									className="mt-2 h-1.5 w-full rounded"
									style={{
										background: mix(
											c('primary'),
											20,
											'transparent'
										)
									}}
								>
									<div
										className="h-1.5 rounded"
										style={{
											background: c('primary'),
											width: '80%'
										}}
									/>
								</div>
							</div>
						</div>
						{/* Table */}
						<div
							className="rounded"
							style={{
								background: c('card'),
								border: `1px solid ${c('border')}`
							}}
						>
							<div
								className="grid"
								style={{
									gridTemplateColumns: '1fr auto auto',
									gap: '0.5rem',
									padding: '0.25rem 0.5rem',
									color: c('muted-foreground')
								}}
							>
								<div>Name</div>
								<div className="text-center">Status</div>
								<div className="text-right">Amount</div>
							</div>
							{row('Invoice #1042', 'Paid', '$1,200')}
							{row('Invoice #1043', 'Due', '$980')}
							{row('Invoice #1044', 'Overdue', '$430')}
						</div>
						{/* Form */}
						<div
							className="rounded p-3"
							style={{
								background: c('card'),
								border: `1px solid ${c('border')}`
							}}
						>
							<div
								className="grid"
								style={{
									gridTemplateColumns: '1fr 1fr',
									gap: '0.5rem'
								}}
							>
								<div className="grid gap-1">
									<div
										className="text-[10px]"
										style={{ color: c('muted-foreground') }}
									>
										Email
									</div>
									<div
										className="h-7 rounded px-2 text-[11px] flex items-center"
										style={{
											background: c('input'),
											color: c('foreground'),
											border: `1px solid ${c('border')}`
										}}
									>
										<span style={{ opacity: 0.6 }}>
											you@example.com
										</span>
									</div>
								</div>
								<div className="grid gap-1">
									<div
										className="text-[10px]"
										style={{ color: c('muted-foreground') }}
									>
										Plan
									</div>
									<div
										className="h-7 rounded px-2 text-[11px] flex items-center justify-between"
										style={{
											background: c('input'),
											color: c('foreground'),
											border: `1px solid ${c('border')}`
										}}
									>
										<span style={{ opacity: 0.8 }}>
											Pro
										</span>
										<span style={{ opacity: 0.4 }}>▾</span>
									</div>
								</div>
							</div>
							<div className="flex items-center justify-between pt-2">
								<div
									className="flex items-center gap-2 text-[11px]"
									style={{ color: c('muted-foreground') }}
								>
									<div
										className="relative h-4 w-8 rounded-full"
										style={{
											background: mix(
												c('muted'),
												70,
												'transparent'
											)
										}}
									>
										<div
											className="absolute left-0.5 top-0.5 h-3 w-3 rounded-full"
											style={{ background: c('primary') }}
										/>
									</div>
									<span>Email updates</span>
								</div>
								<button
									className="rounded px-3 py-1 text-xs"
									style={{
										background: c('primary'),
										color: c('primary-foreground'),
										border: `1px solid ${c(
											'ring',
											c('border')
										)}`
									}}
								>
									Save
								</button>
							</div>
						</div>
						{/* Chart swatches */}
						<div
							className="grid"
							style={{
								gridTemplateColumns: 'repeat(5, 1fr)',
								gap: '0.5rem',
								padding: '0 0.75rem 0.75rem'
							}}
						>
							{[1, 2, 3, 4, 5].map(n => (
								<div
									key={n}
									className="h-2 rounded"
									style={{ background: c(`chart-${n}`) }}
								/>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	)

	React.useEffect(() => {
		const node = stageRef.current
		if (!node) return
		let cancelled = false
		htmlToImage
			.toPng(node, { cacheBust: true, width: 800, height: 450 })
			.then(url => {
				if (!cancelled) setImgUrl(url)
			})
			.catch(() => {})
		return () => {
			cancelled = true
		}
	}, [mode, theme])

	return (
		<Card className="overflow-hidden">
			<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
				<CardTitle className="text-base font-medium truncate">
					{name}
				</CardTitle>
				<div className="flex items-center gap-1">
					<div
						className="inline-flex overflow-hidden rounded border"
						style={{ borderColor: c('border') }}
					>
						<button
							className="px-2 py-1 text-xs"
							style={{
								background:
									mode === 'light'
										? c('primary')
										: 'transparent',
								color:
									mode === 'light'
										? c('primary-foreground')
										: c('muted-foreground')
							}}
							onClick={() => setMode('light')}
						>
							Light
						</button>
						<button
							className="px-2 py-1 text-xs"
							style={{
								background:
									mode === 'dark'
										? c('primary')
										: 'transparent',
								color:
									mode === 'dark'
										? c('primary-foreground')
										: c('muted-foreground')
							}}
							onClick={() => setMode('dark')}
						>
							Dark
						</button>
					</div>
					<div
						className="text-xs"
						style={{ color: c('muted-foreground') }}
					>
						★ {starCount}
					</div>
				</div>
			</CardHeader>
			<CardContent>
				<div style={{ position: 'absolute', left: '-99999px', top: 0 }}>
					<div
						ref={stageRef}
						style={{ width: '800px', height: '450px' }}
					>
						<StageBody />
					</div>
				</div>
				<div className="relative w-full aspect-[16/9] overflow-hidden">
					{imgUrl ? (
						<img
							src={imgUrl}
							alt="preview"
							className="absolute inset-0 h-full w-full object-contain"
						/>
					) : (
						<div className="absolute inset-0 flex items-center justify-center opacity-80">
							<svg
								width="24"
								height="24"
								viewBox="0 0 24 24"
								className="animate-spin opacity-50"
							>
								<circle
									cx="12"
									cy="12"
									r="10"
									stroke="currentColor"
									strokeWidth="2"
									fill="none"
								/>
							</svg>
						</div>
					)}
				</div>
			</CardContent>
		</Card>
	)
}
