<script lang="ts">
	import type { ExtendedSuperFormData } from '$lib/crud/form/client';
	import type { PageData } from './$types';
	import ProjectsFiltersSearch from './projects-filters-search.svelte';

	let { ...form }: ExtendedSuperFormData<PageData['filtersForm']> = $props();
</script>

<ProjectsFiltersSearch {...form} />
<section class="px-field-gutter">More filters to come...</section>
