import { USER_ROLES } from '$lib/auth/constants';
import { withRole } from '$lib/auth/guard.server';
import { projectTypes, projectTypesTranslations } from '$lib/db/schema/public';
import { withTranslations } from '$lib/db/utils.server';
import { withTranslationsSchema } from '$lib/db/validation.server';
import { createInsertSchema } from 'drizzle-zod';
import { superValidate } from 'sveltekit-superforms/server';

const updateSchema = withTranslationsSchema(
	createInsertSchema(projectTypes).required({ id: true }),
	createInsertSchema(projectTypesTranslations)
);

export const load = async (event) => {
	await withRole(event, USER_ROLES.EDITOR);
	const types = await withTranslations(projectTypes, projectTypesTranslations, {
		field: (t) => t.id,
		reference: (tt) => tt.id,
	});
	const forms = Promise.all(
		types.map((type) => superValidate(type, updateSchema, { id: type.id }))
	);
	return { forms };
};
