'use client'

import { useAuthContext } from '@/components/providers/auth-provider'

export function useAuth() {
	return useAuthContext()
}
