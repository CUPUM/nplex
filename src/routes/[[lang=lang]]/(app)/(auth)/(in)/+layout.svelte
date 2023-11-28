<script lang="ts">
	import * as m from '$i18n/messages';
	import { OAUTH_PROVIDERS_ARR } from '$lib/auth/constants';
	import LangKey from '$lib/components/LangKey.svelte';
	import SocialProviderButton from '$lib/components/social-icons/SocialProviderButton.svelte';
</script>

<article>
	<div class="inner">
		<slot />
		<div id="or">
			<span>
				<LangKey>{m.or()}</LangKey>
			</span>
		</div>
		<section class="social">
			<h2>
				<LangKey>{m.auth_continueWith()}</LangKey>
			</h2>
			<fieldset class="providers">
				{#each OAUTH_PROVIDERS_ARR as provider, i}
					<SocialProviderButton {provider} {i} />
				{/each}
			</fieldset>
		</section>
	</div>
</article>

<style lang="postcss">
	article {
		display: flex;
		align-items: center;
		justify-content: center;
		flex: 1;
	}

	h2 {
		text-align: center;
	}

	.inner {
		display: flex;
		flex-direction: column;
		align-items: stretch;
		gap: 1rem;
		width: 100%;
		max-width: 45ch;
	}

	.social {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	#or {
		display: flex;
		flex-direction: row;
		gap: 1rem;
		font-size: var(--size-sm);
		align-items: center;
		opacity: 0.5;

		span {
			text-align: center;
		}

		&::before,
		&::after {
			content: '';
			flex: 1;
			height: 1px;
			background-color: var(--color-neutral-500);
			opacity: 0.25;
		}
	}

	.providers {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		gap: var(--base-gutter);
		font-size: var(--size-lg);
		justify-content: center;
	}
</style>
