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
	import type { LoadEvent, LoadOutput } from '@sveltejs/kit';
	import { onDestroy, onMount } from 'svelte';

	let searchbarHeight;

	backgroundColor.reset();

	onMount(() => {});
	onDestroy(() => {});
</script>

<div id="explore" style:--searchbar-height="{searchbarHeight || 0}px">
	{#if $page.stuff.showExploreSearchbar}
		<div id="searchbar-container" bind:offsetHeight={searchbarHeight}>
			<ExploreSearchbar />
		</div>
	{/if}
	<slot />
</div>

<style lang="scss">
	#explore {
		--search-width: 400px;
		flex: 1;
	}

	#searchbar-container {
		position: absolute;
		display: block;
		width: 100%;
	}
</style>
