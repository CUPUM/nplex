<!--
	This layout inherits from the adjacent unnamed (default) layout.
-->
<script lang="ts">
	import { intersection } from '$actions/intersection';
	import ExploreArticleNav from '$components/complexes/ExploreArticleNav.svelte';
	import ExploreFilters from '$components/complexes/ExploreFilters.svelte';
	import ExploreList from '$components/complexes/ExploreList.svelte';
	import ExploreMap from '$components/complexes/ExploreMap.svelte';
	import ExploreSearchbar from '$components/complexes/ExploreSearchbar.svelte';
	import { backgroundColor } from '$stores/backgroundColor';
	import { isExploreArticle, showExploreFilters, showExploreList, showExploreMap } from '$stores/explore';
	import { category, showCategory, showSearchbar } from '$stores/search';
	import { onDestroy, onMount } from 'svelte';
	import { circOut } from 'svelte/easing';
	import { scale } from 'svelte/transition';

	showSearchbar.set(true);
	showCategory.set(true);

	function panesEnter() {
		showSearchbar.set(true);
	}

	function panesLeave() {
		showSearchbar.set(false);
	}

	onMount(() => {
		backgroundColor.reset();
	});

	onDestroy(() => {
		showSearchbar.set(false);
		showCategory.set(false);
		category.set(null);
	});
</script>

<div
	id="explore"
	class:is-article={$isExploreArticle}
	transition:scale={{ start: 0.95, opacity: 0, duration: 350, easing: circOut }}
>
	{#if !$isExploreArticle}
		<ExploreSearchbar />
	{/if}
	<section id="explore-panes" use:intersection on:enter={panesEnter} on:leave={panesLeave}>
		{#if $isExploreArticle}
			<ExploreArticleNav />
		{/if}
		{#if $showExploreFilters}
			<ExploreFilters />
		{/if}
		{#if $showExploreMap}
			<ExploreMap />
		{/if}
		{#if $showExploreList}
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
		transition: height 0.5s cubic-bezier(0.5, 0, 0, 1);

		&.is-article {
			height: 0;
			/* margin-top: 0; */
			/* height: 600px; */
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
