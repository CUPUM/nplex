import { STORAGE_BUCKETS } from '$utils/enums';
import type { RequestEvent } from '@sveltejs/kit';
import { browserDb, getDb } from './client';

/**
 * Browser-side helper to get public URL to storage project image.
 */
export function getProjectImageUrl(name: string) {
	return browserDb.storage.from(STORAGE_BUCKETS.PROJECTS).getPublicUrl(name).data.publicUrl;
}

export function getProjectImagesUrls(...names: string[]) {
	return names.map((name) => getProjectImageUrl(name));
}

export async function getUserProfiles<U extends string | string[]>(
	userIds: U,
	event?: RequestEvent
) {
	const db = await getDb(event);
	// const profiles = await db.from('')
}
