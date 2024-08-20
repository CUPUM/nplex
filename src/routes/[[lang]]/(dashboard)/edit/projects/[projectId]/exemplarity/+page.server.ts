import * as m from '$i18n/messages';
import { STATUS_CODES } from '$lib/common/constants';
import { authorize } from '$lib/crud/authorization/rbac.server';
import {
	canEditProject,
	projectExemplarityMarkersByCategoriesList,
} from '$lib/crud/queries/projects';
import { projectExemplarityMarkersFormSchema } from '$lib/crud/validation/projects';
import { db } from '$lib/db/db.server';
import { projects, projectsExemplarityMarkers } from '$lib/db/schema/public.server';
import { error, fail } from '@sveltejs/kit';
import { and, eq, notInArray } from 'drizzle-orm';
import { coalesce } from 'drizzle-orm-helpers';
import { $emptyJsonArray, jsonAgg } from 'drizzle-orm-helpers/pg';
import { zod } from 'sveltekit-superforms/adapters';
import { superValidate } from 'sveltekit-superforms/server';

export const load = async (event) => {
	authorize(event);
	const [project] = await db
		.select({
			markersIds: coalesce(jsonAgg(projectsExemplarityMarkers.markerId), $emptyJsonArray),
		})
		.from(projects)
		.where(and(canEditProject(event.locals.user), eq(projects.id, event.params.projectId)))
		.limit(1)
		.leftJoin(projectsExemplarityMarkers, eq(projects.id, projectsExemplarityMarkers.projectId));
	if (!project) {
		error(STATUS_CODES.NOT_FOUND, m.project_not_found());
	}
	const form = await superValidate(project, zod(projectExemplarityMarkersFormSchema));
	return {
		form,
		markersByCategories: projectExemplarityMarkersByCategoriesList,
	};
};

export const actions = {
	update: async (event) => {
		authorize(event);
		const form = await superValidate(event, zod(projectExemplarityMarkersFormSchema));
		if (!form.valid) {
			return fail(STATUS_CODES.BAD_REQUEST, { form });
		}
		await db.transaction(async (tx) => {
			await tx
				.delete(projectsExemplarityMarkers)
				.where(
					and(
						eq(projectsExemplarityMarkers.projectId, event.params.projectId),
						form.data.markersIds.length
							? notInArray(projectsExemplarityMarkers.markerId, form.data.markersIds)
							: undefined
					)
				);
			if (form.data.markersIds.length) {
				await tx
					.insert(projectsExemplarityMarkers)
					.values(
						form.data.markersIds.map((markerId) => ({
							markerId,
							projectId: event.params.projectId,
						}))
					)
					.onConflictDoNothing({
						target: [projectsExemplarityMarkers.projectId, projectsExemplarityMarkers.markerId],
					});
			}
		});
		return { form };
	},
};
