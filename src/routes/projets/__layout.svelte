<script lang="ts">
	import ProjectsMap from '$components/ProjectsMap.svelte';
	import ProjectsList from '$components/ProjectsList.svelte';
	import ProjectsFilters from '$components/ProjectsFilters.svelte';
	import { projectsFilters } from '$stores/queryStore';

	let handleResize;
</script>




<section>
	<ProjectsFilters on:resizeend={handleResize} />
	<ProjectsMap bind:handleResize />
	<ProjectsList />
</section>
<slot />




<style>
	section {
		flex: 1;
		display: flex;
		flex-direction: row;
	}
</style>