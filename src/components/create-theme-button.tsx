'use client'

import { Button } from '@/components/ui/button'
import { useCreateTheme } from '@/api/client/themes'
import { useAuthModal } from '@/components/providers/auth-modal-provider'
import { useAuth } from '@/hooks/use-auth'
import { Plus, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

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
	const { openAuthModal } = useAuthModal()
	const { user } = useAuth()

	const handleClick = () => {
		if (!user) {
			openAuthModal('login')
			return
		}
		createTheme({})
	}

	return (
		<Button
			onClick={handleClick}
			disabled={isCreating}
			size={size}
			variant={variant}
			className={className}
		>
			{isCreating ? (
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
	)
}
