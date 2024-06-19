import * as m from '$i18n/messages';
import type { ConditionalKeys, ValueOf } from 'type-fest';

export const ROLES = {
	ADMIN: 'admin',
	EDITOR: 'editor',
	VISITOR: 'visitor',
} as const;

export type Role = ValueOf<typeof ROLES>;

export const ROLES_ARR = Object.values(ROLES);

export function isRole(maybeRole: unknown): maybeRole is Role {
	return ROLES_ARR.indexOf(maybeRole as Role) > -1;
}

export const ROLE_DEFAULT = ROLES.VISITOR;

export const ROLES_DETAILS = {
	[ROLES.ADMIN]: {
		name: m.role_admin(),
	},
	[ROLES.EDITOR]: {
		name: m.role_editor(),
	},
	[ROLES.VISITOR]: {
		name: m.role_visitor(),
	},
} satisfies Record<Role, { name: string }>;

export const TOKEN_EXPIRY = 7_200_000; // 2 hours

export const TOKEN_MIN_EXPIRY = 3_600_000; // 1hour

export const AUTH_TOKEN_ERRORS = {
	EXPIRED: 'expired',
	INVALID: 'invalid',
} as const;

export type AuthTokenError = ValueOf<typeof AUTH_TOKEN_ERRORS>;

export const OAUTH_PROVIDERS = {
	GITHUB: 'github',
	FACEBOOK: 'facebook',
	LINKEDIN: 'linkedin',
	GOOGLE: 'google',
} as const;

export type OAuthProvider = ValueOf<typeof OAUTH_PROVIDERS>;

export const OAUTH_PROVIDERS_ARR = Object.values(OAUTH_PROVIDERS);

export function isOAuthProvider(maybeOAuthProvider: unknown): maybeOAuthProvider is OAuthProvider {
	return OAUTH_PROVIDERS_ARR.indexOf(maybeOAuthProvider as OAuthProvider) > -1;
}

export const OAUTH_PROVIDERS_DETAILS: Record<
	OAuthProvider,
	{ name: string } & (
		| { enabled?: false; cookie?: undefined }
		| { enabled: boolean; cookie: string }
	)
> = {
	[OAUTH_PROVIDERS.GITHUB]: {
		name: 'GitHub',
		enabled: true,
		cookie: 'github_oauth_state',
	},
	[OAUTH_PROVIDERS.FACEBOOK]: {
		name: 'Facebook',
	},
	[OAUTH_PROVIDERS.LINKEDIN]: {
		name: 'LinkedIn',
	},
	[OAUTH_PROVIDERS.GOOGLE]: {
		name: 'Google',
	},
};

export type IntegratedOAuthProvider = ConditionalKeys<
	typeof OAUTH_PROVIDERS_DETAILS,
	{ cookie: string }
>;

export const INTEGRATED_OAUTH_PROVIDERS_ARR = OAUTH_PROVIDERS_ARR.filter(
	(p) => 'cookie' in OAUTH_PROVIDERS_DETAILS[p]
) as IntegratedOAuthProvider[];

export function isIntegratedOAuthProvider(
	maybeIntegratedOAuthProvider: unknown
): maybeIntegratedOAuthProvider is IntegratedOAuthProvider {
	return (
		INTEGRATED_OAUTH_PROVIDERS_ARR.indexOf(
			maybeIntegratedOAuthProvider as IntegratedOAuthProvider
		) > -1
	);
}
