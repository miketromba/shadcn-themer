// Macbook Pro 14 dimensions
export const SCREENSHOT_DEVICE_WIDTH = 1440
export const SCREENSHOT_DEVICE_HEIGHT = 900
export const SCREENSHOT_ASPECT_RATIO =
	SCREENSHOT_DEVICE_WIDTH / SCREENSHOT_DEVICE_HEIGHT

/**
 * Generates a preview URL for a project
 * @param options - Configuration for the preview URL
 * @returns The generated preview URL
 */
export function generatePreviewUrl(options: {
	themeId: string
	demo?: string
	mode?: 'light' | 'dark'
}): string {
	const { themeId, demo, mode } = options
	const params = new URLSearchParams()
	if (demo) params.set('demo', demo)
	if (mode) params.set('mode', mode)
	const query = params.toString()
	return `/preview/${themeId}${query ? `?${query}` : ''}`
}

/**
 * Generate a screenshot
 */
export async function generateScreenshot(
	themeId: string,
	demo?: string,
	mode?: 'light' | 'dark'
): Promise<Buffer> {
	const webAppUrl = process.env.WEB_APP_URL?.includes('localhost')
		? process.env.WEB_APP_URL.replace('localhost', 'host.docker.internal')
		: process.env.WEB_APP_URL

	const previewUrl = `${webAppUrl}${generatePreviewUrl({
		themeId,
		demo,
		mode
	})}`
	console.log('previewUrl', previewUrl)

	// Build screenshot service URL with robust loading options
	const screenshotParams = new URLSearchParams({
		url: previewUrl,
		type: 'webp',
		quality: '80',
		width: SCREENSHOT_DEVICE_WIDTH.toString(),
		height: SCREENSHOT_DEVICE_HEIGHT.toString(),
		// Wait for network to be mostly idle (max 2 connections)
		waitUntil: 'networkidle2',
		// Wait for theme to be applied (our custom marker)
		waitForSelector: '[data-theme-ready="true"]',
		// Small delay for any CSS transitions/animations
		delay: '500'
	})

	const screenshotResponse = await fetch(
		`${process.env.SCREENSHOT_SERVICE_URL}/screenshot?${screenshotParams}`,
		{
			headers: {
				Authorization: `Bearer ${process.env.SCREENSHOT_SERVICE_AUTH_TOKEN}`
			}
		}
	)

	if (!screenshotResponse.ok) {
		const error = await screenshotResponse.text()
		throw new Error(`Screenshot service error: ${error}`)
	}

	return Buffer.from(await screenshotResponse.arrayBuffer())
}
