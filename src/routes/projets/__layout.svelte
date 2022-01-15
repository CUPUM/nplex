<script lang="ts">
	import ProjectsMap from '$components/projects/ProjectsMap.svelte';
	import ProjectsList from '$components/projects/ProjectsList.svelte';
	import ProjectsFilters from '$components/projects/ProjectsFilters.svelte';
	import { slide } from 'svelte/transition';
	import { page } from '$app/stores';
	import { showProjectsFilters } from '$stores/projects';
</script>

<section>
	{#if $showProjectsFilters}
		<!-- Ou plutôt une component Filters qui gère la diff entre les filtres de projet, de personnes, etc. -->
		<ProjectsFilters />
	{/if}
	<ProjectsMap />
	<ProjectsList />
</section>
{#key $page.params.projectId}
	<article transition:slide={{}}>
		<slot />
	</article>
{/key}

<style>
	section {
		padding-block: var(--size-md);
		padding-inline: var(--size-lg);
		width: 100%;
		height: 100%;
		min-height: 600px;
		flex: 1;
		display: flex;
		flex-direction: row;
		--gap: 8px;
	}

	section > :global(section) {
		transition: margin-inline 0.1s ease-out;
		box-shadow: 0 30px 75px -50px rgba(0, 0, 0, 0.2);
		border-radius: var(--size-xxl);
	}

	section > :global(section):not(:last-child) {
		margin-right: var(--gap);
	}

	article {
		position: relative;
	}
</style>
