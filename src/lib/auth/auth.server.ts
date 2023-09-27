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
import { getTableName } from '$lib/db/utils';
import { pg } from '@lucia-auth/adapter-postgresql';
import { github, google } from '@lucia-auth/oauth/providers';
import { lucia } from 'lucia';
import { sveltekit } from 'lucia/middleware';
import { OAUTH_PROVIDERS } from './constants';

export const auth = lucia({
	env: dev ? 'DEV' : 'PROD',
	middleware: sveltekit(),
	adapter: pg(pool, {
		user: getTableName(users, { quotes: 'inner', withSchema: true }),
		session: getTableName(sessions, { quotes: 'inner', withSchema: true }),
		key: getTableName(keys, { quotes: 'inner', withSchema: true }),
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

export const googleAuth = google(auth, {
	clientId: GOOGLE_CLIENT_ID,
	clientSecret: GOOGLE_CLIENT_SECRET,
	redirectUri: `${DOMAIN_NAME}/login/google/callback`,
});

export const integrations = {
	[OAUTH_PROVIDERS.GITHUB]: githubAuth,
	[OAUTH_PROVIDERS.GOOGLE]: googleAuth,
} as const;

export type Auth = typeof auth;
