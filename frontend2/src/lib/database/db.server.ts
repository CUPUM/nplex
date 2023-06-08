import { SUPABASE_DB_URL } from '$env/static/private';
import type { RequestEvent } from '@sveltejs/kit';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

/**
 * Instanciate or reuse a short-lived db client lasting the lifetime of a request.
 */
export function useDb(event: RequestEvent) {
	if (!event.locals.db) {
		const client = postgres(SUPABASE_DB_URL);
		const db = drizzle(client);
		event.locals.db = db;
	}
	return event.locals.db;
}
