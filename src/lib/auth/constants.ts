import {
	IconBrandFacebook,
	IconBrandGithub,
	IconBrandGoogle,
	IconBrandLinkedin,
	type Icon,
} from '@tabler/icons-svelte';
import type { ComponentType } from 'svelte';
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

export const SOCIALS_PROVIDERS = {
	GITHUB: 'github',
	FACEBOOK: 'facebook',
	LINKEDIN: 'linkedin',
	GOOGLE: 'google',
} as const;

export type SocialProvider = ValueOf<typeof SOCIALS_PROVIDERS>;

export const AUTH_PROVIDERS = {
	...CREDENTIALS_PROVIDERS,
	...SOCIALS_PROVIDERS,
} as const;

export type AuthProvider = ValueOf<typeof AUTH_PROVIDERS>;

export const AUTH_PROVIDERS_ARR = Object.values(AUTH_PROVIDERS);

export const SOCIAL_PROVIDERS_DETAILS = {
	[AUTH_PROVIDERS.GITHUB]: {
		name: 'GitHub',
		icon: IconBrandGithub,
	},
	[AUTH_PROVIDERS.FACEBOOK]: {
		name: 'Facebook',
		icon: IconBrandFacebook,
	},
	[AUTH_PROVIDERS.LINKEDIN]: {
		name: 'LinkedIn',
		icon: IconBrandLinkedin,
	},
	[AUTH_PROVIDERS.GOOGLE]: {
		name: 'Google',
		icon: IconBrandGoogle,
	},
} satisfies Record<SocialProvider, { name: string; icon: ComponentType<Icon> }>;

export const AUTH_TOKEN_ERRORS = {
	EXPIRED: 'expired',
	INVALID: 'invalid',
} as const;

export type AuthTokenError = ValueOf<typeof AUTH_TOKEN_ERRORS>;
