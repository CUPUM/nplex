import { EDITOR_FORM_ACTION } from '$routes/(authed)/editer/constants';
import { IMAGE_MAX_RESOLUTION } from '$routes/(authed)/editer/projet/constants';
import {
	projectGalleryUpdateSchema,
	projectImageUploadSchema,
} from '$routes/(authed)/editer/projet/schemas';
import { SEARCH_PARAMS, STATUS_CODES, STORAGE_BUCKETS, STORAGE_FOLDERS } from '$utils/enums';
import { toPgArr } from '$utils/format';
import { validateFormData } from '$utils/validation';
import { error, fail } from '@sveltejs/kit';
import { colord, extend } from 'colord';
import labPlugin from 'colord/plugins/lab';
import sharp from 'sharp';

extend([labPlugin]);

export const actions = {
	[EDITOR_FORM_ACTION]: async (event) => {
		const validated = await validateFormData(event, projectGalleryUpdateSchema);
		console.log(validated);
		if (validated.failure) return validated.failure;
		const galleryUpdate = await event.locals.db.from('projects_images').upsert(
			validated.data.gallery.map((img, i) => ({
				...img,
				index: i,
				project: event.params.projectId,
			}))
		);
		if (galleryUpdate.error) {
			throw error(STATUS_CODES.InternalServerError, JSON.stringify(galleryUpdate.error));
		}
	},
	/**
	 * Upload new image(s) to the storage.
	 */
	upload: async (event) => {
		const validated = await validateFormData(event, projectImageUploadSchema);
		console.log(validated);
		if (validated.failure) return validated.failure;
		const uploads = await Promise.all(
			validated.data.image_files.map(async (file) => {
				const img = sharp(Buffer.from(await file.arrayBuffer()));
				const buffer = await img
					.resize({
						width: IMAGE_MAX_RESOLUTION,
						height: IMAGE_MAX_RESOLUTION,
						fit: 'inside',
						withoutEnlargement: true,
					})
					.rotate()
					.webp()
					.toBuffer();
				const stats = await img.stats();
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
				const average_hsl = mean.toHsl();
				const average_lab = mean.toLab();
				return event.locals.db.storage
					.from(STORAGE_BUCKETS.PROJECTS)
					.upload(
						[event.params.projectId, STORAGE_FOLDERS.IMAGE_GALLERY, `${date}-${rand}.webp`].join(
							'/'
						),
						buffer,
						{ contentType: 'image/webp', upsert: true }
					)
					.then(async (stored) => {
						if (stored.error) {
							console.error('storage error', stored.error);
							throw error(STATUS_CODES.InternalServerError, { ...stored.error });
						}
						const update = await event.locals.db
							.from('projects_images')
							.update({
								color_dominant_hsl: toPgArr([
									dominant_hsl.h,
									dominant_hsl.s,
									dominant_hsl.l,
								]) as any,
								color_dominant_lab: toPgArr([
									dominant_lab.l,
									dominant_lab.a,
									dominant_lab.b,
								]) as any,
								color_average_hsl: toPgArr([average_hsl.h, average_hsl.s, average_hsl.l]) as any,
								color_average_lab: toPgArr([average_lab.l, average_lab.a, average_lab.b]) as any,
							})
							.eq('storage_name', stored.data.path)
							.select('id')
							.single();
						if (update.error) {
							const del = await event.locals.db.storage
								.from(STORAGE_BUCKETS.PROJECTS)
								.remove([stored.data.path]);
							if (del.error) {
								console.error('cleanup error', del.error);
								throw error(STATUS_CODES.InternalServerError, { ...del.error });
							}
							console.error('update error', update.error);
							throw error(STATUS_CODES.InternalServerError, { ...update.error });
						}
						return {
							success: update.data.id,
						};
					});
			})
		);
		return { success: true };
	},
	/**
	 * Delete a gallery image.
	 */
	delete: async (event) => {
		if (!event.params.projectId) {
			return;
		}
		const imageName = event.url.searchParams.get(SEARCH_PARAMS.FILENAME);
		if (!imageName) {
			console.error('missing image name');
			return fail(STATUS_CODES.BadRequest, { message: 'Missing image name.' });
		}
		const del = await event.locals.db.storage.from(STORAGE_BUCKETS.PROJECTS).remove([imageName]);
		if (del.error) {
			console.error(del.error);
			return fail(STATUS_CODES.InternalServerError, { message: del.error.message });
		}
	},
	test: async (event) => {
		console.log(event);
	},
	/**
	 * Promote the passed image as the project's banner image. Unsets previous banner.
	 */
	promote: async (event) => {
		console.log('promoting', event);
		const imageId = event.url.searchParams.get(SEARCH_PARAMS.IMAGE_ID);
		if (!imageId) {
			return fail(STATUS_CODES.BadRequest, {
				message: 'Missing image identifier required to complete image promotion.',
			});
		}
		const promoteRes = await event.locals.db
			.from('projects')
			.update({ banner: imageId })
			.eq('id', event.params.projectId)
			.single();
		if (promoteRes.error) {
			console.log(promoteRes.error);
			throw error(STATUS_CODES.InternalServerError, promoteRes.error);
		}
	},
	/**
	 * Demote (remove) the passed image as the project's banner image. Leaves the project banner as
	 * null.
	 */
	demote: async (event) => {
		console.log('demoting', event);
		const imageId = event.url.searchParams.get(SEARCH_PARAMS.IMAGE_ID);
		if (!imageId) {
			return fail(STATUS_CODES.BadRequest, {
				message: 'Missing image identifier required to complete image demotion.',
			});
		}
		const promoteRes = await event.locals.db
			.from('projects')
			.update({ banner: null })
			.eq('id', event.params.projectId)
			.eq('banner', imageId)
			.maybeSingle();
		if (promoteRes.error) {
			throw error(STATUS_CODES.InternalServerError, promoteRes.error);
		}
	},
};
