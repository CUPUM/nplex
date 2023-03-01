import type { RequestEvent } from '@sveltejs/kit';
import { getDb } from './client';

/**
 * Get a map of public avatar urls associatied with user ids.
 */
export async function getAvatars<U extends string | string[]>(userIds: U, event?: RequestEvent) {
	const db = await getDb(event);
}
