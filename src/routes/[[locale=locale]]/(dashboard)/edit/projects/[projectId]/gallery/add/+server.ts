import { withAuth } from '$lib/auth/guard.server';
import { dbpool } from '$lib/db/db.server';
import { projectsImages } from '$lib/db/schema/public';
import { getStorageUrl } from '$lib/storage/utils';
import { STATUS_CODES } from '$lib/utils/constants';
import { strictRecordKeys } from '$lib/utils/zod';
import { error } from '@sveltejs/kit';
import { z } from 'zod';
import { IMAGE_SIZES } from '../ImageInput.svelte';

const imageInsertSchema = strictRecordKeys(IMAGE_SIZES, z.string());

/** Append newly stored images to the projectsImages table... */
export const POST = async (event) => {
	const session = await withAuth(event);
	const formData = await event.request.formData();
	const data: Record<string, string> = {};
	formData.forEach((v, k) => (data[k] = String(v)));
	const parsed = imageInsertSchema.safeParse(data);
	if (!parsed.success) {
		console.error(JSON.stringify(parsed, undefined, 2));
		throw error(STATUS_CODES.BAD_REQUEST);
	}
	try {
		await dbpool.insert(projectsImages).values({
			projectId: event.params.projectId,
			createdById: session.user.id,
			nameSm: parsed.data.SM,
			nameMd: parsed.data.MD,
			nameLg: parsed.data.LG,
			urlSm: getStorageUrl(parsed.data.SM),
			urlMd: getStorageUrl(parsed.data.MD),
			urlLg: getStorageUrl(parsed.data.LG),
		});
	} catch (e) {
		throw error(STATUS_CODES.INTERNAL_SERVER_ERROR);
	}
	return new Response();
};
