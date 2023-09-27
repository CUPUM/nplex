<script lang="ts">
	import { OAUTH_PROVIDERS_ARR } from '$lib/auth/constants';
	import SocialProviderButton from '$lib/components/social-icons/SocialProviderButton.svelte';
	import { createTranslations } from '$lib/i18n/translate';

	const t = createTranslations({
		fr: {
			or: 'ou',
			social: 'Continuer avec',
		},
		en: {
			or: 'or',
			social: 'Continue using',
		},
	});
</script>

<article>
	<div class="inner">
		<slot />
		<div id="or">
			<span>
				{$t.or}
			</span>
		</div>
		<section class="social">
			<h2>{$t.social}</h2>
			<fieldset class="providers">
				{#each OAUTH_PROVIDERS_ARR as provider, i}
					<SocialProviderButton {provider} {i} />
				{/each}
			</fieldset>
		</section>
	</div>
</article>

<style lang="scss">
	article {
		display: flex;
		align-items: center;
		justify-content: center;
		flex: 1;
	}

	h2 {
		text-align: center;
		font-size: var(--size-sm);
	}

	.inner {
		display: flex;
		flex-direction: column;
		align-items: stretch;
		gap: 2rem;
		width: 100%;
		max-width: var(--width-center);
	}

	.social {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	#or {
		display: flex;
		flex-direction: row;
		gap: 1rem;
		font-size: var(--size-xs);
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
		gap: 1em;
		font-size: var(--size-lg);
		justify-content: center;
	}
</style>
