<script lang="ts">
	import ProjectsFiltersPane from '$components/complexes/ProjectsFiltersPane.svelte';
	import ProjectsList from '$components/complexes/ProjectsList.svelte';
	import ProjectsMap from '$components/complexes/ProjectsMap.svelte';
</script>

<div id="panes">
	<ProjectsFiltersPane />
	<ProjectsMap />
	<ProjectsList />
</div>

<style lang="scss">
	#panes {
		--offset-top: calc(var(--navbar-height) + var(--searchbar-height));
		position: relative;
		top: 0;
		margin: 0;
		margin-top: var(--searchbar-height);
		padding: 0;
		width: 100%;
		height: calc(100vh - var(--offset-top));
		display: flex;
		flex-direction: row;
		min-height: 0;
		justify-content: center;
	}
</style>
