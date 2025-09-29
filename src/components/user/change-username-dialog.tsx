'use client'

import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useUpdateUsername, useCurrentUserProfile } from '@/api/client/users'
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '@/components/ui/form'

const schema = z.object({
	username: z
		.string()
		.min(4, 'Must be at least 4 characters')
		.regex(
			/^[a-z0-9_-]+$/,
			'Use lowercase letters, numbers, underscores, or hyphens only'
		)
})

type Props = {
	open: boolean
	onOpenChange: (open: boolean) => void
	currentUsername: string
}

export function ChangeUsernameDialog({
	open,
	onOpenChange,
	currentUsername
}: Props) {
	const { mutateAsync, isPending } = useUpdateUsername()
	const [serverError, setServerError] = useState<string | null>(null)

	const form = useForm<z.infer<typeof schema>>({
		resolver: zodResolver(schema),
		defaultValues: { username: currentUsername || '' },
		mode: 'onChange'
	})

	useEffect(() => {
		if (open) {
			form.reset({ username: currentUsername || '' })
		}
	}, [open, currentUsername, form])

	const onSubmit = async (values: z.infer<typeof schema>) => {
		setServerError(null)
		try {
			await mutateAsync(values.username)
			onOpenChange(false)
		} catch (e: unknown) {
			const message =
				typeof e === 'object' && e && 'message' in e
					? (e as { message?: string }).message
					: 'Failed to update username'
			setServerError(message ?? 'Failed to update username')
		}
	}

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-[360px]">
				<DialogHeader>
					<DialogTitle>Change username</DialogTitle>
				</DialogHeader>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="space-y-4"
					>
						<FormField
							control={form.control}
							name="username"
							render={({ field }) => (
								<FormItem>
									{/* <FormLabel>Username</FormLabel> */}
									<FormControl>
										<Input
											placeholder="your-username"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						{serverError ? (
							<p className="text-sm text-destructive">
								{serverError}
							</p>
						) : null}
						<DialogFooter>
							<Button
								type="button"
								variant="outline"
								onClick={() => onOpenChange(false)}
								disabled={isPending}
							>
								Cancel
							</Button>
							<Button
								type="submit"
								disabled={!form.formState.isValid || isPending}
							>
								Save
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	)
}
