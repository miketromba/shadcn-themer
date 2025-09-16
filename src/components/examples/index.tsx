'use client'

import * as React from 'react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import CardsDemo from '@/components/examples/cards'
import AuthenticationDemo from '@/components/examples/authentication'
import DashboardDemo from '@/components/examples/dashboard'
import DashboardDemoTwo from '@/components/examples/dashboard-1'
import TasksDemo from '@/components/examples/tasks'

export default function ExamplesSwitcher() {
	const [tab, setTab] = React.useState('cards')
	return (
		<Tabs value={tab} onValueChange={setTab}>
			<TabsList className="pb-3">
				<TabsTrigger value="cards">Cards</TabsTrigger>
				<TabsTrigger value="dashboard">Dashboard</TabsTrigger>
				<TabsTrigger value="tasks">Tasks</TabsTrigger>
				<TabsTrigger value="authentication">Authentication</TabsTrigger>
				<TabsTrigger value="dash-2">Other Dashboard</TabsTrigger>
			</TabsList>
			<div className="overflow-hidden">
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
		</Tabs>
	)
}
