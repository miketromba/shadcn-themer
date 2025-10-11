'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Code } from 'lucide-react'
import { CodeExportModal } from './code-export-modal'
import { useThemeData } from '@/components/providers/theme-data-provider'

export function CodeExportButton() {
	const [isOpen, setIsOpen] = useState(false)
	const { theme, id } = useThemeData()

	if (!theme) return null

	return (
		<>
			<Button
				type="button"
				variant="outline"
				size="sm"
				onClick={() => setIsOpen(true)}
				title="Export theme code"
			>
				<Code className="size-4 mr-1" />
				Code
			</Button>
			<CodeExportModal
				open={isOpen}
				onOpenChange={setIsOpen}
				theme={theme}
				themeId={id}
			/>
		</>
	)
}
