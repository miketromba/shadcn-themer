'use client'

import { Button } from '@/components/ui/button'
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle
} from '@/components/ui/alert-dialog'
import { useRouter } from 'next/navigation'

interface LocalThemeConfirmDialogProps {
	open: boolean
	onOpenChange: (open: boolean) => void
	onConfirm: () => void
	actionLabel?: string
	description?: string
}

export function LocalThemeConfirmDialog({
	open,
	onOpenChange,
	onConfirm,
	actionLabel = 'Replace',
	description = 'You already have a theme in progress. Would you like to continue editing it or proceed with this action? This will replace your current work.'
}: LocalThemeConfirmDialogProps) {
	const router = useRouter()

	const handleContinueEditing = () => {
		onOpenChange(false)
		router.push('/themes/local/edit')
	}

	const handleConfirm = () => {
		onOpenChange(false)
		onConfirm()
	}

	return (
		<AlertDialog open={open} onOpenChange={onOpenChange}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Theme in Progress</AlertDialogTitle>
					<AlertDialogDescription>
						{description}
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<Button variant="outline" onClick={handleContinueEditing}>
						Continue Editing
					</Button>
					<AlertDialogAction onClick={handleConfirm}>
						{actionLabel}
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}
