<!--
	@component
	# Translations tabs
-->
<script lang="ts" context="module">
	const CTX_KEY = {};
	const [getTranslationsTabsLocale, setTranslationsTabsLocale] =
		defineContext<Writable<Locale>>(CTX_KEY);
</script>

<script lang="ts">
	import { page } from '$app/stores';
	import { LOCALES_ARR, type Locale } from '$lib/i18n/constants';
	import { defineContext } from '$lib/utils/context';
	import { createTabs } from '@melt-ui/svelte';
	import type { Writable } from 'svelte/store';

	export let locales: Locale[] = LOCALES_ARR;

	let defaultValue = $page.data.locale;
	let ctxLocale: ReturnType<typeof getTranslationsTabsLocale> | undefined = undefined;
	try {
		ctxLocale = getTranslationsTabsLocale();
	} catch (error) {}

	if (ctxLocale && $ctxLocale && locales.indexOf($ctxLocale) > -1) {
		defaultValue = $ctxLocale;
	}

	const {
		elements: { root, list, trigger, content },
		states: { value },
	} = createTabs({ defaultValue });
</script>

<fieldset>
	{#if $$slots.legend}
		<legend>
			<slot name="legend" />
		</legend>
	{/if}
	<menu class="list"></menu>
	<section class="content">
		{#each locales as locale}
			<slot {locale}>
				Tab: {locale}
			</slot>
		{/each}
	</section>
</fieldset>

<style lang="scss">
	fieldset {
		display: flex;
		flex-direction: column;
	}

	.list {
	}

	.content {
	}
</style>
