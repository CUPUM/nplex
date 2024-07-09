<script lang="ts">
	import * as m from '$i18n/messages';
	import { ripple } from '$lib/components/primitives/ripple.svelte';
	import type { ExtendedSuperFormData } from '$lib/crud/form/client';
	import SidebarGroup from '../../../../lib/components/patterns/sidebar-group.svelte';
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

{#await lists.exemplarityMarkersBycategories then awaitedMarkersByCategories}
	<SidebarGroup>
		{#snippet legend()}
			{m.project_exemplarity_markers()}
		{/snippet}
		<ul class="flex flex-col gap-[0.5em]">
			{#each awaitedMarkersByCategories as category}
				<li>
					<span class="px-[0.5em]">
						{category.title}
					</span>
					<ul class="gap-input-group-gap compact flex flex-row flex-wrap">
						{#each category.markers as marker}
							<label class="button button-dashed min-w-0 justify-start rounded-full" use:ripple>
								<span class="truncate">
									{marker.title}
								</span>
								<input
									type="checkbox"
									class="sr-only"
									name="markers"
									value={marker.id}
									bind:group={$form.markers}
								/>
							</label>
						{/each}
					</ul>
				</li>
			{/each}
		</ul>
	</SidebarGroup>
{/await}
