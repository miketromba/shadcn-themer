import { useTheme, useUpdateThemeMeta } from '@/api/client/themes'
import { useThemeData } from '../providers/theme-data-provider'
import { useEffect, useState } from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Check, Pencil } from 'lucide-react'
import { Spinner } from '../spinner'
import { Skeleton } from '../ui/skeleton'

export function ThemeNameEditor() {
	const { id } = useThemeData()
	const { data, isLoading } = useTheme(id)
	const currentName = data?.theme.name
	const updateMeta = useUpdateThemeMeta()
	const [isEditingName, setIsEditingName] = useState(false)
	const [localName, setLocalName] = useState<string>('')

	useEffect(() => {
		if (typeof currentName === 'string') setLocalName(currentName)
	}, [currentName])

	function saveName() {
		if (!id) return
		const next = localName.trim() || 'Untitled theme'
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

	if (isLoading) {
		return (
			<div className="flex items-center gap-2 h-12">
				<div className="text-sm font-semibold truncate flex-1">
					<Skeleton className="h-4 w-40" />
				</div>
			</div>
		)
	}

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
					{updateMeta.isPending ? (
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
						{currentName && currentName.length > 0
							? currentName
							: 'Untitled theme'}
					</div>
					{updateMeta.isPending ? null : (
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
					{updateMeta.isPending ? (
						<div className="p-2">
							<Spinner variant="secondary" />
						</div>
					) : null}
					{updateMeta.isError ? (
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
