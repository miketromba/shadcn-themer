import { SiteLogo } from '@/components/site-logo'
import { UserMenu } from '@/components/user-menu'
import {
	SidebarProvider,
	Sidebar,
	SidebarHeader,
	SidebarContent,
	SidebarFooter,
	SidebarMenu,
	SidebarMenuItem,
	SidebarMenuButton,
	SidebarInset
} from '@/components/ui/sidebar'

export default async function ThemeLayout({
	children,
	params
}: {
	children: React.ReactNode
	params: Promise<{ id: string }>
}) {
	// Ensure Next dynamic params are awaited if needed per project rules
	await params

	return (
		<SidebarProvider>
			<Sidebar collapsible="none" className="border-r h-screen w-72">
				<SidebarHeader className="border-b p-4">
					<SiteLogo />
				</SidebarHeader>
				<SidebarContent></SidebarContent>
				<SidebarFooter className="border-t">
					<UserMenu />
				</SidebarFooter>
			</Sidebar>
			<SidebarInset className="px-6 py-3 h-screen overflow-auto">
				{children}
			</SidebarInset>
		</SidebarProvider>
	)
}
