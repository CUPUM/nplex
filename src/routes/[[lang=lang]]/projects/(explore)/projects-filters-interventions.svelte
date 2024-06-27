<script lang="ts">
	import * as m from '$i18n/messages';
	import { ripple } from '$lib/components/primitives/ripple.svelte';
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
		{m.project_interventions()}
	{/snippet}
	<ul class="gap-menu-gutter compact flex flex-col items-start">
		{#await lists.interventionsByCategories}
			...
		{:then awaitedProjectInterventionsByCategories}
			{#each awaitedProjectInterventionsByCategories as category}
				{#each category.interventions as intervention}
					<label class="button button-dashed rounded-full" use:ripple>
						{intervention.title}
						<input
							type="checkbox"
							class="sr-only"
							name="interventions"
							value={intervention.id}
							bind:group={$form.interventions}
						/>
					</label>
				{/each}
			{/each}
		{/await}
	</ul>
</SidebarFilterGroup>
