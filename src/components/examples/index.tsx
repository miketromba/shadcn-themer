'use client'

import * as React from 'react'
import { Tabs, TabsContent } from '@/components/ui/tabs'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import CardsDemo from '@/components/examples/cards'
import AuthenticationDemo from '@/components/examples/authentication'
import DashboardDemo from '@/components/examples/dashboard'
import DashboardDemoTwo from '@/components/examples/dashboard-1'
import TasksDemo from '@/components/examples/tasks'
import ComponentsShowcase from '@/components/examples/components-showcase'
import PopoverShowcase from '@/components/examples/popover-showcase'
import ChartsShowcase from '@/components/examples/charts-showcase'
import { ThemedScope } from '@/components/themed-scope'
import { useThemeData } from '@/components/providers/theme-data-provider'
import { EXAMPLE_IDS } from '@/lib/colorExampleMapping'
import type { ExampleId } from '@/lib/colorExampleMapping'

const EXAMPLES = [
	{ id: EXAMPLE_IDS.CARDS, label: 'Cards' },
	{ id: EXAMPLE_IDS.DASHBOARD, label: 'Dashboard' },
	{ id: EXAMPLE_IDS.CHARTS, label: 'Charts' },
	{ id: EXAMPLE_IDS.TASKS, label: 'Tasks' },
	{ id: EXAMPLE_IDS.AUTHENTICATION, label: 'Authentication' },
	{ id: EXAMPLE_IDS.COMPONENTS_SHOWCASE, label: 'Components' },
	{ id: EXAMPLE_IDS.POPOVER_SHOWCASE, label: 'Popovers' },
	{ id: EXAMPLE_IDS.DASH_2, label: 'Other Dashboard' }
] as const

export default function ExamplesSwitcher({
	rightChildren
}: {
	rightChildren?: React.ReactNode
}) {
	const { activeExample, setActiveExample } = useThemeData()

	const currentIndex = EXAMPLES.findIndex(ex => ex.id === activeExample)
	const currentExample = EXAMPLES[currentIndex]

	const handlePrevious = () => {
		const prevIndex =
			currentIndex > 0 ? currentIndex - 1 : EXAMPLES.length - 1
		setActiveExample(EXAMPLES[prevIndex].id)
	}

	const handleNext = () => {
		const nextIndex =
			currentIndex < EXAMPLES.length - 1 ? currentIndex + 1 : 0
		setActiveExample(EXAMPLES[nextIndex].id)
	}

	return (
		<Tabs
			value={activeExample}
			onValueChange={value => setActiveExample(value as ExampleId)}
		>
			<div className="flex items-center justify-between gap-3 pb-3">
				<div className="flex items-center gap-2">
					<Button
						variant="outline"
						size="icon"
						onClick={handlePrevious}
						aria-label="Previous example"
					>
						<ChevronLeft className="h-4 w-4" />
					</Button>
					<Select
						value={activeExample}
						onValueChange={value =>
							setActiveExample(value as ExampleId)
						}
					>
						<SelectTrigger className="w-[200px]">
							<SelectValue placeholder="Select example">
								{currentExample?.label}
							</SelectValue>
						</SelectTrigger>
						<SelectContent>
							{EXAMPLES.map(example => (
								<SelectItem key={example.id} value={example.id}>
									{example.label}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
					<Button
						variant="outline"
						size="icon"
						onClick={handleNext}
						aria-label="Next example"
					>
						<ChevronRight className="h-4 w-4" />
					</Button>
				</div>
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
						<TabsContent value={EXAMPLE_IDS.CHARTS}>
							<ChartsShowcase />
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
