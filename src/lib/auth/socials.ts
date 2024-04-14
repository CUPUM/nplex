import IconFacebook from '$lib/components/primitives/icon-facebook.svelte';
import IconGithub from '$lib/components/social-icons/Github.svelte';
import IconGoogle from '$lib/components/social-icons/Google.svelte';
import IconLinkedin from '$lib/components/social-icons/Linkedin.svelte';
import type { ComponentType } from 'svelte';
import { OAUTH_PROVIDERS, type OAuthProvider } from './constants';

export type SocialProviderDetails = { name: string; icon: ComponentType; disabled: boolean };

/**
 * List of supported OAuth providers and planned but not implemented additional providers.
 *
 * Isolate from constants to avoid interfering with drizzle-kit (scripts can't resolve svelte
 * files).
 */
export const SOCIAL_PROVIDERS_DETAILS = {
	[OAUTH_PROVIDERS.GITHUB]: {
		name: 'GitHub',
		icon: IconGithub,
		disabled: false,
	},
	facebook: {
		name: 'Facebook',
		icon: IconFacebook,
		disabled: true,
	},
	linkedin: {
		name: 'LinkedIn',
		icon: IconLinkedin,
		disabled: true,
	},
	google: {
		name: 'Google',
		icon: IconGoogle,
		disabled: true,
	},
} satisfies Record<OAuthProvider | string, SocialProviderDetails>;

export const ICON_SIZE_DEFAULT = '1em';
