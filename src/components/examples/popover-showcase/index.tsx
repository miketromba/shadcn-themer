'use client'

import * as React from 'react'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Calendar, Settings, User, Mail, Bell } from 'lucide-react'

export default function PopoverShowcase() {
	return (
		<div className="p-8 space-y-8 bg-background">
			<div>
				<h1 className="text-4xl font-bold mb-2">Popover Showcase</h1>
				<p className="text-muted-foreground">
					Always-visible popover examples to see popover and
					popover-foreground colors in real-time
				</p>
			</div>

			<Separator />

			<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
				{/* Popover 1 - User Profile */}
				<div className="space-y-3">
					<h3 className="text-sm font-medium text-muted-foreground">
						User Menu Popover
					</h3>
					<div className="bg-popover text-popover-foreground rounded-md border shadow-md p-4 w-full">
						<div className="flex items-start gap-3">
							<div className="bg-primary text-primary-foreground rounded-full p-2">
								<User className="h-4 w-4" />
							</div>
							<div className="flex-1 space-y-1">
								<p className="text-sm font-medium leading-none">
									shadcn
								</p>
								<p className="text-sm text-muted-foreground">
									m@example.com
								</p>
							</div>
						</div>
						<Separator className="my-3" />
						<div className="space-y-1">
							<button className="w-full text-left text-sm px-2 py-1.5 rounded-sm hover:bg-accent hover:text-accent-foreground transition-colors">
								Profile
							</button>
							<button className="w-full text-left text-sm px-2 py-1.5 rounded-sm hover:bg-accent hover:text-accent-foreground transition-colors">
								Settings
							</button>
							<button className="w-full text-left text-sm px-2 py-1.5 rounded-sm hover:bg-accent hover:text-accent-foreground transition-colors">
								Billing
							</button>
						</div>
						<Separator className="my-3" />
						<button className="w-full text-left text-sm px-2 py-1.5 rounded-sm hover:bg-accent hover:text-accent-foreground transition-colors">
							Log out
						</button>
					</div>
				</div>

				{/* Popover 2 - Calendar Picker */}
				<div className="space-y-3">
					<h3 className="text-sm font-medium text-muted-foreground">
						Date Picker Popover
					</h3>
					<div className="bg-popover text-popover-foreground rounded-md border shadow-md p-4 w-full">
						<div className="flex items-center justify-between mb-3">
							<h4 className="text-sm font-semibold">
								Select Date
							</h4>
							<Calendar className="h-4 w-4" />
						</div>
						<div className="space-y-2">
							<div className="grid grid-cols-7 gap-1 text-center text-xs">
								{['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(
									day => (
										<div
											key={day}
											className="text-muted-foreground font-medium"
										>
											{day}
										</div>
									)
								)}
							</div>
							<div className="grid grid-cols-7 gap-1 text-center text-xs">
								{Array.from({ length: 35 }, (_, i) => {
									const day = i - 2
									if (day < 1 || day > 31)
										return <div key={i} />
									const isToday = day === 15
									return (
										<button
											key={i}
											className={`h-7 w-7 rounded-sm hover:bg-accent hover:text-accent-foreground transition-colors ${
												isToday
													? 'bg-primary text-primary-foreground'
													: ''
											}`}
										>
											{day}
										</button>
									)
								})}
							</div>
						</div>
					</div>
				</div>

				{/* Popover 3 - Settings Form */}
				<div className="space-y-3">
					<h3 className="text-sm font-medium text-muted-foreground">
						Settings Popover
					</h3>
					<div className="bg-popover text-popover-foreground rounded-md border shadow-md p-4 w-full">
						<div className="flex items-center gap-2 mb-3">
							<Settings className="h-4 w-4" />
							<h4 className="text-sm font-semibold">
								Quick Settings
							</h4>
						</div>
						<div className="space-y-3">
							<div className="space-y-1.5">
								<Label
									htmlFor="name"
									className="text-xs text-popover-foreground"
								>
									Display name
								</Label>
								<Input
									id="name"
									placeholder="Enter name"
									className="h-8"
								/>
							</div>
							<div className="space-y-1.5">
								<Label
									htmlFor="email"
									className="text-xs text-popover-foreground"
								>
									Email
								</Label>
								<Input
									id="email"
									type="email"
									placeholder="email@example.com"
									className="h-8"
								/>
							</div>
							<Separator />
							<div className="flex gap-2 pt-1">
								<Button size="sm" className="flex-1">
									Save
								</Button>
								<Button
									size="sm"
									variant="outline"
									className="flex-1"
								>
									Cancel
								</Button>
							</div>
						</div>
					</div>
				</div>

				{/* Popover 4 - Notifications */}
				<div className="space-y-3">
					<h3 className="text-sm font-medium text-muted-foreground">
						Notifications Popover
					</h3>
					<div className="bg-popover text-popover-foreground rounded-md border shadow-md p-4 w-full">
						<div className="flex items-center justify-between mb-3">
							<h4 className="text-sm font-semibold">
								Notifications
							</h4>
							<Bell className="h-4 w-4" />
						</div>
						<div className="space-y-2">
							<div className="p-2 rounded-sm hover:bg-accent hover:text-accent-foreground transition-colors">
								<p className="text-xs font-medium">
									New message
								</p>
								<p className="text-xs text-muted-foreground">
									You have a new message from John
								</p>
							</div>
							<div className="p-2 rounded-sm hover:bg-accent hover:text-accent-foreground transition-colors">
								<p className="text-xs font-medium">
									Update available
								</p>
								<p className="text-xs text-muted-foreground">
									A new version is ready to install
								</p>
							</div>
							<div className="p-2 rounded-sm hover:bg-accent hover:text-accent-foreground transition-colors">
								<p className="text-xs font-medium">
									System alert
								</p>
								<p className="text-xs text-muted-foreground">
									Your session will expire soon
								</p>
							</div>
						</div>
						<Separator className="my-3" />
						<button className="w-full text-center text-xs py-1.5 rounded-sm hover:bg-accent hover:text-accent-foreground transition-colors">
							Mark all as read
						</button>
					</div>
				</div>

				{/* Popover 5 - Contact Info */}
				<div className="space-y-3">
					<h3 className="text-sm font-medium text-muted-foreground">
						Contact Card Popover
					</h3>
					<div className="bg-popover text-popover-foreground rounded-md border shadow-md p-4 w-full">
						<div className="space-y-3">
							<div className="flex items-center gap-3">
								<div className="bg-muted rounded-full p-3">
									<User className="h-5 w-5" />
								</div>
								<div>
									<p className="text-sm font-medium">
										John Doe
									</p>
									<p className="text-xs text-muted-foreground">
										@johndoe
									</p>
								</div>
							</div>
							<p className="text-xs text-popover-foreground">
								Full-stack developer passionate about creating
								beautiful user experiences
							</p>
							<Separator />
							<div className="space-y-2 text-xs">
								<div className="flex items-center gap-2">
									<Mail className="h-3 w-3 text-muted-foreground" />
									<span>john@example.com</span>
								</div>
								<div className="flex items-center gap-2">
									<Calendar className="h-3 w-3 text-muted-foreground" />
									<span>Joined March 2024</span>
								</div>
							</div>
							<Button size="sm" className="w-full">
								View Profile
							</Button>
						</div>
					</div>
				</div>

				{/* Popover 6 - Command Menu */}
				<div className="space-y-3">
					<h3 className="text-sm font-medium text-muted-foreground">
						Command Menu Popover
					</h3>
					<div className="bg-popover text-popover-foreground rounded-md border shadow-md p-4 w-full">
						<div className="space-y-2">
							<Input
								placeholder="Type a command..."
								className="h-8"
							/>
							<Separator />
							<div className="space-y-1">
								<p className="text-xs text-muted-foreground px-2 py-1">
									Suggestions
								</p>
								<button className="w-full text-left text-sm px-2 py-1.5 rounded-sm hover:bg-accent hover:text-accent-foreground transition-colors flex items-center gap-2">
									<Calendar className="h-3 w-3" />
									Open Calendar
								</button>
								<button className="w-full text-left text-sm px-2 py-1.5 rounded-sm hover:bg-accent hover:text-accent-foreground transition-colors flex items-center gap-2">
									<Settings className="h-3 w-3" />
									Open Settings
								</button>
								<button className="w-full text-left text-sm px-2 py-1.5 rounded-sm hover:bg-accent hover:text-accent-foreground transition-colors flex items-center gap-2">
									<User className="h-3 w-3" />
									View Profile
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>

			<Separator />

			<Card>
				<CardHeader>
					<CardTitle>About Popover Colors</CardTitle>
					<CardDescription>
						Understanding popover and popover-foreground colors
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-3 text-sm">
					<div className="bg-popover text-popover-foreground border rounded-md p-4">
						<p className="font-medium mb-2">
							This is a popover surface
						</p>
						<p>
							The{' '}
							<code className="text-xs bg-muted px-1 py-0.5 rounded">
								popover
							</code>{' '}
							color defines the background of floating UI elements
							like dropdowns, tooltips, and menus.
						</p>
						<p className="mt-2">
							The{' '}
							<code className="text-xs bg-muted px-1 py-0.5 rounded">
								popover-foreground
							</code>{' '}
							color defines the text color on these surfaces.
						</p>
					</div>
					<p className="text-muted-foreground">
						All the examples above use these colors to create
						consistent, accessible floating UI elements throughout
						your application.
					</p>
				</CardContent>
			</Card>
		</div>
	)
}
