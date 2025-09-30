'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { User } from '@supabase/supabase-js'

export function useAuth() {
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

	return { user, isLoading }
}
