import { dev } from '$app/environment';
import {
	DOMAIN_NAME,
	GITHUB_CLIENT_ID,
	GITHUB_CLIENT_SECRET,
	GOOGLE_CLIENT_ID,
	GOOGLE_CLIENT_SECRET,
} from '$env/static/private';
import { pool } from '$lib/db/db.server';
import { keys, sessions, users } from '$lib/db/schema/accounts';
import { getTableName } from '$lib/db/utils.server';
import { pg } from '@lucia-auth/adapter-postgresql';
import { github, google } from '@lucia-auth/oauth/providers';
import { lucia } from 'lucia';
import { sveltekit } from 'lucia/middleware';
import { OAUTH_PROVIDERS } from './constants';

export const auth = lucia({
	env: dev ? 'DEV' : 'PROD',
	middleware: sveltekit(),
	adapter: pg(pool, {
		user: getTableName(users, { withSchema: true }),
		session: getTableName(sessions, { withSchema: true }),
		key: getTableName(keys, { withSchema: true }),
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

export const integrations = {
	[OAUTH_PROVIDERS.GITHUB]: github(auth, {
		clientId: GITHUB_CLIENT_ID,
		clientSecret: GITHUB_CLIENT_SECRET,
	}),
	[OAUTH_PROVIDERS.GOOGLE]: google(auth, {
		clientId: GOOGLE_CLIENT_ID,
		clientSecret: GOOGLE_CLIENT_SECRET,
		redirectUri: `${DOMAIN_NAME}/login/google/callback`,
	}),
} as const;

export type Auth = typeof auth;
