import IconFacebook from '$lib/components/social-icons/Facebook.svelte';
import IconGithub from '$lib/components/social-icons/Github.svelte';
import IconGoogle from '$lib/components/social-icons/Google.svelte';
import IconLinkedin from '$lib/components/social-icons/Linkedin.svelte';
import type { ComponentType } from 'svelte';
import { AUTH_PROVIDERS, type OAuthProvider } from './constants';

export type SocialProviderDetails = { name: string; icon: ComponentType; disabled: boolean };

/**
 * Isolate from constants to avoid interfering with drizzle-kit (scripts can't resolve svelte
 * files).
 */
export const OAUTH_PROVIDERS_DETAILS = {
	[AUTH_PROVIDERS.GITHUB]: {
		name: 'GitHub',
		icon: IconGithub,
		disabled: false,
	},
	[AUTH_PROVIDERS.FACEBOOK]: {
		name: 'Facebook',
		icon: IconFacebook,
		disabled: true,
	},
	[AUTH_PROVIDERS.LINKEDIN]: {
		name: 'LinkedIn',
		icon: IconLinkedin,
		disabled: true,
	},
	[AUTH_PROVIDERS.GOOGLE]: {
		name: 'Google',
		icon: IconGoogle,
		disabled: true,
	},
} satisfies Record<OAuthProvider, SocialProviderDetails>;

export const ICON_SIZE_DEFAULT = '1em';
