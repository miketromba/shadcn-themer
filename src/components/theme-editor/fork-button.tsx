'use client'

import { Button } from '@/components/ui/button'
import { GitFork } from 'lucide-react'
import { useAuthModal } from '@/components/providers/auth-modal-provider'
import { useAuth } from '@/hooks/use-auth'

export function ForkButton({ id }: { id: string }) {
	const { openAuthModal } = useAuthModal()
	const { user } = useAuth()

	const handleFork = () => {
		if (!user) {
			openAuthModal('login')
			return
		}
		// TODO: Implement fork functionality
		console.log('Fork theme:', id)
	}

	return (
		<Button
			type="button"
			variant="outline"
			size="sm"
			onClick={handleFork}
			title="Fork this theme"
		>
			<GitFork className="size-4 mr-1" />
			Fork
		</Button>
	)
}
