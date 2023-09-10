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
	import { expoOut } from 'svelte/easing';
	import type { Writable } from 'svelte/store';
	import { crossfade } from 'svelte/transition';

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

	const [send, receive] = crossfade({ duration: 150, easing: expoOut });
</script>

<fieldset use:melt={$root}>
	<div class="bar">
		{#if $$slots.legend}
			<legend>
				<slot name="legend" />
			</legend>
		{/if}
		<menu class="list" use:melt={$list}>
			{#each locales as locale}
				<button class="tab-button" use:ripple use:melt={$trigger(locale)} lang={locale}>
					{LOCALES_DETAILS[locale].label}
					{#if $value === locale}
						<div in:send={{ key: 'needle' }} out:receive={{ key: 'needle' }} class="needle" />
					{/if}
				</button>
			{/each}
		</menu>
	</div>
	{#each locales as locale}
		<section class="content" lang={locale} use:melt={$content(locale)}>
			<slot {locale} />
		</section>
	{/each}
</fieldset>

<style lang="scss">
	fieldset {
		display: flex;
		flex-direction: column;
		gap: 3px;
	}

	.bar {
		display: flex;
		flex-direction: row;
		gap: 1rem;
		align-items: flex-end;
		justify-content: flex-start;
	}

	legend {
		font-size: var(--size-xl);
		font-weight: 550;
		padding-bottom: 0.5rem;
	}

	.list {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		font-size: var(--size-xs);
	}

	.tab-button {
		position: relative;
		height: 2.75em;
		padding: 0 1em;
		font-weight: 500;
		display: flex;
		flex-direction: row;
		align-items: center;
		border-radius: var(--radius-sm);
		color: var(--color-neutral-600);
		background-color: color-mix(in srgb, var(--color-neutral-500) 0%, transparent);
		transition: all 0.1s ease-out;
		@include dark {
			color: var(--color-neutral-400);
		}
		&:hover,
		&:focus-visible {
			&:not(&[data-state='active']) {
				color: var(--color-neutral-900);
				background-color: color-mix(in srgb, var(--color-neutral-500) 10%, transparent);
				@include dark {
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
		background-color: color-mix(in srgb, var(--color-neutral-500) 20%, transparent);
	}

	.content {
		& > :global(*) {
			width: 100%;
		}
	}
</style>
