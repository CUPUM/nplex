<!--
	This layout inherits from the adjacent unnamed layout
-->
<script lang="ts">
	import ExploreFilters from '$components/complexes/ExploreFilters.svelte';
	import ExploreList from '$components/complexes/ExploreList.svelte';
	import ExploreMap from '$components/complexes/ExploreMap.svelte';
	import ExploreMenu from '$components/complexes/ExploreMenu.svelte';
	import { isExploreArticle, showExploreFilters, showExploreList, showExploreMap } from '$stores/explore';
	import { category, showCategory, showSearchbar } from '$stores/search';
	import { onDestroy, onMount } from 'svelte';

	showSearchbar.set(true);
	showCategory.set(true);

	let menuHeight;

	onMount(() => {});

	onDestroy(() => {
		showSearchbar.set(false);
		showCategory.set(false);
	});
</script>

<section id="explore" class:is-article={$isExploreArticle}>
	{#if !$isExploreArticle}
		<ExploreMenu bind:menuHeight />
	{/if}
	<div id="explore-panes" style:--menu-height="{menuHeight}px">
		{#if $showExploreFilters && !$isExploreArticle}
			<ExploreFilters />
		{/if}
		{#if ($showExploreMap || $isExploreArticle) && $category === 'projects'}
			<ExploreMap />
		{/if}
		{#if $showExploreList && !$isExploreArticle}
			<ExploreList />
		{/if}
	</div>
</section>
<slot />

<style lang="postcss">
	#explore {
		--search-width: 420px;
		position: relative;
		top: 0;
		height: calc(100vh - var(--navbar-height));
		margin: 0;
		padding: 0;
		margin-top: var(--navbar-height);
		width: 100%;
		display: flex;
		flex-direction: column;
		flex-wrap: nowrap;
		min-height: 0px;
		transition: height 0.25s cubic-bezier(0.2, 0, 0, 1);

		&.is-article {
			height: 600px;
		}
	}

	#explore-panes {
		position: relative;
		width: 100%;
		display: flex;
		flex: 1;
		min-height: 0px;
		flex-direction: row;
	}
</style>
