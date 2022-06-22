<script lang="ts" context="module">
</script>

<script lang="ts">
	import ExploreFilters from '$components/complexes/ExploreFilters.svelte';
	import ExploreList from '$components/complexes/ExploreList.svelte';
	import ExploreMap from '$components/complexes/ExploreMap.svelte';
	import { showExploreFilters, showExploreList, showExploreMap } from '$stores/explore';
</script>

<div id="panes">
	{#if $showExploreFilters}
		<ExploreFilters />
	{/if}
	{#if $showExploreMap}
		<ExploreMap />
	{/if}
	{#if $showExploreList}
		<ExploreList />
	{/if}
</div>

<style lang="scss">
	#panes {
		position: relative;
		top: 0;
		left: 0;
		margin: 0;
		margin-top: var(--navbar-height);
		padding: 0;
		width: 100%;
		height: calc(100vh - var(--navbar-height));
		display: flex;
		flex-direction: row;
		min-height: 0;
		justify-content: center;
	}
</style>
