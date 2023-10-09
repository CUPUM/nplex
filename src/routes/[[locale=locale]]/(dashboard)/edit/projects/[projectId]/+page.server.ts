import { withAuth } from '$lib/auth/guard.server';
import { projectGeneralUpdateSchema } from '$lib/db/crud';
import { dbpool } from '$lib/db/db.server';
import { projects, projectsTranslations } from '$lib/db/schema/public';
import { getAllExcluded, reduceTranslations } from '$lib/db/utils';
import { STATUS_CODES } from '$lib/utils/constants';
import { error, fail } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { superValidate } from 'sveltekit-superforms/server';

export const load = async (event) => {
	await withAuth(event);
	const t = event.locals.createTranslations({
		fr: {
			notFound: `Aucun projet trouvé avec l’identifiant ${event.params.projectId}.`,
		},
		en: {
			notFound: `No project found for id ${event.params.projectId}.`,
		},
	});
	try {
		const rawProject = await dbpool.query.projects.findFirst({
			where(fields, op) {
				// To do: add some authorization check related to session.user.id.
				return op.eq(fields.id, event.params.projectId);
			},
			with: {
				translations: true,
			},
		});
		if (!rawProject) {
			throw error(STATUS_CODES.NOT_FOUND, t.notFound);
		}
		const project = reduceTranslations(rawProject);
		const form = superValidate(project, projectGeneralUpdateSchema);
		return { form };
	} catch (e) {
		console.error(e);
		throw error(STATUS_CODES.INTERNAL_SERVER_ERROR);
	}
};

export const actions = {
	update: async (event) => {
		await withAuth(event);
		const form = await superValidate(event, projectGeneralUpdateSchema);
		if (!form.valid) {
			return fail(STATUS_CODES.BAD_REQUEST);
		}
		try {
			const { translations, ...project } = form.data;
			await dbpool.transaction(async (tx) => {
				await tx.update(projects).set(project).where(eq(projects.id, event.params.projectId));
				await tx
					.insert(projectsTranslations)
					.values(Object.values(translations))
					.onConflictDoUpdate({
						target: [projectsTranslations.id, projectsTranslations.locale],
						set: getAllExcluded(projectsTranslations),
					});
			});
		} catch (e) {
			console.error(e);
			return fail(STATUS_CODES.INTERNAL_SERVER_ERROR, { form });
		}
	},
};
