import {
	projectBuildingLevelTypes,
	projectBuildingLevelTypesTranslations,
	projectExemplarityCategories,
	projectExemplarityCategoriesTranslations,
	projectExemplarityIndicators,
	projectExemplarityIndicatorsTranslations,
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

// Project types

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

export const newProjectTypeFormSchema = projectTypesWithTranslationsSchema.omit({ id: true });

export const projectTypesFormSchema = z.object({
	types: projectTypesSchema.pick({ id: true }).array(),
});

// Project interventions

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
	projectTypesIds: projectTypesSchema.shape.id.array(),
});

export const newProjectInterventionSchema = projectInterventionsWithTranslationsSchema.omit({
	id: true,
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

export const newProjectInterventionCategorySchema =
	projectInterventionsCategoriesWithTranslationsSchema.omit({
		id: true,
	});

export const projectExemplarityIndicatorsSchema = createInsertSchema(
	projectExemplarityIndicators
).required({ id: true });

export const projectExemplarityIndicatorsTranslationsSchema = createInsertSchema(
	projectExemplarityIndicatorsTranslations,
	{
		...LANG_COLUMN_SCHEMA,
		title: (s) => s.title.trim(),
		description: (s) => s.description.trim(),
	}
);

export const projectExemplarityIndicatorsWithTranslationsSchema = withTranslationsSchema(
	projectExemplarityIndicatorsSchema,
	projectExemplarityIndicatorsTranslationsSchema.omit({ id: true })
);

export const newProjectExemplarityIndicatorSchema =
	projectExemplarityIndicatorsWithTranslationsSchema.omit({ id: true });

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

export const newProjectExemplarityCategorySchema =
	projectExemplarityCategoriesWithTranslationsSchema.omit({
		id: true,
	});

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

export const newProjectSiteOwnershipSchema = projectSiteOwnershipsWithTranslationsSchema.omit({
	id: true,
});

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
