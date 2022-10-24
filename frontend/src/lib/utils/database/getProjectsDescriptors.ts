import { getContextualDbClient } from './database';

/**
 * Helper for auth-agnostic query to get project descriptors form the database.
 */
export async function getProjectsDescriptors() {
	const db = getContextualDbClient();

	// await db.
}
