import { getDb } from '$utils/database';
import { STATUS_CODES, STORAGE_BUCKETS } from '$utils/enums';
import { pgarr } from '$utils/format';
import { error, fail, redirect } from '@sveltejs/kit';
import { colord } from 'colord';
import sharp from 'sharp';
import { z } from 'zod';
import { zfd } from 'zod-form-data';
import type { Actions } from './$types';
import {
	costRangeSchema,
	descriptionSchema,
	IMAGE_GALLERY_FOLDER,
	IMAGE_MAX_RESOLUTION,
	IMAGE_TYPES,
	titleSchema,
	workIdsSchema,
} from './common';

export const actions: Actions = {
	/**
	 * Update full project and related tables.
	 */
	update: async (event) => {
		const formData = await event.request.formData();
		const parsed = zfd
			.formData({
				title: titleSchema,
				description: descriptionSchema,
				type_id: zfd.numeric(z.number().optional()),
				work_id: workIdsSchema,
				cost_range: costRangeSchema,
			})
			.transform((data) => {
				const { work_id, ...project } = data;
				return {
					project,
					work_id,
				};
			})
			.safeParse(formData);

		console.log(parsed);
		if (!parsed.success) {
			return fail(STATUS_CODES.BadRequest, parsed.error.formErrors.fieldErrors);
		}
		const db = await getDb(event);
		const projectUpdate = db
			.from('projects')
			.update(parsed.data.project)
			.eq('id', event.params.projectId)
			.then((res) => {
				if (res.error) {
					throw error(STATUS_CODES.InternalServerError, { ...res.error });
				}
				return parsed.data;
			});
		const worksDelete = db
			.from('projects_works')
			.delete()
			.eq('project_id', event.params.projectId)
			.not('work_id', 'in', pgarr(parsed.data.work_id))
			.then((del) => {
				if (del.error) {
					return fail(STATUS_CODES.InternalServerError, { ...del.error });
				}
				return db
					.from('projects_works')
					.upsert(
						parsed.data.work_id.map((work_id) => {
							return {
								project_id: event.params.projectId,
								work_id,
							};
						})
					)
					.then((up) => {
						if (up.error) {
							return fail(STATUS_CODES.InternalServerError, { ...up.error });
						}
						return up.data;
					});
			});
	},
	/**
	 * Upload new image(s) to the storage.
	 */
	upload_image: async (event) => {
		const formData = await event.request.formData();
		const files = formData.getAll('images');
		const db = await getDb(event);
		const uploads = files.map(async (file) => {
			const parsed = await z
				.any()
				.refine((file) => IMAGE_TYPES.includes(file.type), `Format d'image incompatible.`)
				.safeParseAsync(file);
			if (!parsed.success) {
				return fail(STATUS_CODES.BadRequest, { image: parsed.error.flatten() });
			}
			const image = sharp(Buffer.from(await parsed.data.arrayBuffer()));
			const buffer = await image
				.resize({
					width: IMAGE_MAX_RESOLUTION,
					height: IMAGE_MAX_RESOLUTION,
					fit: 'inside',
					withoutEnlargement: true,
				})
				.rotate()
				.webp()
				.toBuffer();
			const stats = await image.stats();
			const date = new Date().toLocaleDateString('fr-CA');
			const rand = crypto.randomUUID();
			const dominant = colord(stats.dominant);
			const mean = colord({
				r: Math.round(stats.channels[0].mean),
				g: Math.round(stats.channels[1].mean),
				b: Math.round(stats.channels[2].mean),
			});
			return db.storage
				.from(STORAGE_BUCKETS.PROJECTS)
				.upload(
					[event.params.projectId, IMAGE_GALLERY_FOLDER, `${date}-${rand}.webp`].join('/'),
					buffer,
					{ contentType: 'image/webp', upsert: true }
				)
				.then(async (stored) => {
					if (stored.error) {
						throw error(STATUS_CODES.InternalServerError, { ...stored.error });
					}
					const update = await db
						.from('projects_images')
						.update({
							color_dominant_hsl: dominant.toHsl() as any,
							color_dominant_lab: dominant.toLab() as any,
							color_mean_hsl: mean.toHsl() as any,
							color_mean_lab: mean.toLab() as any,
						})
						.eq('name', stored.data.path)
						.select('id')
						.single();
					if (update.error) {
						const del = await db.storage.from(STORAGE_BUCKETS.PROJECTS).remove([stored.data.path]);
						if (del.error) {
							throw error(STATUS_CODES.InternalServerError, { ...del.error });
						}
						throw error(STATUS_CODES.InternalServerError, { ...update.error });
					}
					return {
						success: update.data.id,
					};
				});
		});
		return Promise.all(uploads);
	},
	/**
	 * Delete a project by its id.
	 */
	delete: async (event) => {
		if (!event.locals.session) return fail(401);
		const formData = Object.fromEntries(await event.request.formData());
		if (!formData.id) return fail(401);
		const db = await getDb(event);
		const deleteRes = await db.from('projects').delete().eq('id', formData.id).single();
		if (deleteRes.error) throw error(500, deleteRes.error);
		throw redirect(301, '/editer');
	},
};
