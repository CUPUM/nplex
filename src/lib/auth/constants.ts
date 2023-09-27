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

export const CREDENTIALS_PROVIDERS = {
	EMAIL: 'email',
	USERNAME: 'username',
} as const;

export type CredentialsProvider = ValueOf<typeof CREDENTIALS_PROVIDERS>;

export const OAUTH_PROVIDERS = {
	GITHUB: 'github',
	FACEBOOK: 'facebook',
	LINKEDIN: 'linkedin',
	GOOGLE: 'google',
} as const;

export type OAuthProvider = ValueOf<typeof OAUTH_PROVIDERS>;

export const OAUTH_PROVIDERS_ARR = Object.values(OAUTH_PROVIDERS);

/**
 * Should contain only supported providers.
 */
export const OAUTH_PROVIDERS_STATE_COOKIE = {
	[OAUTH_PROVIDERS.GITHUB]: 'github_oauth_state',
	[OAUTH_PROVIDERS.GOOGLE]: 'google_oauth_state',
} as const satisfies Partial<Record<OAuthProvider, string>>;

export type SupportedOAtuhProvider = keyof typeof OAUTH_PROVIDERS_STATE_COOKIE;

export const SUPPORTED_OAUTH_PROVIDERS_ARR = Object.keys(
	OAUTH_PROVIDERS_STATE_COOKIE
) as SupportedOAtuhProvider[];

export const AUTH_PROVIDERS = {
	...CREDENTIALS_PROVIDERS,
	...OAUTH_PROVIDERS,
} as const;

export type AuthProvider = ValueOf<typeof AUTH_PROVIDERS>;

export const AUTH_PROVIDERS_ARR = Object.values(AUTH_PROVIDERS);

export const AUTH_TOKEN_ERRORS = {
	EXPIRED: 'expired',
	INVALID: 'invalid',
} as const;

export type AuthTokenError = ValueOf<typeof AUTH_TOKEN_ERRORS>;
