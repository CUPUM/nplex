import { USERS_ROLES } from '$lib/auth/constants';
import { bigint, pgSchema, uuid, varchar } from 'drizzle-orm/pg-core';
import { userRole } from '../custom-types/user-role';
import { textContents } from './i18n';

/**
 * Database schema for managing everything auth oriented and related to lucia. Separated from the
 * public schema for convenience's sake and for improved database portability / security.
 *
 * @see https://lucia-auth.com/guidebook/drizzle-orm
 * @see https://lucia-auth.com/database-adapters/postgres
 */
export const authSchema = pgSchema('auth');

/**
 * Base user roles. More granular control for RBAC on certain entities can be refined at said
 * entities' level (ex: projectsUsers.role, ...).
 */
export const roles = authSchema.table('roles', {
	role: userRole('role').primaryKey(),
	nameId: uuid('name_id')
		.references(() => textContents.id, { onDelete: 'set null', onUpdate: 'cascade' })
		.unique(),
	descriptionId: uuid('description_id')
		.references(() => textContents.id, { onDelete: 'set null', onUpdate: 'cascade' })
		.unique(),
});

/**
 * App's registered users.
 *
 * @see https://lucia-auth.com/basics/users
 */
export const users = authSchema.table('users', {
	id: varchar('id', { length: 15 }).primaryKey(),
	role: userRole('role')
		.references(() => roles.role, {
			onDelete: 'set default',
			onUpdate: 'cascade',
		})
		.default(USERS_ROLES.VISITOR)
		.notNull(),
});

/**
 * Sessions to track auth-oriented user requests.
 *
 * @see https://lucia-auth.com/basics/sessions
 */
export const sessions = authSchema.table('sessions', {
	id: varchar('id', { length: 128 }).primaryKey(),
	userId: varchar('user_id', { length: 15 })
		.notNull()
		.references(() => users.id),
	activeExpires: bigint('active_expires', { mode: 'number' }).notNull(),
	idleExpires: bigint('idle_expires', { mode: 'number' }).notNull(),
});

/**
 * Universal relationship between a user and a reference to that user.
 *
 * @see https://lucia-auth.com/basics/keys
 */
export const keys = authSchema.table('keys', {
	id: varchar('id', { length: 255 }).primaryKey(),
	userId: varchar('user_id', { length: 15 })
		.notNull()
		.references(() => users.id),
	hashedPassword: varchar('hashed_password', { length: 255 }),
});
