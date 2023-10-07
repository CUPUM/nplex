<script lang="ts">
	import { page } from '$app/stores';
	import { LOCALES_ARR, type Locale } from '$lib/i18n/constants';
	import { createTabs, melt } from '@melt-ui/svelte';
	import TranslationsTabsList from './TranslationsTabsList.svelte';

	export let defaultValue: Locale = $page.data.locale;

	const {
		elements: { root, trigger, list, content },
		states: { value },
	} = createTabs({ defaultValue, loop: true });
</script>

<fieldset>
	<legend>
		<div class="legend-slot">
			<slot name="legend" />
		</div>
		<TranslationsTabsList {trigger} {list} {value} />
	</legend>
	{#each LOCALES_ARR as locale}
		<div class="content" lang={locale} use:melt={$content(locale)}>
			<slot {locale} {value} current={$value === locale} />
		</div>
	{/each}
</fieldset>

<style lang="postcss">
	.content:not([hidden]) {
		display: flex;
		flex-direction: column;
		gap: 0.5em;
		margin-top: 1rem;
		font-size: var(--size-sm);
	}
</style>
