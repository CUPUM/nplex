import { USER_ROLES } from '$lib/auth/constants';
import {
	integer,
	pgTable,
	pgView,
	primaryKey,
	serial,
	text,
	timestamp,
	unique,
	uuid,
	varchar,
} from 'drizzle-orm/pg-core';
import { locale } from '../custom-types/locale';
import { userRole } from '../custom-types/user-role';
import { userRoles, users } from './auth';
import { locales } from './i18n';
import { organizations } from './organizations';
import {
	projectInterventionTypes,
	projectSiteOwnerships,
	projectTypes,
} from './project-descriptors';

/**
 * Core projects table.
 */
export const projects = pgTable('projects', {
	id: uuid('id').defaultRandom().primaryKey(),
	createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
	updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
	createdById: varchar('created_by_id')
		.references(() => users.id, { onDelete: 'restrict', onUpdate: 'cascade' })
		.notNull(),
	updatedById: varchar('updated_by_id')
		.references(() => users.id, { onDelete: 'restrict', onUpdate: 'cascade' })
		.notNull(),
	typeId: serial('type_id').references(() => projectTypes.id, {
		onDelete: 'set null',
		onUpdate: 'cascade',
	}),
	publishedAt: timestamp('published_at', { withTimezone: true }),
	likesCount: integer('likes_count').notNull().default(0),
	siteOwnershipId: serial('site_ownership_id').references(() => projectSiteOwnerships.id, {
		onDelete: 'set null',
		onUpdate: 'cascade',
	}),
	// costRange: integer(),
	// location: postgis(),
});

/**
 * @see {@link projects}
 */
export const projectsTranslations = pgTable(
	'projects_t',
	{
		id: uuid('id').references(() => projects.id, {
			onDelete: 'cascade',
			onUpdate: 'cascade',
		}),
		locale: locale('locale').references(() => locales.locale, {
			onDelete: 'cascade',
			onUpdate: 'cascade',
		}),
		title: text('title'),
		summary: text('summary'),
		description: text('description'),
	},
	(table) => {
		return {
			pk: primaryKey(table.id, table.locale),
			unq: unique().on(table.locale, table.title),
		};
	}
);

/**
 * Always use this location for public viewing.
 */
export const projectsObfuscatedLocations = pgView('projects_obfuscated_locations', {
	projectId: uuid('project_id')
		.references(() => projects.id, { onDelete: 'cascade', onUpdate: 'cascade' })
		.primaryKey(),
	// point: postgis...
});

export const projectsInterventions = pgTable(
	'projects_interventions',
	{
		projectId: uuid('project_id').references(() => projects.id, {
			onDelete: 'cascade',
			onUpdate: 'cascade',
		}),
		interventionTypeId: serial('intervention_type_id').references(
			() => projectInterventionTypes.id,
			{ onDelete: 'cascade', onUpdate: 'cascade' }
		),
	},
	(table) => {
		return {
			pk: primaryKey(table.projectId, table.interventionTypeId),
		};
	}
);

export const projectsImages = pgTable(
	'projects_images',
	{
		id: uuid('id').defaultRandom(),
		projectId: uuid('project_id').references(() => projects.id, {
			onDelete: 'cascade',
			onUpdate: 'cascade',
		}),
		createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
		updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
		createdById: uuid('created_by_id')
			.references(() => users.id, { onDelete: 'restrict', onUpdate: 'cascade' })
			.notNull(),
		updatedById: uuid('updated_by_id')
			.references(() => users.id, { onDelete: 'restrict', onUpdate: 'cascade' })
			.notNull(),
	},
	(table) => {
		return {
			pk: primaryKey(table.id, table.projectId),
		};
	}
);

export const projectsImagesTranslations = pgTable(
	'projects_images_t',
	{
		id: uuid('id').references(() => projectsImages.id, {
			onDelete: 'cascade',
			onUpdate: 'cascade',
		}),
		locale: locale('locale').references(() => locales.locale, {
			onDelete: 'cascade',
			onUpdate: 'cascade',
		}),
	},
	(table) => {
		return {
			pk: primaryKey(table.id, table.locale),
		};
	}
);

// export const projectsImagesCredits = pgTable();

// export const projectsImagesCredits = pgTable();

// export const projectsRandomImages = pgView('projects_random_images');

/**
 * Keeping track of publication requests.
 */
export const projectsPublicationRequests = pgTable('projects_publication_requests', {
	projectId: uuid('project_id')
		.references(() => projects.id, { onDelete: 'cascade', onUpdate: 'cascade' })
		.primaryKey(),
	requestedAt: timestamp('requested_at', { withTimezone: true }).defaultNow().notNull(),
	requestedBy: uuid('requested_by').references(() => users.id, {
		onDelete: 'cascade',
		onUpdate: 'cascade',
	}),
});

/**
 * Sharing projects access to non-creator users.
 */
export const projectsUsers = pgTable(
	'projects_users',
	{
		userId: varchar('user_id').references(() => users.id, {
			onDelete: 'cascade',
			onUpdate: 'cascade',
		}),
		projectId: uuid('project_id').references(() => projects.id, {
			onDelete: 'cascade',
			onUpdate: 'cascade',
		}),
		role: userRole('role')
			.references(() => userRoles.role, {
				onDelete: 'set default',
				onUpdate: 'cascade',
			})
			.default(USER_ROLES.VISITOR),
	},
	(table) => {
		return {
			pk: primaryKey(table.projectId, table.userId),
		};
	}
);

/**
 * Organizations credited as partakers in projects.
 */
export const projectsOrganizations = pgTable(
	'projects_organizations',
	{
		projectId: uuid('project_id').references(() => projects.id, {
			onDelete: 'cascade',
			onUpdate: 'cascade',
		}),
		organizationId: uuid('organization_id').references(() => organizations.id, {
			onDelete: 'cascade',
			onUpdate: 'cascade',
		}),
	},
	(table) => {
		return {
			pk: primaryKey(table.organizationId, table.projectId),
		};
	}
);

/**
 * Global tally of projects likes.
 */
export const projectsLikes = pgTable(
	'projects_likes',
	{
		userId: varchar('user_id').references(() => users.id, {
			onDelete: 'cascade',
			onUpdate: 'cascade',
		}),
		projectId: uuid('project_id').references(() => projects.id, {
			onDelete: 'cascade',
			onUpdate: 'cascade',
		}),
	},
	(table) => {
		return {
			pk: primaryKey(table.projectId, table.userId),
		};
	}
);
