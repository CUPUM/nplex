<script lang="ts">
	import { showProjectsFilters } from '$stores/projectsStore';
	import { search } from '$stores/queryStore';
	import { exploreRoutes } from '$utils/routes';
	import { exploreBar, exploreNav, filtersButton, searchBar, searchButton, searchInput, tokensBar } from './MainSearch.css';
</script>


<section class={exploreBar}>
	<div class={searchBar}>
		<button class={filtersButton} on:click={() => showProjectsFilters.toggle()}>Filtres</button>
		<input class={searchInput} type="search" bind:value={$search}>
		<button class={searchButton}>Chercher</button>
	</div>
	<div class={exploreNav}>
		{#each exploreRoutes as type}
			&ensp;<a href={type.href}>{type.title}</a>&emsp;
		{/each}
	</div>
	<div class={tokensBar}>
		(token1), (token2), (...)
	</div>
</section>
