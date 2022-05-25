<script lang="ts" context="module">
</script>

<script lang="ts">
	import ProjectsFilters from '$components/complexes/ProjectsFilters.svelte';
	import ProjectsList from '$components/complexes/ProjectsList.svelte';
	import ProjectsMap from '$components/complexes/ProjectsMap.svelte';
	import { showFilters } from '$stores/projects';

	// your script goes here
</script>

<section id="panes">
	{#if $showFilters}
		<ProjectsFilters />
	{/if}
	<ProjectsMap />
	<ProjectsList />
</section>

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
