import { useMutation, useQuery } from '@tanstack/react-query'
import { apiClient, InferResponseType } from './index'

/**
 * Type for ping response
 */
export type PingResponse = InferResponseType<typeof apiClient.api.ping.$get>

/**
 * Type for error response
 */
type ErrorResponse = {
	error: string
}

/**
 * Hook for fetching ping response
 */
export function usePing() {
	return useQuery({
		queryKey: ['ping'],
		queryFn: async () => {
			const response = await apiClient.api.ping.$get()
			if (!response.ok) {
				const errorData = (await response
					.json()
					.catch(() => ({ error: 'Unknown error' }))) as ErrorResponse
				throw new Error(
					errorData.error ||
						`Failed to fetch ping (${response.status})`
				)
			}
			return response.json()
		}
	})
}

/**
 * Hook for sending ping request
 */
export function useSendPing() {
	return useMutation({
		mutationFn: async () => {
			const response = await apiClient.api.ping.$post()
			if (!response.ok) {
				const errorData = (await response
					.json()
					.catch(() => ({ error: 'Unknown error' }))) as ErrorResponse
				throw new Error(
					errorData.error ||
						`Failed to send ping (${response.status})`
				)
			}
			return response.json()
		}
	})
}
