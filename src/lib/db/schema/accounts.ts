import { USER_ROLES } from '$lib/auth/constants';
import type { InferSelectModel } from 'drizzle-orm';
import {
	bigint,
	boolean,
	integer,
	pgSchema,
	primaryKey,
	text,
	timestamp,
	unique,
	varchar,
} from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod';
import { generateUserId, userId, userIdForeignKey } from '../references/accounts';
import { generateNanoid } from '../sql';
import { identity, locale, nanoid, userRole } from './custom-types';
import { locales } from './i18n';
import { projects } from './public';

/**
 * Managing everything auth oriented and related to lucia and users' metadata.
 *
 * @see https://lucia-auth.com/guidebook/drizzle-orm
 * @see https://lucia-auth.com/database-adapters/postgres
 */

export const accountsSchema = pgSchema('accounts');

/**
 * Base user roles. More granular control for RBAC on certain entities can be refined at said
 * entities' level (ex: projectsUsers.role, ...).
 */
export const userRoles = accountsSchema.table('user_roles', {
	role: userRole('role').primaryKey(),
});

/**
 * @see {@link userRoles}
 */
export const userRolesTranslations = accountsSchema.table(
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
		name: text('title').notNull(),
		description: text('description'),
	},
	(table) => {
		return {
			pk: primaryKey(table.role, table.locale),
			unq: unique().on(table.locale, table.name),
		};
	}
);

/**
 * App's registered users with extended data.
 *
 * @see https://lucia-auth.com/basics/users
 */
export const users = accountsSchema.table('users', {
	id: userId('id').default(generateUserId()).primaryKey(),
	createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
	updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
	role: userRole('role')
		.references(() => userRoles.role, {
			onDelete: 'set default',
			onUpdate: 'cascade',
		})
		.default(USER_ROLES.VISITOR)
		.notNull(),
	email: text('email').unique(),
	emailVerified: boolean('email_verified').default(false).notNull(),
	publicEmail: text('public_email'),
	publicEmailVerified: boolean('public_email_verified').default(false).notNull(),
	githubUsername: text('github_username').unique(),
	firstName: text('first_name'),
	middleName: text('middle_name'),
	lastName: text('last_name'),
});

export type SelectUser = InferSelectModel<typeof users>;

export const usersInsertSchema = createInsertSchema(users, {
	email: (s) => s.email.email(),
	publicEmail: (s) => s.publicEmail.email(),
});

/**
 * Tracking email confirmations and their expiry.
 *
 * @see https://lucia-auth.com/guidebook/email-verification-links
 */
export const emailVerificationTokens = accountsSchema.table('email_verification_tokens', {
	id: text('id').notNull().unique(),
	expires: bigint('expires', { mode: 'bigint' }).primaryKey(),
	userId: userIdForeignKey('user_id').notNull(),
});

export type SelectEmailVerificationToken = InferSelectModel<typeof emailVerificationTokens>;

/**
 * @see https://lucia-auth.com/guidebook/password-reset-link/sveltekit
 */
export const passwordResetTokens = accountsSchema.table('password_reset_tokens', {
	id: text('id').notNull().unique(),
	expires: bigint('expires', { mode: 'bigint' }).primaryKey(),
	userId: userIdForeignKey('user_id').notNull(),
});

/**
 * Sessions to track auth-oriented user requests.
 *
 * @see https://lucia-auth.com/basics/sessions
 */
export const sessions = accountsSchema.table('auth_sessions', {
	id: varchar('id', { length: 128 }).primaryKey(),
	userId: userIdForeignKey('user_id').notNull(),
	activeExpires: bigint('active_expires', { mode: 'number' }).notNull(),
	idleExpires: bigint('idle_expires', { mode: 'number' }).notNull(),
});

/**
 * Universal relationship between a user and a reference to that user.
 *
 * @see https://lucia-auth.com/basics/keys
 */
export const keys = accountsSchema.table('auth_keys', {
	id: varchar('id', { length: 255 }).primaryKey(),
	userId: userIdForeignKey('user_id').notNull(),
	hashedPassword: varchar('hashed_password', { length: 255 }),
});

export const usersRolesRequests = accountsSchema.table('users_roles_requests', {
	userId: userIdForeignKey('user_id').primaryKey(),
	requestedRole: userRole('requested_role').references(() => userRoles.role, {
		onDelete: 'cascade',
		onUpdate: 'cascade',
	}),
	requestAt: timestamp('requested_at', { withTimezone: true }).defaultNow(),
});

/**
 * Occupations or professions of registered users.
 */
export const userOccupations = accountsSchema.table('user_occupations', {
	id: identity('id').primaryKey(),
});

/**
 * @see {@link userOccupations}
 */
export const userOccupationsTranslations = accountsSchema.table(
	'user_occupations_t',
	{
		id: integer('id').references(() => userOccupations.id, {
			onDelete: 'cascade',
			onUpdate: 'cascade',
		}),
		locale: locale('locale').references(() => locales.locale, {
			onDelete: 'cascade',
			onUpdate: 'cascade',
		}),
		title: text('title').notNull(),
		description: text('description'),
	},
	(table) => {
		return { pk: primaryKey(table.id, table.locale) };
	}
);

export const usersOccupations = accountsSchema.table(
	'users_occupations',
	{
		userId: userIdForeignKey('user_id'),
		occupationId: integer('occupation_id').references(() => userOccupations.id, {
			onDelete: 'cascade',
			onUpdate: 'cascade',
		}),
	},
	(table) => {
		return {
			pk: primaryKey(table.occupationId, table.userId),
		};
	}
);

export const usersProjectsCollections = accountsSchema.table(
	'users_projects_collections',
	{
		id: nanoid('id').default(generateNanoid()).primaryKey(),
		userId: userIdForeignKey('user_id').notNull(),
		title: text('title').notNull(),
		description: text('description'),
	},
	(table) => {
		return {
			unq: unique().on(table.title, table.userId),
		};
	}
);

export const usersProjectsCollectionsItems = accountsSchema.table(
	'users_collections_items',
	{
		collectionId: nanoid('collection_id').references(() => usersProjectsCollections.id, {
			onDelete: 'cascade',
			onUpdate: 'cascade',
		}),
		projectId: nanoid('project_id').references(() => projects.id, {
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
