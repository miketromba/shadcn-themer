import type { Metadata } from 'next'
import { Mail } from 'lucide-react'
import { EmailReveal } from '@/components/email-reveal'

export const metadata: Metadata = {
	title: 'Contact - Shadcn Theme Maker',
	description: 'Get in touch with ShadcnThemer.com'
}

export default function ContactPage() {
	return (
		<div className="container mx-auto px-4 sm:px-8 py-12 max-w-4xl">
			<h1 className="text-4xl font-bold mb-8">Contact</h1>
			<div className="prose prose-neutral dark:prose-invert max-w-none">
				<p className="text-lg text-muted-foreground mb-8">
					Have questions, feedback, or need help? Shoot me an email.
				</p>

				<div className="not-prose flex items-start gap-4 p-6 border rounded-lg bg-muted/50">
					<Mail className="size-6 mt-1 text-primary" />
					<div>
						<h2 className="text-xl font-semibold mb-2">Email</h2>
						<p className="text-muted-foreground mb-4">
							For any inquiries, support requests, or feedback,
							please email me at:
						</p>
						<EmailReveal />
					</div>
				</div>

				<div className="mt-8 space-y-4">
					<h3 className="text-xl font-semibold">What to include:</h3>
					<ul className="list-disc pl-6 space-y-2 text-muted-foreground">
						<li>A clear subject line describing your inquiry</li>
						<li>Detailed description of your question or issue</li>
						<li>
							Your username (if applicable) for account-related
							questions
						</li>
						<li>
							Any relevant screenshots or error messages that
							might help me assist you
						</li>
					</ul>
					<p className="text-sm text-muted-foreground mt-6">
						I typically respond within 1-2 business days.
					</p>
				</div>
			</div>
		</div>
	)
}
