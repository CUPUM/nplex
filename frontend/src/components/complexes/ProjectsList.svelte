<script>
	import ProjectsListItem from './ProjectsListItem.svelte';
</script>

<section>
	<ProjectsListItem />
	<ProjectsListItem />
	<ProjectsListItem />
	<ProjectsListItem />
	<ProjectsListItem />
	<ProjectsListItem />
</section>

<style>
	section {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		overflow-x: visible;
		overflow-y: scroll;
		padding-block: 0;
		padding-right: 0.5rem;
	}
</style>
