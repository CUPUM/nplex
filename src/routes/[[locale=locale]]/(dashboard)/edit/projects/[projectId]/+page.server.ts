import { withAuth } from '$lib/auth/guard.server';
import { projectUpdateSchema } from '$lib/db/crud';
import { dbpool } from '$lib/db/db.server';
import { reduceTranslations } from '$lib/db/utils';
import { STATUS_CODES } from '$lib/utils/constants';
import { error } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';

const projectUpdateGeneralSchema = projectUpdateSchema.pick({ typeId: true, translations: true });

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
		const form = superValidate(project, projectUpdateGeneralSchema);
		return { form };
	} catch (e) {
		console.error(e);
		throw error(STATUS_CODES.INTERNAL_SERVER_ERROR);
	}
};

export const actions = {
	update: async (event) => {
		await withAuth(event);
	},
};
