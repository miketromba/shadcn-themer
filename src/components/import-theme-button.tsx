'use client'

import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import { useCreateTheme } from '@/api/client/themes'
import { useAuthModal } from '@/components/providers/auth-modal-provider'
import { useAuth } from '@/hooks/use-auth'
import { FileInput, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useState } from 'react'
import { parseShadcnThemeFromCss } from '@/lib/shadcnTheme'
import { toast } from 'sonner'

interface ImportThemeButtonProps {
	size?: 'default' | 'sm' | 'lg' | 'icon'
	variant?:
		| 'default'
		| 'outline'
		| 'ghost'
		| 'secondary'
		| 'destructive'
		| 'link'
	showIcon?: boolean
	hideTextOnMobile?: boolean
	className?: string
}

const PLACEHOLDER_CSS = `:root {
  --background: 0 0% 100%;
  --foreground: oklch(0.52 0.13 144.17);
  --primary: #3e2723;
  /* And more */
}

.dark {
  --background: 222.2 84% 4.9%;
  --foreground: hsl(37.50 36.36% 95.69%);
  --primary: rgb(46, 125, 50);
  /* And more */
}`

export function ImportThemeButton({
	size = 'default',
	variant = 'outline',
	showIcon = true,
	hideTextOnMobile = false,
	className
}: ImportThemeButtonProps) {
	const [open, setOpen] = useState(false)
	const [cssInput, setCssInput] = useState('')
	const { mutate: createTheme, isPending: isCreating } = useCreateTheme()
	const { openAuthModal } = useAuthModal()
	const { user } = useAuth()

	const handleOpenChange = (newOpen: boolean) => {
		if (!user && newOpen) {
			openAuthModal('login')
			return
		}
		setOpen(newOpen)
	}

	const handleImport = () => {
		if (!cssInput.trim()) {
			toast.error('Please paste your CSS code')
			return
		}

		try {
			const parsedTheme = parseShadcnThemeFromCss(cssInput)
			createTheme(
				{ json: JSON.stringify(parsedTheme) },
				{
					onSuccess: () => {
						setOpen(false)
						setCssInput('')
						toast.success('Theme imported successfully!')
					},
					onError: () => {
						toast.error('Failed to import theme')
					}
				}
			)
		} catch (error) {
			toast.error('Failed to parse CSS. Please check your input.')
		}
	}

	return (
		<Dialog open={open} onOpenChange={handleOpenChange}>
			<DialogTrigger asChild>
				<Button
					size={size}
					variant={variant}
					className={className}
					disabled={isCreating}
				>
					{showIcon && <FileInput className="size-4" />}
					<span
						className={cn(
							hideTextOnMobile && 'hidden sm:inline',
							showIcon && 'ml-1'
						)}
					>
						Import
					</span>
				</Button>
			</DialogTrigger>
			<DialogContent className="max-w-3xl">
				<DialogHeader>
					<DialogTitle>Import Custom CSS</DialogTitle>
					<DialogDescription>
						Paste your CSS file below to customize the theme colors.
						Make sure to include variables like --primary,
						--background, etc.
					</DialogDescription>
				</DialogHeader>
				<Textarea
					placeholder={PLACEHOLDER_CSS}
					value={cssInput}
					onChange={e => setCssInput(e.target.value)}
					className="h-[280px] resize-none font-mono text-sm"
					disabled={isCreating}
				/>
				<DialogFooter>
					<Button
						variant="outline"
						onClick={() => setOpen(false)}
						disabled={isCreating}
					>
						Cancel
					</Button>
					<Button onClick={handleImport} disabled={isCreating}>
						{isCreating ? (
							<>
								<Loader2 className="size-4 animate-spin" />
								<span className="ml-1">Importing...</span>
							</>
						) : (
							'Import'
						)}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
