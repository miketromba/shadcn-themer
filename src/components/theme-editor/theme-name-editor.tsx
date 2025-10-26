import { useTheme, useUpdateThemeMeta } from '@/api/client/themes'
import { useThemeData } from '../providers/theme-data-provider'
import { useEffect, useState } from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Check, Pencil } from 'lucide-react'
import { Spinner } from '../spinner'
import { Skeleton } from '../ui/skeleton'
import { getLocalTheme, setLocalThemeName } from '@/lib/localTheme'

export function ThemeNameEditor() {
	const { id } = useThemeData()
	const isLocalMode = id === 'local'

	const { data, isLoading } = useTheme(isLocalMode ? undefined : id)
	const currentName = data?.theme.name
	const updateMeta = useUpdateThemeMeta()
	const [isEditingName, setIsEditingName] = useState(false)
	const [localName, setLocalName] = useState<string>('')

	// Load name from either API or localStorage
	useEffect(() => {
		if (isLocalMode) {
			const localData = getLocalTheme()
			setLocalName(localData?.name || 'Untitled Theme')
		} else if (typeof currentName === 'string') {
			setLocalName(currentName)
		}
	}, [currentName, isLocalMode])

	function saveName() {
		if (!id) return
		const next = localName.trim() || 'Untitled Theme'

		if (isLocalMode) {
			// Save to localStorage for local themes
			setLocalThemeName(next)
			setIsEditingName(false)
		} else {
			// Save to server for remote themes
			if (next === currentName) {
				setIsEditingName(false)
				return
			}
			updateMeta.mutate({
				id,
				body: { name: next }
			})
			setIsEditingName(false)
		}
	}

	if (!isLocalMode && isLoading) {
		return (
			<div className="flex items-center gap-2 h-12">
				<div className="text-sm font-semibold truncate flex-1">
					<Skeleton className="h-4 w-40" />
				</div>
			</div>
		)
	}

	const displayName = isLocalMode
		? localName
		: currentName && currentName.length > 0
		? currentName
		: 'Untitled Theme'

	return (
		<div className="flex items-center gap-1.5">
			{isEditingName ? (
				<>
					<Input
						value={localName}
						onChange={e => setLocalName(e.target.value)}
						placeholder="Theme name"
						className="px-2"
						autoFocus
						onKeyDown={e => {
							if (e.key === 'Enter') {
								saveName()
							}
						}}
						onBlur={() => saveName()}
					/>
					{!isLocalMode && updateMeta.isPending ? (
						<Spinner variant="secondary" />
					) : (
						<>
							<Button
								variant="secondary"
								onClick={() => saveName()}
								size="icon"
								aria-label="Save name"
							>
								<Check className="size-4" />
							</Button>
						</>
					)}
				</>
			) : (
				<>
					<div
						className="text-sm font-medium truncate flex-1 p-2 py-1.5 rounded-md border cursor-text"
						onClick={() => setIsEditingName(true)}
					>
						{displayName}
					</div>
					{!isLocalMode && updateMeta.isPending ? null : (
						<Button
							variant="ghost"
							size="icon"
							aria-label="Edit name"
							onClick={() => setIsEditingName(true)}
							className="opacity-50 hover:opacity-100 transition-opacity"
						>
							<Pencil className="size-4" />
						</Button>
					)}
					{!isLocalMode && updateMeta.isPending ? (
						<div className="p-2">
							<Spinner variant="secondary" />
						</div>
					) : null}
					{!isLocalMode && updateMeta.isError ? (
						<span
							className="text-xs text-destructive"
							role="status"
						>
							{(updateMeta.error as Error)?.message || 'Error'}
						</span>
					) : null}
				</>
			)}
		</div>
	)
}
