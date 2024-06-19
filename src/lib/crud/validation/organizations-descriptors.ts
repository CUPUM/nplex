import {
	organizationExpertises,
	organizationExpertisesTranslations,
	organizationTypes,
	organizationTypesTranslations,
} from '$lib/db/schema/public.server';
import { createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';
import { LANG_COLUMN_SCHEMA, withTranslationsSchema } from './i18n';

/*
Organization types
*/

export const organizationTypesSchema = createInsertSchema(organizationTypes).required({ id: true });

export const organizationTypesTranslationsSchema = createInsertSchema(
	organizationTypesTranslations,
	{
		...LANG_COLUMN_SCHEMA,
		title: (s) => s.title.trim(),
		description: (s) => s.description.trim(),
	}
);

export const organizationTypesWithTranslationsSchema = withTranslationsSchema(
	organizationTypesSchema,
	organizationTypesTranslationsSchema.omit({ id: true })
);

export const organizationTypesListSchema = z.object({
	delete: organizationTypesSchema.shape.id,
});

export const organizationTypeCreateSchema = organizationTypesWithTranslationsSchema.omit({
	id: true,
});

/*
Organization expertises
*/

export const organizationExpertisesSchema = createInsertSchema(organizationExpertises).required({
	id: true,
});

export const organizationExpertisesTranslationsSchema = createInsertSchema(
	organizationExpertisesTranslations,
	{
		...LANG_COLUMN_SCHEMA,
		title: (s) => s.title.trim(),
		description: (s) => s.description.trim(),
	}
);

export const organizationExpertisesWithTranslationsSchema = withTranslationsSchema(
	organizationExpertisesSchema,
	organizationExpertisesTranslationsSchema.omit({ id: true })
);

export const organizationExpertisesListSchema = z.object({
	delete: organizationExpertisesSchema.shape.id,
});

export const organizationExpertiseCreateSchema = organizationExpertisesWithTranslationsSchema.omit({
	id: true,
});
