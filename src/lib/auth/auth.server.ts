import { dev } from '$app/environment';
import { pool } from '$lib/db/db.server';
import { getTableName } from '$lib/db/helpers/get-table-name';
import { keys, sessions, users } from '$lib/db/schema/auth';
import { pg } from '@lucia-auth/adapter-postgresql';
import { lucia } from 'lucia';
import { sveltekit } from 'lucia/middleware';

export const auth = lucia({
	env: dev ? 'DEV' : 'PROD',
	middleware: sveltekit(),
	adapter: pg(pool, {
		user: getTableName(users, { quotes: 'inner', schema: true }),
		session: getTableName(sessions, { quotes: 'inner', schema: true }),
		key: getTableName(keys, { quotes: 'inner', schema: true }),
	}),
	getUserAttributes(databaseUser) {
		return {
			id: databaseUser.id,
			role: databaseUser.role,
			email: databaseUser.email,
			emailVerified: databaseUser.email_verified,
			// avatarUrl: databaseUser.avatar_url,
		};
	},
	// getSessionAttributes(databaseSession) {
	// },
});

export type Auth = typeof auth;
