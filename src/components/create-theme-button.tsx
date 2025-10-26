'use client'

import { Button } from '@/components/ui/button'
import { useCreateTheme } from '@/api/client/themes'
import { useAuth } from '@/hooks/use-auth'
import { Plus, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import { initializeLocalTheme, hasLocalTheme } from '@/lib/localTheme'
import { useState } from 'react'
import { LocalThemeConfirmDialog } from '@/components/local-theme-confirm-dialog'

interface CreateThemeButtonProps {
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

export function CreateThemeButton({
	size = 'default',
	variant = 'default',
	showIcon = true,
	hideTextOnMobile = false,
	className
}: CreateThemeButtonProps) {
	const { mutate: createTheme, isPending: isCreating } = useCreateTheme()
	const { user } = useAuth()
	const router = useRouter()
	const [isNavigating, setIsNavigating] = useState(false)
	const [showConfirmDialog, setShowConfirmDialog] = useState(false)

	const createNewLocalTheme = () => {
		setIsNavigating(true)
		initializeLocalTheme()
		router.push('/themes/local/edit')
	}

	const handleClick = () => {
		if (!user) {
			// For unauthenticated users, check if local theme exists
			if (hasLocalTheme()) {
				// Show confirmation dialog
				setShowConfirmDialog(true)
			} else {
				// Directly create a new local theme
				createNewLocalTheme()
			}
			return
		}
		createTheme({})
	}

	const isPending = isCreating || isNavigating

	return (
		<>
			<Button
				onClick={handleClick}
				disabled={isPending}
				size={size}
				variant={variant}
				className={className}
			>
				{isPending ? (
					<>
						<Loader2 className="size-4 animate-spin" />
						<span
							className={cn(
								hideTextOnMobile && 'hidden sm:inline',
								'ml-1'
							)}
						>
							Creating...
						</span>
					</>
				) : (
					<>
						{showIcon && <Plus className="size-4" />}
						<span
							className={cn(
								hideTextOnMobile && 'hidden sm:inline',
								showIcon && 'ml-1'
							)}
						>
							New Theme
						</span>
					</>
				)}
			</Button>

			<LocalThemeConfirmDialog
				open={showConfirmDialog}
				onOpenChange={setShowConfirmDialog}
				onConfirm={createNewLocalTheme}
				actionLabel="Create New"
				description="You already have a theme in progress. Would you like to continue editing it or create a new one? Creating a new theme will replace your current work."
			/>
		</>
	)
}
