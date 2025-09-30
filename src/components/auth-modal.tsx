'use client'

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle
} from '@/components/ui/dialog'
import { useAuthModal } from '@/components/providers/auth-modal-provider'
import { AuthForm } from '@/components/auth-form'

export function AuthModal() {
	const { isOpen, mode, closeAuthModal } = useAuthModal()

	return (
		<Dialog open={isOpen} onOpenChange={open => !open && closeAuthModal()}>
			<DialogContent className="sm:max-w-[425px] gap-0">
				<DialogHeader className="sr-only">
					<DialogTitle>
						{mode === 'login' ? 'Welcome' : 'Create account'}
					</DialogTitle>
					<DialogDescription>
						Authenticate to continue
					</DialogDescription>
				</DialogHeader>
				<AuthForm mode={mode} isModal onSuccess={closeAuthModal} />
			</DialogContent>
		</Dialog>
	)
}
