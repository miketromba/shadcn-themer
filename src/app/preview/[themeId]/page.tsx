import * as React from 'react'
import CardsDemo from '@/components/examples/cards'
import AuthenticationDemo from '@/components/examples/authentication'
import DashboardDemo from '@/components/examples/dashboard'
import DashboardDemoTwo from '@/components/examples/dashboard-1'
import TasksDemo from '@/components/examples/tasks'
import { ThemeDataProvider } from '@/components/providers/theme-data-provider'
import { ThemedScope } from '@/components/themed-scope'

type PageProps = {
	params: Promise<{ themeId: string }>
	searchParams: Promise<{ demo?: string; mode?: 'light' | 'dark' }>
}

export default async function Page({ params, searchParams }: PageProps) {
	const { themeId } = await params
	const { demo, mode } = await searchParams

	const initialPreviewMode: 'light' | 'dark' =
		mode === 'dark' ? 'dark' : 'light'

	const DemoComponent = (() => {
		switch (demo) {
			case 'dashboard':
				return DashboardDemo
			case 'dash-2':
				return DashboardDemoTwo
			case 'tasks':
				return TasksDemo
			case 'auth':
				return AuthenticationDemo
			case 'cards':
			default:
				return CardsDemo
		}
	})()

	return (
		<ThemeDataProvider id={themeId} initialPreviewMode={initialPreviewMode}>
			<ThemedScope>
				<div className="min-h-screen w-full bg-background p-6">
					<div className="mx-auto max-w-[1440px]">
						<DemoComponent />
					</div>
				</div>
			</ThemedScope>
		</ThemeDataProvider>
	)
}
