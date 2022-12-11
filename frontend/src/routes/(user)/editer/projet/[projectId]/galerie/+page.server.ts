import { getDb } from '$utils/database';
import { StorageBucket } from '$utils/enums';
import { error, fail } from '@sveltejs/kit';
import sharp from 'sharp';
import { z } from 'zod';
import { zfd } from 'zod-form-data';
import type { Actions } from './$types';
import { GALLERY_FOLDER, GALLERY_IMAGE_TYPES, GALLERY_INPUT_NAME } from './common';

const ERROR_BAD_FORMAT = "Le format ou l'extension de l'image n'est pas compatible.";
const DEFAULT_SIZE = 1024;

export const actions: Actions = {
	upload: async (event) => {
		const formData = await event.request.formData();
		const files = formData.getAll(GALLERY_INPUT_NAME);
		const db = await getDb(event);
		let errs = [];
		for await (const file of files) {
			const v = await z
				.any()
				.refine(
					(f) => GALLERY_IMAGE_TYPES.includes(f.type),
					(f) => ({ message: ERROR_BAD_FORMAT })
				)
				.transform(async (f) => {
					const s = sharp(Buffer.from(await f.arrayBuffer()));
					const buffer = await s
						.resize({ width: DEFAULT_SIZE, withoutEnlargement: true })
						.webp()
						.toBuffer();
					const stats = await s.stats();
					const date = new Date().toLocaleDateString('fr-CA');
					const rand = crypto.randomUUID();
					return {
						name: `${date}-${rand}.webp`,
						type: 'image/webp',
						buffer,
						dominant_color: [stats.dominant.r, stats.dominant.g, stats.dominant.b],
						average_color: [
							stats.channels[0].mean,
							stats.channels[1].mean,
							stats.channels[2].mean,
						],
					};
				})
				.safeParseAsync(file);
			if (!v.success) {
				errs.push(v.error);
				return;
			}
			const sRes = await db.storage
				.from(StorageBucket.Projects)
				.upload(
					[event.params.projectId, GALLERY_FOLDER, v.data.name].join('/'),
					v.data.buffer,
					{ contentType: v.data.type }
				);
			if (sRes.error) {
				errs.push(sRes.error);
			}
			// const cRes = await db
			// 	.from('projects_gallery_images')
			// 	.update({ color_1: '', color_2: '', color_3: '' });
		}
		if (errs.length) {
			throw error(500, { message: JSON.stringify(errs) });
			// return fail(400, { errors: errs });
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
			.from(StorageBucket.Projects)
			.remove([parsed.data.file_name]);
		if (deleteRes.error) {
			throw error(500, deleteRes.error);
		}
	},
	update: async (event) => {
		if (!event.params.projectId) {
			return;
		}
		const formData = await event.request.formData();
		console.log(formData);
		// const formData = await event.request.formData();
		// console.log(formData);
		// const db = await getDb(event);
		// // Do some processing with sharp to produce webp sourcesets...
		// const iRes = await db.storage
		// 	.from(StorageBucket.Projects)
		// 	.upload(`${event.params.projectId}/${StorageFolder.Gallery}/some-image-name.jpg`, d, {});
		// console.log(iRes);
	},
	/**
	 * Promote the passed image as the project's banner image. Unsets previous banner.
	 */
	promote: async (event) => {},
};
