'use client'

import * as React from 'react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import CardsDemo from '@/components/examples/cards'
import AuthenticationDemo from '@/components/examples/authentication'
import DashboardDemo from '@/components/examples/dashboard'
import PlaygroundDemo from '@/components/examples/playground'
import TasksDemo from '@/components/examples/tasks'

export default function ExamplesSwitcher() {
	const [tab, setTab] = React.useState('cards')
	return (
		<Tabs value={tab} onValueChange={setTab} className="space-y-4">
			<TabsList>
				<TabsTrigger value="cards">Cards</TabsTrigger>
				<TabsTrigger value="authentication">Authentication</TabsTrigger>
				<TabsTrigger value="dashboard">Dashboard</TabsTrigger>
				<TabsTrigger value="playground">Playground</TabsTrigger>
				<TabsTrigger value="tasks">Tasks</TabsTrigger>
			</TabsList>
			<TabsContent value="cards">
				<CardsDemo />
			</TabsContent>
			<TabsContent value="authentication">
				<AuthenticationDemo />
			</TabsContent>
			<TabsContent value="dashboard">
				<DashboardDemo />
			</TabsContent>
			<TabsContent value="playground">
				<PlaygroundDemo />
			</TabsContent>
			<TabsContent value="tasks">
				<TasksDemo />
			</TabsContent>
		</Tabs>
	)
}
