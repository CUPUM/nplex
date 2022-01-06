<script lang="ts">
	import { showProjectsFilters } from '$stores/projectsStore';
	import { search } from '$stores/queryStore';
	import { exploreRoutes } from '$utils/routes';
</script>


<section>
	<div id="search">
		<input type="search" bind:value={$search}>
		<button on:click={() => showProjectsFilters.toggle()}>Filtres</button>
	</div>
	<div id="subnav">
		{#each exploreRoutes as type}
			&ensp;<a href={type.href}>{type.title}</a>&emsp;
		{/each}
	</div>
	<div id="tokens">
		(token1), (token2), (...)
	</div>
</section>


<style lang="postcss">
	section {
		display: flex;
		flex-direction: row;
		padding: 1rem 2rem;
	}

	div {
		border: 1px solid black;
	}

	#search, #tokens {
		flex: 1;
	}
</style>