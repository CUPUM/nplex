<!--
	This layout inherits from the adjacent unnamed layout
-->
<script lang="ts">
	import ExploreArticleNav from '$components/complexes/ExploreArticleNav.svelte';
	import ExploreFilters from '$components/complexes/ExploreFilters.svelte';
	import ExploreList from '$components/complexes/ExploreList.svelte';
	import ExploreMap from '$components/complexes/ExploreMap.svelte';
	import ExploreSearchbar from '$components/complexes/ExploreSearchbar.svelte';
	import {
		isExploreArticle,
		showArticleMap,
		showExploreFilters,
		showExploreList,
		showExploreMap,
	} from '$stores/explore';
	import { showCategory, showSearchbar } from '$stores/search';
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

<div id="explore" class:is-article={$isExploreArticle}>
	{#if !$isExploreArticle}
		<ExploreSearchbar />
	{/if}
	<section id="explore-panes" style:--menu-height="{menuHeight}px">
		{#if $isExploreArticle}
			<ExploreArticleNav />
		{/if}
		{#if $showExploreFilters && !$isExploreArticle}
			<ExploreFilters />
		{/if}
		{#if $showExploreMap || $showArticleMap}
			<ExploreMap />
		{/if}
		{#if $showExploreList && !$isExploreArticle}
			<ExploreList />
		{/if}
	</section>
</div>
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
		justify-content: center;
	}
</style>
