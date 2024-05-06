<script lang="ts">
	import * as m from '$i18n/messages';
	import { OAUTH_PROVIDERS_ARR } from '$lib/auth/constants';
	import SocialProviderButton from '$lib/components/patterns/button-social-provider.svelte';
</script>

<article>
	<div class="inner">
		<slot />
		<div id="or">
			<span>
				{m.or()}
			</span>
		</div>
		<section class="social">
			<h2>
				{m.auth_continue_with()}
			</h2>
			<fieldset class="providers">
				{#each OAUTH_PROVIDERS_ARR as provider, i}
					<SocialProviderButton {provider} {i} />
				{/each}
			</fieldset>
		</section>
	</div>
</article>

<style>
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
