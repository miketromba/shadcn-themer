'use client'

import {
	useInfiniteQuery,
	useMutation,
	useQuery,
	useQueryClient
} from '@tanstack/react-query'
import type { InfiniteData } from '@tanstack/react-query'
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

export function useThemesList({
	pageSize = DEFAULT_PAGE_SIZE
}: { pageSize?: number } = {}) {
	return useInfiniteQuery<ThemesListResponse>({
		queryKey: ['themes', { pageSize }],
		queryFn: async ({ pageParam }) => {
			const res = await apiClient.api.themes.$get({
				query: {
					pageSize: String(pageSize),
					nextToken: (pageParam as string | null) ?? undefined
				}
			})
			if (!res.ok) throw new Error('Failed to load themes')
			return await res.json()
		},
		initialPageParam: null as string | null,
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
				const json = await res
					.json()
					.catch(() => ({ error: 'Unknown error' }))
				throw new Error(
					'error' in json ? json.error : 'Failed to create theme'
				)
			}
			return await res.json()
		},
		onSuccess: async data => {
			await qc.invalidateQueries({ queryKey: ['themes'] })
			if (data.ok && 'id' in data) {
				router.push(`/app/themes/${data.id}`)
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
	return useMutation<
		StarThemeSuccess,
		Error,
		{ id: string },
		{
			prevThemes: Array<
				[unknown, InfiniteData<ThemesListResponse> | undefined]
			>
			prevTheme: ThemeResponse | undefined
		}
	>({
		mutationFn: async ({ id }) => {
			const res = await apiClient.api.themes[':id'].star.$post({
				param: { id }
			})
			if (!res.ok) {
				const json = await res
					.json()
					.catch(() => ({ error: 'Unknown error' }))
				throw new Error((json as any).error || 'Failed to star theme')
			}
			return (await res.json()) as StarThemeSuccess
		},
		onMutate: async ({ id }) => {
			await qc.cancelQueries({ queryKey: ['themes'] })
			await qc.cancelQueries({ queryKey: ['theme', id] })

			const prevThemes = qc.getQueriesData<
				InfiniteData<ThemesListResponse>
			>({
				queryKey: ['themes']
			})
			const prevTheme = qc.getQueryData<ThemeResponse>(['theme', id])

			// Optimistically bump stars in list pages
			for (const [key, data] of prevThemes) {
				if (!data?.pages) continue
				const newPages = data.pages.map(p => ({
					...p,
					items: (p.items || []).map(it =>
						it.id === id
							? { ...it, star_count: (it.star_count ?? 0) + 1 }
							: it
					)
				}))
				qc.setQueryData(key as any, { ...data, pages: newPages })
			}

			// Optimistically bump star_count in single theme cache
			if (prevTheme) {
				qc.setQueryData(['theme', id], {
					...prevTheme,
					star_count: (prevTheme as any).star_count + 1
				})
			}

			return { prevThemes, prevTheme }
		},
		onError: (_err, { id }, ctx) => {
			// Rollback on error
			if (ctx?.prevThemes) {
				for (const [key, data] of ctx.prevThemes) {
					qc.setQueryData(key as any, data)
				}
			}
			if (ctx?.prevTheme) {
				qc.setQueryData(['theme', id], ctx.prevTheme)
			}
		},
		onSuccess: (data, { id }) => {
			// Reconcile caches to the authoritative count from the server
			qc.setQueriesData<InfiniteData<ThemesListResponse>>(
				{ queryKey: ['themes'] },
				prev => {
					if (!prev) return prev
					return {
						...prev,
						pages: prev.pages.map(page => ({
							...page,
							items: page.items.map(item =>
								item.id === id
									? { ...item, star_count: data.star_count }
									: item
							)
						}))
					}
				}
			)

			qc.setQueryData<ThemeResponse>(['theme', id], prev =>
				prev ? { ...prev, star_count: data.star_count } : prev
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
			if (!res.ok) {
				const body = await res
					.json()
					.catch(() => ({ error: 'Unknown error' }))
				throw new Error((body as any).error || 'Failed to update theme')
			}
			return await res.json()
		},
		onSuccess: (_data, { id, json }) => {
			// Replace ONLY the cached single theme value to avoid re-fetch loop
			qc.setQueryData<ThemeResponse>(['theme', id], prev =>
				prev ? { ...prev, json } : prev
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
			if (!res.ok) {
				const body = await res
					.json()
					.catch(() => ({ error: 'Unknown error' }))
				throw new Error((body as any).error || 'Failed to update theme')
			}
			return await res.json()
		},
		onSuccess: async (_data, { id, body }) => {
			// Ensure both single theme and lists reflect the change
			await qc.invalidateQueries({ queryKey: ['theme', id] })
			await qc.invalidateQueries({ queryKey: ['themes'] })
		}
	})
}
