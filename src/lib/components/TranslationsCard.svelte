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
	import { createTabs, melt } from '@melt-ui/svelte';
	import { ChevronDown, Trash } from 'lucide-svelte';
	import { expoOut } from 'svelte/easing';
	import type { Writable } from 'svelte/store';
	import { crossfade, fly, slide } from 'svelte/transition';
	import TranslationsTabsList from './TranslationsTabsList.svelte';

	export let locales: Locale[] = LOCALES_ARR;
	export let legend: string;
	export let legendMinimized: string | undefined | null = undefined;
	export let deleteFormaction: string | undefined = undefined;
	export let minimized = true;

	let defaultValue = $page.data.locale;
	let ctxLocale = getTranslationsTabsLocale();
	$: legendCoalesced = minimized ? legendMinimized ?? legend : legend;

	if (ctxLocale && $ctxLocale && locales.indexOf($ctxLocale) > -1) {
		defaultValue = $ctxLocale;
	}

	const {
		elements: { root, list, trigger, content },
		states: { value },
	} = createTabs({ defaultValue, loop: true });

	const [send, receive] = crossfade({ duration: 150, easing: expoOut });
</script>

<fieldset use:melt={$root}>
	<!-- {#if minimized} -->
	<button
		class="fill-button"
		type="button"
		on:click={() => {
			minimized = !minimized;
		}}
	/>
	<!-- {/if} -->
	<div class="header">
		<button
			class="legend"
			type="button"
			on:click={() => {
				minimized = !minimized;
			}}
		>
			{#key legendCoalesced}
				<span in:fly={{ y: 4, easing: expoOut }}>
					{legendCoalesced}
				</span>
			{/key}
			<div style:transform="rotate({minimized ? 0 : 180}deg)" style:transition="all .2s ease-out">
				<ChevronDown class="legend-icon" />
			</div>
		</button>
		{#if !minimized}
			<div class="locales" transition:fly={{ y: 6, duration: 250, easing: expoOut }}>
				<TranslationsTabsList {list} {trigger} {value} />
			</div>
		{/if}
		<menu class="menu">
			{#if deleteFormaction}
				<button class="button ghost round danger" type="submit" formaction={deleteFormaction}>
					<Trash class="button-icon" />
				</button>
			{/if}
		</menu>
	</div>
	{#if !minimized}
		<div class="content-wrap" transition:slide={{ easing: expoOut, duration: 350 }}>
			{#each locales as locale}
				<section class="content" lang={locale} use:melt={$content(locale)}>
					<slot {locale} {minimized} value={$value} current={$value === locale} />
				</section>
			{/each}
		</div>
	{/if}
</fieldset>

<style lang="scss">
	fieldset {
		position: relative;
		display: flex;
		flex-direction: column;
		padding: 0.75rem;
		background-color: var(--color-neutral-50);
		transition:
			all 0.1s,
			background-color 0.25s;
		border-radius: var(--radius-lg);
		@include dark {
			background-color: var(--color-neutral-800);
		}
		&:hover {
			@include light {
				box-shadow: var(--shadow-md);
			}
			@include dark {
				background-color: var(--color-neutral-950);
			}
		}
		&:focus-within {
			background-color: white;
			@include dark {
				background-color: var(--color-neutral-950);
				box-shadow: var(--shadow-lg);
			}
		}
	}

	.fill-button {
		position: absolute;
		inset: 0;
		border-radius: inherit;
		opacity: 0;
		z-index: 0;
	}

	.header {
		--base-size: 2.75em;
		display: flex;
		flex-direction: row;
		gap: 0.5rem;
		align-items: flex-end;
		justify-content: stretch;
		font-size: var(--size-xs);
		pointer-events: none;
		z-index: 1;
		& > * {
			pointer-events: initial;
		}
	}

	.legend {
		align-self: stretch;
		display: flex;
		flex-direction: row;
		gap: 0.5em;
		padding-inline: 1.25em 0.75em;
		align-items: center;
		height: var(--base-size);
		font-weight: 500;
		border-radius: var(--radius-full);
		background-color: var(--color-neutral-100);
		transition: all 0.1s;
		@include dark {
			background-color: var(--color-neutral-700);
		}

		&:hover,
		&:focus-visible {
			background-color: var(--color-neutral-200);
			@include dark {
				background-color: var(--color-neutral-600);
			}
		}

		:global(.legend-icon) {
			height: 1.25em;
			stroke-width: 2.5;
			opacity: 0.35;
			transition: all 0.25s ease-out;
		}
	}

	.menu {
		flex: 1;
		display: flex;
		flex-direction: row;
		gap: 0.5rem;
		align-items: center;
		justify-content: flex-end;
		pointer-events: none;
		& > * {
			pointer-events: initial;
		}
	}

	.content-wrap {
		z-index: 1;
	}

	.content:not([hidden]) {
		display: flex;
		flex-direction: column;
		gap: 0.5em;
		margin-top: 1rem;
		font-size: var(--size-sm);
	}
</style>
