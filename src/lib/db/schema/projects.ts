import { USER_ROLES } from '$lib/auth/constants';
import {
	integer,
	pgTable,
	pgView,
	primaryKey,
	text,
	timestamp,
	unique,
	uuid,
} from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod';
import { intrange } from '../custom-types/range';
import { userRole } from '../custom-types/user-role';
import { localefk } from '../helpers/i18n';
import { useridfk } from '../helpers/user-id';
import { userRoles } from './auth';
import { organizations } from './organizations';
import {
	projectExemplarityIndicators,
	projectImageTemporalities,
	projectImageTypes,
	projectImplantationTypes,
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
	createdById: useridfk('created_by_id', { onDelete: 'restrict', onUpdate: 'cascade' }).notNull(),
	updatedById: useridfk('updated_by_id', { onDelete: 'set null', onUpdate: 'cascade' }),
	publishedAt: timestamp('published_at', { withTimezone: true }),
	likesCount: integer('likes_count').notNull().default(0),
	typeId: integer('type_id').references(() => projectTypes.id, {
		onDelete: 'set null',
		onUpdate: 'cascade',
	}),
	siteOwnershipId: integer('site_ownership_id').references(() => projectSiteOwnerships.id, {
		onDelete: 'set null',
		onUpdate: 'cascade',
	}),
	implantationTypeId: integer('implantation_type_id').references(
		() => projectImplantationTypes.id,
		{
			onDelete: 'set null',
			onUpdate: 'cascade',
		}
	),
	adjacentStreets: integer('adjacent_streets'),
	adjacentAlleys: integer('adjacent_alleys'),
	costRange: intrange('cost_range'),
	// location: postgis(),
});

export const insertProjectSchema = createInsertSchema(projects);

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
		locale: localefk(),
		title: text('title').notNull(),
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

export const insertProjectsTranslationsSchema = createInsertSchema(projectsTranslations);

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
		interventionTypeId: integer('intervention_type_id').references(
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

export const projectsExemplarityIndicators = pgTable(
	'projects_exemplarity_indicators',
	{
		projectId: uuid('project_id').references(() => projects.id, {
			onDelete: 'cascade',
			onUpdate: 'cascade',
		}),
		exemplarityIndicatorId: integer('exemplarity_indicator_id').references(
			() => projectExemplarityIndicators.id,
			{ onDelete: 'cascade', onUpdate: 'cascade' }
		),
	},
	(table) => {
		return {
			fk: primaryKey(table.projectId, table.exemplarityIndicatorId),
		};
	}
);

export const projectsImages = pgTable(
	'projects_images',
	{
		id: uuid('id').defaultRandom().primaryKey(),
		projectId: uuid('project_id').references(() => projects.id, {
			onDelete: 'cascade',
			onUpdate: 'cascade',
		}),
		createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
		updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
		createdById: useridfk('created_by_id', { onDelete: 'restrict', onUpdate: 'cascade' }).notNull(),
		updatedById: useridfk('updated_by_id', { onDelete: 'restrict', onUpdate: 'cascade' }),
		index: integer('index').notNull(),
		publicUrl: text('public_url').notNull(),
		storageName: text('storage_name').notNull(),
		typeId: integer('type_id').references(() => projectImageTypes.id, {
			onDelete: 'set null',
			onUpdate: 'cascade',
		}),
		temporalityId: integer('temporality_id').references(() => projectImageTemporalities.id, {
			onDelete: 'set null',
			onUpdate: 'cascade',
		}),
	},
	(table) => {
		return {
			unq: unique().on(table.projectId, table.index),
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
		locale: localefk(),
		description: text('description'),
	},
	(table) => {
		return {
			pk: primaryKey(table.id, table.locale),
		};
	}
);

export const projectsImagesCredits = pgTable('projects_images_credits', {
	imageId: uuid('image_id'),
});

/**
 * Keeping track of publication requests.
 */
export const projectsPublicationRequests = pgTable('projects_publication_requests', {
	projectId: uuid('project_id')
		.references(() => projects.id, { onDelete: 'cascade', onUpdate: 'cascade' })
		.primaryKey(),
	requestedAt: timestamp('requested_at', { withTimezone: true }).defaultNow().notNull(),
	requestedById: useridfk('requested_by_id').notNull(),
});

/**
 * Sharing projects access to non-creator users.
 */
export const projectsUsers = pgTable(
	'projects_users',
	{
		userId: useridfk('user_id'),
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
		userId: useridfk('user_id'),
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
