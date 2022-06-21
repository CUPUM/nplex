<script lang="ts" context="module">
</script>

<script lang="ts">
	import ExploreSearchbar from '$components/complexes/ExploreSearchbar.svelte';
	import { expoOut } from 'svelte/easing';
	import { scale } from 'svelte/transition';
</script>

<div id="explore" transition:scale={{ start: 0.95, opacity: 0, duration: 350, easing: expoOut }}>
	<ExploreSearchbar />
	<section id="explore-panes">
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

<style lang="postcss">
</style>
