import { getDb } from '$utils/database';
import { SEARCH_PARAMS, STATUS_CODES, STORAGE_BUCKETS } from '$utils/enums';
import { toPgArr } from '$utils/format';
import { error, fail, redirect } from '@sveltejs/kit';
import { colord, extend } from 'colord';
import labPlugin from 'colord/plugins/lab';
import sharp from 'sharp';
import { z } from 'zod';
import { zfd } from 'zod-form-data';
import type { Actions } from './$types';
import {
	adjacentStreetsSchema,
	costRangeSchema,
	descriptionSchema,
	gallerySchema,
	IMAGE_GALLERY_FOLDER,
	IMAGE_MAX_RESOLUTION,
	IMAGE_TYPES,
	locationSchema,
	titleSchema,
	typeIdSchema,
	workIdsSchema,
} from './common';

extend([labPlugin]);

export const actions: Actions = {
	/**
	 * Update full project and related tables.
	 */
	update: async (event) => {
		const formData = await event.request.formData();
		console.log({ ...formData });
		const parsed = zfd
			.formData({
				title: titleSchema,
				description: descriptionSchema,
				type_id: typeIdSchema,
				work_id: workIdsSchema,
				cost_range: costRangeSchema,
				adjacent_streets: adjacentStreetsSchema,
				location: locationSchema,
				gallery: gallerySchema,
			})
			.transform(({ work_id, location, gallery, ...project }) => {
				return {
					gallery,
					project,
					location,
					work_id,
				};
			})
			.safeParse(formData);
		if (!parsed.success) {
			return fail(STATUS_CODES.BadRequest, parsed.error.formErrors.fieldErrors);
		}
		const db = await getDb(event);
		// projects table
		const projectUpdate = db
			.from('projects')
			.update(parsed.data.project)
			.eq('id', event.params.projectId)
			.then((res) => {
				if (res.error) {
					throw error(STATUS_CODES.InternalServerError, { ...res.error });
				}
			});
		// project_works table
		const worksDelete = db
			.from('projects_works')
			.delete()
			.eq('project_id', event.params.projectId)
			.not('work_id', 'in', toPgArr(parsed.data.work_id))
			.then((del) => {
				if (del.error) {
					return fail(STATUS_CODES.InternalServerError, { ...del.error });
				}
				return db
					.from('projects_works')
					.upsert(
						parsed.data.work_id.map((work_id) => ({
							project_id: event.params.projectId,
							work_id,
						}))
					)
					.then((up) => {
						if (up.error) {
							return fail(STATUS_CODES.InternalServerError, { ...up.error });
						}
					});
			});
		// projects_images table
		const galleryUpdate = db
			.from('projects_images')
			.upsert(
				parsed.data.gallery.map((img, i) => ({
					...img,
					order: i,
					project_id: event.params.projectId,
				}))
			)
			.then((res) => {
				if (res.error) {
					throw fail(STATUS_CODES.InternalServerError, { ...res.error });
				}
			});
		// projects_location table
		const locationUpdate = db
			.from('projects_location')
			.update(parsed.data.location)
			.eq('project_id', event.params.projectId)
			.then((res) => {
				if (res.error) {
					throw error(STATUS_CODES.InternalServerError, { ...res.error });
				}
				console.log(res);
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
			const dominant_hsl = dominant.toHsl();
			const dominant_lab = dominant.toLab();
			const mean = colord({
				r: Math.round(stats.channels[0].mean),
				g: Math.round(stats.channels[1].mean),
				b: Math.round(stats.channels[2].mean),
			});
			const mean_hsl = mean.toHsl();
			const mean_lab = mean.toLab();
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
							color_dominant_hsl: toPgArr([dominant_hsl.h, dominant_hsl.s, dominant_hsl.l]) as any,
							color_dominant_lab: toPgArr([dominant_lab.l, dominant_lab.a, dominant_lab.b]) as any,
							color_mean_hsl: toPgArr([mean_hsl.h, mean_hsl.s, mean_hsl.l]) as any,
							color_mean_lab: toPgArr([mean_lab.l, mean_lab.a, mean_lab.b]) as any,
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
	 * Delete a gallery image.
	 */
	delete_image: async (event) => {
		if (!event.params.projectId) {
			return;
		}
		const imageName = event.url.searchParams.get(SEARCH_PARAMS.FILENAME);
		if (!imageName) {
			return fail(STATUS_CODES.BadRequest);
		}
		const db = await getDb(event);
		const del = await db.storage.from(STORAGE_BUCKETS.PROJECTS).remove([imageName]);
		if (del.error) {
			throw error(STATUS_CODES.InternalServerError, del.error);
		}
	},
	/**
	 * Promote the passed image as the project's banner image. Unsets previous banner.
	 */
	promote_image: async (event) => {
		const imageId = event.url.searchParams.get(SEARCH_PARAMS.IMAGE_ID);
		if (!imageId) {
			return fail(STATUS_CODES.BadRequest);
		}
		const db = await getDb(event);
		const promoteRes = await db
			.from('projects')
			.update({ banner_id: imageId })
			.eq('id', event.params.projectId)
			.single();
		if (promoteRes.error) {
			throw error(STATUS_CODES.InternalServerError, promoteRes.error);
		}
	},
	/**
	 * Demote (remove) the passed image as the project's banner image. Leaves the project banner as
	 * null.
	 */
	demote_image: async (event) => {
		const imageId = event.url.searchParams.get(SEARCH_PARAMS.IMAGE_ID);
		if (!imageId) {
			return fail(STATUS_CODES.BadRequest);
		}
		const db = await getDb(event);
		const promoteRes = await db
			.from('projects')
			.update({ banner_id: null })
			.eq('id', event.params.projectId)
			.eq('banner_id', imageId)
			.maybeSingle();
		if (promoteRes.error) {
			throw error(STATUS_CODES.InternalServerError, promoteRes.error);
		}
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
