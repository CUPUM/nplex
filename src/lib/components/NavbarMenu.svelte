<script lang="ts">
	import { melt, type DropdownMenuElements } from '@melt-ui/svelte';
	import { expoOut } from 'svelte/easing';
	import { fly, scale } from 'svelte/transition';

	let _melt: DropdownMenuElements['menu'];
	export { _melt as melt };
	export let as: keyof HTMLElementTagNameMap = 'menu';
</script>

<svelte:element
	this={as}
	class="navbar-menu"
	use:melt={$_melt}
	out:fly|global={{ duration: 150, y: -6, easing: expoOut }}
	in:scale|global={{ duration: 100, start: 0.9, easing: expoOut }}
>
	<slot groupClass="navbar-menu-group" legendClass="navbar-menu-legend" />
</svelte:element>

<style lang="postcss">
	.navbar-menu {
		--menu-nesting: 0.5rem;
		display: flex;
		flex-direction: column;
		gap: 0;
		font-weight: 500;
		box-shadow: 0 15px 50px -10px rgba(0, 10, 20, 0.1);
		padding: var(--menu-nesting);
		border-radius: var(--base-radius);
		transform-origin: top;
		background: var(--color-neutral-100);
		outline: none;
		border: var(--base-border-width) solid var(--base-border-color-dim);
		z-index: 1;
		:global(:--dark) & {
			background: var(--color-neutral-900);
			box-shadow: none;
		}
	}
</style>
