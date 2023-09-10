import { withAuth } from '$lib/auth/guard.server';
import { dbpool } from '$lib/db/db.server';
import { projects, projectsInsertSchema, projectsTranslations } from '$lib/db/schema/public';
import { excluded } from '$lib/db/sql';
import { LOCALES_ARR } from '$lib/i18n/constants';
import { STATUS_CODES } from '$lib/utils/constants';
import { fail } from '@sveltejs/kit';
import { and, eq } from 'drizzle-orm';
import { superValidate } from 'sveltekit-superforms/server';

const updateProjectGeneralSchema = projectsInsertSchema.pick({ typeId: true });
// .merge(translationsSchema(projectsTranslations));

export const load = async (event) => {
	const session = withAuth(event);
	console.log(updateProjectGeneralSchema);
	const form = superValidate(updateProjectGeneralSchema);
	return { form };
};

export const actions = {
	default: async (event) => {
		const session = await withAuth(event);
		const form = await superValidate(event, updateProjectGeneralSchema);
		if (!form.valid) {
			return fail(STATUS_CODES.BAD_REQUEST, { form });
		}
		const { translations, ...projectFields } = form.data;
		await dbpool.transaction(async (tx) => {
			await tx
				.update(projects)
				.set(projectFields)
				.where(
					and(
						// authorizeProjectUpdate(),
						eq(projects.id, event.params.projectId)
					)
				);
			const tvalues = LOCALES_ARR.map((locale) => ({
				...translations[locale],
				id: event.params.projectId,
				locale,
			}));
			await tx
				.insert(projectsTranslations)
				.values(tvalues)
				.onConflictDoUpdate({
					target: [projectsTranslations.id, projectsTranslations.locale],
					set: {
						title: excluded(projectsTranslations.title),
						description: excluded(projectsTranslations.title),
						summary: excluded(projectsTranslations.title),
					},
					// where: authorizeProjectUpdate(session.user),
				});
		});
	},
};
