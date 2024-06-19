import * as m from '$i18n/messages';
import { STATUS_CODES } from '$lib/common/constants';
import { authorize } from '$lib/crud/authorization/rbac.server';
import { aggTranslations, joinTranslations } from '$lib/crud/queries/i18n';
import { canEditProject } from '$lib/crud/queries/projects';
import {
	projectGalleryFormSchema,
	projectImageFormSchema,
	projectNewImagesFormSchema,
} from '$lib/crud/validation/projects';
import { db } from '$lib/db/db.server';
import { projects, projectsImages, projectsImagesTranslations } from '$lib/db/schema/public.server';
import { error, fail } from '@sveltejs/kit';
import { and, eq } from 'drizzle-orm';
import { getColumns } from 'drizzle-orm-helpers';
import { zod } from 'sveltekit-superforms/adapters';
import { superValidate } from 'sveltekit-superforms/server';

export const load = async (event) => {
	authorize(event);
	const [[project], images] = await Promise.all([
		db
			.select({ bannerId: projects.bannerId })
			.from(projects)
			.where(and(canEditProject(event.locals.user), eq(projects.id, event.params.projectId)))
			.limit(1),
		joinTranslations(
			db
				.select({
					...aggTranslations(getColumns(projectsImagesTranslations)),
					...getColumns(projectsImages),
				})
				.from(projectsImages)
				.where(eq(projectsImages.projectId, event.params.projectId))
				.groupBy(projectsImages.id)
				.$dynamic(),
			projectsImagesTranslations,
			eq(projectsImages.id, projectsImagesTranslations.id)
		),
	]);
	if (!project) {
		error(STATUS_CODES.NOT_FOUND, m.project_not_found());
	}
	const [form, imagesForms, newImagesForm] = await Promise.all([
		superValidate(project, zod(projectGalleryFormSchema)),
		Promise.all(
			images.map((image) => superValidate(image, zod(projectImageFormSchema), { id: image.id }))
		),
		superValidate(zod(projectNewImagesFormSchema)),
	]);
	return {
		form,
		imagesForms,
		newImagesForm,
	};
};

export const actions = {
	upload: async (event) => {
		authorize(event);
		const form = await superValidate(event, zod(projectNewImagesFormSchema));
		if (!form.valid) {
			fail(STATUS_CODES.BAD_REQUEST, { form });
		}
		await db.insert(projectsImages).values(
			form.data.images.map((d) => ({
				...d,
				projectId: event.params.projectId,
				createdById: event.locals.user.id,
			}))
		);
		return { form };
	},
	promote: async (event) => {
		authorize(event);
	},
	demote: async (event) => {
		authorize(event);
	},
	update: async (event) => {
		authorize(event);
	},
};
