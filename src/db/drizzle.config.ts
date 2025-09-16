import { defineConfig } from 'drizzle-kit'
import 'dotenv/config'

// Ensure SSL parameters are in the URL
// const addSslToUrl = (url: string) => {
// 	const hasParams = url.includes('?')
// 	return `${url}${hasParams ? '&' : '?'}sslmode=require`
// }

export default defineConfig({
	schema: './src/db/schema.ts',
	out: './src/db/drizzle',
	dialect: 'postgresql',
	dbCredentials: {
		url: process.env.DATABASE_URL!, //addSslToUrl(process.env.DATABASE_URL!),
		ssl: {
			rejectUnauthorized: false
		}
	}
})
