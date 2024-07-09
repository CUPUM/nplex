<script lang="ts">
	import { debounce } from '$lib/common/throttle-debounce';
	import ResizableSidebarHandle from '$lib/components/patterns/resizable-sidebar-handle.svelte';
	import type { ExtendedSuperFormData } from '$lib/crud/form/client';
	import { expoOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';
	import type { PageData } from './$types';
	import ProjectsFiltersInterventions from './projects-filters-interventions.svelte';
	import ProjectsFiltersMarkers from './projects-filters-markers.svelte';
	import ProjectsFiltersSearch from './projects-filters-search.svelte';
	import ProjectsFiltersTypes from './projects-filters-types.svelte';

	let { lists, ...form }: ExtendedSuperFormData<PageData['filtersForm']> & Pick<PageData, 'lists'> =
		$props();

	let formRef = $state<HTMLFormElement>();

	/**
	 * Submit form automatically on change, make sure to debounce to avoid spamming.
	 */
	const autoSubmit = debounce(() => {
		formRef?.requestSubmit();
	}, 1000);

	/**
	 * Use a custom submit handler to take care of hidden filter inputs to do: make a search params
	 * builder that accepts array properties.
	 */
	function submitWithoutInputs(e: SubmitEvent) {
		// e.preventDefault();
		// goto(new URLSearchParams(get(form.form)).toString())
	}
</script>

<ResizableSidebarHandle>
	{#snippet sidebar(sidebar, css)}
		<form
			bind:this={formRef}
			use:sidebar
			onchange={autoSubmit}
			onsubmit={submitWithoutInputs}
			method="GET"
			style:--spacing-sidebar-width={css}
			class="w-sidebar-width pb-padding gap-gap top-sticky-top max-h-main-full-height z-front sticky flex min-h-0 flex-col items-stretch text-sm"
			in:fly|global={{ x: -6, duration: 350, easing: expoOut }}
		>
			<ProjectsFiltersSearch {...form} />
			<div
				class="gap-inherit no-scrollbar rounded-section flex flex-col overflow-x-hidden overflow-y-scroll"
			>
				<ProjectsFiltersTypes {...form} {lists} />
				<ProjectsFiltersInterventions {...form} {lists} />
				<ProjectsFiltersMarkers {...form} {lists} />
			</div>
		</form>
	{/snippet}
</ResizableSidebarHandle>
