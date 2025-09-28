'use client'

import { SiteLogo } from '@/components/site-logo'
import { UserMenu } from '@/components/user-menu'
import { ThemeEditorSidebar } from '@/components/theme-editor/sidebar'
import {
	SidebarProvider,
	Sidebar,
	SidebarHeader,
	SidebarContent,
	SidebarFooter,
	SidebarInset
} from '@/components/ui/sidebar'
import {
	ThemeDataProvider,
	useThemeData
} from '@/components/providers/theme-data-provider'
import { Moon, Sun } from 'lucide-react'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { use } from 'react'

function ThemeToggle() {
	const { previewMode, setPreviewMode } = useThemeData()
	return (
		<ToggleGroup
			type="single"
			value={previewMode}
			onValueChange={v => {
				if (v === 'light' || v === 'dark') setPreviewMode(v)
			}}
			className="shrink-0"
		>
			<ToggleGroupItem value="light" aria-label="Light">
				<Sun className="size-4" />
			</ToggleGroupItem>
			<ToggleGroupItem value="dark" aria-label="Dark">
				<Moon className="size-4" />
			</ToggleGroupItem>
		</ToggleGroup>
	)
}

export default function ThemeLayout({
	children,
	params
}: {
	children: React.ReactNode
	params: Promise<{ id: string }>
}) {
	// Ensure Next dynamic params are awaited if needed per project rules
	const { id } = use(params)

	return (
		<SidebarProvider>
			<ThemeDataProvider id={id}>
				<Sidebar collapsible="none" className="border-r h-screen w-72">
					<SidebarHeader className="border-b p-4 shadow-lg flex flex-row items-center justify-between">
						<SiteLogo />
						<ThemeToggle />
					</SidebarHeader>
					<SidebarContent>
						{/* Theme editor */}
						<ThemeEditorSidebar />
					</SidebarContent>
					<SidebarFooter className="border-t">
						<UserMenu />
					</SidebarFooter>
				</Sidebar>
				<SidebarInset className="h-screen overflow-auto">
					{children}
				</SidebarInset>
			</ThemeDataProvider>
		</SidebarProvider>
	)
}
