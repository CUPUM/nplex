<!--
	@component
	# Translations tabs
-->
<script lang="ts" context="module">
	const CTX_KEY = {};
	const [getTranslationsTabsLocale, setTranslationsTabsLocale] =
		defineContext<Writable<Locale>>(CTX_KEY);

	const deleteButton = button({ type: 'ghost', shape: 'round', special: 'danger' });
</script>

<script lang="ts">
	import { page } from '$app/stores';
	import { LOCALES_ARR, type Locale } from '$lib/i18n/constants';
	import { defineContext } from '$lib/utils/context';
	import { createTabs, melt } from '@melt-ui/svelte';
	import { ChevronDown, Trash } from 'lucide-svelte';
	import { css } from 'styled-system/css';
	import { flex } from 'styled-system/patterns';
	import { button } from 'styled-system/recipes';
	import { expoOut } from 'svelte/easing';
	import type { Writable } from 'svelte/store';
	import { fly, slide } from 'svelte/transition';
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
</script>

<fieldset
	data-compact
	use:melt={$root}
	class={css({
		position: 'relative',
		display: 'flex',
		flexDirection: 'column',
		padding: '1rem',
		backgroundColor: 'neutral.50',
		borderRadius: 'lg',
		transition: 'all token(durations.fast), background-color token(durations.medium)',
		_dark: {
			backgroundColor: 'neutral.800',
		},
		_hover: {
			_light: {
				boxShadow: 'md',
			},
			_dark: {
				backgroundColor: 'neutral.900',
			},
		},
		_focusWithin: {
			backgroundColor: 'white',
			_dark: {
				backgroundColor: 'neutral.900',
				boxShadow: 'lg',
			},
		},
	})}
>
	<!-- {#if minimized} -->
	<button
		class={css({
			cursor: 'pointer',
			position: 'absolute',
			inset: '0',
			borderRadius: 'inherit',
			opacity: '0',
			zIndex: '0',
		})}
		type="button"
		on:click={() => {
			minimized = !minimized;
		}}
	/>
	<!-- {/if} -->
	<div
		class={css({
			'display': 'flex',
			'flexDirection': 'row',
			'gap': '0.5rem',
			'alignItems': 'flex-end',
			'justifyContent': 'stretch',
			'fontSize': 'small',
			'pointerEvents': 'none',
			'zIndex': '1',
			'& > *': {
				pointerEvents: 'initial',
			},
		})}
	>
		<button
			class={css({
				display: 'flex',
				flexDirection: 'row',
				cursor: 'pointer',
				alignSelf: 'center',
				gap: '0.5em',
				paddingInlineStart: '1.25em',
				paddingInlineEnd: '0.75em',
				alignItems: 'center',
				height: 'block',
				fontWeight: '500',
				borderRadius: 'full',
				backgroundColor: 'neutral.100',
				transition: 'all token(durations.fast)',
				_dark: {
					backgroundColor: 'neutral.700',
				},
				_hoverOrFocusVisible: {
					backgroundColor: 'neutral.200',
					_dark: {
						backgroundColor: 'neutral.700',
					},
				},
			})}
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
			<div
				style:transform="rotate({minimized ? 0 : 180}deg)"
				class={css({
					transition: 'all token(durations.medium) token(easings.ease-out-expo)',
				})}
			>
				<ChevronDown
					class={css({
						height: '1.25em',
						strokeWidth: '2.5',
						opacity: '.35',
						transition: 'all token(durations.medium) token(easings.ease-out-expo)',
					})}
				/>
			</div>
		</button>
		{#if !minimized}
			<div transition:fly={{ y: 6, duration: 250, easing: expoOut }}>
				<TranslationsTabsList {list} {trigger} {value} />
			</div>
		{/if}
		<menu
			class={flex({
				'flex': '1',
				'flexDirection': 'row',
				'gap': '0.5rem',
				'alignItems': 'center',
				'justifyContent': 'flex-end',
				'pointerEvents': 'none',
				'& > *': {
					pointerEvents: 'initial',
				},
			})}
		>
			{#if deleteFormaction}
				<button class={deleteButton.root} type="submit" formaction={deleteFormaction}>
					<Trash class={deleteButton.icon} />
				</button>
			{/if}
		</menu>
	</div>
	{#if !minimized}
		<div class={css({ zIndex: '1' })} transition:slide={{ easing: expoOut, duration: 350 }}>
			{#each locales as locale}
				<section
					class={css({
						_notHidden: {
							display: 'flex',
							flexDirection: 'column',
							gap: '0.5rem',
							marginTop: '1rem',
							fontSize: 'small',
						},
					})}
					lang={locale}
					use:melt={$content(locale)}
				>
					<slot {locale} {minimized} value={$value} current={$value === locale} />
				</section>
			{/each}
		</div>
	{/if}
</fieldset>
