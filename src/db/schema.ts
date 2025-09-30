// db/schema.ts
import {
	pgTable,
	text,
	timestamp,
	uuid,
	index,
	primaryKey,
	jsonb,
	uniqueIndex,
	AnyPgColumn,
	integer
} from 'drizzle-orm/pg-core'
import { SQL, sql } from 'drizzle-orm'

// Themes table
export const themes = pgTable('themes', {
	id: uuid('id').primaryKey().defaultRandom(),
	user_id: uuid('user_id').references(() => profiles.id),
	name: text('name').notNull(),
	json: jsonb('json').notNull(),
	forked_from: uuid('forked_from'),
	star_count: integer('star_count').default(0).notNull(),
	version: integer('version').default(1).notNull(),
	screenshot_version: integer('screenshot_version').default(0).notNull(),
	color_bucket: text('color_bucket', {
		enum: [
			'red',
			'orange',
			'yellow',
			'green',
			'teal',
			'blue',
			'purple',
			'pink',
			'gray',
			'black',
			'white'
		]
	}),
	created_at: timestamp('created_at', {
		mode: 'date',
		withTimezone: true
	})
		.defaultNow()
		.notNull(),
	updated_at: timestamp('updated_at', {
		mode: 'date',
		withTimezone: true
	})
		.$onUpdate(() => new Date())
		.defaultNow()
		.notNull()
})

// Stars table
export const stars = pgTable(
	'stars',
	{
		user_id: uuid('user_id').references(() => profiles.id),
		theme_id: uuid('theme_id').references(() => themes.id),
		created_at: timestamp('created_at', {
			mode: 'date',
			withTimezone: true
		})
			.defaultNow()
			.notNull()
	},
	table => [primaryKey({ columns: [table.user_id, table.theme_id] })]
)

// User profiles table linked to auth.users
export const profiles = pgTable(
	'profiles',
	{
		id: uuid('id').primaryKey(), // References auth.users, handled via trigger
		email: text('email'),
		username: text('username'),
		email_confirmed_at: timestamp('email_confirmed_at', {
			mode: 'date',
			withTimezone: true
		}),
		last_sign_in_at: timestamp('last_sign_in_at', {
			mode: 'date',
			withTimezone: true
		}),
		created_at: timestamp('created_at', {
			mode: 'date',
			withTimezone: true
		})
			.defaultNow()
			.notNull(),
		updated_at: timestamp('updated_at', {
			mode: 'date',
			withTimezone: true
		})
			.$onUpdate(() => new Date())
			.defaultNow()
			.notNull(),
		changelog_last_viewed: timestamp('changelog_last_viewed', {
			mode: 'date'
		})
			.defaultNow()
			.notNull()
	},
	table => [
		index('profiles_id_idx').on(table.id),
		index('profiles_email_idx').on(table.email),
		uniqueIndex('profiles_username_lower_unique').on(lower(table.username))
	]
)

// Custom lower() helper for functional unique index and lookups
export function lower(column: AnyPgColumn): SQL {
	return sql`lower(${column})`
}
