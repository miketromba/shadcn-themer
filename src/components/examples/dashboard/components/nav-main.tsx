'use client'

import { type Icon } from '@tabler/icons-react'

import {
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuBadge
} from '@/components/ui/sidebar'

export function NavMain({
	items,
	activeButtonRef,
	showActiveRing
}: {
	items: {
		title: string
		url: string
		icon?: Icon
	}[]
	activeButtonRef?: React.RefObject<HTMLButtonElement | null>
	showActiveRing?: boolean
}) {
	return (
		<SidebarGroup>
			<SidebarGroupContent>
				<SidebarGroupLabel>Home</SidebarGroupLabel>
				<SidebarMenu>
					{items.map((item, index) => (
						<SidebarMenuItem key={item.title}>
							<SidebarMenuButton
								ref={index === 0 ? activeButtonRef : undefined}
								tooltip={item.title}
								isActive={index === 0}
								className={
									index === 0 && showActiveRing
										? 'ring-2 ring-sidebar-ring'
										: undefined
								}
							>
								{item.icon && <item.icon />}
								<span>{item.title}</span>
							</SidebarMenuButton>
							{/* Show primary badge on active item to showcase sidebar-primary */}
							{index === 0 && (
								<SidebarMenuBadge className="bg-sidebar-primary !text-sidebar-primary-foreground">
									New
								</SidebarMenuBadge>
							)}
						</SidebarMenuItem>
					))}
				</SidebarMenu>
			</SidebarGroupContent>
		</SidebarGroup>
	)
}
