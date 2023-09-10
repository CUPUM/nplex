import { dev } from '$app/environment';
import { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } from '$env/static/private';
import { pool } from '$lib/db/db.server';
import { keys, sessions, users } from '$lib/db/schema/personal';
import { getTableName } from '$lib/db/utils';
import { pg } from '@lucia-auth/adapter-postgresql';
import { github } from '@lucia-auth/oauth/providers';
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
	getUserAttributes(data) {
		return {
			id: data.id,
			role: data.role,
			email: data.email,
			emailVerified: data.email_verified,
			githubUsername: data.github_username,
			// avatarUrl: databaseUser.avatar_url,
		};
	},
	// getSessionAttributes(databaseSession) {
	// },
});

export const githubAuth = github(auth, {
	clientId: GITHUB_CLIENT_ID,
	clientSecret: GITHUB_CLIENT_SECRET,
});

export type Auth = typeof auth;
