import { dev } from '$app/environment';
import { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } from '$env/static/private';
import { PUBLIC_DOMAIN_NAME } from '$env/static/public';
import { db } from '$lib/db/db.server';
import { sessions, users } from '$lib/db/schema/users.server';
import { DrizzlePostgreSQLAdapter } from '@lucia-auth/adapter-drizzle';
import { GitHub, Google } from 'arctic';
import type { InferSelectModel } from 'drizzle-orm';
import { Lucia } from 'lucia';
import { OAUTH_PROVIDERS, type IntegratedOAuthProvider } from './constants';

const adapter = new DrizzlePostgreSQLAdapter(db, sessions, users);

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
		};
	},
});

declare module 'lucia' {
	interface Register {
		Lucia: typeof auth;
		DatabaseUserAttributes: Pick<
			InferSelectModel<typeof users, { dbColumnNames: true }>,
			'id' | 'email' | 'email_verified' | 'role'
		>;
	}
}

export const integrations = {
	[OAUTH_PROVIDERS.GITHUB]: new GitHub(GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, {
		redirectURI: `${PUBLIC_DOMAIN_NAME}/login/github/callback`,
	}),
	// [OAUTH_PROVIDERS.GOOGLE]: new Google(
	// 	GOOGLE_CLIENT_ID,
	// 	GOOGLE_CLIENT_SECRET,
	// 	`${PUBLIC_DOMAIN_NAME}/login/google/callback`
	// ),
} satisfies Record<IntegratedOAuthProvider, GitHub | Google>;
