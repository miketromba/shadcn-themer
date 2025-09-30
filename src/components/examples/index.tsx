'use client'

import * as React from 'react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import CardsDemo from '@/components/examples/cards'
import AuthenticationDemo from '@/components/examples/authentication'
import DashboardDemo from '@/components/examples/dashboard'
import DashboardDemoTwo from '@/components/examples/dashboard-1'
import TasksDemo from '@/components/examples/tasks'
import { ThemedScope } from '@/components/themed-scope'

export default function ExamplesSwitcher({
	rightChildren
}: {
	rightChildren?: React.ReactNode
}) {
	const [tab, setTab] = React.useState('cards')
	return (
		<Tabs value={tab} onValueChange={setTab}>
			<div className="flex items-center justify-between gap-3 pb-3">
				<TabsList>
					<TabsTrigger value="cards">Cards</TabsTrigger>
					<TabsTrigger value="dashboard">Dashboard</TabsTrigger>
					<TabsTrigger value="tasks">Tasks</TabsTrigger>
					<TabsTrigger value="authentication">
						Authentication
					</TabsTrigger>
					<TabsTrigger value="dash-2">Other Dashboard</TabsTrigger>
				</TabsList>
				{rightChildren}
			</div>
			<ThemedScope>
				<div className="overflow-hidden bg-background text-foreground p-3 rounded-lg">
					<div className="w-[133%] scale-75 -translate-x-1/8 -translate-y-1/8 overflow-hidden">
						<TabsContent value="cards">
							<CardsDemo />
						</TabsContent>
						<TabsContent value="dashboard">
							<DashboardDemo />
						</TabsContent>
						<TabsContent value="tasks">
							<TasksDemo />
						</TabsContent>
						<TabsContent value="authentication">
							<AuthenticationDemo />
						</TabsContent>
						<TabsContent value="dash-2">
							<DashboardDemoTwo />
						</TabsContent>
					</div>
				</div>
			</ThemedScope>
		</Tabs>
	)
}
