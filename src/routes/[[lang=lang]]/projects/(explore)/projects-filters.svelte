<script lang="ts">
	import type { ExtendedSuperFormData } from '$lib/crud/form/client';
	import type { PageData } from './$types';
	import ProjectsFiltersInterventions from './projects-filters-interventions.svelte';
	import ProjectsFiltersMarkers from './projects-filters-markers.svelte';
	import ProjectsFiltersSearch from './projects-filters-search.svelte';
	import ProjectsFiltersTypes from './projects-filters-types.svelte';

	let { lists, ...form }: ExtendedSuperFormData<PageData['filtersForm']> & Pick<PageData, 'lists'> =
		$props();

	let formRef = $state<HTMLFormElement>();

	// const autoSubmit = debounce(() => {
	// 	formRef?.requestSubmit();
	// }, 250);
</script>

<form
	bind:this={formRef}
	onchange={() => {
		formRef?.requestSubmit();
	}}
	method="GET"
	class="w-sidebar-width pr-gutter gap-gutter top-sticky-top sticky flex max-h-full flex-col items-start self-start text-sm"
>
	<ProjectsFiltersSearch {...form} />
	<ProjectsFiltersTypes {...form} {lists} />
	<ProjectsFiltersInterventions {...form} {lists} />
	<ProjectsFiltersMarkers {...form} {lists} />
</form>
