'use client'

import * as React from 'react'
import {
	Accordion,
	AccordionItem,
	AccordionTrigger,
	AccordionContent
} from '@/components/ui/accordion'
import { ScrollArea } from '@/components/ui/scroll-area'
import { ColorKey, getDefaultShadcnTheme } from '@/lib/shadcnTheme'
import { useThemeData } from '@/components/providers/theme-data-provider'
import { ThemeNameEditor } from '@/components/theme-editor/theme-name-editor'
import {
	OklchColorPicker,
	parseOKLCH,
	toOKLCHString
} from '@/components/theme-editor/oklch-color-picker'
import { COLOR_EXAMPLE_MAP } from '@/lib/colorExampleMapping'
import { BorderRadiusEditor } from '@/components/theme-editor/border-radius-editor'
import { FontEditor } from '@/components/theme-editor/font-editor'

const GROUPS: Array<{ id: string; title: string; keys: ColorKey[] }> = [
	{
		id: 'base',
		title: 'Base',
		keys: ['background', 'foreground']
	},
	{
		id: 'surfaces',
		title: 'Surfaces',
		keys: ['card', 'card-foreground', 'popover', 'popover-foreground']
	},
	{
		id: 'brand',
		title: 'Brand',
		keys: ['primary', 'primary-foreground']
	},
	{
		id: 'accenting',
		title: 'Accent & Secondary',
		keys: [
			'secondary',
			'secondary-foreground',
			'accent',
			'accent-foreground',
			'muted',
			'muted-foreground'
		]
	},
	{
		id: 'stateful',
		title: 'Stateful & Feedback',
		keys: ['destructive']
	},
	{
		id: 'borders',
		title: 'Borders & Focus',
		keys: ['border', 'input', 'ring']
	},
	{
		id: 'charts',
		title: 'Charts',
		keys: ['chart-1', 'chart-2', 'chart-3', 'chart-4', 'chart-5']
	},
	{
		id: 'sidebar',
		title: 'Sidebar',
		keys: [
			'sidebar',
			'sidebar-foreground',
			'sidebar-primary',
			'sidebar-primary-foreground',
			'sidebar-accent',
			'sidebar-accent-foreground',
			'sidebar-border',
			'sidebar-ring'
		]
	}
]

function ColorRow({
	keyName,
	onClick,
	value
}: {
	keyName: ColorKey
	value: string
	onClick: () => void
}) {
	return (
		<button
			type="button"
			onClick={onClick}
			className="flex w-full text-left align-center gap-3 py-2 cursor-pointer hover:bg-muted rounded-md p-2"
		>
			<div
				className="size-8 shrink-0 rounded-md border shadow"
				style={{ backgroundColor: value }}
			/>
			<div className="min-w-0">
				<div
					className="text-sm font-medium text-muted-foreground truncate"
					title={keyName}
				>
					{keyName}
				</div>
				<div
					className="text-xs font-medium text-muted-foreground/40 truncate"
					suppressHydrationWarning
					title={value}
				>
					{value}
				</div>
			</div>
		</button>
	)
}

export function ThemeEditorSidebar() {
	const {
		theme,
		updateVar,
		updateVarDirect,
		previewMode,
		setActiveExample,
		setEditingColorKey
	} = useThemeData()
	const [editingKey, setEditingKey] = React.useState<ColorKey | null>(null)
	const defaults = React.useMemo(() => getDefaultShadcnTheme(), [])
	return (
		<ScrollArea className="h-full" tableFix>
			<div className="p-3 space-y-3">
				<ThemeNameEditor />
				{!theme ? (
					<div className="text-sm text-muted-foreground">
						Loading...
					</div>
				) : (
					<Accordion
						type="multiple"
						defaultValue={GROUPS.map(g => g.id)}
					>
						{GROUPS.map(group => (
							<AccordionItem
								key={group.id}
								value={group.id}
								className="border-none"
							>
								<AccordionTrigger className="py-2 text-sm font-semibold">
									{group.title}
								</AccordionTrigger>
								<AccordionContent>
									<div>
										{GROUPS.find(
											g => g.id === group.id
										)!.keys.map(k => {
											const stored =
												(theme[previewMode]?.[k] as
													| string
													| undefined) || ''
											const fallback =
												(defaults[previewMode]?.[
													k
												] as string) || ''
											const displayValue =
												stored || fallback
											return (
												<React.Fragment key={k}>
													<ColorRow
														keyName={k}
														value={displayValue}
														onClick={() => {
															const newKey =
																editingKey === k
																	? null
																	: k
															setEditingKey(
																newKey
															)
															setEditingColorKey(
																newKey
															)
															// Switch to appropriate example when expanding
															if (
																newKey &&
																COLOR_EXAMPLE_MAP[
																	newKey
																]
															) {
																setActiveExample(
																	COLOR_EXAMPLE_MAP[
																		newKey
																	]
																)
															}
														}}
													/>
													{editingKey === k ? (
														<div className="mt-2 mb-4 pl-2">
															<OklchColorPicker
																className="w-[220px] mx-auto"
																value={parseOKLCH(
																	displayValue
																)}
																initialColor={
																	displayValue
																}
																onChange={v => {
																	// Real-time DOM update during drag (no React re-render)
																	const next =
																		toOKLCHString(
																			v.l,
																			v.c,
																			v.h
																		)
																	updateVarDirect(
																		k,
																		next,
																		{
																			mode: previewMode
																		}
																	)
																}}
																onChangeCommitted={v => {
																	// Commit to React state when dragging stops
																	const next =
																		toOKLCHString(
																			v.l,
																			v.c,
																			v.h
																		)
																	updateVar(
																		k,
																		next,
																		{
																			mode: previewMode
																		}
																	)
																}}
															/>
														</div>
													) : null}
												</React.Fragment>
											)
										})}
									</div>
								</AccordionContent>
							</AccordionItem>
						))}
					</Accordion>
				)}
				<div className="mt-3 mb-6 space-y-4">
					<BorderRadiusEditor />
					<FontEditor />
				</div>
			</div>
		</ScrollArea>
	)
}
