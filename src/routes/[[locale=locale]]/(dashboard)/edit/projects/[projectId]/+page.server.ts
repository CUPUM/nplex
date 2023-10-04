import { withAuth } from '$lib/auth/guard.server';
import { projectUpdateSchema } from '$lib/db/crud';
import { dbpool } from '$lib/db/db.server';
import { projects } from '$lib/db/schema/public';
import { reduceTranslations } from '$lib/db/utils';
import { STATUS_CODES } from '$lib/utils/constants';
import { error, fail } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { superValidate } from 'sveltekit-superforms/server';

const projectUpdateGeneralSchema = projectUpdateSchema.pick({ typeId: true });

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
	default: async (event) => {
		const session = await withAuth(event);
		const form = await superValidate(event, projectUpdateGeneralSchema);
		if (!form.valid) {
			return fail(STATUS_CODES.BAD_REQUEST, { form });
		}
		const update = dbpool.transaction(async (tx) => {
			await tx.update(projects).set(form.data).where(eq(projects.id, event.params.projectId));
		});
		// 	const { translations, ...projectFields } = form.data;
		// 	await dbpool.transaction(async (tx) => {
		// 		await tx
		// 			.update(projects)
		// 			.set(projectFields)
		// 			.where(
		// 				and(
		// 					// authorizeProjectUpdate(),
		// 					eq(projects.id, event.params.projectId)
		// 				)
		// 			);
		// 		const tvalues = LOCALES_ARR.map((locale) => ({
		// 			...translations[locale],
		// 			id: event.params.projectId,
		// 			locale,
		// 		}));
		// 		await tx
		// 			.insert(projectsTranslations)
		// 			.values(tvalues)
		// 			.onConflictDoUpdate({
		// 				target: [projectsTranslations.id, projectsTranslations.locale],
		// 				set: {
		// 					title: excluded(projectsTranslations.title),
		// 					description: excluded(projectsTranslations.title),
		// 					summary: excluded(projectsTranslations.title),
		// 				},
		// 				// where: authorizeProjectUpdate(session.user),
		// 			});
		// 	});
	},
};
