import { getDb } from '$utils/database';
import { StorageBucket } from '$utils/enums';
import { error } from '@sveltejs/kit';
import sharp from 'sharp';
import { z } from 'zod';
import type { Actions } from './$types';
import { GALLERY_FOLDER, GALLERY_IMAGE_TYPES, GALLERY_INPUT_NAME } from './common';

export const actions: Actions = {
	upload: async (event) => {
		const d = await event.request.formData();
		const files = d.getAll(GALLERY_INPUT_NAME);
		const db = await getDb(event);
		let errs = [];
		for await (const file of files) {
			const v = await z
				.any()
				.refine(
					(f) => GALLERY_IMAGE_TYPES.includes(f.type),
					(f) => ({
						message: `Le format ou l'extension de l'image ${f.name} n'est pas convenable.`,
					})
				)
				.transform(async (f) => {
					const buffer = await sharp(Buffer.from(await f.arrayBuffer()))
						.resize({ width: 1200, withoutEnlargement: true })
						.webp()
						.toBuffer();
					const date = new Date().toLocaleDateString('fr-CA');
					const rand = crypto.randomUUID();
					return {
						name: `${date}-${rand}.webp`,
						type: 'image/webp',
						buffer,
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
		}
		if (errs.length) {
			throw error(500, { message: JSON.stringify(errs) });
			// return invalid(400, { errors: errs });
		}
	},
	update: async (event) => {
		if (!event.params.projectId) {
			return;
		}
		const d = await event.request.formData();
		console.log(d);
		// const v = zfd.formData(
		// 	z.object
		// 	zfd.repeatableOfType(z.string())
		// )
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
	delete: async (event) => {},
};
