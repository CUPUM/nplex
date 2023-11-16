<!--
	@component
	Dropdown content
-->
<script lang="ts" generics="T extends Select | Combobox">
	import type { Combobox, Select } from '@melt-ui/svelte';
	import { expoOut } from 'svelte/easing';
	import { writable } from 'svelte/store';
	import { fly } from 'svelte/transition';

	export let as: keyof HTMLElementTagNameMap = 'menu';
	export let menu: T['elements']['menu'];
	export let open: T['states']['open'];

	const test = writable((node: HTMLElement) => ({ destroy() {} }));
</script>

{#if $open}
	<svelte:element
		this={as}
		class="select-menu"
		{...$menu}
		use:$menu.action
		in:fly={{ y: -8, duration: 200, easing: expoOut }}
	>
		<div class="select-menu-content">
			<slot />
		</div>
	</svelte:element>
{/if}

<style lang="postcss">
	.select-menu {
		--menu-nesting: var(--base-nesting);
		--menu-radius: var(--base-radius);
		--_base-radius: calc(var(--menu-radius) - var(--menu-nesting));
		--_base-padding: calc(var(--base-padding) - var(--menu-nesting));
		--_base-size: calc(var(--base-size) - var(--menu-nesting));
		position: relative;
		flex: none;
		align-self: unset;
		border-radius: var(--menu-radius);
		border: var(--base-border-width) solid
			color-mix(in srgb, var(--color-neutral-500) 10%, transparent);
		padding: var(--menu-nesting);
		background-color: white;
		overflow-y: auto;
		display: flex;
		flex-direction: column;
		font-size: 0.9em;
		:global(:--dark) & {
			background-color: var(--color-neutral-800);
		}

		.select-menu-content {
			--base-radius: var(--_base-radius);
			--base-size: var(--_base-size);
			--base-padding: var(--_base-padding);
			max-width: 65ch;
		}
	}
</style>
