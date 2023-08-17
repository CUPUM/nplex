import { SUPABASE_DB_URL } from '$env/static/private';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

const client = postgres(SUPABASE_DB_URL);
export const db = drizzle(client);

// /**
//  * Instanciate or reuse a short-lived server-side db client on a request event basis.
//  */
// export function useDb(event: RequestEvent) {
// 	if (!event.locals.db) {
// 		const client = postgres(SUPABASE_DB_URL);
// 		const db = drizzle(client);
// 		event.locals.db = db;
// 	}
// 	return event.locals.db;
// }
