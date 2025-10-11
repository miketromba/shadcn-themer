'use client'

import { useState } from 'react'
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Check, Copy } from 'lucide-react'
import type { ShadcnTheme } from '@/lib/shadcnTheme'
import { generateThemeCSS } from '@/lib/generateThemeCSS'

interface CodeExportModalProps {
	open: boolean
	onOpenChange: (open: boolean) => void
	theme: ShadcnTheme
	themeId?: string
}

export function CodeExportModal({
	open,
	onOpenChange,
	theme,
	themeId
}: CodeExportModalProps) {
	const [copied, setCopied] = useState(false)
	const [copiedInstall, setCopiedInstall] = useState(false)
	const [selectedTab, setSelectedTab] = useState('pnpm')
	const cssCode = generateThemeCSS(theme)

	const baseUrl = typeof window !== 'undefined' ? window.location.origin : ''
	const themeUrl = themeId ? `${baseUrl}/r/themes/${themeId}.json` : ''

	const installCommands = {
		pnpm: `pnpm dlx shadcn@latest add ${themeUrl}`,
		npm: `npx shadcn@latest add ${themeUrl}`,
		yarn: `yarn dlx shadcn@latest add ${themeUrl}`,
		bun: `bunx shadcn@latest add ${themeUrl}`
	}

	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(cssCode)
			setCopied(true)
			setTimeout(() => setCopied(false), 2000)
		} catch (err) {
			console.error('Failed to copy:', err)
		}
	}

	const handleCopyInstall = async () => {
		try {
			await navigator.clipboard.writeText(
				installCommands[selectedTab as keyof typeof installCommands]
			)
			setCopiedInstall(true)
			setTimeout(() => setCopiedInstall(false), 2000)
		} catch (err) {
			console.error('Failed to copy:', err)
		}
	}

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="!max-w-2xl flex flex-col p-0 gap-0">
				<DialogHeader className="px-6 pt-6 pb-4">
					<DialogTitle className="text-2xl">
						Export Theme Code
					</DialogTitle>
					<DialogDescription className="text-base">
						Install via CLI or copy the CSS code manually.
					</DialogDescription>
				</DialogHeader>

				{/* Install Command Tabs */}
				{themeId && (
					<div className="mx-6 mb-4 rounded-lg border bg-card overflow-hidden">
						<Tabs
							value={selectedTab}
							onValueChange={setSelectedTab}
							defaultValue="pnpm"
						>
							<div className="flex items-center justify-between pl-2 pr-3 py-2 border-b bg-muted/50">
								<TabsList className="gap-0">
									<TabsTrigger
										value="pnpm"
										className="px-3 py-1.5 text-sm"
									>
										pnpm
									</TabsTrigger>
									<TabsTrigger
										value="npm"
										className="px-3 py-1.5 text-sm"
									>
										npm
									</TabsTrigger>
									<TabsTrigger
										value="yarn"
										className="px-3 py-1.5 text-sm"
									>
										yarn
									</TabsTrigger>
									<TabsTrigger
										value="bun"
										className="px-3 py-1.5 text-sm"
									>
										bun
									</TabsTrigger>
								</TabsList>
								<Button
									size="sm"
									variant="ghost"
									onClick={handleCopyInstall}
									className="gap-1.5 h-7 px-2 text-xs"
								>
									{copiedInstall ? (
										<>
											<Check className="size-3.5" />
											Copied!
										</>
									) : (
										<>
											<Copy className="size-3.5" />
											Copy
										</>
									)}
								</Button>
							</div>
							<TabsContent value="pnpm" className="m-0">
								<pre className="px-6 py-4 text-sm font-mono overflow-x-auto">
									<code className="text-foreground">
										{installCommands.pnpm}
									</code>
								</pre>
							</TabsContent>
							<TabsContent value="npm" className="m-0">
								<pre className="px-6 py-4 text-sm font-mono overflow-x-auto">
									<code className="text-foreground">
										{installCommands.npm}
									</code>
								</pre>
							</TabsContent>
							<TabsContent value="yarn" className="m-0">
								<pre className="px-6 py-4 text-sm font-mono overflow-x-auto">
									<code className="text-foreground">
										{installCommands.yarn}
									</code>
								</pre>
							</TabsContent>
							<TabsContent value="bun" className="m-0">
								<pre className="px-6 py-4 text-sm font-mono overflow-x-auto">
									<code className="text-foreground">
										{installCommands.bun}
									</code>
								</pre>
							</TabsContent>
						</Tabs>
					</div>
				)}

				<div className="mx-6 mb-6 rounded-lg border bg-card overflow-hidden">
					{/* Header with filename and copy button */}
					<div className="flex items-center justify-between px-4 py-2 border-b bg-muted/50">
						<span className="text-sm font-medium text-muted-foreground">
							index.css
						</span>
						<Button
							size="sm"
							variant="ghost"
							onClick={handleCopy}
							className="gap-1.5 h-7 px-2 text-xs"
						>
							{copied ? (
								<>
									<Check className="size-3.5" />
									Copied!
								</>
							) : (
								<>
									<Copy className="size-3.5" />
									Copy
								</>
							)}
						</Button>
					</div>

					{/* Code block with scrolling */}
					<div className="max-h-[35vh] overflow-auto">
						<pre className="p-6 text-sm font-mono">
							<code className="language-css text-foreground leading-relaxed">
								{cssCode}
							</code>
						</pre>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	)
}
