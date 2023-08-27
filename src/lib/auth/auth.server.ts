import { dev } from '$app/environment';
import { pool } from '$lib/db/db.server';
import { keys, sessions, users } from '$lib/db/schema/users';
import { pg } from '@lucia-auth/adapter-postgresql';
import { getTableName } from 'drizzle-orm';
import { lucia } from 'lucia';
import { sveltekit } from 'lucia/middleware';

export const auth = lucia({
	env: dev ? 'DEV' : 'PROD',
	middleware: sveltekit(),
	adapter: pg(pool, {
		user: getTableName(users),
		session: getTableName(sessions),
		key: getTableName(keys),
	}),
	getUserAttributes(databaseUser) {
		return {
			id: databaseUser.id,
			role: databaseUser.role,
		};
	},
	// getSessionAttributes(databaseSession) {
	// },
});

export type Auth = typeof auth;
