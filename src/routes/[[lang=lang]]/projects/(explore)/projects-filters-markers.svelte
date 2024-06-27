<script lang="ts">
	import * as m from '$i18n/messages';
	import type { ExtendedSuperFormData } from '$lib/crud/form/client';
	import SidebarFilterGroup from '../../../../lib/components/patterns/sidebar-filter-group.svelte';
	import type { PageData } from './$types';

	let {
		form,
		constraints,
		submitter,
		tainted,
		isTainted,
		lists,
	}: ExtendedSuperFormData<PageData['filtersForm']> & Pick<PageData, 'lists'> = $props();
</script>

<SidebarFilterGroup>
	{#snippet legend()}
		{m.project_exemplarity_markers()}
	{/snippet}
	<ul class="gap-menu-gutter compact flex flex-col items-start">
		{#await lists.exemplarityMarkersBycategories}
			...
		{:then awaitedMarkersByCategories}
			{#each awaitedMarkersByCategories as category}
				{#each category.markers as marker}
					<label class="button button-dashed rounded-full">
						{marker.title}
						<input
							type="checkbox"
							class="sr-only"
							name="markers"
							value={marker.id}
							bind:group={$form.markers}
						/>
					</label>
				{/each}
			{/each}
		{/await}
	</ul>
</SidebarFilterGroup>
