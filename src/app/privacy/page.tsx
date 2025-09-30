import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Privacy Policy - Shadcn Theme Maker',
	description: 'Privacy Policy for ShadcnThemer.com'
}

export default function PrivacyPage() {
	return (
		<div className="container mx-auto px-4 sm:px-8 py-12 max-w-4xl">
			<h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
			<div className="prose prose-neutral dark:prose-invert max-w-none space-y-6">
				<p className="text-muted-foreground">
					Last Updated: September 30, 2025
				</p>

				<section>
					<h2 className="text-2xl font-semibold mt-8 mb-4">
						1. Introduction
					</h2>
					<p>
						ShadcnThemer.com (&quot;we,&quot; &quot;our,&quot; or
						&quot;us&quot;) is committed to protecting your privacy.
						This Privacy Policy explains how we collect, use,
						disclose, and safeguard your information when you use
						our Service.
					</p>
					<p className="mt-4">
						By using ShadcnThemer.com, you agree to the collection
						and use of information in accordance with this Privacy
						Policy.
					</p>
				</section>

				<section>
					<h2 className="text-2xl font-semibold mt-8 mb-4">
						2. Information We Collect
					</h2>
					<h3 className="text-xl font-semibold mt-6 mb-3">
						2.1 Information You Provide
					</h3>
					<p>
						When you create an account and use our Service, we
						collect:
					</p>
					<ul className="list-disc pl-6 space-y-2">
						<li>
							<strong>Email Address:</strong> Used for
							authentication and account recovery
						</li>
						<li>
							<strong>Username:</strong> Automatically generated
							or user-selected display name
						</li>
						<li>
							<strong>Theme Content:</strong> Color schemes,
							configuration data, and theme names you create
						</li>
					</ul>

					<h3 className="text-xl font-semibold mt-6 mb-3">
						2.2 Automatically Collected Information
					</h3>
					<p>
						We automatically collect certain information when you
						use our Service:
					</p>
					<ul className="list-disc pl-6 space-y-2">
						<li>
							<strong>Usage Data:</strong> Pages visited, features
							used, themes viewed, and interaction patterns
						</li>
						<li>
							<strong>Device Information:</strong> Browser type,
							operating system, IP address, and device identifiers
						</li>
						<li>
							<strong>Timestamps:</strong> Account creation, last
							sign-in, and content update times
						</li>
						<li>
							<strong>Analytics Data:</strong> Collected via
							Google Analytics (see Section 4)
						</li>
					</ul>
				</section>

				<section>
					<h2 className="text-2xl font-semibold mt-8 mb-4">
						3. How We Use Your Information
					</h2>
					<p>
						We use the collected information for the following
						purposes:
					</p>
					<ul className="list-disc pl-6 space-y-2">
						<li>
							<strong>Service Delivery:</strong> To provide,
							maintain, and improve our theme creation and sharing
							platform
						</li>
						<li>
							<strong>Authentication:</strong> To verify your
							identity and manage your account access
						</li>
						<li>
							<strong>Content Management:</strong> To store,
							display, and enable sharing of your themes
						</li>
						<li>
							<strong>Analytics:</strong> To understand how users
							interact with our Service and improve user
							experience
						</li>
						<li>
							<strong>Communication:</strong> To send
							authentication codes and important service updates
						</li>
						<li>
							<strong>Security:</strong> To detect, prevent, and
							address technical issues and abuse
						</li>
						<li>
							<strong>Legal Compliance:</strong> To comply with
							applicable laws and regulations
						</li>
					</ul>
				</section>

				<section>
					<h2 className="text-2xl font-semibold mt-8 mb-4">
						4. Third-Party Services
					</h2>
					<p>
						We use third-party service providers to operate and
						improve our Service. These providers have access to your
						information only to perform specific tasks on our
						behalf:
					</p>

					<h3 className="text-xl font-semibold mt-6 mb-3">
						4.1 Supabase
					</h3>
					<p>
						We use Supabase for authentication and database
						services. Your email address and account data are
						processed by Supabase. See{' '}
						<a
							href="https://supabase.com/privacy"
							target="_blank"
							rel="noopener noreferrer"
							className="text-primary hover:underline"
						>
							Supabase Privacy Policy
						</a>
						.
					</p>

					<h3 className="text-xl font-semibold mt-6 mb-3">
						4.2 Vercel
					</h3>
					<p>
						Our Service is hosted on Vercel infrastructure. Vercel
						may collect usage and performance data. See{' '}
						<a
							href="https://vercel.com/legal/privacy-policy"
							target="_blank"
							rel="noopener noreferrer"
							className="text-primary hover:underline"
						>
							Vercel Privacy Policy
						</a>
						.
					</p>

					<h3 className="text-xl font-semibold mt-6 mb-3">
						4.3 Google Analytics
					</h3>
					<p>
						We use Google Analytics to analyze usage patterns.
						Google Analytics uses cookies and may collect IP
						addresses, device information, and browsing behavior.
						This data is anonymized where possible. See{' '}
						<a
							href="https://policies.google.com/privacy"
							target="_blank"
							rel="noopener noreferrer"
							className="text-primary hover:underline"
						>
							Google Privacy Policy
						</a>
						.
					</p>

					<h3 className="text-xl font-semibold mt-6 mb-3">
						4.4 Screenshot Services
					</h3>
					<p>
						We use third-party services to generate preview images
						of themes. Theme configuration data may be temporarily
						processed by these services.
					</p>
				</section>

				<section>
					<h2 className="text-2xl font-semibold mt-8 mb-4">
						5. Public Content
					</h2>
					<p>
						<strong>Important:</strong> All themes you create on
						ShadcnThemer.com are public by default and accessible to
						all users. This includes:
					</p>
					<ul className="list-disc pl-6 space-y-2">
						<li>Theme names and color configurations</li>
						<li>Your username associated with themes</li>
						<li>Theme creation and update timestamps</li>
						<li>Star counts and fork relationships</li>
					</ul>
					<p className="mt-4">
						Do not include sensitive, personal, or confidential
						information in your themes or usernames, as this
						information will be publicly visible.
					</p>
				</section>

				<section>
					<h2 className="text-2xl font-semibold mt-8 mb-4">
						6. Cookies and Tracking
					</h2>
					<p>We use cookies and similar tracking technologies to:</p>
					<ul className="list-disc pl-6 space-y-2">
						<li>
							<strong>Authentication Cookies:</strong> To maintain
							your logged-in session
						</li>
						<li>
							<strong>Analytics Cookies:</strong> To understand
							usage patterns via Google Analytics
						</li>
						<li>
							<strong>Preference Cookies:</strong> To remember
							your theme preview settings (light/dark mode)
						</li>
					</ul>
					<p className="mt-4">
						You can control cookies through your browser settings.
						Disabling cookies may limit your ability to use certain
						features of our Service.
					</p>
				</section>

				<section>
					<h2 className="text-2xl font-semibold mt-8 mb-4">
						7. Data Storage and Security
					</h2>
					<p>
						We implement appropriate technical and organizational
						measures to protect your information:
					</p>
					<ul className="list-disc pl-6 space-y-2">
						<li>
							<strong>Encryption:</strong> Data is transmitted
							over secure HTTPS connections
						</li>
						<li>
							<strong>Authentication:</strong> Email-based
							one-time passwords (OTP) for secure access
						</li>
						<li>
							<strong>Database Security:</strong> Row-level
							security policies and secure database access
						</li>
						<li>
							<strong>Access Controls:</strong> Limited access to
							personal data by authorized personnel only
						</li>
					</ul>
					<p className="mt-4">
						However, no method of transmission over the internet is
						100% secure. While we strive to protect your
						information, we cannot guarantee absolute security.
					</p>
				</section>

				<section>
					<h2 className="text-2xl font-semibold mt-8 mb-4">
						8. Data Retention
					</h2>
					<p>
						We retain your personal information for as long as
						necessary to provide our Service and fulfill the
						purposes outlined in this Privacy Policy:
					</p>
					<ul className="list-disc pl-6 space-y-2">
						<li>
							<strong>Account Data:</strong> Retained while your
							account is active
						</li>
						<li>
							<strong>Theme Content:</strong> Retained
							indefinitely unless you delete specific themes
						</li>
						<li>
							<strong>Usage Logs:</strong> Retained for up to 12
							months for analytics and security purposes
						</li>
					</ul>
					<p className="mt-4">
						When you delete your account, we will delete or
						anonymize your personal information within 30 days,
						except where retention is required by law.
					</p>
				</section>

				<section>
					<h2 className="text-2xl font-semibold mt-8 mb-4">
						9. Your Rights and Choices
					</h2>
					<p>
						Depending on your location, you may have certain rights
						regarding your personal information:
					</p>

					<h3 className="text-xl font-semibold mt-6 mb-3">
						9.1 Access and Portability
					</h3>
					<p>
						You can access your account information and themes at
						any time through your user profile.
					</p>

					<h3 className="text-xl font-semibold mt-6 mb-3">
						9.2 Correction
					</h3>
					<p>
						You can update your username and other account
						information directly through the Service.
					</p>

					<h3 className="text-xl font-semibold mt-6 mb-3">
						9.3 Deletion
					</h3>
					<p>
						You can delete individual themes at any time. To delete
						your entire account and associated data, contact us at{' '}
						<a
							href="mailto:mike@flamelab.io"
							className="text-primary hover:underline"
						>
							mike@flamelab.io
						</a>
						.
					</p>

					<h3 className="text-xl font-semibold mt-6 mb-3">
						9.4 Opt-Out of Analytics
					</h3>
					<p>
						You can opt-out of Google Analytics tracking by using
						browser extensions or adjusting your cookie preferences.
					</p>

					<h3 className="text-xl font-semibold mt-6 mb-3">
						9.5 GDPR Rights (EU Users)
					</h3>
					<p>
						If you are in the European Union, you have additional
						rights including the right to object to processing,
						right to restriction, and right to lodge a complaint
						with a supervisory authority.
					</p>

					<h3 className="text-xl font-semibold mt-6 mb-3">
						9.6 CCPA Rights (California Users)
					</h3>
					<p>
						California residents have the right to know what
						personal information is collected, request deletion of
						personal information, and opt-out of the sale of
						personal information. We do not sell your personal
						information.
					</p>
				</section>

				<section>
					<h2 className="text-2xl font-semibold mt-8 mb-4">
						10. Children&apos;s Privacy
					</h2>
					<p>
						Our Service is not intended for children under the age
						of 13. We do not knowingly collect personal information
						from children under 13. If you are a parent or guardian
						and believe your child has provided us with personal
						information, please contact us at{' '}
						<a
							href="mailto:mike@flamelab.io"
							className="text-primary hover:underline"
						>
							mike@flamelab.io
						</a>{' '}
						and we will delete such information.
					</p>
				</section>

				<section>
					<h2 className="text-2xl font-semibold mt-8 mb-4">
						11. International Data Transfers
					</h2>
					<p>
						Your information may be transferred to and maintained on
						servers located outside of your state, province,
						country, or other governmental jurisdiction where data
						protection laws may differ.
					</p>
					<p className="mt-4">
						By using our Service, you consent to the transfer of
						your information to the United States and other
						countries where our service providers operate.
					</p>
				</section>

				<section>
					<h2 className="text-2xl font-semibold mt-8 mb-4">
						12. Changes to This Privacy Policy
					</h2>
					<p>
						We may update this Privacy Policy from time to time. We
						will notify you of any changes by:
					</p>
					<ul className="list-disc pl-6 space-y-2">
						<li>
							Updating the &quot;Last Updated&quot; date at the
							top of this policy
						</li>
						<li>Posting the new Privacy Policy on this page</li>
						<li>
							Sending a notice to your email address (for material
							changes)
						</li>
					</ul>
					<p className="mt-4">
						Your continued use of the Service after any changes
						constitutes acceptance of the updated Privacy Policy.
					</p>
				</section>

				<section>
					<h2 className="text-2xl font-semibold mt-8 mb-4">
						13. Contact Us
					</h2>
					<p>
						If you have questions, concerns, or requests regarding
						this Privacy Policy or our data practices, please
						contact us at:
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
					<p className="mt-4">
						We will respond to your inquiry within 30 days.
					</p>
				</section>

				<section className="mt-12 pt-8 border-t">
					<p className="text-sm text-muted-foreground">
						By using ShadcnThemer.com, you acknowledge that you have
						read and understood this Privacy Policy and agree to its
						terms.
					</p>
				</section>
			</div>
		</div>
	)
}
