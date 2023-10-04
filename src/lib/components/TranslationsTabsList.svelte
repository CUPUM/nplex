<script lang="ts">
	import { ripple } from '$lib/actions/ripple';
	import { LOCALES_ARR, LOCALES_DETAILS } from '$lib/i18n/constants';
	import { melt, type TabsElements, type TabsStates } from '@melt-ui/svelte';
	import { expoOut } from 'svelte/easing';
	import { crossfade } from 'svelte/transition';

	export let list: TabsElements['list'];
	export let trigger: TabsElements['trigger'];
	export let value: TabsStates['value'];

	const [send, receive] = crossfade({ duration: 150, easing: expoOut });
</script>

<menu use:melt={$list}>
	{#each LOCALES_ARR as locale}
		<button
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

<style lang="scss">
	menu {
		--tab-list-padding: 3px;
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

	button {
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
</style>
