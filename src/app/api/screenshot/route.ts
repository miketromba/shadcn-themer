import { GET as screenshotHandler } from '@miketromba/screenshot-service/vercel'

export const GET = screenshotHandler

// Required for Puppeteer in serverless
export const runtime = 'nodejs'
export const maxDuration = 60
