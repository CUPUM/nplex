<script lang="ts">
	import { width } from '$transitions/width';
	import ProjectsListCard from './ProjectsListCard.svelte';

	export let projectsPreviews = []; // Define typing (in +page.ts load ?) from generated db types.
</script>

<section transition:width|local={{}}>
	{#each projectsPreviews as project}
		<ProjectsListCard {project} />
	{/each}
	{#if !projectsPreviews.length}
		<p>Il ne semble pas y avoir de projets :(</p>
	{/if}
	<!-- <ProjectsListCard /> -->
</section>

<style lang="scss">
	section {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		overflow: visible;
		padding-top: 0;
		padding-bottom: 2rem;
		padding-inline: 1rem calc(1rem - var(--scroll-size));
		margin-bottom: 0 !important;
		border-radius: 2rem;
		overflow-y: scroll;
		scroll-snap-type: y mandatory;
		scroll-padding: 0;
	}
</style>
