import { withAuth } from '$lib/auth/guard.server';
import { dbpool } from '$lib/db/db.server';
import { projectsImages } from '$lib/db/schema/public';
import { STATUS_CODES } from '$lib/utils/constants';
import { error } from '@sveltejs/kit';
import { z } from 'zod';

// const imageInsertSchema = strictRecordKeys(IMAGE_SIZES, z.string());
const imageInsertSchema = z.object({
	name: z.string(),
});

/**
 * Append newly stored images to the projectsImages table...
 */
export const POST = async (event) => {
	const session = await withAuth(event);
	const formData = await event.request.formData();
	const parsed = imageInsertSchema.safeParse(formData);
	if (!parsed.success) {
		console.error(JSON.stringify(parsed, undefined, 2));
		throw error(STATUS_CODES.BAD_REQUEST);
	}
	try {
		await dbpool.insert(projectsImages).values({
			projectId: event.params.projectId,
			createdById: session.user.id,
			storageName: parsed.data.name,
		});
	} catch (e) {
		throw error(STATUS_CODES.INTERNAL_SERVER_ERROR);
	}
	return new Response();
};
