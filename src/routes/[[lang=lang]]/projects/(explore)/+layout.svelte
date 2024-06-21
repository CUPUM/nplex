<script lang="ts">
	import type { ComponentProps } from 'svelte';
	import { expoOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';
	import type { Snapshot } from '../$types';
	import ProjectsViewMode from './projects-view-mode.svelte';

	let { data, children } = $props();

	let viewMode = $state<ComponentProps<ProjectsViewMode>['viewMode']>('masonry');
	let showFilters = $state<boolean>(true);

	export const snapshot: Snapshot<{
		viewMode: typeof viewMode;
		showFilters: typeof showFilters;
	}> = {
		capture() {
			return {
				viewMode,
				showFilters,
			};
		},
		restore(value) {
			viewMode = value.viewMode;
			showFilters = value.showFilters;
		},
	};
</script>

<article class="group/explore flex flex-col" data-view-mode={viewMode}>
	<aside
		class="top-sticky-top z-front sticky flex flex-row justify-center text-sm"
		in:fly|global={{ y: -6, easing: expoOut, duration: 500, opacity: 0 }}
	>
		<ProjectsViewMode bind:viewMode />
	</aside>
	{@render children()}
</article>
