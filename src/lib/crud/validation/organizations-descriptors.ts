import { organizationTypes, organizationTypesTranslations } from '$lib/db/schema/public.server';
import { createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';
import { LANG_COLUMN_SCHEMA, withTranslationsSchema } from './i18n';

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
