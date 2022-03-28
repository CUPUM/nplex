<script>
	import ProjectsListCard from './ProjectsListCard.svelte';
</script>

<section>
	<ProjectsListCard />
	<ProjectsListCard />
	<ProjectsListCard />
	<ProjectsListCard />
	<ProjectsListCard />
	<ProjectsListCard />
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
