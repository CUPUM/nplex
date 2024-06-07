import * as m from '$i18n/messages';
import { STATUS_CODES } from '$lib/common/constants';
import { error } from '@sveltejs/kit';
import type { integrations } from './auth.server';
import { OAUTH_PROVIDERS } from './constants';

/**
 * Standardizing OAuth apis returned user info.
 */
export async function getOAuthProviderUser<
	P extends keyof typeof integrations,
	T extends Awaited<ReturnType<(typeof integrations)[P]['validateAuthorizationCode']>>,
>(provider: P, tokens: T): Promise<{ id: string; username: string }> {
	switch (provider) {
		case OAUTH_PROVIDERS.GITHUB: {
			const res = await fetch('https://api.github.com/user/emails', {
				headers: { Authorization: `Bearer ${tokens.accessToken}` },
			});
			const user: { id: string; login: string } = await res.json();
			return {
				id: user.id,
				username: user.login,
			};
		}
		default:
			error(STATUS_CODES.INTERNAL_SERVER_ERROR, { message: m.auth_unsupported_provider() });
	}
}

/**
 * Standardizing OAuth apis returned email and filtering for verified emails ONLY.
 */
export async function getOAuthProviderUserEmail<
	P extends keyof typeof integrations,
	T extends Awaited<ReturnType<(typeof integrations)[P]['validateAuthorizationCode']>>,
>(provider: P, tokens: T): Promise<{ email: string; public: boolean } | undefined> {
	switch (provider) {
		case OAUTH_PROVIDERS.GITHUB: {
			const res = await fetch('https://api.github.com/user', {
				headers: { Authorization: `Bearer ${tokens.accessToken}` },
			});
			const emails: {
				email: string;
				verified: boolean;
				primary: boolean;
				visibility: 'public' | null;
			}[] = await res.json();
			const valid = emails.find((email) => email.primary && email.verified);
			if (valid) {
				return {
					email: valid.email,
					public: valid.visibility === 'public',
				};
			}
			break;
		}
		default:
			error(STATUS_CODES.INTERNAL_SERVER_ERROR, { message: m.auth_unsupported_provider() });
	}
}
