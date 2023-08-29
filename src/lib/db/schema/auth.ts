import { USER_ROLES } from '$lib/auth/constants';
import type { InferSelectModel } from 'drizzle-orm';
import {
	bigint,
	boolean,
	pgSchema,
	primaryKey,
	serial,
	text,
	timestamp,
	uuid,
	varchar,
} from 'drizzle-orm/pg-core';
import { locale } from '../custom-types/locale';
import { userRole } from '../custom-types/user-role';
import { locales } from './i18n';
import { projects } from './projects';

/**
 * Managing everything auth oriented and related to lucia and users' metadata.
 *
 * @see https://lucia-auth.com/guidebook/drizzle-orm
 * @see https://lucia-auth.com/database-adapters/postgres
 */

export const authSchema = pgSchema('auth');

/**
 * Base user roles. More granular control for RBAC on certain entities can be refined at said
 * entities' level (ex: projectsUsers.role, ...).
 */
export const userRoles = authSchema.table('user_roles', {
	role: userRole('role').primaryKey(),
});

/**
 * @see {@link userRoles}
 */
export const userRolesTranslations = authSchema.table(
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

/**
 * App's registered users with extended data.
 *
 * @see https://lucia-auth.com/basics/users
 */
export const users = authSchema.table('users', {
	id: varchar('id', { length: 15 }).primaryKey(),
	createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
	updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
	role: userRole('role')
		.references(() => userRoles.role, {
			onDelete: 'set default',
			onUpdate: 'cascade',
		})
		.default(USER_ROLES.VISITOR)
		.notNull(),
	email: text('email').unique().notNull(),
	emailVerified: boolean('email_verified').default(false).notNull(),
	publicEmail: text('public_email'),
	publicEmailVerified: boolean('public_email_verified').default(false).notNull(),
	firstName: text('first_name'),
	middleName: text('middle_name'),
	lastName: text('last_name'),
});

export type SelectUser = InferSelectModel<typeof users>;

/**
 * Tracking email confirmations and their expiry.
 *
 * @see https://lucia-auth.com/guidebook/email-verification-links
 */
export const emailVerificationTokens = authSchema.table('email_verification_tokens', {
	id: text('id').notNull().unique(),
	expires: bigint('expires', { mode: 'bigint' }).primaryKey(),
	userId: varchar('user_id')
		.references(() => users.id, {
			onDelete: 'cascade',
			onUpdate: 'cascade',
		})
		.notNull(),
});

export type SelectEmailVerificationToken = InferSelectModel<typeof emailVerificationTokens>;

/**
 * Sessions to track auth-oriented user requests.
 *
 * @see https://lucia-auth.com/basics/sessions
 */
export const sessions = authSchema.table('auth_sessions', {
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
export const keys = authSchema.table('auth_keys', {
	id: varchar('id', { length: 255 }).primaryKey(),
	userId: varchar('user_id', { length: 15 })
		.notNull()
		.references(() => users.id),
	hashedPassword: varchar('hashed_password', { length: 255 }),
});

export const usersRolesRequests = authSchema.table('users_roles_requests', {
	userId: uuid('user_id')
		.references(() => users.id, { onDelete: 'cascade', onUpdate: 'cascade' })
		.primaryKey(),
	requestedRole: userRole('requested_role').references(() => userRoles.role, {
		onDelete: 'cascade',
		onUpdate: 'cascade',
	}),
	requestAt: timestamp('requested_at', { withTimezone: true }).defaultNow(),
});

/**
 * Occupations or professions of registered users.
 */
export const userOccupations = authSchema.table('user_occupations', {
	id: serial('id').primaryKey(),
});

/**
 * @see {@link userOccupations}
 */
export const userOccupationsTranslations = authSchema.table(
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

export const usersOccupations = authSchema.table(
	'users_occupations',
	{
		userId: varchar('user_id')
			.references(() => users.id, {
				onDelete: 'cascade',
				onUpdate: 'cascade',
			})
			.notNull(),
		occupationId: serial('occupation_id')
			.references(() => userOccupations.id, {
				onDelete: 'cascade',
				onUpdate: 'cascade',
			})
			.notNull(),
	},
	(table) => {
		return {
			pk: primaryKey(table.occupationId, table.userId),
		};
	}
);

export const usersProjectsCollections = authSchema.table('users_collections', {
	id: uuid('id').defaultRandom().primaryKey(),
	title: text('title').notNull(),
	description: text('description'),
});

export const usersProjectsCollectionsItems = authSchema.table(
	'users_collections_items',
	{
		collectionId: uuid('collection_id').references(() => usersProjectsCollections.id, {
			onDelete: 'cascade',
			onUpdate: 'cascade',
		}),
		projectId: uuid('project_id').references(() => projects.id, {
			onDelete: 'cascade',
			onUpdate: 'cascade',
		}),
		note: text('note'),
	},
	(table) => {
		return {
			pk: primaryKey(table.collectionId, table.projectId),
		};
	}
);
