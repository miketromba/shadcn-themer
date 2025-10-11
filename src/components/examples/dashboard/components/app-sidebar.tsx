'use client'

import * as React from 'react'
import Link from 'next/link'
import {
	IconCamera,
	IconChartBar,
	IconDashboard,
	IconDatabase,
	IconFileAi,
	IconFileDescription,
	IconFileWord,
	IconFolder,
	IconHelp,
	IconInnerShadowTop,
	IconListDetails,
	IconReport,
	IconSearch,
	IconSettings,
	IconUsers
} from '@tabler/icons-react'

import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarInput
} from '@/components/ui/sidebar'
import { Badge } from '@/components/ui/badge'
import { NavDocuments } from '@/components/examples/dashboard/components/nav-documents'
import { NavMain } from '@/components/examples/dashboard/components/nav-main'
import { NavSecondary } from '@/components/examples/dashboard/components/nav-secondary'
import { NavUser } from '@/components/examples/dashboard/components/nav-user'
import { useThemeData } from '@/components/providers/theme-data-provider'

const data = {
	user: {
		name: 'shadcn',
		email: 'm@example.com',
		avatar: '/avatars/shadcn.jpg'
	},
	navMain: [
		{
			title: 'Dashboard',
			url: '#',
			icon: IconDashboard
		},
		{
			title: 'Lifecycle',
			url: '#',
			icon: IconListDetails
		},
		{
			title: 'Analytics',
			url: '#',
			icon: IconChartBar
		},
		{
			title: 'Projects',
			url: '#',
			icon: IconFolder
		},
		{
			title: 'Team',
			url: '#',
			icon: IconUsers
		}
	],
	navClouds: [
		{
			title: 'Capture',
			icon: IconCamera,
			isActive: true,
			url: '#',
			items: [
				{
					title: 'Active Proposals',
					url: '#'
				},
				{
					title: 'Archived',
					url: '#'
				}
			]
		},
		{
			title: 'Proposal',
			icon: IconFileDescription,
			url: '#',
			items: [
				{
					title: 'Active Proposals',
					url: '#'
				},
				{
					title: 'Archived',
					url: '#'
				}
			]
		},
		{
			title: 'Prompts',
			icon: IconFileAi,
			url: '#',
			items: [
				{
					title: 'Active Proposals',
					url: '#'
				},
				{
					title: 'Archived',
					url: '#'
				}
			]
		}
	],
	navSecondary: [
		{
			title: 'Settings',
			url: '#',
			icon: IconSettings
		},
		{
			title: 'Get Help',
			url: '#',
			icon: IconHelp
		},
		{
			title: 'Search',
			url: '#',
			icon: IconSearch
		}
	],
	documents: [
		{
			name: 'Data Library',
			url: '#',
			icon: IconDatabase
		},
		{
			name: 'Reports',
			url: '#',
			icon: IconReport
		},
		{
			name: 'Word Assistant',
			url: '#',
			icon: IconFileWord
		}
	]
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	const { editingColorKey } = useThemeData()
	const isEditingSidebarRing = editingColorKey === 'sidebar-ring'
	const activeMenuButtonRef = React.useRef<HTMLButtonElement>(null)

	return (
		<Sidebar collapsible="none" className="h-auto border-r" {...props}>
			<SidebarHeader className="border-b">
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton
							asChild
							className="data-[slot=sidebar-menu-button]:!p-1.5"
						>
							<Link href="#">
								<IconInnerShadowTop className="!size-5" />
								<span className="text-base font-semibold">
									Acme Inc.
								</span>
								{/* Status badge using sidebar-primary via Badge component */}
								<Badge className="ml-auto bg-sidebar-primary text-sidebar-primary-foreground border-sidebar-primary">
									Pro
								</Badge>
							</Link>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
				{/* Search input */}
				<div className="relative">
					<IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-sidebar-foreground/50 pointer-events-none" />
					<SidebarInput placeholder="Search..." className="pl-9" />
				</div>
			</SidebarHeader>
			<SidebarContent>
				{/* NavMain with ref to active button - shows sidebar-ring when editing */}
				<NavMain
					items={data.navMain}
					activeButtonRef={activeMenuButtonRef}
					showActiveRing={isEditingSidebarRing}
				/>
				{/* Wrapper div to add border-t and showcase sidebar-border */}
				<div className="border-t border-sidebar-border pt-2">
					<NavDocuments items={data.documents} />
				</div>
				<NavSecondary items={data.navSecondary} className="mt-auto" />
			</SidebarContent>
			<SidebarFooter className="border-t border-sidebar-border">
				{/* Button to showcase sidebar-border */}
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton
							variant="outline"
							tooltip="Quick Settings"
						>
							<IconSettings />
							<span>Quick Settings</span>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
				<NavUser user={data.user} />
			</SidebarFooter>
		</Sidebar>
	)
}
