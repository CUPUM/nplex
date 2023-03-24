import { STORAGE_BUCKETS } from '$utils/enums';
import type { RequestEvent } from '@sveltejs/kit';
import { browserDb, getDb } from './client';

/**
 * Browser-side helper to get public URL to storage project image.
 */
export function getProjectImageUrl(name: string) {
	return browserDb.storage.from(STORAGE_BUCKETS.PROJECTS).getPublicUrl(name).data.publicUrl;
}

/**
 * Retrieve public url hrefs pointing to project images.
 */
export function getProjectImagesUrls(...names: string[]) {
	return names.map((name) => getProjectImageUrl(name));
}

/**
 * Get a user's profile.
 */
export async function getUserProfiles<U extends string | string[], Q extends string>(
	userIds: U,
	query: Q,
	event?: RequestEvent
) {
	const db = await getDb(event);
	if (Array.isArray(userIds)) {
		return db
			.from('users')
			.select(query)
			.in('id', userIds)
			.then((res) => {
				if (res.error) {
					return [];
				}
				return res.data;
			});
	} else {
		return db
			.from('users')
			.select(query)
			.eq('id', userIds)
			.then((res) => {
				if (res.error) {
					return null;
				}
				return res.data;
			});
	}
}
