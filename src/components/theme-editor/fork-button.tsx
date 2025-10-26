'use client'

import { Button } from '@/components/ui/button'
import { GitFork, Loader2 } from 'lucide-react'
import { useAuth } from '@/hooks/use-auth'
import { useForkTheme } from '@/api/client/themes'
import { hasLocalTheme, setLocalTheme } from '@/lib/localTheme'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
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
import { useTheme } from '@/api/client/themes'

export function ForkButton({ id }: { id: string }) {
	const { user } = useAuth()
	const { mutate: forkTheme, isPending: isForkingToServer } = useForkTheme()
	const { data: themeData } = useTheme(id)
	const router = useRouter()
	const [showConfirmDialog, setShowConfirmDialog] = useState(false)
	const [isNavigating, setIsNavigating] = useState(false)

	const forkToLocal = () => {
		if (!themeData || !('theme' in themeData)) return

		setIsNavigating(true)
		setLocalTheme(themeData.theme.json, `Fork of ${themeData.theme.name}`)
		router.push('/themes/local/edit')
	}

	const continueEditingLocalTheme = () => {
		setIsNavigating(true)
		router.push('/themes/local/edit')
	}

	const handleFork = () => {
		if (!user) {
			// For unauthenticated users, fork to localStorage
			if (hasLocalTheme()) {
				// Show confirmation dialog if local theme already exists
				setShowConfirmDialog(true)
			} else {
				// Directly fork to local
				forkToLocal()
			}
			return
		}
		forkTheme({ forkId: id })
	}

	const isPending = isForkingToServer || isNavigating

	return (
		<>
			<Button
				type="button"
				variant="outline"
				size="sm"
				onClick={handleFork}
				disabled={isPending}
				title="Fork this theme"
			>
				{isPending ? (
					<Loader2 className="size-4 mr-1 animate-spin" />
				) : (
					<GitFork className="size-4 mr-1" />
				)}
				Fork
			</Button>

			<AlertDialog
				open={showConfirmDialog}
				onOpenChange={setShowConfirmDialog}
			>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Theme in Progress</AlertDialogTitle>
						<AlertDialogDescription>
							You already have a theme in progress. Would you like
							to continue editing it or fork this theme? Forking
							will replace your current work.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Cancel</AlertDialogCancel>
						<Button
							variant="outline"
							onClick={() => {
								setShowConfirmDialog(false)
								continueEditingLocalTheme()
							}}
						>
							Continue Editing
						</Button>
						<AlertDialogAction
							onClick={() => {
								setShowConfirmDialog(false)
								forkToLocal()
							}}
						>
							Fork Theme
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</>
	)
}
