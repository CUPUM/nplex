import { getDb } from '$utils/database';
import { STATUS_CODES, STORAGE_BUCKETS } from '$utils/enums';
import { pgarr } from '$utils/format';
import { error, fail } from '@sveltejs/kit';
import sharp from 'sharp';
import { z } from 'zod';
import { zfd } from 'zod-form-data';
import type { Actions } from './$types';
import { GALLERY_IMAGE_TYPES, GALLERY_INPUT_NAME } from './common';

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
					return {
						name: `${date}-${rand}.webp`,
						type: 'image/webp',
						buffer,
						color_dominant: [stats.dominant.r, stats.dominant.g, stats.dominant.b],
						color_mean: [
							stats.channels[0].mean.toFixed(0),
							stats.channels[1].mean.toFixed(0),
							stats.channels[2].mean.toFixed(0),
						],
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
				console.log(storageRes.data.path);
				const statsRes = await db
					.from('projects_gallery_images')
					.update({
						color_dominant: pgarr(parsed.data.color_dominant),
						color_mean: pgarr(parsed.data.color_mean),
					})
					.eq('name', storageRes.data?.path)
					.single();
				console.log(statsRes);
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
		const updateRes = await db.from('projects_gallery_images').upsert(parsed.data);
		console.log(updateRes);
		if (updateRes.error) {
			return fail(STATUS_CODES.InternalServerError, updateRes.error);
		}
	},
	delete: async (event) => {
		if (!event.params.projectId) {
			return;
		}
		const formData = await event.request.formData();
		const parsed = zfd
			.formData({
				file_name: zfd.text(),
			})
			.safeParse(formData);
		if (!parsed.success) {
			return fail(400, parsed.error.formErrors.fieldErrors);
		}
		const db = await getDb(event);
		const deleteRes = await db.storage
			.from(STORAGE_BUCKETS.PROJECTS)
			.remove([parsed.data.file_name]);
		if (deleteRes.error) {
			throw error(500, deleteRes.error);
		}
	},
	/**
	 * Promote the passed image as the project's banner image. Unsets previous banner.
	 */
	promote: async (event) => {},
};
