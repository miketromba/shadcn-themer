'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Mail } from 'lucide-react'

export function EmailReveal() {
	const [showEmail, setShowEmail] = useState(false)

	return showEmail ? (
		<a
			href="mailto:mike@flamelab.io"
			className="text-lg font-medium text-primary hover:underline inline-flex items-center gap-2"
		>
			mike@flamelab.io
		</a>
	) : (
		<Button onClick={() => setShowEmail(true)} variant="default" size="sm">
			<Mail className="size-4 mr-1" />
			Show Email Address
		</Button>
	)
}
