<script lang="ts">
	import { melt, type DropdownMenuElements } from '@melt-ui/svelte';
	import { expoIn, expoOut } from 'svelte/easing';
	import { scale } from 'svelte/transition';

	let _melt: DropdownMenuElements['menu'];
	export { _melt as melt };
	export let as: keyof HTMLElementTagNameMap = 'menu';
</script>

<svelte:element
	this={as}
	class="navbar-menu"
	use:melt={$_melt}
	in:scale|global={{ duration: 150, start: 0.9, easing: expoOut }}
	out:scale|global={{ duration: 100, start: 0.9, easing: expoIn }}
>
	<slot groupClass="navbar-menu-group" legendClass="navbar-menu-legend" />
</svelte:element>

<style lang="scss">
	.navbar-menu {
		--menu-inset: 0.5rem;
		display: flex;
		flex-direction: column;
		gap: 0;
		font-weight: 500;
		background-color: var(--color-neutral-50);
		box-shadow: var(--shadow-lg);
		padding: var(--menu-inset);
		border-radius: var(--base-radius);
		transform-origin: top center;
		z-index: 1;
		border: var(--base-border-size) solid
			color-mix(in srgb, var(--color-neutral-500) 15%, transparent);
		@include dark {
			background-color: var(--color-neutral-800);
			border-color: transparent;
		}
	}
</style>
