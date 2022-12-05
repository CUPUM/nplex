import { getDb } from '$utils/database';
import { z } from 'zod';
import type { Actions } from './$types';
import { FILES_INPUT_NAME, MIME_TYPES } from './common';

// const v = await zfd
// 	.formData({
// 		files: zfd.repeatableOfType(
// 			z
// 				.any()
// 				// .refine(
// 				// 	(f) => f.size <= MAX_SIZE,
// 				// 	(f) => ({ message: `L'image ${f.name} est trop volumineuse.` })
// 				// )
// 				.refine(
// 					(f) => MIME_TYPES.includes(f.type),
// 					(f) => ({
// 						message: `Le format ou l'extension de l'image ${f.name} n'est pas convenable.`,
// 					})
// 				)
// 				.transform(async (f: File) => {
// 					// Create webp
// 					const webp = await sharp(Buffer.from(await f.arrayBuffer()))
// 						.resize({ width: 1024, withoutEnlargement: true })
// 						.webp()
// 						.toBuffer()
// 						.catch((e) => {
// 							throw error(500, e);
// 						});
// 					return {
// 						name: filename(f),
// 						type: 'image/webp',
// 						extension: 'webp',
// 						buffer: webp,
// 					};
// 				})
// 		),
// 	})
// 	.safeParseAsync(d);
// if (!v.success) {
// 	return invalid(400, v.error.formErrors.fieldErrors);
// }

function filename(f: File) {
	const date = new Date().toLocaleDateString('fr-CA');
	const rand = crypto.randomUUID();
	return `${date}-${rand}`;
}

export const actions: Actions = {
	upload: async (event) => {
		const d = await event.request.formData();
		const files = d.getAll(FILES_INPUT_NAME);
		const db = await getDb(event);
		for await (const file of files) {
			const v = z.any().refine(
				(f) => MIME_TYPES.includes(f.type),
				(f) => ({
					message: `Le format ou l'extension de l'image ${f.name} n'est pas convenable.`,
				})
			);
		}
		// const iRes = await db.storage
		// 	.from(StorageBucket.Projects)
		// 	.upload(`${event.params.projectId}/${StorageFolder.Gallery}/`, d, {
		// 		contentType: d.type,
		// 	});
		// // console.log(iRes);
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
