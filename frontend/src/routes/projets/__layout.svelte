<script lang="ts">
	import ProjectsMap from '$components/complexes/ProjectsMap.svelte';
	import ProjectsList from '$components/complexes/ProjectsList.svelte';
	import ProjectsFilters from '$components/complexes/ProjectsFilters.svelte';
	import { slide } from 'svelte/transition';
	import { page } from '$app/stores';
	import { showFilters } from '$stores/projects';
</script>

<section id="panes">
	{#if $showFilters}
		<ProjectsFilters />
	{/if}
	<ProjectsMap />
	<ProjectsList />
</section>
<slot />

<style lang="postcss">
	#panes {
		--gap: 16px;
		position: relative;
		margin-top: var(--size-medium);
		padding-inline: 8px;
		padding-top: 8px;
		padding-bottom: 0;
		width: 100%;
		min-height: 600px;
		flex: 1;
		display: flex;
		flex-direction: row;
		overflow: hidden;

		& > :global(section) {
			margin-left: var(--gap);
			margin-top: 0;
			margin-bottom: var(--gap);
		}

		& > :global(section):last-child {
		}
	}
</style>
