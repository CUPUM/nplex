<script lang="ts">
	import { showProjectsFilters } from '$stores/projects';
	import { search } from '$stores/query';
	import { exploreRoutes } from '$utils/routes';
</script>

<section>
	<div>
		<button on:click={() => showProjectsFilters.toggle()}>Filtres</button>
		<input type="search" bind:value={$search} />
		<button>Chercher</button>
	</div>
	<div>
		{#each exploreRoutes as type}
			&ensp;<a href={type.href}>{type.title}</a>&emsp;
		{/each}
	</div>
	<div>(token1), (token2), (...)</div>
</section>

<style>
	/* 	
export const exploreBar = style({
	display: 'flex',
	flexDirection: 'row',
	paddingBlock: 0,
	paddingInline: sizes.lg
});

export const searchBar = style({
	flex: 1,
	display: 'flex',
	flexDirection: 'row'
});
export const searchInput = style({
	backgroundColor: 'red',
	flex: 1,
});
export const filtersButton = style({
	backgroundColor: 'red'
});
export const searchButton = style({
	backgroundColor: 'white'
})

export const exploreNav = style({
	color: 'red',
	marginInline: sizes.sm,
	padding: sizes.sm
})

export const tokensBar = style({
	flex: 1
}) */
</style>
