<!-- This layout inherits from the adjacent unnamed layout -->
<script lang="ts">
	import ExploreFilters from '$components/complexes/ExploreFilters.svelte';
	import ExploreList from '$components/complexes/ExploreList.svelte';
	import ExploreMap from '$components/complexes/ExploreMap.svelte';
	import ExploreToolbar from '$components/complexes/ExploreToolbar.svelte';
	import Searchbar from '$components/complexes/Searchbar.svelte';
	import { isExploreArticle, showExploreFilters, showExploreList, showExploreMap } from '$stores/explore';
	import { category, showCategory, showSearchbar } from '$stores/search';
	import { cssSize } from '$utils/helpers/css';
	import { onDestroy, onMount } from 'svelte';

	showSearchbar.set(true);
	showCategory.set(true);

	let menuRef: HTMLDivElement;
	let menuHeight;
	let resizeObserver: ResizeObserver;

	function updateMenuHeight() {
		menuHeight = menuRef.offsetHeight;
	}

	onMount(() => {
		resizeObserver = new ResizeObserver(updateMenuHeight);
		resizeObserver.observe(menuRef);
	});

	onDestroy(() => {
		showSearchbar.set(false);
		showCategory.set(false);
		resizeObserver?.disconnect();
	});
</script>

<section id="explore" class:is-article={$isExploreArticle}>
	<div id="explore-menu" bind:this={menuRef}>
		<Searchbar />
		<ExploreToolbar />
	</div>
	<div id="explore-panes" style:--menu-height={cssSize(menuHeight)}>
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
		position: sticky;
		top: 0;
		height: calc(100vh - var(--navbar-height));
		margin-top: var(--navbar-height);
		width: 100%;
		display: flex;
		flex-direction: column;
		min-height: 0;
		transition: height 0.5s cubic-bezier(1, 0, 0, 1);

		&.is-article {
			height: 600px;
			/* height: calc(100vh - var(--navbar-height) - 100px); */
		}
	}

	#explore-menu {
		position: absolute;
		flex: none;
		top: 0;
		left: 1rem;
		right: 1rem;
		margin: 0;
		padding: 0;
		padding-top: 1rem;
		flex-direction: row;
		justify-content: space-between;
		align-items: flex-start;
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
