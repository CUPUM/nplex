<script lang="ts">
	import { extendedSuperForm } from '$lib/crud/form/client';
	import { expoOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';
	import ProjectsFilters from './projects-filters.svelte';
	import ProjectsViewModes from './projects-view-modes.svelte';

	let { data, children } = $props();

	const filtersForm = extendedSuperForm(data.filtersForm);

	const { formId, submitter } = filtersForm;
</script>

<article class="group/explore min-h-main-full-height rounded-inherit flex flex-row">
	<ProjectsFilters {...filtersForm} lists={data.lists} />
	{@render children()}
	<aside
		class="bottom-padding z-front pointer-events-none sticky flex flex-row justify-center text-sm *:pointer-events-auto"
		in:fly|global={{ y: -6, easing: expoOut, duration: 500, opacity: 0 }}
	>
		<ProjectsViewModes />
	</aside>
</article>
