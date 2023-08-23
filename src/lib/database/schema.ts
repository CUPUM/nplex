import { bigint, pgSchema, text, varchar } from 'drizzle-orm/pg-core';

/**
 * Database schema for managing everything i18n oriented.
 */
export const i18nSchema = pgSchema('i18n');

export const locales = i18nSchema.table('locales', {
	id: text('id'),
});

/**
 * Database schema for managing everything auth oriented and related to lucia.
 *
 * @see https://lucia-auth.com/guidebook/drizzle-orm
 * @see https://lucia-auth.com/database-adapters/postgres
 */
export const authSchema = pgSchema('auth');

export const users = authSchema.table('users', {
	id: varchar('id', { length: 15 }).primaryKey(),
	// other user attributes
});

export const sessions = authSchema.table('sessions', {
	id: varchar('id', { length: 128 }).primaryKey(),
	userId: varchar('user_id', { length: 15 })
		.notNull()
		.references(() => users.id),
	activeExpires: bigint('active_expires', { mode: 'number' }).notNull(),
	idleExpires: bigint('idle_expires', { mode: 'number' }).notNull(),
});

export const keys = authSchema.table('keys', {
	id: varchar('id', { length: 255 }).primaryKey(),
	userId: varchar('user_id', { length: 15 })
		.notNull()
		.references(() => users.id),
	hashedPassword: varchar('hashed_password', { length: 255 }),
});

/**
 * Public (generic) schema.
 */

// export const projects = pgTable('projects', {
// 	id:
// })
