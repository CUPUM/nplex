<script lang="ts">
	import { expoOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';
	import type { Snapshot } from '../$types';
	import ProjectsViewModes, {
		PROJECTS_VIEW_MODES,
		type ProjectsViewMode,
	} from './projects-view-modes.svelte';

	let { data, children } = $props();

	let projectsViewMode = $state<ProjectsViewMode>(PROJECTS_VIEW_MODES.MASONRY);

	export const snapshot: Snapshot<{
		projectsViewMode: ProjectsViewMode;
	}> = {
		capture() {
			console.log('capture', projectsViewMode);
			return {
				projectsViewMode,
			};
		},
		restore(value) {
			console.log('restore', value);
			projectsViewMode = value.projectsViewMode;
		},
	};
</script>

<article class="group/explore flex flex-col" data-view-mode={projectsViewMode}>
	<aside
		class="top-sticky-top z-front pointer-events-none sticky flex flex-row justify-center text-sm *:pointer-events-auto"
		in:fly|global={{ y: -6, easing: expoOut, duration: 500, opacity: 0 }}
	>
		<ProjectsViewModes bind:mode={projectsViewMode} />
	</aside>
	{@render children()}
</article>
