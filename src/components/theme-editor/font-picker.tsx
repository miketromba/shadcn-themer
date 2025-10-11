'use client'

import * as React from 'react'
import {
	Popover,
	PopoverContent,
	PopoverTrigger
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Check, Search } from 'lucide-react'
import {
	GOOGLE_FONTS,
	type FontCategory,
	getFontsByCategory
} from '@/lib/googleFonts'
import { loadGoogleFont, extractFontName } from '@/lib/loadGoogleFont'
import { cn } from '@/lib/utils'

interface FontPickerProps {
	currentValue: string
	onSelect: (fontFamily: string) => void
	triggerText: string
	fontType: 'font-sans' | 'font-serif' | 'font-mono'
	onOpenChange?: (open: boolean) => void
}

export function FontPicker({
	currentValue,
	onSelect,
	triggerText,
	fontType,
	onOpenChange
}: FontPickerProps) {
	const [open, setOpen] = React.useState(false)

	const handleOpenChange = React.useCallback(
		(newOpen: boolean) => {
			setOpen(newOpen)
			onOpenChange?.(newOpen)
		},
		[onOpenChange]
	)
	const [search, setSearch] = React.useState('')
	const [loadedFonts, setLoadedFonts] = React.useState<Set<string>>(new Set())

	// Determine default category based on font type
	const defaultCategory: FontCategory =
		fontType === 'font-sans'
			? 'sans-serif'
			: fontType === 'font-serif'
			? 'serif'
			: 'monospace'

	const currentFontName = extractFontName(currentValue)

	// Load the currently selected font when opening the picker
	React.useEffect(() => {
		if (open && currentFontName && !loadedFonts.has(currentFontName)) {
			loadGoogleFont(currentFontName, { weights: ['400', '600'] })
				.then(() => {
					setLoadedFonts(prev => new Set([...prev, currentFontName]))
				})
				.catch(err => console.warn('Failed to load current font:', err))
		}
	}, [open, currentFontName, loadedFonts])

	// Filter fonts by category and search
	const filteredFonts = React.useMemo(() => {
		const categoryFonts = getFontsByCategory(defaultCategory)
		if (!search) return categoryFonts

		const searchLower = search.toLowerCase()
		return categoryFonts.filter(font =>
			font.name.toLowerCase().includes(searchLower)
		)
	}, [defaultCategory, search])

	// Load font on hover
	const handleFontHover = React.useCallback(
		(fontName: string) => {
			// Only load if not already loaded
			if (!loadedFonts.has(fontName)) {
				loadGoogleFont(fontName, { weights: ['400', '600'] })
					.then(() => {
						// Mark font as loaded so it stays applied
						setLoadedFonts(prev => new Set([...prev, fontName]))
					})
					.catch(err => console.warn('Failed to load font:', err))
			}
		},
		[loadedFonts]
	)

	// Handle font selection
	const handleFontSelect = (fontName: string) => {
		// Build font family with fallback
		const font = GOOGLE_FONTS.find(f => f.name === fontName)
		if (!font) return

		let fallbackStack = ''
		if (font.category === 'sans-serif') {
			fallbackStack = 'system-ui, -apple-system, sans-serif'
		} else if (font.category === 'serif') {
			fallbackStack = 'Georgia, serif'
		} else {
			fallbackStack = 'ui-monospace, monospace'
		}

		const fontFamily = `'${fontName}', ${fallbackStack}`
		onSelect(fontFamily)
		setOpen(false)
	}

	return (
		<Popover open={open} onOpenChange={handleOpenChange}>
			<PopoverTrigger asChild>
				<Button variant="outline" size="sm" className="justify-start">
					{triggerText}
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-[250px] p-0" align="start">
				<div className="p-0 space-y-2">
					{/* Search Input */}
					<div className="relative">
						<Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
						<Input
							placeholder="Search Google fonts..."
							value={search}
							onChange={e => setSearch(e.target.value)}
							className="h-10 pl-9 !bg-transparent border-t-0 border-x-0 focus-visible:ring-0 rounded-none border-border focus-visible:border-border"
						/>
					</div>

					{/* Font List */}
					<ScrollArea className="h-[250px] -mx-1">
						<div className="space-y-1 px-3 pb-3">
							{filteredFonts.length === 0 ? (
								<div className="text-sm text-muted-foreground py-8 text-center">
									No fonts found
								</div>
							) : (
								filteredFonts.map(font => {
									const isSelected =
										currentFontName === font.name
									const isFontLoaded = loadedFonts.has(
										font.name
									)
									return (
										<button
											key={font.name}
											type="button"
											onClick={() =>
												handleFontSelect(font.name)
											}
											onMouseEnter={() =>
												handleFontHover(font.name)
											}
											className={cn(
												'w-full text-left py-1.5 px-1.5 rounded hover:bg-accent/50 transition-colors',
												isSelected && 'bg-accent'
											)}
											style={{
												fontFamily: isFontLoaded
													? `'${font.name}', ${font.fallback}`
													: undefined
											}}
										>
											<div className="flex items-start justify-between gap-2">
												<div className="min-w-0 flex-1">
													<div className="text-[15px] font-medium leading-tight">
														{font.name}
													</div>
												</div>
												{isSelected && (
													<span className="inline-flex items-center justify-center bg-primary text-primary-foreground rounded-sm p-0.5 shrink-0">
														<Check className="size-4" />
													</span>
												)}
											</div>
										</button>
									)
								})
							)}
						</div>
					</ScrollArea>
				</div>
			</PopoverContent>
		</Popover>
	)
}
