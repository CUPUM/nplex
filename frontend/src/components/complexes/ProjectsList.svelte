<!--
	@component
	Hello world.
-->
<script lang="ts">
	import { projects } from '$stores/projects';
	import { width } from '$transitions/width';
	import ProjectsListCard from './ProjectsListCard.svelte';
</script>

<section transition:width|local={{}}>
	{#each $projects as project}
		<ProjectsListCard {project} />
	{/each}
	{#if !$projects.length}
		<p>Il ne semble pas y avoir de projets :(</p>
	{/if}
	<ProjectsListCard />
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
