import {
	projectBuildingLevelTypes,
	projectBuildingLevelTypesTranslations,
	projectExemplarityCategories,
	projectExemplarityCategoriesTranslations,
	projectExemplarityMarkers,
	projectExemplarityMarkersTranslations,
	projectImageTypes,
	projectImageTypesTranslations,
	projectImplantationTypes,
	projectImplantationTypesTranslations,
	projectInterventions,
	projectInterventionsCategories,
	projectInterventionsCategoriesTranslations,
	projectInterventionsTranslations,
	projectSiteOwnerships,
	projectSiteOwnershipsTranslations,
	projectTypes,
	projectTypesTranslations,
} from '$lib/db/schema/public.server';
import { createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';
import { LANG_COLUMN_SCHEMA, withTranslationsSchema } from './i18n';

/*
Project types
*/

export const projectTypesSchema = createInsertSchema(projectTypes).required({ id: true });

export const projectTypesTranslationsSchema = createInsertSchema(projectTypesTranslations, {
	...LANG_COLUMN_SCHEMA,
	title: (s) => s.title.trim(),
	description: (s) => s.description.trim(),
});

export const projectTypesWithTranslationsSchema = withTranslationsSchema(
	projectTypesSchema,
	projectTypesTranslationsSchema.omit({ id: true })
);

export const projectTypeCreateFormSchema = projectTypesWithTranslationsSchema.omit({ id: true });

export const projectTypesFormSchema = z.object({ delete: projectTypesSchema.shape.id });

/*
Project interventions
*/

export const projectInterventionsSchema = createInsertSchema(projectInterventions).required({
	id: true,
});

export const projectInterventionsTranslationsSchema = createInsertSchema(
	projectInterventionsTranslations,
	{
		...LANG_COLUMN_SCHEMA,
		title: (s) => s.title.trim(),
		description: (s) => s.description.trim(),
	}
);

export const projectInterventionsWithTranslationsSchema = withTranslationsSchema(
	projectInterventionsSchema,
	projectInterventionsTranslationsSchema.omit({ id: true })
).extend({
	typesIds: projectTypesSchema.shape.id.array(),
});

export const projectInterventionCreateFormSchema = projectInterventionsWithTranslationsSchema.omit({
	id: true,
});

export const projectInterventionsFormSchema = z.object({
	delete: projectInterventionsSchema.shape.id,
});

export const projectInterventionsCategoriesSchema = createInsertSchema(
	projectInterventionsCategories
).required({ id: true });

export const projectInterventionsCategoriesTranslationsSchema = createInsertSchema(
	projectInterventionsCategoriesTranslations,
	{
		...LANG_COLUMN_SCHEMA,
		title: (s) => s.title.trim(),
		description: (s) => s.description.trim(),
	}
);

export const projectInterventionsCategoriesWithTranslationsSchema = withTranslationsSchema(
	projectInterventionsCategoriesSchema,
	projectInterventionsCategoriesTranslationsSchema.omit({ id: true })
);

export const projectInterventionCategoryCreateFormSchema =
	projectInterventionsCategoriesWithTranslationsSchema.omit({
		id: true,
	});

export const projectInterventionCategoriesFormSchema = z.object({
	delete: projectInterventionsCategoriesSchema.shape.id,
	// confirm: z.literal(PROJECT_DESCRIPTOR_DELETE_CONFIRM),
});

/*
Exemplarity markers
*/

export const projectExemplarityMarkersSchema = createInsertSchema(
	projectExemplarityMarkers
).required({ id: true });

export const projectExemplarityMarkersTranslationsSchema = createInsertSchema(
	projectExemplarityMarkersTranslations,
	{
		...LANG_COLUMN_SCHEMA,
		title: (s) => s.title.trim(),
		description: (s) => s.description.trim(),
	}
);

export const projectExemplarityMarkersWithTranslationsSchema = withTranslationsSchema(
	projectExemplarityMarkersSchema,
	projectExemplarityMarkersTranslationsSchema.omit({ id: true })
);

export const projectExemplarityMarkerCreateSchema =
	projectExemplarityMarkersWithTranslationsSchema.omit({ id: true });

export const projectExemplarityMarkersListSchema = z.object({
	delete: projectExemplarityMarkersSchema.shape.id,
});

/*
	Exemplarity categories
	*/

export const projectExemplarityCategoriesSchema = createInsertSchema(
	projectExemplarityCategories
).required({ id: true });

export const projectExemplarityCategoriesTranslationsSchema = createInsertSchema(
	projectExemplarityCategoriesTranslations,
	{
		...LANG_COLUMN_SCHEMA,
		title: (s) => s.title.trim(),
		description: (s) => s.description.trim(),
	}
);

export const projectExemplarityCategoriesWithTranslationsSchema = withTranslationsSchema(
	projectExemplarityCategoriesSchema,
	projectExemplarityCategoriesTranslationsSchema.omit({ id: true })
);

export const projectExemplarityCategoryCreateSchema =
	projectExemplarityCategoriesWithTranslationsSchema.omit({
		id: true,
	});

export const projectExemplarityCategoriesListSchema = z.object({
	delete: projectExemplarityCategoriesSchema.shape.id,
});

/*
	Site ownerships
	*/

export const projectSiteOwnershipsSchema = createInsertSchema(projectSiteOwnerships).required({
	id: true,
});

export const projectSiteOwnershipsTranslationsSchema = createInsertSchema(
	projectSiteOwnershipsTranslations,
	{
		...LANG_COLUMN_SCHEMA,
		title: (s) => s.title.trim(),
		description: (s) => s.description.trim(),
	}
);

export const projectSiteOwnershipsWithTranslationsSchema = withTranslationsSchema(
	projectSiteOwnershipsSchema,
	projectSiteOwnershipsTranslationsSchema.omit({ id: true })
);

export const projectSiteOwnershipsListSchema = z.object({
	delete: projectSiteOwnershipsSchema.shape.id,
});

export const projectSiteOwnershipCreateSchema = projectSiteOwnershipsWithTranslationsSchema.omit({
	id: true,
});

/*
Implantation modes
*/

export const projectImplantationTypesSchema = createInsertSchema(projectImplantationTypes).required(
	{ id: true }
);

export const projectImplantationTypesTranslationsSchema = createInsertSchema(
	projectImplantationTypesTranslations,
	{
		...LANG_COLUMN_SCHEMA,
		title: (s) => s.title.trim(),
		description: (s) => s.description.trim(),
	}
);

export const projectImplantationTypesWithTranslationsSchema = withTranslationsSchema(
	projectImplantationTypesSchema,
	projectImplantationTypesTranslationsSchema.omit({ id: true })
);

export const newProjectImplantationTypeSchema = projectImplantationTypesWithTranslationsSchema.omit(
	{ id: true }
);

export const projectBuildingLevelTypesSchema = createInsertSchema(
	projectBuildingLevelTypes
).required({ id: true });

export const projectBuildingLevelTypesTranslationsSchema = createInsertSchema(
	projectBuildingLevelTypesTranslations,
	{
		...LANG_COLUMN_SCHEMA,
		title: (s) => s.title.trim(),
		description: (s) => s.description.trim(),
	}
);

export const projectBuildingLevelTypesWithTranslationsSchema = withTranslationsSchema(
	projectBuildingLevelTypesSchema,
	projectBuildingLevelTypesTranslationsSchema.omit({ id: true })
);

export const newProjectBuildingLevelTypeSchema =
	projectBuildingLevelTypesWithTranslationsSchema.omit({ id: true });

export const projectImageTypesSchema = createInsertSchema(projectImageTypes).required({ id: true });

export const projectImageTypesTranslationsSchema = createInsertSchema(
	projectImageTypesTranslations,
	{
		...LANG_COLUMN_SCHEMA,
		title: (s) => s.title.trim(),
		description: (s) => s.description.trim(),
	}
);

export const projectImageTypesWithTranslationsSchema = withTranslationsSchema(
	projectImageTypesSchema,
	projectImageTypesTranslationsSchema.omit({ id: true })
);

export const newProjectImageTypeSchema = projectImageTypesWithTranslationsSchema.omit({ id: true });
