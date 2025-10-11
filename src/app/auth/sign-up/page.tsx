import type { Metadata } from 'next'
import { AuthForm } from '@/components/auth-form'

export const metadata: Metadata = {
	title: 'Sign Up',
	description:
		'Sign up for ShadCN Themer to create, share, and manage your themes',
	robots: {
		index: false,
		follow: false
	}
}

export default function Page() {
	return (
		<div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
			<div className="w-full max-w-sm">
				<AuthForm mode="signup" />
			</div>
		</div>
	)
}
