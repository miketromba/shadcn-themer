'use client'

import {
	useInfiniteQuery,
	useMutation,
	useQuery,
	useQueryClient
} from '@tanstack/react-query'
import { apiClient, InferRequestType, InferResponseType } from '@/api/client'
import { useRouter } from 'next/navigation'
import { DEFAULT_PAGE_SIZE } from '@/lib/pagination'

// Inferred response/request types from the Hono client
export type ThemesListResponse = InferResponseType<
	typeof apiClient.api.themes.$get
>
export type ThemeResponse = InferResponseType<
	(typeof apiClient.api.themes)[':id']['$get']
>
export type CreateThemeResponse = InferResponseType<
	typeof apiClient.api.themes.$post
>
export type CreateThemeInput = InferRequestType<
	typeof apiClient.api.themes.$post
>['json']

export type StarThemeResponse = InferResponseType<
	(typeof apiClient.api.themes)[':id']['star']['$post']
>
export type StarThemeSuccess = { ok: true; star_count: number }
export type UnstarThemeResponse = InferResponseType<
	(typeof apiClient.api.themes)[':id']['star']['$delete']
>

export type UpdateThemeResponse = InferResponseType<
	(typeof apiClient.api.themes)[':id']['$put']
>
export type UpdateThemeInput = InferRequestType<
	(typeof apiClient.api.themes)[':id']['$put']
>['json']

export type UpdateThemeMetaResponse = InferResponseType<
	(typeof apiClient.api.themes)[':id']['meta']['$patch']
>
export type UpdateThemeMetaInput = InferRequestType<
	(typeof apiClient.api.themes)[':id']['meta']['$patch']
>['json']

export type DeleteThemeResponse = InferResponseType<
	(typeof apiClient.api.themes)[':id']['$delete']
>

export function useThemesList({
	pageSize = DEFAULT_PAGE_SIZE,
	sortBy = 'new',
	username,
	colorBuckets
}: {
	pageSize?: number
	sortBy?: 'new' | 'popular'
	username?: string
	colorBuckets?: string[]
} = {}) {
	return useInfiniteQuery<ThemesListResponse>({
		queryKey: ['themes', { pageSize, sortBy, username, colorBuckets }],
		queryFn: async ({ pageParam }) => {
			const res = await apiClient.api.themes.$get({
				query: {
					pageSize: String(pageSize),
					nextToken: (pageParam as string | null) ?? undefined,
					sortBy,
					username,
					colorBuckets:
						colorBuckets && colorBuckets.length > 0
							? colorBuckets.join(',')
							: undefined
				}
			})
			if (!res.ok) throw new Error('Failed to load themes')
			return await res.json()
		},
		initialPageParam: null,
		getNextPageParam: lastPage => lastPage.nextToken
	})
}

export function useCreateTheme() {
	const qc = useQueryClient()
	const router = useRouter()
	return useMutation<CreateThemeResponse, Error, CreateThemeInput>({
		mutationFn: async input => {
			const res = await apiClient.api.themes.$post({ json: input })
			if (!res.ok) {
				throw new Error('Failed to create theme')
			}
			return await res.json()
		},
		onSuccess: async data => {
			await qc.invalidateQueries({ queryKey: ['themes'] })
			if (data.ok && 'id' in data) {
				router.push(`/themes/${data.id}/edit`)
			}
		}
	})
}

export function useForkTheme() {
	const qc = useQueryClient()
	const router = useRouter()
	return useMutation({
		mutationFn: async ({ forkId }: { forkId: string }) => {
			const res = await apiClient.api.themes.$post({
				json: { forkId }
			})
			if (!res.ok) {
				throw new Error('Failed to fork theme')
			}
			return await res.json()
		},
		onSuccess: async data => {
			await qc.invalidateQueries({ queryKey: ['themes'] })
			if (data.ok && 'id' in data) {
				router.push(`/themes/${data.id}/edit`)
			}
		}
	})
}

export function useTheme(id: string | undefined) {
	return useQuery({
		queryKey: ['theme', id],
		queryFn: async () => {
			if (!id) throw new Error('Missing id')
			const res = await apiClient.api.themes[':id'].$get({
				param: { id }
			})
			if (!res.ok) throw new Error('Failed to load theme')
			return await res.json()
		},
		enabled: !!id
	})
}

export function useStarTheme() {
	const qc = useQueryClient()
	return useMutation({
		mutationFn: async ({ id }: { id: string }) => {
			const res = await apiClient.api.themes[':id'].star.$post({
				param: { id }
			})
			if (!res.ok) throw new Error('Failed to star theme')
			return await res.json()
		},
		onMutate: async ({ id }) => {
			await qc.cancelQueries({ queryKey: ['theme', id] })
			const prevTheme = qc.getQueryData<ThemeResponse>(['theme', id])
			if (prevTheme && 'theme' in prevTheme) {
				qc.setQueryData<ThemeResponse>(['theme', id], {
					...prevTheme,
					theme: {
						...prevTheme.theme,
						star_count: prevTheme.theme.star_count + 1,
						is_starred: true
					}
				})
			}
			return { prevTheme }
		},
		onError: (_err, { id }, ctx) => {
			if (ctx?.prevTheme) {
				qc.setQueryData(['theme', id], ctx.prevTheme)
			}
		},
		onSuccess: (data, { id }) => {
			qc.setQueryData<ThemeResponse>(['theme', id], prev =>
				prev && 'theme' in prev
					? {
							...prev,
							theme: {
								...prev.theme,
								star_count: data.star_count,
								is_starred: true
							}
					  }
					: prev
			)
		}
	})
}

export function useUnstarTheme() {
	const qc = useQueryClient()
	return useMutation<
		UnstarThemeResponse,
		Error,
		{ id: string },
		{ prevTheme?: ThemeResponse }
	>({
		mutationFn: async ({ id }) => {
			const res = await apiClient.api.themes[':id'].star.$delete({
				param: { id }
			})
			if (!res.ok) throw new Error('Failed to unstar theme')
			return await res.json()
		},
		onMutate: async ({ id }) => {
			await qc.cancelQueries({ queryKey: ['theme', id] })
			const prevTheme = qc.getQueryData<ThemeResponse>(['theme', id])
			if (prevTheme && 'theme' in prevTheme) {
				qc.setQueryData<ThemeResponse>(['theme', id], {
					...prevTheme,
					theme: {
						...prevTheme.theme,
						star_count: Math.max(prevTheme.theme.star_count - 1, 0),
						is_starred: false
					}
				})
			}
			return { prevTheme }
		},
		onError: (_err, { id }, ctx) => {
			if (ctx?.prevTheme) {
				qc.setQueryData(['theme', id], ctx.prevTheme)
			}
		},
		onSuccess: (data, { id }) => {
			qc.setQueryData<ThemeResponse>(['theme', id], prev =>
				prev && 'theme' in prev
					? {
							...prev,
							theme: {
								...prev.theme,
								star_count: data.star_count,
								is_starred: false
							}
					  }
					: prev
			)
		}
	})
}

export function useUpdateTheme() {
	const qc = useQueryClient()
	return useMutation<
		UpdateThemeResponse,
		Error,
		{ id: string; json: UpdateThemeInput['json'] }
	>({
		mutationFn: async ({ id, json }) => {
			const res = await apiClient.api.themes[':id'].$put({
				param: { id },
				json: { json }
			})
			if (!res.ok) throw new Error('Failed to update theme')
			return await res.json()
		},
		onSuccess: (_data, { id, json }) => {
			// Replace ONLY the cached single theme value to avoid re-fetch loop
			qc.setQueryData<ThemeResponse>(['theme', id], prev =>
				prev && 'theme' in prev
					? {
							...prev,
							theme: { ...prev.theme, json }
					  }
					: prev
			)
		}
	})
}

export function useUpdateThemeMeta() {
	const qc = useQueryClient()
	return useMutation<
		UpdateThemeMetaResponse,
		Error,
		{ id: string; body: UpdateThemeMetaInput }
	>({
		mutationFn: async ({ id, body }) => {
			const res = await apiClient.api.themes[':id'].meta['$patch']({
				param: { id },
				json: body
			})
			if (!res.ok) throw new Error('Failed to update theme')
			return await res.json()
		},
		onSuccess: async (_data, { id, body }) => {
			// Ensure both single theme and lists reflect the change
			await qc.invalidateQueries({ queryKey: ['theme', id] })
			await qc.invalidateQueries({ queryKey: ['themes'] })
		}
	})
}

export function useDeleteTheme() {
	const qc = useQueryClient()
	const router = useRouter()
	return useMutation<DeleteThemeResponse, Error, { id: string }>({
		mutationFn: async ({ id }: { id: string }) => {
			const res = await apiClient.api.themes[':id'].$delete({
				param: { id }
			})
			if (!res.ok) throw new Error('Failed to delete theme')
			return await res.json()
		},
		onSuccess: async (
			_data: DeleteThemeResponse,
			{ id }: { id: string }
		) => {
			// Ensure caches refresh and navigate home
			await qc.invalidateQueries({ queryKey: ['themes'] })
			qc.removeQueries({ queryKey: ['theme', id] })
			router.push('/')
		}
	})
}
