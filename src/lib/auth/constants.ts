import * as m from '$i18n/messages';
import type { ValueOf } from 'type-fest';

export const USER_ROLES = {
	ADMIN: 'admin',
	EDITOR: 'editor',
	VISITOR: 'visitor',
} as const;

export type UserRole = ValueOf<typeof USER_ROLES>;

export const USER_ROLES_ARR = Object.values(USER_ROLES);

export const USER_ROLE_DEFAULT = USER_ROLES.VISITOR;

export const USER_ROLES_DETAILS = {
	[USER_ROLES.ADMIN]: {
		name: m.role_admin(),
	},
	[USER_ROLES.EDITOR]: {
		name: m.role_editor(),
	},
	[USER_ROLES.VISITOR]: {
		name: m.role_visitor(),
	},
} satisfies Record<UserRole, { name: string }>;

export const OAUTH_PROVIDERS = {
	GITHUB: 'github',
	FACEBOOK: 'facebook',
	LINKEDIN: 'linkedin',
	GOOGLE: 'google',
} as const;

export type OAuthProvider = ValueOf<typeof OAUTH_PROVIDERS>;

export const OAUTH_PROVIDERS_ARR = Object.values(OAUTH_PROVIDERS);

export const TOKEN_EXPIRY = 7_200_000; // 2 hours

export const TOKEN_MIN_EXPIRY = 3_600_000; // 1hour

export const AUTH_TOKEN_ERRORS = {
	EXPIRED: 'expired',
	INVALID: 'invalid',
} as const;

export type AuthTokenError = ValueOf<typeof AUTH_TOKEN_ERRORS>;

export const OAUTH_PROVIDERS_DETAILS = {
	[OAUTH_PROVIDERS.GITHUB]: {
		name: 'GitHub',
		disabled: false,
		cookie: 'github_oauth_state',
	},
	[OAUTH_PROVIDERS.FACEBOOK]: {
		name: 'Facebook',
		disabled: true,
		cookie: '',
	},
	[OAUTH_PROVIDERS.LINKEDIN]: {
		name: 'LinkedIn',
		disabled: true,
		cookie: '',
	},
	[OAUTH_PROVIDERS.GOOGLE]: {
		name: 'Google',
		disabled: true,
		cookie: '',
	},
} satisfies Record<OAuthProvider, { name: string; disabled: boolean; cookie: string }>;
