import { USER_ROLE_DEFAULT } from '$lib/auth/constants';
import { add } from 'drizzle-orm-helpers';
import { nanoid, now, toInterval } from 'drizzle-orm-helpers/pg';
import {
	boolean,
	pgSchema,
	primaryKey,
	text,
	timestamp,
	unique,
	varchar,
} from 'drizzle-orm/pg-core';
import { CREATED_AT_COLUMN, LANG_COLUMN, UPDATED_AT_COLUMN } from '../columns';
import { userRole } from '../custom-types.server';
import { projects } from './public';

/**
 * Managing everything auth oriented and related to lucia and users' metadata.
 *
 * @see https://lucia-auth.com/guidebook/drizzle-orm
 * @see https://lucia-auth.com/database-adapters/postgres
 */
export const authSchema = pgSchema('auth');

export const userRoles = authSchema.table('user_roles', {
	role: userRole('role').primaryKey().notNull(),
});

export const users = authSchema.table('users', {
	...CREATED_AT_COLUMN,
	...UPDATED_AT_COLUMN,
	id: text('id')
		.default(nanoid({ size: 15 }))
		.notNull()
		.primaryKey(),
	role: userRole('role')
		.references(() => userRoles.role, {
			onDelete: 'set default',
			onUpdate: 'cascade',
		})
		.default(USER_ROLE_DEFAULT)
		.notNull(),
	hashedPassword: varchar('hashed_password', { length: 255 }),
	legacyPassword: boolean('legacy_password'),
	email: text('email').unique(),
	emailVerified: boolean('email_verified').default(false).notNull(),
	publicEmail: text('public_email'),
	publicEmailVerified: boolean('public_email_verified').default(false).notNull(),
	firstName: text('first_name'),
	middleName: text('middle_name'),
	lastName: text('last_name'),
});

export const oauthUsers = authSchema.table(
	'oauth_users',
	{
		userId: text('user_id')
			.references(() => users.id, {
				onDelete: 'cascade',
				onUpdate: 'cascade',
			})
			.notNull(),
		provider: text('provider').notNull(),
		providerUserId: text('provider_user_id').notNull(),
	},
	(table) => {
		return {
			pk: primaryKey({ columns: [table.provider, table.providerUserId] }),
		};
	}
);

export const emailVerificationCodes = authSchema.table('email_verification_codes', {
	userId: text('user_id')
		.references(() => users.id, {
			onDelete: 'cascade',
			onUpdate: 'cascade',
		})
		.primaryKey(),
	code: text('code')
		.default(
			nanoid({
				size: 8,
				alphabet: '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ',
			})
		)
		.notNull(),
	email: text('email').notNull(),
	expiresAt: timestamp('expires_at', { withTimezone: true, mode: 'date' })
		.notNull()
		.default(add(now(), toInterval({ hours: 1 })).inlineParams()),
});

export const passwordResetTokens = authSchema.table('password_reset_tokens', {
	userId: text('user_id')
		.references(() => users.id, { onDelete: 'cascade', onUpdate: 'cascade' })
		.primaryKey(),
	token: text('token')
		.notNull()
		.default(
			nanoid({
				size: 16,
				alphabet:
					'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789^çàèé.,ÉÀÈÙù!@#$%?&*()_+',
			})
		),
	expiresAt: timestamp('expires_at', { withTimezone: true })
		.notNull()
		.default(add(now(), toInterval({ hours: 1 })).inlineParams()),
});

export const sessions = authSchema.table('sessions', {
	id: text('id').primaryKey(),
	userId: text('user_id')
		.references(() => users.id, { onDelete: 'cascade', onUpdate: 'cascade' })
		.notNull(),
	expiresAt: timestamp('expires_at', { withTimezone: true }).notNull(),
});

export const usersRolesRequests = authSchema.table('users_roles_requests', {
	userId: text('user_id')
		.references(() => users.id, {
			onDelete: 'cascade',
			onUpdate: 'cascade',
		})
		.notNull(),
	requestedRole: userRole('requested_role').references(() => userRoles.role, {
		onDelete: 'cascade',
		onUpdate: 'cascade',
	}),
	requestAt: timestamp('requested_at', { withTimezone: true }).defaultNow(),
});

export const userOccupations = authSchema.table('user_occupations', {
	id: text('id')
		.default(nanoid({ size: 6 }))
		.primaryKey(),
});

export const userOccupationsTranslations = authSchema.table(
	'user_occupations_t',
	{
		...LANG_COLUMN,
		id: text('id')
			.references(() => userOccupations.id, {
				onDelete: 'cascade',
				onUpdate: 'cascade',
			})
			.notNull(),
		title: text('title'),
		description: text('description'),
	},
	(table) => {
		return { pk: primaryKey({ columns: [table.id, table.lang] }) };
	}
);

export const usersOccupations = authSchema.table(
	'users_occupations',
	{
		userId: text('user_id')
			.references(() => users.id, {
				onDelete: 'cascade',
				onUpdate: 'cascade',
			})
			.notNull(),
		occupationId: text('occupation_id')
			.references(() => userOccupations.id, {
				onDelete: 'cascade',
				onUpdate: 'cascade',
			})
			.notNull(),
	},
	(table) => {
		return {
			pk: primaryKey({ columns: [table.occupationId, table.userId] }),
		};
	}
);

export const usersProjectsCollections = authSchema.table(
	'users_projects_collections',
	{
		id: text('id').default(nanoid()).primaryKey().notNull(),
		userId: text('user_id')
			.references(() => users.id, {
				onDelete: 'cascade',
				onUpdate: 'cascade',
			})
			.notNull(),
		title: text('title').notNull(),
		description: text('description'),
	},
	(table) => {
		return {
			unq: unique().on(table.title, table.userId),
		};
	}
);

export const usersProjectsCollectionsItems = authSchema.table(
	'users_collections_items',
	{
		collectionId: text('collection_id')
			.references(() => usersProjectsCollections.id, {
				onDelete: 'cascade',
				onUpdate: 'cascade',
			})
			.notNull(),
		projectId: text('project_id')
			.references(() => projects.id, {
				onDelete: 'cascade',
				onUpdate: 'cascade',
			})
			.notNull(),
		note: text('note'),
	},
	(table) => {
		return {
			pk: primaryKey({ columns: [table.collectionId, table.projectId] }),
		};
	}
);

export const notificationTypes = authSchema.table('notification_types', {
	id: text('id')
		.notNull()
		.default(nanoid({ size: 6 }))
		.primaryKey(),
});

export const notificationTypesTranslations = authSchema.table('notification_types_t', {
	...LANG_COLUMN,
	id: text('id')
		.references(() => notificationTypes.id, {
			onDelete: 'cascade',
			onUpdate: 'cascade',
		})
		.notNull(),
	title: text('title'),
	body: text('body'),
});

export const usersNotifications = authSchema.table('users_notifications', {
	id: text('id').default(nanoid()).notNull().primaryKey(),
	typeId: text('type_id')
		.references(() => notificationTypes.id, {
			onDelete: 'cascade',
			onUpdate: 'cascade',
		})
		.notNull(),
	userId: text('user_id')
		.notNull()
		.references(() => users.id, {
			onDelete: 'cascade',
			onUpdate: 'cascade',
		}),
	readAt: timestamp('read_at', { withTimezone: true }),
	sentById: text('sent_by_id')
		.notNull()
		.references(() => users.id, {
			onDelete: 'cascade',
			onUpdate: 'cascade',
		}),
	sentAt: timestamp('sent_at', { withTimezone: true }).defaultNow(),
});
