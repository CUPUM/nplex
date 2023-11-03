<!--
	@component
	Dropdown content
-->
<script lang="ts" generics="T extends Select | Combobox">
	import { expoOut } from 'svelte/easing';

	import { scale } from 'svelte/transition';

	import type { Combobox, Select } from '@melt-ui/svelte';
	import { writable } from 'svelte/store';

	export let as: keyof HTMLElementTagNameMap = 'menu';
	export let menu: T['elements']['menu'];
	export let open: T['states']['open'];

	const test = writable((node: HTMLElement) => ({ destroy() {} }));
</script>

{#if $open}
	<svelte:element
		this={as}
		class="menu"
		{...$menu}
		use:$menu.action
		in:scale={{ start: 0.95, duration: 150, easing: expoOut }}
		out:scale={{ start: 0.9, duration: 100 }}
	>
		<slot />
	</svelte:element>
{/if}

<style lang="postcss">
	.menu {
		--menu-inset: var(--base-inset);
		--menu-radius: var(--base-radius);
		position: relative;
		border-radius: var(--menu-radius);
		padding: var(--menu-inset);
		background-color: var(--color-neutral-50);
		box-shadow: var(--shadow-md);
		display: flex;
		flex-direction: column;
		:global(:--dark) & {
			background-color: var(--color-neutral-800);
		}
	}
</style>
