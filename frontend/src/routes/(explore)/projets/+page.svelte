<script lang="ts">
	import NavbarWidth from '$components/Navbar/NavbarWidth.svelte';
	import RootScroll from '$components/Root/RootScroll.svelte';
	import type { Snapshot } from './$types';
	import ProjectsFilters from './ProjectsFilters.svelte';
	import ProjectsList from './ProjectsList.svelte';
	import ProjectsMap from './ProjectsMap.svelte';
	import ProjectsToolbar from './ProjectsToolbar.svelte';
	import {
		projectsFiltersExpanded,
		projectsFiltersOpened,
		projectsListOpened,
		projectsTs,
	} from './common';

	export let data;

	function handleSubmit() {}

	export const snapshot: Snapshot<{
		filtersOpened: typeof $projectsFiltersOpened;
		listOpened: typeof $projectsListOpened;
		ts: typeof $projectsTs.input;
		filtersExpanded: typeof $projectsFiltersExpanded;
	}> = {
		capture() {
			return {
				filtersOpened: $projectsFiltersOpened,
				listOpened: $projectsListOpened,
				filtersExpanded: $projectsFiltersExpanded,
				ts: $projectsTs.input,
			};
		},
		restore(snapshot) {
			$projectsFiltersOpened = snapshot.filtersOpened;
			$projectsListOpened = snapshot.listOpened;
			$projectsTs.input = snapshot.ts;
			$projectsFiltersExpanded = snapshot.filtersExpanded;
		},
	};
</script>

<RootScroll lock />
<NavbarWidth width="full" />
<ProjectsToolbar />
<article id="projects-explore">
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
		flex: 1;
		margin-top: calc(-1 * var(--projects-top-overlay-h));
		flex-direction: column;
	}
</style>
