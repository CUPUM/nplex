<script lang="ts">
	import ProjectsMap from '$components/projectsMap/ProjectsMap.svelte';
	import ProjectsList from '$components/projectsList/ProjectsList.svelte';
	import ProjectsFilters from '$components/projectsFilters/ProjectsFilters.svelte';
	import { projectsFilters } from '$stores/queryStore';
	import { projectsPanes, projectContent } from './projets.css';
	import { slide } from 'svelte/transition';
	import { page } from '$app/stores';
</script>



<section class={projectsPanes}>
	<ProjectsFilters />
	<ProjectsMap />
	<ProjectsList />
</section>
{#key $page.params.projectId}
	<article
		class={projectContent}
		transition:slide={{}}
	>
		<slot />
	</article>
{/key}