<script lang="ts">
	import { projects } from '$stores/projects';
	import ProjectsListCard from './ProjectsListCard.svelte';
</script>

<ul>
	{#each $projects as project}
		<ProjectsListCard {project} />
	{/each}
	<li>Add project</li>
</ul>

<style lang="postcss">
	ul {
		position: relative;
		padding: 0;
		margin: 0;
		text-indent: 0;
		width: 100%;
		display: grid;
		grid-template-columns: 100%;
		gap: 1rem;
	}
</style>
