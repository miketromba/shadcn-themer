'use client'

import { Button } from '@/components/ui/button'
import { GitFork, Loader2 } from 'lucide-react'
import { useAuthModal } from '@/components/providers/auth-modal-provider'
import { useAuth } from '@/hooks/use-auth'
import { useForkTheme } from '@/api/client/themes'

export function ForkButton({ id }: { id: string }) {
	const { openAuthModal } = useAuthModal()
	const { user } = useAuth()
	const { mutate: forkTheme, isPending } = useForkTheme()

	const handleFork = () => {
		if (!user) {
			openAuthModal('login')
			return
		}
		forkTheme({ forkId: id })
	}

	return (
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
	)
}
