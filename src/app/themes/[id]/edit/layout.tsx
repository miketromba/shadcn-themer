'use client'

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
import { ThemeDataProvider } from '@/components/providers/theme-data-provider'
import { PreviewModeToggle } from '@/components/preview-mode-toggle'
import { use } from 'react'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

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
						<Link href="/">
							<Button
								variant="ghost"
								size="sm"
								type="button"
								className="rounded-md hover:bg-muted -ml-2"
								aria-label="Go back"
							>
								<ArrowLeft className="size-4" />
								All Themes
							</Button>
						</Link>
						<PreviewModeToggle size="sm" />
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
