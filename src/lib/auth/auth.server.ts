import { dev } from '$app/environment';
import {
	DOMAIN_NAME,
	GITHUB_CLIENT_ID,
	GITHUB_CLIENT_SECRET,
	GOOGLE_CLIENT_ID,
	GOOGLE_CLIENT_SECRET,
} from '$env/static/private';
import { db } from '$lib/db/db.server';
import { users, usersSessions } from '$lib/db/schema/auth';
import { DrizzlePostgreSQLAdapter } from '@lucia-auth/adapter-drizzle';
import { GitHub, Google } from 'arctic';
import type { InferSelectModel } from 'drizzle-orm';
import { Lucia } from 'lucia';

const adapter = new DrizzlePostgreSQLAdapter(db, usersSessions, users);

export const auth = new Lucia(adapter, {
	sessionCookie: {
		attributes: {
			secure: !dev,
		},
	},
	getUserAttributes(attributes) {
		return {
			id: attributes.id,
			role: attributes.role,
			email: attributes.email,
			emailVerified: attributes.email_verified,
			githubUsername: attributes.github_username,
		};
	},
});

declare module 'lucia' {
	interface Register {
		Lucia: typeof auth;
		DatabaseUserAttributes: Pick<
			InferSelectModel<typeof users, { dbColumnNames: true }>,
			'id' | 'email' | 'email_verified' | 'role' | 'github_username'
		>;
	}
}

export const github = new GitHub(GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, {
	redirectURI: `${DOMAIN_NAME}/login/github/callback`,
});

export const google = new Google(
	GOOGLE_CLIENT_ID,
	GOOGLE_CLIENT_SECRET,
	`${DOMAIN_NAME}/login/google/callback`
);
