'use client'

import * as React from 'react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import CardsDemo from '@/components/examples/cards'
import AuthenticationDemo from '@/components/examples/authentication'
import DashboardDemo from '@/components/examples/dashboard'
import DashboardDemoTwo from '@/components/examples/dashboard-1'
import TasksDemo from '@/components/examples/tasks'
import ComponentsShowcase from '@/components/examples/components-showcase'
import PopoverShowcase from '@/components/examples/popover-showcase'
import { ThemedScope } from '@/components/themed-scope'
import { useThemeData } from '@/components/providers/theme-data-provider'
import { EXAMPLE_IDS } from '@/lib/colorExampleMapping'
import type { ExampleId } from '@/lib/colorExampleMapping'

export default function ExamplesSwitcher({
	rightChildren
}: {
	rightChildren?: React.ReactNode
}) {
	const { activeExample, setActiveExample } = useThemeData()
	return (
		<Tabs
			value={activeExample}
			onValueChange={value => setActiveExample(value as ExampleId)}
		>
			<div className="flex items-center justify-between gap-3 pb-3">
				<TabsList>
					<TabsTrigger value={EXAMPLE_IDS.CARDS}>Cards</TabsTrigger>
					<TabsTrigger value={EXAMPLE_IDS.DASHBOARD}>
						Dashboard
					</TabsTrigger>
					<TabsTrigger value={EXAMPLE_IDS.TASKS}>Tasks</TabsTrigger>
					<TabsTrigger value={EXAMPLE_IDS.AUTHENTICATION}>
						Authentication
					</TabsTrigger>
					<TabsTrigger value={EXAMPLE_IDS.COMPONENTS_SHOWCASE}>
						Components
					</TabsTrigger>
					<TabsTrigger value={EXAMPLE_IDS.POPOVER_SHOWCASE}>
						Popovers
					</TabsTrigger>
					<TabsTrigger value={EXAMPLE_IDS.DASH_2}>
						Other Dashboard
					</TabsTrigger>
				</TabsList>
				{rightChildren}
			</div>
			<ThemedScope>
				<div className="overflow-hidden bg-background text-foreground p-3 rounded-lg">
					<div className="w-[133%] scale-75 -translate-x-1/8 -translate-y-1/8 overflow-hidden">
						<TabsContent value={EXAMPLE_IDS.CARDS}>
							<CardsDemo />
						</TabsContent>
						<TabsContent value={EXAMPLE_IDS.DASHBOARD}>
							<DashboardDemo />
						</TabsContent>
						<TabsContent value={EXAMPLE_IDS.TASKS}>
							<TasksDemo />
						</TabsContent>
						<TabsContent value={EXAMPLE_IDS.AUTHENTICATION}>
							<AuthenticationDemo />
						</TabsContent>
						<TabsContent value={EXAMPLE_IDS.COMPONENTS_SHOWCASE}>
							<ComponentsShowcase />
						</TabsContent>
						<TabsContent value={EXAMPLE_IDS.POPOVER_SHOWCASE}>
							<PopoverShowcase />
						</TabsContent>
						<TabsContent value={EXAMPLE_IDS.DASH_2}>
							<DashboardDemoTwo />
						</TabsContent>
					</div>
				</div>
			</ThemedScope>
		</Tabs>
	)
}
