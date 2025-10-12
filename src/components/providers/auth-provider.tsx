'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { User } from '@supabase/supabase-js'

type AuthContextType = {
	user: User | null
	isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [user, setUser] = useState<User | null>(null)
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		const supabase = createClient()
		let ignore = false

		const load = async () => {
			const { data } = await supabase.auth.getUser()
			if (!ignore) {
				setUser(data.user ?? null)
				setIsLoading(false)
			}
		}

		load()

		const { data: sub } = supabase.auth.onAuthStateChange(
			(_event, session) => {
				if (!ignore) {
					setUser(session?.user ?? null)
				}
			}
		)

		return () => {
			ignore = true
			sub?.subscription.unsubscribe()
		}
	}, [])

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
