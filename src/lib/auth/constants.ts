import type { ValueOf } from 'type-fest';

export const USER_ROLES = {
	ADMIN: 'admin',
	EDITOR: 'editor',
	VISITOR: 'visitor',
} as const;

export type UserRole = ValueOf<typeof USER_ROLES>;

export const USER_ROLES_ARR = Object.values(USER_ROLES);

export const USER_ROLE_DEFAULT = USER_ROLES.VISITOR;

export type UserRoleDefault = typeof USER_ROLE_DEFAULT;

export const EMAIL_VERIFICATION_CODE_LENGTH = 6;

/**
 * Active (implemented) oauth integrations.
 */
export const OAUTH_PROVIDERS = {
	GITHUB: 'github',
	// FACEBOOK: 'facebook',
	// LINKEDIN: 'linkedin',
	// GOOGLE: 'google',
} as const;

export type OAuthProvider = ValueOf<typeof OAUTH_PROVIDERS>;

export const OAUTH_PROVIDERS_ARR = Object.values(OAUTH_PROVIDERS);

export const OAUTH_PROVIDERS_STATE_COOKIE_NAME = {
	[OAUTH_PROVIDERS.GITHUB]: 'github_oauth_state',
} as const satisfies Record<OAuthProvider, string>;

export const TOKEN_EXPIRY = 7_200_000; // 2 hours

export const TOKEN_MIN_EXPIRY = 3_600_000; // 1hour

export const AUTH_TOKEN_ERRORS = {
	EXPIRED: 'expired',
	INVALID: 'invalid',
} as const;

export type AuthTokenError = ValueOf<typeof AUTH_TOKEN_ERRORS>;
