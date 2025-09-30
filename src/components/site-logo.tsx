'use client'

import { cn } from '@/lib/utils'
import Link from 'next/link'
import Image from 'next/image'
import logo from '@/assets/logo-3x.png'

export function SiteLogo({ className }: { className?: string }) {
	return (
		<Link href="/" className={cn('group', className)}>
			<Image
				src={logo}
				alt="ShadcnThemer"
				className="h-6 w-auto transition-opacity hover:opacity-80"
				quality={100}
				priority
			/>
		</Link>
	)
}
