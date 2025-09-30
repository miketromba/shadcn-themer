'use client'

import { SiteLogo } from '@/components/site-logo'
import { CreateThemeButton } from '@/components/create-theme-button'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

export function SiteFooter() {
	const pathname = usePathname()

	if (pathname?.endsWith('/edit') || pathname?.startsWith('/preview/')) {
		return null
	}

	const currentYear = new Date().getFullYear()

	return (
		<footer className="border-t mt-auto">
			<div className="container mx-auto px-4 sm:px-8 py-8 sm:py-12">
				<div className="grid gap-8 sm:grid-cols-2">
					{/* Logo and Description */}
					<div>
						<SiteLogo />
						<p className="text-sm mt-3 text-muted-foreground max-w-xs">
							Create, customize, and share beautiful themes for
							shadcn/ui. Build your perfect color palette with our
							intuitive theme editor.
						</p>
					</div>

					{/* CTA and Links */}
					<div className="space-y-4 sm:text-right">
						<CreateThemeButton className="sm:ml-auto" />
						<div className="flex flex-col gap-2">
							<Link
								href="/terms"
								className="text-sm text-muted-foreground hover:text-foreground transition-colors w-fit sm:ml-auto"
							>
								Terms of Service
							</Link>
							<Link
								href="/privacy"
								className="text-sm text-muted-foreground hover:text-foreground transition-colors w-fit sm:ml-auto"
							>
								Privacy Policy
							</Link>
							<Link
								href="/contact"
								className="text-sm text-muted-foreground hover:text-foreground transition-colors w-fit sm:ml-auto"
							>
								Contact Us
							</Link>
						</div>
					</div>
				</div>

				{/* Copyright */}
				<div className="mt-8 pt-8 border-t text-center">
					<p className="text-sm text-muted-foreground">
						© {currentYear} ShadcnThemer.com. All rights reserved.
					</p>
				</div>
			</div>
		</footer>
	)
}
