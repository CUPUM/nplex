import * as m from '$i18n/messages';
import { STATUS_CODES } from '$lib/common/constants';
import { authorize } from '$lib/crud/authorization/rbac.server';
import { aggTranslations, joinTranslations } from '$lib/crud/queries/i18n';
import { canEditProject, projectImageTypesList } from '$lib/crud/queries/projects';
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
	const [imageForms, galleryForm, newImagesForm] = await Promise.all([
		Promise.all(
			images.map((image) => superValidate(image, zod(projectImageFormSchema), { id: image.id }))
		),
		superValidate(project, zod(projectGalleryFormSchema)),
		superValidate(zod(projectNewImagesFormSchema)),
	]);
	return {
		types: projectImageTypesList,
		imageForms,
		galleryForm,
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
		const form = await superValidate(event, zod(projectGalleryFormSchema));
		if (!form.valid || !('bannerId' in form.data) || !form.data.bannerId) {
			return fail(STATUS_CODES.BAD_REQUEST);
		}
		await db
			.update(projects)
			.set({ bannerId: form.data.bannerId })
			.where(eq(projects.id, event.params.projectId));
		return { form };
	},
	demote: async (event) => {
		authorize(event);
		const form = await superValidate(event, zod(projectGalleryFormSchema));
		if (!form.valid || !('bannerId' in form.data) || !form.data.bannerId) {
			return fail(STATUS_CODES.BAD_REQUEST);
		}
		await db
			.update(projects)
			.set({ bannerId: null })
			.where(
				and(eq(projects.id, event.params.projectId), eq(projects.bannerId, form.data.bannerId))
			);
		return { form };
	},
	update: async (event) => {
		authorize(event);
	},
	delete: async (event) => {
		authorize(event);
		const form = await superValidate(event, zod(projectGalleryFormSchema));
		if (!form.valid || !('deleteId' in form.data) || !form.data.deleteId) {
			return fail(STATUS_CODES.BAD_REQUEST);
		}
		await db
			.delete(projectsImages)
			.where(
				and(
					eq(projectsImages.projectId, event.params.projectId),
					eq(projectsImages.id, form.data.deleteId)
				)
			);
		return { form };
	},
};
