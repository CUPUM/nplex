import { USER_ROLES } from '$lib/auth/constants';
import {
	boolean,
	integer,
	pgTable,
	pgView,
	primaryKey,
	text,
	timestamp,
	unique,
} from 'drizzle-orm/pg-core';
import { userIdForeignKey } from '../references/accounts';
import { localeForeignKey } from '../references/i18n';
import { generateNanoid } from '../sql';
import { userRoles } from './accounts';
import { intrange, nanoid, userRole } from './custom-types';

/**
 * Top-most categories of projects.
 */
export const projectTypes = pgTable('project_types', {
	id: text('id')
		.notNull()
		.default(generateNanoid({ length: 6 }))
		.primaryKey(),
	index: integer('index').unique(),
});

/**
 * @see {@link projectTypes}
 */
export const projectTypesTranslations = pgTable(
	'project_types_t',
	{
		id: text('id')
			.references(() => projectTypes.id, {
				onDelete: 'cascade',
				onUpdate: 'cascade',
			})
			.notNull(),
		locale: localeForeignKey('locale').notNull(),
		title: text('title').notNull(),
		description: text('description'),
	},
	(table) => {
		return {
			pk: primaryKey(table.id, table.locale),
		};
	}
);

/**
 * Grouping of project intervention types.
 */
export const projectInterventionCategories = pgTable('project_intervention_categories', {
	id: text('id')
		.default(generateNanoid({ length: 6 }))
		.primaryKey(),
	index: integer('index').unique(),
});

/**
 * @see {@link projectInterventionCategories}
 */
export const projectInterventionCategoriesTranslations = pgTable(
	'project_intervention_categories_t',
	{
		id: text('id').references(() => projectInterventionCategories.id, {
			onDelete: 'cascade',
			onUpdate: 'cascade',
		}),
		locale: localeForeignKey('locale'),
		title: text('title').notNull(),
		description: text('description'),
	},
	(table) => {
		return {
			pk: primaryKey(table.id, table.locale),
		};
	}
);

/**
 * Sub classification of projects by their intervention(s)
 */
export const projectInterventions = pgTable('project_interventions', {
	id: text('id')
		.default(generateNanoid({ length: 6 }))
		.primaryKey(),
	categoryId: text('category_id')
		.references(() => projectInterventionCategories.id, {
			onDelete: 'cascade',
			onUpdate: 'cascade',
		})
		.notNull(),
	maybePermit: boolean('maybe_permit'),
});

/**
 * @see {@link projectInterventionTypes}
 */
export const projectInterventionsTranslations = pgTable(
	'project_interventions_t',
	{
		id: text('id').references(() => projectInterventions.id, {
			onDelete: 'cascade',
			onUpdate: 'cascade',
		}),
		locale: localeForeignKey('locale'),
		title: text('title').notNull(),
		description: text('description'),
	},
	(table) => {
		return {
			pk: primaryKey(table.id, table.locale),
		};
	}
);

/**
 * Restricting intervention types based on project types.
 *
 * @see {@link projectTypes}
 * @see {@link projectInterventions}
 */
export const projectTypesToInterventions = pgTable(
	'project_types_to_intervention',
	{
		typeId: text('type_id').references(() => projectTypes.id, {
			onDelete: 'cascade',
			onUpdate: 'cascade',
		}),
		interventionId: text('intervention_id').references(() => projectInterventions.id, {
			onDelete: 'cascade',
			onUpdate: 'cascade',
		}),
	},
	(table) => {
		return {
			pk: primaryKey(table.typeId, table.interventionId),
		};
	}
);

/**
 * The type of owner for the site where the projet is situated.
 */
export const projectSiteOwnerships = pgTable('project_site_ownerships', {
	id: text('id')
		.default(generateNanoid({ length: 6 }))
		.primaryKey(),
	index: integer('index').unique(),
});

/**
 * @see {@link projectSiteOwnerships}
 */
export const projectSiteOwnershipsTranslations = pgTable(
	'project_site_ownerships_t',
	{
		id: text('id').references(() => projectSiteOwnerships.id, {
			onDelete: 'cascade',
			onUpdate: 'cascade',
		}),
		locale: localeForeignKey('locale'),
		title: text('title').notNull(),
		description: text('description'),
	},
	(table) => {
		return {
			pk: primaryKey(table.id, table.locale),
		};
	}
);

/**
 * How is the project's building integrated amongst the surrounding constructions.
 */
export const projectImplantationTypes = pgTable('project_implantation_types', {
	id: text('id')
		.default(generateNanoid({ length: 6 }))
		.primaryKey(),
	index: integer('index').unique(),
});

/**
 * @see {@link projectImplantationTypes}
 */
export const projectImplantationTypesTranslations = pgTable(
	'project_implantation_types_t',
	{
		id: text('id').references(() => projectImplantationTypes.id, {
			onDelete: 'cascade',
			onUpdate: 'cascade',
		}),
		locale: localeForeignKey('locale'),
		title: text('title').notNull(),
		description: text('description'),
	},
	(table) => {
		return {
			pk: primaryKey(table.id, table.locale),
		};
	}
);

/**
 * Groupings of exemplarity indicators. Inspired by the City of Montreal's Design Agenda 2030.
 */
export const projectExemplarityCategories = pgTable('project_exemplarity_categories', {
	id: text('id')
		.default(generateNanoid({ length: 6 }))
		.primaryKey(),
	index: integer('index').unique(),
});

/**
 * @see {@link projectExemplarityCategories}
 */
export const projectExemplarityCategoriesTranslations = pgTable(
	'project_exemplarity_categories_t',
	{
		id: text('id').references(() => projectExemplarityCategories.id, {
			onDelete: 'cascade',
			onUpdate: 'cascade',
		}),
		locale: localeForeignKey('locale'),
		title: text('title').notNull(),
		description: text('description'),
	},
	(table) => {
		return {
			pk: primaryKey(table.id, table.locale),
		};
	}
);

export const projectExemplarityIndicators = pgTable('project_exemplarity_indicators', {
	id: text('id')
		.default(generateNanoid({ length: 6 }))
		.primaryKey(),
	categoryId: text('category_id')
		.references(() => projectExemplarityCategories.id, {
			onDelete: 'cascade',
			onUpdate: 'cascade',
		})
		.notNull(),
});

export const projectExemplarityIndicatorsTranslations = pgTable(
	'project_exemplarity_indicators_t',
	{
		id: text('id').references(() => projectExemplarityIndicators.id, {
			onDelete: 'cascade',
			onUpdate: 'cascade',
		}),
		locale: localeForeignKey('locale'),
		title: text('title').notNull(),
		shortTitle: text('short_title').notNull(),
		description: text('description'),
	},
	(table) => {
		return {
			pk: primaryKey(table.id, table.locale),
		};
	}
);

/**
 * Various types of items that can be added to project galleries.
 */
export const projectImageTypes = pgTable('project_image_types', {
	id: text('id')
		.default(generateNanoid({ length: 6 }))
		.primaryKey(),
});

/**
 * @see {@link projectImageTypes}
 */
export const projectImageTypesTranslations = pgTable(
	'project_image_types_t',
	{
		id: text('id').references(() => projectImageTypes.id, {
			onDelete: 'cascade',
			onUpdate: 'cascade',
		}),
		locale: localeForeignKey('locale'),
		title: text('title').notNull(),
		description: text('description'),
	},
	(table) => {
		return {
			pk: primaryKey(table.id, table.locale),
		};
	}
);

//
// Projects
//

/**
 * Core projects table.
 */
export const projects = pgTable('projects', {
	id: nanoid('id').default(generateNanoid()).primaryKey(),
	createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
	updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
	createdById: userIdForeignKey('created_by_id', {
		onDelete: 'restrict',
		onUpdate: 'cascade',
	}).notNull(),
	updatedById: userIdForeignKey('updated_by_id', { onDelete: 'set null', onUpdate: 'cascade' }),
	publishedAt: timestamp('published_at', { withTimezone: true }),
	typeId: text('type_id').references(() => projectTypes.id, {
		onDelete: 'set null',
		onUpdate: 'cascade',
	}),
	siteOwnershipId: text('site_ownership_id').references(() => projectSiteOwnerships.id, {
		onDelete: 'set null',
		onUpdate: 'cascade',
	}),
	implantationTypeId: text('implantation_type_id').references(() => projectImplantationTypes.id, {
		onDelete: 'set null',
		onUpdate: 'cascade',
	}),
	adjacentStreets: integer('adjacent_streets'),
	adjacentAlleys: integer('adjacent_alleys'),
	costRange: intrange('cost_range'),
	// location: postgis(),
	// obfuscatedLocation: postgist(),
	// likesCount: integer('likes_count').notNull().default(0),
});

/**
 * @see {@link projects}
 */
export const projectsTranslations = pgTable(
	'projects_t',
	{
		id: nanoid('id').references(() => projects.id, {
			onDelete: 'cascade',
			onUpdate: 'cascade',
		}),
		locale: localeForeignKey('locale'),
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

/**
 * Always use this location for public viewing.
 *
 * @see {@link projects}
 */
export const projectsObfuscatedLocations = pgView('projects_obfuscated_locations', {
	projectId: nanoid('project_id')
		.references(() => projects.id, { onDelete: 'cascade', onUpdate: 'cascade' })
		.primaryKey(),
	// point: postgis...
});

export const projectsInterventions = pgTable(
	'projects_interventions',
	{
		projectId: nanoid('project_id').references(() => projects.id, {
			onDelete: 'cascade',
			onUpdate: 'cascade',
		}),
		interventionId: text('intervention_id').references(() => projectInterventions.id, {
			onDelete: 'cascade',
			onUpdate: 'cascade',
		}),
	},
	(table) => {
		return {
			pk: primaryKey(table.projectId, table.interventionId),
		};
	}
);

export const projectsExemplarityIndicators = pgTable(
	'projects_exemplarity_indicators',
	{
		projectId: nanoid('project_id').references(() => projects.id, {
			onDelete: 'cascade',
			onUpdate: 'cascade',
		}),
		exemplarityIndicatorId: text('exemplarity_indicator_id').references(
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
		id: nanoid('id').default(generateNanoid()).primaryKey(),
		projectId: nanoid('project_id').references(() => projects.id, {
			onDelete: 'cascade',
			onUpdate: 'cascade',
		}),
		date: timestamp('date', { withTimezone: true }),
		createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
		updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
		createdById: userIdForeignKey('created_by_id', {
			onDelete: 'restrict',
			onUpdate: 'cascade',
		}).notNull(),
		updatedById: userIdForeignKey('updated_by_id', { onDelete: 'restrict', onUpdate: 'cascade' }),
		index: integer('index'),
		publicUrl: text('public_url').notNull(),
		storageName: text('storage_name').notNull(),
		typeId: text('type_id').references(() => projectImageTypes.id, {
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
		id: nanoid('id').references(() => projectsImages.id, {
			onDelete: 'cascade',
			onUpdate: 'cascade',
		}),
		locale: localeForeignKey('locale'),
		description: text('description'),
	},
	(table) => {
		return {
			pk: primaryKey(table.id, table.locale),
		};
	}
);

export const projectsImagesCreditDetails = pgTable('projects_images_credits_details', {
	id: nanoid('id').default(generateNanoid()).primaryKey(),
	projectId: nanoid('project_id')
		.references(() => projects.id, {
			onDelete: 'cascade',
			onUpdate: 'cascade',
		})
		.notNull(),
	firstName: text('first_name'),
	middleName: text('middle_name'),
	lastName: text('last_name'),
	url: text('url'),
	description: text('description'),
	organizationId: nanoid('organization_id').references(() => organizations.id, {
		onDelete: 'set null',
		onUpdate: 'cascade',
	}),
	userId: userIdForeignKey('user_id', {
		onDelete: 'set null',
		onUpdate: 'cascade',
	}),
});

export const projectsImagesCredits = pgTable(
	'projects_images_credits',
	{
		imageId: nanoid('image_id').references(() => projectsImages.id, {
			onDelete: 'cascade',
			onUpdate: 'cascade',
		}),
		creditDetailsId: nanoid('credit_details_id').references(() => projectsImagesCreditDetails.id, {
			onDelete: 'set null',
			onUpdate: 'cascade',
		}),
		legend: text('legend'),
	},
	(table) => {
		return {
			pk: primaryKey(table.imageId, table.creditDetailsId),
		};
	}
);

/**
 * Keeping track of publication requests.
 */
export const projectsPublicationRequests = pgTable('projects_publication_requests', {
	projectId: nanoid('project_id')
		.references(() => projects.id, { onDelete: 'cascade', onUpdate: 'cascade' })
		.primaryKey(),
	requestedAt: timestamp('requested_at', { withTimezone: true }).defaultNow().notNull(),
	requestedById: userIdForeignKey('requested_by_id').notNull(),
});

/**
 * Sharing projects access to non-creator users.
 */
export const projectsUsers = pgTable(
	'projects_users',
	{
		userId: userIdForeignKey('user_id'),
		projectId: nanoid('project_id').references(() => projects.id, {
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
		projectId: nanoid('project_id').references(() => projects.id, {
			onDelete: 'cascade',
			onUpdate: 'cascade',
		}),
		organizationId: nanoid('organization_id').references(() => organizations.id, {
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
		userId: userIdForeignKey('user_id'),
		projectId: nanoid('project_id').references(() => projects.id, {
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

/**
 * Tracking project views with forced uniqueness on either user id or some common client identifier
 * for non authed users.
 */
export const projectsViews = pgTable(
	'projects_views',
	{
		id: nanoid('id').notNull().default(generateNanoid()).primaryKey(),
		projectId: nanoid('project_id')
			.references(() => projects.id, { onDelete: 'cascade', onUpdate: 'cascade' })
			.notNull(),
		userId: userIdForeignKey('user_id'),
		clientId: text('client_id'),
		viewedAt: timestamp('viewed_at', { withTimezone: true }).notNull().defaultNow(),
	},
	(table) => {
		return {
			pk: primaryKey(table.userId, table.projectId),
			unqUser: unique().on(table.projectId, table.userId),
			unqClient: unique().on(table.projectId, table.clientId),
		};
	}
);

//
// Organization descriptors
//

/**
 * Formats or domains of operation that can caracterize registered organizations.
 */
export const organizationTypes = pgTable('organization_types', {
	id: text('id')
		.default(generateNanoid({ length: 6 }))
		.primaryKey(),
});

/**
 * @see {@link organizationTypes}
 */
export const organizationTypesTranslations = pgTable(
	'organization_types_t',
	{
		id: text('id').references(() => organizationTypes.id, {
			onDelete: 'cascade',
			onUpdate: 'cascade',
		}),
		locale: localeForeignKey('locale'),
		title: text('title').notNull(),
		description: text('description'),
	},
	(table) => {
		return {
			pk: primaryKey(table.id, table.locale),
		};
	}
);

/**
 * Professions heralded by design offices or communities.
 */
export const organizationExpertises = pgTable('organization_expertises', {
	id: text('id')
		.default(generateNanoid({ length: 6 }))
		.primaryKey(),
});

/**
 * @see {@link organizationExpertises}
 */
export const organizationExpertisesTranslations = pgTable(
	'organization_expertises_t',
	{
		id: text('id').references(() => organizationExpertises.id, {
			onDelete: 'cascade',
			onUpdate: 'cascade',
		}),
		locale: localeForeignKey('locale'),
		title: text('title').notNull(),
		description: text('description'),
	},
	(table) => {
		return {
			pk: primaryKey(table.id, table.locale),
		};
	}
);

/**
 * Roles organizations can assume in the context of projects.
 */
export const organizationDuties = pgTable('organization_duties', {
	id: text('id')
		.default(generateNanoid({ length: 6 }))
		.primaryKey(),
});

/**
 * @see {@link organizationDuties}
 */
export const organizationDutiesTranslations = pgTable(
	'organization_duties_t',
	{
		id: text('id').references(() => organizationDuties.id, {
			onDelete: 'cascade',
			onUpdate: 'cascade',
		}),
		locale: localeForeignKey('locale'),
		title: text('title').notNull(),
		description: text('description'),
	},
	(table) => {
		return {
			pk: primaryKey(table.id, table.locale),
		};
	}
);

//
// Organizations
//

/**
 * Design offices, municipal offices, communities, etc.
 */
export const organizations = pgTable('organizations', {
	id: nanoid('id').default(generateNanoid()).primaryKey(),
	createdById: userIdForeignKey('created_by_id', {
		onDelete: 'restrict',
		onUpdate: 'cascade',
	}).notNull(),
	createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
	updatedById: userIdForeignKey('updated_by_id', { onDelete: 'set null', onUpdate: 'cascade' }),
	updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
	typeId: text('type_id').references(() => organizationTypes.id, {
		onDelete: 'set null',
		onUpdate: 'cascade',
	}),
});

/**
 * @see {@link organizations}
 */
export const organizationsTranslations = pgTable(
	'organizations_t',
	{
		id: nanoid('id').references(() => organizations.id, {
			onDelete: 'cascade',
			onUpdate: 'cascade',
		}),
		locale: localeForeignKey('locale'),
		name: text('name').notNull(),
		summary: text('summary'),
		description: text('description'),
	},
	(table) => {
		return {
			pk: primaryKey(table.id, table.locale),
			unq: unique().on(table.name, table.locale),
		};
	}
);

export const organizationsUsers = pgTable(
	'organizations_users',
	{
		organizationId: nanoid('organization_id').references(() => organizations.id, {
			onDelete: 'cascade',
			onUpdate: 'cascade',
		}),
		userId: userIdForeignKey('user_id'),
	},
	(table) => {
		return {
			pk: primaryKey(table.organizationId, table.userId),
		};
	}
);

export const organizationsExpertises = pgTable(
	'organizations_expertises',
	{
		organizationId: nanoid('organization_id').references(() => organizations.id, {
			onDelete: 'cascade',
			onUpdate: 'cascade',
		}),
		expertiseId: text('expertise_id').references(() => organizationExpertises.id, {
			onDelete: 'cascade',
			onUpdate: 'cascade',
		}),
	},
	(table) => {
		return {
			pk: primaryKey(table.expertiseId, table.organizationId),
		};
	}
);
