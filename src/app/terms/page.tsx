import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Terms of Service - Shadcn Theme Maker',
	description: 'Terms of Service for ShadcnThemer.com'
}

export default function TermsPage() {
	return (
		<div className="container mx-auto px-4 sm:px-8 py-12 max-w-4xl">
			<h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
			<div className="prose prose-neutral dark:prose-invert max-w-none space-y-6">
				<p className="text-muted-foreground">
					Last Updated: September 30, 2025
				</p>

				<section>
					<h2 className="text-2xl font-semibold mt-8 mb-4">
						1. Acceptance of Terms
					</h2>
					<p>
						By accessing or using ShadcnThemer.com (the
						&quot;Service&quot;), you agree to be bound by these
						Terms of Service (&quot;Terms&quot;). If you do not
						agree to these Terms, you may not use the Service. We
						reserve the right to modify these Terms at any time, and
						your continued use of the Service constitutes acceptance
						of such modifications.
					</p>
				</section>

				<section>
					<h2 className="text-2xl font-semibold mt-8 mb-4">
						2. Description of Service
					</h2>
					<p>
						ShadcnThemer.com is a free online platform that allows
						users to create, customize, share, and discover themes
						for shadcn/ui component libraries. The Service includes:
					</p>
					<ul className="list-disc pl-6 space-y-2">
						<li>Theme creation and editing tools</li>
						<li>Public sharing and discovery of themes</li>
						<li>Theme forking and derivative works</li>
						<li>User profiles and theme collections</li>
						<li>
							Theme starring/favoriting functionality to curate
							and discover popular themes
						</li>
					</ul>
				</section>

				<section>
					<h2 className="text-2xl font-semibold mt-8 mb-4">
						3. User Accounts
					</h2>
					<p>
						To create and manage themes, you must create an account.
						You agree to:
					</p>
					<ul className="list-disc pl-6 space-y-2">
						<li>Provide accurate and current email information</li>
						<li>
							Maintain the security of your account credentials
						</li>
						<li>
							Be responsible for all activities that occur under
							your account
						</li>
						<li>
							Notify us immediately of any unauthorized use of
							your account
						</li>
						<li>
							Not create multiple accounts to circumvent Service
							restrictions
						</li>
					</ul>
					<p className="mt-4">
						We reserve the right to suspend or terminate accounts
						that violate these Terms or engage in abusive behavior.
					</p>
				</section>

				<section>
					<h2 className="text-2xl font-semibold mt-8 mb-4">
						4. User Content and Intellectual Property
					</h2>
					<h3 className="text-xl font-semibold mt-6 mb-3">
						4.1 Your Content
					</h3>
					<p>
						You retain ownership of the themes and content you
						create on ShadcnThemer.com. By posting themes on the
						Service, you grant us a worldwide, non-exclusive,
						royalty-free license to use, display, reproduce, and
						distribute your content solely for the purpose of
						operating and improving the Service.
					</p>

					<h3 className="text-xl font-semibold mt-6 mb-3">
						4.2 Public Content
					</h3>
					<p>
						All themes created on ShadcnThemer.com are public by
						default and can be viewed, forked, and used by other
						users. By creating a theme, you acknowledge and agree
						that:
					</p>
					<ul className="list-disc pl-6 space-y-2">
						<li>
							Your themes will be publicly accessible to all users
						</li>
						<li>
							Other users may fork (create derivative works from)
							your themes
						</li>
						<li>
							You grant other users a license to use and modify
							your themes for their own purposes
						</li>
						<li>
							Attribution to original creators is tracked through
							fork relationships but is not legally required
						</li>
					</ul>

					<h3 className="text-xl font-semibold mt-6 mb-3">
						4.3 Your Responsibilities
					</h3>
					<p>You agree not to upload, post, or share content that:</p>
					<ul className="list-disc pl-6 space-y-2">
						<li>
							Infringes on intellectual property rights of others
						</li>
						<li>
							Contains malicious code, viruses, or harmful
							components
						</li>
						<li>
							Is unlawful, threatening, abusive, harassing,
							defamatory, or obscene
						</li>
						<li>
							Impersonates any person or entity or misrepresents
							your affiliation
						</li>
						<li>
							Contains spam, advertising, or commercial content
							unrelated to themes
						</li>
					</ul>
				</section>

				<section>
					<h2 className="text-2xl font-semibold mt-8 mb-4">
						5. Theme Forking and Derivative Works
					</h2>
					<p>
						Our Service includes functionality to &quot;fork&quot;
						themes, creating derivative works based on existing
						themes. By using the Service:
					</p>
					<ul className="list-disc pl-6 space-y-2">
						<li>
							You acknowledge that your themes may be forked by
							others
						</li>
						<li>
							You agree to respect the intellectual property
							rights of theme creators when forking
						</li>
						<li>
							Fork relationships are tracked and displayed to
							maintain attribution
						</li>
						<li>
							You may not misrepresent forked themes as entirely
							original creations
						</li>
					</ul>
				</section>

				<section>
					<h2 className="text-2xl font-semibold mt-8 mb-4">
						6. Prohibited Uses
					</h2>
					<p>You agree not to:</p>
					<ul className="list-disc pl-6 space-y-2">
						<li>
							Use the Service for any illegal purpose or in
							violation of any laws
						</li>
						<li>
							Attempt to gain unauthorized access to the Service,
							user accounts, or systems
						</li>
						<li>
							Interfere with or disrupt the Service or servers
						</li>
						<li>
							Use automated systems (bots, scrapers) without
							permission to access the Service
						</li>
						<li>
							Attempt to reverse engineer, decompile, or extract
							source code
						</li>
						<li>
							Abuse the starring, forking, or other Service
							features
						</li>
						<li>
							Circumvent any security features or access
							restrictions
						</li>
					</ul>
				</section>

				<section>
					<h2 className="text-2xl font-semibold mt-8 mb-4">
						7. Privacy and Data Collection
					</h2>
					<p>
						Our use of your personal information is governed by our
						Privacy Policy. By using the Service, you consent to our
						collection and use of personal data as outlined in the
						Privacy Policy.
					</p>
					<p className="mt-4">
						We use Google Analytics to collect anonymized usage data
						to improve the Service. This includes information about
						how you interact with our platform, pages visited, and
						general usage patterns.
					</p>
				</section>

				<section>
					<h2 className="text-2xl font-semibold mt-8 mb-4">
						8. Third-Party Services
					</h2>
					<p>
						The Service may integrate with or link to third-party
						services including but not limited to:
					</p>
					<ul className="list-disc pl-6 space-y-2">
						<li>Supabase (authentication and database services)</li>
						<li>Vercel (hosting and infrastructure)</li>
						<li>Google Analytics (usage analytics)</li>
						<li>Screenshot generation services</li>
					</ul>
					<p className="mt-4">
						We are not responsible for the practices or content of
						third-party services. Your use of third-party services
						is subject to their respective terms and policies.
					</p>
				</section>

				<section>
					<h2 className="text-2xl font-semibold mt-8 mb-4">
						9. Disclaimer of Warranties
					</h2>
					<p>
						THE SERVICE IS PROVIDED &quot;AS IS&quot; AND &quot;AS
						AVAILABLE&quot; WITHOUT WARRANTIES OF ANY KIND, EITHER
						EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO
						WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
						PURPOSE, OR NON-INFRINGEMENT.
					</p>
					<p className="mt-4">We do not warrant that:</p>
					<ul className="list-disc pl-6 space-y-2">
						<li>
							The Service will be uninterrupted, timely, secure,
							or error-free
						</li>
						<li>
							The results obtained from using the Service will be
							accurate or reliable
						</li>
						<li>Any errors in the Service will be corrected</li>
						<li>
							The themes created will be compatible with all
							systems or use cases
						</li>
					</ul>
				</section>

				<section>
					<h2 className="text-2xl font-semibold mt-8 mb-4">
						10. Limitation of Liability
					</h2>
					<p>
						TO THE MAXIMUM EXTENT PERMITTED BY LAW, IN NO EVENT
						SHALL SHADCNTHEMER.COM, ITS OPERATORS, AFFILIATES, OR
						SERVICE PROVIDERS BE LIABLE FOR ANY INDIRECT,
						INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES,
						INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, DATA, USE,
						OR GOODWILL, ARISING OUT OF OR RELATED TO YOUR USE OF
						THE SERVICE.
					</p>
					<p className="mt-4">
						Our total liability to you for all claims arising from
						or related to the Service shall not exceed $100 USD.
					</p>
				</section>

				<section>
					<h2 className="text-2xl font-semibold mt-8 mb-4">
						11. Indemnification
					</h2>
					<p>
						You agree to indemnify, defend, and hold harmless
						ShadcnThemer.com and its operators from any claims,
						liabilities, damages, losses, and expenses (including
						reasonable attorneys&apos; fees) arising out of or
						related to:
					</p>
					<ul className="list-disc pl-6 space-y-2">
						<li>Your use of the Service</li>
						<li>Your content and themes</li>
						<li>Your violation of these Terms</li>
						<li>
							Your violation of any rights of another party,
							including intellectual property rights
						</li>
					</ul>
				</section>

				<section>
					<h2 className="text-2xl font-semibold mt-8 mb-4">
						12. Content Moderation and Removal
					</h2>
					<p>
						We reserve the right, but have no obligation, to
						monitor, review, or remove content that violates these
						Terms or is otherwise objectionable. We may remove
						content or suspend accounts at our sole discretion
						without prior notice.
					</p>
					<p className="mt-4">
						To report inappropriate content or violations, please
						contact us at the email address provided in the Contact
						section below.
					</p>
				</section>

				<section>
					<h2 className="text-2xl font-semibold mt-8 mb-4">
						13. Termination
					</h2>
					<p>
						We reserve the right to suspend or terminate your access
						to the Service at any time, with or without cause, and
						with or without notice. Upon termination:
					</p>
					<ul className="list-disc pl-6 space-y-2">
						<li>
							Your right to use the Service will immediately cease
						</li>
						<li>
							We may delete your account and content at our
							discretion
						</li>
						<li>
							You remain liable for all obligations accrued prior
							to termination
						</li>
					</ul>
					<p className="mt-4">
						You may terminate your account at any time by contacting
						us or using account deletion features when available.
					</p>
				</section>

				<section>
					<h2 className="text-2xl font-semibold mt-8 mb-4">
						14. Changes to the Service
					</h2>
					<p>
						We reserve the right to modify, suspend, or discontinue
						the Service (or any part thereof) at any time with or
						without notice. We shall not be liable to you or any
						third party for any modification, suspension, or
						discontinuation of the Service.
					</p>
				</section>

				<section>
					<h2 className="text-2xl font-semibold mt-8 mb-4">
						15. Governing Law and Disputes
					</h2>
					<p>
						These Terms shall be governed by and construed in
						accordance with the laws of the United States, without
						regard to conflict of law principles.
					</p>
					<p className="mt-4">
						Any disputes arising from these Terms or your use of the
						Service shall be resolved through binding arbitration in
						accordance with the rules of the American Arbitration
						Association, except that either party may seek
						injunctive relief in court for intellectual property
						violations.
					</p>
				</section>

				<section>
					<h2 className="text-2xl font-semibold mt-8 mb-4">
						16. Miscellaneous
					</h2>
					<h3 className="text-xl font-semibold mt-6 mb-3">
						Entire Agreement
					</h3>
					<p>
						These Terms, together with our Privacy Policy,
						constitute the entire agreement between you and
						ShadcnThemer.com regarding the Service.
					</p>

					<h3 className="text-xl font-semibold mt-6 mb-3">
						Severability
					</h3>
					<p>
						If any provision of these Terms is found to be invalid
						or unenforceable, the remaining provisions shall remain
						in full force and effect.
					</p>

					<h3 className="text-xl font-semibold mt-6 mb-3">Waiver</h3>
					<p>
						Our failure to enforce any right or provision of these
						Terms shall not constitute a waiver of such right or
						provision.
					</p>

					<h3 className="text-xl font-semibold mt-6 mb-3">
						Assignment
					</h3>
					<p>
						You may not assign or transfer these Terms or your
						rights hereunder without our prior written consent. We
						may assign these Terms without restriction.
					</p>
				</section>

				<section>
					<h2 className="text-2xl font-semibold mt-8 mb-4">
						17. Contact Information
					</h2>
					<p>
						For questions about these Terms or to report violations,
						please contact us at:
					</p>
					<p className="mt-4 font-medium">
						Email:{' '}
						<a
							href="mailto:mike@flamelab.io"
							className="text-primary hover:underline"
						>
							mike@flamelab.io
						</a>
					</p>
				</section>

				<section className="mt-12 pt-8 border-t">
					<p className="text-sm text-muted-foreground">
						By using ShadcnThemer.com, you acknowledge that you have
						read, understood, and agree to be bound by these Terms
						of Service.
					</p>
				</section>
			</div>
		</div>
	)
}
