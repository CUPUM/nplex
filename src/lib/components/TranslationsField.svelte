<script lang="ts">
	import { page } from '$app/stores';
	import { LOCALES_ARR, type Locale } from '$lib/i18n/constants';
	import { createTabs, melt } from '@melt-ui/svelte';
	import TranslationsTabsList from './TranslationsTabsList.svelte';

	export let defaultValue: Locale = $page.data.locale;
	export let centered: boolean = false;

	const {
		elements: { root, trigger, list, content },
		states: { value },
	} = createTabs({ defaultValue, loop: true, activateOnFocus: true });
</script>

<fieldset class="labeled-group" class:centered>
	<legend class="label compact">
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
	.labeled-group {
		gap: 0;
	}

	/* .content:not([hidden]) { */
	.content {
		display: flex;
		flex-direction: column;
		font-size: var(--size-sm);
		transform: translateY(0);
		opacity: 1;
		margin-top: 0.5rem;
		transition:
			all var(--duration-slow) ease-out,
			margin-top 0s;
	}

	.content[hidden] {
		visibility: collapse;
		transform: translateY(-0.5em);
		opacity: 0;
		height: 0;
		margin-top: 0;
		transition: none;
	}

	.label {
		font-size: var(--size-md);
	}

	.centered {
		align-self: center;
		max-width: var(--width-md);
		width: 100%;

		@container (width > 1200px) {
			margin-right: var(--dashboard-navbar);
		}
	}
</style>
