import * as m from '$i18n/messages';
import { projectsGalleryUpdateSchema, projectsImagesInsertManySchema } from '$lib/db/crud.server';
import { db } from '$lib/db/db.server';
import { isEditableProject } from '$lib/db/queries.server';
import {
	projects,
	projectsImages,
	projectsImagesCredits,
	projectsImagesTranslations,
} from '$lib/db/schema/public';
import { withTranslations } from '$lib/db/utils.server';
import { STATUS_CODES } from '$lib/utils/constants';
import { error } from '@sveltejs/kit';
import { and, eq } from 'drizzle-orm';
import { zod } from 'sveltekit-superforms/adapters';
import { superValidate } from 'sveltekit-superforms/server';

export const load = async (event) => {
	const session = await event.locals.authorize();
	const project = db
		.select({ bannerId: projects.bannerId })
		.from(projects)
		.where(and(isEditableProject(session), eq(projects.id, event.params.projectId)))
		.limit(1);
	const [images, newImageForm, galleryForm] = await Promise.all([
		withTranslations(projectsImages, projectsImagesTranslations, {
			field: (t) => t.id,
			reference: (tt) => tt.id,
		})
			.innerJoin(projects, eq(projects.id, projectsImages.projectId))
			.where(and(isEditableProject(session), eq(projects.id, event.params.projectId)))
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
