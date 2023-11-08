<script lang="ts">
	import { page } from '$app/stores';
	import { createTranslations } from '$lib/i18n/translate';

	const t = createTranslations({
		fr: {
			noTitle: 'Aucun titre défini',
		},
		en: {
			noTitle: 'No title defined',
		},
	});
</script>

<header>
	<hgroup>
		<h1 class="heading xl">
			{#if $page.data.title}
				{$page.data.title}
			{:else}
				<span class="fallback">{$t.noTitle}</span>
			{/if}
		</h1>
	</hgroup>
</header>

<style lang="postcss">
	header {
		position: relative;
		padding: 2rem;
		min-height: 200px;
		opacity: 1;
		border-radius: inherit;
		--pattern-color: color-mix(in srgb, var(--color-primary-600) 20%, transparent);
		color: var(--color-primary-800);
		background: radial-gradient(circle, var(--pattern-color) 1px, transparent 1.1px);
		background-size: var(--size-xl) var(--size-xl);
		background-repeat: repeat;
		background-position: center;
		background-color: color-mix(in srgb, var(--color-primary-700) 5%, transparent);
		:global(:--dark) & {
			color: var(--color-primary-400);
			/* --pattern-color: var(--color-primary-700); */
		}
	}

	.fallback {
		opacity: 0.5;
		font-weight: 500;
	}
</style>
