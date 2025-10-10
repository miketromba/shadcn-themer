'use client'

import { type Icon } from '@tabler/icons-react'

import {
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem
} from '@/components/ui/sidebar'

export function NavMain({
	items
}: {
	items: {
		title: string
		url: string
		icon?: Icon
	}[]
}) {
	return (
		<SidebarGroup>
			<SidebarGroupContent>
				<SidebarGroupLabel>Home</SidebarGroupLabel>
				<SidebarMenu>
					{items.map((item, index) => (
						<SidebarMenuItem key={item.title}>
							<SidebarMenuButton
								tooltip={item.title}
								isActive={index === 0}
							>
								{item.icon && <item.icon />}
								<span>{item.title}</span>
							</SidebarMenuButton>
						</SidebarMenuItem>
					))}
				</SidebarMenu>
			</SidebarGroupContent>
		</SidebarGroup>
	)
}
