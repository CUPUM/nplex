import { USER_ROLES } from '$lib/auth/constants';
import {
	boolean,
	date,
	integer,
	pgTable,
	pgView,
	primaryKey,
	text,
	timestamp,
	unique,
} from 'drizzle-orm/pg-core';
import { generateNanoid } from '../sql';
import { userRoles, users } from './accounts';
import { intrange, locale, point, userRole } from './custom-types';
import { locales } from './i18n';

/** Top-most categories of projects. */
export const projectTypes = pgTable('project_types', {
	id: text('id')
		.notNull()
		.default(generateNanoid({ length: 6 }))
		.primaryKey(),
	index: integer('index'),
});
export const projectTypesTranslations = pgTable(
	'project_types_t',
	{
		id: text('id')
			.references(() => projectTypes.id, {
				onDelete: 'cascade',
				onUpdate: 'cascade',
			})
			.notNull(),
		locale: locale('locale')
			.references(() => locales.locale, {
				onDelete: 'cascade',
				onUpdate: 'cascade',
			})
			.notNull(),
		title: text('title'),
		description: text('description'),
	},
	(table) => {
		return {
			pk: primaryKey(table.id, table.locale),
		};
	}
);

/** Grouping of project intervention types. */
export const projectInterventionCategories = pgTable('project_intervention_categories', {
	id: text('id')
		.notNull()
		.default(generateNanoid({ length: 6 }))
		.primaryKey(),
	index: integer('index'),
});
export const projectInterventionCategoriesTranslations = pgTable(
	'project_intervention_categories_t',
	{
		id: text('id')
			.notNull()
			.references(() => projectInterventionCategories.id, {
				onDelete: 'cascade',
				onUpdate: 'cascade',
			}),
		locale: locale('locale')
			.notNull()
			.references(() => locales.locale, {
				onDelete: 'cascade',
				onUpdate: 'cascade',
			}),
		title: text('title'),
		description: text('description'),
	},
	(table) => {
		return {
			pk: primaryKey(table.id, table.locale),
		};
	}
);

/** Sub classification of projects by their intervention(s) */
export const projectInterventions = pgTable('project_interventions', {
	id: text('id')
		.notNull()
		.default(generateNanoid({ length: 6 }))
		.primaryKey(),
	categoryId: text('category_id')
		.notNull()
		.references(() => projectInterventionCategories.id, {
			onDelete: 'cascade',
			onUpdate: 'cascade',
		}),
	maybePermit: boolean('maybe_permit'),
});
export const projectInterventionsTranslations = pgTable(
	'project_interventions_t',
	{
		id: text('id')
			.notNull()
			.references(() => projectInterventions.id, {
				onDelete: 'cascade',
				onUpdate: 'cascade',
			}),
		locale: locale('locale')
			.notNull()
			.references(() => locales.locale, {
				onDelete: 'cascade',
				onUpdate: 'cascade',
			}),
		title: text('title'),
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
			pk: primaryKey(table.typeId, table.interventionId),
		};
	}
);

/** The type of owner for the site where the projet is situated. */
export const projectSiteOwnerships = pgTable('project_site_ownerships', {
	id: text('id')
		.notNull()
		.default(generateNanoid({ length: 6 }))
		.primaryKey(),
	index: integer('index'),
});
export const projectSiteOwnershipsTranslations = pgTable(
	'project_site_ownerships_t',
	{
		id: text('id')
			.notNull()
			.references(() => projectSiteOwnerships.id, {
				onDelete: 'cascade',
				onUpdate: 'cascade',
			}),
		locale: locale('locale')
			.notNull()
			.references(() => locales.locale, {
				onDelete: 'cascade',
				onUpdate: 'cascade',
			}),
		title: text('title'),
		description: text('description'),
	},
	(table) => {
		return {
			pk: primaryKey(table.id, table.locale),
		};
	}
);

/** How is the project's building integrated amongst the surrounding constructions. */
export const projectImplantationTypes = pgTable('project_implantation_types', {
	id: text('id')
		.notNull()
		.default(generateNanoid({ length: 6 }))
		.primaryKey(),
	index: integer('index'),
});
export const projectImplantationTypesTranslations = pgTable(
	'project_implantation_types_t',
	{
		id: text('id')
			.notNull()
			.references(() => projectImplantationTypes.id, {
				onDelete: 'cascade',
				onUpdate: 'cascade',
			}),
		locale: locale('locale')
			.notNull()
			.references(() => locales.locale, {
				onDelete: 'cascade',
				onUpdate: 'cascade',
			}),
		title: text('title'),
		description: text('description'),
	},
	(table) => {
		return {
			pk: primaryKey(table.id, table.locale),
		};
	}
);

/** Groupings of exemplarity indicators. Inspired by the City of Montreal's Design Agenda 2030. */
export const projectExemplarityCategories = pgTable('project_exemplarity_categories', {
	id: text('id')
		.notNull()
		.default(generateNanoid({ length: 6 }))
		.primaryKey(),
	index: integer('index'),
});
export const projectExemplarityCategoriesTranslations = pgTable(
	'project_exemplarity_categories_t',
	{
		id: text('id')
			.notNull()
			.references(() => projectExemplarityCategories.id, {
				onDelete: 'cascade',
				onUpdate: 'cascade',
			}),
		locale: locale('locale')
			.notNull()
			.references(() => locales.locale, {
				onDelete: 'cascade',
				onUpdate: 'cascade',
			}),
		title: text('title'),
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
		.notNull()
		.default(generateNanoid({ length: 6 }))
		.primaryKey(),
	categoryId: text('category_id')
		.notNull()
		.references(() => projectExemplarityCategories.id, {
			onDelete: 'cascade',
			onUpdate: 'cascade',
		})
		.notNull(),
});
export const projectExemplarityIndicatorsTranslations = pgTable(
	'project_exemplarity_indicators_t',
	{
		id: text('id')
			.notNull()
			.references(() => projectExemplarityIndicators.id, {
				onDelete: 'cascade',
				onUpdate: 'cascade',
			}),
		locale: locale('locale')
			.notNull()
			.references(() => locales.locale, {
				onDelete: 'cascade',
				onUpdate: 'cascade',
			}),
		title: text('title'),
		shortTitle: text('short_title'),
		description: text('description'),
	},
	(table) => {
		return {
			pk: primaryKey(table.id, table.locale),
		};
	}
);

/** Various types of items that can be added to project galleries. */
export const projectImageTypes = pgTable('project_image_types', {
	id: text('id')
		.notNull()
		.default(generateNanoid({ length: 6 }))
		.primaryKey(),
});
export const projectImageTypesTranslations = pgTable(
	'project_image_types_t',
	{
		id: text('id')
			.notNull()
			.references(() => projectImageTypes.id, {
				onDelete: 'cascade',
				onUpdate: 'cascade',
			}),
		locale: locale('locale')
			.notNull()
			.references(() => locales.locale, {
				onDelete: 'cascade',
				onUpdate: 'cascade',
			}),
		title: text('title'),
		description: text('description'),
	},
	(table) => {
		return {
			pk: primaryKey(table.id, table.locale),
		};
	}
);

/** Various types of items that can be added to project galleries. */
export const projectImageTemporalities = pgTable('project_image_temporalities', {
	id: text('id')
		.notNull()
		.default(generateNanoid({ length: 6 }))
		.primaryKey(),
	timeIndex: integer('time_index').notNull().default(0),
});
export const projectImageTemporalitiesTranslations = pgTable(
	'project_image_temporalities_t',
	{
		id: text('id')
			.notNull()
			.references(() => projectImageTypes.id, {
				onDelete: 'cascade',
				onUpdate: 'cascade',
			}),
		locale: locale('locale')
			.notNull()
			.references(() => locales.locale, {
				onDelete: 'cascade',
				onUpdate: 'cascade',
			}),
		title: text('title'),
		description: text('description'),
	},
	(table) => {
		return {
			pk: primaryKey(table.id, table.locale),
		};
	}
);

/** Types of building levels. (mezzanine, basement, etc.) */
export const projectBuildingLevelTypes = pgTable('project_building_level_type', {
	id: text('id')
		.notNull()
		.primaryKey()
		.default(generateNanoid({ length: 6 })),
	verticalIndex: integer('vertical_index').notNull(),
	isGroundLevel: boolean('is_ground_level').unique(),
});
export const projectBuildingLevelTypesTranslations = pgTable(
	'project_building_level_types_t',
	{
		id: text('id')
			.references(() => projectBuildingLevelTypes.id, {
				onDelete: 'cascade',
				onUpdate: 'cascade',
			})
			.notNull(),
		locale: locale('locale')
			.notNull()
			.references(() => locales.locale, {
				onDelete: 'cascade',
				onUpdate: 'cascade',
			}),
		title: text('title'),
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

/** Core projects table. */
export const projects = pgTable('projects', {
	id: text('id').default(generateNanoid()).primaryKey(),
	createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
	updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
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
	costRange: intrange('cost_range').notNull().default([0, 0]),
	siteArea: integer('site_area'),
	interventionsArea: integer('interventions_area'),
	buildingArea: integer('building_area'),
	buildingConstructionDate: date('building_construction_date', { mode: 'date' }),
	location: point('location'),
});
export const projectsTranslations = pgTable(
	'projects_t',
	{
		id: text('id')
			.notNull()
			.references(() => projects.id, {
				onDelete: 'cascade',
				onUpdate: 'cascade',
			}),
		locale: locale('locale')
			.notNull()
			.references(() => locales.locale, {
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
 *
 * @see {@link projects}
 */
export const projectsObfuscatedLocations = pgView('projects_obfuscated_locations', {
	projectId: text('project_id')
		.notNull()
		.references(() => projects.id, {
			onDelete: 'cascade',
			onUpdate: 'cascade',
		})
		.primaryKey(),
	// point: postgis...
});

export const projectsBuildingLevels = pgTable(
	'projects_building_levels',
	{
		id: text('id').notNull().primaryKey().default(generateNanoid()),
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
			pk: primaryKey(table.projectId, table.interventionId),
		};
	}
);

export const projectsExemplarityIndicators = pgTable(
	'projects_exemplarity_indicators',
	{
		projectId: text('project_id')
			.notNull()
			.references(() => projects.id, {
				onDelete: 'cascade',
				onUpdate: 'cascade',
			}),
		exemplarityIndicatorId: text('exemplarity_indicator_id')
			.notNull()
			.references(() => projectExemplarityIndicators.id, {
				onDelete: 'cascade',
				onUpdate: 'cascade',
			}),
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
		id: text('id').notNull().default(generateNanoid()).primaryKey(),
		projectId: text('project_id').references(() => projects.id, {
			onDelete: 'cascade',
			onUpdate: 'cascade',
		}),
		date: timestamp('date', { withTimezone: true }),
		createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
		updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
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
		publicUrl: text('public_url').notNull(),
		storageName: text('storage_name').notNull(),
		typeId: text('type_id').references(() => projectImageTypes.id, {
			onDelete: 'set null',
			onUpdate: 'cascade',
		}),
		isBanner: boolean('is_banner'),
	},
	(table) => {
		return {
			unqIndex: unique().on(table.projectId, table.index),
			unqBanner: unique().on(table.projectId, table.isBanner),
		};
	}
);
export const projectsImagesTranslations = pgTable(
	'projects_images_t',
	{
		id: text('id')
			.notNull()
			.references(() => projectsImages.id, {
				onDelete: 'cascade',
				onUpdate: 'cascade',
			}),
		locale: locale('locale')
			.notNull()
			.references(() => locales.locale, {
				onDelete: 'cascade',
				onUpdate: 'cascade',
			}),
		description: text('description'),
	},
	(table) => {
		return {
			pk: primaryKey(table.id, table.locale),
		};
	}
);

export const projectsImagesCreditDetails = pgTable('projects_images_credits_details', {
	id: text('id').default(generateNanoid()).notNull().primaryKey(),
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
		creditDetailsId: text('credit_details_id').references(() => projectsImagesCreditDetails.id, {
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

/** Keeping track of publication requests. */
export const projectsPublicationRequests = pgTable('projects_publication_requests', {
	projectId: text('project_id')
		.references(() => projects.id, {
			onDelete: 'cascade',
			onUpdate: 'cascade',
		})
		.primaryKey(),
	requestedAt: timestamp('requested_at', { withTimezone: true }).defaultNow().notNull(),
	requestedById: text('requested_by_id')
		.references(() => users.id, {
			onDelete: 'cascade',
			onUpdate: 'cascade',
		})
		.notNull(),
});

/** Sharing projects access to non-creator users. */
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

/** Organizations credited as partakers in projects. */
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
			pk: primaryKey(table.organizationId, table.projectId),
		};
	}
);

/** Global tally of projects likes. */
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
		id: text('id').notNull().default(generateNanoid()).primaryKey(),
		projectId: text('project_id')
			.references(() => projects.id, {
				onDelete: 'cascade',
				onUpdate: 'cascade',
			})
			.notNull(),
		userId: text('user_id').references(() => users.id, {
			onDelete: 'cascade',
			onUpdate: 'cascade',
		}),
		clientId: text('client_id'),
		viewedAt: timestamp('viewed_at', { withTimezone: true }).notNull().defaultNow(),
	},
	(table) => {
		return {
			unqUser: unique().on(table.projectId, table.userId),
			unqClient: unique().on(table.projectId, table.clientId),
		};
	}
);

//
// Organization descriptors
//

/** Formats or domains of operation that can caracterize registered organizations. */
export const organizationTypes = pgTable('organization_types', {
	id: text('id')
		.notNull()
		.default(generateNanoid({ length: 6 }))
		.primaryKey(),
});
export const organizationTypesTranslations = pgTable(
	'organization_types_t',
	{
		id: text('id')
			.notNull()
			.references(() => organizationTypes.id, {
				onDelete: 'cascade',
				onUpdate: 'cascade',
			}),
		locale: locale('locale')
			.notNull()
			.references(() => locales.locale, {
				onDelete: 'cascade',
				onUpdate: 'cascade',
			}),
		title: text('title'),
		description: text('description'),
	},
	(table) => {
		return {
			pk: primaryKey(table.id, table.locale),
		};
	}
);

/** Professions heralded by design offices or communities. */
export const organizationExpertises = pgTable('organization_expertises', {
	id: text('id')
		.notNull()
		.default(generateNanoid({ length: 6 }))
		.primaryKey(),
});
export const organizationExpertisesTranslations = pgTable(
	'organization_expertises_t',
	{
		id: text('id')
			.notNull()
			.references(() => organizationExpertises.id, {
				onDelete: 'cascade',
				onUpdate: 'cascade',
			}),
		locale: locale('locale')
			.notNull()
			.references(() => locales.locale, {
				onDelete: 'cascade',
				onUpdate: 'cascade',
			}),
		title: text('title'),
		description: text('description'),
	},
	(table) => {
		return {
			pk: primaryKey(table.id, table.locale),
		};
	}
);

/** Roles organizations can assume in the context of projects. */
export const organizationDuties = pgTable('organization_duties', {
	id: text('id')
		.notNull()
		.default(generateNanoid({ length: 6 }))
		.primaryKey(),
});
export const organizationDutiesTranslations = pgTable(
	'organization_duties_t',
	{
		id: text('id')
			.notNull()
			.references(() => organizationDuties.id, {
				onDelete: 'cascade',
				onUpdate: 'cascade',
			}),
		locale: locale('locale')
			.notNull()
			.references(() => locales.locale, {
				onDelete: 'cascade',
				onUpdate: 'cascade',
			}),
		title: text('title'),
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

/** Design offices, municipal offices, communities, etc. */
export const organizations = pgTable('organizations', {
	id: text('id').notNull().default(generateNanoid()).primaryKey(),
	createdById: text('created_by_id')
		.references(() => users.id, {
			onDelete: 'restrict',
			onUpdate: 'cascade',
		})
		.notNull(),
	createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
	updatedById: text('updated_by_id').references(() => users.id, {
		onDelete: 'set null',
		onUpdate: 'cascade',
	}),
	updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
	typeId: text('type_id').references(() => organizationTypes.id, {
		onDelete: 'set null',
		onUpdate: 'cascade',
	}),
});
export const organizationsTranslations = pgTable(
	'organizations_t',
	{
		id: text('id')
			.notNull()
			.references(() => organizations.id, {
				onDelete: 'cascade',
				onUpdate: 'cascade',
			})
			.notNull(),
		locale: locale('locale')
			.notNull()
			.references(() => locales.locale, {
				onDelete: 'cascade',
				onUpdate: 'cascade',
			}),
		name: text('name'),
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
			pk: primaryKey(table.organizationId, table.userId),
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
			pk: primaryKey(table.expertiseId, table.organizationId),
		};
	}
);
