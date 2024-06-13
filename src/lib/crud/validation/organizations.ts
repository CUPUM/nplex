import { organizations, organizationsTranslations } from '$lib/db/schema/public.server';
import { createInsertSchema } from 'drizzle-zod';
import { LANG_COLUMN_SCHEMA, withTranslationsSchema } from './i18n';

export const organizationsSchema = createInsertSchema(organizations).required({ id: true });

export const organizationsTranslationsSchema = createInsertSchema(organizationsTranslations, {
	...LANG_COLUMN_SCHEMA,
	name: (s) => s.name.trim(),
	summary: (s) => s.summary.trim(),
	description: (s) => s.description.trim(),
});

export const organizationsWithTranslationsSchema = withTranslationsSchema(
	organizationsSchema,
	organizationsTranslationsSchema.omit({ id: true })
);
