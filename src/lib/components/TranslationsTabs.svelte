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
	import { ripple } from '$lib/actions/ripple';
	import { LOCALES_ARR, LOCALES_DETAILS, type Locale } from '$lib/i18n/constants';
	import { defineContext } from '$lib/utils/context';
	import { createTabs, melt } from '@melt-ui/svelte';
	import { X } from 'lucide-svelte';
	import { expoOut } from 'svelte/easing';
	import type { Writable } from 'svelte/store';
	import { crossfade } from 'svelte/transition';

	export let locales: Locale[] = LOCALES_ARR;
	export let legend: string;
	export let deleteFormaction: string | undefined = undefined;

	let defaultValue = $page.data.locale;
	let ctxLocale = getTranslationsTabsLocale();

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
	<div class="header">
		<legend>{legend}</legend>
		<menu class="locale-switch" use:melt={$list}>
			{#each locales as locale}
				<button
					class="locale-button"
					use:ripple={{ color: 'white', opacityStart: 0.25 }}
					use:melt={$trigger(locale)}
					lang={locale}
				>
					{LOCALES_DETAILS[locale].label}
					{#if $value === locale}
						<div in:send={{ key: 'needle' }} out:receive={{ key: 'needle' }} class="needle" />
					{/if}
				</button>
			{/each}
		</menu>
		<menu class="menu">
			{#if deleteFormaction}
				<button class="button ghost round danger" type="submit" formaction={deleteFormaction}>
					<X class="button-icon" />
				</button>
			{/if}
		</menu>
	</div>
	{#each locales as locale}
		<section class="content" lang={locale} use:melt={$content(locale)}>
			<slot {locale} value={$value} current={$value === locale} />
		</section>
	{/each}
</fieldset>

<style lang="scss">
	fieldset {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
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

	.header {
		--base-size: 2.75em;
		display: flex;
		flex-direction: row;
		gap: 0.5rem;
		align-items: flex-end;
		justify-content: stretch;
		font-size: var(--size-xs);
	}

	legend {
		align-self: stretch;
		display: flex;
		align-items: center;
		padding-inline: 1em;
		font-size: var(--size-sm);
		font-weight: 500;
		border-radius: var(--radius-full);
		background-color: var(--color-neutral-100);
		@include dark {
			background-color: var(--color-neutral-700);
		}
	}

	.menu {
		flex: 1;
		display: flex;
		flex-direction: row;
		gap: 0.5rem;
		align-items: center;
		justify-content: flex-end;
	}

	.locale-switch {
		--tab-list-padding: 2px;
		--tab-button-radius: var(--radius-full);
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		font-size: var(--size-xs);
		padding: var(--tab-list-padding);
		border-radius: calc(var(--tab-button-radius) + var(--tab-list-padding));
		background-color: color-mix(in srgb, var(--color-neutral-500) 10%, transparent);
		@include dark {
			background-color: color-mix(in srgb, var(--color-neutral-900) 50%, transparent);
		}
	}

	.locale-button {
		z-index: 0;
		position: relative;
		height: calc(var(--base-size) - 2 * var(--tab-list-padding));
		padding: 0 1em;
		font-weight: 500;
		display: flex;
		flex-direction: row;
		align-items: center;
		border-radius: var(--tab-button-radius);
		color: var(--color-neutral-600);
		background-color: color-mix(in srgb, var(--color-neutral-500) 0%, transparent);
		transition: all 0.1s ease-out;
		@include dark {
			background-color: color-mix(in srgb, var(--color-neutral-500) 0%, transparent);
			color: var(--color-neutral-400);
		}
		&:hover,
		&:focus-visible {
			&:not(&[data-state='active']) {
				color: var(--color-neutral-900);
				background-color: color-mix(in srgb, var(--color-neutral-400) 10%, transparent);
				@include dark {
					background-color: color-mix(in srgb, var(--color-neutral-400) 10%, transparent);
					color: var(--color-neutral-100);
				}
			}
		}
		&[data-state='active'] {
			cursor: default;
			color: var(--color-neutral-950);
			@include dark {
				color: var(--color-neutral-50);
			}
		}
	}

	.needle {
		z-index: -1;
		position: absolute;
		inset: 0;
		border-radius: inherit;
		background-color: white;
		@include dark {
			background-color: color-mix(in srgb, var(--color-neutral-400) 20%, transparent);
		}
	}

	.content:not([hidden]) {
		display: flex;
		flex-direction: column;
		gap: 0.5em;
		font-size: var(--size-sm);
	}
</style>
