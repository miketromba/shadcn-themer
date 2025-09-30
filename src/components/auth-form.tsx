'use client'

import { cn } from '@/lib/utils'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSeparator,
	InputOTPSlot
} from '@/components/ui/input-otp'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

type AuthMode = 'login' | 'signup'

interface AuthFormProps extends React.ComponentPropsWithoutRef<'div'> {
	mode: AuthMode
	isModal?: boolean
	onSuccess?: () => void
}

export function AuthForm({
	mode,
	isModal = false,
	onSuccess,
	className,
	...props
}: AuthFormProps) {
	const [email, setEmail] = useState('')
	const [otp, setOtp] = useState('')
	const [stage, setStage] = useState<'request' | 'verify'>('request')
	const [error, setError] = useState<string | null>(null)
	const [isLoading, setIsLoading] = useState(false)
	const router = useRouter()

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		const supabase = createClient()
		setIsLoading(true)
		setError(null)

		try {
			if (stage === 'request') {
				const { error } = await supabase.auth.signInWithOtp({
					email,
					options: { shouldCreateUser: true }
				})
				if (error) throw error
				setStage('verify')
				return
			}

			if (stage === 'verify') {
				const { error } = await supabase.auth.verifyOtp({
					type: 'email',
					email,
					token: otp
				})
				if (error) throw error

				// Call success callback if modal, otherwise redirect
				if (isModal && onSuccess) {
					onSuccess()
				} else {
					router.push('/')
				}
				return
			}
		} catch (error: unknown) {
			setError(
				error instanceof Error ? error.message : 'An error occurred'
			)
		} finally {
			setIsLoading(false)
		}
	}

	const title = mode === 'login' ? 'Welcome' : 'Create your account'
	const footerText =
		mode === 'login' ? "Don't have an account?" : 'Already have an account?'
	const footerHref = mode === 'login' ? '/auth/sign-up' : '/auth/login'
	const footerCta = mode === 'login' ? 'Sign up' : 'Login'

	return (
		<div className={cn('flex flex-col gap-6', className)} {...props}>
			<Card
				className={cn(isModal && 'border-0 shadow-none bg-transparent')}
			>
				<CardHeader className={cn(isModal && 'px-0 pt-0')}>
					<CardTitle className="text-2xl">{title}</CardTitle>
					<CardDescription>
						{stage === 'request'
							? mode === 'login'
								? 'Sign in or create an account with your email'
								: 'Enter your email to receive a one-time code'
							: 'Enter the 6-digit code sent to your email'}
					</CardDescription>
				</CardHeader>
				<CardContent className={cn(isModal && 'px-0 pb-0')}>
					<form onSubmit={handleSubmit}>
						<div className="flex flex-col gap-6">
							{stage === 'request' ? (
								<div className="grid gap-2">
									<Label htmlFor="email">Email</Label>
									<Input
										id="email"
										type="email"
										placeholder="you@example.com"
										required
										value={email}
										onChange={e => setEmail(e.target.value)}
									/>
								</div>
							) : (
								<div className="grid gap-2">
									<Label htmlFor="otp">One-time code</Label>
									<InputOTP
										maxLength={6}
										value={otp}
										onChange={value => setOtp(value)}
									>
										<InputOTPGroup>
											<InputOTPSlot index={0} />
											<InputOTPSlot index={1} />
											<InputOTPSlot index={2} />
										</InputOTPGroup>
										<InputOTPSeparator />
										<InputOTPGroup>
											<InputOTPSlot index={3} />
											<InputOTPSlot index={4} />
											<InputOTPSlot index={5} />
										</InputOTPGroup>
									</InputOTP>
									<p className="text-xs text-muted-foreground">
										Code sent to {email}
									</p>
									<button
										type="button"
										className="text-xs underline underline-offset-4 justify-self-start text-left"
										onClick={() => setStage('request')}
									>
										Use a different email
									</button>
								</div>
							)}
							{error && (
								<p className="text-sm text-red-500">{error}</p>
							)}
							<Button
								type="submit"
								className="w-full"
								disabled={isLoading}
							>
								{stage === 'request'
									? isLoading
										? 'Sending code...'
										: 'Send code'
									: isLoading
									? 'Verifying...'
									: 'Verify code'}
							</Button>
						</div>
						{!isModal && (
							<div className="mt-4 text-center text-sm">
								{footerText}{' '}
								<Link
									href={footerHref}
									className="underline underline-offset-4"
								>
									{footerCta}
								</Link>
							</div>
						)}
					</form>
				</CardContent>
			</Card>
		</div>
	)
}
