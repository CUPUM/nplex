<script lang="ts">
	import type { ExtendedSuperFormData } from '$lib/crud/form/client';
	import type { PageData } from './$types';
	import ProjectsFiltersSearch from './projects-filters-search.svelte';
	import ProjectsFiltersTypes from './projects-filters-types.svelte';

	let {
		projectTypes,
		...form
	}: ExtendedSuperFormData<PageData['filtersForm']> & { projectTypes: PageData['projectTypes'] } =
		$props();
</script>

<ProjectsFiltersSearch {...form} />
<ProjectsFiltersTypes {...form} {projectTypes} />
<section class="px-field-gutter">More filters to come...</section>
