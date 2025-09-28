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
import { ThemeDataProvider } from '@/components/providers/theme-data-provider'

export default async function ThemeLayout({
	children,
	params
}: {
	children: React.ReactNode
	params: Promise<{ id: string }>
}) {
	// Ensure Next dynamic params are awaited if needed per project rules
	const { id } = await params

	return (
		<SidebarProvider>
			<ThemeDataProvider id={id}>
				<Sidebar collapsible="none" className="border-r h-screen w-72">
					<SidebarHeader className="border-b p-4 shadow-lg">
						<SiteLogo />
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
