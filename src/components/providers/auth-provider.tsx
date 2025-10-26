'use client'

import { createContext, useContext, useEffect, useState, useRef } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { User } from '@supabase/supabase-js'
import { hasLocalTheme, getLocalTheme, clearLocalTheme } from '@/lib/localTheme'
import { apiClient } from '@/api/client'
import { useRouter, usePathname } from 'next/navigation'

type AuthContextType = {
	user: User | null
	isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [user, setUser] = useState<User | null>(null)
	const [isLoading, setIsLoading] = useState(true)
	const router = useRouter()
	const pathname = usePathname()
	const hasHandledAutoSave = useRef(false)

	useEffect(() => {
		const supabase = createClient()
		let ignore = false
		let previousUser: User | null = null

		// Function to auto-save local theme when user authenticates
		const autoSaveLocalTheme = async () => {
			if (hasHandledAutoSave.current) return

			if (!hasLocalTheme()) return

			const localData = getLocalTheme()
			if (!localData) return

			hasHandledAutoSave.current = true

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
						// Only redirect if we're on the local edit page
						if (pathname === '/themes/local/edit') {
							router.push(`/themes/${data.id}/edit`)
						}
					}
				}
			} catch (error) {
				console.error('Failed to auto-save local theme:', error)
				hasHandledAutoSave.current = false
			}
		}

		const load = async () => {
			const { data } = await supabase.auth.getUser()
			if (!ignore) {
				previousUser = data.user ?? null
				setUser(data.user ?? null)
				setIsLoading(false)
			}
		}

		load()

		const { data: sub } = supabase.auth.onAuthStateChange(
			async (event, session) => {
				if (!ignore) {
					const newUser = session?.user ?? null
					const wasSignedOut =
						previousUser !== null && newUser === null
					const wasSignedIn =
						previousUser === null && newUser !== null

					previousUser = newUser
					setUser(newUser)

					// Auto-save local theme when user signs in
					if (wasSignedIn && newUser) {
						await autoSaveLocalTheme()
					}

					// Reset the flag when user signs out
					if (wasSignedOut) {
						hasHandledAutoSave.current = false
					}
				}
			}
		)

		return () => {
			ignore = true
			sub?.subscription.unsubscribe()
		}
	}, [router, pathname])

	return (
		<AuthContext.Provider value={{ user, isLoading }}>
			{children}
		</AuthContext.Provider>
	)
}

export function useAuthContext() {
	const context = useContext(AuthContext)
	if (context === undefined) {
		throw new Error('useAuthContext must be used within an AuthProvider')
	}
	return context
}
