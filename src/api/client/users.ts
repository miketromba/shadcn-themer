import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { apiClient, InferResponseType } from '@/api/client'

export type CurrentUserProfileResponse = InferResponseType<
	typeof apiClient.api.user.me.$get
>
export type UserProfileByIdResponse = InferResponseType<
	(typeof apiClient.api.user)[':id']['$get']
>

export function useCurrentUserProfile(enabled: boolean = true) {
	return useQuery({
		queryKey: ['user', 'me'],
		enabled,
		queryFn: async () => {
			const response = await apiClient.api.user.me.$get()
			if (!response.ok) {
				throw new Error(`Failed to fetch profile (${response.status})`)
			}
			return response.json()
		}
	})
}

export function useUserProfileById(id: string | null | undefined) {
	return useQuery({
		queryKey: ['user', id],
		enabled: Boolean(id),
		queryFn: async () => {
			if (!id) throw new Error('Missing id')
			const response = await apiClient.api.user[':id'].$get({
				param: { id }
			})
			if (!response.ok) {
				throw new Error(`Failed to fetch profile (${response.status})`)
			}
			return response.json()
		}
	})
}

export function useUpdateUsername() {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: async (username: string) => {
			const res = await apiClient.api.user.username.$patch({
				json: { username }
			})
			if (!res.ok) {
				const body = (await res.json().catch(() => ({}))) as
					| { error: string }
					| Record<string, never>
				const message =
					('error' in body ? body.error : undefined) ||
					`Failed to update username (${res.status})`
				throw new Error(message)
			}
			return (await res.json()) as CurrentUserProfileResponse
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['user', 'me'] })
		}
	})
}
