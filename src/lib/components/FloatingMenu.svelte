<!--
	@component
	Dropdown content 
	Pre-styles content box for dropdowns, popovers, selects, etc.
-->
<script lang="ts" context="module">
</script>

<script lang="ts">
	import type { ComboboxElements, DropdownMenuElements } from '@melt-ui/svelte';

	export let as: keyof HTMLElementTagNameMap = 'menu';
	export let use: DropdownMenuElements['menu'] | ComboboxElements['menu'];
</script>

<svelte:element this={as} class="menu">
	<slot />
</svelte:element>

<style lang="postcss">
	.menu {
		border-radius: var(--radius-md);
		background-color: var(--color-neutral-50);
		display: flex;
		flex-direction: column;
		:global(:--dark) & {
			background-color: var(--color-neutral-800);
		}
	}
</style>
