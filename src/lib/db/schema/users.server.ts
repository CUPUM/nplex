import { ROLE_DEFAULT } from '$lib/auth/constants';
import { add } from 'drizzle-orm-helpers';
import { nanoid, now, toInterval } from 'drizzle-orm-helpers/pg';
import { boolean, pgSchema, primaryKey, text, timestamp, unique } from 'drizzle-orm/pg-core';
import { USER_EMAIL_VERIFICATION_CODE_LENGTH } from '../constants';
import { role } from '../custom-types.server';
import { CREATED_AT_COLUMN, LANG_COLUMN, UPDATED_AT_COLUMN } from '../helpers.server';
import { projects } from './public.server';

/**
 * Managing everything auth oriented and related to lucia, as well as additionnal users' accounts
 * metadata.
 *
 * @see https://lucia-auth.com/guidebook/drizzle-orm
 * @see https://lucia-auth.com/database-adapters/postgres
 */
export const usersSchema = pgSchema('users');

export const roles = usersSchema.table('roles', {
	role: role('role').primaryKey().notNull(),
});

export const users = usersSchema.table('users', {
	...CREATED_AT_COLUMN,
	...UPDATED_AT_COLUMN,
	id: text('id')
		.default(nanoid({ size: 15 }))
		.notNull()
		.primaryKey(),
	role: role('role')
		.references(() => roles.role, {
			onDelete: 'set default',
			onUpdate: 'cascade',
		})
		.default(ROLE_DEFAULT)
		.notNull(),
	hashedPassword: text('hashed_password'),
	legacyPassword: boolean('legacy_password'),
	email: text('email').unique(),
	emailVerified: boolean('email_verified').default(false).notNull(),
	publicEmail: text('public_email'),
	publicEmailVerified: boolean('public_email_verified').default(false).notNull(),
	firstName: text('first_name'),
	middleName: text('middle_name'),
	lastName: text('last_name'),
});

export const oauthUsers = usersSchema.table(
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

export const emailVerificationCodes = usersSchema.table('email_verification_codes', {
	userId: text('user_id')
		.references(() => users.id, {
			onDelete: 'cascade',
			onUpdate: 'cascade',
		})
		.primaryKey(),
	code: text('code')
		.default(
			nanoid({
				size: USER_EMAIL_VERIFICATION_CODE_LENGTH,
				alphabet: '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ',
			})
		)
		.notNull(),
	email: text('email').notNull(),
	expiresAt: timestamp('expires_at', { withTimezone: true, mode: 'date' })
		.notNull()
		.default(add(now(), toInterval({ hours: 1 })).inlineParams()),
});

export const passwordResetTokens = usersSchema.table('password_reset_tokens', {
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

export const sessions = usersSchema.table('sessions', {
	id: text('id').primaryKey(),
	userId: text('user_id')
		.references(() => users.id, { onDelete: 'cascade', onUpdate: 'cascade' })
		.notNull(),
	expiresAt: timestamp('expires_at', { withTimezone: true }).notNull(),
});

export const usersRolesRequests = usersSchema.table('users_roles_requests', {
	userId: text('user_id')
		.references(() => users.id, {
			onDelete: 'cascade',
			onUpdate: 'cascade',
		})
		.notNull(),
	requestedRole: role('requested_role').references(() => roles.role, {
		onDelete: 'cascade',
		onUpdate: 'cascade',
	}),
	requestAt: timestamp('requested_at', { withTimezone: true }).defaultNow(),
});

export const userOccupations = usersSchema.table('user_occupations', {
	id: text('id')
		.default(nanoid({ size: 6 }))
		.primaryKey(),
});

export const userOccupationsTranslations = usersSchema.table(
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

export const usersOccupations = usersSchema.table(
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

export const usersProjectsCollections = usersSchema.table(
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

export const usersProjectsCollectionsItems = usersSchema.table(
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

export const notificationTypes = usersSchema.table('notification_types', {
	id: text('id')
		.notNull()
		.default(nanoid({ size: 6 }))
		.primaryKey(),
});

export const notificationTypesTranslations = usersSchema.table('notification_types_t', {
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

export const usersNotifications = usersSchema.table('users_notifications', {
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
