import { getDb } from '$utils/database';
import { SEARCH_PARAMS, STATUS_CODES, STORAGE_BUCKETS } from '$utils/enums';
import { pgarr } from '$utils/format';
import { error, fail } from '@sveltejs/kit';
import { colord, extend } from 'colord';
import labPlugin from 'colord/plugins/lab';
import sharp from 'sharp';
import { z } from 'zod';
import { zfd } from 'zod-form-data';
import type { Actions } from './$types';
import { GALLERY_IMAGE_TYPES, GALLERY_INPUT_NAME } from './common';

extend([labPlugin]);

const ERROR_BAD_FORMAT = "Le format ou l'extension de l'image n'est pas compatible.";
const DEFAULT_SIZE = 1024;
const GALLERY_FOLDER = 'gallery';

export const actions: Actions = {
	upload: async (event) => {
		const formData = await event.request.formData();
		const files = formData.getAll(GALLERY_INPUT_NAME);
		const db = await getDb(event);
		let errs = [];
		for await (const file of files) {
			const parsed = await z
				.any()
				.refine(
					(f) => GALLERY_IMAGE_TYPES.includes(f.type),
					(f) => ({ message: ERROR_BAD_FORMAT })
				)
				.transform(async (f) => {
					const s = sharp(Buffer.from(await f.arrayBuffer()));
					const buffer = await s
						.resize({ width: DEFAULT_SIZE, withoutEnlargement: true })
						.rotate()
						.webp()
						.toBuffer();
					const stats = await s.stats();
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
					return {
						name: `${date}-${rand}.webp`,
						type: 'image/webp',
						buffer,
						color_dominant_hsl: pgarr([dominant_hsl.h, dominant_hsl.s, dominant_hsl.l]),
						color_dominant_lab: pgarr([dominant_lab.l, dominant_lab.a, dominant_lab.b]),
						color_mean_hsl: pgarr([mean_hsl.h, mean_hsl.s, mean_hsl.l]),
						color_mean_lab: pgarr([mean_lab.l, mean_lab.a, mean_lab.b]),
					};
				})
				.safeParseAsync(file);
			if (!parsed.success) {
				errs.push(parsed.error);
				return;
			}
			const storageRes = await db.storage
				.from(STORAGE_BUCKETS.PROJECTS)
				.upload(
					[event.params.projectId, GALLERY_FOLDER, parsed.data.name].join('/'),
					parsed.data.buffer,
					{ contentType: parsed.data.type, upsert: true }
				);
			if (storageRes.error) {
				errs.push(storageRes.error);
			} else {
				const statsRes = await db
					.from('projects_images')
					.update({
						color_dominant_hsl: parsed.data.color_dominant_hsl as any,
						color_dominant_lab: parsed.data.color_dominant_lab as any,
						color_mean_hsl: parsed.data.color_mean_hsl as any,
						color_mean_lab: parsed.data.color_mean_lab as any,
					})
					.eq('name', storageRes.data?.path)
					.single();
				if (statsRes.error) {
					errs.push(statsRes.error);
					// Cleanup uploaded file if error from metadata update.
					const delStorageRes = await db.storage
						.from(STORAGE_BUCKETS.PROJECTS)
						.remove([storageRes.data.path]);
					if (delStorageRes.error) {
						errs.push(delStorageRes.error);
					}
				}
			}
		}
		if (errs.length) {
			throw error(500, { message: JSON.stringify(errs) });
			// return fail(400, { errors: errs });
		}
	},
	update: async (event) => {
		if (!event.params.projectId) {
			return fail(STATUS_CODES.BadRequest);
		}
		const formData = await event.request.formData();
		const parsed = zfd
			.formData(
				z.record(
					z.coerce.number(),
					z.object({
						id: zfd.text(),
						name: zfd.text(),
						title: zfd.text(z.string().nullable().default(null)),
						description: zfd.text(z.string().nullable().default(null)),
					})
				)
			)
			.transform((dataObject) => {
				return Object.entries(dataObject).map(([k, v]) => {
					return { ...v, order: Number(k), project_id: event.params.projectId };
				});
			})
			.safeParse(formData);
		if (!parsed.success) {
			return fail(STATUS_CODES.BadRequest, parsed.error.formErrors.fieldErrors);
		}
		const db = await getDb(event);
		// Select...
		// then
		// Patch array
		// then
		// Upsert without creating...
		// const updateRes = await db.from('projects_images').upsert(
		// );
		// console.log(updateRes);
		// if (updateRes.error) {
		// 	return fail(STATUS_CODES.InternalServerError, updateRes.error);
		// }
	},
	delete: async (event) => {
		if (!event.params.projectId) {
			return;
		}
		const imageName = event.url.searchParams.get(SEARCH_PARAMS.FILENAME);
		if (!imageName) {
			return fail(STATUS_CODES.BadRequest);
		}
		const db = await getDb(event);
		const deleteRes = await db.storage.from(STORAGE_BUCKETS.PROJECTS).remove([imageName]);
		if (deleteRes.error) {
			throw error(STATUS_CODES.InternalServerError, deleteRes.error);
		}
	},
	/**
	 * Promote the passed image as the project's banner image. Unsets previous banner.
	 */
	promote: async (event) => {
		if (!event.params.projectId) {
			return fail(STATUS_CODES.BadRequest);
		}
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
	demote: async (event) => {
		if (!event.params.projectId) {
			return fail(STATUS_CODES.BadRequest);
		}
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
};
