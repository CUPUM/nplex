import { withAuth } from '$lib/auth/guard.server';
import { authorizeProjectUpdate } from '$lib/db/authorization.server';
import { projectGeneralUpdateSchema } from '$lib/db/crud.server';
import { dbpool } from '$lib/db/db.server';
import { projects, projectsInterventions, projectsTranslations } from '$lib/db/schema/public';
import { TRUE } from '$lib/db/sql.server';
import { getAllExcluded, reduceTranslations } from '$lib/db/utils';
import { STATUS_CODES } from '$lib/utils/constants';
import { error, fail } from '@sveltejs/kit';
import { and, eq, notInArray } from 'drizzle-orm';
import { superValidate } from 'sveltekit-superforms/server';

export const load = async (event) => {
	const session = await withAuth(event);
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
				return op.and(authorizeProjectUpdate(session), op.eq(fields.id, event.params.projectId));
			},
			with: {
				translations: true,
				interventions: { columns: { interventionId: true } },
			},
		});
		if (!rawProject) {
			throw error(STATUS_CODES.NOT_FOUND, t.notFound);
		}
		const { interventions, ...restProject } = rawProject;
		const project = reduceTranslations({
			...restProject,
			interventionIds: interventions.map((pi) => pi.interventionId),
		});
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
			const { translations, interventionIds, ...project } = form.data;
			await dbpool.transaction(async (tx) => {
				await tx.update(projects).set(project).where(eq(projects.id, event.params.projectId));
				await tx
					.insert(projectsTranslations)
					.values(Object.values(translations))
					.onConflictDoUpdate({
						target: [projectsTranslations.id, projectsTranslations.locale],
						set: getAllExcluded(projectsTranslations),
					});
				await tx
					.delete(projectsInterventions)
					.where(
						and(
							eq(projectsInterventions.projectId, event.params.projectId),
							interventionIds.length
								? notInArray(projectsInterventions.interventionId, interventionIds)
								: TRUE()
						)
					);
				if (interventionIds.length) {
					await tx
						.insert(projectsInterventions)
						.values(
							interventionIds.map((interventionId) => ({
								interventionId,
								projectId: event.params.projectId,
							}))
						)
						.onConflictDoNothing({
							target: [projectsInterventions.projectId, projectsInterventions.interventionId],
						});
				}
			});
		} catch (e) {
			console.error(e);
			return fail(STATUS_CODES.INTERNAL_SERVER_ERROR, { form });
		}
	},
};
