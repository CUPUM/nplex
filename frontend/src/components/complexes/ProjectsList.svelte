<script lang="ts" context="module">
	export interface ProjectsListContext {
		display: 'row' | 'column' | 'mosaic';
	}
</script>

<script lang="ts">
	import { Ctx } from '$utils/contexts';
	import { setContext } from 'svelte';
	import ProjectsListItem from './ProjectsListItem.svelte';

	/**
	 * Disposition of projects' cards;
	 */
	export let display: ProjectsListContext['display'] = 'column';
	/**
	 * Array of projects' summary data.
	 */
	export let projects: any[] = [];

	setContext<ProjectsListContext>(Ctx.ProjectsList, {
		display,
	});
</script>

<section class={display}>
	<ProjectsListItem />
	<ProjectsListItem />
	{#each projects as project}
		<ProjectsListItem {project} />
	{/each}
</section>

<style>
	section {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		overflow: visible;
		padding-block: 2rem;
		padding-inline: 1rem;
		margin-bottom: 0 !important;
		/* overflow-y: visible;
		overflow-x: scroll; */
	}

	.row {
		flex-direction: row;
	}

	.column {
		flex-direction: column;
	}
</style>
