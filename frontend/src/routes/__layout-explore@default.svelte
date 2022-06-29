<!--
	@component
	This layout inherits from the adjacent unnamed (default) layout.
-->
<script lang="ts" context="module">
	export async function load({ stuff }: LoadEvent): Promise<LoadOutput> {
		return {
			stuff: {
				showCategoryNav: true,
				showExploreSearchbar: true,
			},
		};
	}
</script>

<script lang="ts">
	import { page } from '$app/stores';

	import ExploreSearchbar from '$components/complexes/ExploreSearchbar.svelte';
	import { backgroundColor } from '$stores/backgroundColor';
	import { cssSize } from '$utils/css';
	import type { LoadEvent, LoadOutput } from '@sveltejs/kit';
	import { onDestroy, onMount } from 'svelte';

	const searchWidth = cssSize(400);
	let searchbarHeight = 0;

	backgroundColor.reset();

	onMount(() => {});
	onDestroy(() => {});
</script>

<div id="explore" style:--search-width={searchWidth} style:--searchbar-height={cssSize(searchbarHeight)}>
	{#if $page.stuff.showExploreSearchbar}
		<div id="searchbar-container" bind:offsetHeight={searchbarHeight}>
			<ExploreSearchbar />
		</div>
	{/if}
	<slot />
</div>

<style lang="scss">
	#searchbar-container {
		position: absolute;
		display: block;
		top: var(--navbar-height);
		width: 100%;
	}
</style>
