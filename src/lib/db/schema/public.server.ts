import { ROLES } from '$lib/auth/constants';
import { sql } from 'drizzle-orm';
import { intrange, nanoid } from 'drizzle-orm-helpers/pg';
import type { AnyPgColumn } from 'drizzle-orm/pg-core';
import {
	boolean,
	date,
	integer,
	pgTable,
	primaryKey,
	text,
	timestamp,
	unique,
	vector,
} from 'drizzle-orm/pg-core';
import {
	PROJECT_IMAGE_PALETTE_LENGTH,
	PROJECT_IMAGE_PALETTE_VECTOR_DIMENSIONS,
} from '../constants';
import { role } from '../custom-types.server';
import { CREATED_AT_COLUMN, LANG_COLUMN, UPDATED_AT_COLUMN } from '../helpers.server';
import { roles, users } from './users.server';

/**
 * Top-most categories of projects.
 */
export const projectTypes = pgTable('project_types', {
	id: text('id')
		.notNull()
		.default(nanoid({ size: 6 }))
		.primaryKey(),
	index: integer('index'),
});

export const projectTypesTranslations = pgTable(
	'project_types_t',
	{
		...LANG_COLUMN,
		id: text('id')
			.references(() => projectTypes.id, {
				onDelete: 'cascade',
				onUpdate: 'cascade',
			})
			.notNull(),
		title: text('title'),
		description: text('description'),
	},
	(table) => {
		return {
			pk: primaryKey({ columns: [table.id, table.lang] }),
		};
	}
);

/**
 * Grouping of project intervention types.
 */
export const projectInterventionsCategories = pgTable('project_intervention_categories', {
	id: text('id')
		.notNull()
		.default(nanoid({ size: 6 }))
		.primaryKey(),
	index: integer('index'),
});

export const projectInterventionsCategoriesTranslations = pgTable(
	'project_intervention_categories_t',
	{
		...LANG_COLUMN,
		id: text('id')
			.references(() => projectInterventionsCategories.id, {
				onDelete: 'cascade',
				onUpdate: 'cascade',
			})
			.notNull(),
		title: text('title'),
		description: text('description'),
	},
	(table) => {
		return {
			pk: primaryKey({ columns: [table.id, table.lang] }),
		};
	}
);

/**
 * Sub classification of projects by their intervention(s)
 */
export const projectInterventions = pgTable('project_interventions', {
	id: text('id')
		.notNull()
		.default(nanoid({ size: 6 }))
		.primaryKey(),
	categoryId: text('category_id')
		.notNull()
		.references(() => projectInterventionsCategories.id, {
			onDelete: 'cascade',
			onUpdate: 'cascade',
		}),
	maybePermit: boolean('maybe_permit'),
});

export const projectInterventionsTranslations = pgTable(
	'project_interventions_t',
	{
		...LANG_COLUMN,
		id: text('id')
			.references(() => projectInterventions.id, {
				onDelete: 'cascade',
				onUpdate: 'cascade',
			})
			.notNull(),
		title: text('title'),
		description: text('description'),
	},
	(table) => {
		return {
			pk: primaryKey({ columns: [table.id, table.lang] }),
		};
	}
);

/**
 * Relation table used for constraining intervention types based on project types.
 *
 * @see {@link projectTypes}
 * @see {@link projectInterventions}
 */
export const projectTypesToInterventions = pgTable(
	'project_types_to_intervention',
	{
		typeId: text('type_id')
			.notNull()
			.references(() => projectTypes.id, {
				onDelete: 'cascade',
				onUpdate: 'cascade',
			}),
		interventionId: text('intervention_id')
			.notNull()
			.references(() => projectInterventions.id, {
				onDelete: 'cascade',
				onUpdate: 'cascade',
			}),
	},
	(table) => {
		return {
			pk: primaryKey({ columns: [table.typeId, table.interventionId] }),
		};
	}
);

/**
 * The type of owner for the site where the projet is situated.
 */
export const projectSiteOwnerships = pgTable('project_site_ownerships', {
	id: text('id')
		.notNull()
		.default(nanoid({ size: 6 }))
		.primaryKey(),
	index: integer('index'),
});

export const projectSiteOwnershipsTranslations = pgTable(
	'project_site_ownerships_t',
	{
		...LANG_COLUMN,
		id: text('id')
			.references(() => projectSiteOwnerships.id, {
				onDelete: 'cascade',
				onUpdate: 'cascade',
			})
			.notNull(),
		title: text('title'),
		description: text('description'),
	},
	(table) => {
		return {
			pk: primaryKey({ columns: [table.id, table.lang] }),
		};
	}
);

/**
 * How is the project's building integrated amongst the surrounding constructions.
 */
export const projectImplantationTypes = pgTable('project_implantation_types', {
	id: text('id')
		.notNull()
		.default(nanoid({ size: 6 }))
		.primaryKey(),
	index: integer('index'),
});

export const projectImplantationTypesTranslations = pgTable(
	'project_implantation_types_t',
	{
		...LANG_COLUMN,
		id: text('id')
			.references(() => projectImplantationTypes.id, {
				onDelete: 'cascade',
				onUpdate: 'cascade',
			})
			.notNull(),
		title: text('title'),
		description: text('description'),
	},
	(table) => {
		return {
			pk: primaryKey({ columns: [table.id, table.lang] }),
		};
	}
);

/**
 * Groupings of exemplarity markers. Inspired by the City of Montreal's Design Agenda 2030.
 */
export const projectExemplarityCategories = pgTable('project_exemplarity_categories', {
	id: text('id')
		.notNull()
		.default(nanoid({ size: 6 }))
		.primaryKey(),
	index: integer('index'),
});

export const projectExemplarityCategoriesTranslations = pgTable(
	'project_exemplarity_categories_t',
	{
		...LANG_COLUMN,
		id: text('id')
			.references(() => projectExemplarityCategories.id, {
				onDelete: 'cascade',
				onUpdate: 'cascade',
			})
			.notNull(),
		title: text('title'),
		description: text('description'),
	},
	(table) => {
		return {
			pk: primaryKey({ columns: [table.id, table.lang] }),
		};
	}
);

export const projectExemplarityMarkers = pgTable('project_exemplarity_indicators', {
	id: text('id')
		.notNull()
		.default(nanoid({ size: 6 }))
		.primaryKey(),
	categoryId: text('category_id')
		.notNull()
		.references(() => projectExemplarityCategories.id, {
			onDelete: 'cascade',
			onUpdate: 'cascade',
		})
		.notNull(),
});

export const projectExemplarityMarkersTranslations = pgTable(
	'project_exemplarity_indicators_t',
	{
		...LANG_COLUMN,
		id: text('id')
			.references(() => projectExemplarityMarkers.id, {
				onDelete: 'cascade',
				onUpdate: 'cascade',
			})
			.notNull(),
		title: text('title'),
		shortTitle: text('short_title'),
		description: text('description'),
	},
	(table) => {
		return {
			pk: primaryKey({ columns: [table.id, table.lang] }),
		};
	}
);

/**
 * Various types of items that can be added to project galleries.
 */
export const projectImageTypes = pgTable('project_image_types', {
	id: text('id')
		.notNull()
		.default(nanoid({ size: 6 }))
		.primaryKey(),
});

export const projectImageTypesTranslations = pgTable(
	'project_image_types_t',
	{
		...LANG_COLUMN,
		id: text('id')
			.references(() => projectImageTypes.id, {
				onDelete: 'cascade',
				onUpdate: 'cascade',
			})
			.notNull(),
		title: text('title'),
		description: text('description'),
	},
	(table) => {
		return {
			pk: primaryKey({ columns: [table.id, table.lang] }),
		};
	}
);

/**
 * Various types of items that can be added to project galleries.
 */
export const projectImageTemporalities = pgTable('project_image_temporalities', {
	id: text('id')
		.notNull()
		.default(nanoid({ size: 6 }))
		.primaryKey(),
	timeIndex: integer('time_index').notNull().default(0),
});

export const projectImageTemporalitiesTranslations = pgTable(
	'project_image_temporalities_t',
	{
		...LANG_COLUMN,
		id: text('id')
			.references(() => projectImageTemporalities.id, {
				onDelete: 'cascade',
				onUpdate: 'cascade',
			})
			.notNull(),
		title: text('title'),
		description: text('description'),
	},
	(table) => {
		return {
			pk: primaryKey({ columns: [table.id, table.lang] }),
		};
	}
);

/**
 * Types of building levels. (mezzanine, basement, etc.)
 */
export const projectBuildingLevelTypes = pgTable('project_building_level_type', {
	id: text('id')
		.notNull()
		.primaryKey()
		.default(nanoid({ size: 6 })),
	verticalIndex: integer('vertical_index').notNull(),
	isGroundLevel: boolean('is_ground_level').unique(),
});

export const projectBuildingLevelTypesTranslations = pgTable(
	'project_building_level_types_t',
	{
		...LANG_COLUMN,
		id: text('id')
			.references(() => projectBuildingLevelTypes.id, {
				onDelete: 'cascade',
				onUpdate: 'cascade',
			})
			.notNull(),
		title: text('title'),
		description: text('description'),
	},
	(table) => {
		return {
			pk: primaryKey({ columns: [table.id, table.lang] }),
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
	...CREATED_AT_COLUMN,
	...UPDATED_AT_COLUMN,
	id: text('id').default(nanoid()).primaryKey(),
	createdById: text('created_by_id')
		.references(() => users.id, {
			onDelete: 'restrict',
			onUpdate: 'cascade',
		})
		.notNull(),
	updatedById: text('updated_by_id').references(() => users.id, {
		onDelete: 'set null',
		onUpdate: 'cascade',
	}),
	publishedAt: timestamp('published_at', { withTimezone: true }),
	views: integer('views').default(0),
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
	bannerId: text('banner_id').references((): AnyPgColumn => projectsImages.id, {
		onDelete: 'set null',
		onUpdate: 'cascade',
	}),
	adjacentStreets: integer('adjacent_streets'),
	adjacentAlleys: integer('adjacent_alleys'),
	costRange: intrange('cost_range')
		.notNull()
		.default(sql`'empty'`),
	siteArea: integer('site_area'),
	interventionsArea: integer('interventions_area'),
	buildingArea: integer('building_area'),
	buildingConstructionDate: date('building_construction_date', { mode: 'date' }),
});

export const projectsTranslations = pgTable(
	'projects_t',
	{
		...LANG_COLUMN,
		id: text('id')
			.references(() => projects.id, {
				onDelete: 'cascade',
				onUpdate: 'cascade',
			})
			.notNull(),
		title: text('title'),
		summary: text('summary'),
		description: text('description'),
	},
	(table) => {
		return {
			pk: primaryKey({ columns: [table.id, table.lang] }),
			// tsIndex: index('ts_index').using(
			// 	'gin',
			// 	sql`(set_weight(to_tsvector(${langToRegconfig(table.lang)}, coalesce(${table.title}, '')), 'A') || set_weight(to_tsvector(${langToRegconfig(table.lang)}, coalesce(${table.summary}, '')), 'B'))`
			// ),
		};
	}
);

export const projectsBuildingLevels = pgTable(
	'projects_building_levels',
	{
		id: text('id').notNull().primaryKey().default(nanoid()),
		projectId: text('project_id').references(() => projects.id, {
			onDelete: 'cascade',
			onUpdate: 'cascade',
		}),
		levelTypeId: text('level_type_id').references(() => projectBuildingLevelTypes.id, {
			onDelete: 'cascade',
			onUpdate: 'cascade',
		}),
		verticalIndex: integer('vertical_index').notNull(),
		height: integer('height'),
	},
	(table) => {
		return {
			unq: unique().on(table.verticalIndex, table.projectId),
		};
	}
);

export const projectsInterventions = pgTable(
	'projects_interventions',
	{
		projectId: text('project_id')
			.notNull()
			.references(() => projects.id, {
				onDelete: 'cascade',
				onUpdate: 'cascade',
			}),
		interventionId: text('intervention_id')
			.notNull()
			.references(() => projectInterventions.id, {
				onDelete: 'cascade',
				onUpdate: 'cascade',
			}),
	},
	(table) => {
		return {
			pk: primaryKey({
				columns: [table.projectId, table.interventionId],
				// name: 'projects_interventions_pk',
			}),
		};
	}
);

export const projectsExemplarityMarkers = pgTable(
	'projects_exemplarity_indicators',
	{
		projectId: text('project_id')
			.notNull()
			.references(() => projects.id, {
				onDelete: 'cascade',
				onUpdate: 'cascade',
			}),
		exemplarityMarkerId: text('exemplarity_indicator_id')
			.notNull()
			.references(() => projectExemplarityMarkers.id, {
				onDelete: 'cascade',
				onUpdate: 'cascade',
			}),
	},
	(table) => {
		return {
			pk: primaryKey({
				columns: [table.projectId, table.exemplarityMarkerId],
				// name: 'projects_exemplarity_markers_pk',
			}),
		};
	}
);

export const projectsImagesColumnsWithoutVectors = {
	...CREATED_AT_COLUMN,
	...UPDATED_AT_COLUMN,
	id: text('id').notNull().default(nanoid()).primaryKey(),
	projectId: text('project_id')
		.notNull()
		.references(() => projects.id, {
			onDelete: 'cascade',
			onUpdate: 'cascade',
		}),
	date: timestamp('date', { withTimezone: true }),
	createdById: text('created_by_id')
		.references(() => users.id, {
			onDelete: 'restrict',
			onUpdate: 'cascade',
		})
		.notNull(),
	updatedById: text('updated_by_id').references(() => users.id, {
		onDelete: 'restrict',
		onUpdate: 'cascade',
	}),
	index: integer('index'),
	storageName: text('storage_name').notNull().unique(),
	width: integer('width').notNull(),
	height: integer('height').notNull(),
	typeId: text('type_id').references(() => projectImageTypes.id, {
		onDelete: 'set null',
		onUpdate: 'cascade',
	}),
};
export const projectsImages = pgTable(
	'projects_images',
	{
		...projectsImagesColumnsWithoutVectors,
		colorPaletteLAB: vector('color_palette_lab', {
			dimensions: PROJECT_IMAGE_PALETTE_VECTOR_DIMENSIONS,
		})
			.array(PROJECT_IMAGE_PALETTE_LENGTH)
			.notNull(),
	},
	(table) => {
		return {
			unqIndex: unique().on(table.projectId, table.index),
		};
	}
);

export const projectsImagesTranslations = pgTable(
	'projects_images_t',
	{
		...LANG_COLUMN,
		id: text('id')
			.references(() => projectsImages.id, {
				onDelete: 'cascade',
				onUpdate: 'cascade',
			})
			.notNull(),
		description: text('description'),
	},
	(table) => {
		return {
			pk: primaryKey({ columns: [table.id, table.lang] }),
		};
	}
);

export const projectsGalleryCredits = pgTable('projects_gallery_credits', {
	id: text('id').default(nanoid()).notNull().primaryKey(),
	projectId: text('project_id')
		.references(() => projects.id, {
			onDelete: 'cascade',
			onUpdate: 'cascade',
		})
		.notNull(),
	firstName: text('first_name'),
	middleName: text('middle_name'),
	lastName: text('last_name'),
	url: text('url'),
	organizationId: text('organization_id').references(() => organizations.id, {
		onDelete: 'set null',
		onUpdate: 'cascade',
	}),
	userId: text('user_id').references(() => users.id, {
		onDelete: 'set null',
		onUpdate: 'cascade',
	}),
});

export const projectsImagesCredits = pgTable(
	'projects_images_credits',
	{
		imageId: text('image_id')
			.notNull()
			.references(() => projectsImages.id, {
				onDelete: 'cascade',
				onUpdate: 'cascade',
			}),
		creditDetailsId: text('credit_details_id').references(() => projectsGalleryCredits.id, {
			onDelete: 'set null',
			onUpdate: 'cascade',
		}),
		legend: text('legend'),
	},
	(table) => {
		return {
			pk: primaryKey({ columns: [table.imageId, table.creditDetailsId] }),
		};
	}
);

/**
 * Keeping track of pending publication requests.
 */
export const projectsPublicationRequests = pgTable('projects_publication_requests', {
	projectId: text('project_id')
		.references(() => projects.id, {
			onDelete: 'cascade',
			onUpdate: 'cascade',
		})
		.notNull()
		.primaryKey(),
	requestedAt: timestamp('requested_at', { withTimezone: true }).defaultNow().notNull(),
	requestedById: text('requested_by_id')
		.references(() => users.id, {
			onDelete: 'cascade',
			onUpdate: 'cascade',
		})
		.notNull(),
});

/**
 * Sharing projects access to non-creator users.
 */
export const projectsUsers = pgTable(
	'projects_users',
	{
		userId: text('user_id')
			.references(() => users.id, {
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
		role: role('role')
			.references(() => roles.role, {
				onDelete: 'set default',
				onUpdate: 'cascade',
			})
			.default(ROLES.VISITOR),
	},
	(table) => {
		return {
			pk: primaryKey({ columns: [table.projectId, table.userId] }),
		};
	}
);

/**
 * Organizations credited as partakers in projects.
 */
export const projectsOrganizations = pgTable(
	'projects_organizations',
	{
		projectId: text('project_id')
			.references(() => projects.id, {
				onDelete: 'cascade',
				onUpdate: 'cascade',
			})
			.notNull(),
		organizationId: text('organization_id')
			.references(() => organizations.id, {
				onDelete: 'cascade',
				onUpdate: 'cascade',
			})
			.notNull(),
	},
	(table) => {
		return {
			pk: primaryKey({ columns: [table.organizationId, table.projectId] }),
		};
	}
);

/**
 * Global tally of projects likes.
 */
export const projectsLikes = pgTable(
	'projects_likes',
	{
		userId: text('user_id')
			.references(() => users.id, {
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
	},
	(table) => {
		return {
			pk: primaryKey({ columns: [table.projectId, table.userId] }),
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
		.notNull()
		.default(nanoid({ size: 6 }))
		.primaryKey(),
	index: integer('index'),
});

export const organizationTypesTranslations = pgTable(
	'organization_types_t',
	{
		...LANG_COLUMN,
		id: text('id')
			.references(() => organizationTypes.id, {
				onDelete: 'cascade',
				onUpdate: 'cascade',
			})
			.notNull(),
		title: text('title'),
		description: text('description'),
	},
	(table) => {
		return {
			pk: primaryKey({ columns: [table.id, table.lang] }),
		};
	}
);

/**
 * Professions heralded by design offices or communities.
 */
export const organizationExpertises = pgTable('organization_expertises', {
	id: text('id')
		.notNull()
		.default(nanoid({ size: 6 }))
		.primaryKey(),
	index: integer('index'),
});

export const organizationExpertisesTranslations = pgTable(
	'organization_expertises_t',
	{
		...LANG_COLUMN,
		id: text('id')
			.references(() => organizationExpertises.id, {
				onDelete: 'cascade',
				onUpdate: 'cascade',
			})
			.notNull(),
		title: text('title'),
		description: text('description'),
	},
	(table) => {
		return {
			pk: primaryKey({ columns: [table.id, table.lang] }),
		};
	}
);

export const organizationDuties = pgTable('organization_duties', {
	id: text('id')
		.notNull()
		.default(nanoid({ size: 6 }))
		.primaryKey(),
	index: integer('index'),
});

export const organizationDutiesTranslations = pgTable(
	'organization_duties_t',
	{
		...LANG_COLUMN,
		id: text('id')
			.references(() => organizationDuties.id, {
				onDelete: 'cascade',
				onUpdate: 'cascade',
			})
			.notNull(),
		title: text('title'),
		description: text('description'),
	},
	(table) => {
		return {
			pk: primaryKey({ columns: [table.id, table.lang] }),
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
	...CREATED_AT_COLUMN,
	...UPDATED_AT_COLUMN,
	id: text('id').notNull().default(nanoid()).primaryKey(),
	createdById: text('created_by_id')
		.references(() => users.id, {
			onDelete: 'restrict',
			onUpdate: 'cascade',
		})
		.notNull(),
	updatedById: text('updated_by_id').references(() => users.id, {
		onDelete: 'set null',
		onUpdate: 'cascade',
	}),
	typeId: text('type_id').references(() => organizationTypes.id, {
		onDelete: 'set null',
		onUpdate: 'cascade',
	}),
});

export const organizationsTranslations = pgTable(
	'organizations_t',
	{
		...LANG_COLUMN,
		id: text('id')
			.references(() => organizations.id, {
				onDelete: 'cascade',
				onUpdate: 'cascade',
			})
			.notNull(),
		name: text('name'),
		summary: text('summary'),
		description: text('description'),
	},
	(table) => {
		return {
			pk: primaryKey({ columns: [table.id, table.lang] }),
			unq: unique().on(table.name, table.lang),
		};
	}
);

export const organizationsUsers = pgTable(
	'organizations_users',
	{
		organizationId: text('organization_id')
			.references(() => organizations.id, {
				onDelete: 'cascade',
				onUpdate: 'cascade',
			})
			.notNull(),
		userId: text('user_id')
			.references(() => users.id, {
				onDelete: 'cascade',
				onUpdate: 'cascade',
			})
			.notNull(),
	},
	(table) => {
		return {
			pk: primaryKey({ columns: [table.organizationId, table.userId] }),
		};
	}
);

export const organizationsExpertises = pgTable(
	'organizations_expertises',
	{
		organizationId: text('organization_id')
			.references(() => organizations.id, {
				onDelete: 'cascade',
				onUpdate: 'cascade',
			})
			.notNull(),
		expertiseId: text('expertise_id')
			.references(() => organizationExpertises.id, {
				onDelete: 'cascade',
				onUpdate: 'cascade',
			})
			.notNull(),
	},
	(table) => {
		return {
			pk: primaryKey({ columns: [table.expertiseId, table.organizationId] }),
		};
	}
);
