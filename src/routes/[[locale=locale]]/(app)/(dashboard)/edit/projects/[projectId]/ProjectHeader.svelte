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

<hgroup>
	<h1 class="heading xl">
		{#if $page.data.title}
			{$page.data.title}
		{:else}
			<span class="fallback">{$t.noTitle}</span>
		{/if}
	</h1>
</hgroup>

<style lang="postcss">
	hgroup {
		padding: 2rem;
		min-height: 25vh;
	}

	.fallback {
		opacity: 0.5;
		font-weight: 500;
	}
</style>
