<script lang="ts">
	import { SOCIAL_PROVIDERS_ARR } from '$lib/auth/constants';
	import SocialProviderButton from '$lib/components/social-icons/SocialProviderButton.svelte';
	import { createTranslations } from '$lib/i18n/translate';

	const t = createTranslations({
		fr: {
			or: 'Ou',
			social: 'Conectez-vous via',
		},
		en: {
			or: 'Or',
			social: 'Sign in using',
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
			<h2>{$t.social}&thinsp;:</h2>
			<fieldset class="providers">
				{#each SOCIAL_PROVIDERS_ARR as provider}
					<SocialProviderButton {provider} />
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
	}

	.inner {
		display: flex;
		flex-direction: column;
		align-items: stretch;
		gap: 2rem;
		width: 100%;
		max-width: var(--width-col);
	}

	.social {
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	#or {
		display: flex;
		flex-direction: row;
		gap: 1rem;
		font-size: var(--size-xs);
		font-weight: 450;
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
			opacity: 0.5;
		}
	}

	.providers {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		gap: 1rem;
	}
</style>
