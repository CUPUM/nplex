import { USERS_ROLES } from '$lib/auth/constants';
import {
	bigint,
	pgSchema,
	primaryKey,
	serial,
	text,
	timestamp,
	varchar,
} from 'drizzle-orm/pg-core';
import { locale } from '../custom-types/locale';
import { userRole } from '../custom-types/user-role';
import { locales } from './i18n';

/**
 * Database schema for managing everything auth oriented and related to lucia and users' metadata.
 * Separated from the default schema for convenience's sake and for improved database portability /
 * separation of concerns.
 *
 * @see https://lucia-auth.com/guidebook/drizzle-orm
 * @see https://lucia-auth.com/database-adapters/postgres
 */
export const usersSchema = pgSchema('users');

/**
 * Base user roles. More granular control for RBAC on certain entities can be refined at said
 * entities' level (ex: projectsUsers.role, ...).
 */
export const userRoles = usersSchema.table('user_roles', {
	role: userRole('role').primaryKey(),
});

export const userRolesTranslations = usersSchema.table(
	'user_roles_t',
	{
		role: userRole('role').references(() => userRoles.role, {
			onDelete: 'cascade',
			onUpdate: 'cascade',
		}),
		locale: locale('locale').references(() => locales.locale, {
			onDelete: 'cascade',
			onUpdate: 'cascade',
		}),
		name: text('title'),
		description: text('description'),
	},
	(table) => {
		return { pk: primaryKey(table.role, table.locale) };
	}
);

export const userOccupations = usersSchema.table('user_occupations', {
	id: serial('id').primaryKey(),
});

export const userOccupationsTranslations = usersSchema.table(
	'user_occupations_t',
	{
		id: serial('id').references(() => userOccupations.id, {
			onDelete: 'cascade',
			onUpdate: 'cascade',
		}),
		locale: locale('locale').references(() => locales.locale, {
			onDelete: 'cascade',
			onUpdate: 'cascade',
		}),
		title: text('title'),
		description: text('description'),
	},
	(table) => {
		return { pk: primaryKey(table.id, table.locale) };
	}
);

/**
 * App's registered users with extended data.
 *
 * @see https://lucia-auth.com/basics/users
 */
export const users = usersSchema.table('users', {
	id: varchar('id', { length: 15 }).primaryKey(),
	createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
	updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
	role: userRole('role')
		.references(() => userRoles.role, {
			onDelete: 'set default',
			onUpdate: 'cascade',
		})
		.default(USERS_ROLES.VISITOR)
		.notNull(),
	email: text('email').unique(),
	publicEmail: text('email'),
	username: text('username').unique(),
	firstName: text('first_name'),
	middleName: text('middle_name'),
	lastName: text('last_name'),
});

export const usersOccupations = usersSchema.table('users_occupations', {
	userId: varchar('user_id').references(() => users.id, {
		onDelete: 'cascade',
		onUpdate: 'cascade',
	}),
	occupationId: serial('occupation_id').references(() => userOccupations.id, {
		onDelete: 'set null',
		onUpdate: 'cascade',
	}),
});

/**
 * Sessions to track auth-oriented user requests.
 *
 * @see https://lucia-auth.com/basics/sessions
 */
export const sessions = usersSchema.table('sessions', {
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
export const keys = usersSchema.table('keys', {
	id: varchar('id', { length: 255 }).primaryKey(),
	userId: varchar('user_id', { length: 15 })
		.notNull()
		.references(() => users.id),
	hashedPassword: varchar('hashed_password', { length: 255 }),
});
