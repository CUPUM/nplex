<script lang="ts">
	import ProjectsMap from '$components/complexes/ProjectsMap.svelte';
	import ProjectsList from '$components/complexes/ProjectsList.svelte';
	import ProjectsFilters from '$components/complexes/ProjectsFilters.svelte';
	import { slide } from 'svelte/transition';
	import { page } from '$app/stores';
	import { showProjectsFilters } from '$stores/projects';
</script>

<section>
	{#if $showProjectsFilters}
		<ProjectsFilters />
	{/if}
	<ProjectsMap />
	<ProjectsList />
</section>

<!-- {#key $page.params.projectId}
	<article transition:slide={{}}>
		<slot />
	</article>
{/key} -->
<style>
	section {
		position: relative;
		padding-block: var(--size-medium);
		padding-inline: var(--size-large);
		width: 100%;
		height: 100%;
		min-height: 600px;
		flex: 1;
		display: flex;
		flex-direction: row;
		--gap: 8px;
	}

	section > :global(section) {
		box-shadow: 0 30px 75px -50px rgba(0, 0, 0, 0.2);
		border-radius: var(--size-xxlarge);
	}

	section > :global(section):not(:last-child) {
		margin-right: var(--gap);
	}

	article {
		position: relative;
	}
</style>
