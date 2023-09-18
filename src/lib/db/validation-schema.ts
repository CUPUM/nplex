import { createInsertSchema } from 'drizzle-zod';
import { projectTypes, projectTypesTranslations } from './schema/public';

export const projectTypeInsertSchema = createInsertSchema(projectTypes);

export const projectTypeTranslationInsertSchema = createInsertSchema(projectTypesTranslations);
