<script lang="ts">
	import * as m from '$i18n/messages';
	import {
		OAUTH_PROVIDERS,
		OAUTH_PROVIDERS_ARR,
		OAUTH_PROVIDERS_DETAILS,
		type OAuthProvider,
	} from '$lib/auth/constants';
	import IconFacebook from '$lib/components/primitives/icon-facebook.svelte';
	import IconGithub from '$lib/components/primitives/icon-github.svelte';
	import IconGoogle from '$lib/components/primitives/icon-google.svelte';
	import IconLinkedin from '$lib/components/primitives/icon-linkedin.svelte';
	import { linkAttributes } from '$lib/components/primitives/link.svelte';
	import { ripple } from '$lib/components/primitives/ripple.svelte';

	let { children } = $props();

	const logos = {
		[OAUTH_PROVIDERS.GITHUB]: IconGithub,
		[OAUTH_PROVIDERS.FACEBOOK]: IconFacebook,
		[OAUTH_PROVIDERS.LINKEDIN]: IconLinkedin,
		[OAUTH_PROVIDERS.GOOGLE]: IconGoogle,
	} satisfies Record<OAuthProvider, unknown>;
</script>

<article class="flex flex-1 items-center justify-center">
	<div class="gap-padding p-padding flex w-full max-w-sm flex-col items-stretch">
		{@render children()}
		<section class="gap-inherit mt-md flex flex-col">
			<div class="gap-inherit flex flex-row items-center">
				<hr class="border-base/softer mx-padding flex-1" />
				<span
					class="text-center text-sm text-base/softer font-semibold font-thin first-letter:uppercase"
				>
					{m.or()}
					{m.auth_continue_with().toLowerCase()}
				</span>
				<hr class="border-base/softer mx-padding flex-1" />
			</div>
			<fieldset class="gap-input-group-gap flex flex-row justify-center">
				{#each OAUTH_PROVIDERS_ARR as provider, i}
					{@const Logo = logos[provider]}
					<a
						class="button button-bordered aspect-square"
						{...linkAttributes(`/login/${provider}`)}
						aria-disabled={!OAUTH_PROVIDERS_DETAILS[provider].enabled}
						use:ripple
					>
						<Logo />
					</a>
				{/each}
			</fieldset>
		</section>
	</div>
</article>
