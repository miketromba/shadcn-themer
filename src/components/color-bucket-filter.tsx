'use client'

import * as React from 'react'
import { type Bucket } from '@/lib/shadcnThemeToColorBucket'
import { cn } from '@/lib/utils'
import { X } from 'lucide-react'

// Bucket configuration (chromatic colors first, then neutrals)
const BUCKETS: Array<{ id: Bucket; label: string; color: string }> = [
	{ id: 'red', label: 'Red', color: 'oklch(0.6 0.20 20)' },
	{ id: 'orange', label: 'Orange', color: 'oklch(0.7 0.18 60)' },
	{ id: 'yellow', label: 'Yellow', color: 'oklch(0.82 0.15 95)' },
	{ id: 'green', label: 'Green', color: 'oklch(0.7 0.18 145)' },
	{ id: 'teal', label: 'Teal', color: 'oklch(0.7 0.18 190)' },
	{ id: 'blue', label: 'Blue', color: 'oklch(0.62 0.20 240)' },
	{ id: 'purple', label: 'Purple', color: 'oklch(0.62 0.20 290)' },
	{ id: 'pink', label: 'Pink', color: 'oklch(0.72 0.18 330)' },
	{ id: 'gray', label: 'Gray', color: 'oklch(0.6 0.02 0)' },
	{ id: 'black', label: 'Black', color: 'oklch(0.15 0.01 0)' },
	{ id: 'white', label: 'White', color: 'oklch(0.95 0.005 0)' }
]

interface ColorBucketFilterProps {
	selectedBuckets: string[]
	onBucketsChange: (buckets: string[]) => void
}

export function ColorBucketFilter({
	selectedBuckets,
	onBucketsChange
}: ColorBucketFilterProps) {
	const toggleBucket = (bucket: string) => {
		if (selectedBuckets.includes(bucket)) {
			onBucketsChange(selectedBuckets.filter(b => b !== bucket))
		} else {
			onBucketsChange([...selectedBuckets, bucket])
		}
	}

	const clearAll = () => {
		onBucketsChange([])
	}

	const hasFilters = selectedBuckets.length > 0

	return (
		<div>
			<span className="text-xs shrink-0 font-medium">
				Filter by color:
			</span>
			<div className="flex flex-wrap gap-1.5 mt-2">
				{BUCKETS.map(bucket => {
					const isSelected = selectedBuckets.includes(bucket.id)
					return (
						<button
							key={bucket.id}
							onClick={() => toggleBucket(bucket.id)}
							className={cn(
								'group relative flex items-center gap-1.5 rounded-md px-2 py-2 transition-all border',
								'hover:bg-accent/50',
								isSelected && 'bg-accent'
							)}
							title={bucket.label}
						>
							<div
								className={cn(
									'h-4 w-4 rounded-full border transition-all',
									isSelected
										? 'border-foreground/20 ring-2 ring-foreground/10'
										: 'border-border/50 group-hover:border-foreground/30'
								)}
								style={{ backgroundColor: bucket.color }}
							/>
							<span
								className={cn(
									'text-xs',
									isSelected
										? 'font-medium text-foreground'
										: 'text-muted-foreground group-hover:text-foreground'
								)}
							>
								{bucket.label}
							</span>
						</button>
					)
				})}
				{hasFilters && (
					<button
						onClick={clearAll}
						className="p-2 border rounded-md hover:bg-accent transition-colors"
					>
						<X className="size-4" />
					</button>
				)}
			</div>
		</div>
	)
}
