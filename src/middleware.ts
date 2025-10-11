import { updateSession } from '@/lib/supabase/middleware'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
	const pathname = request.nextUrl.pathname
	// Skip auth middleware for API routes, preview/screenshot routes, and registry routes
	// API routes handle their own auth, preview and registry routes are public
	if (
		pathname.startsWith('/api/') ||
		pathname.startsWith('/preview/') ||
		pathname.startsWith('/r/')
	) {
		return NextResponse.next({ request })
	}
	// For all other routes, handle authentication and session updates
	return await updateSession(request)
}

export const config = {
	matcher: [
		/*
		 * Match all request paths except:
		 * - _next/static (static files)
		 * - _next/image (image optimization files)
		 * - favicon.ico (favicon file)
		 * - images - .svg, .png, .jpg, .jpeg, .gif, .webp
		 * Feel free to modify this pattern to include more paths.
		 */
		'/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'
	]
}
