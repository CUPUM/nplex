<script lang="ts">
	import { page } from '$app/stores';
	import NavbarWidth from '$routes/NavbarWidth.svelte';
	import RootScroll from '$routes/RootScroll.svelte';
	import { get } from 'svelte/store';
	import type { Snapshot } from './$types';
	import ProjectsFilters from './ProjectsFilters.svelte';
	import ProjectsList from './ProjectsList.svelte';
	import ProjectsMap from './ProjectsMap.svelte';
	import ProjectsToolbar from './ProjectsToolbar.svelte';
	import { projectsFiltersOpened, projectsListOpened } from './common';

	export let data;

	function handleSubmit() {}

	export const snapshot: Snapshot<{
		filtersOpened: boolean;
		listOpened: boolean;
	}> = {
		capture() {
			return {
				filtersOpened: get(projectsFiltersOpened),
				listOpened: get(projectsListOpened),
			};
		},
		restore(snapshot) {
			projectsFiltersOpened.set(snapshot.filtersOpened);
			projectsListOpened.set(snapshot.listOpened);
		},
	};
</script>

<RootScroll lock />
<NavbarWidth width="full" />
<ProjectsToolbar />
<article id="projects-explore" class:map-compact={$page.data.projectsMapCompact}>
	<ProjectsFilters />
	<ProjectsMap projects={data.projects} />
	<ProjectsList projects={data.projects} />
</article>

<style lang="scss">
	#projects-explore {
		--projects-top-overlay-h: calc(var(--ui-nav-h) + var(--ui-projects-toolbar-h));
		position: relative;
		z-index: 0;
		display: grid;
		grid-template-columns:
			[full-start gutter-left-start]
			var(--ui-gutter-sm)
			[gutter-left-end filters-start]
			auto
			[filters-end center-start]
			1fr
			[center-end list-start]
			auto
			[list-end gutter-right-start]
			var(--ui-gutter-sm)
			[gutter-right-end full-end];
		grid-template-rows: 100vh;
		grid-template-rows: 100svh;
		align-self: stretch;
		margin-top: calc(-1 * var(--projects-top-overlay-h));
		flex-direction: column;
	}
</style>
