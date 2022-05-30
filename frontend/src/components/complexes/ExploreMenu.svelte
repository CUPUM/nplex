<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import ExploreSearch from './ExploreSearch.svelte';
	import ExploreTokens from './ExploreTokens.svelte';
	import ExploreToolbar from './ExploreToolbar.svelte';

	export let menuHeight;

	let menuRef: HTMLDivElement;
	let resizeObserver: ResizeObserver;

	function updateMenuHeight() {
		menuHeight = menuRef.offsetHeight;
	}

	onMount(() => {
		resizeObserver = new ResizeObserver(updateMenuHeight);
		resizeObserver.observe(menuRef);
	});

	onDestroy(() => {
		resizeObserver?.disconnect();
	});
</script>

<div bind:this={menuRef}>
	<ExploreSearch />
	<ExploreTokens />
	<ExploreToolbar />
</div>

<style lang="postcss">
	div {
		z-index: 1;
		position: absolute;
		top: 1rem;
		left: 2rem;
		right: 1rem;
		margin: 0;
		padding: 0;
		display: grid;
		grid-auto-flow: dense;
		grid-template-columns:
			[search-start]
			calc(var(--search-width) - 2rem)
			[search-end tokens-start]
			auto
			[tokens-end toolbar-start]
			min-content
			[toolbar-end];
		align-items: center;
		gap: 0;
	}
</style>
