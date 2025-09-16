'use client'

import * as React from 'react'
import * as TabsPrimitive from '@radix-ui/react-tabs'

import { cn } from '@/lib/utils'

function Tabs({
	className,
	...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
	return (
		<TabsPrimitive.Root
			data-slot="tabs"
			className={cn('flex flex-col gap-0', className)}
			{...props}
		/>
	)
}

function TabsList({
	className,
	...props
}: React.ComponentProps<typeof TabsPrimitive.List>) {
	return (
		<TabsPrimitive.List
			data-slot="tabs-list"
			className={cn(
				'text-muted-foreground -mb-px -mx-2 flex w-full items-center',
				className
			)}
			{...props}
		/>
	)
}

function TabsTrigger({
	className,
	...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
	return (
		<TabsPrimitive.Trigger
			data-slot="tabs-trigger"
			className={cn(
				'inline-flex items-center justify-center gap-1.5 bg-transparent px-4 py-3 text-base font-medium whitespace-nowrap transition-colors duration-200',
				'rounded-none text-muted-foreground',
				'hover:text-foreground data-[state=active]:text-foreground',
				'disabled:pointer-events-none disabled:opacity-50',
				'focus-visible:outline-none focus-visible:ring-0',
				"[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
				'cursor-pointer',
				className
			)}
			{...props}
		/>
	)
}

function TabsContent({
	className,
	...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
	return (
		<TabsPrimitive.Content
			data-slot="tabs-content"
			className={cn('flex-1 outline-hidden', className)}
			{...props}
		/>
	)
}

export { Tabs, TabsList, TabsTrigger, TabsContent }
