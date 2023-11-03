import { withAuth } from '$lib/auth/guard.server';
import { projectGeneralUpdateSchema } from '$lib/db/crud.server';
import { dbpool } from '$lib/db/db.server';
import { selectProjectSiteOwnerships, selectProjectTypes } from '$lib/db/queries.server';
import { projects, projectsInterventions, projectsTranslations } from '$lib/db/schema/public';
import { TRUE, excluded } from '$lib/db/sql.server';
import { withTranslations } from '$lib/db/utils';
import { tt } from '$lib/i18n/translations';
import { STATUS_CODES } from '$lib/utils/constants';
import { and, eq, notInArray } from 'drizzle-orm';
import { message, superValidate } from 'sveltekit-superforms/server';

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

	// const p = dbpool.select({ id: projects.id }).from(projects).as('p');

	// type C = (typeof p)['_']['selectedFields']['']

	const [test] = await withTranslations(projects, projectsTranslations, {
		field: (t) => t.id,
		reference: (tt) => tt.id,
		translationsSelection: ({ title }) => ({ title }),
	});

	console.log(test.translations);

	// const [project] = await withTranslations(projects, projectsTranslations, (t, tt) => ({
	// 	field: t.id,
	// 	reference: tt.id,
	// }))
	// 	.where(and(authorizeProjectUpdate(session), eq(projects.id, event.params.projectId)))
	// 	.limit(1);
	// if (!project) {
	// 	throw error(STATUS_CODES.NOT_FOUND, t.notFound);
	// }
	// const interventions = await dbpool
	// 	.select({
	// 		interventionId: projectsInterventions.interventionId,
	// 	})
	// 	.from(projectsInterventions)
	// 	.where(eq(projectsInterventions.projectId, event.params.projectId));
	// const form = superValidate(
	// 	{ ...project, interventionIds: interventions.map((i) => i.interventionId) },
	// 	projectGeneralUpdateSchema
	// );
	return {
		// form,
		descriptors: {
			types: selectProjectTypes(event),
			siteOwnerships: selectProjectSiteOwnerships(event),
		},
	};
};

export const actions = {
	update: async (event) => {
		await withAuth(event);
		const t = event.locals.createTranslations({
			fr: tt.fr.editor,
			en: tt.en.editor,
		});
		const form = await superValidate(event, projectGeneralUpdateSchema);
		if (!form.valid) {
			return message(form, [t.invalid]);
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
						set: excluded(projectsTranslations),
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
			return message(form, [t.success]);
		} catch (e) {
			console.error(e);
			return message(form, [t.error], { status: STATUS_CODES.INTERNAL_SERVER_ERROR });
		}
	},
};
