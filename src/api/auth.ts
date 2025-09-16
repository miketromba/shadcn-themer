import { Context } from 'hono'
import { createClient } from '@/lib/supabase/server'
import { HTTPException } from 'hono/http-exception'

// Middleware to get and verify the authenticated user
export async function getAuthUser(c: Context) {
	const supabase = await createClient()

	// Get the user from the session
	const {
		data: { user },
		error
	} = await supabase.auth.getUser()

	if (error || !user) {
		// If there's an error or no user, throw an unauthorized exception
		throw new HTTPException(401, { message: 'Unauthorized' })
	}

	// Return the authenticated user
	return user
}
