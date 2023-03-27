import { EDITOR_FORM_ACTION } from '$routes/(authed)/editer/constants';
import { projectGalleryUpdateSchema } from '$routes/(authed)/editer/projet/schemas';
import { getDb } from '$utils/database/client';
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
		if (validated.failure) return validated.failure;
		const galleryUpdate = await event.locals.db
			.from('projects_images')
			.upsert(
				validated.data.gallery.map((img, i) => ({
					...img,
					order: i,
					project_id: event.params.projectId,
				}))
			)
			.then((res) => {
				if (res.error) {
					throw fail(STATUS_CODES.InternalServerError, { ...res.error });
				}
				return res;
			});
	},
	/**
	 * Upload new image(s) to the storage.
	 */
	upload: async (event) => {
		const formData = await event.request.formData();
		const files = formData.getAll('images');
		const uploads = await Promise.all(
			files.map(async (file) => {
				const parsed = await imageSchema.safeParseAsync(file);
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
								color_mean_hsl: toPgArr([mean_hsl.h, mean_hsl.s, mean_hsl.l]) as any,
								color_mean_lab: toPgArr([mean_lab.l, mean_lab.a, mean_lab.b]) as any,
							})
							.eq('name', stored.data.path)
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
		return uploads;
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
	/**
	 * Promote the passed image as the project's banner image. Unsets previous banner.
	 */
	promote: async (event) => {
		const imageId = event.url.searchParams.get(SEARCH_PARAMS.IMAGE_ID);
		if (!imageId) {
			return fail(STATUS_CODES.BadRequest, {
				message: 'Missing image identifier required to complete image promotion.',
			});
		}
		const db = await getDb(event);
		const promoteRes = await db
			.from('projects')
			.update({ banner_id: imageId })
			.eq('id', event.params.projectId)
			.single();
		if (promoteRes.error) {
			return fail(STATUS_CODES.InternalServerError, promoteRes.error);
		}
	},
	/**
	 * Demote (remove) the passed image as the project's banner image. Leaves the project banner as
	 * null.
	 */
	demote: async (event) => {
		const imageId = event.url.searchParams.get(SEARCH_PARAMS.IMAGE_ID);
		if (!imageId) {
			return fail(STATUS_CODES.BadRequest, {
				message: 'Missing image identifier required to complete image demotion.',
			});
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
