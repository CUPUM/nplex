<script lang="ts">
	import { page } from '$app/stores';
	import { createTranslations } from '$lib/i18n/translate';
	import type { PageData } from './$types';

	const t = createTranslations({
		fr: {
			noTitle: 'Aucun titre défini',
		},
		en: {
			noTitle: 'No title defined',
		},
	});

	$: title =
		($page.data as PageData).form?.data?.translations?.[$page.data.locale]?.title ??
		$page.data.title;
</script>

<header class="pattern-cross">
	<hgroup>
		<h1 class="heading xl">
			{#if title}
				{title}
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
		background-color: var(--color-neutral-200);
		:global(:--dark) & {
			background-color: var(--color-neutral-800);
		}
	}

	.fallback {
		opacity: 0.5;
		font-weight: 500;
	}
</style>
