'use client'

import { cn } from '@/lib/utils'
import Link from 'next/link'

export function SiteLogo({ className }: { className?: string }) {
	return (
		<Link href="/" className={cn('group', className)}>
			<span
				className="font-semibold text-base font-mono transition-colors duration-200 relative"
				style={{ letterSpacing: '0.04em', color: 'white' }}
			>
				<span
					className="group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:animate-gradient-move"
					style={{
						color: 'white',
						backgroundImage:
							'linear-gradient(90deg, #FFD1EC, #FFE3B3, #FFFFA8, #B8FFD9, #B8E6FF, #D1B8FF, #FFB8E6)',
						backgroundSize: '200% 200%',
						WebkitBackgroundClip: 'text',
						WebkitTextFillColor: 'white',
						transition: 'color 0.2s'
					}}
				>
					ShadcnThemer
				</span>
				<style global={true.toString() as unknown as boolean}>{`
					@keyframes gradient-move {
						0% {
							background-position: 0% 50%;
						}
						50% {
							background-position: 100% 50%;
						}
						100% {
							background-position: 0% 50%;
						}
					}
					.group:hover .group-hover\\:animate-gradient-move {
						animation: gradient-move 2s ease-in-out infinite;
					}
					.group:hover .group-hover\\:bg-gradient-to-r {
						background-image: linear-gradient(90deg, #FFD1EC, #FFE3B3, #FFFFA8, #B8FFD9, #B8E6FF, #D1B8FF, #FFB8E6) !important;
					}
					.group:hover .group-hover\\:bg-clip-text {
						-webkit-background-clip: text !important;
						background-clip: text !important;
					}
					.group:hover .group-hover\\:text-transparent {
						-webkit-text-fill-color: transparent !important;
						color: transparent !important;
					}
				`}</style>
			</span>
			<style global={true.toString() as unknown as boolean}>{`
				@keyframes gradient-move {
					0% {
						background-position: 0% 50%;
					}
					50% {
						background-position: 100% 50%;
					}
					100% {
						background-position: 0% 50%;
					}
				`}</style>
		</Link>
	)
}
