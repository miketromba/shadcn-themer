'use client'

import * as React from 'react'
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger
} from '@/components/ui/accordion'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle
} from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow
} from '@/components/ui/table'
import { Progress } from '@/components/ui/progress'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Separator } from '@/components/ui/separator'
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger
} from '@/components/ui/hover-card'
import {
	Popover,
	PopoverContent,
	PopoverTrigger
} from '@/components/ui/popover'
import {
	Bell,
	Calendar,
	Check,
	ChevronRight,
	Info,
	Mail,
	Settings,
	Trash2,
	AlertTriangle
} from 'lucide-react'

export default function ComponentsShowcase() {
	const [progress, setProgress] = React.useState(33)

	React.useEffect(() => {
		const timer = setTimeout(() => setProgress(66), 500)
		return () => clearTimeout(timer)
	}, [])

	return (
		<div className="space-y-8 p-8 bg-background">
			<div>
				<h1 className="text-4xl font-bold mb-2">Components Showcase</h1>
				<p className="text-muted-foreground">
					A comprehensive display of all major UI components to
					visualize your theme
				</p>
			</div>

			<Separator />

			{/* Buttons Section */}
			<section className="space-y-4">
				<h2 className="text-2xl font-semibold">Buttons</h2>
				<div className="flex flex-wrap gap-3">
					<Button>Primary Button</Button>
					<Button variant="secondary">Secondary</Button>
					<Button variant="destructive">Destructive</Button>
					<Button variant="outline">Outline</Button>
					<Button variant="ghost">Ghost</Button>
					<Button variant="link">Link</Button>
					<Button disabled>Disabled</Button>
				</div>
				<div className="flex flex-wrap gap-3">
					<Button size="sm">Small</Button>
					<Button size="default">Default</Button>
					<Button size="lg">Large</Button>
					<Button size="icon">
						<Settings className="h-4 w-4" />
					</Button>
				</div>
			</section>

			<Separator />

			{/* Cards Section */}
			<section className="space-y-4">
				<h2 className="text-2xl font-semibold">Cards</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
					<Card>
						<CardHeader>
							<CardTitle>Card Title</CardTitle>
							<CardDescription>
								Card description with muted foreground
							</CardDescription>
						</CardHeader>
						<CardContent>
							<p className="text-sm">
								This is the card content area.
							</p>
						</CardContent>
						<CardFooter className="flex justify-between">
							<Button variant="ghost">Cancel</Button>
							<Button>Save</Button>
						</CardFooter>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>With Badge</CardTitle>
							<CardDescription>
								Cards can contain any content
							</CardDescription>
						</CardHeader>
						<CardContent className="flex gap-2 flex-wrap">
							<Badge>Default</Badge>
							<Badge variant="secondary">Secondary</Badge>
							<Badge variant="destructive">Destructive</Badge>
							<Badge variant="outline">Outline</Badge>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>Accent Card</CardTitle>
							<CardDescription>
								Shows accent color usage
							</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="bg-accent text-accent-foreground p-4 rounded-md">
								Accent colored section
							</div>
						</CardContent>
					</Card>
				</div>
			</section>

			<Separator />

			{/* Forms Section */}
			<section className="space-y-4">
				<h2 className="text-2xl font-semibold">Form Elements</h2>
				<Card className="max-w-2xl">
					<CardHeader>
						<CardTitle>Example Form</CardTitle>
						<CardDescription>
							Showcasing input, ring, and border colors
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="space-y-2">
							<Label htmlFor="email">Email</Label>
							<Input
								id="email"
								placeholder="Enter your email"
								type="email"
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="message">Message</Label>
							<Textarea
								id="message"
								placeholder="Type your message here"
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="country">Country</Label>
							<Select>
								<SelectTrigger id="country">
									<SelectValue placeholder="Select a country" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="us">
										United States
									</SelectItem>
									<SelectItem value="uk">
										United Kingdom
									</SelectItem>
									<SelectItem value="ca">Canada</SelectItem>
									<SelectItem value="au">
										Australia
									</SelectItem>
								</SelectContent>
							</Select>
						</div>
						<div className="space-y-2">
							<Label>Notifications</Label>
							<div className="flex items-center space-x-2">
								<Checkbox id="notifications" />
								<label
									htmlFor="notifications"
									className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
								>
									Send me email notifications
								</label>
							</div>
						</div>
						<div className="flex items-center space-x-2">
							<Switch id="airplane-mode" />
							<Label htmlFor="airplane-mode">Airplane Mode</Label>
						</div>
						<div className="space-y-2">
							<Label>Volume</Label>
							<Slider
								defaultValue={[50]}
								max={100}
								step={1}
								className="w-full"
							/>
						</div>
						<div className="space-y-2">
							<Label>Select an option</Label>
							<RadioGroup defaultValue="option-1">
								<div className="flex items-center space-x-2">
									<RadioGroupItem
										value="option-1"
										id="option-1"
									/>
									<Label htmlFor="option-1">Option 1</Label>
								</div>
								<div className="flex items-center space-x-2">
									<RadioGroupItem
										value="option-2"
										id="option-2"
									/>
									<Label htmlFor="option-2">Option 2</Label>
								</div>
							</RadioGroup>
						</div>
					</CardContent>
					<CardFooter>
						<Button className="w-full">Submit Form</Button>
					</CardFooter>
				</Card>
			</section>

			<Separator />

			{/* Alerts Section */}
			<section className="space-y-4">
				<h2 className="text-2xl font-semibold">Alerts</h2>
				<div className="space-y-3">
					<Alert>
						<Info className="h-4 w-4" />
						<AlertTitle>Info</AlertTitle>
						<AlertDescription>
							This is a default alert with info icon.
						</AlertDescription>
					</Alert>
					<Alert variant="destructive">
						<AlertTriangle className="h-4 w-4" />
						<AlertTitle>Destructive Alert</AlertTitle>
						<AlertDescription>
							This alert uses the destructive color scheme.
						</AlertDescription>
					</Alert>
				</div>
			</section>

			<Separator />

			{/* Dialogs and Popovers Section */}
			<section className="space-y-4">
				<h2 className="text-2xl font-semibold">Dialogs & Popovers</h2>
				<div className="flex flex-wrap gap-3">
					<AlertDialog>
						<AlertDialogTrigger asChild>
							<Button variant="outline">Open Dialog</Button>
						</AlertDialogTrigger>
						<AlertDialogContent>
							<AlertDialogHeader>
								<AlertDialogTitle>
									Are you sure?
								</AlertDialogTitle>
								<AlertDialogDescription>
									This action cannot be undone. This uses card
									and card-foreground colors.
								</AlertDialogDescription>
							</AlertDialogHeader>
							<AlertDialogFooter>
								<AlertDialogCancel>Cancel</AlertDialogCancel>
								<AlertDialogAction>Continue</AlertDialogAction>
							</AlertDialogFooter>
						</AlertDialogContent>
					</AlertDialog>

					<Popover>
						<PopoverTrigger asChild>
							<Button variant="outline">Open Popover</Button>
						</PopoverTrigger>
						<PopoverContent className="w-80">
							<div className="space-y-2">
								<h4 className="font-medium leading-none">
									Popover Example
								</h4>
								<p className="text-sm text-muted-foreground">
									This popover uses popover and
									popover-foreground colors.
								</p>
								<div className="pt-2">
									<Button size="sm" className="w-full">
										Action
									</Button>
								</div>
							</div>
						</PopoverContent>
					</Popover>

					<HoverCard>
						<HoverCardTrigger asChild>
							<Button variant="link">Hover me</Button>
						</HoverCardTrigger>
						<HoverCardContent className="w-80">
							<div className="space-y-2">
								<h4 className="text-sm font-semibold">
									Hover Card
								</h4>
								<p className="text-sm text-muted-foreground">
									Similar to popover but triggered on hover.
									Also uses popover colors.
								</p>
							</div>
						</HoverCardContent>
					</HoverCard>
				</div>
			</section>

			<Separator />

			{/* Tabs Section */}
			<section className="space-y-4">
				<h2 className="text-2xl font-semibold">Tabs</h2>
				<Tabs defaultValue="tab1" className="w-full">
					<TabsList>
						<TabsTrigger value="tab1">Tab 1</TabsTrigger>
						<TabsTrigger value="tab2">Tab 2</TabsTrigger>
						<TabsTrigger value="tab3">Tab 3</TabsTrigger>
					</TabsList>
					<TabsContent value="tab1" className="space-y-4">
						<Card>
							<CardHeader>
								<CardTitle>First Tab</CardTitle>
							</CardHeader>
							<CardContent>
								<p className="text-sm text-muted-foreground">
									Content for the first tab goes here.
								</p>
							</CardContent>
						</Card>
					</TabsContent>
					<TabsContent value="tab2" className="space-y-4">
						<Card>
							<CardHeader>
								<CardTitle>Second Tab</CardTitle>
							</CardHeader>
							<CardContent>
								<p className="text-sm text-muted-foreground">
									Content for the second tab goes here.
								</p>
							</CardContent>
						</Card>
					</TabsContent>
					<TabsContent value="tab3" className="space-y-4">
						<Card>
							<CardHeader>
								<CardTitle>Third Tab</CardTitle>
							</CardHeader>
							<CardContent>
								<p className="text-sm text-muted-foreground">
									Content for the third tab goes here.
								</p>
							</CardContent>
						</Card>
					</TabsContent>
				</Tabs>
			</section>

			<Separator />

			{/* Accordion Section */}
			<section className="space-y-4">
				<h2 className="text-2xl font-semibold">Accordion</h2>
				<Accordion type="single" collapsible className="w-full">
					<AccordionItem value="item-1">
						<AccordionTrigger>Is it accessible?</AccordionTrigger>
						<AccordionContent>
							Yes. It adheres to the WAI-ARIA design pattern.
						</AccordionContent>
					</AccordionItem>
					<AccordionItem value="item-2">
						<AccordionTrigger>Is it styled?</AccordionTrigger>
						<AccordionContent>
							Yes. It comes with default styles that matches the
							other components aesthetic.
						</AccordionContent>
					</AccordionItem>
					<AccordionItem value="item-3">
						<AccordionTrigger>Is it animated?</AccordionTrigger>
						<AccordionContent>
							Yes. It&apos;s animated by default, but you can
							disable it if you prefer.
						</AccordionContent>
					</AccordionItem>
				</Accordion>
			</section>

			<Separator />

			{/* Table Section */}
			<section className="space-y-4">
				<h2 className="text-2xl font-semibold">Table</h2>
				<div className="rounded-md border">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead className="w-[100px]">
									Invoice
								</TableHead>
								<TableHead>Status</TableHead>
								<TableHead>Method</TableHead>
								<TableHead className="text-right">
									Amount
								</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							<TableRow>
								<TableCell className="font-medium">
									INV001
								</TableCell>
								<TableCell>
									<Badge>Paid</Badge>
								</TableCell>
								<TableCell>Credit Card</TableCell>
								<TableCell className="text-right">
									$250.00
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell className="font-medium">
									INV002
								</TableCell>
								<TableCell>
									<Badge variant="secondary">Pending</Badge>
								</TableCell>
								<TableCell>PayPal</TableCell>
								<TableCell className="text-right">
									$150.00
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell className="font-medium">
									INV003
								</TableCell>
								<TableCell>
									<Badge>Paid</Badge>
								</TableCell>
								<TableCell>Bank Transfer</TableCell>
								<TableCell className="text-right">
									$350.00
								</TableCell>
							</TableRow>
						</TableBody>
					</Table>
				</div>
			</section>

			<Separator />

			{/* Progress Section */}
			<section className="space-y-4">
				<h2 className="text-2xl font-semibold">Progress</h2>
				<div className="space-y-2">
					<Progress value={progress} className="w-full" />
					<p className="text-sm text-muted-foreground">
						{progress}% complete
					</p>
				</div>
			</section>

			<Separator />

			{/* Muted Section */}
			<section className="space-y-4">
				<h2 className="text-2xl font-semibold">Muted & Secondary</h2>
				<div className="space-y-3">
					<div className="bg-muted text-muted-foreground p-4 rounded-md">
						This section uses muted background and muted foreground
						colors. Perfect for de-emphasized content.
					</div>
					<div className="bg-secondary text-secondary-foreground p-4 rounded-md">
						This section uses secondary background and secondary
						foreground colors.
					</div>
					<div className="bg-accent text-accent-foreground p-4 rounded-md">
						This section uses accent background and accent
						foreground colors.
					</div>
				</div>
			</section>

			<Separator />

			{/* Navigation Items */}
			<section className="space-y-4">
				<h2 className="text-2xl font-semibold">Navigation Items</h2>
				<Card>
					<CardContent className="pt-6">
						<nav className="space-y-1">
							<button className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground transition-colors">
								<Mail className="h-4 w-4" />
								Inbox
								<Badge className="ml-auto" variant="secondary">
									12
								</Badge>
							</button>
							<button className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground transition-colors">
								<Calendar className="h-4 w-4" />
								Calendar
							</button>
							<button className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground transition-colors">
								<Settings className="h-4 w-4" />
								Settings
								<ChevronRight className="ml-auto h-4 w-4" />
							</button>
							<button className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm text-destructive hover:bg-accent hover:text-accent-foreground transition-colors">
								<Trash2 className="h-4 w-4" />
								Delete
							</button>
						</nav>
					</CardContent>
				</Card>
			</section>
		</div>
	)
}
