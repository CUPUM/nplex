import IconFacebook from '$lib/components/social-icons/IconFacebook.svelte';
import IconGithub from '$lib/components/social-icons/IconGithub.svelte';
import IconGoogle from '$lib/components/social-icons/IconGoogle.svelte';
import IconLinkedin from '$lib/components/social-icons/IconLinkedin.svelte';
import type { ComponentType } from 'svelte';
import { AUTH_PROVIDERS, type SocialProvider } from './constants';

// Isolate from constants to avoid interfering with drizzle-kit (scripts can't resolve svelte files).
export const SOCIAL_PROVIDERS_DETAILS = {
	[AUTH_PROVIDERS.GITHUB]: {
		name: 'GitHub',
		icon: IconGithub,
	},
	[AUTH_PROVIDERS.FACEBOOK]: {
		name: 'Facebook',
		icon: IconFacebook,
	},
	[AUTH_PROVIDERS.LINKEDIN]: {
		name: 'LinkedIn',
		icon: IconLinkedin,
	},
	[AUTH_PROVIDERS.GOOGLE]: {
		name: 'Google',
		icon: IconGoogle,
	},
} satisfies Record<SocialProvider, { name: string; icon: ComponentType }>;

export const ICON_SIZE_DEFAULT = 48;
