'use client'

import { Button } from '@/components/ui/button'
import { Save, Loader2 } from 'lucide-react'
import { useAuth } from '@/hooks/use-auth'
import { useAuthModal } from '@/components/providers/auth-modal-provider'
import { getLocalTheme, clearLocalTheme } from '@/lib/localTheme'
import { apiClient } from '@/api/client'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export function SaveToAccountButton() {
	const { user } = useAuth()
	const { openAuthModal } = useAuthModal()
	const router = useRouter()
	const [localThemeName, setLocalThemeName] =
		useState<string>('Untitled Theme')
	const [isSaving, setIsSaving] = useState(false)

	// Load the local theme name
	useEffect(() => {
		const localData = getLocalTheme()
		if (localData?.name) {
			setLocalThemeName(localData.name)
		}
	}, [])

	const handleSave = async () => {
		if (!user) {
			openAuthModal('login')
			return
		}

		// User is authenticated - save the local theme to their account
		const localData = getLocalTheme()
		if (!localData) return

		setIsSaving(true)

		try {
			const res = await apiClient.api.themes.$post({
				json: {
					json: JSON.stringify(localData.theme),
					name: localData.name
				}
			})

			if (res.ok) {
				const data = await res.json()
				clearLocalTheme()

				if (data.ok && 'id' in data) {
					router.push(`/themes/${data.id}/edit`)
				}
			} else {
				console.error('Failed to save theme')
				setIsSaving(false)
			}
		} catch (error) {
			console.error('Error saving theme:', error)
			setIsSaving(false)
		}
	}

	return (
		<Button
			onClick={handleSave}
			disabled={isSaving}
			variant="outline"
			size="sm"
			title={
				user ? 'Save theme to your account' : 'Sign in to save theme'
			}
		>
			{isSaving ? (
				<>
					<Loader2 className="size-4 mr-1 animate-spin" />
					Saving...
				</>
			) : (
				<>
					<Save className="size-4 mr-1" />
					{user ? 'Save to Account' : 'Sign In to Save'}
				</>
			)}
		</Button>
	)
}
