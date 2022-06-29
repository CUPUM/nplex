<script lang="ts" context="module">
	import type { LoadEvent, LoadOutput } from '@sveltejs/kit';

	export async function load({ stuff }: LoadEvent): Promise<LoadOutput> {
		return {
			stuff: {
				showFooter: false,
			},
		};
	}
</script>

<script lang="ts">
	import ProjectsFilters from '$components/complexes/ProjectsFilters.svelte';
	import ProjectsList from '$components/complexes/ProjectsList.svelte';
	import ProjectsMap from '$components/complexes/ProjectsMap.svelte';
	import { showProjectsFilters, showProjectsList, showProjectsMap } from '$stores/projects';
</script>

<div id="panes">
	{#if $showProjectsFilters}
		<ProjectsFilters />
	{/if}
	{#if $showProjectsMap}
		<ProjectsMap />
	{/if}
	{#if $showProjectsList}
		<ProjectsList />
	{/if}
</div>

<style lang="scss">
	#panes {
		--offset-top: calc(var(--navbar-height) + var(--searchbar-height));
		position: relative;
		top: 0;
		left: 0;
		margin: 0;
		margin-top: var(--offset-top);
		padding: 0;
		width: 100%;
		height: calc(100vh - var(--offset-top));
		display: flex;
		flex-direction: row;
		min-height: 0;
		justify-content: center;
	}
</style>
