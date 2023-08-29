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

export const SOCIAL_PROVIDERS = {
	GITHUB: 'github',
	FACEBOOK: 'facebook',
	LINKEDIN: 'linkedin',
	GOOGLE: 'google',
} as const;

export type SocialProvider = ValueOf<typeof SOCIAL_PROVIDERS>;

export const SOCIAL_PROVIDERS_ARR = Object.values(SOCIAL_PROVIDERS);

export const AUTH_PROVIDERS = {
	...CREDENTIALS_PROVIDERS,
	...SOCIAL_PROVIDERS,
} as const;

export type AuthProvider = ValueOf<typeof AUTH_PROVIDERS>;

export const AUTH_PROVIDERS_ARR = Object.values(AUTH_PROVIDERS);

export const AUTH_TOKEN_ERRORS = {
	EXPIRED: 'expired',
	INVALID: 'invalid',
} as const;

export type AuthTokenError = ValueOf<typeof AUTH_TOKEN_ERRORS>;
