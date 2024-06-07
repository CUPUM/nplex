import * as m from '$i18n/messages';
import { STATUS_CODES } from '$lib/common/constants';
import { authorize } from '$lib/crud/authorization/rbac.server';
import { db } from '$lib/db/db.server';
import { isEditableProject, withTranslations } from '$lib/db/queries.server';
import {
	projects,
	projectsImages,
	projectsImagesCredits,
	projectsImagesTranslations,
} from '$lib/db/schema/public.server';
import { error } from '@sveltejs/kit';
import { and, eq } from 'drizzle-orm';
import { zod } from 'sveltekit-superforms/adapters';
import { superValidate } from 'sveltekit-superforms/server';

export const load = async (event) => {
	authorize(event);
	const project = db
		.select({ bannerId: projects.bannerId })
		.from(projects)
		.where(and(isEditableProject(event.locals.user), eq(projects.id, event.params.projectId)))
		.limit(1);
	const [images, newImageForm, galleryForm] = await Promise.all([
		withTranslations(projectsImages, projectsImagesTranslations, {
			field: (t) => t.id,
			reference: (tt) => tt.id,
		})
			.innerJoin(projects, eq(projects.id, projectsImages.projectId))
			.where(and(isEditableProject(event.locals.user), eq(projects.id, event.params.projectId)))
			.leftJoin(projectsImagesCredits, eq(projectsImagesCredits.imageId, projectsImages.id)),
		superValidate(zod(projectsImagesInsertManySchema)),
		project.then(([defaults]) => {
			if (!defaults) {
				error(STATUS_CODES.NOT_FOUND, m.project_not_found());
			}
			return superValidate(zod(projectsGalleryUpdateSchema, { defaults }));
		}),
	]);
	return {
		images,
		newImageForm,
		galleryForm,
	};
};

export const actions = {
	upload: async (event) => {},
};
